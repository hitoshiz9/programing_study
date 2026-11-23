// pyodide の実行ファイルを public/pyodide に置く(アプリが動くときに外部サイトから読み込まないため)。
// 1) 本体は node_modules からコピーする。
// 2) 機械学習の部品(numpy・pandas・scikit-learn と、それが使う部品)は、公式の配布場所からダウンロードし、
//    pyodide-lock.json に書かれた SHA-256(指紋)と一致するものだけを置く。
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "public/pyodide";
mkdirSync(DIR, { recursive: true });
for (const f of ["pyodide.mjs", "pyodide.asm.mjs", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"]) {
  cpSync(`node_modules/pyodide/${f}`, `${DIR}/${f}`);
}

const version = JSON.parse(readFileSync("node_modules/pyodide/package.json", "utf8")).version;
const lock = JSON.parse(readFileSync(`${DIR}/pyodide-lock.json`, "utf8")).packages;
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

// 依存をたどって、必要な部品だけを集める
const need = new Set();
const visit = (name) => {
  if (need.has(name)) return;
  if (!lock[name]) throw new Error(`pyodide-lock.json に ${name} がありません`);
  need.add(name);
  lock[name].depends.forEach(visit);
};
["numpy", "pandas", "scikit-learn"].forEach(visit);

for (const name of need) {
  const { file_name, sha256: want } = lock[name];
  const path = `${DIR}/${file_name}`;
  if (existsSync(path) && sha256(readFileSync(path)) === want) continue; // 取得済み
  const url = `https://cdn.jsdelivr.net/pyodide/v${version}/full/${file_name}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${file_name} を取得できませんでした (${res.status})`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (sha256(buf) !== want) throw new Error(`${file_name} の指紋が一致しません。使いません。`);
  writeFileSync(path, buf);
  console.log(`取得: ${file_name} (${(buf.length / 1e6).toFixed(1)} MB)`);
}
