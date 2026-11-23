// Pyodide でコードを実行する共通部品。ブラウザの worker と自動テスト(Node)の両方から使う。

// Pyodide 内部の行を除き、利用者のコードに関わる部分だけ残す
function cleanError(msg) {
  const lines = msg.split("\n");
  const i = lines.findIndex((l) => l.includes('File "<exec>"'));
  return (i >= 0 ? ["Traceback (most recent call last):", ...lines.slice(i)] : lines)
    .join("\n")
    .trim();
}

// code を実行し、続けて test(任意)を同じ環境で実行する。出力は別々に返す。
export function runWith(py, code, test) {
  const ns = py.toPy({});
  let buf = "";
  const write = (s) => {
    buf += s + "\n";
  };
  py.setStdout({ batched: write });
  py.setStderr({ batched: write });
  py.setStdin({ error: true });
  const r = { out: "", testOut: "", error: null };
  try {
    py.runPython(code, { globals: ns });
    r.out = buf;
    buf = "";
    if (test) {
      py.runPython(test, { globals: ns });
      r.testOut = buf;
    }
  } catch (e) {
    if (!r.out) r.out = buf;
    r.error = cleanError(String(e && e.message ? e.message : e));
  } finally {
    ns.destroy();
  }
  return r;
}
