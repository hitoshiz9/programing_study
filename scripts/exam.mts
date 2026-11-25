// 「初めての人」役の試験: 教科書の説明と確認問題(答えなし)を書き出し、答えを採点する。
//   node scripts/exam.mts export <章> <出力.md>
//   node scripts/exam.mts grade <章> <答え.json>   答え.json = { "問題id": 0|1|2 または "コード" }
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LEARN } from "../lib/learn/index.ts";
import { LESSONS } from "../lib/lessons.ts";
import { ML_LESSONS } from "../lib/ml.ts";
import { READ_LESSONS } from "../lib/reading.ts";

const [mode, ref, file] = process.argv.slice(2);
const ch = LEARN.find((c) => c.ref === ref);
if (!ch || !file) throw new Error("使い方: node scripts/exam.mts export|grade <章> <ファイル>");
const WRITE = new Map([...LESSONS, ...ML_LESSONS].map((l) => [l.id, l]));
const READ = new Map(READ_LESSONS.map((l) => [l.id, l]));
const fence = (s: string) => "```\n" + s + "\n```";

if (mode === "export") {
  const md: string[] = [`# 教科書 ${ref}`];
  const q = (id: string, label: string) => {
    const r = READ.get(id);
    if (r) md.push(`#### ${label} [${id}] ${r.title}（3択: 0, 1, 2 の番号で答える）\nこのコードを実行すると、何が表示される？\n${fence(r.code)}\n${r.choices.map((c, i) => `選択肢 ${i}:\n${fence(c)}`).join("\n")}`);
    else {
      const w = WRITE.get(id)!;
      md.push(`#### ${label} [${id}] ${w.title}（コードを書いて答える）\n課題: ${w.task}\n最初に入っているコード:\n${fence(w.starter || "(空)")}`);
    }
  };
  for (const s of ch.sections) {
    md.push(`\n## ${s.title}\n`);
    for (const b of s.blocks) {
      if ("try" in b) q(b.try, "やってみよう");
      else md.push("h" in b ? `### ${b.h}` : "p" in b ? b.p : `${fence(b.code)}\n結果:\n${fence(b.out)}`);
    }
  }
  md.push(`\n## 演習問題（この章のまとめ）\n`);
  ch.exercises.forEach((id, n) => q(id, `演習問題 ${n + 1}`));
  writeFileSync(file, md.join("\n\n"));
  console.log("書き出しました:", file);
} else if (mode === "grade") {
  const { loadPyodide } = await import("pyodide");
  const { runWith } = await import("../public/harness.mjs");
  const { judge } = await import("../lib/judge.ts");
  const py = await loadPyodide({ indexURL: resolve("public/pyodide") + "/" });
  const ans: Record<string, number | string> = JSON.parse(readFileSync(file, "utf8"));
  const ids = [...ch.sections.flatMap((s) => s.blocks.flatMap((b) => ("try" in b ? [b.try] : []))), ...ch.exercises];
  let ok = 0;
  for (const id of ids) {
    const a = ans[id];
    let good = false;
    const r = READ.get(id);
    if (r) good = Number(a) === r.answer;
    else if (typeof a === "string") {
      const w = WRITE.get(id)!;
      await py.loadPackagesFromImports(a, { messageCallback: () => {} });
      good = judge(w, a, runWith(py, a, w.test)).ok;
    }
    if (good) ok++;
    else console.log("✗", id, "答え:", JSON.stringify(a));
  }
  console.log(`得点: ${Math.round((ok / ids.length) * 100)} 点（${ok}/${ids.length}）`);
}
