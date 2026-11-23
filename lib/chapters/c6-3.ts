import type { Chapter } from "./types.ts";

// クラス。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "6-3",
  title: "クラス",
  url: "https://utokyo-ipp.github.io/6/6-3.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 7,
  refProse: 4290,
};
