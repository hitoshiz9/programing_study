// 教科書(知る → やってみる → 演習問題)のテスト
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { loadPyodide } from "pyodide";
import { runWith } from "../public/harness.mjs";
import { LEARN } from "../lib/learn/index.ts";
import type { Section } from "../lib/learn/types.ts";
import { termsOf, mentions } from "../lib/learn/terms.ts";
import { LESSONS } from "../lib/lessons.ts";
import { ML_LESSONS } from "../lib/ml.ts";
import { READ_LESSONS } from "../lib/reading.ts";
import { EXPLAIN } from "../lib/explain.ts";
import { CHAPTER_ORDER } from "../lib/chapters/index.ts";

const py = await loadPyodide({ indexURL: resolve("public/pyodide") + "/" });
const WRITE = new Map([...LESSONS, ...ML_LESSONS].map((l) => [l.id, l]));
const READ = new Map(READ_LESSONS.map((l) => [l.id, l]));
const problems = (s: Section) => s.blocks.flatMap((b) => ("try" in b ? [b.try] : []));
const codeOf = (id: string) => {
  const w = WRITE.get(id);
  // 書く問題は、画面に出る最初のコードと、正解のコード(お手本の example は画面に出ないので対象外)
  return w ? [w.starter, w.solution].join("\n") : (READ.get(id)?.code ?? "");
};

test("教科書: 自動テストの道具が正しく言葉を取り出す", () => {
  assert.deepEqual(termsOf("print(6 / 3)\nprint(6 // 3)").sort(), ["/", "//", "print"].sort());
  assert.ok(termsOf('print(1, end="")').includes("end="));
  assert.ok(!termsOf("def f(a):\n    return a\nprint(f(1))").includes("f"), "自分で作った関数は説明不要");
  assert.ok(!termsOf('print("a // b")').includes("//"), "文字列の中は対象外");
  const mod = termsOf('f = open("greet.py", "w")\nf.write("def hello():\\n    return 1\\n")\nf.close()\nimport greet\nprint(greet.hello())');
  assert.ok(!mod.includes("greet") && !mod.includes("hello") && mod.includes("open") && mod.includes("import"), "自分で作ったモジュールと関数は説明不要");
  assert.ok(mentions("/ は小数の答え", "/") && !mentions("// は商", "/"));
  assert.ok(!mentions("print する", "in"));
});

// まだ教科書に作り直していない章の、古い説明の文章(作り直しの途中だけ、前の章の知識として数える)
const legacyProse = (ref: string) =>
  [
    ...[...WRITE.values()].filter((l) => l.ref === ref).flatMap((l) => [...l.intro, ...(EXPLAIN[l.id] ?? []).map((b) => ("h" in b ? b.h : "p" in b ? b.p : ""))]),
    ...[...READ.values()].filter((l) => l.ref === ref).flatMap((l) => [l.intro, l.explain]),
  ].join("\n");

test("教科書: 作り直していない章(移行中)", () => {
  // 全章を作り直したら空になる。ここに章が残っている間は公開しない
  const pending = CHAPTER_ORDER.filter((r) => r !== "A-jupyter" && !LEARN.some((c) => c.ref === r));
  console.log("作り直していない章:", pending.join(", ") || "なし");
});

// 前の章の説明も「習ったこと」に入れる
let learned = "";
for (const ref of CHAPTER_ORDER) {
  const ch = LEARN.find((c) => c.ref === ref);
  if (!ch) {
    learned += "\n" + legacyProse(ref);
    continue;
  }
  if (ch.guide) {
    test(`教科書 ${ch.ref}: アプリの使い方の章は短く(2節まで)、問題も演習問題もない`, () => {
      assert.ok(ch.sections.length > 0 && ch.sections.length <= 2);
      assert.deepEqual(ch.sections.flatMap(problems), []);
      assert.deepEqual(ch.exercises, []);
    });
    continue;
  }
  test(`教科書 ${ch.ref}: どの節も「説明 → その問題」が1対で並び、章の最後に演習問題がある`, () => {
    assert.ok(ch.sections.length > 0);
    for (const s of ch.sections) {
      // 説明のまとまり(h/p/code が1つ以上、p を含む)の直後に問題が1つ。最後は問題で終わる
      let explained = false;
      s.blocks.forEach((b, i) => {
        if ("try" in b) {
          assert.ok(explained, `${s.title}: ${i}番目の問題の前に説明がありません`);
          explained = false;
        } else if ("p" in b) explained = true;
      });
      assert.ok(problems(s).length > 0 && "try" in s.blocks.at(-1)!, `${s.title}: 問題のない説明が残っています`);
    }
    assert.ok(ch.exercises.length > 0, "演習問題がありません");
    const all = [...ch.sections.flatMap(problems), ...ch.exercises];
    for (const id of all) assert.ok(WRITE.has(id) || READ.has(id), `${id} という問題はありません`);
    assert.equal(new Set(all).size, all.length, "同じ問題が2回出てきます");
  });

  test(`教科書 ${ch.ref}: この章の問題は、すべてどこかの節に入っている`, () => {
    const used = new Set([...ch.sections.flatMap(problems), ...ch.exercises]);
    const mine = [...WRITE.values(), ...READ.values()].filter((l) => l.ref === ch.ref).map((l) => l.id);
    assert.deepEqual(
      mine.filter((id) => !used.has(id)),
      [],
    );
  });

  for (const s of ch.sections) {
    // 問題は、その直前までの説明で習ったことだけを使う
    const missing: string[] = [];
    const need = (id: string) => missing.push(...termsOf(codeOf(id)).filter((t) => !mentions(learned, t)).map((t) => `${id}: ${t}`));
    for (const b of s.blocks) {
      if ("h" in b) learned += "\n" + b.h;
      else if ("p" in b) learned += "\n" + b.p;
      else if ("try" in b) need(b.try);
    }
    test(`教科書 ${ch.ref}「${s.title}」: 問題は習ったことだけを使う`, () => {
      assert.deepEqual(missing, [], "説明より先に出てくるもの");
    });
    s.blocks.forEach((b, i) => {
      if (!("code" in b)) return;
      test(`教科書 ${ch.ref}「${s.title}」の例 ${i}: 書いてある結果が実際の結果と一致する`, async () => {
        await py.loadPackagesFromImports(b.code, { messageCallback: () => {} });
        const r = runWith(py, b.code);
        // 画面と同じく、エラーより前の出力とエラーの文を続けて比べる(エラーを見せる例も書ける)
        assert.equal([r.out.trimEnd(), r.error].filter(Boolean).join("\n"), b.out);
      });
    });
  }
  const exMissing = ch.exercises.flatMap((id) => termsOf(codeOf(id)).filter((t) => !mentions(learned, t)).map((t) => `${id}: ${t}`));
  test(`教科書 ${ch.ref} 演習問題: 章で習ったことだけを使う`, () => {
    assert.deepEqual(exMissing, [], "説明より先に出てくるもの");
  });
}
