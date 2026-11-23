import type { Chapter } from "./types.ts";

// 付録：Matplotlibライブラリ。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "A-matplotlib",
  title: "付録：Matplotlibライブラリ",
  url: "https://utokyo-ipp.github.io/appendix/5-matplotlib.html",
  stage: "ml",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 13,
  refProse: 4791,
};
