import type { LearnChapter } from "./types.ts";

// 1-4 テストとデバッグ。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// どの節も「1つの説明 → その説明だけを確かめる問題」の1対をくり返す。
export const chapter: LearnChapter = {
  ref: "1-4",
  sections: [
    {
      title: "仕様・テスト・デバッグ",
      blocks: [
        { h: "仕様・テスト・バグ・デバッグ" },
        { p: "プログラムで実現したいこと（何を受け取って、何を返すか、何を表示するか）を決めたものを「仕様（しよう）」といいます。たとえば「数 x を受け取り、x の半分を返す。7 なら 3.5 を返す」は、関数 half(x) の仕様です。" },
        { p: "作ったプログラムを実際に動かして、仕様どおりに動くかを確かめることを「テスト」といいます。テストで使う「入力と、そのとき返ってきてほしい答え」の組を「テストケース」といいます（例: 入力 7 → 答え 3.5）。" },
        { p: "仕様どおりに動かない原因（プログラムのまちがい）を「バグ」といい、バグを見つけて取りのぞく作業を「デバッグ」といいます。プログラム作りは、①仕様を考える ②プログラムを書く ③テストする ④バグがあればデバッグする、をくり返して進めます。" },
        { p: "テストに合格しても、試していない入力でまちがえることはあるので、それだけで「絶対に正しい」とは言えません。でも、いろいろなテストケースに合格するほど、正しい見こみは高くなります。" },
        { code: "def half(x):\n    return x / 2\n\nprint(half(8))\nprint(half(7))", out: "4.0\n3.5" },
        { try: "r14-test" },
      ],
    },
    {
      title: "assert文",
      blocks: [
        { h: "成り立つはずの条件を書く: assert" },
        { p: "assert 条件 と書くと、「この条件は成り立つはずだ」と宣言できます。条件が True なら何も起こらず、次の行へ進みます。条件が False なら AssertionError というエラーが出て、プログラムはそこで止まります。" },
        { p: "下の例では、関数 square（2乗を返すはずの関数）が、まちがえて x + x を返しています。square(2) は 2 + 2 = 4 で、たまたま正しい答えと同じなので、1つ目の assert は通ります。square(3) は 6 になり、9 と等しくないので、2つ目の assert（5行目）で AssertionError になり、最後の print は実行されません。" },
        { code: "def square(x):\n    return x + x\n\nassert square(2) == 4\nassert square(3) == 9\nprint(\"OK\")", out: "Traceback (most recent call last):\n  File \"<exec>\", line 5, in <module>\nAssertionError" },
        { p: "assert で止まったら、その条件に関係するところ（ここでは関数 square）にバグがあると分かります。assert は消さずに、関数のほうを直します。" },
        { try: "assert" },
        { h: "テストケースを assert で並べる" },
        { p: "テストケースを assert で何行も並べておくと、かんたんなテストになります。assert 関数(入力) == 答え の形で書きます。返値が True か False の関数なら、assert 関数(入力) で「True になるはず」、assert not 関数(入力) で「False になるはず」を確かめられます。" },
        { p: "テストケースには、ふつうの値だけでなく、ちょうど境目の値（「18 以上」なら 18 と 17）も入れると、> と >= のまちがいなどが見つかります。全部の assert が通れば、何も表示されずに最後まで進みます。" },
        { code: "def is_big(n):\n    return n >= 100\n\nassert is_big(100)\nassert not is_big(99)\nassert is_big(250)\nprint(\"テスト合格\")", out: "テスト合格" },
        { try: "spec" },
      ],
    },
    {
      title: "エラーの分類",
      blocks: [
        { h: "エラーは3種類" },
        { p: "プログラムのまちがいは、大きく3種類に分けられます。①構文エラー: 書き方が Python の決まりに合っていないもの。1行も実行されません。②実行時エラー: 書き方は正しいが、実行している途中で続けられなくなるもの。エラーの行の手前までは実行されます。③論理エラー: エラーは何も出ずに最後まで動くが、結果が思っていたのとちがうもの。" },
        { p: "③の論理エラーでは、Python は書かれたとおりに計算するだけなので、エラーメッセージは出ません。結果を見て、自分で気づく必要があります。" },
        { code: "print(\"はじめ\")\nprint(20 - 4 * 3)  # (20 - 4) * 3 のつもり\nprint(\"おわり\")", out: "はじめ\n8\nおわり" },
        { try: "r14-kinds" },
      ],
    },
    {
      title: "構文エラー",
      blocks: [
        { h: "構文エラーの例とメッセージ" },
        { p: "構文エラーは、Python の文法（書き方の決まり）に合っていないため、Python がプログラムを読み取れないエラーです。よくある原因は、\" や ( ) の閉じ忘れ、: の付け忘れ、字下げのくずれ、全角の空白、== のつもりで = と書く、などです。エラーの種類は SyntaxError か IndentationError（字下げのまちがい）です。" },
        { p: "構文エラーのメッセージには、まちがいのある行と、その行の中のだいたいの場所が ^ で示されます。英語の説明が分かりにくくても、場所を見れば原因の見当がつきます。下の unterminated string literal は「文字列が終わっていない」、つまり閉じる \" がない、という意味です。" },
        { code: "print(\"おはよう)", out: "Traceback (most recent call last):\n  File \"<exec>\", line 1\n    print(\"おはよう)\n          ^\nSyntaxError: unterminated string literal (detected at line 1)" },
        { try: "error" },
        { h: ": の付け忘れと、= と == のまちがい" },
        { p: "if や def の行の最後の : を付け忘れると、expected ':'（: が必要）という SyntaxError になります。if の条件で == のつもりで = と書くと、Maybe you meant '==' …（== のまちがいではありませんか）と教えてくれます。" },
        { code: "if 3 > 1\n    print(1)", out: "Traceback (most recent call last):\n  File \"<exec>\", line 1\n    if 3 > 1\n            ^\nSyntaxError: expected ':'" },
        { p: "1つの行に、まちがいが2つ以上あることもあります。1つ直したら、もう一度実行して、ほかのまちがいがないか確かめましょう。" },
        { try: "l14-colon" },
      ],
    },
    {
      title: "実行時エラー",
      blocks: [
        { h: "実行の途中で止まるエラー" },
        { p: "実行時エラーは、プログラムを実行している途中で起きて、そこでプログラムを止めてしまうエラーです。よくある原因と、そのときのエラーの種類は次のとおりです。①変数や関数の名前のつづりまちがい（NameError） ②0 でわる（ZeroDivisionError） ③assert の条件が成り立たない（AssertionError） ④関数の中のローカル変数を、代入する前に使う（UnboundLocalError。次で説明します）。ほかに、あとの章で習う辞書にないキーを使う（KeyError）、ないファイルを読む（FileNotFoundError）もあります。" },
        { p: "エラーの種類の名前は、何が起きたかをよく表しています。いちばん下の行の、種類と説明を読んで原因を考えましょう。つづりのまちがい（double を dubble と書く、など）は、自分では気づきにくいので、エラーの説明に出てくる名前をよく見ます。下の例では、関数の名前 tax を taks とまちがえて呼び出しています。" },
        { code: "def tax(price):\n    return price // 10\n\nprint(tax(500))\nprint(taks(800))", out: "50\nTraceback (most recent call last):\n  File \"<exec>\", line 5, in <module>\nNameError: name 'taks' is not defined" },
        { try: "runtime" },
        { h: "UnboundLocalError" },
        { p: "1-2 で習ったように、関数の中で代入した名前は、その関数のローカル変数になります。関数の中に total = total + 10 と書くと、total はローカル変数になるので、右側の total は外のグローバル変数ではなく「まだ値のないローカル変数」を指します。そのため UnboundLocalError（ローカル変数に値がまだない、というエラー）になります。" },
        { code: "total = 0\n\ndef add_ten():\n    total = total + 10\n    return total\n\nprint(add_ten())", out: "Traceback (most recent call last):\n  File \"<exec>\", line 7, in <module>\n  File \"<exec>\", line 4, in add_ten\nUnboundLocalError: cannot access local variable 'total' where it is not associated with a value" },
        { p: "関数の中で起きたエラーでは、File の行が2つ出ます。上は「7行目で関数を呼び出した」、下は「その関数 add_ten の中の4行目でエラーが起きた」という意味です。直すには、使いたい値を引数で渡して、関数の中ではその引数を使います。" },
        { try: "l14-unbound" },
      ],
    },
    {
      title: "論理エラー",
      blocks: [
        { h: "動くけれど、答えがちがう" },
        { p: "論理エラーは、プログラムはエラーなく最後まで動くのに、思っていたとおりの結果にならないまちがいです。原因はプログラムではなく、書いた人の思いちがいにあります。実際のバグの多くは、この論理エラーです。" },
        { p: "論理エラーを見つけるには、答えが分かっているテストケースで実行して、「こうなるはず」という結果と、実際の結果を比べます。assert を書いておくと、論理エラーを AssertionError（実行時エラー）として見つけられるようになります。" },
        { code: "def per_person(total, people):\n    return total / people\n\nprint(per_person(3000, 4))  # 750.0 になるはず", out: "750.0" },
        { try: "logicerr" },
      ],
    },
    {
      title: "デバッグの具体例",
      blocks: [
        { h: "途中の値を print して原因を探す" },
        { p: "テストに合格しないときは、関数の中に print を足して、途中の変数の値を表示してみます。「ここまでは思ったとおりの値か」を順に確かめていくと、まちがっている行が見つかります。" },
        { p: "原因が分かって直したら、調べるために足した print は消します。その print は仕様（何を返すか）に入っていないからです。" },
        { code: "def price_set(a, b):\n    total = a + b\n    print(\"total\", total)\n    return total - 100\n\nprint(price_set(300, 500))", out: "total 800\n700" },
        { try: "debugprint" },
        { h: "2つの変数の値を入れかえる" },
        { p: "よくあるバグの1つに、2つの変数の値の入れかえがあります。a = b のあとに b = a と書くと、1行目で a の元の値が消えてしまうので、両方とも b の値になります。" },
        { p: "正しく入れかえるには、一時的に値を入れておく変数（ここでは tmp）を使います。①tmp = a で a の値を取っておく ②a = b ③b = tmp、の順です。" },
        { code: "x = 1\ny = 2\ntmp = x\nx = y\ny = tmp\nprint(x, y)", out: "2 1" },
        { try: "l14-swap" },
      ],
    },
    {
      title: "コーディングスタイル",
      blocks: [
        { h: "読みやすい書き方: PEP 8" },
        { p: "バグは直すより、はじめから起こさないほうが楽です。読みやすいコードは、まちがえにくく、まちがいも見つけやすくなります。Python には、書き方をそろえるための公式の指針「PEP 8（ペップ・エイト）」があります。" },
        { p: "PEP 8 のおもな決まり: ①字下げは半角の空白4つ ②= += == などの前後には空白を1つ ③, のうしろに空白を1つ ④式の中では、先に計算する * のまわりの空白を省いて 2*x + y のように書いてもよい ⑤関数の名前と ( の間には空白を入れない（print (1) ではなく print(1)） ⑥小文字の l、大文字の I と O は、数字の 1 や 0 とまぎらわしいので、1文字の名前に使わない ⑦True や False と == で比べない（if ok == True: ではなく if ok:）。名前は、意味の分かる小文字の英語にします。" },
        { p: "pycodestyle という道具を使うと、PEP 8 に合っているかを自動で調べられます。" },
        { code: "def area(width, height):\n    return width * height\n\nprint(area(3, 5))", out: "15" },
        { try: "style" },
        { h: "PEP 8 のほかに気をつけること" },
        { p: "①意味の分からない数（マジックナンバー）を式に直接書かず、名前の付いた変数にする。何度も使う決まった値（定数）の名前は、TAX_RATE のように大文字で書く習慣があります。②使わなくなったコードは消す。③1つの関数には、1つの仕事だけをさせる。" },
        { p: "思いこみや勘ちがいはバグのもとです。読んだ人が誤解しないように書くことが大切です。" },
        { code: "SHIP = 500\n\ndef with_ship(price):\n    return price + SHIP\n\nprint(with_ship(1500))", out: "2000" },
        { try: "l14-magic" },
      ],
    },
  ],
  // 章の最後の演習問題: 仕様を読み、関数を作って assert でテストし、バグを直す
  exercises: ["l14-ex"],
};
