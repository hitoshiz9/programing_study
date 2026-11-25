import type { Block } from "../explain.ts";

// 教科書の1節: 「説明 → その説明の問題」を1対にして、くり返す
export type Section = {
  title: string; // 教材の節の見出し
  // 説明(h / p / code)のまとまりの直後に { try: id } をちょうど1つ置く。{ code, out } の例は画面で書きかえて動かせる
  blocks: (Block | { try: string })[];
};

// 章: 節のあとに、独立した「演習問題」(章で習ったことを組み合わせる問題)のページを置く
// guide: アプリの使い方だけの章。Python の説明・問題・演習問題は置かない(節は2つまで)
export type LearnChapter = { ref: string; sections: Section[]; exercises: string[]; guide?: true };
