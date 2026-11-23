import type { Chapter } from "./types.ts";

// 付録：CSVファイルの入出力。ファイルは毎回書いてから読む(ブラウザの中の仮のファイル置き場)。
const SCORES = 'with open("scores-csv.csv", "w", encoding="utf-8") as f:\n    f.write("80,72,95\\n60,88,70\\n")\n\n';
const SHOP = 'with open("shop-csv.csv", "w", encoding="utf-8") as f:\n    f.write("りんご,120,3\\nみかん,50,10\\n")\n\n';
const TEMPS = 'with open("temp-csv.csv", "w", encoding="utf-8") as f:\n    f.write("月,気温\\n1,5.2\\n2,6.1\\n3,9.4\\n")\n\n';
const MONTHLY =
  'import csv\n\n# 3年分の、月ごとの気温の記録を作る（年, 月, 気温 の3列）\nwith open("monthly-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    for year in [2021, 2022, 2023]:\n        for month in range(1, 13):\n            w.writerow([year, month, round(5 + month * 2 + (year - 2021) * 0.3, 1)])\n\n';
const PEOPLE =
  'import csv\n\nwith open("people-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["名前", "年れい", "町"])\n    w.writerow(["ぴよ", 3, "北町"])\n    w.writerow(["ミケ", 5, "南町"])\n\n';

export const chapter: Chapter = {
  ref: "A-csv",
  title: "付録：CSVファイルの入出力",
  url: "https://utokyo-ipp.github.io/appendix/4-csv.html",
  stage: "write",
  order: ["csv-line", "csv-reader", "csv-for", "csv-with", "csv-writer", "csv-july", "csv-extract", "csv-rowsum"],
  lessons: [
    {
      id: "csv-line",
      title: "CSV の1行を作る",
      intro: [
        "CSV は、値をカンマ , で区切って並べた文字のファイルです。1行が表の1行、カンマで区切られた1つ1つが表のマス（セル）にあたります。",
        "\",\".join(リスト) は、文字列のリストの間に , をはさんで、1つの文字列にします。",
      ],
      example: 'print(",".join(["A", "B", "C"]))',
      task: "文字列のリスト row を受け取り、要素をカンマでつないだ CSV の1行（文字列）を返す関数 to_csv_line(row) を作ろう。",
      starter: "def to_csv_line(row):\n    pass\n",
      solution: 'def to_csv_line(row):\n    return ",".join(row)',
      wrong: 'def to_csv_line(row):\n    return ", ".join(row)',
      expect: "名前,点数\nぴよ,80\nx",
      test: 'print(to_csv_line(["名前", "点数"]))\nprint(to_csv_line(["ぴよ", "80"]))\nprint(to_csv_line(["x"]))',
      mustInclude: ["return"],
      hints: ["\",\".join(row) で、要素の間に , が入った文字列ができます。", "return \",\".join(row) です。\", \" のように空白を入れると、CSV の値に空白がまざってしまいます。"],
      xp: 20,
    },
    {
      id: "csv-reader",
      title: "csv.reader で読む",
      intro: [
        "csv モジュールの csv.reader(ファイルオブジェクト) で、CSV を読むための道具（CSV リーダ）が作れます。next(リーダ) を呼ぶたびに、1行ぶんの値が文字列のリストで返ってきます。",
        "読んだ値は数に見えても文字列です。計算するときは int() や float() で数に変えます。",
      ],
      example: 'import csv\n\nwith open("ab-csv.csv", "w", encoding="utf-8") as f:\n    f.write("1,2\\n")\nwith open("ab-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    print(next(reader))',
      task: "scores-csv.csv の1行目を next() で読み、そのリストを表示しよう。続けて、その行の0番目と2番目（0 から数えた番号）の値を整数にして足した結果を表示しよう。",
      starter: "import csv\n\n" + SCORES + 'with open("scores-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    # ここに書こう\n',
      solution: "import csv\n\n" + SCORES + 'with open("scores-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    row = next(reader)\n    print(row)\n    print(int(row[0]) + int(row[2]))',
      wrong: "import csv\n\n" + SCORES + 'with open("scores-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    row = next(reader)\n    print(row)\n    print(row[0] + row[2])',
      expect: "['80', '72', '95']\n175",
      mustInclude: ["next("],
      hints: ["row = next(reader) で1行目がリストになります。", "row[0] と row[2] は文字列なので、int(row[0]) + int(row[2]) のように整数にしてから足します。"],
      xp: 25,
    },
    {
      id: "csv-for",
      title: "for 文で全部の行を読む",
      intro: [
        "CSV リーダは for 文の in のうしろに書けます。for row in reader: と書くと、1行ずつ row にリストが入って、ブロックが実行されます。",
      ],
      example: 'import csv\n\nwith open("ab-csv.csv", "w", encoding="utf-8") as f:\n    f.write("1,2\\n3,4\\n")\nwith open("ab-csv.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        print(row)',
      task: "shop-csv.csv の各行は「品名, 値段, 個数」です。for 文で1行ずつ読み、品名と「値段 × 個数」の金額を、空白で区切って1行ずつ表示しよう。",
      starter: "import csv\n\n" + SHOP + 'with open("shop-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    # ここに書こう\n',
      solution: "import csv\n\n" + SHOP + 'with open("shop-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row[0], int(row[1]) * int(row[2]))',
      wrong: "import csv\n\n" + SHOP + 'with open("shop-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row[0], row[1] * int(row[2]))',
      expect: "りんご 360\nみかん 500",
      mustInclude: ["for"],
      hints: ["for row in reader: の中で、row[0] が品名、row[1] が値段、row[2] が個数です。", "print(row[0], int(row[1]) * int(row[2])) と書きます。"],
      xp: 25,
    },
    {
      id: "csv-with",
      title: "見出しの行を飛ばして平均を出す",
      intro: [
        "CSV の1行目には、列の名前（見出し）が入っていることがよくあります。for 文の前に next(リーダ) を1回呼んでおくと、見出しの行を読み飛ばせます。",
      ],
      example: 'import csv\n\nwith open("ab-csv.csv", "w", encoding="utf-8") as f:\n    f.write("x\\n1\\n2\\n")\nwith open("ab-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    next(reader)\n    for row in reader:\n        print(row)',
      task: "temp-csv.csv は、1行目が見出しで、2行目から「月, 気温」が並んでいます。with 文の中で見出しを飛ばして気温を全部読み、平均気温を round(平均, 1) で表示しよう。",
      starter: "import csv\n\n" + TEMPS + "# ここに書こう\n",
      solution: "import csv\n\n" + TEMPS + 'with open("temp-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    next(reader)\n    total = 0\n    count = 0\n    for row in reader:\n        total += float(row[1])\n        count += 1\nprint(round(total / count, 1))',
      wrong: "import csv\n\n" + TEMPS + 'with open("temp-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    next(reader)\n    total = 0\n    count = 0\n    for row in reader:\n        total += float(row[1])\n        count += 1\nprint(round(total / 4, 1))',
      expect: "6.9",
      mustInclude: ["with", "float"],
      hints: ["reader = csv.reader(f) のあと next(reader) で見出しを飛ばします。気温は小数なので float(row[1]) で数にします。", "合計 total と個数 count を数えて、print(round(total / count, 1)) です。"],
      xp: 25,
    },
    {
      id: "csv-writer",
      title: "csv.writer で書く",
      intro: [
        "csv.writer(ファイルオブジェクト) で、CSV を書くための道具（CSV ライター）が作れます。writerow(リスト) で、リストの値をカンマで区切った1行が書き込まれます。",
        "CSV を書くときは、open に newline=\"\" を付けます。日本語を書くなら encoding=\"utf-8\" も付けます。",
      ],
      example: 'import csv\n\nwith open("ab-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow([1, 2, 3])\nwith open("ab-csv.csv", "r", encoding="utf-8") as f:\n    print(f.read(), end="")',
      task: "result-csv.csv を書き込みモードで開き、csv.writer で「名前,点数」「ぴよ,80」「ミケ,95」の3行を書き込もう。点数は数の 80, 95 のまま渡してかまいません。書いたあとのファイルの中身で判定します。",
      starter: 'import csv\n\nwith open("result-csv.csv", "w", encoding="utf-8", newline="") as f:\n    pass  # ここを書きかえよう\n',
      solution: 'import csv\n\nwith open("result-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["名前", "点数"])\n    w.writerow(["ぴよ", 80])\n    w.writerow(["ミケ", 95])',
      wrong: 'import csv\n\nwith open("result-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["名前", "点数", "ぴよ", 80, "ミケ", 95])',
      expect: "名前,点数\nぴよ,80\nミケ,95",
      test: 'with open("result-csv.csv", "r", encoding="utf-8") as g:\n    print(g.read(), end="")',
      hints: ["w = csv.writer(f) でライターを作り、w.writerow([\"名前\", \"点数\"]) のように1行ずつ書きます。", "1行に1回 writerow を呼びます。全部を1つのリストにすると、1行にまとまってしまいます。"],
      xp: 25,
    },
    {
      id: "csv-july",
      title: "長い記録から決まった行を取り出す",
      intro: [
        "何年分もの記録が入った CSV から、必要な行だけを取り出すことはよくあります。for 文で1行ずつ読み、if 文で条件に合う行だけを選びます。",
      ],
      example: 'row = ["2021", "7", "19.0"]\nif row[1] == "7":\n    print("7月の行です")',
      task: "monthly-csv.csv には「年, 月, 気温」が3年分（36行）入っています。月が 7 の行だけを選んで、年と気温を空白で区切って表示しよう。",
      starter: MONTHLY + "# ここに書こう\n",
      solution: MONTHLY + 'with open("monthly-csv.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        if row[1] == "7":\n            print(row[0], row[2])',
      wrong: MONTHLY + 'with open("monthly-csv.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        if row[1] == 7:\n            print(row[0], row[2])',
      expect: "2021 19.0\n2022 19.3\n2023 19.6",
      mustInclude: ["csv.reader", "if"],
      hints: ["CSV から読んだ値は文字列なので、月は row[1] == \"7\"（または int(row[1]) == 7）とくらべます。", "条件に合ったら print(row[0], row[2]) で年と気温を表示します。"],
      xp: 30,
    },
    {
      id: "csv-extract",
      title: "練習: 列をしぼった CSV を作る",
      intro: [
        "読み込み用と書き込み用のファイルを同時に開けば、CSV を1行ずつ読みながら、必要な列だけを選んで新しい CSV に書き出せます。",
      ],
      example: 'row = ["ぴよ", "3", "北町"]\nprint([row[0], row[2]])',
      task: "people-csv.csv は「名前, 年れい, 町」の3列です。これを読んで、名前と町の2列だけにした CSV を town-csv.csv に書き出そう（見出しの行も同じように2列にします）。書いたあとのファイルの中身で判定します。",
      starter: PEOPLE + "# ここに書こう\n",
      solution:
        PEOPLE +
        'with open("people-csv.csv", "r", encoding="utf-8") as src, open("town-csv.csv", "w", encoding="utf-8", newline="") as dst:\n    w = csv.writer(dst)\n    for row in csv.reader(src):\n        w.writerow([row[0], row[2]])',
      wrong:
        PEOPLE +
        'with open("people-csv.csv", "r", encoding="utf-8") as src, open("town-csv.csv", "w", encoding="utf-8", newline="") as dst:\n    w = csv.writer(dst)\n    for row in csv.reader(src):\n        w.writerow([row[0], row[1]])',
      expect: "名前,町\nぴよ,北町\nミケ,南町",
      test: 'with open("town-csv.csv", "r", encoding="utf-8") as g:\n    print(g.read(), end="")',
      hints: ["people-csv.csv を \"r\" で、town-csv.csv を \"w\" と newline=\"\" で開き、csv.reader と csv.writer をそれぞれ作ります。", "for row in csv.reader(src): の中で w.writerow([row[0], row[2]]) と書きます。"],
      xp: 30,
    },
    {
      id: "csv-rowsum",
      title: "練習: 行ごとの合計を返す関数",
      intro: [
        "CSV の値は文字列なので、計算に使う前に1つずつ int() で整数に変えます。行ごとにリストを作って、それをさらにリストに集めると、表全体を「リストのリスト」として扱えます。",
      ],
      example: 'row = ["1", "2", "3"]\nnums = []\nfor x in row:\n    nums.append(int(x))\nprint(nums)',
      task: "整数だけが入った CSV ファイルの名前 name を受け取り、各行の値の合計を、行の順に並べたリストで返す関数 row_totals(name) を作ろう。",
      starter: "import csv\n\ndef row_totals(name):\n    pass\n",
      solution:
        'import csv\n\ndef row_totals(name):\n    totals = []\n    with open(name, "r", encoding="utf-8") as f:\n        for row in csv.reader(f):\n            s = 0\n            for x in row:\n                s += int(x)\n            totals.append(s)\n    return totals',
      wrong:
        'import csv\n\ndef row_totals(name):\n    totals = []\n    with open(name, "r", encoding="utf-8") as f:\n        for row in csv.reader(f):\n            s = 0\n            for x in row:\n                s += int(x)\n    totals.append(s)\n    return totals',
      expect: "[6, 60, 0]",
      test: 'with open("sum-csv.csv", "w", encoding="utf-8") as g:\n    g.write("1,2,3\\n10,20,30\\n0,0,0\\n")\nprint(row_totals("sum-csv.csv"))',
      mustInclude: ["return"],
      hints: ["行ごとに合計 s = 0 から始め、for x in row: で s += int(x) と足していきます。", "1行の合計が出たら totals.append(s) で集め、最後に return totals です。append の字下げの位置に注意します。"],
      xp: 30,
    },
  ],
  reads: [
    {
      id: "rcsv-str",
      title: "CSV の値は文字列",
      intro: "csv.reader で読んだ値は、どれも文字列です。+ が何をするか考えよう。",
      code: 'import csv\n\nwith open("rcsv-a.csv", "w", encoding="utf-8") as f:\n    f.write("1,2\\n")\nwith open("rcsv-a.csv", "r", encoding="utf-8") as f:\n    row = next(csv.reader(f))\nprint(row[0] + row[1])\nprint(int(row[0]) + int(row[1]))',
      choices: ["3\n3", "12\n3", "12\n12"],
      answer: 1,
      explain:
        "CSV リーダが返すリストの中身は、数に見えても文字列の '1' と '2' です。文字列どうしの + はつなげる計算なので、1行目は 12 になります。int() で整数に変えてから足すと、ふつうの足し算になって 3 です。CSV の値で計算するときは、必ず int() や float() で数にしましょう。",
      xp: 15,
    },
    {
      id: "rcsv-quote",
      title: "カンマを含む値を書くと",
      intro: "値の中にカンマがあると、区切りのカンマと見分けがつかなくなります。csv.writer はどうするでしょう。",
      code: 'import csv\n\nwith open("rcsv-b.csv", "w", encoding="utf-8", newline="") as f:\n    csv.writer(f).writerow(["1,000", "円"])\nwith open("rcsv-b.csv", "r", encoding="utf-8") as f:\n    print(f.read(), end="")\nwith open("rcsv-b.csv", "r", encoding="utf-8") as f:\n    print(next(csv.reader(f)))',
      choices: ['"1,000",円\n[\'1,000\', \'円\']', "1,000,円\n['1', '000', '円']", "1,000,円\n['1,000', '円']"],
      answer: 0,
      explain:
        "csv.writer は、値の中にカンマがあると、その値を \" \" で囲んで書きます。こうしておくと、読むときに csv.reader が「この中のカンマは区切りではない」と分かり、'1,000' を1つの値に戻せます。自分で \",\".join() を使って書くとこの工夫がないので、カンマを含むデータがあるときは csv モジュールを使うのが安全です。",
      xp: 15,
    },
  ],
  explain: {
    "csv-line": [
      { h: "CSV 形式とは" },
      { p: "CSV は comma-separated values（カンマで区切った値）の略です。表計算ソフトの表のように、行と列に並んだデータを、ただの文字だけで保存する形式です。1行が表の1行に、カンマで区切られた1つ1つの値が1つのマスにあたります。Excel などの表計算ソフトでも開けるので、データのやりとりによく使われます。" },
      { p: "たとえば、部活の名簿を「ID・名前・出身地」の表にしたものは、CSV では次のような文字になります。1行目に列の名前（見出し）を入れておくことがよくあります。" },
      { code: 'rows = [["ID", "名前", "出身地"], ["m1", "田中", "札幌"], ["m2", "佐藤", "福岡"]]\nfor row in rows:\n    print(",".join(row))', out: "ID,名前,出身地\nm1,田中,札幌\nm2,佐藤,福岡" },
      { p: "見た目はただの文字なので、メモ帳のようなアプリでも中身を読めます。ただし、値の中にカンマや改行が入っていると区切りと区別がつかなくなるので、そういう値は \" で囲むという決まりがあります。こうした細かい決まりは csv モジュールが面倒を見てくれます。" },
    ],
    "csv-reader": [
      { h: "CSV リーダ" },
      { p: "csv モジュールの csv.reader() に、開いたファイルオブジェクトを渡すと、CSV リーダが返ってきます。CSV リーダは、CSV ファイルから1行ずつデータを取り出してくれる道具です。カンマで区切る作業はリーダがやってくれるので、自分で split(\",\") する必要はありません。" },
      { p: "CSV リーダは、4-2 で学ぶイテレータの一種で、next() を呼ぶたびに次の1行を文字列のリストにして返します。ファイルの最後まで読んだあとにさらに next() を呼ぶと、StopIteration というエラーになります。" },
      { code: 'import csv\n\nwith open("ex-csv-a.csv", "w", encoding="utf-8") as f:\n    f.write("11,12,13\\n21,22,23\\n")\nwith open("ex-csv-a.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    print(next(reader))\n    row = next(reader)\n    print(row[1], int(row[1]) + 1)', out: "['11', '12', '13']\n22 23" },
      { p: "読み出した値はすべて文字列です。整数なら int()、小数なら float() で数に変えてから計算します。複素数を表す文字列なら complex() も使えます。" },
    ],
    "csv-for": [
      { h: "for 文で読む" },
      { p: "CSV リーダはイテレータなので、for 文の in のうしろに置けます。くり返しのたびに、内部で next() が呼ばれて次の行が row に入り、ブロックが実行されます。ファイルの終わりまで来ると、エラーにならずにくり返しが終わります。next() を自分で何度も書くより、ずっと楽です。" },
      { code: 'import csv\n\nwith open("ex-csv-b.csv", "w", encoding="utf-8") as f:\n    f.write("a,1\\nb,2\\nc,3\\n")\nf = open("ex-csv-b.csv", "r", encoding="utf-8")\nfor row in csv.reader(f):\n    print(row)\nf.close()', out: "['a', '1']\n['b', '2']\n['c', '3']" },
      { p: "with 文を使わずに open したときは、読み終わったら close() でファイルを閉じるのを忘れないようにしましょう。" },
    ],
    "csv-with": [
      { h: "with 文と CSV" },
      { p: "4-1 と同じく、CSV ファイルも with 文で開くと、ブロックを抜けたときに自動で閉じられます。CSV リーダはファイルから少しずつ読むので、リーダを使う for 文は with のブロックの中に書きます。ブロックの外でリーダを使うと、ファイルがもう閉じているのでエラーになります。" },
      { p: "見出しの行がある CSV では、for 文の前に next(reader) を1回呼んで、見出しを読み飛ばします。見出しを数として変換しようとすると、float(\"気温\") のようになって ValueError になるからです。" },
      { code: 'import csv\n\nwith open("ex-csv-c.csv", "w", encoding="utf-8") as f:\n    f.write("名前,点数\\nぴよ,70\\nミケ,90\\n")\nwith open("ex-csv-c.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    header = next(reader)\n    print(header)\n    for row in reader:\n        print(row[0], int(row[1]) + 5)', out: "['名前', '点数']\nぴよ 75\nミケ 95" },
    ],
    "csv-writer": [
      { h: "CSV ライター" },
      { p: "csv.writer() に、書き込みモードで開いたファイルオブジェクトを渡すと、CSV ライターが返ってきます。writerow() に1行ぶんの値のリストを渡すと、カンマで区切って1行書き込みます。数を渡しても、自動で文字にして書いてくれます。writerows() にリストのリストを渡せば、何行もまとめて書けます。" },
      { p: "CSV を書くときは、open に newline=\"\" を付けます。csv モジュールは行の終わりの改行を自分で書くので、こうしておかないと、Windows などで改行が二重になり、1行おきに空の行が入ってしまうことがあります。日本語などを書くときは encoding=\"utf-8\" も指定しましょう。" },
      { code: 'import csv\n\nwith open("ex-csv-d.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerows([["x", "y"], [1, 2], [3, 4]])\nwith open("ex-csv-d.csv", "r", encoding="utf-8") as f:\n    print(f.read(), end="")', out: "x,y\n1,2\n3,4" },
      { p: "書き込みのときも、with 文を使わないなら、最後に close() でファイルを閉じます。閉じないと、書いた内容がファイルに残らないことがあります。" },
    ],
    "csv-july": [
      { h: "実際のデータを読む" },
      { p: "気象庁などが公開しているオープンデータは、CSV でダウンロードできることがよくあります。そうしたファイルは何百行もあり、先頭に説明の行が入っていたり、毎月のデータが並んでいたりします。必要な部分だけを取り出すには、行の番号や列の値を見て、if 文で選びます。" },
      { p: "日本のサイトのデータは、文字コードが Shift_JIS のことがあります。そのときは open に encoding=\"shift_jis\" を指定して読みます（4-1 の文字コードの話を思い出しましょう）。" },
      { code: 'import csv\n\nwith open("ex-csv-e.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    for n in range(1, 25):\n        w.writerow([n, n * 10])\nwith open("ex-csv-e.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        if int(row[0]) % 12 == 7:\n            print(row)', out: "['7', '70']\n['19', '190']" },
      { p: "この例は、1 から 24 までの行番号のうち、12 でわったあまりが 7 の行、つまり12行ごとに1回だけ取り出しています。毎月のデータから毎年の7月だけを選ぶのと同じ考え方です。取り出した値をリストに集めれば、付録の「可視化」で学ぶグラフにすることもできます。" },
    ],
    "csv-extract": [
      { h: "読んで、選んで、書く" },
      { p: "CSV の加工は「1行読む → 必要な値を選ぶ・変える → 1行書く」のくり返しです。読み込み用には csv.reader、書き込み用には csv.writer を作り、for 文の中で writerow() を呼びます。リストの番号で列を選べば、いらない列を落とせます。" },
      { code: 'import csv\n\nwith open("ex-csv-f.csv", "w", encoding="utf-8", newline="") as f:\n    csv.writer(f).writerows([["a", "1", "x"], ["b", "2", "y"]])\nwith open("ex-csv-f.csv", "r", encoding="utf-8") as src, open("ex-csv-g.csv", "w", encoding="utf-8", newline="") as dst:\n    w = csv.writer(dst)\n    for row in csv.reader(src):\n        w.writerow([row[2], row[0]])\nwith open("ex-csv-g.csv", "r", encoding="utf-8") as f:\n    print(f.read(), end="")', out: "x,a\ny,b" },
      { p: "選ぶ番号の順番を変えれば、列の並びを入れかえることもできます。作った CSV は表計算ソフトでも開けるので、確かめてみるとよいでしょう。" },
    ],
    "csv-rowsum": [
      { h: "表をリストのリストにする" },
      { p: "整数だけの CSV を読むとき、行ごとに値を int() で変えたリストを作り、それを外側のリストに append していくと、表全体が「リストのリスト」になります。table[1][2] のように、行の番号と列の番号で値を取り出せるようになり、行ごとや列ごとの計算がしやすくなります。" },
      { code: 'import csv\n\nwith open("ex-csv-h.csv", "w", encoding="utf-8") as f:\n    f.write("1,2\\n3,4\\n")\ntable = []\nwith open("ex-csv-h.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        nums = []\n        for x in row:\n            nums.append(int(x))\n        table.append(nums)\nprint(table)\nprint(table[1][0])', out: "[[1, 2], [3, 4]]\n3" },
      { p: "6-1 で学ぶ内包表記を使うと、[int(x) for x in row] の1行で、行を整数のリストに変えられます。" },
    ],
  },
  topics: [
    ["CSV形式とは", ["csv-line"]],
    ["CSVファイルの読み込み", ["csv-reader", "rcsv-str"]],
    ["CSVファイルに対するfor文", ["csv-for"]],
    ["CSVファイルに対するwith文", ["csv-with"]],
    ["CSVファイルの書き込み", ["csv-writer", "rcsv-quote"]],
    ["東京の7月の気温", ["csv-july"]],
    ["練習: 列をしぼった CSV を作る", ["csv-extract"]],
    ["練習: 行ごとの合計を返す関数", ["csv-rowsum"]],
  ],
  refSections: 8,
  refProse: 2621,
};
