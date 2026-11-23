import type { Chapter } from "./types.ts";

// 繰り返し。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "3-2",
  title: "繰り返し",
  url: "https://utokyo-ipp.github.io/3/3-2.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 30,
  refProse: 8990,
};
