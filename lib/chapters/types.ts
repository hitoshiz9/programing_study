import type { Lesson } from "../lessons.ts";
import type { ReadLesson } from "../reading.ts";
import type { Block } from "../explain.ts";

// 1章ぶんの内容。2-2 以降は、章ごとに1ファイル(lib/chapters/c〇-〇.ts)にまとめる。
export type Chapter = {
  ref: string; // 章の記号 (例: "2-2"、付録は "A-set")
  title: string; // 画面に出す章の名前
  url: string; // 東大教材の該当ページ
  stage: "write" | "ml"; // 「書く」か「AI」か
  order: string[]; // この章の問題の並び(既存の問題の id も入れてよい)。空なら、まだ作っていない章
  lessons: Omit<Lesson, "ref">[]; // この章で新しく作った問題
  reads: Omit<ReadLesson, "ref">[]; // この章の「読む」問題
  explain: Record<string, Block[]>; // 問題の id ごとの「くわしい説明」
  topics: [section: string, lessonIds: string[]][]; // 教材の節と、それを扱う問題(1つめは説明のある問題)
  refSections: number; // 教材の節の数 + 練習の数(2026-11-24 に数えた。変えない)
  refProse: number; // 教材の説明文の文字数(空白を除く。2026-11-24 に測った。変えない)
};
