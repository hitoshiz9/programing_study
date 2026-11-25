import type { LearnChapter } from "./types.ts";

// 5-2 モジュールの作り方。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// このアプリにはファイルを作る画面がないので、open で .py ファイルを書き出してから import する形で教える。
export const chapter: LearnChapter = {
  ref: "5-2",
  sections: [
    {
      title: "モジュールファイル",
      blocks: [
        { h: "プログラムを分けて使い回す" },
        { p: "プログラムが長くなってくると、1つのファイルに全部を書くより、役割ごとにファイルを分けたほうが、読むのも直すのも楽になります。また、一度作った便利な関数を、別のプログラムでも使いたくなることがあります。そんなときは、その関数を1つのファイルにまとめておき、使う側のプログラムから import します。こうして切り出したファイルが、自分で作るモジュールです。" },
        { p: "モジュールのファイル（モジュールファイル）は、名前が .py で終わるテキストファイルで、中には Python のコードだけを書きます。説明の文章や実行結果は入れません。文字は UTF-8 という形式で保存するのが、Python の公式のおすすめです。" },
        { h: "このアプリでのモジュールの作り方" },
        { p: "ふだんはエディタで .py ファイルを作りますが、このアプリにはファイルを作る画面がありません。そこで、4-1 で学んだ open と write を使い、コードの中で .py ファイルを書き出してから import します。open(ファイル名, \"w\", encoding=\"utf-8\") で書きこみ用に開き、f.write(文字列) で中身を書きます。モジュールの中身は何行にもなるので、\"\"\"（ダブルクォート3つ）で囲んだ、何行でも書ける文字列にしておくと便利です。" },
        { p: "import の直前には、準備の2行を書きます。import importlib, sys で importlib と sys という2つのモジュールを読み込んでおき、importlib.invalidate_caches() で「プログラムの途中で作ったファイルも見つけられるように」し、sys.modules.pop(\"モジュール名\", None) で「前の実行で読み込んだ古い中身を忘れる」ようにします。この2行は、毎回同じように書けば大丈夫です。" },
        { p: "準備ができたら、import モジュール名 で読み込みます。モジュール名は、ファイル名から .py を取ったものです（twice52.py なら twice52）。中の関数は、math と同じように「モジュール名.関数名( )」で呼びます。" },
        { code: 'import importlib, sys\n\nsource = """def twice(x):\n    return x * 2\n"""\nwith open("twice52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("twice52", None)\nimport twice52\nprint(twice52.twice(8))', out: "16" },
        { p: "まちがえやすい点: \"\"\" の中もモジュールの Python のコードなので、def の中の行は、ふだんと同じように空白4つで字下げします。" },
        { p: "下の問題では、greet52.py というモジュールファイルの中に、hello という関数を作り、import greet52 で読み込んで greet52.hello( ) と呼びます。" },
        { try: "l52-file" },
        { h: "モジュールの名前: __name__" },
        { p: "読み込んだモジュールには、__name__ という名前の値が付いていて、そのモジュールの名前が文字列で入っています（__ はアンダースコア _ を2つ続けたものです）。モジュールの名前は、ファイル名から .py を取ったものなので、memo52.py を import したモジュールの __name__ は memo52 です。import memo52.py のように .py を付けて書くとエラーになります。" },
        { code: 'import importlib, sys\n\nwith open("memo52.py", "w", encoding="utf-8") as f:\n    f.write("TEXT = \\"メモ\\"\\n")\n\nimportlib.invalidate_caches()\nsys.modules.pop("memo52", None)\nimport memo52\nprint(memo52.__name__)\nprint(memo52.TEXT)', out: "memo52\nメモ" },
        { p: "モジュールの中で作った変数（上の TEXT）も、関数と同じように「モジュール名.変数名」で使えます。下の問題では、tool52r.py というファイルを作って import します。" },
        { try: "r52-name" },
      ],
    },
    {
      title: "ノートブックファイルをモジュールファイルに変換する",
      blocks: [
        { h: "import するとファイル全体が実行される" },
        { p: "Jupyter や Colab のノートブックは、コードの欄（セル）を1つずつ選んで実行できました。ノートブックは、メニューから .py ファイルとして保存し直せます。保存したファイルでは、コードのセルが上から順に並んで1つのプログラムになり、説明の文章はコメント（# から右）になります。" },
        { p: "そのファイルを import すると、セルごとではなく、ファイルの上から下までが、まとめて1回実行されます。関数の定義（def）は、関数が作られるだけで、中身はまだ動きません。一方、ファイルにじかに書いた print などの命令は、import したときに動きます。" },
        { code: 'import importlib, sys\n\nsource = """print("1行目")\ndef shout():\n    print("呼ばれた")\nprint("3行目")\n"""\nwith open("run52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("run52", None)\nimport run52\nrun52.shout()', out: "1行目\n3行目\n呼ばれた" },
        { p: "import した時点では、shout の中の print(\"呼ばれた\") は動きません。動くのは、最後に run52.shout() と呼び出したときです。import しただけで表示がたくさん出ると使う側が困るので、ふつうモジュールには関数や値の定義だけを書きます。" },
        { p: "下の問題では、count52.py というモジュールファイルに、import したときに動く for 文を書きます。" },
        { try: "l52-toplevel" },
        { h: "同じモジュールを2回 import すると" },
        { p: "一度 import したモジュールは、sys.modules という一覧に覚えられます。同じプログラムの中で同じモジュールをもう一度 import しても、覚えておいたものがそのまま使われ、ファイルはもう実行されません。つまり、モジュールのファイルが実行されるのは、最初の import の1回だけです。" },
        { p: "このアプリで import の前に sys.modules.pop を書くのは、この「覚えている分」を消して、作り直したファイルを毎回読ませるためです。下の問題のモジュールは once52 です。" },
        { code: 'import importlib, sys\n\nwith open("hello52.py", "w", encoding="utf-8") as f:\n    f.write("print(\\"hello52 を実行\\")\\n")\n\nimportlib.invalidate_caches()\nsys.modules.pop("hello52", None)\nimport hello52\nprint("A")\nimport hello52\nprint("B")', out: "hello52 を実行\nA\nB" },
        { try: "r52-once" },
      ],
    },
    {
      title: "モジュールファイルをアップロードする",
      blocks: [
        { h: "モジュールはカレントディレクトリに置く" },
        { p: "import は、決まった場所の中からモジュールファイルを探します。いちばんよく使う置き場所は、プログラムが動いているディレクトリ（カレントディレクトリ、4-3 で学びました）です。Colab で自分のモジュールを使うときは、手元のパソコンにある .py ファイルを、Colab のカレントディレクトリにアップロード（送りこむこと）してから import します。このアプリでは、コードの中で open を使ってファイルを書くことが、アップロードのかわりです。" },
        { p: "どこにも見つからない名前を import すると、ModuleNotFoundError（モジュールが見つからない、というエラー）になります。try: と except エラーの種類: を使うと、このエラーが起きたときに、止まらずに別の処理をさせられます。try: の下の字下げした行でそのエラーが起きると、残りは飛ばして except の下の行が実行され、そのあとはプログラムの続きに進みます。" },
        { code: 'try:\n    import nothing52\nexcept ModuleNotFoundError:\n    print("nothing52 は見つかりません")\nprint("おわり")', out: "nothing52 は見つかりません\nおわり" },
        { p: "下の問題の nothere52 も、どこにもファイルがないモジュールの名前です。" },
        { try: "r52-missing" },
        { h: "探す場所を足す: sys.path" },
        { p: "import がモジュールを探す場所の一覧は、sys モジュールの sys.path というリストに入っています。ほかのディレクトリに置いたモジュールを使いたいときは、sys.path.append(\"ディレクトリ名\") で、探す場所をリストの最後に足します。足したあとは、そのディレクトリの中のモジュールも import できます。" },
        { p: "このアプリの問題では、前の実行で足した分が残らないように、while \"ディレクトリ名\" in sys.path: のくり返しの中で sys.path.remove(\"ディレクトリ名\") を使い、リストから消してから始めます。remove はリストから、その値を1つ消すメソッドです。ディレクトリは、4-3 で学んだ os.makedirs(\"名前\", exist_ok=True) で作ります。" },
        { code: 'import importlib, os, sys\n\nos.makedirs("box52", exist_ok=True)\nwith open("box52/inbox52.py", "w", encoding="utf-8") as f:\n    f.write("SIZE = 3\\n")\nwhile "box52" in sys.path:\n    sys.path.remove("box52")\nimportlib.invalidate_caches()\nsys.modules.pop("inbox52", None)\n\nsys.path.append("box52")\nimport inbox52\nprint(inbox52.SIZE)', out: "3" },
        { p: "ふだんは、使う側のプログラムと同じディレクトリにモジュールを置くのが、いちばん簡単です。下の問題では、mods52 というディレクトリの中に calc52.py が作られています。" },
        { try: "l52-path" },
      ],
    },
    {
      title: "自作モジュールの使い方",
      blocks: [
        { h: "自作モジュールでも from と as" },
        { p: "自分で作ったモジュールも、5-1 で学んだ math と、まったく同じ書き方で読み込めます。import モジュール名 なら「モジュール名.関数名( )」で、from モジュール名 import 関数名 なら関数名だけで、import モジュール名 as 別名 なら「別名.関数名( )」で呼べます。from モジュール名 import * も書けますが、5-1 と同じ理由（名前がぶつかって上書きされる）でおすすめしません。" },
        { code: 'import importlib, sys\n\nsource = """def half(x):\n    return x / 2\n"""\nwith open("half52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("half52", None)\nfrom half52 import half\nimport half52 as hf\nprint(half(9))\nprint(hf.half(4))', out: "4.5\n2.0" },
        { p: "下の問題では、shape52.py というモジュールに、square と rect という2つの関数が入っています。rect を from で取りこみ、モジュール全体には sp という別名を付けて使います。（章の最後の演習問題では、tax52 というモジュールに、with_tax という関数を自分で書きます。）" },
        { try: "l52-from" },
      ],
    },
  ],
  // 演習問題: 自分でモジュール tax52 に関数 with_tax を書き、from で取りこんで使う
  exercises: ["l52-tax"],
};
