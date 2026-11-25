import type { Chapter } from "./types.ts";

// 付録：Pythonスクリプトとコマンドライン実行。ブラウザではコマンドラインが使えないので、
// runpy.run_path(ファイル, run_name="__main__") で「python ファイル」と実行したのと同じ動きをまねし、sys.argv は自分で用意する。
const HELLO = (body: string) =>
  `import runpy\n\n# スクリプト hello_cmd.py の中身\nsource = """${body}\n"""\nwith open("hello_cmd.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n# 「python hello_cmd.py」と実行したのと同じ\nrunpy.run_path("hello_cmd.py", run_name="__main__")\n`;

const WHERE_HEAD =
  'import os, runpy\n\nos.chdir("/home/pyodide")  # このアプリの最初の作業場所から始める\nos.makedirs("proj_cmd", exist_ok=True)\nsource = """import os\nprint("ここで動いています:", os.getcwd())\n"""\nwith open("proj_cmd/where.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n';

const ARGS_HEAD =
  'import runpy, sys\n\nwith open("argsprint.py", "w", encoding="utf-8") as f:\n    f.write("import sys\\nprint(sys.argv)\\n")\n\n';

const ARGC_HEAD =
  'import runpy, sys\n\nwith open("argcount.py", "w", encoding="utf-8") as f:\n    f.write("import sys\\nprint(len(sys.argv) - 1)\\n")\n\n';

const ARGV = (list: string) => `import sys\n\nsys.argv = [${list}]  # コマンドラインで実行したつもりの中身\n\n`;

const TOOL = (body: string) =>
  `import importlib, runpy, sys\n\nsource = """import sys\n\ndef twice(n):\n    return n * 2\n${body}\n"""\nwith open("tool_cmd.py", "w", encoding="utf-8") as f:\n    f.write(source)\nimportlib.invalidate_caches()\nsys.modules.pop("tool_cmd", None)\n\nimport tool_cmd  # モジュールとして読み込む\nprint("import した:", tool_cmd.twice(5))\n\nsys.argv = ["tool_cmd.py", "21"]  # python tool_cmd.py 21 と実行したつもり\nrunpy.run_path("tool_cmd.py", run_name="__main__")\n`;

const SJIS = (head: string) =>
  `import runpy\n\nsource = """${head}print("こんにちは、Shift_JIS")\n"""\nwith open("sjis_cmd.py", "w", encoding="shift_jis") as f:\n    f.write(source)\n\nrunpy.run_path("sjis_cmd.py", run_name="__main__")\n`;

const SHEBANG = (head: string) =>
  `import runpy\n\nsource = """${head}print("はじめの2行は、どちらもコメントあつかい")\n"""\nwith open("bang_cmd.py", "w", encoding="shift_jis") as f:\n    f.write(source)\n\nrunpy.run_path("bang_cmd.py", run_name="__main__")\n`;

export const chapter: Chapter = {
  ref: "A-command",
  title: "付録：Pythonスクリプトとコマンドライン実行",
  url: "https://utokyo-ipp.github.io/appendix/5-command.html",
  stage: "write",
  order: ["cmd-script", "cmd-cd", "cmd-argv", "cmd-argv-try", "cmd-main", "cmd-coding", "cmd-shebang", "cmd-arg-last", "cmd-arg0", "cmd-argc", "cmd-argprod"],
  lessons: [
    {
      id: "cmd-script",
      title: "スクリプトを実行する",
      intro: [
        ".py ファイルは、それだけで実行できるプログラムです。直接実行するために書いた .py ファイルを、Python スクリプトといいます。ふつうは、ターミナル（コマンドを打ちこむ画面）で python ファイル名 と打って実行します。",
        "このアプリではターミナルが使えないので、runpy.run_path(ファイル名, run_name=\"__main__\") で、同じように実行したことにします。",
      ],
      example: 'import runpy\n\nwith open("hi_cmd.py", "w", encoding="utf-8") as f:\n    f.write("print(\\"スクリプトが動きました\\")\\n")\n\nrunpy.run_path("hi_cmd.py", run_name="__main__")',
      task: "スクリプト hello_cmd.py の中身（source の中）に、変数 x に 7 を入れて、print(\"x の値は\", x) で表示するコードを書こう。最後の行で、このスクリプトが実行されます。",
      starter: HELLO("# ここに、このスクリプトの中身を書こう"),
      solution: HELLO('x = 7\nprint("x の値は", x)'),
      wrong: HELLO('x = 7\nprint("x の値は", "x")'),
      expect: "x の値は 7",
      hints: ["source の \"\"\" と \"\"\" の間が、スクリプトのファイルの中身になります。", "x = 7 の次の行に print(\"x の値は\", x) と書きます。"],
      xp: 20,
    },
    {
      id: "cmd-cd",
      title: "cd で移動してから実行する",
      intro: [
        "ターミナルでは、cd ディレクトリ名 で今いるディレクトリを移動してから、python スクリプト名 で実行するのがふつうです。cd .. で1つ上に戻ります。",
        "Python の中では、os.chdir() が cd と同じ働きをします。",
      ],
      example: 'import os\nos.chdir("/home/pyodide")\nprint(os.getcwd())',
      task: "proj_cmd の中に where.py があります。「cd proj_cmd」「python where.py」「cd ..」と同じことを、os.chdir と runpy.run_path(\"where.py\", run_name=\"__main__\") で行い、最後に print(os.getcwd()) で、元の場所に戻ったことを表示しよう。",
      starter: WHERE_HEAD + "# ここに書こう\n",
      solution: WHERE_HEAD + 'os.chdir("proj_cmd")\nrunpy.run_path("where.py", run_name="__main__")\nos.chdir("..")\nprint(os.getcwd())',
      wrong: WHERE_HEAD + 'runpy.run_path("proj_cmd/where.py", run_name="__main__")\nprint(os.getcwd())',
      expect: "ここで動いています: /home/pyodide/proj_cmd\n/home/pyodide",
      mustInclude: ["chdir", "run_path"],
      hints: ["os.chdir(\"proj_cmd\") で移動してから、runpy.run_path(\"where.py\", run_name=\"__main__\") で実行します。", "そのあと os.chdir(\"..\") で戻り、print(os.getcwd()) です。"],
      xp: 25,
    },
    {
      id: "cmd-argv",
      title: "コマンドライン引数と sys.argv",
      intro: [
        "python argsprint.py ねこ いぬ のように、スクリプト名のうしろに空白で区切って文字を書くと、それがスクリプトに渡されます。これをコマンドライン引数といいます。",
        "スクリプトの中では、sys.argv というリストで受け取れます。0番目はスクリプト名で、そのうしろに引数が順に並びます。",
      ],
      example: 'import sys\nsys.argv = ["show.py", "A"]\nprint(sys.argv)',
      task: "argsprint.py は sys.argv をそのまま表示するスクリプトです。「python argsprint.py ねこ いぬ」と実行したつもりで、sys.argv にリストを入れてから、runpy.run_path(\"argsprint.py\", run_name=\"__main__\") で実行しよう。",
      starter: ARGS_HEAD + "# ここに書こう\n",
      solution: ARGS_HEAD + 'sys.argv = ["argsprint.py", "ねこ", "いぬ"]\nrunpy.run_path("argsprint.py", run_name="__main__")',
      wrong: ARGS_HEAD + 'sys.argv = ["ねこ", "いぬ"]\nrunpy.run_path("argsprint.py", run_name="__main__")',
      expect: "['argsprint.py', 'ねこ', 'いぬ']",
      mustInclude: ["sys.argv", "run_path"],
      hints: ["sys.argv の0番目にはスクリプト名 \"argsprint.py\" が入ります。", "sys.argv = [\"argsprint.py\", \"ねこ\", \"いぬ\"] のあとに runpy.run_path(\"argsprint.py\", run_name=\"__main__\") です。"],
      xp: 25,
    },
    {
      id: "cmd-argv-try",
      title: "練習: 引数を変えて実行する",
      intro: [
        "同じスクリプトでも、渡すコマンドライン引数を変えると、動きが変わります。引数を1つも書かなければ、sys.argv はスクリプト名だけのリストになります。",
      ],
      example: 'import sys\nsys.argv = ["show.py"]\nprint(len(sys.argv))',
      task: "argcount.py は、受け取ったコマンドライン引数の数を表示するスクリプトです。「python argcount.py」（引数なし）と「python argcount.py 1 2 3」の2通りで実行し、結果を2行で表示しよう。",
      starter: ARGC_HEAD + "# ここに書こう\n",
      solution:
        ARGC_HEAD +
        'sys.argv = ["argcount.py"]\nrunpy.run_path("argcount.py", run_name="__main__")\nsys.argv = ["argcount.py", "1", "2", "3"]\nrunpy.run_path("argcount.py", run_name="__main__")',
      wrong:
        ARGC_HEAD +
        'sys.argv = ["argcount.py"]\nrunpy.run_path("argcount.py", run_name="__main__")\nsys.argv = ["argcount.py", "1 2 3"]\nrunpy.run_path("argcount.py", run_name="__main__")',
      expect: "0\n3",
      mustInclude: ["sys.argv", "run_path"],
      hints: ["空白で区切った1つ1つが別の引数です。「1 2 3」は \"1\", \"2\", \"3\" の3つの文字列になります。", "sys.argv を入れかえてから run_path する、を2回くり返します。"],
      xp: 25,
    },
    {
      id: "cmd-arg-last",
      title: "練習: 最後の引数を表示する",
      intro: [
        "sys.argv はふつうのリストなので、番号で取り出せます。sys.argv[1] が1つ目の引数、sys.argv[-1] がいちばん最後の要素です。",
      ],
      example: 'import sys\nsys.argv = ["show.py", "A", "B"]\nprint(sys.argv[1])',
      task: "sys.argv には「python last.py りんご みかん ぶどう」と実行したつもりの中身が入っています。sys.argv を使って、いちばん最後のコマンドライン引数を表示しよう（引数の数が変わっても最後のものが出るようにします）。",
      starter: ARGV('"last.py", "りんご", "みかん", "ぶどう"') + "# ここに書こう\n",
      solution: ARGV('"last.py", "りんご", "みかん", "ぶどう"') + "print(sys.argv[-1])",
      wrong: ARGV('"last.py", "りんご", "みかん", "ぶどう"') + "print(sys.argv[1])",
      expect: "ぶどう",
      mustInclude: ["sys.argv"],
      hints: ["リストの最後の要素は、番号 -1 で取り出せます。", "print(sys.argv[-1]) です。"],
      xp: 20,
    },
    {
      id: "cmd-arg0",
      title: "練習: スクリプト名を表示する",
      intro: [
        "sys.argv[0] には、実行したスクリプトの名前が入っています。スクリプトが自分の名前を表示したり、使い方の説明に名前を入れたりするときに使えます。",
      ],
      example: 'import sys\nsys.argv = ["show.py", "A"]\nprint(sys.argv[0])',
      task: "sys.argv には「python report.py 2026」と実行したつもりの中身が入っています。sys.argv からスクリプト名を取り出し、最後の .py を取りのぞいた「report」を表示しよう。",
      starter: ARGV('"report.py", "2026"') + "# ここに書こう\n",
      solution: ARGV('"report.py", "2026"') + "print(sys.argv[0][:-3])",
      wrong: ARGV('"report.py", "2026"') + "print(sys.argv[0])",
      expect: "report",
      mustInclude: ["sys.argv"],
      hints: ["スクリプト名は sys.argv[0] です。", "\".py\" は3文字なので、スライス [:-3] で取りのぞけます。sys.argv[0].replace(\".py\", \"\") でもかまいません。"],
      xp: 20,
    },
    {
      id: "cmd-argc",
      title: "練習: 引数の数を表示する",
      intro: [
        "len(sys.argv) は、スクリプト名もふくめた要素の数です。コマンドライン引数だけの数は、そこから1を引いた数になります。",
      ],
      example: 'import sys\nsys.argv = ["show.py", "A", "B"]\nprint(len(sys.argv))',
      task: "sys.argv には「python count.py あ い う え」と実行したつもりの中身が入っています。コマンドライン引数の数（スクリプト名はふくめない）を表示しよう。",
      starter: ARGV('"count.py", "あ", "い", "う", "え"') + "# ここに書こう\n",
      solution: ARGV('"count.py", "あ", "い", "う", "え"') + "print(len(sys.argv) - 1)",
      wrong: ARGV('"count.py", "あ", "い", "う", "え"') + "print(len(sys.argv))",
      expect: "4",
      mustInclude: ["sys.argv"],
      hints: ["len(sys.argv) は 5 です。0番目のスクリプト名の分を引きます。", "print(len(sys.argv) - 1) です。"],
      xp: 20,
    },
    {
      id: "cmd-argprod",
      title: "練習: 引数の数をかけ算する",
      intro: [
        "コマンドライン引数は、数のように見えても、すべて文字列で渡されます。計算に使うときは int() で整数に変えます。",
        "sys.argv[1:] とスライスすると、スクリプト名をのぞいた引数だけのリストになります。",
      ],
      example: 'v = "100"\nprint(v + v)\nprint(int(v) + int(v))',
      task: "sys.argv には「python mul.py 2 3 7」と実行したつもりの中身が入っています。コマンドライン引数をすべて整数にしてかけ合わせた結果を表示しよう（引数がいくつあっても動くようにします）。",
      starter: ARGV('"mul.py", "2", "3", "7"') + "# ここに書こう\n",
      solution: ARGV('"mul.py", "2", "3", "7"') + "p = 1\nfor v in sys.argv[1:]:\n    p *= int(v)\nprint(p)",
      wrong: ARGV('"mul.py", "2", "3", "7"') + 'p = ""\nfor v in sys.argv[1:]:\n    p += v\nprint(p)',
      expect: "42",
      mustInclude: ["sys.argv"],
      hints: ["かけ算の結果を入れる変数は 1 から始めます（0 から始めると、何をかけても 0 です）。", "for v in sys.argv[1:]: の中で p *= int(v) とし、最後に print(p) です。"],
      xp: 25,
    },
    {
      id: "cmd-main",
      title: "if __name__ == \"__main__\":",
      intro: [
        "スクリプトとして直接実行されたとき、そのファイルの中の __name__ は \"__main__\" になります。import されたときは、モジュール名（ファイル名から .py を取ったもの）になります。",
        "if __name__ == \"__main__\": の中に書いた処理は、直接実行したときだけ動き、import したときには動きません。",
      ],
      example: 'import runpy\n\nwith open("who_cmd.py", "w", encoding="utf-8") as f:\n    f.write("print(__name__)\\n")\n\nrunpy.run_path("who_cmd.py", run_name="__main__")',
      task: "tool_cmd.py の中身（source の中）の最後に、直接実行したときだけ「1つ目のコマンドライン引数を整数にして twice に渡した結果」を表示する部分を書き足そう。import したときは何も表示されないようにします。",
      starter: TOOL("\n# ここに、直接実行したときだけ動く部分を書こう"),
      solution: TOOL('\nif __name__ == "__main__":\n    print(twice(int(sys.argv[1])))'),
      wrong: TOOL("\nprint(twice(int(sys.argv[1])))"),
      expect: "import した: 10\n42",
      mustInclude: ["__name__"],
      hints: ["source の中に if __name__ == \"__main__\": と書き、その下を字下げします。", "字下げした中身は print(twice(int(sys.argv[1]))) です。"],
      xp: 30,
    },
    {
      id: "cmd-coding",
      title: "文字コード宣言",
      intro: [
        "Python のソースファイルは UTF-8 で書くのが基本です。Shift_JIS で保存したファイルを実行するときは、ファイルの先頭に # -*- coding: shift_jis -*- という文字コード宣言を書きます。ないとエラーで止まります。",
      ],
      example: 'line = "# -*- coding: shift_jis -*-"\nprint(line)',
      task: "このコードは、スクリプト sjis_cmd.py を Shift_JIS で保存して実行するので、今はエラーになります。source の先頭に文字コード宣言の行を書き足して、正しく実行されるようにしよう。",
      starter: SJIS(""),
      solution: SJIS("# -*- coding: shift_jis -*-\n"),
      wrong: SJIS("# -*- coding: utf-8 -*-\n"),
      expect: "こんにちは、Shift_JIS",
      mustInclude: ["coding"],
      hints: ["source = \"\"\" のすぐうしろ（1行目）に宣言を書きます。", "1行目を # -*- coding: shift_jis -*- にして、改行してから print の行が続くようにします。"],
      xp: 25,
    },
    {
      id: "cmd-shebang",
      title: "shebang（シバン）",
      intro: [
        "macOS や Linux では、スクリプトの1行目に #!/usr/bin/env python3 と書いておくと、そのファイルを実行するコマンドを指定できます。これを shebang（シバン）といいます。",
        "文字コード宣言もあるときは、1行目に shebang、2行目に文字コード宣言を書きます。",
      ],
      example: 'print("#!/usr/bin/env python3")',
      task: "Shift_JIS で保存するスクリプト bang_cmd.py の source の先頭に、1行目に shebang（#!/usr/bin/env python3）、2行目に文字コード宣言を書き足して、正しく実行されるようにしよう。エラーなく実行でき、ファイルの1行目が shebang になっていれば正解です。",
      starter: SHEBANG(""),
      solution: SHEBANG("#!/usr/bin/env python3\n# -*- coding: shift_jis -*-\n"),
      wrong: SHEBANG("#!/usr/bin/env python3\n"),
      expect: "#!/usr/bin/env python3",
      test: 'with open("bang_cmd.py", "r", encoding="shift_jis") as g:\n    print(g.readline().rstrip("\\n"))',
      mustInclude: ["#!/usr/bin/env python3", "coding"],
      hints: ["source = \"\"\" のすぐうしろに #!/usr/bin/env python3 を書いて改行し、次の行に # -*- coding: shift_jis -*- を書きます。", "shebang は必ず1行目です。文字コード宣言を先に書くと、shebang として働きません。"],
      xp: 25,
    },
  ],
  reads: [
    {
      id: "rcmd-argv",
      title: "sys.argv の中身",
      intro: "「python greet.py 山田 太郎」と実行したつもりで、sys.argv を作っています。",
      code: 'import sys\nsys.argv = ["greet.py", "山田", "太郎"]\nprint(sys.argv[1])\nprint(sys.argv[1:])',
      choices: ["greet.py\n['山田', '太郎']", "山田\n['山田', '太郎']", "山田\n['greet.py', '山田']"],
      answer: 1,
      explain:
        "sys.argv の0番目はスクリプト名の greet.py で、コマンドライン引数は1番目から並びます。だから sys.argv[1] は 山田 です。sys.argv[1:] は1番目から最後までのスライスなので、引数だけの ['山田', '太郎'] になります。greet.py を選んだ人は、リストの番号が 0 から始まることと、0番目にスクリプト名が入ることを思い出しましょう。",
      xp: 15,
    },
    {
      id: "rcmd-str",
      title: "引数は文字列",
      intro: "「python add.py 100 200」と実行したつもりです。+ は何をするでしょう。",
      code: 'import sys\nsys.argv = ["add.py", "100", "200"]\nprint(sys.argv[1] + sys.argv[2])\nprint(int(sys.argv[1]) + int(sys.argv[2]))',
      choices: ["300\n300", "100200\n100200", "100200\n300"],
      answer: 2,
      explain:
        "コマンドライン引数は、数に見えても文字列の \"100\" と \"200\" として渡されます。文字列どうしの + はつなげる計算なので、1行目は 100200 です。int() で整数に変えてから足すと、2行目はふつうの足し算で 300 になります。数として使う引数は、必ず int() や float() で変換しましょう。",
      xp: 15,
    },
    {
      id: "rcmd-main",
      title: "import したときの __name__",
      intro: "同じファイルを、import した場合と、スクリプトとして実行した場合で比べます。",
      code: 'import importlib, runpy, sys\n\nwith open("mod_cmd.py", "w", encoding="utf-8") as f:\n    f.write("print(\\"名前は\\", __name__)\\n")\nimportlib.invalidate_caches()\nsys.modules.pop("mod_cmd", None)\n\nimport mod_cmd\nrunpy.run_path("mod_cmd.py", run_name="__main__")',
      choices: ["名前は mod_cmd\n名前は __main__", "名前は __main__\n名前は __main__", "名前は mod_cmd.py\n名前は __main__"],
      answer: 0,
      explain:
        "import mod_cmd で読み込んだときの __name__ は、モジュール名の mod_cmd です（.py は付きません）。runpy.run_path(..., run_name=\"__main__\") は「python mod_cmd.py」と直接実行したのと同じなので、__name__ は __main__ になります。この違いを if __name__ == \"__main__\": で調べると、直接実行したときだけ動く部分を作れます。",
      xp: 15,
    },
    {
      id: "rcmd-cd",
      title: "cd すると相対パスが変わる",
      intro: "os.chdir は、ターミナルの cd と同じく、今いるディレクトリを移動します。",
      code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("rcmd_dir", exist_ok=True)\nwith open("rcmd_dir/data.txt", "w", encoding="utf-8") as f:\n    f.write("中身")\nprint(os.path.exists("data.txt"))\nos.chdir("rcmd_dir")\nprint(os.path.exists("data.txt"))\nos.chdir("..")',
      choices: ["False\nTrue", "True\nTrue", "False\nFalse"],
      answer: 0,
      explain:
        "data.txt は rcmd_dir の中にあるので、最初の場所（/home/pyodide）からファイル名だけで探すと見つからず False です。os.chdir(\"rcmd_dir\") で中に移動すると、ファイル名だけで見つかるようになり True になります。スクリプトがデータファイルを名前だけで開いているときは、そのファイルがあるディレクトリに cd してから実行する必要があるのは、このためです。",
      xp: 15,
    },
  ],
  explain: {},
  topics: [],
  refSections: 14,
  refProse: 4145,
};
