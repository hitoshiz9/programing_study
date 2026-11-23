import type { Chapter } from "./types.ts";

// モジュールの作り方。.py ファイルをブラウザの中の仮のファイル置き場に書いてから import する。
// 一度 import したモジュールは残るので、毎回 sys.modules から外してから読み込み直す。
const RESET = (name: string) =>
  `importlib.invalidate_caches()     # 作ったばかりのファイルを見つけられるようにする\nsys.modules.pop("${name}", None)  # 前の実行で読み込んだ分を忘れる\n`;

const GREET = (body: string) =>
  `import importlib, sys\n\n# モジュールファイル greet52.py の中身\nsource = """def hello(name):\n${body}\n"""\nwith open("greet52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n${RESET("greet52")}import greet52\nprint(greet52.hello("ミケ"))\n`;

const COUNT = (body: string) =>
  `import importlib, sys\n\n# モジュールファイル count52.py の中身\nsource = """${body}\n"""\nwith open("count52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n${RESET("count52")}import count52\nprint("読み込み完了")\n`;

const CALC_HEAD = `import importlib, os, sys\n\nos.makedirs("mods52", exist_ok=True)\nwith open("mods52/calc52.py", "w", encoding="utf-8") as f:\n    f.write("def double(x):\\n    return x * 2\\n")\nwhile "mods52" in sys.path:\n    sys.path.remove("mods52")  # 前の実行で足した分を消して、毎回同じ状態から始める\n${RESET("calc52")}\n`;

const SHAPE_HEAD = `import importlib, sys\n\nsource = """def square(a):\n    return a * a\n\ndef rect(a, b):\n    return a * b\n"""\nwith open("shape52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n${RESET("shape52")}\n`;

export const chapter: Chapter = {
  ref: "5-2",
  title: "モジュールの作り方",
  url: "https://utokyo-ipp.github.io/5/5-2.html",
  stage: "write",
  order: ["l52-file", "l52-toplevel", "l52-path", "l52-from"],
  lessons: [
    {
      id: "l52-file",
      title: "自分のモジュールを作る",
      intro: [
        "Python のコードだけを書いた、名前が .py で終わるファイルをモジュールファイルといいます。greet52.py というファイルを作ると、import greet52 で読み込めます。モジュールの名前は、ファイル名から .py を取ったものです。",
        "このアプリでは、コードの中で open を使って .py ファイルを書き、そのあと import します。最後の2行の準備は、作り直したファイルを毎回読み込み直すためのものです。",
      ],
      example: 'import importlib, sys\n\nwith open("hi52.py", "w", encoding="utf-8") as f:\n    f.write("NAME = \\"ぴよ\\"\\n")\n\nimportlib.invalidate_caches()\nsys.modules.pop("hi52", None)\nimport hi52\nprint(hi52.NAME)',
      task: "モジュールファイル greet52.py の中の関数 hello(name) を完成させよう。hello(\"ミケ\") が「こんにちは、ミケさん」を返すようにします（pass の行を書きかえます）。",
      starter: GREET("    pass"),
      solution: GREET('    return "こんにちは、" + name + "さん"'),
      wrong: GREET('    return "こんにちは、" + name'),
      expect: "こんにちは、ミケさん",
      mustInclude: ["import greet52"],
      hints: ["source の中の pass を、return \"こんにちは、\" + name + \"さん\" に書きかえます。", "source の中も Python のコードなので、def の中の行は4つ字下げします。"],
      xp: 25,
    },
    {
      id: "l52-toplevel",
      title: "import するとファイル全体が動く",
      intro: [
        "モジュールを import すると、そのファイルのコードが上から順に、まとめて1回実行されます。関数の定義だけでなく、print などの命令も、そのときに動きます。",
      ],
      example: 'import importlib, sys\n\nwith open("hey52.py", "w", encoding="utf-8") as f:\n    f.write("print(\\"hey52 を読み込みました\\")\\n")\n\nimportlib.invalidate_caches()\nsys.modules.pop("hey52", None)\nimport hey52',
      task: "モジュールファイル count52.py の中に、1 から 3 までを1行ずつ表示する for 文を書こう。import count52 したときに 1, 2, 3 が表示され、そのあとに「読み込み完了」が表示されます。",
      starter: COUNT("# ここに、1 から 3 までを1行ずつ表示する for 文を書こう"),
      solution: COUNT("for i in range(1, 4):\n    print(i)"),
      wrong: COUNT("for i in range(3):\n    print(i)"),
      expect: "1\n2\n3\n読み込み完了",
      mustInclude: ["import count52"],
      hints: ["source の中に、for i in range(1, 4): と、その下に字下げした print(i) を書きます。", "range(1, 4) は 1, 2, 3 です。range(3) だと 0 から始まります。"],
      xp: 25,
    },
    {
      id: "l52-path",
      title: "モジュールを置く場所",
      intro: [
        "import は、決まった場所の中からモジュールファイルを探します。その一覧が sys.path というリストで、最初のほうに「今いるディレクトリ」が入っています。",
        "ほかのディレクトリにあるモジュールを読みたいときは、sys.path.append(\"ディレクトリ\") で、探す場所を足します。",
      ],
      example: 'import sys\nprint(type(sys.path))',
      task: "calc52.py は、mods52 というディレクトリの中に作られています。mods52 を sys.path に足してから import calc52 し、calc52.double(21) を表示しよう。",
      starter: CALC_HEAD + "# ここに書こう\n",
      solution: CALC_HEAD + 'sys.path.append("mods52")\nimport calc52\nprint(calc52.double(21))',
      wrong: CALC_HEAD + 'sys.path.append("calc52")\nimport calc52\nprint(calc52.double(21))',
      expect: "42",
      mustInclude: ["import calc52"],
      hints: ["sys.path.append(\"mods52\") で、mods52 の中も探してもらえるようになります。", "そのあと import calc52 と print(calc52.double(21)) です。"],
      xp: 25,
    },
    {
      id: "l52-from",
      title: "自作モジュールでも from と as",
      intro: [
        "自分で作ったモジュールでも、from モジュール名 import 名前 や import モジュール名 as 別名 が、math などと同じように使えます。",
      ],
      example: 'from math import sqrt as root\nprint(root(4))',
      task: "shape52.py には、正方形の面積 square(a) と長方形の面積 rect(a, b) があります。from shape52 import rect で取りこんで rect(3, 4) を表示し、続けて import shape52 as sp で取りこんで sp.square(3) を表示しよう。",
      starter: SHAPE_HEAD + "# ここに書こう\n",
      solution: SHAPE_HEAD + "from shape52 import rect\nprint(rect(3, 4))\nimport shape52 as sp\nprint(sp.square(3))",
      wrong: SHAPE_HEAD + "from shape52 import rect\nprint(rect(3, 3))\nimport shape52 as sp\nprint(sp.square(4))",
      expect: "12\n9",
      mustInclude: ["from shape52 import", " as "],
      hints: ["from shape52 import rect のあとは、rect(3, 4) と名前だけで呼べます。", "import shape52 as sp のあとは、sp.square(3) と書きます。"],
      xp: 25,
    },
  ],
  reads: [
    {
      id: "r52-once",
      title: "2回 import すると？",
      intro: "同じモジュールを2回 import したとき、中のコードは何回動くでしょう。",
      code: `import importlib, sys\n\nsource = """print("読み込み中")\n"""\nwith open("once52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n${RESET("once52")}\nimport once52\nimport once52\nprint("おわり")`,
      choices: ["読み込み中\n読み込み中\nおわり", "おわり", "読み込み中\nおわり"],
      answer: 2,
      explain:
        "1回目の import で once52.py が実行され、「読み込み中」が表示されます。読み込んだモジュールは sys.modules に覚えられるので、2回目の import では同じものが使い回され、ファイルはもう実行されません。そのため「読み込み中」は1回だけです。このアプリの問題で sys.modules.pop を書いているのは、この「覚えている分」を消して、作り直したファイルを読ませるためです。",
      xp: 15,
    },
    {
      id: "r52-name",
      title: "モジュールの名前",
      intro: "モジュールの __name__ には、そのモジュールの名前が入っています。",
      code: `import importlib, sys\n\nwith open("tool52r.py", "w", encoding="utf-8") as f:\n    f.write("X = 1\\n")\n${RESET("tool52r")}\nimport tool52r\nprint(tool52r.__name__)`,
      choices: ["tool52r.py", "tool52r", "__main__"],
      answer: 1,
      explain:
        "モジュールの名前は、ファイル名から拡張子の .py を取ったものです。だから tool52r.py を import したモジュールの __name__ は tool52r になります。import tool52r.py のように .py を付けて書くとエラーになるのも、名前に .py が入らないからです。__main__ は、ファイルをスクリプトとして直接実行したときの名前で、付録の「コマンドライン実行」で学びます。",
      xp: 15,
    },
  ],
  explain: {
    "l52-file": [
      { h: "プログラムを分けて再利用する" },
      { p: "プログラムが大きくなってくると、1つのファイルに全部書くより、役割ごとに別のファイルに分けたほうが、作るのも直すのも楽になります。一度作った便利な関数を別のプログラムでも使いたいときは、その関数を1つのファイルにまとめておき、使う側から import します。こうして切り出したファイルがモジュールです。" },
      { p: "モジュールファイルは、Python のコードだけが書かれた、拡張子 .py のテキストファイルです。説明の文章や実行結果は入りません。文字コードは UTF-8 で保存するのが公式にすすめられています。" },
      { h: "このアプリでの作り方" },
      { p: "このアプリでは、エディタとは別にファイルを作る画面がないので、open と write で .py ファイルを書き出してから import します。三重の引用符 \"\"\" で囲んだ文字列は、何行にもわたって書けるので、モジュールの中身を書くのに便利です。" },
      { code: 'import importlib, sys\n\nsource = """def twice(x):\n    return x * 2\n"""\nwith open("ex52a.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("ex52a", None)\nimport ex52a\nprint(ex52a.twice(5))', out: "10" },
      { p: "import したモジュールの関数は、モジュール名.関数名 で呼びます。importlib.invalidate_caches() は、プログラムの途中で作ったファイルを import が確実に見つけられるようにする命令で、sys.modules.pop(...) は、前の実行で読み込んだ古い中身を忘れさせる命令です。" },
    ],
    "l52-toplevel": [
      { h: "ファイル全体が1つのプログラム" },
      { p: "Jupyter や Colab のノートブックは、セルを1つずつ選んで実行できました。ノートブックを .py ファイルとして保存すると、コードのセルだけが順番に並んだ1つのプログラムになり、説明の文章はコメントになります。そのファイルを実行したり import したりすると、セルごとではなく、上から下までが1回で全部実行されます。" },
      { p: "import したときに表示がたくさん出ると、使う側は困ります。そのため、ふつうモジュールには関数や値の定義だけを書き、表示などの処理は使う側に書きます。直接実行したときだけ動かしたい処理の書き分け方は、付録の「コマンドライン実行」で学びます。" },
      { code: 'import importlib, sys\n\nsource = """print("A")\ndef f():\n    print("B")\nprint("C")\n"""\nwith open("ex52b.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("ex52b", None)\nimport ex52b\nex52b.f()', out: "A\nC\nB" },
      { p: "import した時点では、関数 f は定義されるだけで、中の print(\"B\") は動きません。B が表示されるのは、最後に ex52b.f() と呼び出したときです。" },
    ],
    "l52-path": [
      { h: "ファイルを置く場所が大事" },
      { p: "Colab のような実行環境で自分のモジュールを使うときは、まず .py ファイルを、プログラムが動いているディレクトリ（カレントディレクトリ）に置く必要があります。手元のパソコンからアップロードするのは、そのためです。このアプリでは、コードの中で open を使ってファイルを書くことが、アップロードのかわりになります。" },
      { p: "import がモジュールを探す場所は sys.path に並んでいます。このアプリでは、最初の \"\" がカレントディレクトリを表します。そこにも、Python に付いてくるモジュールの置き場にもないファイルは見つからず、ModuleNotFoundError になります。" },
      { code: 'try:\n    import no_such_module52\nexcept ModuleNotFoundError:\n    print("見つかりません")', out: "見つかりません" },
      { p: "別のディレクトリに置いたモジュールを使うときは、sys.path.append() でそのディレクトリを探す場所に加えます。ただし、ふだんは使う側と同じディレクトリにモジュールを置くのがいちばん簡単です。" },
    ],
    "l52-from": [
      { h: "既存のモジュールと同じ使い方" },
      { p: "自分で作ったモジュールも、math のような Python に付いてくるモジュールと、まったく同じ方法で読み込めます。import モジュール名 で読み込めば、モジュール名.関数名 で呼べます。from モジュール名 import 関数名 なら関数名だけで、import モジュール名 as 別名 なら短い別名で呼べます。" },
      { p: "from モジュール名 import * も書けますが、モジュールの中の名前と自分のプログラムの名前がぶつかって、知らないうちに上書きされることがあるので、すすめられていません。" },
      { code: 'import importlib, sys\n\nsource = """def fact(n):\n    prod = 1\n    for i in range(1, n + 1):\n        prod *= i\n    return prod\n"""\nwith open("ex52c.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("ex52c", None)\nfrom ex52c import fact\nimport ex52c as e\nprint(fact(5), e.fact(3))', out: "120 6" },
    ],
  },
  topics: [
    ["モジュールファイル", ["l52-file"]],
    ["ノートブックファイルをモジュールファイルに変換する", ["l52-toplevel", "r52-once"]],
    ["モジュールファイルをアップロードする", ["l52-path"]],
    ["自作モジュールの使い方", ["l52-from", "r52-name"]],
  ],
  refSections: 4,
  refProse: 1459,
};
