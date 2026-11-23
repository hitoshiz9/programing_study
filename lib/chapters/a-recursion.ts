import type { Chapter } from "./types.ts";

// 付録：再帰。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "A-recursion",
  title: "付録：再帰",
  url: "https://utokyo-ipp.github.io/appendix/3-recursion.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 3,
  refProse: 923,
};
