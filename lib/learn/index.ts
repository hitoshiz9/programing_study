// 教科書(説明と問題が1対 → 章末の演習問題)をまとめる。並びは章の順番。
import type { LearnChapter } from "./types.ts";
import { chapter as c1_0 } from "./c1-0.ts";
import { chapter as c1_1 } from "./c1-1.ts";
import { chapter as c1_2 } from "./c1-2.ts";
import { chapter as c1_3 } from "./c1-3.ts";
import { chapter as c1_4 } from "./c1-4.ts";
import { chapter as c2_1 } from "./c2-1.ts";
import { chapter as c2_2 } from "./c2-2.ts";
import { chapter as c2_3 } from "./c2-3.ts";
import { chapter as c3_1 } from "./c3-1.ts";
import { chapter as c3_2 } from "./c3-2.ts";
import { chapter as c3_3 } from "./c3-3.ts";
import { chapter as c4_1 } from "./c4-1.ts";
import { chapter as c4_2 } from "./c4-2.ts";
import { chapter as c4_3 } from "./c4-3.ts";
import { chapter as c5_1 } from "./c5-1.ts";
import { chapter as c5_2 } from "./c5-2.ts";
import { chapter as c5_3 } from "./c5-3.ts";
import { chapter as c6_1 } from "./c6-1.ts";
import { chapter as c6_2 } from "./c6-2.ts";
import { chapter as c6_3 } from "./c6-3.ts";
import { chapter as c7_1 } from "./c7-1.ts";
import { chapter as c7_2 } from "./c7-2.ts";
import { chapter as a_set } from "./a-set.ts";
import { chapter as a_recursion } from "./a-recursion.ts";
import { chapter as a_csv } from "./a-csv.ts";
import { chapter as a_command } from "./a-command.ts";
import { chapter as a_re } from "./a-re.ts";
import { chapter as a_visualization } from "./a-visualization.ts";
import { chapter as a_matplotlib } from "./a-matplotlib.ts";
import { chapter as a_bokeh } from "./a-bokeh.ts";

const ALL: LearnChapter[] = [c1_0, c1_1, c1_2, c1_3, c1_4, c2_1, c2_2, c2_3, c3_1, c3_2, c3_3, c4_1, c4_2, c4_3, c5_1, c5_2, c5_3, c6_1, c6_2, c6_3, c7_1, c7_2, a_set, a_recursion, a_csv, a_command, a_re, a_visualization, a_matplotlib, a_bokeh];

// 節がまだない章は出さない(作り直しの途中)
export const LEARN: LearnChapter[] = ALL.filter((c) => c.sections.length > 0);
