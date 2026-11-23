import type { Chapter } from "./types.ts";

// 付録：正規表現。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "A-re",
  title: "付録：正規表現",
  url: "https://utokyo-ipp.github.io/appendix/5-re.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 26,
  refProse: 8873,
};
