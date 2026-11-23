import type { Chapter } from "./types.ts";

// 付録：このアプリでの操作（Jupyter Notebook の使い方にあたる章）。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "A-jupyter",
  title: "付録：このアプリでの操作（Jupyter Notebook の使い方にあたる章）",
  url: "https://utokyo-ipp.github.io/appendix/1-jupyter-notebook.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 5,
  refProse: 1646,
};
