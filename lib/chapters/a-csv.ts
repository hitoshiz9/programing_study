import type { Chapter } from "./types.ts";

// 付録：CSVファイルの入出力。ファイルは毎回書いてから読む(ブラウザの中の仮のファイル置き場)。
const SCORES = 'with open("scores-csv.csv", "w", encoding="utf-8") as f:\n    f.write("名前,点数\\nぴよ,80\\nミケ,95\\nポチ,70\\n")\n\n';
const SHOP = 'with open("shop-csv.csv", "w", encoding="utf-8") as f:\n    f.write("りんご,120,3\\nみかん,50,10\\n")\n\n';
const TEMPS = 'with open("temp-csv.csv", "w", encoding="utf-8") as f:\n    f.write("月,気温\\n1,5.2\\n2,6.1\\n3,9.4\\n")\n\n';
const SALES =
  'import csv\n\n# ある店の3年分の、月ごとの売上の記録を作る（年, 月, 売上 の3列）\nwith open("sales-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    for year in [2021, 2022, 2023]:\n        for month in range(1, 13):\n            w.writerow([year, month, 100 + month * 10 + (year - 2021) * 5])\n\n';
const PEOPLE =
  'import csv\n\nwith open("people-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["名前", "年れい", "町"])\n    w.writerow(["ぴよ", 3, "北町"])\n    w.writerow(["ミケ", 5, "南町"])\n\n';

export const chapter: Chapter = {
  ref: "A-csv",
  title: "付録：CSVファイルの入出力",
  url: "https://utokyo-ipp.github.io/appendix/4-csv.html",
  stage: "write",
  order: ["csv-line", "csv-stop", "csv-close", "csv-with", "csv-writer", "csv-july", "csv-for", "csv-reader", "csv-extract", "csv-rowsum"],
  lessons: [
    {
      id: "csv-close",
      title: "next のくり返しを for 文に直す",
      intro: ["for row in reader: なら、行の数を気にせずに全部の行を読めます。"],
      example: 'import csv\n\nwith open("ab-csv.csv", "w", encoding="utf-8") as f:\n    f.write("1,2\\n")\nf = open("ab-csv.csv", "r", encoding="utf-8")\nfor row in csv.reader(f):\n    print(row)\nf.close()',
      task: "pair-csv.csv は2行のファイルなので、このコードは3回目の next で StopIteration になります。3つの print(next(reader)) を for 文に書きかえて、エラーなしで全部の行のリストを1行ずつ表示しよう。最後の f.close() は残します。",
      starter: 'import csv\n\nwith open("pair-csv.csv", "w", encoding="utf-8") as f:\n    f.write("赤,3\\n青,5\\n")\nf = open("pair-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nprint(next(reader))\nprint(next(reader))\nprint(next(reader))\nf.close()\n',
      solution: 'import csv\n\nwith open("pair-csv.csv", "w", encoding="utf-8") as f:\n    f.write("赤,3\\n青,5\\n")\nf = open("pair-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nfor row in reader:\n    print(row)\nf.close()',
      wrong: 'import csv\n\nwith open("pair-csv.csv", "w", encoding="utf-8") as f:\n    f.write("赤,3\\n青,5\\n")\nf = open("pair-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nfor row in reader:\n    print(row[0])\nf.close()',
      expect: "['赤', '3']\n['青', '5']",
      mustInclude: ["for", "close()"],
      hints: ["3つの print(next(reader)) の行を消して、for row in reader: と書きます。", "for 文の中を字下げして print(row) です。"],
      xp: 20,
    },
    {
      id: "csv-stop",
      title: "next を呼ぶ回数を直す",
      intro: ["ファイルの行の数より多く next を呼ぶと StopIteration になります。"],
      example: 'import csv\n\nwith open("ab-csv.csv", "w", encoding="utf-8") as f:\n    f.write("1,2\\n")\nf = open("ab-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nprint(next(reader))\nf.close()',
      task: "team-csv.csv は3行のファイルなので、このコードは StopIteration で止まり、最後の f.close() まで進みません。next の数を直して、3行全部のリストを1行ずつ表示し、ファイルを閉じるようにしよう。",
      starter: 'import csv\n\nwith open("team-csv.csv", "w", encoding="utf-8") as f:\n    f.write("赤,3\\n青,5\\n白,2\\n")\nf = open("team-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nprint(next(reader))\nprint(next(reader))\nprint(next(reader))\nprint(next(reader))\nf.close()\n',
      solution: 'import csv\n\nwith open("team-csv.csv", "w", encoding="utf-8") as f:\n    f.write("赤,3\\n青,5\\n白,2\\n")\nf = open("team-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nprint(next(reader))\nprint(next(reader))\nprint(next(reader))\nf.close()',
      wrong: 'import csv\n\nwith open("team-csv.csv", "w", encoding="utf-8") as f:\n    f.write("赤,3\\n青,5\\n白,2\\n")\nf = open("team-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nprint(next(reader))\nprint(next(reader))\nf.close()',
      expect: "['赤', '3']\n['青', '5']\n['白', '2']",
      mustInclude: ["close()"],
      hints: ["ファイルは3行なので、next を呼べるのは3回までです。", "4つめの print(next(reader)) の行を消します。"],
      xp: 20,
    },
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
      title: "読んで合計し、結果を書く",
      intro: ["見出しを飛ばして読み、数に変えて足し、結果を別の CSV に書きます。"],
      example: 'import csv\n\nwith open("ab-csv.csv", "w", encoding="utf-8") as f:\n    f.write("x\\n1\\n")\nwith open("ab-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    next(reader)\n    print(next(reader))',
      task: "scores-csv.csv は、1行目が見出し「名前,点数」で、2行目から名前と点数が並んでいます。見出しを next で飛ばし、for 文で点数を全部整数にして足そう。そのあと、csv.writer で total-csv.csv に「合計,（足した数）」の1行を書きこもう。書いたあとのファイルの中身で判定します。",
      starter: "import csv\n\n" + SCORES + "# ここに書こう\n",
      solution:
        "import csv\n\n" +
        SCORES +
        'total = 0\nwith open("scores-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    next(reader)\n    for row in reader:\n        total += int(row[1])\nwith open("total-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["合計", total])',
      wrong:
        "import csv\n\n" +
        SCORES +
        'total = 0\nwith open("scores-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        total += len(row[1])\nwith open("total-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["合計", total])',
      expect: "合計,245",
      test: 'with open("total-csv.csv", "r", encoding="utf-8") as g:\n    print(g.read(), end="")',
      mustInclude: ["next(", "writerow"],
      hints: ["読むほうは、reader = csv.reader(f) のあと next(reader) で見出しを飛ばし、for row in reader: の中で total += int(row[1]) です。", "書くほうは、open に \"w\" と newline=\"\" を付けて開き、w = csv.writer(f) のあと w.writerow([\"合計\", total]) です。"],
      xp: 35,
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
      mustInclude: ["next(", "float"],
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
      title: "売上の記録から12月だけを取り出す",
      intro: [
        "何年分もの記録が入った CSV から、必要な行だけを取り出すことはよくあります。for 文で1行ずつ読み、if 文で条件に合う行だけを選びます。",
      ],
      example: 'row = ["2021", "6", "210"]\nif row[1] == "6":\n    print("6月の行です")',
      task: "sales-csv.csv には、ある店の「年, 月, 売上（万円）」が3年分（36行）入っています。月が 12 の行だけを選んで、年と売上を空白で区切って表示しよう。",
      starter: SALES + "# ここに書こう\n",
      solution: SALES + 'with open("sales-csv.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        if row[1] == "12":\n            print(row[0], row[2])',
      wrong: SALES + 'with open("sales-csv.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        if row[1] == 12:\n            print(row[0], row[2])',
      expect: "2021 220\n2022 225\n2023 230",
      mustInclude: ["csv.reader", "if"],
      hints: ["CSV から読んだ値は文字列なので、月は row[1] == \"12\"（または int(row[1]) == 12）とくらべます。", "条件に合ったら print(row[0], row[2]) で年と売上を表示します。"],
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
      intro: "csv.reader で読んだ値は、どれも文字列です。文字列に * 2 をすると何が起きるか、int と float で変えるとどうなるかを考えよう。",
      code: 'import csv\n\nwith open("rcsv-a.csv", "w", encoding="utf-8") as f:\n    f.write("3,1.5\\n")\nf = open("rcsv-a.csv", "r", encoding="utf-8")\nrow = next(csv.reader(f))\nf.close()\nprint(row[0] * 2, int(row[0]) * 2, float(row[1]) + 1)',
      choices: ["6 6 2.5", "33 6 2.5", "33 6 1.51"],
      answer: 1,
      explain:
        "CSV リーダが返すリストの中身は、数に見えても文字列の '3' と '1.5' です。文字列に * 2 をすると、同じ文字列を2回つなげるので、row[0] * 2 は 33 です。int(row[0]) で整数の 3 にしてから * 2 をすると 6 になります。float(row[1]) は小数の 1.5 なので、1 を足すと 2.5 です。6 6 2.5 を選んだ人は、読んだ値がそのまま数だと考えています。1.51 は、文字列のまま \"1\" をつなげたときの形です。",
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
    {
      id: "rcsv-cell",
      title: "カンマで分けた値",
      intro: "CSV の1行を split(\",\") で分けると、マスごとの値のリストになります。いくつに分かれるかと、番号 [1] の値に注目しよう。",
      code: 'line = "りんご,120,3"\nparts = line.split(",")\nprint(len(parts), parts[1])',
      choices: ["12 120", "3 りんご", "3 120"],
      answer: 2,
      explain:
        "\"りんご,120,3\" はカンマで区切られた3つのマス りんご・120・3 なので、split(\",\") で ['りんご', '120', '3'] の3つに分かれます。len は 3、番号は 0 から数えるので parts[1] は 120 です。りんご を選んだ人は、番号を 1 から数えています。12 は文字の数を数えたときの数です。",
      xp: 15,
    },
    {
      id: "rcsv-next",
      title: "next を2回呼ぶと",
      intro: "next(リーダ) を呼ぶたびに、次の1行がリストで返ってきます。2回目の next で何行目が返るかに注目しよう。",
      code: 'import csv\n\nwith open("rcsv-n.csv", "w", encoding="utf-8") as f:\n    f.write("1,2,3\\n4,5,6\\n7,8,9\\n")\nf = open("rcsv-n.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nnext(reader)\nrow = next(reader)\nprint(row[0])\nf.close()',
      choices: ["4", "1", "2"],
      answer: 0,
      explain:
        "1回目の next(reader) で1行目 ['1', '2', '3'] が読まれます（ここでは結果を使っていません）。2回目の next で2行目 ['4', '5', '6'] が row に入るので、row[0] は 4 です。1 を選んだ人は、1回目の next でも1行ぶん読み進むことを見落としています。2 を選んだ人は、next が1行目の次の値を返すと考えていますが、next は1行ずつ進みます。",
      xp: 15,
    },
    {
      id: "rcsv-with",
      title: "with 文の中で数える",
      intro: "with 文のブロックの中で、for 文が何回くり返されるかに注目しよう。",
      code: 'import csv\n\nwith open("rcsv-w.csv", "w", encoding="utf-8") as f:\n    f.write("a,b\\nc,d\\ne,f\\n")\ncount = 0\nwith open("rcsv-w.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        count += 1\nprint(count)',
      choices: ["6", "3", "2"],
      answer: 1,
      explain:
        "for row in csv.reader(f): は、ファイルの1行ごとに1回くり返します。ファイルは a,b と c,d と e,f の3行なので、count は 3 です。6 を選んだ人は、マスの数を数えています。for 文は1行ずつ（リストを1つずつ）くり返すので、マスの数ではありません。",
      xp: 15,
    },
  ],
  explain: {},
  topics: [],
  refSections: 8,
  refProse: 2621,
};
