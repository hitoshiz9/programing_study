import type { Chapter } from "./types.ts";

// ファイル入出力の基本。ファイルはブラウザの中の仮の置き場に作られる。前の実行のファイルが残っていても同じ結果になるよう、毎回書いてから読む。
export const chapter: Chapter = {
  ref: "4-1",
  title: "ファイル入出力の基本",
  url: "https://utokyo-ipp.github.io/4/4-1.html",
  stage: "write",
  order: [
    "l41-open",
    "l41-readline",
    "l41-read",
    "l41-with",
    "l41-write",
    "l41-append",
    "l41-copy",
    "l41-encoding",
    "l41-rstrip",
    "l41-countlines",
    "l41-countchar",
    "l41-numbered",
  ],
  lessons: [
    {
      id: "l41-open",
      title: "open でファイルを開く",
      intro: [
        "ファイルを読み書きするときは、まず open(ファイル名, モード) でファイルを開きます。open が返すもの（ファイルオブジェクト）を変数に入れておき、それを通して読んだり書いたりします。",
        "モードは \"r\" が読み込み、\"w\" が書き込み、\"a\" が追記（うしろに書き足す）です。使い終わったら close() で閉じます。",
      ],
      example: 'f = open("hello41.txt", "w", encoding="utf-8")\nf.write("やあ")\nf.close()\n\nf = open("hello41.txt", "r", encoding="utf-8")\nprint(f.read())\nf.close()',
      task: "最初のコードは memo41.txt というファイルを作ります。その下に、memo41.txt を読み込みモード \"r\" で開き、f.read() で読んだ中身を表示して、close() で閉じるコードを書こう。",
      starter:
        'f = open("memo41.txt", "w", encoding="utf-8")\nf.write("今日は晴れ")\nf.close()\n\n# この下に、memo41.txt を読み込みモードで開いて、中身を表示するコードを書こう\n',
      solution:
        'f = open("memo41.txt", "w", encoding="utf-8")\nf.write("今日は晴れ")\nf.close()\n\nf = open("memo41.txt", "r", encoding="utf-8")\nprint(f.read())\nf.close()',
      wrong:
        'f = open("memo41.txt", "w", encoding="utf-8")\nf.write("今日は晴れ")\nf.close()\n\nf = open("memo41.txt", "w", encoding="utf-8")\nprint(f.read())\nf.close()',
      expect: "今日は晴れ",
      mustInclude: ["read"],
      hints: [
        "f = open(\"memo41.txt\", \"r\", encoding=\"utf-8\") で開きます。\"w\" で開くと、読むことはできません。",
        "開いたら print(f.read()) で表示し、最後に f.close() です。",
      ],
      xp: 20,
    },
    {
      id: "l41-readline",
      title: "readline で1行ずつ読む",
      intro: [
        "f.readline() は、ファイルから1行だけ読んで、文字列として返します。もう一度呼ぶと、続きの次の行が返ってきます。",
        "返ってくる文字列には、行の終わりの改行 \\n も入っています。そのまま print すると、print の改行と合わせて空の行ができるので、print(line, end=\"\") のようにします。",
      ],
      example: 'f = open("abc41.txt", "w", encoding="utf-8")\nf.write("A\\nB\\n")\nf.close()\n\nf = open("abc41.txt", "r", encoding="utf-8")\nline = f.readline()\nprint(line, end="")\nf.close()',
      task: "fruits41.txt には「りんご」「みかん」「ぶどう」の3行が入っています。readline() を2回使って、1行目と2行目だけを表示しよう（空の行が入らないように、print に end=\"\" を付けます）。",
      starter:
        'f = open("fruits41.txt", "w", encoding="utf-8")\nf.write("りんご\\nみかん\\nぶどう\\n")\nf.close()\n\nf = open("fruits41.txt", "r", encoding="utf-8")\n# ここに書こう（1行読んで表示する、を2回）\n\nf.close()\n',
      solution:
        'f = open("fruits41.txt", "w", encoding="utf-8")\nf.write("りんご\\nみかん\\nぶどう\\n")\nf.close()\n\nf = open("fruits41.txt", "r", encoding="utf-8")\nline = f.readline()\nprint(line, end="")\nline = f.readline()\nprint(line, end="")\nf.close()',
      wrong:
        'f = open("fruits41.txt", "w", encoding="utf-8")\nf.write("りんご\\nみかん\\nぶどう\\n")\nf.close()\n\nf = open("fruits41.txt", "r", encoding="utf-8")\nline = f.readline()\nprint(line, end="")\nprint(line, end="")\nf.close()',
      expect: "りんご\nみかん",
      mustInclude: ["readline"],
      hints: ["line = f.readline() で1行読めます。呼ぶたびに次の行に進みます。", "line = f.readline() と print(line, end=\"\") を、2回くり返して書きます。"],
      xp: 20,
    },
    {
      id: "l41-countlines",
      title: "練習: 行の数を数える関数",
      intro: [
        "readline() は、ファイルの最後まで読み終わると空の文字列 \"\" を返します。while True でくり返し、\"\" が返ってきたら break で抜ければ、ファイルの終わりまで1行ずつ読めます。",
      ],
      example: 'f = open("abc41.txt", "w", encoding="utf-8")\nf.write("A\\nB\\n")\nf.close()\n\nf = open("abc41.txt", "r", encoding="utf-8")\nwhile True:\n    line = f.readline()\n    if line == "":\n        break\n    print("読んだ:", line, end="")\nf.close()',
      task: "ファイル名 name を受け取り、そのファイルが何行あるかを返す関数 count_lines(name) を作ろう。readline() で1行ずつ読んで数えます。最後の行が改行で終わっていなくても1行と数え、空のファイルなら 0 を返します。",
      starter: "def count_lines(name):\n    pass\n",
      solution:
        'def count_lines(name):\n    f = open(name, "r", encoding="utf-8")\n    n = 0\n    while True:\n        line = f.readline()\n        if line == "":\n            break\n        n += 1\n    f.close()\n    return n',
      wrong:
        'def count_lines(name):\n    f = open(name, "r", encoding="utf-8")\n    n = 0\n    while True:\n        line = f.readline()\n        if line == "":\n            break\n        if line.endswith("\\n"):\n            n += 1\n    f.close()\n    return n',
      expect: "3 1 0",
      test:
        'for name, text in [("t41a.txt", "a\\nb\\nc"), ("t41b.txt", "x\\n"), ("t41c.txt", "")]:\n    g = open(name, "w", encoding="utf-8")\n    g.write(text)\n    g.close()\nprint(count_lines("t41a.txt"), count_lines("t41b.txt"), count_lines("t41c.txt"))',
      mustInclude: ["readline", "return"],
      hints: [
        "数を入れる変数 n = 0 を用意し、while True: の中で line = f.readline() を読みます。line が \"\" なら break、そうでなければ n += 1 です。",
        "くり返しを抜けたら f.close() で閉じてから return n します。",
      ],
      xp: 30,
    },
    {
      id: "l41-read",
      title: "read でまるごと読む",
      intro: [
        "f.read() は、ファイルの中身を全部まとめて1つの文字列として返します。行の区切りの改行 \\n も、そのまま文字列に入っています。",
        "一度 read() すると、読む位置がファイルの終わりまで進みます。続けてもう一度 read() すると、残りがないので空の文字列 \"\" になります。",
      ],
      example: 'f = open("abc41.txt", "w", encoding="utf-8")\nf.write("A\\nB\\n")\nf.close()\n\nf = open("abc41.txt", "r", encoding="utf-8")\ns = f.read()\nf.close()\nprint(len(s))',
      task: "poem41.txt を開き、read() で読んだ文字列の文字数を len() で表示しよう。続けて、同じファイルオブジェクトでもう一度 read() し、その文字数も表示しよう。",
      starter:
        'f = open("poem41.txt", "w", encoding="utf-8")\nf.write("春が来た\\n花が咲く\\n")\nf.close()\n\nf = open("poem41.txt", "r", encoding="utf-8")\n# ここに書こう\n\nf.close()\n',
      solution:
        'f = open("poem41.txt", "w", encoding="utf-8")\nf.write("春が来た\\n花が咲く\\n")\nf.close()\n\nf = open("poem41.txt", "r", encoding="utf-8")\nprint(len(f.read()))\nprint(len(f.read()))\nf.close()',
      wrong:
        'f = open("poem41.txt", "w", encoding="utf-8")\nf.write("春が来た\\n花が咲く\\n")\nf.close()\n\nf = open("poem41.txt", "r", encoding="utf-8")\ns = f.read()\nprint(len(s))\nprint(len(s))\nf.close()',
      expect: "10\n0",
      mustInclude: ["read()"],
      hints: ["改行 \\n も1文字に数えます。「春が来た」4文字 + 改行で5文字、それが2行です。", "print(len(f.read())) を2回書きます。2回目は、もう読むものが残っていません。"],
      xp: 20,
    },
    {
      id: "l41-countchar",
      title: "練習: ファイルの中の文字を数える関数",
      intro: [
        "ファイルを read() で文字列にしてしまえば、あとは 2-1 で学んだ文字列の道具（len や count など）がそのまま使えます。",
        "関数の中でファイルを開いたら、return で関数を抜ける前に close() で閉じておきます。return のあとに書いた close() は動きません。",
      ],
      example: 'f = open("abc41.txt", "w", encoding="utf-8")\nf.write("ABA")\nf.close()\n\nf = open("abc41.txt", "r", encoding="utf-8")\ns = f.read()\nf.close()\nprint(s.count("A"))',
      task: "ファイル名 name と1文字 ch を受け取り、そのファイルの中に ch が何回出てくるかを返す関数 count_in_file(name, ch) を作ろう。read() でまとめて読みます。",
      starter: "def count_in_file(name, ch):\n    pass\n",
      solution:
        'def count_in_file(name, ch):\n    f = open(name, "r", encoding="utf-8")\n    s = f.read()\n    f.close()\n    return s.count(ch)',
      wrong:
        'def count_in_file(name, ch):\n    f = open(name, "r", encoding="utf-8")\n    s = f.readline()\n    f.close()\n    return s.count(ch)',
      expect: "3 2 0",
      test:
        'g = open("t41d.txt", "w", encoding="utf-8")\ng.write("ぴよぴよ\\nぴー\\n")\ng.close()\nprint(count_in_file("t41d.txt", "ぴ"), count_in_file("t41d.txt", "\\n"), count_in_file("t41d.txt", "z"))',
      mustInclude: ["read", "return"],
      hints: ["s = f.read() で全体を読み、f.close() で閉じてから、s.count(ch) を返します。", "readline() だと1行目しか読まないので、2行目以降の文字が数えられません。"],
      xp: 30,
    },
    {
      id: "l41-with",
      title: "with 文で閉じ忘れを防ぐ",
      intro: [
        "with open(ファイル名, モード) as f: と書くと、字下げしたブロックの中で f が使えます。ブロックを抜けると、ファイルは自動で閉じられるので、close() を書く必要がありません。",
        "f.closed は、ファイルが閉じていれば True、開いていれば False です。",
      ],
      example: 'with open("abc41.txt", "w", encoding="utf-8") as f:\n    f.write("ABC")\n\nwith open("abc41.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
      task: "diary41.txt を with 文で開いて中身を表示しよう。そのあと、with のブロックの外（字下げしない行）で print(f.closed) を表示しよう。",
      starter:
        'f = open("diary41.txt", "w", encoding="utf-8")\nf.write("晴れのち雨")\nf.close()\n\n# ここに、with 文で diary41.txt を開いて表示するコードを書こう\n',
      solution:
        'f = open("diary41.txt", "w", encoding="utf-8")\nf.write("晴れのち雨")\nf.close()\n\nwith open("diary41.txt", "r", encoding="utf-8") as f:\n    print(f.read())\nprint(f.closed)',
      wrong:
        'f = open("diary41.txt", "w", encoding="utf-8")\nf.write("晴れのち雨")\nf.close()\n\nwith open("diary41.txt", "r", encoding="utf-8") as f:\n    print(f.read())\n    print(f.closed)',
      expect: "晴れのち雨\nTrue",
      mustInclude: ["with"],
      hints: ["with open(\"diary41.txt\", \"r\", encoding=\"utf-8\") as f: の次の行を字下げして print(f.read()) と書きます。", "print(f.closed) は字下げしないで書くと、ブロックを抜けたあと（閉じたあと）に動きます。"],
      xp: 20,
    },
    {
      id: "l41-write",
      title: "ファイルに書き込む",
      intro: [
        "書き込みモード \"w\" で開くと、ファイルに文字を書けます。print(..., file=f) と file= に開いたファイルを渡すと、画面のかわりにファイルへ書き出します。",
        "\"w\" で開くと、同じ名前のファイルがあっても中身は消えて、空から書き直しになります。ファイルがなければ、新しく作られます。",
      ],
      example: 'with open("abc41.txt", "w", encoding="utf-8") as f:\n    print("一行目", file=f)\n\nwith open("abc41.txt", "r", encoding="utf-8") as f:\n    print(f.read(), end="")',
      task: "todo41.txt を \"w\" で開いた with のブロックの中で、print の file= を使って「買い物」「洗たく」の2行を書き込もう。書いたあとのファイルの中身で判定します。",
      starter: 'with open("todo41.txt", "w", encoding="utf-8") as f:\n    pass  # ここを書きかえて、2行書き込もう\n',
      solution: 'with open("todo41.txt", "w", encoding="utf-8") as f:\n    print("買い物", file=f)\n    print("洗たく", file=f)',
      wrong: 'with open("todo41.txt", "w", encoding="utf-8") as f:\n    print("買い物", "洗たく", file=f)',
      expect: "買い物\n洗たく",
      test: 'with open("todo41.txt", "r", encoding="utf-8") as g:\n    print(g.read(), end="")',
      mustInclude: ["file="],
      hints: ["print(\"買い物\", file=f) のように、file=f を付けた print を2回書きます。", "1回の print にカンマで2つ渡すと、同じ行に空白区切りで書かれてしまいます。"],
      xp: 20,
    },
    {
      id: "l41-append",
      title: "追記モードで書き足す",
      intro: [
        "追記モード \"a\" で開くと、今あるファイルの中身を残したまま、そのうしろに書き足します。ファイルがなければ、\"w\" と同じく新しく作られます。",
        "日記や記録のように、少しずつ増やしていくファイルに向いています。",
      ],
      example: 'with open("abc41.txt", "w", encoding="utf-8") as f:\n    print("A", file=f)\nwith open("abc41.txt", "a", encoding="utf-8") as f:\n    print("B", file=f)\n\nwith open("abc41.txt", "r", encoding="utf-8") as f:\n    print(f.read(), end="")',
      task: "最初のコードは log41.txt に「1日目: 10分」を書きます。その下で log41.txt を追記モードで開き、「2日目: 25分」の行を書き足そう。書いたあとのファイルの中身で判定します。",
      starter:
        'with open("log41.txt", "w", encoding="utf-8") as f:\n    print("1日目: 10分", file=f)\n\n# ここに、log41.txt に1行書き足すコードを書こう\n',
      solution:
        'with open("log41.txt", "w", encoding="utf-8") as f:\n    print("1日目: 10分", file=f)\n\nwith open("log41.txt", "a", encoding="utf-8") as f:\n    print("2日目: 25分", file=f)',
      wrong:
        'with open("log41.txt", "w", encoding="utf-8") as f:\n    print("1日目: 10分", file=f)\n\nwith open("log41.txt", "w", encoding="utf-8") as f:\n    print("2日目: 25分", file=f)',
      expect: "1日目: 10分\n2日目: 25分",
      test: 'with open("log41.txt", "r", encoding="utf-8") as g:\n    print(g.read(), end="")',
      mustInclude: ['"a"'],
      hints: ["モードを \"a\" にして開きます。\"w\" で開くと、1日目の行が消えてしまいます。", "with open(\"log41.txt\", \"a\", encoding=\"utf-8\") as f: の中で print(\"2日目: 25分\", file=f) です。"],
      xp: 20,
    },
    {
      id: "l41-numbered",
      title: "練習: 行番号を付けて書き出す関数",
      intro: [
        "読むファイルと書くファイルを同時に開けば、1つのファイルを読みながら、加工した結果を別のファイルへ書き出せます。with 文には、カンマで区切って2つの open を並べられます。",
      ],
      example: 'with open("abc41.txt", "w", encoding="utf-8") as f:\n    f.write("a\\nb\\n")\n\nwith open("abc41.txt", "r", encoding="utf-8") as src, open("abc41-copy.txt", "w", encoding="utf-8") as dst:\n    dst.write(src.read())\n\nwith open("abc41-copy.txt", "r", encoding="utf-8") as f:\n    print(f.read(), end="")',
      task: "ファイル名 infile と outfile を受け取り、infile の各行の先頭に「1: 」「2: 」のような行番号（1 から数える）を付けて、outfile に書き出す関数 add_numbers(infile, outfile) を作ろう。",
      starter: "def add_numbers(infile, outfile):\n    pass\n",
      solution:
        'def add_numbers(infile, outfile):\n    with open(infile, "r", encoding="utf-8") as src, open(outfile, "w", encoding="utf-8") as dst:\n        n = 1\n        while True:\n            line = src.readline()\n            if line == "":\n                break\n            dst.write(str(n) + ": " + line)\n            n += 1',
      wrong:
        'def add_numbers(infile, outfile):\n    with open(infile, "r", encoding="utf-8") as src, open(outfile, "w", encoding="utf-8") as dst:\n        n = 1\n        while True:\n            line = src.readline()\n            if line == "":\n                break\n            dst.write(str(n) + ": " + line)',
      expect: "1: いぬ\n2: ねこ\n3: とり",
      test:
        'with open("t41e.txt", "w", encoding="utf-8") as g:\n    g.write("いぬ\\nねこ\\nとり\\n")\nadd_numbers("t41e.txt", "t41f.txt")\nwith open("t41f.txt", "r", encoding="utf-8") as g:\n    print(g.read(), end="")',
      hints: [
        "infile を \"r\"、outfile を \"w\" で開きます。readline() で1行ずつ読み、番号を数える変数 n を 1 から増やしていきます。",
        "dst.write(str(n) + \": \" + line) で書けます。line には最初から改行が付いているので、改行を足す必要はありません。",
      ],
      xp: 30,
    },
    {
      id: "l41-encoding",
      title: "文字コードを指定する",
      intro: [
        "コンピュータは文字を数の並びにして保存します。その決まりを文字コードといい、日本語では UTF-8 や Shift_JIS などがあります。",
        "open の encoding= で文字コードを指定します。書いたときと同じ文字コードで読まないと、エラーになったり文字化けしたりします。",
      ],
      example: 'with open("abc41.txt", "w", encoding="utf-8") as f:\n    f.write("あいう")\n\nwith open("abc41.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
      task: "最初のコードは、さくら という文字を ej41.txt に書き込みます。このファイルを、書いたときと同じ文字コードを指定して \"r\" で開き、read() で中身を表示しよう。",
      starter:
        'with open("ej41.txt", "w", encoding="euc_jp") as f:\n    f.write("さくら")\n\n# ここに、ej41.txt を読んで表示するコードを書こう\n',
      solution:
        'with open("ej41.txt", "w", encoding="euc_jp") as f:\n    f.write("さくら")\n\nwith open("ej41.txt", "r", encoding="euc_jp") as f:\n    print(f.read())',
      wrong:
        'with open("ej41.txt", "w", encoding="euc_jp") as f:\n    f.write("さくら")\n\nwith open("ej41.txt", "r", encoding="shift_jis") as f:\n    print(f.read())',
      expect: "さくら",
      mustInclude: ["read"],
      hints: ["書いたときの open に付いている encoding= を見て、同じものを指定します。", "with open(\"ej41.txt\", \"r\", encoding=\"euc_jp\") as f: の中で print(f.read()) です。"],
      xp: 20,
    },
    {
      id: "l41-rstrip",
      title: "行の終わりの改行を取る",
      intro: [
        "readline() で読んだ行の終わりには改行 \\n が付いています。line.rstrip(\"\\n\") とすると、右端の改行だけを取りのぞけます。",
        "引数なしの rstrip() は、改行だけでなく右端の空白もまとめて消します。",
      ],
      example: 'line = "おはよう\\n"\nprint(line.rstrip("\\n"))\nprint("ここは次の行")',
      task: "今のコードは、行ごとに空の行がはさまって表示されます。print(line) のところを直して、行の終わりの改行を取ってから表示しよう。",
      starter:
        'with open("day41.txt", "w", encoding="utf-8") as f:\n    f.write("あさ\\nひる\\nよる\\n")\n\nwith open("day41.txt", "r", encoding="utf-8") as f:\n    while True:\n        line = f.readline()\n        if line == "":\n            break\n        print(line)  # ここを直そう\n',
      solution:
        'with open("day41.txt", "w", encoding="utf-8") as f:\n    f.write("あさ\\nひる\\nよる\\n")\n\nwith open("day41.txt", "r", encoding="utf-8") as f:\n    while True:\n        line = f.readline()\n        if line == "":\n            break\n        print(line.rstrip("\\n"))',
      wrong:
        'with open("day41.txt", "w", encoding="utf-8") as f:\n    f.write("あさ\\nひる\\nよる\\n")\n\nwith open("day41.txt", "r", encoding="utf-8") as f:\n    while True:\n        line = f.readline()\n        if line == "":\n            break\n        print(line.rstrip("あ"))',
      expect: "あさ\nひる\nよる",
      hints: ["line.rstrip(\"\\n\") で、右端の改行を取りのぞいた文字列ができます。", "print(line.rstrip(\"\\n\")) に書きかえます。"],
      xp: 20,
    },
    {
      id: "l41-copy",
      title: "2つのファイルを開いてコピーする",
      intro: [],
      example: "",
      task: "最初のコードは src41.txt を作り、dst41.txt を空にします。その下に、1つの with 文で src41.txt を \"r\"、dst41.txt を \"w\" で開き、src41.txt の中身を read() で読んで、そのまま write() で dst41.txt に書き込むコードを書こう。書いたあとの dst41.txt の中身で判定します。",
      starter:
        'with open("src41.txt", "w", encoding="utf-8") as f:\n    f.write("コピーしてね\\n2行目\\n")\nwith open("dst41.txt", "w", encoding="utf-8") as f:\n    f.write("")\n\n# ここに書こう\n',
      solution:
        'with open("src41.txt", "w", encoding="utf-8") as f:\n    f.write("コピーしてね\\n2行目\\n")\nwith open("dst41.txt", "w", encoding="utf-8") as f:\n    f.write("")\n\nwith open("src41.txt", "r", encoding="utf-8") as src, open("dst41.txt", "w", encoding="utf-8") as dst:\n    dst.write(src.read())',
      wrong:
        'with open("src41.txt", "w", encoding="utf-8") as f:\n    f.write("コピーしてね\\n2行目\\n")\nwith open("dst41.txt", "w", encoding="utf-8") as f:\n    f.write("")\n\nwith open("src41.txt", "r", encoding="utf-8") as src, open("dst41.txt", "w", encoding="utf-8") as dst:\n    dst.write(src.readline())',
      expect: "コピーしてね\n2行目",
      test: 'with open("dst41.txt", "r", encoding="utf-8") as g:\n    print(g.read(), end="")',
      mustInclude: ["write"],
      hints: [
        "with open(\"src41.txt\", \"r\", encoding=\"utf-8\") as src, open(\"dst41.txt\", \"w\", encoding=\"utf-8\") as dst: と、カンマで2つ並べます。",
        "ブロックの中に dst.write(src.read()) と書きます。",
      ],
      xp: 25,
    },
  ],
  reads: [
    {
      id: "r41-loop",
      title: "空の行があっても止まらない",
      intro: "",
      code: 'f = open("r41f.txt", "w", encoding="utf-8")\nf.write("犬\\n\\n猫\\n")\nf.close()\n\nf = open("r41f.txt", "r", encoding="utf-8")\nwhile True:\n    line = f.readline()\n    if line == "":\n        break\n    print(len(line))\nf.close()',
      choices: ["2\n1\n2", "2", "1\n0\n1"],
      answer: 0,
      explain:
        "1行目は「犬」と改行で 2 文字です。2行目は何も書かれていない行ですが、改行が1つ入っているので \"\\n\" として読まれ、長さは 1 です。\"\" ではないので、くり返しは止まりません。3行目は「猫」と改行で 2 です。そのあと readline() が \"\" を返したところで break します。「2」だけを選んだ人は、空の行で終わると考えています。「1 0 1」を選んだ人は、改行を文字に数えていません。",
      xp: 15,
    },
    {
      id: "r41-unflushed",
      title: "close する前に読むと",
      intro: "",
      code: 'f = open("r41g.txt", "w", encoding="utf-8")\nf.write("メモ")\ng = open("r41g.txt", "r", encoding="utf-8")\nprint(repr(g.read()))\ng.close()\nf.close()\n\ng = open("r41g.txt", "r", encoding="utf-8")\nprint(repr(g.read()))\ng.close()',
      choices: ["'メモ'\n'メモ'", "''\n'メモ'", "''\n''"],
      answer: 1,
      explain:
        "f.write(\"メモ\") のような少しの文字は、ふつう f を close するまで、まだファイルには入っていません。そのため、close の前に別のファイルオブジェクト g で読むと、中身は空の '' です。f.close() のあとで開き直して読むと、'メモ' が入っています。書いたら閉じる、を忘れないようにしましょう。",
      xp: 15,
    },
    {
      id: "r41-closed",
      title: "閉じたかどうかを調べる",
      intro: "f.closed は、ファイルが閉じていれば True です。close() の前と後で比べよう。",
      code: 'f = open("r41a.txt", "w", encoding="utf-8")\nf.write("x")\nprint(f.closed)\nf.close()\nprint(f.closed)',
      choices: ["False\nTrue", "True\nFalse", "True\nTrue"],
      answer: 0,
      explain:
        "open した直後のファイルは開いたままなので、1回目の f.closed は False です。close() を呼んだあとは閉じているので True になります。開いたままのファイルは「だれかが使用中」とみなされ、パソコンによってはほかのアプリから消したり書きかえたりできなくなります。使い終わったら閉じる、を習慣にしましょう。逆の順番を選んだ人は、closed が「閉じているか」を表すことを確かめておきましょう。",
      xp: 15,
    },
    {
      id: "r41-readline",
      title: "読み終わったあとの readline",
      intro: "repr() は、改行などの見えない文字も \\n のように見える形で表示します。3回目の readline に注目しよう。",
      code: 'f = open("r41b.txt", "w", encoding="utf-8")\nf.write("A\\nB\\n")\nf.close()\n\nf = open("r41b.txt", "r", encoding="utf-8")\nprint(repr(f.readline()))\nprint(repr(f.readline()))\nprint(repr(f.readline()))\nf.close()',
      choices: ["'A'\n'B'\n''", "'A\\n'\n'B\\n'\n'B\\n'", "'A\\n'\n'B\\n'\n''"],
      answer: 2,
      explain:
        "readline() が返す行には、行の終わりの改行 \\n が付いたままです。だから1回目は 'A\\n'、2回目は 'B\\n' になります。2行しかないので、3回目はもう読むものがなく、空の文字列 '' が返ります。最後の行をくり返すわけではありません。この '' を合図にすると、ファイルの終わりが分かります。",
      xp: 15,
    },
    {
      id: "r41-read-twice",
      title: "readline のあとに read する",
      intro: "read() は、今の位置からファイルの終わりまでを読みます。",
      code: 'f = open("r41c.txt", "w", encoding="utf-8")\nf.write("abc\\nde\\n")\nf.close()\n\nf = open("r41c.txt", "r", encoding="utf-8")\nf.readline()\ns = f.read()\nf.close()\nprint(repr(s))',
      choices: ["'abc\\nde\\n'", "'de\\n'", "''"],
      answer: 1,
      explain:
        "最初の readline() で1行目の 'abc\\n' が読まれ、読む位置は2行目の先頭まで進みます。そのあとの read() は、その位置からファイルの終わりまでを読むので、残りの 'de\\n' だけが返ります。read() はいつもファイルの最初から読むわけではありません。何も残っていないのは、終わりまで読んだあとにもう一度 read() したときです。",
      xp: 15,
    },
    {
      id: "r41-write",
      title: "write は改行を足さない",
      intro: "print と違って、write は渡した文字列をそのまま書くだけです。",
      code: 'with open("r41d.txt", "w", encoding="utf-8") as f:\n    f.write("ab")\n    f.write("cd")\n\nwith open("r41d.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
      choices: ["ab\ncd", "cd", "abcd"],
      answer: 2,
      explain:
        "write() は、渡した文字列をそのままファイルに書き、print のように最後に改行を足すことはしません。だから \"ab\" のすぐうしろに \"cd\" が続き、ファイルの中身は abcd になります。また、同じ with のブロックの中で書き足しているので、前に書いた ab が消えることもありません。行を分けたいときは、\"ab\\n\" のように自分で \\n を入れます。",
      xp: 15,
    },
    {
      id: "r41-append",
      title: "w と a の組み合わせ",
      intro: "\"w\" は中身を消してから書き、\"a\" はうしろに足します。3回目の open のモードに注目しよう。",
      code: 'with open("r41e.txt", "w", encoding="utf-8") as f:\n    print("A", file=f)\nwith open("r41e.txt", "a", encoding="utf-8") as f:\n    print("B", file=f)\nwith open("r41e.txt", "w", encoding="utf-8") as f:\n    print("C", file=f)\n\nwith open("r41e.txt", "r", encoding="utf-8") as f:\n    print(f.read(), end="")',
      choices: ["A\nB\nC", "C", "A\nC"],
      answer: 1,
      explain:
        "1回目の \"w\" で A、2回目の \"a\" で B が書き足され、いったん中身は A と B の2行になります。ところが3回目は \"w\" で開いているので、そこで中身がすべて消えてから C が書かれます。最後に残るのは C の1行だけです。\"w\" で開くだけで中身が消える、という点はうっかりデータを失う原因になるので気をつけましょう。",
      xp: 15,
    },
    {
      id: "r41-bytes",
      title: "文字コードとバイト数",
      intro: "encode() は、文字列を指定した文字コードのバイト（保存される数の並び）に変えます。len でその長さが分かります。",
      code: 'print(len("あいう"), len("あいう".encode("utf-8")), len("あいう".encode("shift_jis")))',
      choices: ["3 9 6", "3 3 3", "3 6 9"],
      answer: 0,
      explain:
        "文字数は3文字です。ひらがなは UTF-8 では1文字が3バイト、Shift_JIS では1文字が2バイトで保存されるので、9 と 6 になります。同じ「あ」でも、文字コードによって保存される数の並びが違います。だから、書いたときと違う文字コードで読もうとすると、数の並びを正しく文字に戻せず、エラーや文字化けが起きるのです。",
      xp: 15,
    },
    {
      id: "r41-rstrip",
      title: "rstrip の引数のあるなし",
      intro: "\"とり\\t\\n\\n\\n\" は、とり・タブ・改行3つ の順に並んだ文字列です。",
      code: 's = "とり\\t\\n\\n\\n"\nprint(repr(s.rstrip()))\nprint(repr(s.rstrip("\\n")))',
      choices: ["'とり\\t'\n'とり'", "'とり'\n'とり\\t\\n\\n'", "'とり'\n'とり\\t'"],
      answer: 2,
      explain:
        "引数なしの rstrip() は、右端にあるタブや空白や改行をまとめて取りのぞくので 'とり' になります。rstrip(\"\\n\") は改行だけを右端から取りのぞき、タブにぶつかったところで止まるので 'とり\\t' が残ります。改行が3つあっても全部消えるので、「1つだけ消す」わけではないことにも注意しましょう。readline() の行には改行が多くても1つしかないので、rstrip(\"\\n\") で十分です。",
      xp: 15,
    },
  ],
  explain: {},
  topics: [],
  refSections: 12,
  refProse: 4326,
};
