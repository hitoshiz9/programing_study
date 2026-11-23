import type { Chapter } from "./types.ts";

// モジュールの使い方。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "5-1",
  title: "モジュールの使い方",
  url: "https://utokyo-ipp.github.io/5/5-1.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 4,
  refProse: 1248,
};
