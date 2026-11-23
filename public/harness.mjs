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
  const r = { out: "", testOut: "", error: null, images: [] };
  try {
    py.runPython(SETUP);
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
    r.images = collectImages(py);
  }
  return r;
}
