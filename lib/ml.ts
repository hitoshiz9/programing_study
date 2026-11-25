import type { Lesson } from "./lessons";
import { CHAPTER_ORDER, MODULES } from "./chapters/index.ts";

// ステージ「AI(機械学習)」: NumPy → pandas → scikit-learn の順。形式は「書く」と同じ。
// 章は東大教材の 5-3 / 7-1 / 7-2。文章は独自。
const PD_STARTER =
  'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["ぴよ", "ミケ", "ポチ", "タマ"],\n    "team": ["赤", "白", "赤", "白"],\n    "score": [80, 65, 90, 75],\n})\n';
const LR_STARTER =
  "from sklearn.linear_model import LinearRegression\n\n# 勉強した時間(X) と テストの点数(y)\nX = [[1], [2], [3], [4], [5]]\ny = [50, 60, 70, 80, 90]\n";
const LR_FITTED = LR_STARTER + "\nmodel = LinearRegression()\nmodel.fit(X, y)\n";
const IRIS_STARTER =
  "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\n\n" +
  "X, y = load_iris(return_X_y=True)  # アヤメの花 150 本のデータ\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)\nmodel = DecisionTreeClassifier(random_state=0)\n";

const BASE_ML: Lesson[] = [
  {
    id: "m-np-array",
    ref: "5-3",
    title: "NumPy：数をまとめて計算する",
    intro: [
      "NumPy（ナムパイ）は、たくさんの数をまとめて計算する道具です。機械学習のほとんどの道具が、中で NumPy を使っています。",
      "import numpy as np と書き、np.array([...]) で作ります。リストと違い、a * 2 と書くと全部の数が一度に2倍になります。",
    ],
    example: "import numpy as np\na = np.array([1, 2, 3])\nprint(a + 10)",
    task: "prices は品物の値段です。それぞれの品物を1つ買って 1000 円札で払ったときの、おつり（1000 から値段を引いた数）を並べた配列を表示しよう。",
    starter: "import numpy as np\n\nprices = np.array([100, 250, 80])\n",
    solution: "import numpy as np\n\nprices = np.array([100, 250, 80])\nprint(1000 - prices)",
    wrong: "import numpy as np\n\nprices = np.array([100, 250, 80])\nprint(prices - 1000)",
    expect: "[900 750 920]",
    mustInclude: ["prices"],
    hints: ["for は使わなくて大丈夫です。数が左にあっても、配列のすべての要素と計算されます。", "print(1000 - prices) です。"],
    xp: 20,
  },
  {
    id: "m-np-stats",
    ref: "5-3",
    title: "NumPy：平均と最大",
    intro: ["NumPy の配列には、.mean()（平均）、.max()（最大）、.min()（最小）、.sum()（合計）があります。データの特徴をつかむ第一歩です。"],
    example: "import numpy as np\na = np.array([2, 4, 6])\nprint(a.mean(), a.min())",
    task: "scores の平均点と最高点を、1行に並べて表示しよう。",
    starter: "import numpy as np\n\nscores = np.array([70, 85, 90, 55])\n",
    solution: "import numpy as np\n\nscores = np.array([70, 85, 90, 55])\nprint(scores.mean(), scores.max())",
    wrong: "import numpy as np\n\nscores = np.array([70, 85, 90, 55])\nprint(scores.sum(), scores.max())",
    expect: "75.0 90",
    mustInclude: ["mean"],
    hints: ["平均は scores.mean() です。", "print(scores.mean(), scores.max()) です。"],
    xp: 20,
  },
  {
    id: "m-np-filter",
    ref: "5-3",
    title: "NumPy：条件で選び出す",
    intro: ["scores[scores >= 80] と書くと、条件に合う値だけを取り出せます。データの中から、気になるものだけを見るときに使います。"],
    example: "import numpy as np\na = np.array([3, 8, 1, 9])\nprint(a[a > 5])",
    task: "scores の中から、80 点以上の点数だけを表示しよう。",
    starter: "import numpy as np\n\nscores = np.array([70, 85, 90, 55])\n",
    solution: "import numpy as np\n\nscores = np.array([70, 85, 90, 55])\nprint(scores[scores >= 80])",
    wrong: "import numpy as np\n\nscores = np.array([70, 85, 90, 55])\nprint(scores[scores > 85])",
    expect: "[85 90]",
    mustInclude: ["scores["],
    hints: ["[ ] の中に、条件 scores >= 80 を書きます。", "print(scores[scores >= 80]) です。"],
    xp: 20,
  },
  {
    id: "m-np-2d",
    ref: "5-3",
    title: "NumPy：表の形のデータ",
    intro: [
      "[[...], [...]] と書くと、行と列がある「表」の形になります。機械学習のデータは、ほとんどこの形です。",
      ".shape は（行の数, 列の数）です。.sum(axis=0) は、縦（列ごと）に合計します。",
    ],
    example: "import numpy as np\nm = np.array([[1, 2], [3, 4]])\nprint(m.shape)",
    task: "m の形を表示し、次の行に列ごとの合計を表示しよう。",
    starter: "import numpy as np\n\nm = np.array([[1, 2, 3], [4, 5, 6]])\n",
    solution: "import numpy as np\n\nm = np.array([[1, 2, 3], [4, 5, 6]])\nprint(m.shape)\nprint(m.sum(axis=0))",
    wrong: "import numpy as np\n\nm = np.array([[1, 2, 3], [4, 5, 6]])\nprint(m.shape)\nprint(m.sum())",
    expect: "(2, 3)\n[5 7 9]",
    mustInclude: ["axis"],
    hints: ["形は print(m.shape) です。", "列ごとの合計は m.sum(axis=0) です。"],
    xp: 25,
  },
  {
    id: "m-pd-df",
    ref: "7-1",
    title: "pandas：表を作って調べる",
    intro: [
      "pandas（パンダス）は、Excel のような表（DataFrame）を扱う道具です。",
      "df[\"列の名前\"] で1列を取り出せます。len(df) は行の数です。",
    ],
    example: 'import pandas as pd\ndf = pd.DataFrame({"x": [1, 2, 3]})\nprint(df["x"].sum())',
    task: "df の行の数を表示し、次の行に score の平均を表示しよう。",
    starter: PD_STARTER,
    solution: PD_STARTER + 'print(len(df))\nprint(df["score"].mean())',
    wrong: PD_STARTER + 'print(len(df))\nprint(df["score"].max())',
    expect: "4\n77.5",
    mustInclude: ['df["score"]'],
    hints: ["行の数は print(len(df)) です。", 'score の平均は df["score"].mean() です。'],
    xp: 25,
  },
  {
    id: "m-pd-filter",
    ref: "7-1",
    title: "pandas：条件で行を選ぶ",
    intro: [
      "df[df[\"score\"] >= 80] と書くと、条件に合う行だけの表になります。NumPy と同じ考え方です。",
      ".tolist() を付けると、ふつうのリストになります。",
    ],
    example: 'import pandas as pd\ndf = pd.DataFrame({"x": [1, 5, 9]})\nprint(df[df["x"] > 3]["x"].tolist())',
    task: "score が 80 以上の人の name を、リストで表示しよう。",
    starter: PD_STARTER,
    solution: PD_STARTER + 'print(df[df["score"] >= 80]["name"].tolist())',
    wrong: PD_STARTER + 'print(df["name"].tolist())',
    expect: "['ぴよ', 'ポチ']",
    mustInclude: ["tolist"],
    hints: ['まず df[df["score"] >= 80] で行を選びます。', 'そのあと ["name"].tolist() を付けて print します。'],
    xp: 25,
  },
  {
    id: "m-pd-groupby",
    ref: "7-1",
    title: "pandas：グループごとに集計する",
    intro: ["df.groupby(\"team\") は、team ごとにグループ分けします。そのあと [\"score\"].mean() で、グループごとの平均が出ます。"],
    example: 'import pandas as pd\ndf = pd.DataFrame({"k": ["a", "b", "a"], "v": [1, 2, 3]})\nprint(df.groupby("k")["v"].sum().to_dict())',
    task: "team ごとの score の平均を、.to_dict() で辞書にして表示しよう。",
    starter: PD_STARTER,
    solution: PD_STARTER + 'print(df.groupby("team")["score"].mean().to_dict())',
    wrong: PD_STARTER + 'print(df.groupby("team")["score"].sum().to_dict())',
    expect: "{'白': 70.0, '赤': 85.0}",
    mustInclude: ["groupby"],
    hints: ['df.groupby("team")["score"] で、チームごとの score になります。', "そのあと .mean().to_dict() を付けて print します。"],
    xp: 30,
  },
  {
    id: "m-pd-sort",
    ref: "7-1",
    title: "pandas：並べ替えて1位を見つける",
    intro: [
      "df.sort_values(\"score\", ascending=False) で、score の高い順に並べます。",
      ".iloc[0] は「並べたあとの1行目」です。",
    ],
    example: 'import pandas as pd\ndf = pd.DataFrame({"x": [3, 1, 2]})\nprint(df.sort_values("x").iloc[0]["x"])',
    task: "score がいちばん高い人の name を表示しよう。",
    starter: PD_STARTER,
    solution: PD_STARTER + 'top = df.sort_values("score", ascending=False).iloc[0]\nprint(top["name"])',
    wrong: PD_STARTER + 'top = df.sort_values("score").iloc[0]\nprint(top["name"])',
    expect: "ポチ",
    mustInclude: ["sort_values"],
    hints: ['ascending=False を付けると、大きい順になります。', 'top = df.sort_values("score", ascending=False).iloc[0] のあと print(top["name"]) です。'],
    xp: 30,
  },
  {
    id: "m-sk-linear",
    ref: "7-2",
    title: "機械学習のはじまり：線を引いて予測する",
    intro: [
      "機械学習は「データから決まりを見つけて、まだ見ていないものを予測する」ことです。scikit-learn（サイキット・ラーン）はその道具箱です。",
      "使い方はいつも同じ3つ：① model = 〇〇() で作る、② model.fit(X, y) で学習、③ model.predict(...) で予測。",
      "X は [[1], [2]] のように表の形（2重かっこ）で渡します。",
    ],
    example: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit([[1], [2]], [10, 20])\nprint(model.predict([[3]]))",
    task: "勉強時間と点数のデータで学習し、6 時間勉強したときの点数を予測して表示しよう。",
    starter: LR_STARTER,
    solution: LR_FITTED + "print(model.predict([[6]]))",
    wrong: LR_FITTED + "print(model.predict([[5]]))",
    expect: "[100.]",
    mustInclude: ["fit", "predict"],
    hints: ["model = LinearRegression() と model.fit(X, y) を書きます。", "print(model.predict([[6]])) で予測を表示します。"],
    xp: 35,
  },
  {
    id: "m-sk-coef",
    ref: "7-2",
    title: "学習した「決まり」をのぞく",
    intro: [
      "LinearRegression は「点数 = 傾き × 時間 + 切片」という直線を学習します。",
      "学習したあと、傾きは model.coef_[0]、切片は model.intercept_ で見られます。",
    ],
    example: "print(round(3.14159, 1))  # 小数第1位まで",
    task: "学習した傾きと切片を、round で小数第1位までにして、1行に並べて表示しよう。",
    starter: LR_FITTED,
    solution: LR_FITTED + "print(round(model.coef_[0], 1), round(model.intercept_, 1))",
    wrong: LR_FITTED + "print(round(model.intercept_, 1), round(model.coef_[0], 1))",
    expect: "10.0 40.0",
    mustInclude: ["coef_"],
    hints: ["傾きが先、切片があとです。", "print(round(model.coef_[0], 1), round(model.intercept_, 1)) です。"],
    xp: 35,
  },
  {
    id: "m-sk-knn",
    ref: "7-2",
    title: "分類：近いなかまで決める",
    intro: [
      "「りんごか、みかんか」のように種類を当てることを「分類」といいます。",
      "KNeighborsClassifier は、いちばん近いデータの種類をまねします。使い方は fit → predict で同じです。",
    ],
    example: "from sklearn.neighbors import KNeighborsClassifier\nmodel = KNeighborsClassifier(n_neighbors=1)",
    task: "果物のデータで学習し、[160, 1] と [125, 0] の2つの種類を、まとめて予測して表示しよう。",
    starter:
      'from sklearn.neighbors import KNeighborsClassifier\n\n# [重さ(g), 赤いか(1/0)]\nX = [[150, 1], [170, 1], [130, 0], [120, 0]]\ny = ["りんご", "りんご", "みかん", "みかん"]\n',
    solution:
      'from sklearn.neighbors import KNeighborsClassifier\n\n# [重さ(g), 赤いか(1/0)]\nX = [[150, 1], [170, 1], [130, 0], [120, 0]]\ny = ["りんご", "りんご", "みかん", "みかん"]\nmodel = KNeighborsClassifier(n_neighbors=1)\nmodel.fit(X, y)\nprint(model.predict([[160, 1], [125, 0]]))',
    wrong:
      'from sklearn.neighbors import KNeighborsClassifier\n\n# [重さ(g), 赤いか(1/0)]\nX = [[150, 1], [170, 1], [130, 0], [120, 0]]\ny = ["りんご", "りんご", "みかん", "みかん"]\nmodel = KNeighborsClassifier(n_neighbors=1)\nmodel.fit(X, y)\nprint(model.predict([[160, 1]]))',
    expect: "['りんご' 'みかん']",
    mustInclude: ["KNeighborsClassifier(", "fit"],
    hints: ["model = KNeighborsClassifier(n_neighbors=1) と model.fit(X, y) を書きます。", "print(model.predict([[160, 1], [125, 0]])) です。"],
    xp: 35,
  },
  {
    id: "m-sk-iris",
    ref: "7-2",
    title: "テスト用のデータで正しさを測る",
    intro: [
      "学習に使ったデータで正しさを測ると、答えを見てからテストを受けるのと同じで、高く出すぎます。",
      "そこで train_test_split で「学習用」と「テスト用」に分け、テスト用で model.score( ) を測ります（正解の割合）。",
    ],
    example: "# score は 0〜1。1.0 なら全問正解です",
    task: "学習用のデータ(X_train, y_train)で学習し、テスト用(X_test, y_test)の正解率を、小数第2位まで表示しよう。",
    starter: IRIS_STARTER,
    solution: IRIS_STARTER + "model.fit(X_train, y_train)\nprint(round(model.score(X_test, y_test), 2))",
    wrong: IRIS_STARTER + "model.fit(X_train, y_train)\nprint(round(model.score(X_train, y_train), 2))",
    expect: "0.98",
    mustInclude: ["score"],
    hints: ["まず model.fit(X_train, y_train) です。", "print(round(model.score(X_test, y_test), 2)) です。"],
    xp: 40,
  },
];

// 章ファイル(lib/chapters)で並びが決まっている「AI」の章は、そちらの並びを使う
const ML_MODS = MODULES.filter((m) => m.stage === "ml" && m.order.length > 0);
const ML_POOL: Lesson[] = [...BASE_ML, ...ML_MODS.flatMap((m) => m.lessons.map((l) => ({ ...l, ref: m.ref })))];
const ML_REFS = [...new Set([...BASE_ML.map((l) => l.ref), ...ML_MODS.map((m) => m.ref)])].sort(
  (a, b) => CHAPTER_ORDER.indexOf(a) - CHAPTER_ORDER.indexOf(b),
);

export const ML_LESSONS: Lesson[] = ML_REFS.flatMap((ref) => {
  const m = ML_MODS.find((x) => x.ref === ref);
  const ids = m ? m.order : BASE_ML.filter((l) => l.ref === ref).map((l) => l.id);
  return ids.map((id) => {
    const l = ML_POOL.find((x) => x.id === id);
    if (!l) throw new Error(`レッスンがありません: ${id}`);
    return { ...l, ref };
  });
});
if (new Set(ML_LESSONS.map((l) => l.id)).size !== ML_LESSONS.length) throw new Error("同じレッスンが2回並んでいます");
if (ML_LESSONS.length !== ML_POOL.length) throw new Error("並びに入っていないレッスンがあります");
