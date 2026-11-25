import type { Chapter } from "./types.ts";

// 付録：Pythonスクリプトとコマンドライン実行。ブラウザではコマンドラインが使えないので、
// runpy.run_path(ファイル, run_name="__main__") で「python ファイル」と実行したのと同じ動きをまねし、sys.argv は自分で用意する。
const HELLO = (body: string) =>
  `import runpy\n\n# スクリプト hello_cmd.py の中身\nsource = """${body}\n"""\nwith open("hello_cmd.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n# 「python hello_cmd.py」と実行したのと同じ\nrunpy.run_path("hello_cmd.py", run_name="__main__")\n`;

const WHERE_HEAD =
  'import os, runpy\n\nos.chdir("/home/pyodide")  # 決まった場所から始める\nos.makedirs("proj_cmd", exist_ok=True)\nsource = """import os\nprint("ここで動いています:", os.getcwd())\n"""\nwith open("proj_cmd/where.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\n';

const ARGS_HEAD =
  'import runpy, sys\n\nwith open("echo_args.py", "w", encoding="utf-8") as f:\n    f.write("import sys\\nprint(sys.argv)\\n")\n\n';

const ARGC_HEAD =
  'import runpy, sys\n\nwith open("argcount.py", "w", encoding="utf-8") as f:\n    f.write("import sys\\nprint(len(sys.argv) - 1)\\n")\n\n';

const ARGV = (list: string) => `import sys\n\nsys.argv = [${list}]  # コマンドラインで実行したつもりの中身\n\n`;

const TOOL = (body: string) =>
  `import importlib, runpy, sys\n\nsource = """import sys\n\ndef twice(n):\n    return n * 2\n${body}\n"""\nwith open("tool_cmd.py", "w", encoding="utf-8") as f:\n    f.write(source)\nimportlib.invalidate_caches()\nsys.modules.pop("tool_cmd", None)\n\nimport tool_cmd  # モジュールとして読み込む\nprint("import した:", tool_cmd.twice(5))\n\nsys.argv = ["tool_cmd.py", "21"]  # python tool_cmd.py 21 と実行したつもり\nrunpy.run_path("tool_cmd.py", run_name="__main__")\n`;

const SJIS = (head: string) =>
  `import runpy\n\nsource = """${head}print("こんにちは、Shift_JIS")\n"""\nwith open("sjis_cmd.py", "w", encoding="shift_jis") as f:\n    f.write(source)\n\nrunpy.run_path("sjis_cmd.py", run_name="__main__")\n`;

const SHEBANG = (head: string) =>
  `import runpy\n\nsource = """${head}print("はじめの2行は、どちらもコメントあつかい")\n"""\nwith open("bang_cmd.py", "w", encoding="shift_jis") as f:\n    f.write(source)\n\nrunpy.run_path("bang_cmd.py", run_name="__main__")\n`;

const SCRIPT = (name: string, body: string, runs: string[]) =>
  `import runpy, sys\n\nsource = """import sys\n\n${body}\n"""\nwith open("${name}", "w", encoding="utf-8") as f:\n    f.write(source)\n` +
  runs.map((r) => `\nsys.argv = [${r}]  # python ${name} ... と実行したつもり\nrunpy.run_path("${name}", run_name="__main__")`).join("") +
  "\n";

export const chapter: Chapter = {
  ref: "A-command",
  title: "付録：Pythonスクリプトとコマンドライン実行",
  url: "https://utokyo-ipp.github.io/appendix/5-command.html",
  stage: "write",
  order: ["cmd-script", "cmd-cd", "cmd-argv", "cmd-argv-try", "cmd-coding", "cmd-shebang", "cmd-main", "cmd-arg-last", "cmd-arg0", "cmd-argc", "cmd-argprod"],
  lessons: [
    {
      id: "cmd-script",
      title: "スクリプトを実行する",
      intro: [
        ".py ファイルは、それだけで実行できるプログラムです。直接実行するために書いた .py ファイルを、Python スクリプトといいます。ふつうは、ターミナル（コマンドを打ちこむ画面）で python ファイル名 と打って実行します。",
        "runpy.run_path(ファイル名, run_name=\"__main__\") で、Python の中から同じように実行できます。",
      ],
      example: 'import runpy\n\nwith open("hi_cmd.py", "w", encoding="utf-8") as f:\n    f.write("print(\\"スクリプトが動きました\\")\\n")\n\nrunpy.run_path("hi_cmd.py", run_name="__main__")',
      task: "スクリプト hello_cmd.py の中身（source の中）に、for 文と range を使って、1 から 3 までの整数を1行に1つずつ表示するコードを書こう。最後の行で、このスクリプトが実行されます。",
      starter: HELLO("# ここに、このスクリプトの中身を書こう"),
      solution: HELLO("for i in range(1, 4):\n    print(i)"),
      wrong: HELLO("for i in range(3):\n    print(i)"),
      expect: "1\n2\n3",
      mustInclude: ["for"],
      hints: ["source の \"\"\" と \"\"\" の間が、スクリプトのファイルの中身になります。", "for i in range(1, 4): の次の行を字下げして print(i) と書きます。"],
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
        "python echo_args.py ねこ いぬ のように、スクリプト名のうしろに空白で区切って文字を書くと、それがスクリプトに渡されます。これをコマンドライン引数といいます。",
        "スクリプトの中では、sys.argv というリストで受け取れます。0番目はスクリプト名で、そのうしろに引数が順に並びます。",
      ],
      example: 'import sys\nsys.argv = ["show.py", "A"]\nprint(sys.argv)',
      task: "echo_args.py は sys.argv をそのまま表示するスクリプトです。「python echo_args.py ねこ いぬ」と実行したつもりで、sys.argv にリストを入れてから、runpy.run_path(\"echo_args.py\", run_name=\"__main__\") で実行しよう。",
      starter: ARGS_HEAD + "# ここに書こう\n",
      solution: ARGS_HEAD + 'sys.argv = ["echo_args.py", "ねこ", "いぬ"]\nrunpy.run_path("echo_args.py", run_name="__main__")',
      wrong: ARGS_HEAD + 'sys.argv = ["ねこ", "いぬ"]\nrunpy.run_path("echo_args.py", run_name="__main__")',
      expect: "['echo_args.py', 'ねこ', 'いぬ']",
      mustInclude: ["sys.argv", "run_path"],
      hints: ["sys.argv の0番目にはスクリプト名 \"echo_args.py\" が入ります。", "sys.argv = [\"echo_args.py\", \"ねこ\", \"いぬ\"] のあとに runpy.run_path(\"echo_args.py\", run_name=\"__main__\") です。"],
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
      title: "練習: 引数がなければ知らせ、あれば合計する",
      intro: ["if __name__ == \"__main__\": の中で sys.argv を調べ、引数の数で表示を変えます。"],
      example: 'import sys\nsys.argv = ["a.py"]\nif len(sys.argv) == 1:\n    print("なし")',
      task: "source の中（スクリプト total_cmd.py の中身）に、if __name__ == \"__main__\": の中で、コマンドライン引数が1つもなければ 引数がありません という文を表示し、あれば引数を全部整数にして足した合計を表示する処理を書こう。下の行で、引数なしと「python total_cmd.py 4 10 6」の2通りで実行されます。",
      starter: SCRIPT("total_cmd.py", "# ここに書こう", ['"total_cmd.py"', '"total_cmd.py", "4", "10", "6"']),
      solution: SCRIPT(
        "total_cmd.py",
        'if __name__ == "__main__":\n    if len(sys.argv) == 1:\n        print("引数がありません")\n    else:\n        s = 0\n        for v in sys.argv[1:]:\n            s += int(v)\n        print(s)',
        ['"total_cmd.py"', '"total_cmd.py", "4", "10", "6"'],
      ),
      wrong: SCRIPT(
        "total_cmd.py",
        'if __name__ == "__main__":\n    if len(sys.argv) == 1:\n        print("引数がありません")\n    else:\n        s = ""\n        for v in sys.argv[1:]:\n            s += v\n        print(s)',
        ['"total_cmd.py"', '"total_cmd.py", "4", "10", "6"'],
      ),
      expect: "引数がありません\n20",
      mustInclude: ["__name__", "int("],
      hints: ["引数がないとき、sys.argv はスクリプト名だけなので len(sys.argv) == 1 です。", "あるときは s = 0 から始めて、for v in sys.argv[1:]: の中で s += int(v) とし、最後に print(s) です。"],
      xp: 30,
    },
    {
      id: "cmd-arg0",
      title: "練習: 引数の数がちがうときは使い方を表示する",
      intro: ["sys.argv[0] のスクリプト名を使って、使い方の説明を表示します。"],
      example: 'import sys\nsys.argv = ["show.py"]\nprint("使い方: python " + sys.argv[0])',
      task: "source の中（スクリプト pow_cmd.py の中身）に、if __name__ == \"__main__\": の中で、コマンドライン引数がちょうど2つなら、1つめを2つめの数で累乗した数（どちらも整数にして **）を表示し、そうでなければ sys.argv[0] を使って 使い方: python pow_cmd.py 数 数 という文を表示する処理を書こう。下の行で「python pow_cmd.py 2」と「python pow_cmd.py 2 5」の2通りで実行されます。",
      starter: SCRIPT("pow_cmd.py", "# ここに書こう", ['"pow_cmd.py", "2"', '"pow_cmd.py", "2", "5"']),
      solution: SCRIPT(
        "pow_cmd.py",
        'if __name__ == "__main__":\n    if len(sys.argv) - 1 == 2:\n        print(int(sys.argv[1]) ** int(sys.argv[2]))\n    else:\n        print("使い方: python " + sys.argv[0] + " 数 数")',
        ['"pow_cmd.py", "2"', '"pow_cmd.py", "2", "5"'],
      ),
      wrong: SCRIPT(
        "pow_cmd.py",
        'if __name__ == "__main__":\n    if len(sys.argv) == 2:\n        print(int(sys.argv[1]) ** int(sys.argv[2]))\n    else:\n        print("使い方: python " + sys.argv[0] + " 数 数")',
        ['"pow_cmd.py", "2"', '"pow_cmd.py", "2", "5"'],
      ),
      expect: "使い方: python pow_cmd.py 数 数\n32",
      mustInclude: ["__name__", "sys.argv[0]"],
      hints: ["引数だけの数は len(sys.argv) - 1 です。それが 2 かどうかで分けます。", "2つのときは print(int(sys.argv[1]) ** int(sys.argv[2]))、ちがうときは print(\"使い方: python \" + sys.argv[0] + \" 数 数\") です。"],
      xp: 30,
    },
    {
      id: "cmd-argc",
      title: "練習: いちばん大きい引数を表示する",
      intro: ["引数は文字列なので、大きさをくらべる前に整数にします。"],
      example: 'print(max(["8", "30"]), max([8, 30]))',
      task: "source の中（スクリプト max_cmd.py の中身）に、if __name__ == \"__main__\": の中で、コマンドライン引数を全部整数にしたリストを作り、その中でいちばん大きい数を max で表示する処理を書こう。下の行で「python max_cmd.py 8 30 12」と「python max_cmd.py 5」の2通りで実行されます。",
      starter: SCRIPT("max_cmd.py", "# ここに書こう", ['"max_cmd.py", "8", "30", "12"', '"max_cmd.py", "5"']),
      solution: SCRIPT(
        "max_cmd.py",
        'if __name__ == "__main__":\n    nums = []\n    for v in sys.argv[1:]:\n        nums.append(int(v))\n    print(max(nums))',
        ['"max_cmd.py", "8", "30", "12"', '"max_cmd.py", "5"'],
      ),
      wrong: SCRIPT("max_cmd.py", 'if __name__ == "__main__":\n    print(max(sys.argv[1:]))', ['"max_cmd.py", "8", "30", "12"', '"max_cmd.py", "5"']),
      expect: "30\n5",
      mustInclude: ["__name__", "int(", "max("],
      hints: ["文字列のままくらべると、\"8\" のほうが \"30\" より大きいことになってしまいます（1文字目の 8 と 3 をくらべるため）。", "nums = [] を作り、for v in sys.argv[1:]: の中で nums.append(int(v))、最後に print(max(nums)) です。"],
      xp: 30,
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
      intro: "「python dbl.py 21」と実行したつもりです。文字列のまま * 2 をしたときと、int にしてから * 2 をしたときを比べよう。",
      code: 'import sys\nsys.argv = ["dbl.py", "21"]\na = sys.argv[1]\nprint(a * 2, int(a) * 2)',
      choices: ["42 42", "2121 42", "2121 2121"],
      answer: 1,
      explain:
        "コマンドライン引数は、数に見えても文字列の \"21\" として渡されます。文字列に * 2 をすると、同じ文字列を2回つなげるので 2121 です。int(a) で整数の 21 にしてから * 2 をすると、ふつうのかけ算で 42 になります。42 42 を選んだ人は、引数がはじめから数だと考えています。",
      xp: 15,
    },
    {
      id: "rcmd-main",
      title: "if __name__ がある .py ファイル",
      intro: "if __name__ == \"__main__\": の中は、直接実行したときだけ動きます。import したときに何が表示されるかに注目しよう。",
      code: 'import importlib, runpy, sys\n\nsource = """print("いつも表示")\n\nif __name__ == "__main__":\n    print("直接実行のときだけ")\n"""\nwith open("guard_cmd.py", "w", encoding="utf-8") as f:\n    f.write(source)\nimportlib.invalidate_caches()\nsys.modules.pop("guard_cmd", None)\n\nimport guard_cmd\nprint("---")\nrunpy.run_path("guard_cmd.py", run_name="__main__")',
      choices: ["いつも表示\n直接実行のときだけ\n---\nいつも表示\n直接実行のときだけ", "---\nいつも表示\n直接実行のときだけ", "いつも表示\n---\nいつも表示\n直接実行のときだけ"],
      answer: 2,
      explain:
        "import guard_cmd したときの __name__ は guard_cmd なので、if の外の いつも表示 だけが出て、if の中は動きません。そのあと --- が出ます。runpy.run_path(…, run_name=\"__main__\") は直接実行と同じなので、__name__ は __main__ になり、いつも表示 と 直接実行のときだけ の両方が出ます。1つめを選んだ人は、import したときも if の中が動くと考えています。2つめは、if の外の行まで import で動かないと考えています。",
      xp: 20,
    },
    {
      id: "rcmd-name",
      title: "import された側の __name__",
      intro: "直接実行した main_cmd.py の中で、part_cmd.py を import しています。それぞれのファイルの __name__ に注目しよう。",
      code: 'import importlib, runpy, sys\n\nwith open("part_cmd.py", "w", encoding="utf-8") as f:\n    f.write("print(\\"part:\\", __name__)\\n")\nwith open("main_cmd.py", "w", encoding="utf-8") as f:\n    f.write("import part_cmd\\nprint(\\"main:\\", __name__)\\n")\nimportlib.invalidate_caches()\nsys.modules.pop("part_cmd", None)\n\nrunpy.run_path("main_cmd.py", run_name="__main__")',
      choices: ["part: __main__\nmain: __main__", "part: part_cmd\nmain: __main__", "main: __main__\npart: part_cmd"],
      answer: 1,
      explain:
        "main_cmd.py の1行目で import part_cmd が動くので、先に part_cmd.py の中身が実行されます。part_cmd.py は import されたので __name__ はモジュール名の part_cmd です。そのあと main_cmd.py の2行目が動き、こちらは直接実行されたので __name__ は __main__ です。1つめを選んだ人は、直接実行したファイルから import したファイルも __main__ になると考えています。3つめは、import の行が先に動くことを見落としています。",
      xp: 20,
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
