import type { Chapter } from "./types.ts";

// 内包表記。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "6-1",
  title: "内包表記",
  url: "https://utokyo-ipp.github.io/6/6-1.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 11,
  refProse: 2596,
};
