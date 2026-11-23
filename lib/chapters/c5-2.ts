import type { Chapter } from "./types.ts";

// モジュールの作り方。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "5-2",
  title: "モジュールの作り方",
  url: "https://utokyo-ipp.github.io/5/5-2.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 4,
  refProse: 1459,
};
