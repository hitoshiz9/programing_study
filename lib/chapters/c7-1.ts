import type { Chapter } from "./types.ts";

// pandasライブラリ。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "7-1",
  title: "pandasライブラリ",
  url: "https://utokyo-ipp.github.io/7/7-1.html",
  stage: "ml",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 15,
  refProse: 7652,
};
