import type { Chapter } from "./types.ts";

// ディレクトリと木構造。ブラウザの中の仮のファイル置き場で os を使う。作業ディレクトリを動かす問題は、最初に /home/pyodide へ戻してから始める。
export const chapter: Chapter = {
  ref: "4-3",
  title: "ディレクトリと木構造",
  url: "https://utokyo-ipp.github.io/4/4-3.html",
  stage: "write",
  order: ["l43-diagram", "l43-cwd", "l43-path", "l43-mkdir", "l43-makedirs", "l43-tree", "l43-lookup", "l43-ex-count"],
  lessons: [
    {
      id: "l43-diagram",
      title: "階層の図を組み立てる",
      intro: [],
      example: "",
      task: "school の中に、art というディレクトリと memo.txt というファイルがあり、art の中に draw.txt があります（school の中では art が先、memo.txt があと）。4行の print の順番だけを並べかえて、この階層を表す図にしよう。",
      starter: 'print("└── memo.txt")\nprint("school")\nprint("│   └── draw.txt")\nprint("├── art")\n',
      solution: 'print("school")\nprint("├── art")\nprint("│   └── draw.txt")\nprint("└── memo.txt")',
      wrong: 'print("school")\nprint("├── art")\nprint("└── memo.txt")\nprint("│   └── draw.txt")',
      expect: "school\n├── art\n│   └── draw.txt\n└── memo.txt",
      hints: ["いちばん外側の school が1行目です。", "art の中身の draw.txt は、art のすぐ下の行に来ます。memo.txt は school の中の最後なので、最後の行です。"],
      xp: 15,
    },
    {
      id: "l43-mkdir",
      title: "途中のディレクトリもまとめて作る",
      intro: [],
      example: "",
      task: "os.makedirs を1回だけ使って、mk43 の中の a の中に b というディレクトリを作ろう（exist_ok=True を付けます）。そのあと、os.path.exists で \"mk43/a/b\" と \"mk43/a\" があるかを、この順に表示しよう。",
      starter: 'import os, shutil\nos.chdir("/home/pyodide")\nshutil.rmtree("mk43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\n\n# ここに書こう\n',
      solution:
        'import os, shutil\nos.chdir("/home/pyodide")\nshutil.rmtree("mk43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\n\nos.makedirs("mk43/a/b", exist_ok=True)\nprint(os.path.exists("mk43/a/b"))\nprint(os.path.exists("mk43/a"))',
      wrong:
        'import os, shutil\nos.chdir("/home/pyodide")\nshutil.rmtree("mk43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\n\nos.makedirs("mk43/a", exist_ok=True)\nprint(os.path.exists("mk43/a/b"))\nprint(os.path.exists("mk43/a"))',
      expect: "True\nTrue",
      mustInclude: ["makedirs"],
      hints: ["作りたいいちばん奥までのパス \"mk43/a/b\" を os.makedirs に渡すと、途中の mk43 と a も作られます。", 'os.makedirs("mk43/a/b", exist_ok=True) のあとに、print(os.path.exists("mk43/a/b")) と print(os.path.exists("mk43/a")) です。'],
      xp: 20,
    },
    {
      id: "l43-makedirs",
      title: "ディレクトリを作って中を見る",
      intro: [
        "ファイルを入れておく場所をディレクトリ（フォルダ）といいます。os.makedirs(\"a/b\", exist_ok=True) は、a の中に b というディレクトリを、途中の a もまとめて作ります。",
        "os.listdir(ディレクトリ) は、その中にあるファイルやディレクトリの名前をリストで返します。並び順は決まっていないので、sorted() で並べてから表示します。",
      ],
      example: 'import os\nos.makedirs("ex43/docs", exist_ok=True)\nwith open("ex43/docs/a.txt", "w", encoding="utf-8") as f:\n    f.write("")\nprint(sorted(os.listdir("ex43/docs")))',
      task: "zoo43 の中に animals というディレクトリを作り、その中に中身が空のファイル lion.txt と cat.txt を作ろう。最後に、animals の中の名前を sorted(os.listdir(\"zoo43/animals\")) で表示しよう。",
      starter:
        'import os, shutil\nshutil.rmtree("zoo43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\n\n# ここに書こう\n',
      solution:
        'import os, shutil\nshutil.rmtree("zoo43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\n\nos.makedirs("zoo43/animals", exist_ok=True)\nfor name in ["lion.txt", "cat.txt"]:\n    with open("zoo43/animals/" + name, "w", encoding="utf-8") as f:\n        f.write("")\nprint(sorted(os.listdir("zoo43/animals")))',
      wrong:
        'import os, shutil\nshutil.rmtree("zoo43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\n\nos.makedirs("zoo43/animals", exist_ok=True)\nfor name in ["lion.txt", "cat.txt"]:\n    with open("zoo43/" + name, "w", encoding="utf-8") as f:\n        f.write("")\nprint(sorted(os.listdir("zoo43/animals")))',
      expect: "['cat.txt', 'lion.txt']",
      mustInclude: ["listdir"],
      hints: [
        "os.makedirs(\"zoo43/animals\", exist_ok=True) でディレクトリを作ります。ファイルは open(\"zoo43/animals/lion.txt\", \"w\", encoding=\"utf-8\") で作れます。",
        "ファイルの名前の前に \"zoo43/animals/\" を付けないと、animals の中ではなく、今いる場所に作られてしまいます。",
      ],
      xp: 25,
    },
    {
      id: "l43-cwd",
      title: "作業ディレクトリを移動する",
      intro: [
        "プログラムが今いるディレクトリを、カレントディレクトリ（作業ディレクトリ）といいます。os.getcwd() で、その場所を文字列で調べられます。",
        "os.chdir(行き先) で、カレントディレクトリを移動できます。\"..\" は「1つ上のディレクトリ」を表します。",
      ],
      example: 'import os\nos.chdir("/home/pyodide")\nprint(os.getcwd())',
      task: "今のカレントディレクトリを表示したあと、os.chdir で work43 の中の inner に移動して表示し、.. を使って2段上の元の場所に戻ってもう一度表示しよう（全部で3行）。",
      starter:
        'import os\nos.chdir("/home/pyodide")  # 最初の場所 /home/pyodide に戻しておく\nos.makedirs("work43/inner", exist_ok=True)\n\n# ここに書こう\n',
      solution:
        'import os\nos.chdir("/home/pyodide")  # 最初の場所 /home/pyodide に戻しておく\nos.makedirs("work43/inner", exist_ok=True)\n\nprint(os.getcwd())\nos.chdir("work43/inner")\nprint(os.getcwd())\nos.chdir("../..")\nprint(os.getcwd())',
      wrong:
        'import os\nos.chdir("/home/pyodide")  # 最初の場所 /home/pyodide に戻しておく\nos.makedirs("work43/inner", exist_ok=True)\n\nprint(os.getcwd())\nos.chdir("work43/inner")\nprint(os.getcwd())\nos.chdir("..")\nprint(os.getcwd())',
      expect: "/home/pyodide\n/home/pyodide/work43/inner\n/home/pyodide",
      mustInclude: ["getcwd", ".."],
      hints: ["print(os.getcwd()) で今の場所を表示します。os.chdir(\"work43/inner\") で2段下へ移動します。", "最後は os.chdir(\"../..\") で2段上に戻ってから print(os.getcwd()) です。"],
      xp: 25,
    },
    {
      id: "l43-path",
      title: "パスで場所を指定する",
      intro: [
        "ファイルの場所を表す文字列をパスといいます。\"box43/sub/inner.txt\" のように、ディレクトリの名前を / でつないで、1段ずつ下へ進みます。",
        ".. は1つ上のディレクトリ、. は今のディレクトリを表します。\"box43/sub/../top.txt\" は、box43/sub から1段上がった box43 の中の top.txt です。",
      ],
      example: 'import os\nos.makedirs("ex43p/docs", exist_ok=True)\nwith open("ex43p/note.txt", "w", encoding="utf-8") as f:\n    f.write("メモ")\nwith open("ex43p/docs/../note.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
      task: "box43/sub/inner.txt を開いて中身を表示しよう。続けて、.. を使ったパス \"box43/sub/../top.txt\" で top.txt を開き、中身を表示しよう。",
      starter:
        'import os\nos.makedirs("box43/sub", exist_ok=True)\nwith open("box43/top.txt", "w", encoding="utf-8") as f:\n    f.write("いちばん上")\nwith open("box43/sub/inner.txt", "w", encoding="utf-8") as f:\n    f.write("下の段")\n\n# ここに書こう\n',
      solution:
        'import os\nos.makedirs("box43/sub", exist_ok=True)\nwith open("box43/top.txt", "w", encoding="utf-8") as f:\n    f.write("いちばん上")\nwith open("box43/sub/inner.txt", "w", encoding="utf-8") as f:\n    f.write("下の段")\n\nwith open("box43/sub/inner.txt", "r", encoding="utf-8") as f:\n    print(f.read())\nwith open("box43/sub/../top.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
      wrong:
        'import os\nos.makedirs("box43/sub", exist_ok=True)\nwith open("box43/top.txt", "w", encoding="utf-8") as f:\n    f.write("いちばん上")\nwith open("box43/sub/inner.txt", "w", encoding="utf-8") as f:\n    f.write("下の段")\n\nwith open("box43/sub/inner.txt", "r", encoding="utf-8") as f:\n    print(f.read())\nwith open("box43/sub/../sub/inner.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
      expect: "下の段\nいちばん上",
      mustInclude: [".."],
      hints: ["open(\"box43/sub/inner.txt\", \"r\", encoding=\"utf-8\") で1つめのファイルが開けます。", "2つめは open(\"box43/sub/../top.txt\", \"r\", encoding=\"utf-8\") です。sub から .. で box43 に戻ります。"],
      xp: 25,
    },
    {
      id: "l43-tree",
      title: "木構造: 親・子・兄弟",
      intro: [
        "ディレクトリの中にディレクトリが入る形は、木を逆さにしたような枝分かれになるので、木構造と呼びます。辞書の中に辞書を入れると、同じ形を Python で表せます。",
        "あるものを中に入れているほうを親、入っているほうを子、同じ親を持つもの同士を兄弟といいます。",
      ],
      example: 'tree = {"家": {"台所": {}, "寝室": {}}}\nfor name in tree["家"]:\n    print(name)',
      task: "tree は、辞書をディレクトリ、文字列をファイルとして表した木です。「台所」の兄弟（「家」の子のうち、「台所」以外のもの）の名前を、辞書に入っている順に1行ずつ表示しよう。",
      starter:
        'tree = {\n    "家": {\n        "台所": {"なべ.txt": "なべの説明", "皿.txt": "皿の説明"},\n        "寝室": {"まくら.txt": "まくらの説明"},\n        "メモ.txt": "買い物リスト",\n    }\n}\n\n# ここに書こう\n',
      solution:
        'tree = {\n    "家": {\n        "台所": {"なべ.txt": "なべの説明", "皿.txt": "皿の説明"},\n        "寝室": {"まくら.txt": "まくらの説明"},\n        "メモ.txt": "買い物リスト",\n    }\n}\n\nfor name in tree["家"]:\n    if name != "台所":\n        print(name)',
      wrong:
        'tree = {\n    "家": {\n        "台所": {"なべ.txt": "なべの説明", "皿.txt": "皿の説明"},\n        "寝室": {"まくら.txt": "まくらの説明"},\n        "メモ.txt": "買い物リスト",\n    }\n}\n\nfor name in tree["家"]["台所"]:\n    print(name)',
      expect: "寝室\nメモ.txt",
      mustInclude: ["tree["],
      hints: ["「台所」の親は「家」です。tree[\"家\"] が、家の子をまとめた辞書になっています。", "for name in tree[\"家\"]: で子の名前を順に取り出し、if name != \"台所\": のときだけ表示します。"],
      xp: 25,
    },
    {
      id: "l43-lookup",
      title: "パスで入れ子の辞書をたどる",
      intro: [
        "入れ子の辞書では、tree[\"photo\"][\"2025\"] のように [ ] を重ねて、1段ずつ下へたどります。これはパス photo/2025 をたどるのと同じことです。",
        "パスの文字列を split(\"/\") で区切れば、たどる名前のリストが作れます。",
      ],
      example: 'tree = {"a": {"b": "中身"}}\nnode = tree\nfor part in "a/b".split("/"):\n    node = node[part]\nprint(node)',
      task: "パスの文字列 path を / で区切り、辞書 tree を先頭から順にたどって、行き着いた中身を返す関数 lookup(tree, path) を作ろう。",
      starter: "def lookup(tree, path):\n    pass\n",
      solution: 'def lookup(tree, path):\n    node = tree\n    for part in path.split("/"):\n        node = node[part]\n    return node',
      wrong: 'def lookup(tree, path):\n    node = tree\n    for part in path.split("/"):\n        node = tree[part]\n    return node',
      expect: "山の写真\n買い物メモ\n{'umi.jpg': '海の写真', 'yama.jpg': '山の写真'}",
      test:
        't = {"photo": {"2025": {"umi.jpg": "海の写真", "yama.jpg": "山の写真"}}, "memo.txt": "買い物メモ"}\nprint(lookup(t, "photo/2025/yama.jpg"))\nprint(lookup(t, "memo.txt"))\nprint(lookup(t, "photo/2025"))',
      mustInclude: ["return"],
      hints: ["node = tree から始めて、for part in path.split(\"/\"): のたびに node = node[part] で1段下へ進みます。", "くり返しが終わったときの node を return します。"],
      xp: 30,
    },
    {
      id: "l43-ex-count",
      title: "演習: ディレクトリの中のファイルを数える",
      intro: [],
      example: "",
      task: "ディレクトリのパス path を受け取り、その中にじかに入っているファイルの数（ディレクトリは数えない）を返す関数 count_files(path) を作ろう。os.listdir(path) で名前を取り出し、path + \"/\" + 名前 がディレクトリかどうかを os.path.isdir で調べます。",
      starter:
        'import os, shutil\nshutil.rmtree("lib43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\nos.makedirs("lib43/novel", exist_ok=True)\nos.makedirs("lib43/comic", exist_ok=True)\nfor name in ["lib43/memo.txt", "lib43/list.txt", "lib43/novel/a.txt"]:\n    with open(name, "w", encoding="utf-8") as f:\n        f.write("")\n\ndef count_files(path):\n    pass\n',
      solution:
        'import os, shutil\nshutil.rmtree("lib43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\nos.makedirs("lib43/novel", exist_ok=True)\nos.makedirs("lib43/comic", exist_ok=True)\nfor name in ["lib43/memo.txt", "lib43/list.txt", "lib43/novel/a.txt"]:\n    with open(name, "w", encoding="utf-8") as f:\n        f.write("")\n\ndef count_files(path):\n    n = 0\n    for name in os.listdir(path):\n        if not os.path.isdir(path + "/" + name):\n            n = n + 1\n    return n',
      wrong:
        'import os, shutil\nshutil.rmtree("lib43", ignore_errors=True)  # 前の実行で作ったものを消して、毎回作り直す\nos.makedirs("lib43/novel", exist_ok=True)\nos.makedirs("lib43/comic", exist_ok=True)\nfor name in ["lib43/memo.txt", "lib43/list.txt", "lib43/novel/a.txt"]:\n    with open(name, "w", encoding="utf-8") as f:\n        f.write("")\n\ndef count_files(path):\n    return len(os.listdir(path))',
      expect: "2\n1\n0",
      test: 'print(count_files("lib43"))\nprint(count_files("lib43/novel"))\nprint(count_files("lib43/comic"))',
      mustInclude: ["listdir", "return"],
      hints: [
        "n = 0 から始め、for name in os.listdir(path): で名前を1つずつ調べます。",
        "if not os.path.isdir(path + \"/\" + name): のときだけ n = n + 1 して、最後に return n です。",
      ],
      xp: 30,
    },
  ],
  reads: [
    {
      id: "r43-abs",
      title: "絶対パスと相対パス",
      intro: "",
      code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("r43abs", exist_ok=True)\nwith open("r43abs/note.txt", "w", encoding="utf-8") as f:\n    f.write("ここにある")\nos.chdir("r43abs")\nprint(os.path.exists("/home/pyodide/r43abs/note.txt"))\nprint(os.path.exists("r43abs/note.txt"))\nos.chdir("/home/pyodide")',
      choices: ["True\nTrue", "True\nFalse", "False\nTrue"],
      answer: 1,
      explain:
        "/ から始まる \"/home/pyodide/r43abs/note.txt\" は絶対パスなので、カレントディレクトリがどこでも同じ場所を指し、ファイルが見つかって True です。\"r43abs/note.txt\" は相対パスなので、今いる r43abs の中から探します。r43abs の中に、さらに r43abs というディレクトリはないので False です。相対パスは、カレントディレクトリが変わると指す場所も変わります。",
      xp: 15,
    },
    {
      id: "r43-where",
      title: "ファイルはどこにある？",
      intro: "os.path.exists(パス) は、そのパスにファイルやディレクトリがあれば True を返します。",
      code: 'import os\nos.makedirs("r43dir", exist_ok=True)\nwith open("r43dir/r43only.txt", "w", encoding="utf-8") as f:\n    f.write("ここ")\nprint(os.path.exists("r43dir/r43only.txt"))\nprint(os.path.exists("r43only.txt"))',
      choices: ["True\nTrue", "False\nTrue", "True\nFalse"],
      answer: 2,
      explain:
        "ファイルは r43dir の中に作ったので、\"r43dir/r43only.txt\" なら見つかります。ファイル名だけの \"r43only.txt\" は、今いるディレクトリ（カレントディレクトリ）の中を探すので、そこにはなく False です。ファイル名だけで開けるのは、カレントディレクトリにあるファイルだけです。そうでない場所のファイルを開こうとすると FileNotFoundError になります。",
      xp: 15,
    },
    {
      id: "r43-dotdot",
      title: ".. を整理する",
      intro: "os.path.normpath() は、パスの中の .. や . を整理して、同じ場所を指す短いパスにします。",
      code: 'import os\nprint(os.path.normpath("box/sub/../top.txt"))\nprint(os.path.normpath("./box/./sub"))',
      choices: ["box/top.txt\nbox/sub", "box/sub/top.txt\nbox/sub", "top.txt\nsub"],
      answer: 0,
      explain:
        "box/sub/../top.txt は、box に入り、sub に入り、.. で1段上の box に戻ってから top.txt を指すので、box/top.txt と同じ場所です。. は「今いるディレクトリ」なので、何度出てきても場所は変わらず、./box/./sub は box/sub になります。.. を「その場にとどまる」と考えると box/sub/top.txt を選んでしまいます。",
      xp: 15,
    },
    {
      id: "r43-tree",
      title: "子の数と子孫の数",
      intro: "辞書の len() は、すぐ下の子の数だけを数えます。",
      code: 'tree = {"root": {"a": {"a1": "葉", "a2": "葉"}, "b": "葉"}}\nprint(len(tree["root"]))\nprint(len(tree["root"]["a"]))',
      choices: ["4\n2", "2\n2", "3\n2"],
      answer: 1,
      explain:
        "tree[\"root\"] の子は a と b の2つなので、1行目は 2 です。a の下の a1 や a2 は root から見ると孫、つまり子孫ですが、子ではないので len には入りません。2行目は a の子の a1 と a2 で 2 です。4 を選んだ人は、子孫を全部数えてしまっています。木構造では、すぐ下が子、子の子もふくめてずっと下まで全部が子孫、と区別します。",
      xp: 15,
    },
  ],
  explain: {},
  topics: [],
  refSections: 5,
  refProse: 2174,
};
