// pyodide の実行ファイルを public/pyodide にコピーする(外部サイトから読み込まないため)
import { cpSync, mkdirSync } from "node:fs";

mkdirSync("public/pyodide", { recursive: true });
for (const f of ["pyodide.mjs", "pyodide.asm.mjs", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"]) {
  cpSync(`node_modules/pyodide/${f}`, `public/pyodide/${f}`);
}
