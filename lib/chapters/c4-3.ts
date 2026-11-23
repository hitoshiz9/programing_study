import type { Chapter } from "./types.ts";

// ディレクトリと木構造。ブラウザの中の仮のファイル置き場で os を使う。作業ディレクトリを動かす問題は、最初に /home/pyodide へ戻してから始める。
export const chapter: Chapter = {
  ref: "4-3",
  title: "ディレクトリと木構造",
  url: "https://utokyo-ipp.github.io/4/4-3.html",
  stage: "write",
  order: ["l43-makedirs", "l43-cwd", "l43-path", "l43-tree", "l43-lookup"],
  lessons: [
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
      task: "今のカレントディレクトリを表示したあと、os.chdir で work43 に移動して表示し、os.chdir(\"..\") で元に戻ってもう一度表示しよう（全部で3行）。",
      starter:
        'import os\nos.chdir("/home/pyodide")  # このアプリの最初の作業場所に戻しておく\nos.makedirs("work43", exist_ok=True)\n\n# ここに書こう\n',
      solution:
        'import os\nos.chdir("/home/pyodide")  # このアプリの最初の作業場所に戻しておく\nos.makedirs("work43", exist_ok=True)\n\nprint(os.getcwd())\nos.chdir("work43")\nprint(os.getcwd())\nos.chdir("..")\nprint(os.getcwd())',
      wrong:
        'import os\nos.chdir("/home/pyodide")  # このアプリの最初の作業場所に戻しておく\nos.makedirs("work43", exist_ok=True)\n\nprint(os.getcwd())\nos.chdir("work43")\nprint(os.getcwd())\nos.chdir("/home/pyodide/work43")\nprint(os.getcwd())',
      expect: "/home/pyodide\n/home/pyodide/work43\n/home/pyodide",
      mustInclude: ["getcwd", ".."],
      hints: ["print(os.getcwd()) で今の場所を表示します。os.chdir(\"work43\") で1段下へ移動します。", "最後は os.chdir(\"..\") で1段上に戻ってから print(os.getcwd()) です。"],
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
  ],
  reads: [
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
  explain: {
    "l43-makedirs": [
      { h: "ディレクトリと階層" },
      { p: "パソコンの中のファイルは、ディレクトリ（フォルダとも呼びます）に分けてしまわれています。ディレクトリの中には、ファイルだけでなく、別のディレクトリも入れられます。そのため、ディレクトリの中のディレクトリの中のファイル、というように何段にも重なった階層ができます。これは Python だけの話ではなく、Windows・macOS・Linux など、どの OS にも共通するしくみです。" },
      { p: "階層は、次のように字下げした図で表すと分かりやすくなります。いちばん末端にあるのがファイルで、途中で枝分かれしているのがディレクトリです。" },
      { code: 'print("school")\nprint("├── math")\nprint("│   └── test.txt")\nprint("└── memo.txt")', out: "school\n├── math\n│   └── test.txt\n└── memo.txt" },
      { h: "Python でディレクトリを扱う" },
      { p: "os モジュールには、ディレクトリを扱う道具がそろっています。os.makedirs() はディレクトリを作り、exist_ok=True を付けると、すでにあってもエラーにしません。os.listdir() は中にある名前の一覧を返し、os.path.isdir() はそれがディレクトリかどうかを調べます。" },
      { code: 'import os\nos.makedirs("ex43/docs", exist_ok=True)\nwith open("ex43/readme.txt", "w", encoding="utf-8") as f:\n    f.write("説明")\nfor name in sorted(os.listdir("ex43")):\n    print(name, os.path.isdir("ex43/" + name))', out: "docs True\nreadme.txt False" },
      { p: "starter の shutil.rmtree() は、ディレクトリを中身ごと消す命令です。この問題では、前の実行で作ったファイルが残らないように使っています。中身ごと消えて元に戻せないので、ふだん使うときは消す場所をよく確かめましょう。" },
    ],
    "l43-cwd": [
      { h: "プログラムはどこかで動いている" },
      { p: "プログラムは、必ずどこかのディレクトリを「今いる場所」として動いています。これをワーキングディレクトリ（作業ディレクトリ）といい、実行している今の場所という意味で、カレントディレクトリとも呼びます。ファイル名だけで open したときに探されるのは、このカレントディレクトリです。" },
      { p: "パソコンでファイルをダブルクリックしてアプリを起動すると、多くの場合、そのファイルがある場所がカレントディレクトリになります。このアプリの Python では、最初は /home/pyodide がカレントディレクトリです。" },
      { h: "移動する" },
      { p: "os.chdir() でカレントディレクトリを変えられます。移動したあとは、ファイル名だけで開くと、移動先のディレクトリの中を探します。移動したら、用事が終わったときに元の場所へ戻しておくと、あとのコードが混乱しません。カレントディレクトリは . という記号でも表せるので、os.path.abspath(\".\") でも今の場所を調べられます。" },
      { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex43/docs", exist_ok=True)\nos.chdir("ex43/docs")\nprint(os.path.abspath("."))\nos.chdir("../..")\nprint(os.path.abspath("."))', out: "/home/pyodide/ex43/docs\n/home/pyodide" },
      { p: "\"../..\" は、1段上のさらに1段上、つまり2段上に戻るという意味です。" },
    ],
    "l43-path": [
      { h: "パスは道順" },
      { p: "open の1つめの引数のように、ファイルやディレクトリの場所を表す書き方をパス（道すじ）といいます。/ で区切りながら、どのディレクトリへ進むかを1歩ずつ書いていくことから、こう呼ばれます。" },
      { p: "いちばん上の階層をルートディレクトリといい、/ だけで表します。/ から始まるパスは、ルートから数えた住所なので、どこから使っても同じ場所を指します。これを絶対パスといいます。/ 以外から始まるパスは、カレントディレクトリから数えた道順で、相対パスといいます。相対パスの先頭には、自動で ./（今いる場所）が補われると考えられます。" },
      { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex43/docs", exist_ok=True)\nwith open("ex43/docs/a.txt", "w", encoding="utf-8") as f:\n    f.write("同じファイル")\nfor path in ["ex43/docs/a.txt", "./ex43/docs/a.txt", "/home/pyodide/ex43/docs/a.txt"]:\n    with open(path, "r", encoding="utf-8") as f:\n        print(f.read())', out: "同じファイル\n同じファイル\n同じファイル" },
      { p: ".. は1段上のディレクトリを表します。下へ進む名前と組み合わせると、となりのディレクトリへ移るなど、自由に道順を書けます。ex43/docs/.. は ex43 と同じ場所です。カレントディレクトリにないファイルを名前だけで開こうとすると FileNotFoundError になるので、そのときはパスが正しいかを確かめましょう。" },
    ],
    "l43-tree": [
      { h: "木構造の言葉" },
      { p: "ディレクトリの階層は、根元から枝が分かれていく木を、上下逆さにした形をしています。そのため木構造、または単に木（tree）と呼ばれます。いちばん上を根（root）、枝分かれの先にあって、それより下がないものを葉（leaf）といい、木を作っている1つ1つ（ここではファイルやディレクトリ）をノード（node）といいます。" },
      { p: "中に入れている側を親（parent）、入れられている側を子（child）、同じ親を持つ子同士を兄弟（sibling）と呼びます。親の親、そのまた親……とさかのぼったものをまとめて祖先（ancestor）、子の子、そのまた子……と下りていったものをまとめて子孫（descendant）といいます。" },
      { code: 'tree = {"root": {"a": {"a1": "葉"}, "b": "葉"}}\nprint("root の子:", list(tree["root"]))\nprint("a の子:", list(tree["root"]["a"]))', out: "root の子: ['a', 'b']\na の子: ['a1']" },
      { p: "この例では、a と b は root の子で、おたがいに兄弟です。a1 は a の子で、root から見ると子孫です。b と a1 は葉です。" },
    ],
    "l43-lookup": [
      { h: "データを木で表す" },
      { p: "木構造は、ディレクトリだけでなく、いろいろなデータを整理するのに使われます。Python では、辞書やリストの中に辞書やリストを入れた入れ子のデータが、そのまま木になっています。たとえば、ディレクトリを辞書、ファイルを中身の文字列で表すと、ディレクトリの階層をまるごと1つの辞書にできます。" },
      { p: "このとき、パス photo/2025/umi.jpg をたどることは、tree[\"photo\"][\"2025\"][\"umi.jpg\"] と [ ] を重ねることに対応します。パスの / が、ちょうど [ ] の区切りになっているわけです。" },
      { code: 'tree = {"photo": {"2025": {"umi.jpg": "海の写真"}}}\nprint(tree["photo"]["2025"]["umi.jpg"])\nprint(tree["photo"]["2025"])', out: "海の写真\n{'umi.jpg': '海の写真'}" },
      { p: "途中で止めると、その下の部分の木（部分木）が取り出せます。データを階層に分けて管理したいときは、全体を1つの木として表せないか考えてみましょう。" },
    ],
  },
  topics: [
    ["ディレクトリと階層構造", ["l43-makedirs"]],
    ["カレントワーキングディレクトリ", ["l43-cwd"]],
    ["パス", ["l43-path", "r43-where", "r43-dotdot"]],
    ["木構造", ["l43-tree", "r43-tree"]],
    ["データ表現としての木構造", ["l43-lookup"]],
  ],
  refSections: 5,
  refProse: 2174,
};
