import type { LearnChapter } from "./types.ts";

// 付録 再帰。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
const MERGE =
  "def merge(a, b):\n    result = []\n    i = 0\n    j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i = i + 1\n        else:\n            result.append(b[j])\n            j = j + 1\n    return result + a[i:] + b[j:]\n";

export const chapter: LearnChapter = {
  ref: "A-recursion",
  sections: [
    {
      title: "再帰とは",
      blocks: [
        { h: "関数の中で自分自身を呼ぶ" },
        { p: "関数の定義の中で、その関数自身を呼ぶことを「再帰呼び出し（さいきよびだし）」といい、再帰呼び出しをする関数を「再帰関数」といいます。関数 f が関数 g を呼び、その g がまた f を呼ぶような、ほかの関数を通した遠回りの呼び方も再帰呼び出しに入ります。" },
        { p: "下の down(3) は、\"3、\" のうしろに down(2) の答えをつなぎます。down(2) は \"2、\" + down(1)、down(1) は \"1、\" + down(0) です。down(0) は n == 0 なので、もう自分を呼ばずに \"発射\" を返します。そこから順に戻ってきて、全部がつながった文字列が答えになります。" },
        { code: 'def down(n):\n    if n == 0:\n        return "発射"\n    return str(n) + "、" + down(n - 1)\n\nprint(down(3))', out: "3、2、1、発射" },
        { try: "rrec-count" },
        { h: "止まる場合を必ず書く" },
        { p: "再帰関数には、「もう自分を呼ばずに、すぐ答えを返す場合」を必ず書きます。上の down なら n == 0 のときです。これを書き忘れたり、呼ぶたびに問題が小さくならなかったりすると、呼び出しがいつまでも続きます。Python は呼び出しが深くなりすぎたところで止めて、RecursionError（再帰が深すぎる、というエラー）を出します。" },
        { p: "まちがえやすい点: 止まる場合の if は、自分を呼ぶ行より前に書きます。先に自分を呼んでしまうと、if までたどり着きません。" },
        { try: "rec-sum" },
        { h: "分割統治の形" },
        { p: "再帰は「分割統治（ぶんかつとうち）」という考え方に向いています。分割統治とは、大きな問題を、同じ形の小さな問題に分けていき、すぐ解けるほど小さくなったらそれを解き、小さな問題の答えを組み合わせて全体の答えを作る方法です。" },
        { p: "再帰関数は、たいてい次の形になります。① if で「もうすぐ答えが分かるほど小さいか」を調べる。② 小さいなら、自分を呼ばずに答えを返す。③ そうでなければ、問題を小さくして自分を呼び、返ってきた答えを組み合わせて返す。" },
        { code: "def total(nums):\n    if nums == []:\n        return 0\n    return nums[0] + total(nums[1:])\n\nprint(total([4, 7, 1]))", out: "12" },
        { p: "total([4, 7, 1]) は 4 + total([7, 1])、total([7, 1]) は 7 + total([1])、total([1]) は 1 + total([]) で、total([]) は 0 です。①②が「空のリストなら 0」、③が「先頭の数 + 残りの合計」です。" },
        { try: "rrec-list" },
      ],
    },
    {
      title: "再帰関数の例：接頭辞リストと接尾辞リスト",
      blocks: [
        { h: "最後の文字を取っていく: 接頭辞" },
        { p: "文字列の「接頭辞（せっとうじ）」は、先頭から何文字かを取った部分のことです。たとえば \"tea\" の接頭辞は \"tea\"・\"te\"・\"t\" です。s[:-1] は、s から最後の1文字を取りのぞいた文字列なので、これで自分を呼ぶと、1文字ずつ短い接頭辞が順に出てきます。いつかは空の文字列 \"\" になるので、そこを止まる場合にします。" },
        { code: 'def heads(s):\n    if s == "":\n        return []\n    return [s] + heads(s[:-1])\n\nprint(heads("tea"))', out: "['tea', 'te', 't']" },
        { try: "rrec-head" },
        { h: "先頭の文字を取っていく: 接尾辞" },
        { p: "「接尾辞（せつびじ）」は、うしろから何文字かを取った部分です。\"tea\" の接尾辞は \"tea\"・\"ea\"・\"a\" です。s[1:] は先頭の1文字を取りのぞいた文字列なので、heads の s[:-1] を s[1:] に変えるだけで、接尾辞のリストを作る関数になります。" },
        { code: 'def tails(s):\n    if s == "":\n        return []\n    return [s] + tails(s[1:])\n\nprint(tails("tea"))', out: "['tea', 'ea', 'a']" },
        { p: "s[1:] と s[0]（先頭の1文字）を組み合わせると、ほかの計算もできます。たとえば「残り s[1:] で自分を呼んだ答え」のうしろに s[0] を付けると、先頭の文字が1つずつ、うしろへ回っていきます。" },
        { try: "rec-reverse" },
      ],
    },
    {
      title: "再帰関数の例：べき乗の計算",
      blocks: [
        { h: "べき乗を再帰で" },
        { p: "base の expt 乗（base を expt 回かけた数）は、「base × (base の expt - 1 乗)」と考えられます。expt を1つずつ減らして自分を呼び、expt が 0 になったら 1 を返します（どんな数も 0 乗は 1 です）。" },
        { code: "def power(base, expt):\n    if expt == 0:\n        return 1\n    return base * power(base, expt - 1)\n\nprint(power(3, 4))", out: "81" },
        { p: "power(3, 4) は 3 * power(3, 3)、power(3, 3) は 3 * power(3, 2) … と進み、power(3, 0) が 1 を返します。全部をつなげると 3 * 3 * 3 * 3 * 1 = 81 です。かけ算の * をたし算の + に、0 乗の 1 を 0 に変えると、同じ形で「base を expt 回足した数」も計算できます。" },
        { try: "rec-times" },
        { h: "くり返しでも書ける" },
        { p: "再帰で書ける計算は、for 文や while 文のくり返しでも書けます。べき乗なら、e = 1 から始めて、expt 回 e *= base をくり返します。簡単な計算では、くり返しで書いたほうが速いことが多いです。" },
        { code: "def power_loop(base, expt):\n    e = 1\n    for i in range(expt):\n        e *= base\n    return e\n\nprint(power_loop(3, 4))\nprint(power_loop(3, 0))", out: "81\n1" },
        { p: "expt が 0 のときは、for 文の中が1回も実行されないので、最初の e = 1 がそのまま返ります。" },
        { try: "rrec-loop" },
        { h: "半分にして速く計算する" },
        { p: "問題の分け方を工夫すると、再帰で速い計算を分かりやすく書けることがあります。expt が偶数のときは、「base を expt 乗」は「base * base を expt // 2 乗」と同じです（3 の 4 乗は 9 の 2 乗）。こうすると expt が一気に半分になるので、呼び出しの回数がぐっと減ります。expt が奇数のときは、これまでどおり expt を1つ減らします。" },
        { code: "def fast_power(base, expt):\n    if expt == 0:\n        return 1\n    elif expt % 2 == 0:\n        return fast_power(base * base, expt // 2)\n    else:\n        return base * fast_power(base, expt - 1)\n\nprint(fast_power(2, 10))", out: "1024" },
        { p: "fast_power(2, 10) は、expt が 10 → 5 → 4 → 2 → 1 → 0 と変わり、6回の呼び出しで終わります。1つずつ減らす power なら 11 回かかります。同じ文字列を n 回つなぐ計算も、偶数なら「2回分をつないだものを n // 2 回」と考えて、同じように速くできます。" },
        { try: "rrec-halve" },
      ],
    },
    {
      title: "再帰関数の例：マージソート",
      blocks: [
        { h: "マージ: 並んだ2つのリストを1つに" },
        { p: "「マージ（併合）」は、小さい順に並んだ2つのリストを、小さい順のまま1つにまとめる作業です。2つのリストの先頭どうしを比べて、小さいほうを結果に入れる、をくり返します。どちらかのリストを使い切ったら、もう一方の残り（a[i:] や b[j:]）を、そのまま結果のうしろにつなげます。" },
        { code: MERGE + "\nprint(merge([1, 5, 6], [2, 3]))", out: "[1, 2, 3, 5, 6]" },
        { try: "rrec-merge" },
        { h: "マージソート: 半分に分けて自分を2回呼ぶ" },
        { p: "「マージソート」は、マージを使ってリストを小さい順に並べかえる方法で、分割統治の代表的な例です。① 要素が1個以下のリストは、もう並んでいるのでそのまま返す。② そうでなければ、真ん中 m = len(data) // 2 で前半 data[:m] と後半 data[m:] に分ける。③ 前半と後半を、それぞれ自分自身を呼んで並べかえる。④ 並べかえた2つをマージする。" },
        { code: MERGE + "\ndef merge_sort(data):\n    if len(data) <= 1:\n        return data\n    m = len(data) // 2\n    left = merge_sort(data[:m])\n    right = merge_sort(data[m:])\n    print(left, right)\n    return merge(left, right)\n\nprint(merge_sort([4, 1, 3, 2]))", out: "[4] [1]\n[3] [2]\n[1, 4] [2, 3]\n[1, 2, 3, 4]" },
        { p: "途中で print した left と right を見ると、まず [4] と [1] がマージされて [1, 4]、[3] と [2] がマージされて [2, 3] になり、最後にその2つがマージされています。" },
        { p: "merge_sort は1回の中で自分を2回呼んでいます。このように枝分かれする計算は、for 文や while 文だけで書くのはとても難しいのですが、再帰なら手順のとおりに素直に書けます。ここでは新しいリストを返す形にしましたが、元のリストの中身を直接並べかえる書き方や、比べた回数を数えて返す書き方もできます。" },
        { try: "rec-merge" },
      ],
    },
  ],
  // 章の最後の演習問題: 数やリストを小さくしていく再帰を、自分で組み立てる
  exercises: ["rec-digits", "rec-count"],
};
