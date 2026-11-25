import type { LearnChapter } from "./types.ts";

// 付録 簡単なデータの可視化。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// 図は結果の下に画像で出るので、例の out は print した分だけ(図だけの例は空)。
export const chapter: LearnChapter = {
  ref: "A-visualization",
  sections: [
    {
      title: "matplotlib",
      blocks: [
        { h: "数を絵にする: matplotlib" },
        { p: "数がたくさん並んでいるだけでは、ふえているのか、へっているのか、ひと目では分かりません。グラフにすると、変化の様子や大きさのちがいがすぐに見えてきます。データを絵にして見えるようにすることを「可視化（かしか）」といいます。" },
        { p: "Python でグラフを描くときに、もっとも広く使われている道具が matplotlib（マットプロットリブ）です。最初に import matplotlib.pyplot as plt と書くと、plt.〇〇( ) という書き方でグラフの命令が使えるようになります（as plt は「plt という短い名前で使う」という意味です）。" },
        { p: "plt.plot(リスト) は、リストの値を折れ線グラフにします。横の位置は値の番号（0, 1, 2, …）、縦の位置はその値です。最後に plt.show() を書くと、描いたグラフが表示されます。" },
        { code: "import matplotlib.pyplot as plt\n\nplt.plot([2, 5, 3, 8])\nplt.show()", out: "" },
        { p: "この例では、点 (0, 2)・(1, 5)・(2, 3)・(3, 8) が線でつながります。標準の設定では、グラフの中に日本語の字は出ません（□のように表示されます）。そのため、グラフに書く文字は英語にします。" },
        { try: "vis-plot" },
      ],
    },
    {
      title: "折れ線グラフ",
      blocks: [
        { h: "線を何本も重ねる" },
        { p: "plt.show() の前に plt.plot を何回も書くと、同じグラフに線が重なっていきます。描いた順に、青・オレンジ・緑…と、自動で色が変わります。比べたいデータを並べると、ちがいが分かりやすくなります。" },
        { code: "import matplotlib.pyplot as plt\n\nplt.plot([1, 3, 2])\nplt.plot([2, 2, 4])\nplt.show()", out: "" },
        { try: "vis-plot2" },
        { h: "線に名前を付ける: label= と plt.legend" },
        { p: "線が何本もあると、どの線が何なのかが分からなくなります。plt.plot のかっこの中に label=\"名前\" を書くと、その線に名前が付きます。そのあとで plt.legend() を呼ぶと、線の色と名前の一覧がグラフのすみに表示されます。この一覧を「凡例（はんれい）」といいます。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.plot([1, 2, 4], label="cats")\nplt.plot([3, 3, 1], label="dogs")\nplt.legend()\nplt.show()', out: "" },
        { p: "まちがえやすい点: label= を書いただけでは凡例は出ません。plt.legend() も書きます。" },
        { try: "vis-label" },
      ],
    },
    {
      title: "散布図",
      blocks: [
        { h: "点を打つ: plt.scatter" },
        { p: "plt.scatter(横のリスト, 縦のリスト) は、点を打つだけのグラフ（散布図、さんぷず）を描きます。i 番目の横の値と i 番目の縦の値の組が、1つの点になります。1つめのリストが横、2つめのリストが縦です。" },
        { p: "点を線でつながないので、「勉強時間と点数」のような2つの量の関係を見るのに向いています。2つのリストは同じ長さにします（長さがちがうとエラーになります）。" },
        { code: "import matplotlib.pyplot as plt\n\nhours = [1, 2, 3, 4]\nscores = [40, 55, 65, 80]\nplt.scatter(hours, scores)\nplt.show()", out: "" },
        { try: "vis-scatter" },
      ],
    },
    {
      title: "棒グラフ",
      blocks: [
        { h: "棒を立てる: plt.bar" },
        { p: "plt.bar(横の位置, 高さ) は棒グラフを描きます。横の位置のリストと、高さのリストを渡します。2つのリストの個数はそろえます（そろっていないとエラーになります）。横の位置に文字列のリストを渡すと、棒が左から順に並び、棒の下にその文字列が名前として出ます。" },
        { p: "辞書のキーを名前、値を高さにすれば、「何がいくつあるか」を数えた辞書を、そのまま棒グラフにできます。キーのリストは list(辞書.keys())、値のリストは list(辞書.values()) で作れます。どちらも、辞書に入れた順に並びます。" },
        { code: 'import matplotlib.pyplot as plt\n\nbooks = {"May": 3, "June": 5}\nprint(list(books.keys()), list(books.values()))\nplt.bar(list(books.keys()), list(books.values()))\nplt.show()', out: "['May', 'June'] [3, 5]" },
        { try: "vis-bar" },
        { h: "棒の下の名前: tick_label=" },
        { p: "横の位置を [1, 2, 3] のような数にしたまま、棒の下に好きな名前を出すこともできます。plt.bar のかっこの中に tick_label=名前のリスト を書くと、左の棒から順に、その名前が付きます。" },
        { code: 'import matplotlib.pyplot as plt\n\nplt.bar([1, 2], [7, 4], tick_label=["red", "blue"])\nplt.show()', out: "" },
        { try: "vis-ticklabel" },
      ],
    },
  ],
  exercises: ["vis-count"],
};
