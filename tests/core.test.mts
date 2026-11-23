import { test } from "node:test";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { runWith } from "../public/harness.mjs";
import { CHAPTERS, chapterUrl, LESSONS } from "../lib/lessons.ts";
import { judge } from "../lib/judge.ts";
import { READ_LESSONS } from "../lib/reading.ts";
import { ML_LESSONS } from "../lib/ml.ts";
import { resolve } from "node:path";
import { complete, EMPTY, levelOf, parse } from "../lib/progress.ts";

// 公開版と同じく public/pyodide の部品を使う(機械学習の部品もここにある)
const py = await loadPyodide({ indexURL: resolve("public/pyodide") + "/" });
// 画面と同じく、import している部品を先に読み込んでから実行する
const run = async (lesson: (typeof LESSONS)[number], code: string) => {
  await py.loadPackagesFromImports(code, { messageCallback: () => {} });
  return runWith(py, code, lesson.test);
};
const ALL_WRITE = [...LESSONS, ...ML_LESSONS];

test("レッスン: id が重複せず、20本以上ある", () => {
  assert.ok(LESSONS.length >= 20);
  assert.equal(new Set(LESSONS.map((l) => l.id)).size, LESSONS.length);
  for (const l of LESSONS) assert.ok(l.hints.length >= 2 && l.xp > 0, l.id);
});

test("レッスン: どれも東大教材の章に属し、リンク先の形が正しい", () => {
  for (const l of ALL_WRITE) assert.ok(CHAPTERS[l.ref], l.id);
  assert.equal(chapterUrl("1-2"), "https://utokyo-ipp.github.io/1/1-2.html");
});

for (const l of ALL_WRITE) {
  test(`${l.id}: 模範解答は合格する`, async () => {
    const r = await run(l, l.solution);
    assert.ok(judge(l, l.solution, r).ok, JSON.stringify(r));
  });
  test(`${l.id}: 不正解の例は不合格になる`, async () => {
    assert.equal(judge(l, l.wrong, await run(l, l.wrong)).ok, false);
  });
  test(`${l.id}: 最初の状態(starter)は不合格になる`, async () => {
    assert.equal(judge(l, l.starter, await run(l, l.starter)).ok, false);
  });
}

const norm = (s: string) => s.split("\n").map((l) => l.trimEnd()).join("\n").trim();

test("読む: id が「書く」と重ならず、どれも章に属する", () => {
  const ids = [...READ_LESSONS.map((l) => l.id), ...ALL_WRITE.map((l) => l.id)];
  assert.equal(new Set(ids).size, ids.length);
  for (const l of READ_LESSONS) assert.ok(CHAPTERS[l.ref], l.id);
});

for (const l of READ_LESSONS) {
  test(`${l.id}: 正解の選択肢だけが実際の実行結果と一致する`, () => {
    const r = runWith(py, l.code);
    assert.equal(r.error, null);
    l.choices.forEach((c, n) => assert.equal(norm(c) === norm(r.out), n === l.answer, `選択肢${n}: ${c}`));
  });
}

test("ステージクリア: 指定した全問に正解するとバッジが付く", () => {
  const clears: [string, string[]][] = [["read-clear", ["a", "b"]]];
  const a = complete(EMPTY, "a", 10, "2026-01-01", 20, clears);
  assert.ok(!a.newBadges.includes("read-clear"));
  assert.ok(complete(a.next, "b", 10, "2026-01-01", 20, clears).newBadges.includes("read-clear"));
});

test("エラー: 利用者のコードに関わる部分だけが出る", () => {
  const r = runWith(py, "x = 1\nprint(y)", undefined);
  assert.match(r.error!, /NameError/);
  assert.doesNotMatch(r.error!, /_pyodide/);
  assert.equal(r.out, "");
});

test("実行ごとに環境が分かれる(前の変数が残らない)", () => {
  runWith(py, "secret = 1");
  assert.match(runWith(py, "print(secret)").error!, /NameError/);
});

test("input() は固まらずエラーになる", () => {
  assert.ok(runWith(py, "input()").error);
});

test("連続日数: 同じ日は増えず、翌日は増え、1日あくと戻る", () => {
  const a = complete(EMPTY, "a", 10, "2026-01-31", 20).next;
  assert.equal(a.streak, 1);
  assert.equal(complete(a, "b", 10, "2026-01-31", 20).next.streak, 1);
  assert.equal(complete(a, "b", 10, "2026-02-01", 20).next.streak, 2);
  assert.equal(complete(a, "b", 10, "2026-02-02", 20).next.streak, 1);
});

test("XP: 同じ問題に2回正解しても増えない。レベルとバッジが付く", () => {
  const a = complete(EMPTY, "a", 30, "2026-01-01", 20);
  assert.equal(a.gainedXp, 30);
  assert.deepEqual(a.newBadges, ["first"]);
  assert.equal(complete(a.next, "a", 30, "2026-01-01", 20).gainedXp, 0);
  assert.equal(levelOf(0), 1);
  assert.equal(levelOf(25), 2);
  assert.ok(complete({ ...EMPTY, xp: 24 }, "a", 10, "2026-01-01", 20).leveledUp);
});

test("保存データ: 壊れていても最初の状態に戻り、落ちない", () => {
  for (const bad of [null, "", "{", "[]", '{"xp":"x"}', '{"xp":-1,"done":[],"badges":[],"streak":0,"lastDay":null}'])
    assert.deepEqual(parse(bad), EMPTY);
  const ok = { xp: 5, done: ["a"], lastDay: "2026-01-01", streak: 2, badges: ["first"] };
  assert.deepEqual(parse(JSON.stringify(ok)), ok);
});
