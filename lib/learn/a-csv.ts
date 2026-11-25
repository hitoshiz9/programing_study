import type { LearnChapter } from "./types.ts";

// 付録 CSVファイルの入出力。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// ファイルはブラウザの中の仮の置き場にあるので、どの例も、先にファイルを書いてから読む。
const NUMS = 'with open("nums-csv.csv", "w", encoding="utf-8") as f:\n    f.write("4,8,15\\n16,23,42\\n")\n\n';

export const chapter: LearnChapter = {
  ref: "A-csv",
  sections: [
    {
      title: "CSV形式とは",
      blocks: [
        { h: "カンマで区切った表" },
        { p: "CSV は comma-separated values（カンマで区切った値）の略で、表のデータを文字だけで書いておくファイルの形式です。表計算ソフト（Excel など）の表は、マス（セル）ごとに1つの値が入っています。CSV では、表の1行をファイルの1行に書き、マスとマスの間を ,（カンマ）で区切ります。カンマで区切られた1つ1つが、別々の値として扱われます。" },
        { p: "たとえば「名前・年れい・町」の表で、ぴよ（3さい、北町）とミケ（5さい、南町）の2行があるとき、CSV では次の2行になります。1行目「ぴよ,3,北町」、2行目「ミケ,5,南町」。1行の文字列を split(\",\") でカンマごとに分けると、マスの値のリストになります。" },
        { code: 'line = "ぴよ,3,北町"\nprint(line.split(","))', out: "['ぴよ', '3', '北町']" },
        { try: "rcsv-cell" },
        { h: "リストから1行を作る: join" },
        { p: "反対に、値のリストから CSV の1行を作るには \",\".join(リスト) を使います。join は、文字列のリストの要素の間に、前に書いた文字列（ここでは \",\"）をはさんで、1つの文字列にするメソッドです。CSV では、カンマのうしろに空白を入れません。空白を入れると、その空白も値の一部になってしまいます。" },
        { code: 'print(",".join(["ミケ", "5", "南町"]))', out: "ミケ,5,南町" },
        { try: "csv-line" },
      ],
    },
    {
      title: "CSVファイルの読み込み",
      blocks: [
        { h: "csv.reader と next" },
        { p: "CSV ファイルを読むときは、csv というモジュールを import csv で読みこみます。open でファイルを開いたら、そのファイルオブジェクトを csv.reader( ) に渡します。返ってくるのは「CSV リーダ」という、CSV からデータを読むための道具（オブジェクト）です。" },
        { p: "CSV リーダはイテレータ（4-2）なので、next( ) に渡せます。next(リーダ) を呼ぶたびに、ファイルの次の1行が、カンマで区切った値のリストになって返ってきます。1回目は1行目、2回目は2行目です。open で開いたファイルは、使い終わったら f.close() で閉じます（4-1 と同じです）。" },
        { code: "import csv\n\n" + NUMS + 'f = open("nums-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nprint(next(reader))\nrow = next(reader)\nprint(row)\nprint(row[2])\nf.close()', out: "['4', '8', '15']\n['16', '23', '42']\n42" },
        { try: "rcsv-next" },
        { h: "読んだ値は文字列: int と float" },
        { p: "上の例で、リストの中身が '4' のように ' で囲まれているのは、数に見えても文字列だからです。CSV から読んだ値は、すべて文字列です。そのままでは計算に使えないので、整数なら int( )、小数なら float( ) で数に変えます（複素数なら complex( ) です）。文字列どうしの + は、足し算ではなく文字をつなげる計算になります。文字列に * 2 をすると、かけ算ではなく、同じ文字列を2回つなげたものになります（2-1 と同じです）。" },
        { code: 'row = ["16", "23", "2.5"]\nprint(row[0] + row[1])\nprint(int(row[0]) + int(row[1]))\nprint(float(row[2]) * 2)', out: "1623\n39\n5.0" },
        { try: "rcsv-str" },
        { h: "最後まで読むと StopIteration" },
        { p: "ファイルの最後の行まで読んだあとで、もう一度 next を呼ぶと、StopIteration（もう次がない、という意味）というエラーになります。下の例のファイルは2行なので、3回目の next でエラーになります。" },
        { code: "import csv\n\n" + NUMS + 'f = open("nums-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nprint(next(reader))\nprint(next(reader))\nprint(next(reader))', out: "['4', '8', '15']\n['16', '23', '42']\nTraceback (most recent call last):\n  File \"<exec>\", line 10, in <module>\nStopIteration" },
        { p: "ファイルの行の数より多く next を呼ばないように気をつけます。行の数が分からないときは、次の節の for 文を使います。" },
        { try: "csv-stop" },
      ],
    },
    {
      title: "CSVファイルに対するfor文",
      blocks: [
        { h: "for 文で1行ずつ" },
        { p: "CSV リーダはイテレータなので、for 文の in のうしろに書けます。for row in reader: と書くと、くり返しのたびに next(reader) が呼ばれたのと同じことが起きて、row に1行ぶんのリストが入り、for 文の中身が実行されます。最後の行まで読むと、StopIteration のエラーにはならずに for 文が終わるので、ファイルが何行あっても、行の数を気にせずに全部の行を読めます。" },
        { code: "import csv\n\n" + NUMS + 'f = open("nums-csv.csv", "r", encoding="utf-8")\nreader = csv.reader(f)\nfor row in reader:\n    print(row[0], row[1])\nf.close()', out: "4 8\n16 23" },
        { try: "csv-close" },
      ],
    },
    {
      title: "CSVファイルに対するwith文",
      blocks: [
        { h: "with 文で開く" },
        { p: "4-1 で習った with 文を使うと、with のブロックが終わったときにファイルが自動で閉じられるので、close を書かなくてすみます。with open(ファイル名, \"r\", encoding=\"utf-8\") as f: のブロックの中で csv.reader(f) を作り、ブロックの中で読みます。" },
        { code: "import csv\n\n" + NUMS + 'with open("nums-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)', out: "['4', '8', '15']\n['16', '23', '42']" },
        { try: "rcsv-with" },
        { h: "見出しの行を飛ばす" },
        { p: "CSV の1行目には、「月,気温」のような列の名前（見出し）が入っていることがよくあります。見出しは計算に使えないので、for 文の前に next(リーダ) を1回だけ呼んで、1行目を読み飛ばします。そのあとの for 文は2行目から始まります。" },
        { code: 'import csv\n\nwith open("head-csv.csv", "w", encoding="utf-8") as f:\n    f.write("品名,値段\\nパン,150\\n牛乳,200\\n")\nwith open("head-csv.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    next(reader)\n    for row in reader:\n        print(row[0], int(row[1]) + 10)', out: "パン 160\n牛乳 210" },
        { try: "csv-with" },
      ],
    },
    {
      title: "CSVファイルの書き込み",
      blocks: [
        { h: "csv.writer と writerow" },
        { p: "CSV ファイルを書くときは、ファイルを書き込みモード \"w\" で開いて、そのファイルオブジェクトを csv.writer( ) に渡します。返ってくるのは「CSV ライター」という、CSV 形式でデータを書きこむための道具です。ライターの writerow(リスト) を呼ぶと、リストの値をカンマで区切った1行が書きこまれます。数を渡しても、ファイルには文字として書かれます。1行に1回 writerow を呼びます（リストのリストを渡して何行もまとめて書く writerows というメソッドもあります）。" },
        { p: "CSV を書くときの open には、newline=\"\" を付けます。付けないと、環境によっては行と行の間に空の行が入ってしまいます。日本語のような半角英数字以外の文字を書いたり読んだりするときは、encoding=\"utf-8\" のように文字コード（文字を記録するときの決まり）も指定します。指定しないと文字化けすることがあります。" },
        { code: 'import csv\n\nwith open("out-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["町", "人数"])\n    w.writerow(["北町", 120])\nwith open("out-csv.csv", "r", encoding="utf-8") as f:\n    print(f.read(), end="")', out: "町,人数\n北町,120" },
        { p: "writerow は、書きこんだ文字の数（改行もふくむ）を返します。ふつうは使わないので、気にしなくてかまいません。" },
        { p: "読む用のファイルと書く用のファイルを同時に開くこともできます。with の中にもう1つ with を書いて入れ子にするか、with open(…) as src, open(…) as dst: のように、1つの with に open をカンマで区切って並べます。どちらも、ブロックが終わると両方のファイルが閉じられます。" },
        { code: 'import csv\n\nwith open("in-csv.csv", "w", encoding="utf-8") as f:\n    f.write("1,2\\n3,4\\n")\nwith open("in-csv.csv", "r", encoding="utf-8") as src, open("copy-csv.csv", "w", encoding="utf-8", newline="") as dst:\n    w = csv.writer(dst)\n    for row in csv.reader(src):\n        w.writerow([row[1], row[0]])\nwith open("copy-csv.csv", "r", encoding="utf-8") as f:\n    print(f.read(), end="")', out: "2,1\n4,3" },
        { try: "csv-writer" },
        { h: "カンマをふくむ値は \" で囲まれる" },
        { p: "値の中にカンマがあると、区切りのカンマと見分けがつかなくなります。そこで csv.writer は、カンマをふくむ値を \" \" で囲んで書きます。csv.reader で読むときは、\" で囲まれた中のカンマは区切りとは見なさず、1つの値に戻します。\",\".join で自分で書くと、この工夫がされません。" },
        { code: 'import csv\n\nwith open("q-csv.csv", "w", encoding="utf-8", newline="") as f:\n    csv.writer(f).writerow(["A,B", "C"])\nwith open("q-csv.csv", "r", encoding="utf-8") as f:\n    print(f.read(), end="")', out: '"A,B",C' },
        { try: "rcsv-quote" },
        { h: "公開されているデータと文字コード" },
        { p: "役所や研究機関などが公開しているデータは、何十年分もの記録が CSV で配られていることがあります。その中には、Shift_JIS という古い文字コードで書かれたものもあります。そのときは open に encoding=\"shift_jis\" を指定して開きます。取り出した数を使うと、年ごとの変化をグラフにしたり（付録の Matplotlib）、変化の傾向を表す直線を求めたりすることもできます。" },
        { h: "長い記録から決まった行を取り出す" },
        { p: "長い記録から「6月の行だけ」のように必要な行を取り出すには、for 文で1行ずつ読み、if 文で条件に合う行だけを選びます。読んだ値は文字列なので、\"6\" のような文字列とくらべるか、int で数にしてからくらべます。" },
        { code: 'import csv\n\nwith open("rain-csv.csv", "w", encoding="utf-8", newline="") as f:\n    w = csv.writer(f)\n    w.writerow([2020, 6, 210])\n    w.writerow([2020, 7, 95])\n    w.writerow([2021, 6, 180])\n    w.writerow([2021, 7, 130])\nwith open("rain-csv.csv", "r", encoding="utf-8") as f:\n    for row in csv.reader(f):\n        if int(row[1]) == 6:\n            print(row[0], row[2])', out: "2020 210\n2021 180" },
        { try: "csv-july" },
      ],
    },
  ],
  // 章の最後の演習問題: 教材の練習(列をしぼった CSV を作る・ファイル全体を数のリストにする)にあたる問題を、別の題材で
  exercises: ["csv-for", "csv-reader", "csv-extract", "csv-rowsum"],
};
