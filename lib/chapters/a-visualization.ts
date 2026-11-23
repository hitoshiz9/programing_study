import type { Chapter } from "./types.ts";

// 付録：簡単なデータの可視化。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "A-visualization",
  title: "付録：簡単なデータの可視化",
  url: "https://utokyo-ipp.github.io/appendix/3-visualization.html",
  stage: "ml",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 4,
  refProse: 944,
};
