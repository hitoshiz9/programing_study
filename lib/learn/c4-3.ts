import type { LearnChapter } from "./types.ts";

// 4-3 ディレクトリと木構造。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// カレントディレクトリを動かす例は、最初に /home/pyodide へ移ってから始め、最後に戻す。
export const chapter: LearnChapter = {
  ref: "4-3",
  sections: [
    {
      title: "ディレクトリと階層構造",
      blocks: [
        { h: "ディレクトリと階層" },
        { p: "パソコンの中のファイルは、いくつかの入れ物に分けて、しまわれています。ファイルを入れておく場所を「ディレクトリ」といいます。ファイルをまとめておくものなので「フォルダ」とも呼びます。ディレクトリの中には、ファイルだけでなく、別のディレクトリも入れられます。そのため、ディレクトリの中のディレクトリの中のファイル、というように、何段にも重なった「階層」ができます。これは Python だけの話ではなく、Windows・macOS・Linux など、どの OS（パソコンを動かす基本のソフト）にも共通するしくみです。" },
        { p: "階層は、下のような図で表すと分かりやすくなります。school の中に math というディレクトリと memo.txt というファイルがあり、math の中に test.txt があります。いちばん先（末端）にあるのがファイルで、末端でないものがディレクトリです。" },
        { code: 'print("school")\nprint("├── math")\nprint("│   └── test.txt")\nprint("└── memo.txt")', out: "school\n├── math\n│   └── test.txt\n└── memo.txt" },
        { p: "Python でディレクトリを扱う道具は、os というモジュールに入っています。import os と書くと使えます（モジュールは 5-1 でくわしく学びます）。os.makedirs(\"a/b\", exist_ok=True) は、a の中に b というディレクトリを作ります（a がなければ a も作ります）。exist_ok=True は「すでにあってもエラーにしない」という指定です。ディレクトリの中のものは、\"a/b/c.txt\" のように名前を / でつないで指定します。" },
        { p: "os.listdir(ディレクトリ) は、そのディレクトリの中にあるファイルとディレクトリの名前を、リストで返します。並び順は決まっていないので、表示するときは sorted( ) で並べます。os.path.isdir(パス) は、そこにあるのがディレクトリなら True、そうでなければ False を返します。" },
        { p: "もう1つ、shutil というモジュールの shutil.rmtree(ディレクトリ, ignore_errors=True) は、ディレクトリを中身ごと消します。ignore_errors=True は「消すものがなくてもエラーにしない」という指定です。消したものは元に戻せないので、ふだん使うときは消す場所をよく確かめましょう。問題では、前に作ったものを消して、毎回作り直すために使います。" },
        { code: 'import os\nos.makedirs("ex43/docs", exist_ok=True)\nwith open("ex43/readme.txt", "w", encoding="utf-8") as f:\n    f.write("説明")\nfor name in sorted(os.listdir("ex43")):\n    print(name, os.path.isdir("ex43/" + name))', out: "docs True\nreadme.txt False" },
        { try: "l43-makedirs" },
      ],
    },
    {
      title: "カレントワーキングディレクトリ",
      blocks: [
        { h: "今いる場所: カレントディレクトリ" },
        { p: "どのプログラムも、どこか1つのディレクトリを足場にして動きます。その足場のディレクトリを「ワーキングディレクトリ」（作業ディレクトリ）といいます。Windows や macOS では、ふつう、ファイルをクリックしてアプリを起動すると、そのファイルがある場所がワーキングディレクトリになります。" },
        { p: "プログラムの実行中の、今のワーキングディレクトリを「カレントワーキングディレクトリ」、短く「カレントディレクトリ」といいます。カレントディレクトリは、. （ピリオド1つ）という記号でも表せます。この教科書の Python では、最初のカレントディレクトリは /home/pyodide です。" },
        { p: "os.getcwd() は、カレントディレクトリの場所を文字列で返します。os.chdir(行き先) は、カレントディレクトリを行き先へ移します。\"..\" は「1段上のディレクトリ」を表すので、os.chdir(\"..\") で1段上に戻れます。\"../..\" なら2段上です。移ったあとは、用事がすんだら元の場所に戻しておくと、あとのコードが混乱しません。" },
        { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex43/docs", exist_ok=True)\nprint(os.getcwd())\nos.chdir("ex43/docs")\nprint(os.getcwd())\nos.chdir("../..")\nprint(os.getcwd())', out: "/home/pyodide\n/home/pyodide/ex43/docs\n/home/pyodide" },
        { try: "l43-cwd" },
      ],
    },
    {
      title: "パス",
      blocks: [
        { h: "名前だけで開けるのは、カレントディレクトリのファイル" },
        { p: "カレントディレクトリにあるファイルは、ファイル名だけで開けます。4-1 で open(\"ファイル名\", ...) と書いて開けたのは、そのファイルがカレントディレクトリにあったからです。ほかのディレクトリにあるファイルは、ディレクトリの名前もふくめて書かないと開けません。名前だけで開こうとすると、ファイルが見つからないという FileNotFoundError になります。" },
        { p: "os.path.exists(パス) は、そこにファイルかディレクトリがあれば True、なければ False を返します。" },
        { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex43p", exist_ok=True)\nwith open("ex43p/inside.txt", "w", encoding="utf-8") as f:\n    f.write("中")\nprint(os.path.exists("ex43p/inside.txt"))\nopen("inside.txt", "r", encoding="utf-8")', out: "True\nTraceback (most recent call last):\n  File \"<exec>\", line 7, in <module>\nFileNotFoundError: [Errno 44] No such file or directory: 'inside.txt'" },
        { try: "r43-where" },
        { h: "パスは / でつないだ道順" },
        { p: "open の1つめの引数のように、ファイルやディレクトリの場所を表す書き方を「パス」といいます。パスは英語で「道すじ」という意味です。/ で区切りながら、次に進むディレクトリを1段ずつ書いていくので、こう呼ばれます。" },
        { p: "いちばん上の階層のディレクトリを「ルートディレクトリ」といい、/ だけで表します。/ から始まるパスは、ルートから数えた道順なので、カレントディレクトリがどこでも、いつも同じ場所を指します。これを「絶対パス」といいます。/ 以外から始まるパスは、カレントディレクトリから数えた道順で、「相対パス」といいます。相対パスには、先頭に ./（今いる場所）が自動で補われます。つまり \"a.txt\" と \"./a.txt\" は同じです。" },
        { p: "ここまでは macOS や Linux、この教科書の Python での決まりです。Windows では、絶対パスは C:\\Users のようにドライブの名前（C: など）から始まり、区切りに \\ を使います。" },
        { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex43p/docs", exist_ok=True)\nwith open("ex43p/docs/a.txt", "w", encoding="utf-8") as f:\n    f.write("同じファイル")\nfor path in ["ex43p/docs/a.txt", "./ex43p/docs/a.txt", "/home/pyodide/ex43p/docs/a.txt"]:\n    print(os.path.exists(path))', out: "True\nTrue\nTrue" },
        { try: "r43-abs" },
        { h: ".. で1段上へ" },
        { p: "パスの中の .. は、1段上のディレクトリを表します。下へ進む名前と組み合わせると、いったん上がってから別のところへ進む道順も書けます。たとえば \"ex43p/docs/../top.txt\" は、ex43p から docs に入り、.. で ex43p に戻ってから top.txt を指すので、\"ex43p/top.txt\" と同じ場所です。" },
        { p: "カレントディレクトリを下のディレクトリに移したときも、\"../ファイル名\" と書けば、1段上にあるファイルを開けます。" },
        { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex43p/docs", exist_ok=True)\nwith open("ex43p/top.txt", "w", encoding="utf-8") as f:\n    f.write("上の段")\nos.chdir("ex43p/docs")\nwith open("../top.txt", "r", encoding="utf-8") as f:\n    print(f.read())\nos.chdir("/home/pyodide")', out: "上の段" },
        { try: "l43-path" },
        { h: "パスを整理する: os.path.normpath" },
        { p: "os.path.normpath(パス) は、パスの中の . や .. を整理して、同じ場所を指す短いパスにして返します。.. は直前のディレクトリの名前と打ち消し合い、. は「今いる場所」なので、いくつあっても場所は変わらず、消えます。" },
        { code: 'import os\nprint(os.path.normpath("x/y/z/../../w"))\nprint(os.path.normpath("./p/q/."))', out: "x/w\np/q" },
        { try: "r43-dotdot" },
      ],
    },
    {
      title: "木構造",
      blocks: [
        { h: "木構造の言葉" },
        { p: "ディレクトリの階層は、木を上下逆さにしたような、枝分かれの形をしています。そのため「木構造」、または単に「木」（tree）と呼ばれます。いちばん上を「根」（root）、枝分かれのいちばん先を「葉」（leaf）といい、木を作っている1つ1つ（ここではファイルやディレクトリ）を「ノード」（node）といいます。" },
        { p: "あるノードを中に入れている側を「親」（parent）、入れられている側を「子」（child）といいます。同じ親を持つ子どうしは「兄弟」（sibling）です。親の親、そのまた親……とさかのぼったものをまとめて「祖先」（ancestor）、子の子、そのまた子……と下りていったものをまとめて「子孫」（descendant）といいます。" },
        { p: "Python では、辞書の中に辞書を入れて、木を表せます。辞書をディレクトリ、文字列をファイルの中身と考えます。tree[\"root\"] は root の子をまとめた辞書なので、for で回すと子の名前が順に取り出されます。" },
        { code: 'tree = {"root": {"a": {"a1": "葉"}, "b": "葉"}}\nprint("root の子:", list(tree["root"]))\nprint("a の子:", list(tree["root"]["a"]))', out: "root の子: ['a', 'b']\na の子: ['a1']" },
        { p: "この例では、a と b は root の子で、おたがいに兄弟です。a1 は a の子で、root から見ると子孫です。b と a1 は、その下に何もないので葉です。" },
        { try: "l43-tree" },
        { h: "子と子孫のちがい" },
        { p: "子は、すぐ下にあるものだけです。子孫は、子も、子の子（孫）も、ずっと下まで全部ふくみます。辞書に len( ) を使うと、すぐ下の子の数だけが数えられ、孫より下は数えられません。" },
        { code: 'tree = {"top": {"x": {"x1": "葉"}, "y": {"y1": "葉", "y2": "葉"}, "z": "葉"}}\nprint(len(tree["top"]))\nprint(len(tree["top"]["y"]))', out: "3\n2" },
        { try: "r43-tree" },
      ],
    },
    {
      title: "データ表現としての木構造",
      blocks: [
        { h: "入れ子の辞書を木として使う" },
        { p: "木構造は、ディレクトリだけでなく、いろいろなデータを整理するのに使われます。Python の、辞書やリストの中に辞書やリストを入れた入れ子のデータは、そのまま木と考えられます。" },
        { p: "ディレクトリを辞書、ファイルを中身の文字列で表すと、パス music/jazz/a.mp3 をたどることは、tree[\"music\"][\"jazz\"][\"a.mp3\"] と [ ] を重ねることに対応します。パスの / が、ちょうど [ ] の区切りになっています。途中で止めると、その下の部分の木（「部分木」といいます）が取り出せます。" },
        { p: "パスの文字列を split(\"/\") で区切ると、たどる名前のリストができます。node = tree から始めて、名前ごとに node = node[名前] とすれば、1段ずつ下へたどれます。" },
        { code: 'tree = {"music": {"jazz": {"a.mp3": "ジャズの曲"}}}\nprint(tree["music"]["jazz"]["a.mp3"])\nprint(tree["music"])\nprint("music/jazz/a.mp3".split("/"))', out: "ジャズの曲\n{'jazz': {'a.mp3': 'ジャズの曲'}}\n['music', 'jazz', 'a.mp3']" },
        { p: "データを階層に分けて管理したいときは、全体を1つの木として表せないか考えてみましょう。" },
        { try: "l43-lookup" },
      ],
    },
  ],
  // 章の最後の演習問題: os・パス・関数を組み合わせる
  exercises: ["l43-ex-count"],
};
