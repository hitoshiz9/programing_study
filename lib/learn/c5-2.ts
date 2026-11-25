import type { LearnChapter } from "./types.ts";

// 5-2 モジュールの作り方。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
// エディタのかわりに、open で .py ファイルを書き出してから import する形で教える。
export const chapter: LearnChapter = {
  ref: "5-2",
  sections: [
    {
      title: "モジュールファイル",
      blocks: [
        { h: "プログラムを分けて使い回す" },
        { p: "プログラムが長くなってくると、1つのファイルに全部を書くより、役割ごとにファイルを分けたほうが、読むのも直すのも楽になります。また、一度作った便利な関数を、別のプログラムでも使いたくなることがあります。そんなときは、その関数を1つのファイルにまとめておき、使う側のプログラムから import します。こうして切り出したファイルが、自分で作るモジュールです。" },
        { p: "モジュールのファイル（モジュールファイル）は、名前が .py で終わるテキストファイルで、中には Python のコードだけを書きます。説明の文章や実行結果は入れません。文字は UTF-8 という形式で保存するのが、Python の公式のおすすめです。" },
        { h: "コードで .py ファイルを書き出す" },
        { p: "ふだんはエディタで .py ファイルを作りますが、ここでは、エディタのかわりに、Python のコードで .py ファイルを書き出してから import します。4-1 で学んだ open と write を使います。open(ファイル名, \"w\", encoding=\"utf-8\") で書きこみ用に開き、f.write(文字列) で中身を書きます。モジュールの中身は何行にもなるので、\"\"\"（ダブルクォート3つ）で囲んだ、何行でも書ける文字列にしておくと便利です。" },
        { p: "import の直前には、準備の2行（意味は次の節で説明します）を書きます。1行目は importlib.invalidate_caches()、2行目は sys.modules.pop(\"モジュール名\", None) です。その前に import importlib, sys で、importlib と sys という2つのモジュールを読み込んでおきます。" },
        { p: "準備ができたら、import モジュール名 で読み込みます。モジュール名は、ファイル名から .py を取ったものです（twice52.py なら twice52）。import twice52.py のように .py を付けて書くとエラーになります。中の関数は、math と同じように「モジュール名.関数名( )」で呼びます。" },
        { code: 'import importlib, sys\n\nsource = """def twice(x):\n    return x * 2\n"""\nwith open("twice52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("twice52", None)\nimport twice52\nprint(twice52.twice(8))', out: "16" },
        { p: "まちがえやすい点: \"\"\" の中もモジュールの Python のコードなので、def の中の行は、ふだんと同じように空白4つで字下げします。" },
        { try: "l52-file" },
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
        { try: "l52-toplevel" },
        { h: "同じモジュールを2回 import すると（準備の2行の意味）" },
        { p: "一度 import したモジュールは、sys.modules という一覧に覚えられます。同じプログラムの中で同じモジュールをもう一度 import しても、覚えておいたものがそのまま使われ、ファイルはもう実行されません。つまり、モジュールのファイルが実行されるのは、最初の import の1回だけです。" },
        { p: "準備の2行は、同じプログラムの中で作り直したモジュールを、読み直すためのものです。sys.modules.pop(\"モジュール名\", None) は、sys.modules に覚えられた分を消します（覚えられていなければ何もしません）。importlib.invalidate_caches() は、プログラムの途中で新しく作ったファイルも、import が確実に見つけられるようにします。" },
        { code: 'import importlib, sys\n\nsource = """print("hello52 を実行")\n"""\nwith open("hello52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("hello52", None)\nimport hello52\nprint("A")\nimport hello52\nprint("B")', out: "hello52 を実行\nA\nB" },
        { try: "r52-once" },
      ],
    },
    {
      title: "モジュールファイルをアップロードする",
      blocks: [
        { h: "モジュールを置く場所と ModuleNotFoundError" },
        { p: "import は、決まった場所の中からモジュールファイルを探します。いちばん簡単なのは、モジュールファイルを、使う側のプログラムと同じディレクトリに置くことです。プログラムをファイルとして実行するときは、そのファイルがあるディレクトリが探されます。Colab やノートブックでは、カレントディレクトリ（4-3 で学びました）が探されます。" },
        { p: "Colab で自分のモジュールを使うときは、手元のパソコンにある .py ファイルを、Colab のカレントディレクトリにアップロード（送りこむこと）してから import します。ここでは、コードの中で open を使ってファイルを書き出すので、アップロードは必要ありません。" },
        { p: "探す場所のどこにも見つからない名前（たとえば、ファイルを作っていない nothing52）を import すると、ModuleNotFoundError（モジュールが見つからない、というエラー）になります。try: と except エラーの種類: を使うと、このエラーが起きたときに、止まらずに別の処理をさせられます。try: の下の字下げした行でそのエラーが起きると、残りは飛ばして except の下の行が実行され、そのあとはプログラムの続きに進みます。" },
        { code: 'try:\n    import nothing52\nexcept ModuleNotFoundError:\n    print("nothing52 は見つかりません")\nprint("おわり")', out: "nothing52 は見つかりません\nおわり" },
        { try: "r52-missing" },
        { h: "別のディレクトリの中のファイルは見つからない" },
        { p: "import が探すのは、決まったディレクトリの中だけです。同じディレクトリの中に作った別のディレクトリ（4-3 の os.makedirs で作れます）にモジュールファイルを入れても、その中までは探されません。そのため、ModuleNotFoundError になります。自分のモジュールは、使う側と同じディレクトリにそのまま置きましょう。" },
        { code: 'import importlib, os, sys\n\nos.makedirs("lib52", exist_ok=True)\nsource = """N = 7\n"""\nwith open("lib52/deep52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("deep52", None)\ntry:\n    import deep52\n    print(deep52.N)\nexcept ModuleNotFoundError:\n    print("deep52 は見つかりません")', out: "deep52 は見つかりません" },
        { try: "r52-where" },
      ],
    },
    {
      title: "自作モジュールの使い方",
      blocks: [
        { h: "自作モジュールでも from と as" },
        { p: "自分で作ったモジュールも、5-1 で学んだ math と、まったく同じ書き方で読み込めます。import モジュール名 なら「モジュール名.関数名( )」で、from モジュール名 import 関数名 なら関数名だけで、import モジュール名 as 別名 なら「別名.関数名( )」で呼べます。from モジュール名 import * も書けますが、5-1 と同じ理由（名前がぶつかって上書きされる）でおすすめしません。" },
        { code: 'import importlib, sys\n\nsource = """def half(x):\n    return x / 2\n"""\nwith open("half52.py", "w", encoding="utf-8") as f:\n    f.write(source)\n\nimportlib.invalidate_caches()\nsys.modules.pop("half52", None)\nfrom half52 import half\nimport half52 as hf\nprint(half(9))\nprint(hf.half(4))', out: "4.5\n2.0" },
        { try: "l52-from" },
      ],
    },
  ],
  // 演習問題: 自分でモジュールに関数を書き、from で取りこんで使う
  exercises: ["l52-tax"],
};
