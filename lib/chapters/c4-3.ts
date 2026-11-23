import type { Chapter } from "./types.ts";

// ディレクトリと木構造。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "4-3",
  title: "ディレクトリと木構造",
  url: "https://utokyo-ipp.github.io/4/4-3.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 5,
  refProse: 2174,
};
