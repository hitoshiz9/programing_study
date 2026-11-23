import type { Chapter } from "./types.ts";

// ファイル入出力の基本。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "4-1",
  title: "ファイル入出力の基本",
  url: "https://utokyo-ipp.github.io/4/4-1.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 12,
  refProse: 4326,
};
