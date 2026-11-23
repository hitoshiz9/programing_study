// 著作権の確認(手元で実行): アプリの説明文に、東大教材と同じ文字が25文字以上続く部分がないかを調べる。
// 教材は改変禁止(CC BY-NC-ND)なので、文章は写さず独自に書く方針。その確認用。
// 実行: node scripts/check-similarity.mts   (教材のページをネットから読むので、CI では動かさない)
import { CHAPTERS, LESSONS } from "../lib/lessons.ts";
import { READ_LESSONS } from "../lib/reading.ts";
import { ML_LESSONS } from "../lib/ml.ts";
import { EXPLAIN } from "../lib/explain.ts";

const N = 25;
const squash = (s: string) => s.replace(/\s+/g, "");
const textOf = (html: string) =>
  squash(html.replace(/<script[^]*?<\/script>|<style[^]*?<\/style>/g, "").replace(/<[^>]+>/g, "").replace(/&[a-z#0-9]+;/g, ""));

// 教材の全章の、25文字ずつの並びを集める
const ref = new Set<string>();
for (const r of Object.keys(CHAPTERS)) {
  const t = textOf(await (await fetch(`https://utokyo-ipp.github.io/${r.split("-")[0]}/${r}.html`)).text());
  for (let i = 0; i + N <= t.length; i++) ref.add(t.slice(i, i + N));
}

// アプリの説明文(コード例は除く)
const ours: [string, string][] = [];
for (const l of [...LESSONS, ...ML_LESSONS]) ours.push([l.id, l.intro.join("") + l.task + l.hints.join("")]);
for (const l of READ_LESSONS) ours.push([l.id, l.intro + l.explain]);
for (const [id, blocks] of Object.entries(EXPLAIN)) for (const b of blocks) if ("p" in b) ours.push([id, b.p]);

let hits = 0;
for (const [id, text] of ours) {
  const t = squash(text);
  for (let i = 0; i + N <= t.length; i++) {
    const w = t.slice(i, i + N);
    // 英数字と記号だけの並び(= コードの決まった書き方)は文章ではないので数えない
    if (/[^\x00-\x7f]/.test(w) && ref.has(w)) {
      console.log(`一致: ${id}「${t.slice(i, i + N)}」`);
      hits++;
      break;
    }
  }
}
console.log(hits ? `一致 ${hits} 件。書き直しが必要です。` : `一致 0 件(${ours.length} か所を確認)`);
process.exit(hits ? 1 : 0);
