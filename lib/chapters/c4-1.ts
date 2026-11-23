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
    "l41-countlines",
    "l41-read",
    "l41-countchar",
    "l41-with",
    "l41-write",
    "l41-append",
    "l41-numbered",
    "l41-encoding",
    "l41-rstrip",
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
      task: "ファイル名 name と1文字 ch を受け取り、そのファイルの中に ch が何回出てくるかを返す関数 count_in_file(name, ch) を作ろう。read() でまとめて読み、return する前にファイルを閉じます。",
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
      task: "最初のコードは、「さくら」を Shift_JIS（encoding=\"shift_jis\"）で sj41.txt に書き込みます。このファイルを正しい文字コードを指定して開き、read() で中身を表示しよう。",
      starter:
        'with open("sj41.txt", "w", encoding="shift_jis") as f:\n    f.write("さくら")\n\n# ここに、sj41.txt を読んで表示するコードを書こう\n',
      solution:
        'with open("sj41.txt", "w", encoding="shift_jis") as f:\n    f.write("さくら")\n\nwith open("sj41.txt", "r", encoding="shift_jis") as f:\n    print(f.read())',
      wrong:
        'with open("sj41.txt", "w", encoding="shift_jis") as f:\n    f.write("さくら")\n\nwith open("sj41.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
      expect: "さくら",
      mustInclude: ["read"],
      hints: ["書いたときと同じ encoding=\"shift_jis\" を指定して開きます。", "with open(\"sj41.txt\", \"r\", encoding=\"shift_jis\") as f: の中で print(f.read()) です。"],
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
  ],
  reads: [
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
      code: 'with open("r41b.txt", "w", encoding="utf-8") as f:\n    f.write("A\\nB\\n")\n\nwith open("r41b.txt", "r", encoding="utf-8") as f:\n    print(repr(f.readline()))\n    print(repr(f.readline()))\n    print(repr(f.readline()))',
      choices: ["'A'\n'B'\n''", "'A\\n'\n'B\\n'\n'B\\n'", "'A\\n'\n'B\\n'\n''"],
      answer: 2,
      explain:
        "readline() が返す行には、行の終わりの改行 \\n が付いたままです。だから1回目は 'A\\n'、2回目は 'B\\n' になります。2行しかないので、3回目はもう読むものがなく、空の文字列 '' が返ります。最後の行をくり返すわけではありません。この '' を合図にすると、ファイルの終わりが分かります。",
      xp: 15,
    },
    {
      id: "r41-read-twice",
      title: "read を2回呼ぶ",
      intro: "read() は読む位置を最後まで進めます。2回目に何が残っているかを考えよう。",
      code: 'with open("r41c.txt", "w", encoding="utf-8") as f:\n    f.write("abc")\n\nwith open("r41c.txt", "r", encoding="utf-8") as f:\n    s1 = f.read()\n    s2 = f.read()\nprint(len(s1), len(s2))',
      choices: ["3 3", "3 0", "0 3"],
      answer: 1,
      explain:
        "1回目の read() で、ファイルの3文字がすべて読まれ、読む位置はファイルの終わりまで進みます。2回目の read() では、もう残りがないので空の文字列になり、長さは 0 です。もう一度最初から読みたいときは、ファイルを開き直します。3 3 を選んだ人は、read() が毎回最初から読むと考えていたのかもしれません。",
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
      intro: "\"ねこ \\n\\n\" は、ねこ・空白・改行・改行 の順に並んだ文字列です。",
      code: 's = "ねこ \\n\\n"\nprint(repr(s.rstrip()))\nprint(repr(s.rstrip("\\n")))',
      choices: ["'ねこ '\n'ねこ'", "'ねこ'\n'ねこ '", "'ねこ'\n'ねこ \\n'"],
      answer: 1,
      explain:
        "引数なしの rstrip() は、右端にある空白や改行をまとめて取りのぞくので 'ねこ' になります。rstrip(\"\\n\") は改行だけを右端から取りのぞき、空白にぶつかったところで止まるので 'ねこ ' が残ります。改行が2つあっても両方消えるので、「1つだけ消す」わけではないことにも注意しましょう。readline() の行には改行が多くても1つしかないので、rstrip(\"\\n\") で十分です。",
      xp: 15,
    },
  ],
  explain: {
    "l41-open": [
      { h: "ファイルを開く" },
      { p: "これまでのプログラムは、実行が終わると変数の中身が消えてしまいました。ファイルに書いておけば、データを残しておいたり、ほかのプログラムに渡したりできます。ファイルを扱うには、まず open() でファイルを開き、返ってきたファイルオブジェクトを変数に入れます。このオブジェクトが、ファイルを読み書きするための窓口になります。" },
      { p: "open の1つめの引数はファイル名です。ファイル名だけを書くと、今プログラムが動いている場所（くわしくは 4-3）にあるファイルを指します。ほかの場所にあるファイルは、\"data/memo.txt\" のように、どのフォルダの中にあるかも含めて書きます。" },
      { p: "このアプリのファイル置き場は、ブラウザの中にある仮のものです。ページを開き直すと消えてしまうので、この章の問題では、ファイルを作るところから毎回やり直す形にしています。encoding=\"utf-8\" は日本語を正しく扱うための指定で、この章のあとのほうで説明します。" },
      { h: "モード" },
      { p: "2つめの引数はモードで、ファイルをどう使うかを表します。\"r\" は読み込み、\"w\" は書き込み、\"a\" は追記です。モードを省くと \"r\" になります。読み込みモードで開いたファイルには書けず、書き込みモードで開いたファイルからは読めません。" },
      { code: 'f = open("ex41-a.txt", "w", encoding="utf-8")\nf.write("メモ")\nf.close()\n\nf = open("ex41-a.txt", encoding="utf-8")  # モードを省くと "r"\nprint(f.read())\nf.close()', out: "メモ" },
      { h: "ファイルを閉じる" },
      { p: "使い終わったファイルは close() で閉じます。開いたままにしておくと、そのファイルはまだ使用中だとみなされます。パソコンによっては、使用中のファイルはほかのアプリから消したり書きかえたりできません。また、書き込んだ内容が、閉じるまでファイルに反映されないこともあります。" },
      { p: "close() は書き忘れやすいので、あとで学ぶ with 文を使うと安心です。" },
    ],
    "l41-readline": [
      { h: "1行ずつ読む" },
      { p: "readline() は、呼ぶたびに次の1行を返します。ファイルオブジェクトは「今どこまで読んだか」を覚えていて、読んだぶんだけ位置が先に進みます。本にしおりをはさみながら読み進めるようなものです。進んだ位置は戻らないので、最初から読み直したいときは、ファイルを開き直します。" },
      { p: "ここでいう1行とは、改行の次の文字から、次の改行までのことです。返ってくる文字列には、その改行も含まれます。ただし、ファイルの最後の行が改行で終わっていない場合は、改行の付かない文字列が返ります。" },
      { code: 'with open("ex41-b.txt", "w", encoding="utf-8") as f:\n    f.write("一\\n二")\n\nf = open("ex41-b.txt", "r", encoding="utf-8")\nprint(repr(f.readline()))\nprint(repr(f.readline()))\nf.close()', out: "'一\\n'\n'二'" },
      { p: "repr() は、文字列を引用符付きで、改行も \\n と見える形で表示する関数です。ファイルから読んだ文字列に何が入っているのか確かめたいときに便利です。" },
    ],
    "l41-countlines": [
      { h: "終わりまで読むくり返し" },
      { p: "readline() は、もう読むものがないときに空の文字列 \"\" を返します。空の行を読んだときは \"\\n\" が返るので、\"\" と区別できます。そこで、while True: で読み続け、\"\" が返ってきたら break でくり返しを抜けると、ファイルの終わりまで漏れなく読めます。" },
      { code: 'with open("ex41-c.txt", "w", encoding="utf-8") as f:\n    f.write("赤\\n\\n青\\n")\n\nf = open("ex41-c.txt", "r", encoding="utf-8")\nwhile True:\n    line = f.readline()\n    if line == "":\n        break\n    print(repr(line))\nf.close()', out: "'赤\\n'\n'\\n'\n'青\\n'" },
      { p: "2行目は何も書かれていない行ですが、改行が1つ入っているので \"\\n\" として読まれ、くり返しは止まりません。行の数を数えるときは、break の前ではなく、1行読めたあとに数を1つ増やします。数え終わったら、ファイルを閉じてから結果を返しましょう。" },
    ],
    "l41-read": [
      { h: "まとめて読む" },
      { p: "read() は、今の位置からファイルの終わりまでを、1つの文字列にして返します。ファイル全体を一度に扱いたいときに便利です。改行もそのまま入っているので、len() で数えると改行も1文字に数えられます。" },
      { p: "read() も readline() と同じく、読んだぶんだけ位置が進みます。一度 read() で終わりまで読むと、もう読むものは残っていないので、2回目の read() は空の文字列を返します。readline() で数行読んだあとに read() すると、残りの部分だけが返ります。" },
      { code: 'with open("ex41-d.txt", "w", encoding="utf-8") as f:\n    f.write("1行目\\n2行目\\n3行目\\n")\n\nf = open("ex41-d.txt", "r", encoding="utf-8")\nf.readline()\nprint(repr(f.read()))\nprint(repr(f.read()))\nf.close()', out: "'2行目\\n3行目\\n'\n''" },
      { p: "とても大きなファイルを read() でまとめて読むと、たくさんのメモリを使います。そういうときは readline() で少しずつ読むほうが向いています。" },
    ],
    "l41-countchar": [
      { h: "読んでから、文字列として調べる" },
      { p: "ファイルの中身を read() で文字列にしてしまえば、あとはふつうの文字列と同じです。len() で文字数を、count() である文字の数を、find() で位置を調べられます。ファイルを相手にする仕事も、「読む」と「文字列を調べる」の2段階に分けて考えると分かりやすくなります。" },
      { h: "閉じてから返す" },
      { p: "関数の中で return が実行されると、関数はそこで終わり、うしろの行は動きません。return のあとに close() を書いても閉じられないので、結果を変数に入れて、閉じてから return します。" },
      { code: 'def char_count(name):\n    f = open(name, "r", encoding="utf-8")\n    s = f.read()\n    f.close()\n    return len(s)\n\nwith open("ex41-e.txt", "w", encoding="utf-8") as f:\n    f.write("あいう\\n")\nprint(char_count("ex41-e.txt"))', out: "4" },
      { p: "改行も1文字として数えるので、「あいう」と改行で 4 になります。" },
    ],
    "l41-with": [
      { h: "with 文のしくみ" },
      { p: "with open(...) as f: と書くと、open で開いたファイルオブジェクトが as のうしろの変数 f に入ります。その下の字下げしたブロックの中で、f を使って読み書きします。ブロックを抜けたところで、Python が自動で close() してくれます。" },
      { p: "途中でエラーが起きてブロックから飛び出したときも、ファイルはきちんと閉じられます。自分で close() を書くと、エラーが起きたときに close() までたどり着かないことがありますが、with 文ならその心配がありません。そのため、ファイルを扱うときは with 文を使うのがふつうです。" },
      { code: 'with open("ex41-f.txt", "w", encoding="utf-8") as f:\n    f.write("with で書いた")\n    print(f.closed)\nprint(f.closed)', out: "False\nTrue" },
      { p: "ブロックの中では False（まだ開いている）、ブロックを抜けると True（閉じた）になっています。閉じたあとの f で読み書きしようとするとエラーになるので、ファイルを使う処理はすべてブロックの中に書きます。" },
    ],
    "l41-write": [
      { h: "print でファイルに書く" },
      { p: "print は、ふだんは画面に表示しますが、キーワード引数 file= に書き込みモードで開いたファイルを渡すと、そのファイルへ書き出します。画面に出すときと同じく、最後に改行が付き、sep= や end= も使えます。" },
      { code: 'with open("ex41-g.txt", "w", encoding="utf-8") as f:\n    print("いち", "に", sep=", ", file=f)\n    print("さん", end="!", file=f)\n\nwith open("ex41-g.txt", "r", encoding="utf-8") as f:\n    print(repr(f.read()))', out: "'いち, に\\nさん!'" },
      { h: "write でそのまま書く" },
      { p: "ファイルオブジェクトの write() は、渡した1つの文字列をそのまま書き込みます。print と違って、改行は自動で付かないので、行を分けたいときは \\n を自分で入れます。数を書くときは、str() で文字列にしてから渡します。" },
      { p: "\\n はエスケープシーケンス（2-1）の1つで、改行を表します。ほかに、タブを表す \\t などもあります。" },
      { h: "\"w\" は上書き" },
      { p: "\"w\" で開いた時点で、そのファイルにあった中身は消えます。大事なファイルの名前を書きまちがえて \"w\" で開くと、中身を失ってしまうので気をつけましょう。この問題では、ファイルに書かれた結果を、あとから読み直して判定しています。" },
    ],
    "l41-append": [
      { h: "うしろに書き足す" },
      { p: "\"a\" は append（付け足す）の頭文字です。追記モードで開いて書いた内容は、すでにある中身の最後に足されます。前の内容は消えません。ファイルがまだないときは、新しく作ってから書きます。" },
      { code: 'with open("ex41-h.txt", "w", encoding="utf-8") as f:\n    f.write("朝ごはん\\n")\nfor food in ["昼ごはん", "夜ごはん"]:\n    with open("ex41-h.txt", "a", encoding="utf-8") as f:\n        f.write(food + "\\n")\n\nwith open("ex41-h.txt", "r", encoding="utf-8") as f:\n    print(f.read(), end="")', out: "朝ごはん\n昼ごはん\n夜ごはん" },
      { p: "\"w\" と \"a\" の違いは、開いたときに中身を消すかどうかです。毎回同じ結果を作り直したいときは \"w\"、記録をためていきたいときは \"a\" を選びます。" },
    ],
    "l41-numbered": [
      { h: "読みながら書く" },
      { p: "with 文には、open(...) as 名前 をカンマで区切って複数並べられます。読み込み用と書き込み用の2つを同時に開いておけば、1行読んで加工して書く、をくり返せます。ブロックを抜けると、どちらのファイルも閉じられます。" },
      { p: "with 文を入れ子にして、外側で読み込み用、内側で書き込み用を開いても同じことができます。字下げが深くなるので、並べて書くほうが読みやすいことが多いです。" },
      { code: 'with open("ex41-i.txt", "w", encoding="utf-8") as f:\n    f.write("hello\\nworld\\n")\n\nwith open("ex41-i.txt", "r", encoding="utf-8") as src, open("ex41-j.txt", "w", encoding="utf-8") as dst:\n    dst.write(src.read().upper())\n\nwith open("ex41-j.txt", "r", encoding="utf-8") as f:\n    print(f.read(), end="")', out: "HELLO\nWORLD" },
      { p: "この例は、ファイル全体を大文字にしてコピーしています。行ごとに違う加工をしたいときは、readline() で1行ずつ読んで書き出します。入力ファイルと同じ名前を出力ファイルにすると、\"w\" で開いた時点で中身が消えてしまうので、必ず別の名前にしましょう。" },
    ],
    "l41-encoding": [
      { h: "文字コードとは" },
      { p: "ファイルには、文字そのものではなく、文字を表す数の並び（バイト）が保存されます。どの文字をどの数にするかの決まりが文字コードです。半角の英数字は UTF-8 でも Shift_JIS でも同じ数になりますが、日本語は文字コードによってまったく違う数になります。" },
      { p: "open で開くとき、ファイルはふつうテキストモード（文字として読み書きするモード）で開かれ、指定した文字コードで数と文字を変換します。文字コードを省くと、そのパソコンの決まった文字コードが使われます。これまでの Python では、Windows なら Shift_JIS、macOS や Linux なら UTF-8 になっていることが多く、同じプログラムでもパソコンによって結果が変わる原因になっていました（Python 3.15 からは、省いたときも UTF-8 が使われます）。" },
      { code: 'with open("ex41-k.txt", "w", encoding="shift_jis") as f:\n    f.write("ねこ")\ntry:\n    with open("ex41-k.txt", "r", encoding="utf-8") as f:\n        print(f.read())\nexcept UnicodeDecodeError:\n    print("UTF-8 としては読めません")\nwith open("ex41-k.txt", "r", encoding="shift_jis") as f:\n    print(f.read())', out: "UTF-8 としては読めません\nねこ" },
      { p: "try と except は、エラーが起きたときに止まらず別の処理をするための書き方です（ここでは結果を見せるために使っています）。Shift_JIS で書いたファイルを UTF-8 として読もうとすると、UnicodeDecodeError というエラーになります。" },
      { p: "日本語を含むファイルを扱うときは、書くときも読むときも encoding= を指定しましょう。Python では UTF-8 がよく使われるので、特に理由がなければ encoding=\"utf-8\" にそろえておくのがおすすめです。" },
    ],
    "l41-rstrip": [
      { h: "改行を取りのぞく" },
      { p: "ファイルから読んだ行には改行が付いているので、そのまま print すると、行の改行と print の改行が重なって、1行おきに空の行ができます。表示する前に、行の終わりの改行を取りのぞきましょう。" },
      { p: "2-1 で学んだ rstrip() は、文字列の右端から空白文字を取りのぞきます。引数なしだと、改行だけでなくスペースやタブも消えます。行の終わりの空白に意味があるときは、rstrip(\"\\n\") のように取りのぞく文字を指定します。" },
      { code: 's = "a b \\n"\nprint(repr(s.rstrip()))\nprint(repr(s.rstrip("\\n")))', out: "'a b'\n'a b '" },
      { p: "rstrip(\"\\n\") は、右端に続く改行をすべて取りのぞくので、改行がいくつあっても全部消えます。readline() で読んだ行には、改行は多くても1つしかないので、この使い方で問題ありません。print に end=\"\" を付けて、print の改行のほうを止めるやり方もあります。" },
    ],
  },
  topics: [
    ["ファイルのオープン", ["l41-open"]],
    ["ファイルのクローズ", ["l41-open", "r41-closed"]],
    ["行の読み込み", ["l41-readline", "r41-readline"]],
    ["練習: 行の数を数える関数", ["l41-countlines"]],
    ["ファイル全体の読み込み", ["l41-read", "r41-read-twice"]],
    ["練習: ファイルの中の文字を数える関数", ["l41-countchar"]],
    ["編集中のファイルの動作", ["r41-closed", "l41-open"]],
    ["ファイルに対するwith文", ["l41-with"]],
    ["ファイルへの書き込み", ["l41-write", "l41-append", "r41-write", "r41-append"]],
    ["練習: 行番号を付けて書き出す関数", ["l41-numbered"]],
    ["ファイルの読み書きにおける文字コード指定", ["l41-encoding", "r41-bytes"]],
    ["改行文字の削除", ["l41-rstrip", "r41-rstrip"]],
  ],
  refSections: 12,
  refProse: 4326,
};
