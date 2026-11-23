import type { Chapter } from "./types.ts";

// 付録：CSVファイルの入出力。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "A-csv",
  title: "付録：CSVファイルの入出力",
  url: "https://utokyo-ipp.github.io/appendix/4-csv.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 8,
  refProse: 2621,
};
