import type { Chapter } from "./types.ts";

// 辞書。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "3-1",
  title: "辞書",
  url: "https://utokyo-ipp.github.io/3/3-1.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 13,
  refProse: 2620,
};
