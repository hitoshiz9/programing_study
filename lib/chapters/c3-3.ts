import type { Chapter } from "./types.ts";

// 関数。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "3-3",
  title: "関数",
  url: "https://utokyo-ipp.github.io/3/3-3.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 12,
  refProse: 2773,
};
