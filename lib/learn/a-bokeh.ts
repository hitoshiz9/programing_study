import type { LearnChapter } from "./types.ts";

// 付録 Bokeh ライブラリ。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// Bokeh はこのアプリでは動かないので、Bokeh の書き方は文章で説明し、例と問題は同じ種類のグラフを Matplotlib で描く。
export const chapter: LearnChapter = {
  ref: "A-bokeh",
  sections: [
    {
      title: "線グラフ",
      blocks: [
        { h: "Bokeh とは・線グラフの書き方" },
        { p: "Bokeh（ボケ）も、グラフを描くためのライブラリの1つです。Matplotlib が「画像」を作るのに対して、Bokeh はブラウザの中で動くグラフを作ります。マウスでグラフを動かしたり、拡大したり、画像として保存したりする道具（ツールバー）が最初から付いているのが特徴です。" },
        { p: "Bokeh は、Python で作ったグラフのデータを、BokehJS という、ブラウザで動く部品（JavaScript で書かれたもの）に渡して表示する仕組みです。この章では、Bokeh での書き方を文章で紹介し、同じ種類のグラフを Matplotlib で描いて練習します。" },
        { p: "Bokeh では、from bokeh.plotting import figure, show, output_notebook と書いて読みこみます。Jupyter で使うときは、最初に output_notebook() を呼んで「グラフをノートブックの中に出す」と決めておきます。p = figure(title=\"Sales\", x_axis_label=\"week\", y_axis_label=\"count\") でグラフの台紙を作り、p.line(x, y) で線を描き、最後に show(p) で表示します。題名や軸の名前を、台紙を作るときにまとめて渡すのが Matplotlib とのちがいです。" },
        { p: "線の見た目は、p.line(x, y, line_color=\"red\", line_dash=\"dashed\", line_width=2, legend_label=\"train\") のようにキーワード引数で決めます。line_dash は \"dashed\"（破線）や \"dotted\"（点線）、line_width は線の太さです。legend_label を付けた線は、自動で凡例に並びます。" },
        { p: "Matplotlib では、line_color= は color=、line_dash=\"dashed\" は linestyle=\"--\"、line_dash=\"dotted\" は linestyle=\":\"、line_width= は linewidth=、legend_label= は label= に当たり、凡例は plt.legend() を呼んで出します。linewidth を書かないと、ふつうの太さ（1.5）になります。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([3, 2, 4], color="red", linestyle="--", linewidth=1, label="a")\nplt.plot([1, 3, 2], color="blue", linewidth=4, label="b")\nplt.legend()\nplt.show()', out: "" },
        { p: "色を1つずつ考えるのが面倒なときは、Bokeh では bokeh.palettes にある「パレット」（よく合う色の組み合わせ）を使えます。Matplotlib では、色を書かなければ、見分けやすい色が順に自動で選ばれます。" },
        { try: "bok-line" },
      ],
    },
    {
      title: "グラフの例：ソートアルゴリズムにおける比較回数",
      blocks: [
        { h: "半分にしながら数える: while と //=" },
        { p: "データの数を横、処理で比べた回数を縦にしたグラフは、やり方（アルゴリズム）の速さを比べるのに役立ちます。ここでは並べ替えのかわりに「探す」処理で比べます。前から順に1つずつ探す方法は、いちばん後ろにあるとき n 回比べます。並べ終わったデータを半分ずつにしぼって探す方法は、データが2倍になっても回数が1回ふえるだけです。" },
        { p: "半分にしぼる回数は、while で n を半分にしながら数えます。n //= 2 は n = n // 2 と同じ意味で、n を 2 でわった商に置きかえます。n が 0 になるまでに何回半分にできたかを steps で数えます。" },
        { code: "def half_steps(n):\n    steps = 0\n    while n > 0:\n        steps += 1\n        n //= 2\n    return steps\n\nprint([half_steps(n) for n in [10, 20, 40]])", out: "[4, 5, 6]" },
        { p: "10 → 5 → 2 → 1 → 0 で4回です。20 は1回多く半分にするので5回、40 は6回です。" },
        { try: "rbok-half" },
        { h: "線の上に点を重ねる: marker=" },
        { p: "Bokeh では、線の上に点を重ねたいとき、p.line(x, y) のあとに p.scatter(x, y, marker=\"circle\") などで、印を描き足します。以前は p.circle() や p.cross() という書き方も使われていましたが、新しい Bokeh（3.4 から）では使わないように、という注意が出ます。" },
        { p: "Matplotlib では、plt.plot(x, y, marker=\"o\") のように、線を描くときに marker= を付けるだけで、線と点がいっしょに描かれます。" },
        { code: 'import matplotlib.pyplot as plt\n\nns = [10, 20, 40]\nplt.plot(ns, [4, 5, 6], marker="o", label="half")\nplt.legend()\nplt.show()', out: "" },
        { try: "bok-search" },
      ],
    },
    {
      title: "散布図",
      blocks: [
        { h: "Bokeh の scatter と Matplotlib の scatter" },
        { p: "Bokeh で散布図を描くには、p.scatter(x, y, marker=\"circle\", size=10, alpha=0.5) のように、scatter メソッドを使います。marker= で印の形、size= で大きさ、alpha= で透明さを決めます。" },
        { p: "Matplotlib の plt.scatter では、大きさは s=、透明さは alpha=、印は marker= です。印の名前の書き方がちがい、Matplotlib では \"o\"（丸）、\"s\"（四角）、\"^\"（三角）、\"D\"（ひし形）のように、記号1文字で書きます。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.scatter([1, 2, 3], [3, 1, 2], s=150, alpha=0.5, marker="^")\nplt.show()', out: "" },
        { try: "bok-scatter" },
      ],
    },
    {
      title: "棒グラフ",
      blocks: [
        { h: "Bokeh の vbar と Matplotlib の bar" },
        { p: "Bokeh では、縦の棒グラフを p.vbar(x=位置, top=高さ, width=太さ) で描きます。v は vertical（縦）の頭文字です。top= は棒の上のはしの高さです。" },
        { p: "Matplotlib では plt.bar(位置, 高さ, width=太さ) に当たります。位置を np.arange(1, 6) にすると、1 から 5 までの位置に、等しい間隔で棒が並びます。" },
        { code: "import matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(0)\nh = np.random.rand(5)\nprint(h.round(2))\nplt.bar(np.arange(1, 6), h, width=0.3)\nplt.show()", out: "[0.55 0.72 0.6  0.54 0.42]" },
        { try: "bok-bar" },
      ],
    },
    {
      title: "ヒストグラム",
      blocks: [
        { h: "数えてから描く: np.histogram" },
        { p: "Bokeh には、ヒストグラムを1回で描く命令がありません。そこで、まず NumPy の np.histogram(データ, bins=区間の数) で数えます。この関数は「区間ごとの数」と「区間の境目」の2つを返すので、counts, edges = np.histogram(…) のように2つの変数で受け取ります。区間が2つなら境目は3つで、i 番目の区間は edges[i] から edges[i+1] までです。" },
        { p: "edges[:-1] は最後をのぞいた境目、つまり各区間の左はしです。np.diff(配列) は、となりどうしの差を並べた配列を返すので、np.diff(edges) は各区間の幅になります。配列に数をかけると、全部の値にその数がかかります（np.diff(edges) * 0.5 なら、どの幅も半分）。" },
        { code: "import numpy as np\n\ncounts, edges = np.histogram([1, 2, 2, 4, 7], bins=2)\nprint(counts, edges)\nprint(edges[:-1], np.diff(edges), np.diff(edges) * 0.5)", out: "[3 2] [1. 4. 7.]\n[1. 4.] [3. 3.] [1.5 1.5]" },
        { p: "Bokeh では p.quad(top=counts, bottom=0, left=edges[:-1], right=edges[1:]) のように、四角形の上下左右の位置を渡して描きます。Matplotlib では、plt.bar(edges[:-1], counts, width=np.diff(edges), align=\"edge\") で同じ形が描けます。align=\"edge\" を付けると、棒の左はしが位置にそろいます（付けないと、棒の真ん中が位置に来ます）。" },
        { code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\ncounts, edges = np.histogram([1, 2, 2, 4, 7], bins=2)\nplt.bar(edges[:-1], counts, width=np.diff(edges), align="edge")\nplt.show()', out: "" },
        { try: "bok-hist" },
      ],
    },
    {
      title: "ヒートマップ",
      blocks: [
        { h: "Bokeh と Matplotlib のヒートマップ" },
        { p: "Bokeh でヒートマップを描くのは、少し手間がかかります。マスごとに「横の位置・縦の位置・値」を並べた表を ColumnDataSource という形で用意し、値と色の対応を決める LinearColorMapper を作り、p.rect() で四角いマスを1つずつ描き、最後に ColorBar（色の帯）をグラフの右に置きます。" },
        { p: "Matplotlib では、2次元配列をそのまま plt.imshow(配列, cmap=\"色の組み合わせの名前\") に渡すだけです。cmap= は色の組み合わせ（カラーマップ）で、\"viridis\"（何も書かないときの色）、\"gray\"（白黒）、\"hot\"（黒・赤・黄・白）、\"coolwarm\"（低い値が青、高い値が赤）などがあります。plt.colorbar() で色の帯が付きます。" },
        { code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nplt.imshow(np.array([[1, 2], [3, 4]]), cmap="gray")\nplt.colorbar()\nplt.title("Gray")\nplt.show()', out: "" },
        { try: "bok-heat" },
      ],
    },
    {
      title: "グラフのファイル出力",
      blocks: [
        { h: "Bokeh は HTML、Matplotlib は画像ファイル" },
        { p: "Bokeh のグラフは、ツールバーのボタンで PNG 画像として保存できます。また、from bokeh.plotting import output_file として output_file(\"chart.html\") を呼んでから show(p) や save(p) をすると、グラフを1つの HTML ファイルとして保存できます。すでに output_notebook() を呼んでいるときは、reset_output() で設定をもとにもどしてから output_file を使います。" },
        { p: "Matplotlib では plt.savefig(ファイル名) で保存し、拡張子で形式が決まります。.svg にすると、線や文字を図形の命令として文字で書いた SVG 形式になり、ブラウザでもそのまま表示できます。中身は文字なので、open(ファイル名) で開いて read() で読むと、<svg で始まるタグが入っています。文字列 A が文字列 B の中にあるかは、A in B で True か False が分かります。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([2, 1, 2])\nplt.savefig("wave.svg")\ntext = open("wave.svg").read()\nprint("<svg" in text, "<png" in text)', out: "True False" },
        { try: "bok-save" },
      ],
    },
  ],
  exercises: ["bok-ex"],
};
