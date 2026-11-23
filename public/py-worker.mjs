// Python をブラウザの別スレッドで動かす。固まったら画面側が worker ごと止める。
// 置き場所(basePath)が変わっても動くよう、このファイルからの相対パスで読む。
import { loadPyodide } from "./pyodide/pyodide.mjs";
import { runWith } from "./harness.mjs";

const py = await loadPyodide({ indexURL: new URL("./pyodide/", import.meta.url).href });
postMessage({ type: "ready" });

onmessage = async (e) => {
  const { code, test } = e.data;
  // 準備: import している部品(numpy など)を読み込み、import 文だけ先に動かしておく。
  // 時間がかかるのはここなので、「止まらないコード」を見張る時計はこのあとから始める。
  try {
    await py.loadPackagesFromImports(`${code}\n${test ?? ""}`);
    const imports = code.split("\n").filter((l) => /^(import|from)\s/.test(l)).join("\n");
    if (imports) runWith(py, imports);
  } catch {
    // ここでの失敗は、本番の実行でエラーとして表示される
  }
  postMessage({ type: "start" });
  postMessage({ type: "result", result: runWith(py, code, test) });
};
