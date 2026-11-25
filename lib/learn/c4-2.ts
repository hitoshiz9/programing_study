import type { LearnChapter } from "./types.ts";

// 4-2 イテラブルとイテレータ。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// 例はどれも、使うファイルを先に作ってから読む(1つずつ動かしても同じ結果になるように)。
export const chapter: LearnChapter = {
  ref: "4-2",
  sections: [
    {
      title: "for文による繰り返しとファイルオブジェクト",
      blocks: [
        { h: "for でファイルを1行ずつ読む" },
        { p: "open で開いたファイルオブジェクトは、for の in のうしろに置けます。そうすると、ファイルの1行目から順に、1行ずつ文字列として取り出されます。取り出した文字列には、readline() のときと同じく、行の終わりの改行 \\n が付いています。" },
        { code: 'with open("pet42.txt", "w", encoding="utf-8") as f:\n    f.write("いぬ\\nねこ\\n")\n\nlines = []\nwith open("pet42.txt", "r", encoding="utf-8") as f:\n    for line in f:\n        lines.append(line)\nprint(lines)', out: "['いぬ\\n', 'ねこ\\n']" },
        { p: "表示するときは、2-1 で学んだ strip() で前後の空白と改行を取ってから使うと、行のあいだに空の行ができません。" },
        { try: "l42-filefor" },
        { h: "for で読むと、位置が進む" },
        { p: "for でファイルを読むと、readline() と同じように、読んだぶんだけ位置が先へ進みます。先に readline() で1行読んでおくと、for はその続きから始まります。そして for で終わりまで読むと、位置はファイルの終わりにあるので、同じファイルオブジェクトでもう一度 for を書いても、中身は1回も動きません。もう一度読みたいときは、open し直して、新しいファイルオブジェクトを作ります。" },
        { code: 'with open("pet42.txt", "w", encoding="utf-8") as f:\n    f.write("いぬ\\nねこ\\n")\n\nwith open("pet42.txt", "r", encoding="utf-8") as f:\n    print(f.readline(), end="")\n    for line in f:\n        print("for:", line, end="")', out: "いぬ\nfor: ねこ" },
        { try: "r42-filetwice" },
      ],
    },
    {
      title: "for文とイテラブルとイテレータ",
      blocks: [
        { h: "for で回せるもの: イテラブル" },
        { p: "Python では、数や文字列やリストなど、あらゆる値をまとめて「オブジェクト」と呼びます。そのうち、for の in のうしろに置いてくり返せるものを、まとめて「イテラブル」（iterable）と呼びます。リスト、タプル、文字列、辞書、range、ファイルオブジェクトは、どれもイテラブルです。" },
        { p: "何が取り出されるかは種類によって決まっています。リストやタプルは要素が1つずつ、文字列は1文字ずつ、辞書はキーが1つずつ（値ではありません）、ファイルは1行ずつです。" },
        { code: "for x in [7, 8]:\n    print(x)\nfor x in range(2):\n    print(x)", out: "7\n8\n0\n1" },
        { p: "for がこれだけ多くの種類を同じ書き方で回せるのは、for がまず相手から「イテレータ」（iterator）という取り出し係を作り、その係に「次をちょうだい」と頼みながらくり返しているからです。英語の iterate は「くり返す」という意味で、iterable は「くり返せるもの」、iterator は「くり返す係」（反復子とも呼びます）という意味です。" },
        { try: "r42-iterable" },
      ],
    },
    {
      title: "iter",
      blocks: [
        { h: "iter でイテレータを作る" },
        { p: "組み込み関数 iter(イテラブル) は、イテラブルからイテレータを作って返します。イテレータは、中身を順番に1つずつ取り出していくためのものです。iter は、渡されたものの種類に合ったイテレータを作ります。リストを渡せばリスト用の、文字列を渡せば文字列用のイテレータです。" },
        { p: "イテレータは、もとのリストなどとは別のものです。type で調べると、リストではなく list_iterator（リスト用のイテレータ）という種類になっています。list( ) にイテラブルを渡すと、残っている中身を全部取り出してリストにします。" },
        { code: "it = iter([10, 20, 30])\nprint(type(it))\nprint(list(it))", out: "<class 'list_iterator'>\n[10, 20, 30]" },
        { try: "r42-iterlist" },
      ],
    },
    {
      title: "next",
      blocks: [
        { h: "next で1つずつ取り出す" },
        { p: "組み込み関数 next(イテレータ) は、イテレータのくり返しを1回ぶん進めて、次の1つを返します。呼ぶたびに、前の続きの1つが返ってきます。" },
        { code: 'it = iter(["春", "夏", "秋"])\nprint(next(it))\nprint(next(it))\nprint(list(it))', out: "春\n夏\n['秋']" },
        { p: "2回 next したあとの list(it) には、まだ取り出していない '秋' だけが入ります。" },
        { try: "l42-iter" },
        { h: "終わりに来ると StopIteration" },
        { p: "全部取り出したあとに、さらに next を呼ぶと、StopIteration が起きて止まります。StopIteration は「例外（れいがい）」の1つです。例外とは、そこで処理をすぐに止めて「ふつうには続けられない」と知らせるしくみで、これまで見てきたエラーも例外です。" },
        { p: "next(イテレータ, 代わりの値) のように2つめの引数を渡しておくと、取り出すものがないときに、StopIteration を起こすかわりに、その値を返します。" },
        { code: 'it = iter([1])\nprint(next(it))\nprint(next(it, "からっぽ"))\nprint(next(it))', out: "1\nからっぽ\nTraceback (most recent call last):\n  File \"<exec>\", line 4, in <module>\nStopIteration" },
        { try: "l42-next" },
      ],
    },
    {
      title: "for文の仕組み",
      blocks: [
        { h: "for を while で書きなおす" },
        { p: "for x in イテラブル: は、じつは次のように動いています。①iter でイテレータを作る。②while True: でくり返し、next でイテレータから1つ取り出して x に入れ、中身を動かす。③StopIteration が起きたら、くり返しを終わる。" },
        { p: "③のように、起きた例外をつかまえるには try と except を使います。try: の下に書いた処理の途中で例外が起きると、その処理はそこで打ち切られ、except 例外の名前: の下に移ります。つかまえた例外ではプログラムは止まらず、except のあとの行へ進みます。pass は「何もしない」という意味の文です。" },
        { code: 'try:\n    it = iter(["a", "b"])\n    while True:\n        x = next(it)\n        print(x)\nexcept StopIteration:\n    pass\nprint("終わり")', out: "a\nb\n終わり" },
        { p: "この例は、for x in [\"a\", \"b\"]: print(x) と同じことをしています。" },
        { try: "r42-forwhile" },
      ],
    },
    {
      title: "イテレータは特殊なイテラブル",
      blocks: [
        { h: "イテレータは1回で使い切り" },
        { p: "イテレータもイテラブルの一種なので、for の in のうしろに置けます。ただし、1回の for で終わりまで進むと、それで使い切りです。同じイテレータでもう一度 for を書いても、中身は1回も動きません。" },
        { p: "これは、イテレータに iter を使うと、新しいイテレータは作られず、そのイテレータ自身が返ってくる決まりだからです。そのため、it is iter(it) は True です（is は、2-2 で学んだ「同じオブジェクトかどうか」を調べる演算子です）。2回目の for も同じイテレータを使うので、すでに終わりにいて、最初の next ですぐに StopIteration が起きます。" },
        { code: 'it = iter([5, 6])\nfor x in it:\n    print(x)\nfor x in it:\n    print("2回目", x)\nprint("おわり")', out: "5\n6\nおわり" },
        { try: "r42-once" },
      ],
    },
    {
      title: "ファイルオブジェクトはイテレータ",
      blocks: [
        { h: "ファイルも next で読める" },
        { p: "ファイルを for で終わりまで読むと、もう一度 for で読めませんでした。じつは、ファイルオブジェクトはイテレータだからです。そのため、next(f) で1行ずつ取り出すこともできます。取り出したぶんだけ位置が進み、そのあとの for や list は続きから始まります。" },
        { code: 'with open("pet42.txt", "w", encoding="utf-8") as f:\n    f.write("いぬ\\nねこ\\nうさぎ\\n")\n\nwith open("pet42.txt", "r", encoding="utf-8") as f:\n    print(repr(next(f)))\n    print(list(f))', out: "'いぬ\\n'\n['ねこ\\n', 'うさぎ\\n']" },
        { try: "l42-filenext" },
        { h: "readline と next のちがい" },
        { p: "f.readline() と next(f) は、まだ終わりまで読んでいないあいだは、どちらも次の1行を返します。ちがうのは、終わりに来たときです。readline() のほうは空の文字列 '' になって止まりません。一方 next(f) では StopIteration が起きます（2つめの引数を渡していれば、その値が返ります）。" },
        { code: 'with open("one42.txt", "w", encoding="utf-8") as f:\n    f.write("ひとつ\\n")\n\nwith open("one42.txt", "r", encoding="utf-8") as f:\n    print(repr(f.readline()))\n    print(repr(f.readline()))\n    print(next(f))', out: "'ひとつ\\n'\n''\nTraceback (most recent call last):\n  File \"<exec>\", line 7, in <module>\nStopIteration" },
        { try: "r42-eof" },
      ],
    },
    {
      title: "イテラブルはイテレータではない",
      blocks: [
        { h: "リストや range は何度でも回せる" },
        { p: "イテラブルのすべてがイテレータというわけではありません。リスト、タプル、文字列、辞書、range は、イテラブルですが、イテレータではありません。そのため next をそのまま使うことはできず、使うと TypeError になります。" },
        { p: "これらに iter を使うと、そのたびに新しいイテレータが作られます。for は毎回 iter から始めるので、同じリストや range を何回 for で回しても、毎回最初から全部取り出せます。list( ) に何回渡しても、毎回全部がリストになります。" },
        { code: "r = range(2)\nfor x in r:\n    print(x)\nfor x in r:\n    print(x)\nprint(next(r))", out: "0\n1\n0\n1\nTraceback (most recent call last):\n  File \"<exec>\", line 6, in <module>\nTypeError: 'range' object is not an iterator" },
        { try: "r42-twice" },
      ],
    },
    {
      title: "イテレータを返す enumerate",
      blocks: [
        { h: "enumerate もイテレータ" },
        { p: "3-2 で学んだ enumerate(イテラブル) は、(番号, 中身) の組を、番号 0 から順に返すイテレータを作ります。イテレータなので、next で1つずつ取り出すこともでき、一度終わりまで取り出すと、それで使い切りです。" },
        { code: 'it = enumerate(["赤", "青", "黄"])\nprint(next(it))\nprint(list(it))\nprint(list(it))', out: "(0, '赤')\n[(1, '青'), (2, '黄')]\n[]" },
        { try: "r42-enum" },
        { h: "ファイルを enumerate に渡す" },
        { p: "enumerate に渡すものは、イテラブルなら何でもかまいません。イテレータもイテラブルなので、ファイルオブジェクトも渡せます。そうすると、番号をそのまま行番号として使えます。" },
        { p: "番号は 0 から始まります。キーワード引数 start= に数を渡すと、その数から始められます。人に見せる行番号なら start=1 にすると自然です。" },
        { code: 'with open("pet42.txt", "w", encoding="utf-8") as f:\n    f.write("いぬ\\nねこ\\n")\n\nwith open("pet42.txt", "r", encoding="utf-8") as f:\n    for i, line in enumerate(f, start=10):\n        print(i, line.strip())', out: "10 いぬ\n11 ねこ" },
        { try: "l42-enumerate" },
        { h: "zip も組を返すイテレータ" },
        { p: "組み込み関数 zip(a, b) は、2つのイテラブル a と b から1つずつ取り出して組にしたものを、順に返すイテレータです。for 名前1, 名前2 in zip(a, b): と書くと、組の中身を2つの変数に分けて受け取れます。どちらかが先に終わると、そこで止まります。" },
        { code: 'for fruit, price in zip(["りんご", "みかん", "ぶどう"], [120, 80]):\n    print(fruit, price)', out: "りんご 120\nみかん 80" },
        { try: "zip" },
      ],
    },
    {
      title: "▲イテラブルとイテレータの定義",
      blocks: [
        { h: "__iter__ と __next__" },
        { p: "イテラブルとイテレータは、正しくは次のように決められています。イテラブルは「iter を使えるもの」、つまり __iter__ というメソッドを持つものです。イテレータは「next を使えるもの」、つまり __next__ というメソッドを持ち、さらに iter を使うと自分自身を返すものです。iter(x) は x.__iter__() を、next(x) は x.__next__() を呼ぶのと同じです。" },
        { p: "hasattr(もの, \"名前\") は、そのものが、その名前のメソッドなどを持っていれば True、持っていなければ False を返す関数です。これで、イテラブルかイテレータかを確かめられます。__iter__ や __next__ を自分で作る方法は、6-3 で学びます。" },
        { code: 's = "ab"\nprint(hasattr(s, "__iter__"), hasattr(s, "__next__"))\nit = iter(s)\nprint(it.__next__())', out: "True False\na" },
        { try: "r42-dunder" },
      ],
    },
  ],
  // 章の最後の演習問題: ファイル・for・iter・next・関数を組み合わせる(教材の練習とは別の題材に作り直した)
  exercises: ["l42-count", "l42-skiphead"],
};
