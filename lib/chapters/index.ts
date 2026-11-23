// 章ファイルをまとめる。並びは画面の章の順番。
import type { Chapter } from "./types.ts";
import { chapter as c0 } from "./c1-0.ts";
import { chapter as c1 } from "./c2-2.ts";
import { chapter as c2 } from "./c2-3.ts";
import { chapter as c3 } from "./c3-1.ts";
import { chapter as c4 } from "./c3-2.ts";
import { chapter as c5 } from "./c3-3.ts";
import { chapter as c6 } from "./c4-1.ts";
import { chapter as c7 } from "./c4-2.ts";
import { chapter as c8 } from "./c4-3.ts";
import { chapter as c9 } from "./c5-1.ts";
import { chapter as c10 } from "./c5-2.ts";
import { chapter as c11 } from "./c5-3.ts";
import { chapter as c12 } from "./c6-1.ts";
import { chapter as c13 } from "./c6-2.ts";
import { chapter as c14 } from "./c6-3.ts";
import { chapter as c15 } from "./c7-1.ts";
import { chapter as c16 } from "./c7-2.ts";
import { chapter as c17 } from "./a-jupyter.ts";
import { chapter as c18 } from "./a-set.ts";
import { chapter as c19 } from "./a-recursion.ts";
import { chapter as c20 } from "./a-csv.ts";
import { chapter as c21 } from "./a-command.ts";
import { chapter as c22 } from "./a-re.ts";
import { chapter as c23 } from "./a-visualization.ts";
import { chapter as c24 } from "./a-matplotlib.ts";
import { chapter as c25 } from "./a-bokeh.ts";

export const MODULES: Chapter[] = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25];

// 画面に出す章の順番(本編 → 付録)
export const CHAPTER_ORDER = [
  "1-0", "1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "3-1", "3-2", "3-3", "4-1", "4-2", "4-3",
  "5-1", "5-2", "5-3", "6-1", "6-2", "6-3", "7-1", "7-2",
  "A-jupyter", "A-set", "A-recursion", "A-csv", "A-command", "A-re", "A-visualization", "A-matplotlib", "A-bokeh",
];
