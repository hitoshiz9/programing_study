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
import { MODULES } from "../lib/chapters/index.ts";

// 章ファイルに書いた目標(教材の節の数・説明文の字数)
const MOD = (ref: string) => MODULES.find((m) => m.ref === ref);

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

// ---- くわしい説明 ----
import { EXPLAIN, EXPLAINED_CHAPTERS } from "../lib/explain.ts";

// 東大教材の各章の説明文の文字数(空白を除く。2026-11-24 に測定。コード部分は除く)
const REF_PROSE: Record<string, number> = {
  "1-1": 3466, "1-2": 5424, "1-3": 2768, "1-4": 3470, "2-1": 5836, "2-2": 8142, "2-3": 2892, "3-1": 2620, "3-2": 8990,
  "3-3": 2773, "4-2": 3041, "5-1": 1248, "5-3": 5475, "6-1": 2596, "6-2": 2848, "6-3": 4290, "7-1": 7652, "7-2": 4923,
};
const chars = (s: string) => s.replace(/\s+/g, "").length;
const proseOf = (ref: string) =>
  ALL_WRITE.filter((l) => l.ref === ref).reduce(
    (n, l) => n + chars(l.intro.join("")) + (EXPLAIN[l.id] ?? []).reduce((m, b) => m + ("p" in b ? chars(b.p) : "h" in b ? chars(b.h) : 0), 0),
    0,
  );

for (const ref of EXPLAINED_CHAPTERS) {
  test(`説明の量: ${ref} が東大教材の9割以上`, () => {
    const need = Math.ceil((REF_PROSE[ref] ?? MOD(ref)!.refProse) * 0.9);
    assert.ok(proseOf(ref) >= need, `${proseOf(ref)} 字 / 必要 ${need} 字`);
  });
}

test("説明: どのレッスンにも属している", () => {
  const ids = new Set(ALL_WRITE.map((l) => l.id));
  for (const id of Object.keys(EXPLAIN)) assert.ok(ids.has(id), id);
});

for (const [id, blocks] of Object.entries(EXPLAIN)) {
  blocks.forEach((b, i) => {
    if (!("code" in b)) return;
    test(`説明の例 ${id}#${i}: 表示している結果が実際の結果と一致する`, async () => {
      await py.loadPackagesFromImports(b.code, { messageCallback: () => {} });
      const r = runWith(py, b.code);
      assert.equal(r.error, null);
      assert.equal(r.out.trimEnd(), b.out);
    });
  });
}

// ---- 教材の節を省いていないか ----
import { TOPICS } from "../lib/topics.ts";

// 東大教材の節の数(見出しの数 + 練習の数。2026-11-24 に数えた)
const REF_SECTIONS: Record<string, number> = { "1-1": 14 + 1, "1-2": 11 + 3, "1-3": 7 + 2, "1-4": 8, "2-1": 15 + 6 };

for (const ref of EXPLAINED_CHAPTERS) {
  test(`省略なし: ${ref} の節がすべて、問題と説明で扱われている`, () => {
    const topics = TOPICS[ref] ?? [];
    assert.equal(topics.length, REF_SECTIONS[ref] ?? MOD(ref)!.refSections, "節の数が教材と合いません");
    const read = new Map(READ_LESSONS.map((l) => [l.id, l]));
    const write = new Set(ALL_WRITE.map((l) => l.id));
    for (const [section, ids] of topics) {
      assert.ok(ids.length > 0, `${section}: 問題がありません`);
      for (const id of ids) assert.ok(write.has(id) || read.has(id), `${section}: ${id} という問題はありません`);
      const explained = ids.some((id) => (EXPLAIN[id]?.length ?? 0) > 0 || (read.get(id)?.explain.length ?? 0) >= 80);
      assert.ok(explained, `${section}: 説明がありません`);
    }
  });
}

test("章ファイル: 説明の id がほかの章と重ならず、どれも問題に属している", () => {
  const seen = new Set<string>();
  for (const m of MODULES)
    for (const id of Object.keys(m.explain)) {
      assert.ok(!seen.has(id), `${m.ref}: 説明 ${id} が重複しています`);
      seen.add(id);
    }
});

test("グラフ: matplotlib で描いた図が画像として取り出され、出力に注意書きが混ざらない", async () => {
  const code = 'import matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [2, 4, 1])\nplt.title("test")\nplt.show()\nprint("ok")';
  await py.loadPackagesFromImports(code, { messageCallback: () => {} });
  const r = runWith(py, code);
  assert.equal(r.error, null);
  assert.equal(r.out.trim(), "ok");
  assert.equal(r.images.length, 1);
  assert.ok(Buffer.from(r.images[0], "base64").subarray(1, 4).toString() === "PNG");
  assert.equal(runWith(py, "print(1)").images.length, 0, "前の図が次の実行に残らない");
});
