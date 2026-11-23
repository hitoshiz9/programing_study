import type { Chapter } from "./types.ts";

// 付録：セット (set)。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "A-set",
  title: "付録：セット (set)",
  url: "https://utokyo-ipp.github.io/appendix/2-set.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 13,
  refProse: 1552,
};
