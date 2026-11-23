import type { Chapter } from "./types.ts";

// scikit-learnライブラリ。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "7-2",
  title: "scikit-learnライブラリ",
  url: "https://utokyo-ipp.github.io/7/7-2.html",
  stage: "ml",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 11,
  refProse: 4923,
};
