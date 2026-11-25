import type { LearnChapter } from "./types.ts";

// 付録 Matplotlib ライブラリ。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// 図は結果の下に画像で出るので、例の out は print した分だけ(図だけの例は空)。
export const chapter: LearnChapter = {
  ref: "A-matplotlib",
  sections: [
    {
      title: "線グラフ",
      blocks: [
        { h: "x と y を渡す: plt.plot(x, y)" },
        { p: "Matplotlib（マットプロットリブ）は、Python でグラフを描くためのライブラリ（便利な道具を集めたもの）です。グラフの命令は matplotlib.pyplot というモジュールにまとまっていて、import matplotlib.pyplot as plt と書いて plt という短い名前で使うのが習慣です。データは NumPy の配列で用意することも多いので、import numpy as np もいっしょに書くことがよくあります。" },
        { p: "plt.plot(y) のように1つだけ渡すと、横の値は 0, 1, 2, … の番号になります。plt.plot(x, y) と2つ渡すと、i 番目の点は (x[i], y[i]) の位置に打たれ、順に線でつながります。1つめが横（x）、2つめが縦（y）です。x と y の長さはそろえます。リストのかわりに NumPy の配列を渡してもかまいません。" },
        { code: "import matplotlib.pyplot as plt\n\nyears = [2020, 2022, 2024]\nusers = [5, 12, 30]\nplt.plot(years, users)\nplt.show()", out: "" },
        { p: "この例では、点 (2020, 5)・(2022, 12)・(2024, 30) が線でつながります。plt.show() で、描いたグラフが結果の下に画像で表示されます。グラフの中に日本語は出せないので、文字は英語で書きます。" },
        { try: "mpl-line" },
        { h: "線の色・形・印: color= linestyle= marker=" },
        { p: "plt.plot のかっこの中に、キーワード引数（名前= の形で渡す引数）を書くと、線の見た目を変えられます。color= は色で、\"red\"（赤）、\"blue\"（青）、\"green\"（緑）のような色の名前で書きます。linestyle= は線の形で、\"-\"（ふつうの線）、\"--\"（破線）、\":\"（点線）などがあります。" },
        { p: "marker= は、データの点に付ける印です。\"o\"（丸）、\"s\"（四角）、\"^\"（三角）、\"x\"（ばつ）などがあります。印を付けると、線の上のどこに本当のデータがあるのかが分かりやすくなります。3つは好きな順に、いくつでも書けます。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([4, 2, 5], color="green", linestyle=":", marker="^")\nplt.show()', out: "" },
        { try: "mpl-style" },
        { h: "題名と軸の名前: plt.title・plt.xlabel・plt.ylabel" },
        { p: "plt.title(文字列) でグラフの題名、plt.xlabel(文字列) で横軸の名前、plt.ylabel(文字列) で縦軸の名前を付けます。x が横、y が縦なので、xlabel が横軸、ylabel が縦軸です。何の量を、どんな単位で描いたのかを書いておくと、ほかの人が見ても分かるグラフになります。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([10, 20, 15])\nplt.title("Visitors")\nplt.xlabel("day")\nplt.ylabel("people")\nplt.show()', out: "" },
        { try: "mpl-title" },
        { h: "目盛りの線と凡例の場所: plt.grid と loc=" },
        { p: "plt.grid(True) を呼ぶと、目盛りの位置に細い線が引かれ、値を読みとりやすくなります。" },
        { p: "前の章で学んだように、plt.plot に label=\"名前\" を付けてから plt.legend() を呼ぶと、線の名前の一覧（凡例）が出ます。凡例の場所は、ふつうはじゃまにならない所が自動で選ばれますが、plt.legend(loc=\"upper left\")（左上）や loc=\"lower right\"（右下）のように自分で決めることもできます。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([1, 3, 2], label="first")\nplt.plot([2, 1, 3], label="second")\nplt.legend(loc="upper left")\nplt.grid(True)\nplt.show()', out: "" },
        { try: "mpl-legend" },
        { h: "点をふやして曲線を描く: np.arange・np.linspace・np.sin" },
        { p: "plot は点と点を直線でつなぐだけなので、どんなグラフも本当は折れ線です。でも点をとても細かくたくさん取ると、折れ目が見えなくなり、なめらかな曲線に見えます。横の値をたくさん作るには NumPy の関数を使います。" },
        { p: "np.arange(はじめ, 終わり, 刻み) は、はじめから刻みずつふやした値の配列を作ります（終わりの値は入りません）。np.linspace(はじめ, 終わり, 個数) は、はじめから終わりまでを等しい間隔に分けた、個数ぶんの値の配列を作ります（終わりの値も入ります）。" },
        { code: "import numpy as np\n\nprint(np.arange(0, 2, 0.5))\nprint(np.linspace(0, 2, 5))", out: "[0.  0.5 1.  1.5]\n[0.  0.5 1.  1.5 2. ]" },
        { p: "np.pi は円周率です。np.sin(配列)・np.cos(配列)・np.sqrt(配列) は、配列の値を1つずつサイン・コサイン・平方根にした配列を返すので、for を書かずに縦の値がまとめて作れます。角度はラジアン（180度が np.pi）です。" },
        { code: "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, np.pi, 5)\nprint(np.sin(x).round(2))\nplt.plot(x, np.sin(x))\nplt.show()", out: "[0.   0.71 1.   0.71 0.  ]" },
        { p: "点が5個だけなので、グラフはかくかくした折れ線になります。個数を 100 にすると、なめらかな山の形に見えます。" },
        { try: "mpl-curve" },
      ],
    },
    {
      title: "グラフの例：ソートアルゴリズムにおける比較回数",
      blocks: [
        { h: "グラフで手間を比べる" },
        { p: "並べ替え（ソート）のやり方によって、かかる手間は大きくちがいます。手間の目安として「値どうしを比べた回数」を数え、データの数を横、回数を縦にしたグラフを描くと、データがふえたときに手間がどうふえるかが、ひと目で分かります。" },
        { p: "まず、データの数を並べたリストを作り、それぞれの数について回数を求めたリストを作ります。そのあと、データの数のリストを x、回数のリストを y にして plt.plot(x, y) で描きます。" },
        { code: "import matplotlib.pyplot as plt\n\ndef steps(n):\n    return n * 3\n\nns = [10, 20, 30]\ncounts = [steps(n) for n in ns]\nprint(counts)\nplt.plot(ns, counts)\nplt.show()", out: "[30, 60, 90]" },
        { p: "たとえば、すべての2つの組を1回ずつ比べるやり方では、データが n 個のとき n × (n − 1) ÷ 2 回比べます。n が2倍になると回数はおよそ4倍になるので、グラフは上にそり返った曲線になります。速いやり方の回数も同じグラフに描いて label と凡例で区別すると、データが多いほど差が開いていく様子が見えます。" },
        { try: "mpl-sortcount" },
      ],
    },
    {
      title: "散布図",
      blocks: [
        { h: "点の大きさと透明さ: s= と alpha=" },
        { p: "散布図は plt.scatter(x, y) で描きます。線グラフと同じく color= と marker= で色と印を変えられるほか、s= で点の大きさ、alpha= で透明さを決められます。alpha は 0 から 1 の数で、0 なら完全に透明、1 なら透けません。点がたくさん重なるときは alpha を小さくすると、点が集まっている所ほど色が濃く見えます。" },
        { p: "練習用のデータは乱数で作ると便利です。np.random.rand(個数) は、0 以上 1 未満の乱数を個数ぶん並べた配列を作ります。先に np.random.seed(整数) で「種」を決めておくと、毎回同じ乱数の並びになります。" },
        { code: "import matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(3)\nx = np.random.rand(30)\ny = np.random.rand(30)\nprint(len(x), round(float(x[0]), 3))\nplt.scatter(x, y, s=60, alpha=0.4, color=\"purple\")\nplt.show()", out: "30 0.551" },
        { try: "mpl-scatter" },
        { h: "plot でも点だけを打てる" },
        { p: "plt.plot(x, y, \"o\") のように、3つめの引数に印の種類だけを書くと、線を引かずに点だけが打たれるので、散布図と同じ見た目になります。marker=\"o\" と書いたときは、印も付きますが、点と点を結ぶ線も引かれます。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [3, 1, 2], "^")\nplt.show()', out: "" },
        { try: "mpl-dots" },
      ],
    },
    {
      title: "棒グラフ",
      blocks: [
        { h: "棒の位置・太さ・色: plt.bar" },
        { p: "plt.bar(x, 高さ) は、x の位置に、それぞれの高さの棒を立てます。x を np.arange で作ると、棒が等しい間隔で並びます。np.arange(はじめ, 終わり) のように刻みを書かないと、刻みは 1 になり、np.arange(1, 4) は 1, 2, 3 です（終わりの 4 は入りません）。" },
        { p: "width= で棒の太さ（何も書かないと 0.8）、color= で色を決められます。" },
        { code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nprint(np.arange(1, 4))\nplt.bar(np.arange(1, 4), [6, 2, 4], width=0.5, color="green")\nplt.show()', out: "[1 2 3]" },
        { try: "mpl-bar" },
      ],
    },
    {
      title: "ヒストグラム",
      blocks: [
        { h: "値の集まり方を見る: plt.hist と bins=" },
        { p: "ヒストグラムは、データの値がどのあたりにどれだけあるかを見るためのグラフです。値の範囲を同じ幅の区間（ビン）に区切り、それぞれの区間に入るデータの数を棒の高さにします。plt.hist(データ, bins=区間の数) で描けます。" },
        { p: "np.random.randn(個数) は、0 のまわりに多く集まる「正規分布」という形の乱数を作ります。たくさん作ってヒストグラムにすると、真ん中が高く両側が低い、つりがねの形になります。bins を小さくすると大まかな形、大きくすると細かいでこぼこが見えます。" },
        { code: "import matplotlib.pyplot as plt\n\nscores = [1, 2, 2, 3, 3, 3, 4]\nplt.hist(scores, bins=3)\nplt.show()", out: "" },
        { p: "この例では、1〜4 の範囲が3つの区間に分けられ、棒の高さは左から 1、2、4 になります（最後の区間には 3 と 4 が入ります）。" },
        { try: "mpl-hist" },
      ],
    },
    {
      title: "ヒートマップ",
      blocks: [
        { h: "表を色で塗る: plt.imshow と plt.colorbar" },
        { p: "plt.imshow(2次元配列) は、配列の1つ1つの値を、小さいほど暗い色、大きいほど明るい色のマスで塗り分けます。このような図をヒートマップといいます。0 行目がいちばん上に描かれます。plt.colorbar() は、どの色がどの値に当たるかを示す帯を、図の横に付けます。" },
        { p: "数を数えた表を作るときは、np.zeros((行の数, 列の数), dtype=int) で、整数の 0 だけが並んだ2次元配列を用意し、当てはまるマスに += 1 で 1 を足していきます。" },
        { code: "import matplotlib.pyplot as plt\nimport numpy as np\n\nt = np.zeros((2, 3), dtype=int)\nt[0][2] += 1\nt[1][0] += 5\nprint(t)\nplt.imshow(t)\nplt.colorbar()\nplt.show()", out: "[[0 0 1]\n [5 0 0]]" },
        { try: "mpl-heat" },
      ],
    },
    {
      title: "グラフの画像ファイル出力",
      blocks: [
        { h: "画像ファイルに保存する: plt.savefig" },
        { p: "plt.savefig(ファイル名) は、描いたグラフを画像ファイルとして保存します。ファイル名の最後（拡張子）で形式が決まり、.png なら PNG、.svg なら SVG になります。plt.show() のあとで保存すると空の画像になる環境があるので、savefig は show より前に書きます。" },
        { p: "PNG のファイルは、先頭の数文字が PNG を表す決まった並びになっています。open(ファイル名, \"rb\") で開くと、ファイルの中身をそのままの並び（バイト列）として read() で読めます。バイト列を表示すると b'...' の形で出ます。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([3, 1])\nplt.savefig("demo.png")\nprint(open("demo.png", "rb").read()[1:4])', out: "b'PNG'" },
        { try: "mpl-savefig" },
      ],
    },
  ],
  // 章末の演習問題(教材の練習にあたる。データは架空)
  exercises: ["mpl-p-func", "mpl-p-month", "mpl-p-scatter", "mpl-p-bar", "mpl-p-hist", "mpl-p-heat"],
};
