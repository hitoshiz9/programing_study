// Pyodide でコードを実行する共通部品。ブラウザの worker と自動テスト(Node)の両方から使う。

// Pyodide 内部の行を除き、利用者のコードに関わる部分だけ残す
function cleanError(msg) {
  const lines = msg.split("\n");
  const i = lines.findIndex((l) => l.includes('File "<exec>"'));
  return (i >= 0 ? ["Traceback (most recent call last):", ...lines.slice(i)] : lines)
    .join("\n")
    .trim();
}

// グラフは画面のない環境でも描ける Agg で描く。plt.show() の注意書きや、
// 日本語の文字がないという注意書きは、出力(=判定の対象)に混ざらないようにする。
const SETUP = `
import os, warnings
os.environ.setdefault("MPLBACKEND", "Agg")
warnings.filterwarnings("ignore", message=".*non-interactive.*")
warnings.filterwarnings("ignore", message=".*[Gg]lyph.*")
`;

// 描かれたグラフを PNG(base64)にして取り出し、次の実行に残らないよう閉じる
const COLLECT = `
def _collect_figures():
    import sys
    plt = sys.modules.get("matplotlib.pyplot")
    if plt is None:
        return []
    import io, base64
    images = []
    for n in plt.get_fignums():
        buf = io.BytesIO()
        plt.figure(n).savefig(buf, format="png", dpi=80)
        images.append(base64.b64encode(buf.getvalue()).decode())
    plt.close("all")
    return images
_collect_figures()
`;

function collectImages(py) {
  try {
    const p = py.runPython(COLLECT);
    const images = p.toJs();
    p.destroy();
    return images;
  } catch {
    return [];
  }
}

// 改行で終わらない出力(print(..., end="") など)も、その実行の結果に入れる。
// これをしないと、残った出力が次の実行の結果の先頭に出てしまう。
const FLUSH = "import sys; sys.stdout.flush(); sys.stderr.flush()";

// code を実行し、続けて test(任意)を同じ環境で実行する。出力は別々に返す。
export function runWith(py, code, test) {
  const ns = py.toPy({});
  let buf = "";
  // 1行ずつではなく、書かれたとおりのバイト列で受け取る(改行で終わらない出力も取りこぼさない)
  const writer = () => {
    const dec = new TextDecoder();
    return {
      write: (bytes) => {
        buf += dec.decode(bytes, { stream: true });
        return bytes.length;
      },
    };
  };
  py.setStdout(writer());
  py.setStderr(writer());
  py.setStdin({ error: true });
  const r = { out: "", testOut: "", error: null, images: [] };
  try {
    py.runPython(SETUP);
    py.runPython(code, { globals: ns });
    py.runPython(FLUSH);
    r.out = buf;
    buf = "";
    if (test) {
      py.runPython(test, { globals: ns });
      py.runPython(FLUSH);
      r.testOut = buf;
    }
  } catch (e) {
    try {
      py.runPython(FLUSH);
    } catch {}
    if (!r.out) r.out = buf;
    r.error = cleanError(String(e && e.message ? e.message : e));
  } finally {
    ns.destroy();
    r.images = collectImages(py);
  }
  return r;
}
