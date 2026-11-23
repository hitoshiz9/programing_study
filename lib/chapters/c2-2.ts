import type { Chapter } from "./types.ts";

// リスト。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "2-2",
  title: "リスト",
  url: "https://utokyo-ipp.github.io/2/2-2.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 33,
  refProse: 8142,
};
