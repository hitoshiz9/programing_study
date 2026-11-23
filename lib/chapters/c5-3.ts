import type { Chapter } from "./types.ts";

// NumPyライブラリ。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "5-3",
  title: "NumPyライブラリ",
  url: "https://utokyo-ipp.github.io/5/5-3.html",
  stage: "ml",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 25,
  refProse: 5475,
};
