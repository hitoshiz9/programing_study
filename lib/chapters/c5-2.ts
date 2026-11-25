import type { Chapter } from "./types.ts";

// モジュールの作り方。説明は教科書(lib/learn/c5-2.ts)にあり、ここには問題だけを置く。
// .py ファイルをコードで書き出してから import する。作り直したモジュールを読み直すため、毎回 sys.modules から外す。
const RESET = (name: string) =>
  `importlib.invalidate_caches()     # 作ったばかりのファイルを見つけられるようにする\nsys.modules.pop("${name}", None)  # 前に読み込んだ分を忘れて、読み直す\n`;

const GREET = (body: string) =>
  `import importlib, sys\n\n# モジュールファイル greet52.py の中身\nsource = """def hello(name):\n${body}\n"""\nwith open("greet52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n${RESET("greet52")}import greet52\nprint(greet52.hello("ミケ"))\n`;

const COUNT = (body: string) =>
  `import importlib, sys\n\n# モジュールファイル count52.py の中身\nsource = """${body}\n"""\nwith open("count52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n${RESET("count52")}import count52\nprint("読み込み完了")\n`;

const SHAPE_HEAD = `import importlib, sys\n\nsource = """def square(a):\n    return a * a\n\ndef rect(a, b):\n    return a * b\n"""\nwith open("shape52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n${RESET("shape52")}\n`;

const TAX = (body: string, tail: string) =>
  `import importlib, sys\n\n# モジュールファイル tax52.py の中身\nsource = """${body}\n"""\nwith open("tax52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n${RESET("tax52")}${tail}`;

export const chapter: Chapter = {
  ref: "5-2",
  title: "モジュールの作り方",
  url: "https://utokyo-ipp.github.io/5/5-2.html",
  stage: "write",
  order: ["l52-file", "l52-toplevel", "l52-from", "l52-tax"],
  lessons: [
    {
      id: "l52-file",
      title: "自分のモジュールを作る",
      intro: [],
      example: "",
      task: "モジュールファイル greet52.py の中の関数 hello(name) を完成させよう。hello(\"ミケ\") が「こんにちは、ミケさん」を返すようにします（pass の行を書きかえます）。",
      starter: GREET("    pass"),
      solution: GREET('    return "こんにちは、" + name + "さん"'),
      wrong: GREET('    return "こんにちは、" + name'),
      expect: "こんにちは、ミケさん",
      mustInclude: ["return"],
      hints: ["source の中の pass を、return \"こんにちは、\" + name + \"さん\" に書きかえます。", "source の中も Python のコードなので、def の中の行は4つ字下げします。"],
      xp: 25,
    },
    {
      id: "l52-toplevel",
      title: "import するとファイル全体が動く",
      intro: [],
      example: "",
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
      id: "l52-from",
      title: "自作モジュールでも from と as",
      intro: [],
      example: "",
      task: "shape52.py には、正方形の面積 square(a) と長方形の面積 rect(a, b) があります。from shape52 import rect で取りこんで rect(3, 4) を表示し、続けて import shape52 as sp で取りこんで sp.square(3) を表示しよう。",
      starter: SHAPE_HEAD + "# ここに書こう\n",
      solution: SHAPE_HEAD + "from shape52 import rect\nprint(rect(3, 4))\nimport shape52 as sp\nprint(sp.square(3))",
      wrong: SHAPE_HEAD + "from shape52 import rect\nprint(rect(3, 3))\nimport shape52 as sp\nprint(sp.square(4))",
      expect: "12\n9",
      mustInclude: ["from shape52 import", " as "],
      hints: ["from shape52 import rect のあとは、rect(3, 4) と名前だけで呼べます。", "import shape52 as sp のあとは、sp.square(3) と書きます。"],
      xp: 25,
    },
    {
      id: "l52-tax",
      title: "演習: 税込みの値段のモジュール",
      intro: [],
      example: "",
      task: "モジュールファイル tax52.py の中に、値段 price に 10% の税を足した値段（price * 11 // 10）を返す関数 with_tax(price) を書こう。そのあと from tax52 import with_tax で取りこみ、with_tax(300) と with_tax(980) を1行ずつ表示しよう。",
      starter: TAX("# ここに関数 with_tax(price) を書こう", "# ここで with_tax を取りこんで、表示しよう\n"),
      solution: TAX("def with_tax(price):\n    return price * 11 // 10", "from tax52 import with_tax\nprint(with_tax(300))\nprint(with_tax(980))"),
      wrong: TAX("def with_tax(price):\n    return price * 1.1", "from tax52 import with_tax\nprint(with_tax(300))\nprint(with_tax(980))"),
      expect: "330\n1078",
      mustInclude: ["from tax52 import", "def with_tax"],
      hints: ["source の中に def with_tax(price): と、その下に字下げした return price * 11 // 10 を書きます。", "最後に from tax52 import with_tax と、print(with_tax(300))、print(with_tax(980)) です。"],
      xp: 30,
    },
  ],
  reads: [
    {
      id: "r52-once",
      title: "3回 import すると？",
      intro: "",
      code: `import importlib, sys\n\nsource = """print("読み込み中")\n"""\nwith open("once52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n${RESET("once52")}\nprint("はじめ")\nimport once52\nimport once52\nprint("まんなか")\nimport once52`,
      choices: ["はじめ\n読み込み中\n読み込み中\nまんなか\n読み込み中", "はじめ\n読み込み中\nまんなか", "読み込み中\nはじめ\nまんなか"],
      answer: 1,
      explain:
        "プログラムは上から順に動くので、まず「はじめ」が出ます。1回目の import で once52.py が実行され、「読み込み中」が表示されます。読み込んだモジュールは sys.modules に覚えられるので、2回目と3回目の import では同じものが使い回され、ファイルはもう実行されません。そのため「読み込み中」は1回だけです。import のたびに表示されると考えた人は、ファイルが実行されるのは最初の1回だけ、という決まりを思い出しましょう。",
      xp: 15,
    },
    {
      id: "r52-missing",
      title: "見つからないモジュール",
      intro: "",
      code: 'try:\n    import nothing52\n    print("読み込めた")\nexcept ModuleNotFoundError:\n    print("ない")\nprint("続き")',
      choices: ["ない\n続き", "読み込めた\nない\n続き", "ない"],
      answer: 0,
      explain:
        "nothing52.py というファイルはどこにもないので、import nothing52 の行で ModuleNotFoundError が起きます。すると try: の中の残り（print(\"読み込めた\")）は飛ばされ、except の下の「ない」が表示されます。そのあとはプログラムの続きに進むので、「続き」も表示されます。エラーで止まると考えた人は、try と except がエラーをつかまえて続けさせることを思い出しましょう。",
      xp: 15,
    },
    {
      id: "r52-where",
      title: "どちらが見つかる？",
      intro: "",
      code: `import importlib, os, sys\n\nos.makedirs("sub52", exist_ok=True)\nsource = """X = 5\n"""\nwith open("near52.py", "w", encoding="utf-8") as f:\n    f.write(source)\nwith open("sub52/far52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("near52", None)\nsys.modules.pop("far52", None)\nimport near52\nprint(near52.X)\ntry:\n    import far52\n    print(far52.X)\nexcept ModuleNotFoundError:\n    print("far52 はない")`,
      choices: ["5\n5", "5\nfar52 はない", "far52 はない"],
      answer: 1,
      explain:
        "near52.py は、使う側と同じディレクトリに書き出したので、import near52 で見つかり、5 が表示されます。far52.py は sub52 というディレクトリの中に書き出したので、import は見つけられず、ModuleNotFoundError になって except の下の「far52 はない」が出ます。5 が2回出ると考えた人は、import がディレクトリの中までは探さないことを思い出しましょう。",
      xp: 15,
    },
  ],
  explain: {},
  topics: [],
  refSections: 4,
  refProse: 1459,
};
