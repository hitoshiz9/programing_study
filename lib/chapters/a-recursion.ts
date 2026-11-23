import type { Chapter } from "./types.ts";

// 付録：再帰。文章・例・問題はすべて独自に書いたもの(教材の文は写さない)。
// 「再帰で書いたか」は、テストで関数を包んで、自分自身が何回呼ばれたかを数えて確かめる。
const MERGE =
  "def merge(a, b):\n    result = []\n    i = 0\n    j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i = i + 1\n        else:\n            result.append(b[j])\n            j = j + 1\n    return result + a[i:] + b[j:]\n\n\n";

export const chapter: Chapter = {
  ref: "A-recursion",
  title: "付録：再帰",
  url: "https://utokyo-ipp.github.io/appendix/3-recursion.html",
  stage: "write",
  order: ["rec-reverse", "rec-digits", "rec-merge"],
  lessons: [
    {
      id: "rec-reverse",
      title: "再帰で文字列を逆さにする",
      intro: [
        "関数の中で、その関数自身を呼ぶことを再帰呼び出しといいます。",
        "「すぐ答えが分かる小さな場合」と「少し小さくした問題を自分にまかせる場合」に分けて書くのがコツです。",
      ],
      example: 'def count_a(s):\n    if s == "":\n        return 0\n    rest = count_a(s[1:])\n    if s[0] == "a":\n        return rest + 1\n    return rest\n\nprint(count_a("banana"))',
      task: "文字列 s を逆の順番に並べた文字列を返す関数 rev(s) を、再帰で作ろう。空の文字列なら空の文字列を返します。",
      starter: "def rev(s):\n    pass\n",
      solution: 'def rev(s):\n    if s == "":\n        return ""\n    return rev(s[1:]) + s[0]',
      wrong: 'def rev(s):\n    if s == "":\n        return ""\n    return s[0] + rev(s[1:])',
      expect: "cba '' True",
      test: "_calls = []\n_rev = rev\ndef rev(s):\n    _calls.append(s)\n    return _rev(s)\nprint(rev(\"abc\"), repr(rev(\"\")), len(_calls) > 2)",
      hints: ['s が "" なら "" を返します。', "そうでなければ、残り s[1:] を逆さにしたもののうしろに、先頭の s[0] を付けます。return rev(s[1:]) + s[0] です。"],
      xp: 30,
    },
    {
      id: "rec-digits",
      title: "再帰で各けたを足す",
      intro: ["n % 10 で一の位、n // 10 で一の位を取りのぞいた数が分かります。これを使うと、けたを1つずつ減らしながら再帰で計算できます。"],
      example: "n = 472\nprint(n % 10, n // 10)",
      task: "0 以上の整数 n の、各けたの数字を全部足した数を返す関数 digit_sum(n) を、再帰で作ろう（例: 472 なら 4+7+2 で 13。0 なら 0）。",
      starter: "def digit_sum(n):\n    pass\n",
      solution: "def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)",
      wrong: "def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10",
      expect: "13 0 9 True",
      test: "_calls = []\n_ds = digit_sum\ndef digit_sum(n):\n    _calls.append(n)\n    return _ds(n)\nprint(digit_sum(472), digit_sum(0), digit_sum(9), len(_calls) > 3)",
      hints: ["n が 0 なら 0 を返します。", "そうでなければ、一の位 n % 10 と、残りのけたの合計 digit_sum(n // 10) を足します。"],
      xp: 30,
    },
    {
      id: "rec-merge",
      title: "マージソートを再帰で書く",
      intro: [
        "マージソートは、リストを半分に分けて、それぞれを並べかえ、最後に2つを合わせる（マージする）並べかえ方です。",
        "半分を並べかえるところで、自分自身をもう一度呼びます。",
      ],
      example: MERGE + "print(merge([1, 4, 9], [2, 3, 10]))",
      task: "並べかえ済みの2つのリストを合わせる関数 merge は用意してあります。リスト data を小さい順に並べた新しいリストを返す関数 merge_sort(data) を、再帰で完成させよう。要素が1個以下なら、そのまま返します。",
      starter: MERGE + "def merge_sort(data):\n    pass\n",
      solution: MERGE + "def merge_sort(data):\n    if len(data) <= 1:\n        return data\n    m = len(data) // 2\n    return merge(merge_sort(data[:m]), merge_sort(data[m:]))",
      wrong: MERGE + "def merge_sort(data):\n    if len(data) <= 1:\n        return data\n    m = len(data) // 2\n    return merge(data[:m], data[m:])",
      expect: "[1, 2, 5, 5, 6, 9] []\nTrue",
      test: "_calls = []\n_ms = merge_sort\ndef merge_sort(data):\n    _calls.append(len(data))\n    return _ms(data)\nprint(merge_sort([5, 2, 9, 1, 5, 6]), merge_sort([]))\nprint(len(_calls) > 2)",
      hints: ["m = len(data) // 2 で真ん中の位置を求め、data[:m] と data[m:] に分けます。", "return merge(merge_sort(data[:m]), merge_sort(data[m:])) です。"],
      xp: 45,
    },
  ],
  reads: [
    {
      id: "rrec-list",
      title: "再帰でリストを作る",
      intro: "stars(3) が stars(2)、stars(2) が stars(1)…と呼んでいきます。最後にどんなリストがつながるかを追いかけよう。",
      code: 'def stars(n):\n    if n == 0:\n        return []\n    return ["*" * n] + stars(n - 1)\n\nprint(stars(3))',
      choices: ["['*', '**', '***']", "['***', '**', '*']", "['***', '**', '*', '']"],
      answer: 1,
      explain:
        "stars(3) は [\"***\"] + stars(2)、stars(2) は [\"**\"] + stars(1)、stars(1) は [\"*\"] + stars(0) で、stars(0) は空のリスト [] です。内側から順に組み立てると ['***', '**', '*'] になります。自分の要素を前に付けてから残りをつなぐので、大きいほうが先です。'' が入ると考えた人は、n == 0 のときは要素を足さずに [] を返していることを見直しましょう。",
      xp: 20,
    },
    {
      id: "rrec-halve",
      title: "半分ずつ減らす再帰",
      intro: "n が偶数のときは n // 2 に、奇数のときは n - 1 にして呼び直します。何回呼ばれるかを数えよう。",
      code: "count = 0\n\ndef rep(s, n):\n    global count\n    count = count + 1\n    if n == 0:\n        return \"\"\n    if n % 2 == 0:\n        return rep(s + s, n // 2)\n    return s + rep(s, n - 1)\n\nprint(len(rep(\"a\", 8)), count)",
      choices: ["8 9", "8 5", "16 4"],
      answer: 1,
      explain:
        "rep(\"a\", 8) は8が偶数なので rep(\"aa\", 4)、続いて rep(\"aaaa\", 2)、rep(\"aaaaaaaa\", 1) と呼ばれます。1 は奇数なので \"aaaaaaaa\" + rep(\"aaaaaaaa\", 0) になり、rep(…, 0) は \"\" を返します。結果の長さは 8、呼ばれた回数は 8・4・2・1・0 の5回です。1つずつ減らすと9回かかるところを、半分にすることで少ない回数で済ませています。",
      xp: 25,
    },
  ],
  explain: {
    "rec-reverse": [
      { h: "再帰とは" },
      { p: "関数の定義の中で、その関数自身を呼ぶことを再帰呼び出しといい、そうしている関数を再帰関数といいます。関数 f が g を呼び、g がまた f を呼ぶような、遠回りの呼び方も再帰に入ります。" },
      { p: "再帰は「大きな問題を、同じ形の小さな問題に分けて解き、その答えを組み合わせる」考え方（分割統治）と相性がよい書き方です。形はたいてい、if で「もう分けなくても答えが分かるか」を調べ、分かるならそのまま返し、そうでなければ小さくした問題で自分を呼んで、結果を組み立てます。" },
      { h: "文字列を1文字ずつ短くする" },
      { p: "文字列なら、s[1:]（先頭を取ったもの）や s[:-1]（最後を取ったもの）で1文字ずつ短くできます。いつかは空の文字列 \"\" になるので、そこを「すぐ答えが分かる場合」にします。rev(\"abc\") は rev(\"bc\") + \"a\"、rev(\"bc\") は rev(\"c\") + \"b\" … と分かれていきます。" },
      { code: 'def shorter(s):\n    if s == "":\n        return []\n    return [s] + shorter(s[:-1])\n\nprint(shorter("piyo"))\n\ndef rev(s):\n    if s == "":\n        return ""\n    return rev(s[1:]) + s[0]\n\nprint(rev("piyo"))', out: "['piyo', 'piy', 'pi', 'p']\noyip" },
      { p: "止まる場合を書き忘れたり、呼ぶたびに小さくならなかったりすると、呼び出しがいつまでも続き、RecursionError（呼び出しが深くなりすぎた）というエラーになります。" },
    ],
    "rec-digits": [
      { h: "数を小さくしていく再帰" },
      { p: "数を扱う再帰では、n を 1 減らしたり、10 で割ってけたを減らしたりして、0 のような「答えがすぐ分かる数」に近づけます。digit_sum(472) は 2 + digit_sum(47)、digit_sum(47) は 7 + digit_sum(4)、digit_sum(4) は 4 + digit_sum(0) で、最後は 0 です。" },
      { p: "再帰で書けることは、ふつうの for 文や while 文でも書けます。簡単な計算なら、くり返しのほうが速いことも多いです。" },
      { code: "def digit_sum_loop(n):\n    total = 0\n    while n > 0:\n        total = total + n % 10\n        n = n // 10\n    return total\n\nprint(digit_sum_loop(472))", out: "13" },
      { h: "うまく分けると速くなる" },
      { p: "一方で、問題の分け方を工夫すると、再帰のほうが分かりやすく、しかも速い計算を書けることがあります。たとえば同じ文字列を n 回つなぐとき、n が偶数なら「2回分をつないだものを n // 2 回」と考えれば、問題の大きさが一気に半分になり、呼ぶ回数がぐっと減ります。累乗（同じ数を何回もかける計算）も同じ工夫で速くできます。" },
    ],
    "rec-merge": [
      { h: "マージソートのしくみ" },
      { p: "マージソートは、分割統治の代表的な例です。①リストを真ん中で2つに分ける、②それぞれを（自分自身を呼んで）並べかえる、③並べかえ済みの2つを先頭から比べながら1つにまとめる、という手順です。要素が1個以下のリストは、もう並んでいるのでそのまま返します。" },
      { p: "③のまとめる作業をマージ（併合）といいます。2つのリストの先頭どうしを比べ、小さいほうを結果に入れることをくり返すと、全体が小さい順になります。どちらかがなくなったら、残りをそのまま後ろにつなげます。" },
      { code: "def merge(a, b):\n    result = []\n    i = 0\n    j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i = i + 1\n        else:\n            result.append(b[j])\n            j = j + 1\n    return result + a[i:] + b[j:]\n\ndef merge_sort(data):\n    if len(data) <= 1:\n        return data\n    m = len(data) // 2\n    left = merge_sort(data[:m])\n    right = merge_sort(data[m:])\n    print(left, right)\n    return merge(left, right)\n\nprint(merge_sort([4, 1, 3, 2]))", out: "[4] [1]\n[3] [2]\n[1, 4] [2, 3]\n[1, 2, 3, 4]" },
      { p: "merge_sort は1回の中で自分を2回呼んでいます。このように枝分かれする処理は、for 文だけで書こうとするととても難しくなりますが、再帰ならそのまま素直に書けます。ここでは新しいリストを返す形にしましたが、元のリストの中身を直接並べかえる書き方や、比べた回数を数える書き方もあります。" },
    ],
  },
  topics: [
    ["再帰関数の例：接頭辞リストと接尾辞リスト", ["rec-reverse", "rrec-list"]],
    ["再帰関数の例：べき乗の計算", ["rec-digits", "rrec-halve"]],
    ["再帰関数の例：マージソート", ["rec-merge"]],
  ],
  refSections: 3,
  refProse: 923,
};
