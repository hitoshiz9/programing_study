import type { LearnChapter } from "./types.ts";

// 5-1 モジュールの使い方。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
export const chapter: LearnChapter = {
  ref: "5-1",
  sections: [
    {
      title: "モジュールのインポート",
      blocks: [
        { h: "モジュールを読み込む: import" },
        { p: "Python には、よく使う関数や値を、目的ごとにまとめた「モジュール」が、はじめから用意されています。数学の道具をまとめた math のほかにも、文字に関係する string、日付を扱う datetime など、たくさんあります。1-1 で見たように、モジュールは import モジュール名 と書いて読み込んでから使います。import は、ふつうプログラムのいちばん上に書きます。" },
        { p: "読み込んだモジュールの中の関数や値は、「モジュール名.名前」の形で使います。. の前にモジュール名があるので、どのモジュールの道具なのかがひと目で分かります。math.pi は円周率の値、math.sqrt( ) は平方根を出す関数でした。" },
        { code: "import math\nprint(math.pi * 2)\nprint(math.sqrt(81))", out: "6.283185307179586\n9.0" },
        { try: "math" },
        { h: "math の中のほかの関数: floor・ceil・log" },
        { p: "math には、ほかにも便利な関数があります。math.floor(x) は x を切り捨てた整数（x 以下で、いちばん大きい整数）、math.ceil(x) は x を切り上げた整数（x 以上で、いちばん小さい整数）を返します。floor は「床」、ceil は「天井」という意味の英語です。" },
        { p: "math.log(x, b) は、「b を何乗すると x になるか」（b を底とする x の対数）を返します。たとえば 3 を 4 乗すると 81 なので、math.log(81, 3) は 4 です。答えは実数で出てくるので 4.0 と表示されます。" },
        { code: "import math\nprint(math.floor(5.8))\nprint(math.ceil(5.2))\nprint(math.log(81, 3))", out: "5\n6\n4.0" },
        { p: "まちがえやすい点: マイナスの数では、floor は小さいほう（0 から遠いほう）へ動きます。math.floor(-1.5) は -2、math.ceil(-1.5) は -1 です。" },
        { try: "l51-import" },
        { h: "モジュール名を付けないと NameError" },
        { p: "import math で使えるようになる名前は math だけです。中の関数を sqrt(16) のように、math. を付けずに呼ぶと、「その名前を知らない」という NameError になります。モジュールの中の名前は、必ず math.sqrt のように「モジュール名.」を付けて呼びます（付けずに呼ぶ方法は、次の節で学びます）。" },
        { code: "import math\nprint(math.sqrt(36))\nprint(sqrt(36))", out: "6.0\nTraceback (most recent call last):\n  File \"<exec>\", line 3, in <module>\nNameError: name 'sqrt' is not defined" },
        { try: "r51-prefix" },
        { h: "いくつものモジュールを1行で" },
        { p: "import math, string のように、モジュール名を ,（カンマ）で区切ると、1行でいくつものモジュールを読み込めます。import math と import string を2行に分けて書いたのと同じです。" },
        { p: "string モジュールには、文字を並べた文字列がいくつか入っています。たとえば string.digits は 0 から 9 までの数字を順に並べた文字列 \"0123456789\"、string.ascii_uppercase は A から Z までの大文字を並べた文字列です。" },
        { code: "import math, string\nprint(string.digits)\nprint(math.ceil(0.1))", out: "0123456789\n1" },
        { try: "r51-multi" },
      ],
    },
    {
      title: "from",
      blocks: [
        { h: "名前を取りこむ: from モジュール名 import 名前" },
        { p: "from math import sqrt と書くと、math の中の sqrt という名前が、今のプログラムに取りこまれます。そのあとは、math. を付けずに sqrt(…) だけで呼べます。関数だけでなく、pi のような値も同じように取りこめます。" },
        { p: "取りこみたい名前が2つ以上あるときは、from math import sqrt, pi のように ,（カンマ）で区切って並べます。from で取りこんでいない名前は、math. を付けずには使えません。" },
        { code: "from math import floor, pi\nprint(floor(pi))\nprint(pi / 2)", out: "3\n1.5707963267948966" },
        { try: "l51-from" },
        { h: "* でまとめて取りこむ（おすすめしない）" },
        { p: "from math import * と書くと、* は「全部」という意味になり、math の中の名前をまとめて取りこみます（_ で始まる名前は取りこまれません）。書くのは楽ですが、どんな名前が入ってきたのかが、コードを見ても分かりません。" },
        { p: "とくに困るのは、自分で作った変数と同じ名前がモジュールにあるときです。from math import * のあとでは、その変数がモジュールの値で上書きされてしまいます。下の例では、e という変数に入れた文字が、math の e（ネイピア数という数、約 2.718）で上書きされています。そのため * は使わず、使う名前を1つずつ書くのがおすすめです。" },
        { code: 'e = "メール"\nprint(e)\nfrom math import *\nprint(e)', out: "メール\n2.718281828459045" },
        { try: "r51-clash" },
      ],
    },
    {
      title: "as",
      blocks: [
        { h: "モジュールに別の名前: import モジュール名 as 別名" },
        { p: "import math as m と書くと、math モジュールを m という別の名前（別名）で使えます。as は「〜として」という意味で、名前の長いモジュールを短く呼びたいときに便利です。たとえば 5-3 で学ぶ NumPy というモジュールは、import numpy as np として、np という名前で使うのが習慣になっています。" },
        { p: "import math as m とだけ書いたときに使えるのは m という名前だけで、math という名前は使えません。m.floor のように、別名に . を付けて呼びます。" },
        { code: "import math as m\nprint(m.ceil(2.01))\nprint(m.sqrt(64))", out: "3\n8.0" },
        { try: "r51-asmod" },
        { h: "取りこむ名前に別名: from … import 名前 as 別名" },
        { p: "from math import factorial as fact のように書くと、取りこむ関数に別名を付けられます。math.factorial(n) は「n の階乗」（1 から n までの整数を全部かけた数）を返す関数で、4 の階乗は 4 × 3 × 2 × 1 = 24 です。別名を付けたあとは fact(4) と呼びます。別名は自分で自由に決められるので、fact のかわりに kai（階乗の「かい」）のような名前にしてもかまいません。" },
        { p: "自分のプログラムにすでに同じ名前があって、ぶつかってしまうときにも使えます。as で付けた別名だけが使えるようになり、factorial という名前は使えないままです。" },
        { code: "from math import factorial as fact\nprint(fact(3))\nprint(fact(6))", out: "6\n720" },
        { try: "l51-as" },
      ],
    },
  ],
  // 章の最後の演習問題(教材の練習にあたる、math. なしで動くように import を書きかえる問題)
  exercises: ["l51-practice", "l51-mix"],
};
