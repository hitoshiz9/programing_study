import type { Chapter } from "./types.ts";

// このアプリの使い方（教材の Colab の使い方にあたる章）。order が空のあいだは「まだ作っていない章」として扱う(既存の問題は lessons.ts / ml.ts の並びのまま)。
export const chapter: Chapter = {
  ref: "1-0",
  title: "このアプリの使い方（教材の Colab の使い方にあたる章）",
  url: "https://utokyo-ipp.github.io/1/1-0.html",
  stage: "write",
  order: [],
  lessons: [],
  reads: [],
  explain: {},
  topics: [],
  refSections: 11,
  refProse: 2416,
};
