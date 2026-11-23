// Python をブラウザの別スレッドで動かす。固まったら画面側が worker ごと止める。
// 置き場所(basePath)が変わっても動くよう、このファイルからの相対パスで読む。
import { loadPyodide } from "./pyodide/pyodide.mjs";
import { runWith } from "./harness.mjs";

const py = await loadPyodide({ indexURL: new URL("./pyodide/", import.meta.url).href });
postMessage({ type: "ready" });

onmessage = (e) => {
  const { code, test } = e.data;
  postMessage({ type: "result", result: runWith(py, code, test) });
};
