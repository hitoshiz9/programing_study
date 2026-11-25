import type { LearnChapter } from "./types.ts";

// 付録 Pythonスクリプトとコマンドライン実行。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// ターミナルの代わりに runpy.run_path で「python ファイル名」の実行を再現し、sys.argv は自分で入れる。
export const chapter: LearnChapter = {
  ref: "A-command",
  sections: [
    {
      title: "Pythonスクリプトとコマンドライン実行",
      blocks: [
        { h: "スクリプトとコマンドライン実行" },
        { p: "5-2 で作ったモジュールのファイル（.py）は、import して使うだけでなく、それだけで最初から最後まで動く1つのプログラムでもあります。直接実行するための .py ファイルを、特に「Python スクリプト」といいます。モジュールかスクリプトかを区別しないときは、まとめて「.py ファイル」や「Python のソースファイル」といいます。" },
        { p: "スクリプトは、ふつう「ターミナル」（文字でコマンドを打ちこむ画面）から実行します。打ちこんだコマンドは「シェル」というプログラムが受け取って実行します。python sample.py（環境によっては python3 sample.py）と打つと、sample.py が実行されます。このように、コマンドを打ちこんでスクリプトを実行することを「コマンドライン実行」といいます。ターミナルの行の先頭には、> や $ のような、入力を待っている合図の記号（プロンプト）が出ます。打ちこむのは、その記号のうしろの部分です。" },
        { p: "Python のプログラムの中から、別のスクリプトを python ファイル名 と打ったときと同じように動かすこともできます。runpy というモジュールの runpy.run_path(ファイル名, run_name=\"__main__\") がその関数です。この章の例と問題では、open でスクリプトのファイルを書いてから、runpy.run_path で実行します。下の例では、\"\"\" で囲んだ何行もの文字列 source が、スクリプトのファイルの中身になります。" },
        { code: 'import runpy\n\nsource = """b = 25\nprint("b の中身は", b)\n"""\nwith open("ex_cmd_a.py", "w", encoding="utf-8") as f:\n    f.write(source)\nrunpy.run_path("ex_cmd_a.py", run_name="__main__")', out: "b の中身は 25" },
        { try: "cmd-script" },
      ],
    },
    {
      title: "コマンドライン実行の具体例",
      blocks: [
        { h: "ターミナルを開いて cd してから実行" },
        { p: "コマンドライン実行には、まずターミナルを開きます。Jupyter Notebook では、ファイルの一覧の画面のメニュー New から Terminal を選ぶと、ターミナルのタブが開きます（Windows ではふつう PowerShell、macOS では bash や zsh などのシェルが動きます）。Windows で Anaconda を入れているなら、スタートメニューの Anaconda3 の中の Anaconda Prompt を開きます。macOS では、アプリケーションの中のユーティリティにあるターミナル.app を開きます。" },
        { p: "ターミナルにも「今いるディレクトリ」があり、python sample.py と打つと、今いるディレクトリの中の sample.py を探します。そこで先に cd ディレクトリ名 と打って、スクリプトのあるディレクトリへ移動してから実行します。cd .. と打つと1つ上のディレクトリに戻ります。" },
        { p: "Python の中では、os モジュールの os.chdir(ディレクトリ名) が cd と同じ働きをし、os.getcwd() が今いるディレクトリ（カレントディレクトリ、4-3）を返します。os.makedirs(名前, exist_ok=True) は、ディレクトリを作る関数です（exist_ok=True で、すでにあってもエラーにしません）。下の例では、最初に os.chdir(\"/home/pyodide\") で決まった場所へ移動してから試しています。" },
        { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex_cmd_dir", exist_ok=True)\nos.chdir("ex_cmd_dir")   # cd ex_cmd_dir と同じ\nprint(os.getcwd())\nos.chdir("..")           # cd .. と同じ\nprint(os.getcwd())', out: "/home/pyodide/ex_cmd_dir\n/home/pyodide" },
        { try: "cmd-cd" },
        { h: "データファイルは、今いるディレクトリから探される" },
        { p: "スクリプトの中で open(\"data.txt\") のようにファイル名だけで開くと、そのファイルは、スクリプトのある場所ではなく、今いるディレクトリから探されます。だから、データファイルを名前だけで開くスクリプトは、データファイルのあるディレクトリに cd してから実行しないと、ファイルが見つかりません。" },
        { p: "ファイルがあるかどうかは、os.path.exists(ファイル名) で調べられます。あれば True、なければ False です。" },
        { code: 'import os\nos.chdir("/home/pyodide")\nos.makedirs("ex_cmd_box", exist_ok=True)\nwith open("ex_cmd_box/memo.txt", "w", encoding="utf-8") as f:\n    f.write("メモ")\nprint(os.path.exists("ex_cmd_box/memo.txt"))\nprint(os.path.exists("memo.txt"))', out: "True\nFalse" },
        { try: "rcmd-cd" },
      ],
    },
    {
      title: "コマンドライン引数",
      blocks: [
        { h: "sys.argv で受け取る" },
        { p: "コマンドライン実行では、スクリプト名のうしろに、空白で区切って文字を並べられます。python show.py red blue と打てば、red と blue という2つの文字列がスクリプトに渡されます。これを「コマンドライン引数」といいます。実行するたびにちがう値を渡せるので、たとえば読み込むファイルの名前を外から指定できます。" },
        { p: "渡された引数は、sys モジュールの argv という変数 sys.argv に、文字列のリストとして入っています。リストの0番目には実行したスクリプトの名前が入り、1番目から引数が順番に入ります。" },
        { p: "sys.argv はふつうのリストなので、プログラムの中で sys.argv = [\"show.py\", \"red\", \"blue\"] のように入れなおすこともできます。この章の例と問題では、こうして「python show.py red blue と実行したつもり」の中身を入れてから、runpy.run_path でスクリプトを動かします。なお、Jupyter や Colab のノートブックの中で sys.argv を表示すると、ノートブックを動かしている裏側のプログラムの名前などが入っていて、ここでの説明とはちがう中身になります。" },
        { code: 'import runpy, sys\n\nwith open("ex_cmd_b.py", "w", encoding="utf-8") as f:\n    f.write("import sys\\nprint(sys.argv)\\n")\nsys.argv = ["ex_cmd_b.py", "first", "second"]\nrunpy.run_path("ex_cmd_b.py", run_name="__main__")', out: "['ex_cmd_b.py', 'first', 'second']" },
        { try: "cmd-argv" },
        { h: "番号とスライスで取り出す" },
        { p: "sys.argv はふつうのリストなので、2-2 の番号やスライスがそのまま使えます。sys.argv[0] がスクリプト名、sys.argv[1] が1つ目の引数、sys.argv[-1] がいちばん最後の要素です。sys.argv[1:] は、0番目のスクリプト名をのぞいた、引数だけのリストです。" },
        { code: 'import sys\nsys.argv = ["paint.py", "赤", "青", "黄"]\nprint(sys.argv[0])\nprint(sys.argv[2])\nprint(sys.argv[1:])', out: "paint.py\n青\n['赤', '青', '黄']" },
        { try: "rcmd-argv" },
        { h: "空白が区切り・引数の数" },
        { p: "コマンドラインでは、空白が引数の区切りです。python argcount.py 1 2 3 なら \"1\"・\"2\"・\"3\" の3つの引数、python argcount.py だけなら引数は0個で、sys.argv はスクリプト名だけのリストです。len(sys.argv) はスクリプト名もふくめて数えるので、引数だけの数は len(sys.argv) - 1 です。" },
        { code: 'import sys\nsys.argv = ["a.py"]\nprint(len(sys.argv) - 1)\nsys.argv = ["a.py", "x", "y"]\nprint(len(sys.argv) - 1)', out: "0\n2" },
        { try: "cmd-argv-try" },
        { h: "引数は文字列で届く" },
        { p: "コマンドラインに 100 と打っても、スクリプトには文字列の \"100\" として届きます。文字列どうしの + はつなげる計算なので、そのまま足すと \"100\" + \"100\" は \"100100\" です。文字列に * 2 をしても、かけ算ではなく同じ文字列を2回つなげたものになります。計算に使う前に、int( ) で整数に、小数なら float( ) で数に変えます。" },
        { code: 'v = "40"\nprint(v + v)\nprint(int(v) + int(v))', out: "4040\n80" },
        { try: "rcmd-str" },
      ],
    },
    {
      title: "モジュールのコマンドライン実行",
      blocks: [
        { h: "__name__ で、どちらで使われたかが分かる" },
        { p: ".py ファイルは、import されてモジュールとして使われることも、スクリプトとして直接実行されることもあります。どちらで使われているかは、ファイルの中で __name__ という特別な変数を見れば分かります。直接実行されたときは \"__main__\"、import されたときはモジュール名（ファイル名から .py を取ったもの）が入っています。" },
        { p: "Python は、一度 import したモジュールを sys.modules という辞書に覚えていて、同じモジュールをもう一度 import しても、ファイルを読み直しません。ファイルを書きかえてから読み直させたいときは、sys.modules.pop(\"モジュール名\", None) で覚えているモジュールを取りのぞき（辞書の pop は、キーを取りのぞくメソッドです。2つめの None は、キーがなくてもエラーにしないための値です）、importlib モジュールの importlib.invalidate_caches() で、ファイルが変わったかもしれないことを Python に知らせます。この章の例と問題では、毎回ファイルを書き直すので、この2行を書いてから import します。" },
        { code: 'import importlib, runpy, sys\n\nwith open("ex_who.py", "w", encoding="utf-8") as f:\n    f.write("print(\\"わたしは\\", __name__)\\n")\nimportlib.invalidate_caches()\nsys.modules.pop("ex_who", None)\n\nrunpy.run_path("ex_who.py", run_name="__main__")\nimport ex_who', out: "わたしは __main__\nわたしは ex_who" },
        { try: "rcmd-name" },
        { h: "if __name__ == \"__main__\":" },
        { p: "これを使って、ファイルの最後に if __name__ == \"__main__\": と書き、その中に「直接実行したときだけ動く処理」を書きます。import したときは __name__ がモジュール名なので、この if の中は動きません。こうすると、import すれば関数を貸し出す道具箱として、直接実行すれば1つのプログラムとして、同じファイルを両方に使えます。" },
        { p: "この if がないと、import しただけでその処理が動いてしまいます。しかもそのときの sys.argv は import した側のスクリプトに渡された引数なので、意図しない値で計算したり、エラーで止まったりします。また、if __name__ == \"__main__\": の中に、関数が正しく動くかを確かめるテストを書いておくこともあります。直接実行したときだけテストが動くので、道具とその確認を1つのファイルにまとめられます。" },
        { code: 'import runpy\n\nsource = """def square(n):\n    return n * n\n\nif __name__ == "__main__":\n    print("test 3:", square(3) == 9)\n    print("test 0:", square(0) == 0)\n"""\nwith open("ex_cmd_c.py", "w", encoding="utf-8") as f:\n    f.write(source)\nrunpy.run_path("ex_cmd_c.py", run_name="__main__")', out: "test 3: True\ntest 0: True" },
        { try: "rcmd-main" },
      ],
    },
    {
      title: "ソースファイル先頭部分にある宣言",
      blocks: [
        { h: "文字コード宣言" },
        { p: "ソースファイルの先頭の1〜2行には、ファイルの扱い方を伝える特別なコメントを書くことがあります。1つめは「文字コード宣言」です。Python のソースファイルは UTF-8 で書くことが公式にすすめられていて、宣言がなければ UTF-8 として読まれます。ところが Windows では、昔からのいきさつで Shift_JIS のファイルが使われることがあります。" },
        { p: "Shift_JIS で保存したファイルを実行するには、1行目（または2行目）に # -*- coding: shift_jis -*- と書きます。これがないと SyntaxError で止まります。反対に、UTF-8 で書いたファイルには、文字コード宣言を書かないことがすすめられています。下の例の open の encoding=\"shift_jis\" は、ファイルを Shift_JIS で保存するという意味です。" },
        { p: "1つめの例は宣言がないファイルです。エラーの表示がとても長くなるので、try: と except SyntaxError: を使って、SyntaxError が起きたら止まるかわりに print するようにしています。2つめの例は宣言があるファイルで、正しく実行されます。" },
        { code: 'import runpy\n\nwith open("ex_cmd_n.py", "w", encoding="shift_jis") as f:\n    f.write("print(\\"日本語\\")\\n")\ntry:\n    runpy.run_path("ex_cmd_n.py", run_name="__main__")\nexcept SyntaxError:\n    print("宣言がないので SyntaxError")', out: "宣言がないので SyntaxError" },
        { code: 'import runpy\n\nsource = """# -*- coding: shift_jis -*-\nprint("宣言があるので読めます")\n"""\nwith open("ex_cmd_d.py", "w", encoding="shift_jis") as f:\n    f.write(source)\nrunpy.run_path("ex_cmd_d.py", run_name="__main__")', out: "宣言があるので読めます" },
        { try: "cmd-coding" },
        { h: "shebang" },
        { p: "macOS や Linux のような Unix 系の環境では、スクリプトの1行目を #! で始めると、そのファイルを実行するコマンドを指定できます。この1行目を shebang（シバン）といいます。#! のうしろには、コマンドを絶対パス（/ から始まる場所の書き方）で書きます。Python では #!/usr/bin/env python3 と書くのが標準です。env は、うしろの名前（python3）のコマンドを探して実行するコマンドなので、Python がどこにインストールされていても動きます。" },
        { p: "shebang と文字コード宣言の両方を書くときは、shebang を1行目、文字コード宣言を2行目に書きます。shebang は1行目にないと働きません。どちらも # で始まるので、Python から見るとコメントです。Windows の python コマンドでは読み飛ばされますが、py コマンド（Windows 用の Python ランチャー）は shebang を見て、どの Python で動かすかを決めます。" },
        { code: 'import runpy\n\nsource = """#!/usr/bin/env python3\nprint("1行目は shebang")\n"""\nwith open("ex_cmd_e.py", "w", encoding="utf-8") as f:\n    f.write(source)\nrunpy.run_path("ex_cmd_e.py", run_name="__main__")', out: "1行目は shebang" },
        { try: "cmd-shebang" },
      ],
    },
  ],
  // 章の最後の演習問題: runpy・sys.argv・int・if __name__ を組み合わせて、引数を使うスクリプトを作る
  exercises: ["cmd-main", "cmd-arg-last", "cmd-arg0", "cmd-argc", "cmd-argprod"],
};
