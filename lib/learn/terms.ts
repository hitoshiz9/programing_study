// コードに出てくる「説明が必要なもの」(記号・関数・メソッド・引数・文法の言葉)を取り出す。
// 「習っていないものを問題に出さない」ことを自動テストで確かめるために使う。

const KEYWORDS = new Set(
  "import from as def return for while if elif else in not and or is lambda with class try except finally raise break continue pass None True False global yield del assert".split(
    " ",
  ),
);
const OPS = ["**=", "//=", "**", "//", "==", "!=", "<=", ">=", "+=", "-=", "*=", "/=", "%=", "->", "+", "-", "*", "/", "%", "<", ">", "="];

export function termsOf(code: string): string[] {
  const out = new Set<string>();
  // 文字列の中身は説明の対象外。コメントは「#」という書き方だけを対象にする
  const noStr = code.replace(/("""|''')[\s\S]*?\1|(["'])(?:\\.|(?!\2)[^\n])*\2/g, '""');
  if (/#/.test(noStr)) out.add("#");
  const c = noStr.replace(/#.*$/gm, "");
  // そのコードの中で自分で作った名前(変数・関数・クラス・引数)は説明しなくてよい
  const own = new Set<string>();
  for (const m of c.matchAll(/\b(?:def|class)\s+(\w+)(?:\(([^)]*)\))?/g)) {
    own.add(m[1]);
    for (const p of (m[2] ?? "").split(",")) own.add(p.split(/[=:]/)[0].replace(/\*/g, "").trim());
  }
  for (const m of c.matchAll(/^\s*([\w, ]+?)\s*(?:[+\-*/%]|\*\*|\/\/)?=(?!=)/gm)) for (const n of m[1].split(",")) own.add(n.trim());
  for (const m of c.matchAll(/\bfor\s+([\w, ]+?)\s+in\b/g)) for (const n of m[1].split(",")) own.add(n.trim());
  for (const m of c.matchAll(/\bas\s+(\w+)/g)) own.add(m[1]);
  for (const m of c.matchAll(/\blambda\s+([\w, ]*):/g)) for (const n of m[1].split(",")) own.add(n.trim());
  // 問題の中で、文字列としてファイルに書いて作るモジュール(greet.py)と、その中の関数・クラスも自分で作った名前
  for (const m of code.matchAll(/\b(\w+)\.py\b/g)) own.add(m[1]);
  for (const m of code.matchAll(/\b(?:def|class)\s+(\w+)/g)) own.add(m[1]);

  for (const m of c.matchAll(/\b[A-Za-z_]\w*\b/g)) {
    const w = m[0];
    const before = c[m.index! - 1];
    const after = c.slice(m.index! + w.length).match(/^\s*(\(|=(?!=))?/)![1];
    if (KEYWORDS.has(w)) out.add(w);
    else if (before === ".") {
      if (!own.has(w)) out.add(w); // メソッドや部品の中身(math.sqrt の sqrt など)
    }
    else if (after === "(" && !own.has(w)) out.add(w); // 関数
    else if (after === "=" && !own.has(w) && /[(,]\s*$/.test(c.slice(0, m.index))) out.add(w + "="); // 引数の名前(end= など)
    else if (!own.has(w) && /\bimport\s+[\w, ]*$|\bfrom\s+$/.test(c.slice(0, m.index))) out.add(w); // 読みこむ部品の名前
  }
  let rest = c;
  for (const op of OPS) {
    const re = new RegExp(op.replace(/[*+/\-?]/g, "\\$&"), "g");
    if (op === "=" ? /(^|[^=!<>+\-*/%])=(?!=)/.test(rest) : re.test(rest)) out.add(op);
    rest = rest.replace(re, " ");
  }
  return [...out];
}

// 説明の文章(見出しと段落)に、その言葉が出てくるか。英字の言葉は単語として、記号は前後に別の記号がないものとして探す。
export function mentions(text: string, term: string): boolean {
  if (/^\w/.test(term)) {
    const t = term.replace(/=$/, "");
    return new RegExp(`(?<!\\w)${t}(?!\\w)`).test(text);
  }
  const esc = term.replace(/[*+/\-?|^$.()[\]{}\\]/g, "\\$&");
  return new RegExp(`(?<![*/%=<>!+\\-])${esc}(?![*/%=<>!+\\-])`).test(text);
}
