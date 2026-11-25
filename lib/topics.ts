import { MODULES } from "./chapters/index.ts";

// 東大教材の節(見出し)と、それを扱うアプリの問題の対応表。「省いていないか」をテストで確かめるために使う。
// 教材の練習は「練習: 〇〇」として並べ、同じ内容を独自に作り直した問題を対応させる。
// 1つめの id は説明もある問題(「書く」なら くわしい説明、「読む」なら解説)にする。
const BASE_TOPICS: Record<string, [section: string, lessonIds: string[]][]> = {};

// 章ファイル(lib/chapters)の対応表を合わせる
export const TOPICS: Record<string, [section: string, lessonIds: string[]][]> = {
  ...BASE_TOPICS,
  ...Object.fromEntries(MODULES.filter((m) => m.topics.length > 0).map((m) => [m.ref, m.topics])),
};
