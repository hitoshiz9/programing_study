import { MODULES } from "./chapters/index.ts";

// レッスンごとの「くわしい説明」。東大教材の章と同じくらいの量を目安に、独自の文章で書く(教材の文は写さない)。
// code の例は、自動テストで実際に実行し、out と同じ結果になることを確かめている。
export type Block = { h: string } | { p: string } | { code: string; out: string };

// 説明を書き終えた章。テストで「教材の9割以上の量があるか」を確かめる対象(1-1〜2-1 は教科書 lib/learn に移した)。
const BASE_EXPLAINED: string[] = [];

const BASE_EXPLAIN: Record<string, Block[]> = {};

// 章ファイル(lib/chapters)の説明と、説明を書き終えた章を合わせる
const DONE_MODS = MODULES.filter((m) => m.topics.length > 0);
export const EXPLAINED_CHAPTERS = [...BASE_EXPLAINED, ...DONE_MODS.map((m) => m.ref)];
export const EXPLAIN: Record<string, Block[]> = Object.assign({}, BASE_EXPLAIN, ...MODULES.map((m) => m.explain));
