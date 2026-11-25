import type { Chapter } from "./types.ts";

// クラス。文章・例・問題はすべて独自に書いたもの(教材の文は写さない)。
const ROBOT = 'class Robot:\n    def name(self):\n        return "ロボ"\n\n    def greet(self):\n        return "ぼくは" + self.name() + "です"\n';
const REPEATER =
  'class Repeater:\n    def __init__(self, n):\n        self.n = n\n\n    def item(self):\n        return "★"\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.n == 0:\n            raise StopIteration\n        self.n = self.n - 1\n        return self.item()\n';
const SQUARES =
  "class Squares:\n    def __init__(self, n):\n        self.i = 0\n        self.n = n\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.i == self.n:\n            raise StopIteration\n        self.i = self.i + 1\n        return self.i * self.i\n";

export const chapter: Chapter = {
  ref: "6-3",
  title: "クラス",
  url: "https://utokyo-ipp.github.io/6/6-3.html",
  stage: "write",
  order: ["l63-define", "class", "counter", "l63-stock", "l63-inherit", "l63-superinit", "l63-override", "l63-iter", "l63-repeat", "l63-with", "l63-ex-bank", "l63-ex-squares"],
  lessons: [
    {
      id: "l63-define",
      title: "クラスを定義して、ものを作る",
      intro: [
        "class クラス名: と書き、その中に def でメソッド（そのクラス専用の関数）を並べると、新しい種類のデータを作れます。",
        "メソッドの最初の引数は self と書く決まりです。クラス名() と書くと、そのクラスのもの（インスタンス）が1つできます。",
      ],
      example: 'class Bell:\n    def ring(self):\n        return "チリン"\n\nb = Bell()\nprint(b.ring())',
      task: "呼ぶといつも文字列 \"ニャー\" を返すメソッド cry() を持つクラス Cat を作ろう。",
      starter: "class Cat:\n    pass\n",
      solution: 'class Cat:\n    def cry(self):\n        return "ニャー"',
      wrong: 'class Cat:\n    def cry(self):\n        return "ワン"',
      expect: "ニャー ニャー",
      test: "c = Cat()\nprint(c.cry(), c.cry())",
      hints: ["class Cat: の中に def cry(self): を書きます。", 'def cry(self): の中身は return "ニャー" です。'],
      xp: 25,
    },
    {
      id: "l63-stock",
      title: "属性を減らしていくメソッド",
      intro: [
        "__init__ の中で self.n = n と書くと、作ったものが n という属性（そのものだけが持つ変数）を覚えます。",
        "ほかのメソッドの中でも self.n で読んだり、self.n = self.n - 1 のように書きかえたりできます。",
      ],
      example: "",
      task: "作ったときに在庫の数を属性 n に覚え、take() を呼ぶたびに n を1つ減らして文字列 \"どうぞ\" を返し、n が 0 のときは減らさずに文字列 \"売り切れ\" を返すクラス Stock を完成させよう。",
      starter: "class Stock:\n    def __init__(self, n):\n        pass\n\n    def take(self):\n        pass\n",
      solution:
        'class Stock:\n    def __init__(self, n):\n        self.n = n\n\n    def take(self):\n        if self.n == 0:\n            return "売り切れ"\n        self.n = self.n - 1\n        return "どうぞ"',
      wrong: 'class Stock:\n    def __init__(self, n):\n        self.n = n\n\n    def take(self):\n        return "どうぞ"',
      expect: "どうぞ どうぞ 売り切れ 0",
      test: "s = Stock(2)\nprint(s.take(), s.take(), s.take(), s.n)",
      hints: ["__init__ では self.n = n と書いて覚えます。", 'take では、まず if self.n == 0: なら return "売り切れ"。そうでなければ self.n = self.n - 1 にしてから return "どうぞ" です。'],
      xp: 35,
    },
    {
      id: "l63-inherit",
      title: "継承と super()",
      intro: [
        "class 子(親): と書くと、親のクラスの中身を受けついだ新しいクラスを作れます。これを継承といいます。",
        "子のクラスで同じ名前のメソッドを書きなおしたとき、親のほうのメソッドは super().メソッド名() で呼べます。",
      ],
      example:
        'class Greeter:\n    def hello(self):\n        return "こんにちは"\n\nclass LoudGreeter(Greeter):\n    def hello(self):\n        return super().hello() + "!!"\n\nprint(LoudGreeter().hello())',
      task: "Shop の price() は 100 を返します。Shop を継承したクラス SaleShop の price() を書きなおし、super() で親の price() を呼んで、その結果から 20 を引いた値を返そう。",
      starter: "class Shop:\n    def price(self):\n        return 100\n\n\nclass SaleShop(Shop):\n    pass\n",
      solution: "class Shop:\n    def price(self):\n        return 100\n\n\nclass SaleShop(Shop):\n    def price(self):\n        return super().price() - 20",
      wrong: "class Shop:\n    def price(self):\n        return 100\n\n\nclass SaleShop(Shop):\n    def price(self):\n        return super().price() + 20",
      expect: "100 80",
      test: "print(Shop().price(), SaleShop().price())",
      mustInclude: ["super()"],
      hints: ["SaleShop の中の pass を消して、def price(self): を書きます。", "中身は return super().price() - 20 です。"],
      xp: 30,
    },
    {
      id: "l63-superinit",
      title: "super() で親の __init__ を呼ぶ",
      intro: [],
      example: "",
      task: "Item は name を覚えるクラスです。Item を継承したクラス PricedItem(name, price) の __init__ を完成させよう。super() で親の __init__ に name をわたし、そのあと price を属性 self.price に覚えます。",
      starter:
        'class Item:\n    def __init__(self, name):\n        self.name = name\n\n    def label(self):\n        return "商品:" + self.name\n\n\nclass PricedItem(Item):\n    def __init__(self, name, price):\n        pass\n',
      solution:
        'class Item:\n    def __init__(self, name):\n        self.name = name\n\n    def label(self):\n        return "商品:" + self.name\n\n\nclass PricedItem(Item):\n    def __init__(self, name, price):\n        super().__init__(name)\n        self.price = price',
      wrong:
        'class Item:\n    def __init__(self, name):\n        self.name = name\n\n    def label(self):\n        return "商品:" + self.name\n\n\nclass PricedItem(Item):\n    def __init__(self, name, price):\n        self.price = price',
      expect: "ペン 120 商品:ペン",
      test: 'p = PricedItem("ペン", 120)\nprint(p.name, p.price, p.label())',
      mustInclude: ["super().__init__("],
      hints: ["pass を消して、super().__init__(name) と書きます。", "その次の行に self.price = price と書きます。"],
      xp: 30,
    },
    {
      id: "l63-override",
      title: "一部だけ書きなおして、ふるまいを変える",
      intro: [
        "親のメソッドの中で self.name() のように別のメソッドを呼んでいると、子のクラスでその name だけを書きなおすだけで、親のメソッドの結果も変わります。",
        "self は「いま使っているもの」なので、子のインスタンスなら子のメソッドが使われるからです。",
      ],
      example:
        'class Report:\n    def title(self):\n        return "報告"\n\n    def show(self):\n        return "【" + self.title() + "】"\n\nclass Memo(Report):\n    def title(self):\n        return "メモ"\n\nprint(Memo().show())',
      task: "Robot を継承したクラス NekoRobot を作ろう。name() だけを書きなおして文字列 \"ネコロボ\" を返すようにすれば、親の greet() がそのまま使えます。",
      starter: ROBOT + "\n\nclass NekoRobot(Robot):\n    pass\n",
      solution: ROBOT + '\n\nclass NekoRobot(Robot):\n    def name(self):\n        return "ネコロボ"',
      wrong: ROBOT + '\n\nclass NekoRobot(Robot):\n    name = "ネコロボ"',
      expect: "ぼくはロボです\nぼくはネコロボです",
      test: "print(Robot().greet())\nprint(NekoRobot().greet())",
      hints: ["NekoRobot の中に def name(self): を書きます。", 'def name(self): の中身は return "ネコロボ" です。greet は書かなくてかまいません。'],
      xp: 30,
    },
    {
      id: "l63-iter",
      title: "特殊メソッドで for 文に対応する",
      intro: [
        "__iter__ と __next__ という特別な名前のメソッドを作ると、そのクラスのものを for 文で回せるようになります。",
        "__next__ は次の値を1つ返すメソッドです。もう返す値がないときは raise StopIteration と書いて、くり返しを終わらせます。",
      ],
      example:
        "class Three:\n    def __init__(self):\n        self.n = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.n == 3:\n            raise StopIteration\n        self.n = self.n + 1\n        return self.n\n\nfor x in Three():\n    print(x)",
      task: "for 文で回すと n, n-1, …, 1 の順に数を出し、1 を出したあとで止まるクラス Countdown を完成させよう。",
      starter: "class Countdown:\n    def __init__(self, n):\n        self.n = n\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        pass\n",
      solution:
        "class Countdown:\n    def __init__(self, n):\n        self.n = n\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.n == 0:\n            raise StopIteration\n        x = self.n\n        self.n = self.n - 1\n        return x",
      wrong:
        "class Countdown:\n    def __init__(self, n):\n        self.n = n\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.n < 0:\n            raise StopIteration\n        x = self.n\n        self.n = self.n - 1\n        return x",
      expect: "[3, 2, 1]\n[]",
      test: "from itertools import islice\nprint(list(islice(Countdown(3), 10)))\nprint(list(islice(Countdown(0), 10)))",
      mustInclude: ["StopIteration"],
      hints: ["__next__ では、まず if self.n == 0: なら raise StopIteration です。", "そうでなければ、x = self.n で今の数をとっておき、self.n = self.n - 1 にしてから return x します。"],
      xp: 40,
    },
    {
      id: "l63-repeat",
      title: "継承して、番号を出すようにする",
      intro: [],
      example: "",
      task: "Repeater は、for 文で回すと文字列 \"★\" を n 回出すクラスです。これを継承して、1, 2, 3, … と番号を n 個出すクラス Numbered(n) を作ろう。__init__ では super() で親の __init__ に n をわたしてから、数えるための属性 self.count を 0 にします。item() は self.count を1増やして、その値を返すように書きなおします。",
      starter: REPEATER + "\n\nclass Numbered(Repeater):\n    def __init__(self, n):\n        pass\n",
      solution: REPEATER + "\n\nclass Numbered(Repeater):\n    def __init__(self, n):\n        super().__init__(n)\n        self.count = 0\n\n    def item(self):\n        self.count = self.count + 1\n        return self.count",
      wrong: REPEATER + "\n\nclass Numbered(Repeater):\n    def __init__(self, n):\n        self.count = 0\n\n    def item(self):\n        self.count = self.count + 1\n        return self.count",
      expect: "[1, 2, 3]\n[1]",
      test: "print(list(Numbered(3)))\nprint(list(Numbered(1)))",
      mustInclude: ["super().__init__("],
      hints: [
        "__init__ の中は super().__init__(n) と self.count = 0 の2行です。",
        "item(self) の中は self.count = self.count + 1 と return self.count です。__iter__ と __next__ は親のものがそのまま使えます。",
      ],
      xp: 40,
    },
    {
      id: "l63-ex-bank",
      title: "演習：貯金箱のクラス",
      intro: [],
      example: "",
      task: "クラス Bank を完成させよう。Bank(owner) で作ると、名前を属性 self.owner に、合計を属性 self.total に 0 として覚えます。deposit(x) は self.total に x を足します。__str__ は owner + \"の貯金: \" + str(self.total) + \"円\" の文字列を返します。",
      starter: "class Bank:\n    def __init__(self, owner):\n        pass\n\n    def deposit(self, x):\n        pass\n\n    def __str__(self):\n        pass\n",
      solution:
        'class Bank:\n    def __init__(self, owner):\n        self.owner = owner\n        self.total = 0\n\n    def deposit(self, x):\n        self.total = self.total + x\n\n    def __str__(self):\n        return self.owner + "の貯金: " + str(self.total) + "円"',
      wrong:
        'class Bank:\n    def __init__(self, owner):\n        self.owner = owner\n        self.total = 0\n\n    def deposit(self, x):\n        self.total = x\n\n    def __str__(self):\n        return self.owner + "の貯金: " + str(self.total) + "円"',
      expect: "ぴよの貯金: 350円\n350\nミケの貯金: 0円",
      test: 'b = Bank("ぴよ")\nb.deposit(100)\nb.deposit(250)\nprint(b)\nprint(b.total)\nprint(Bank("ミケ"))',
      mustInclude: ["__str__"],
      hints: ["__init__ では self.owner = owner と self.total = 0 の2行です。deposit では self.total = self.total + x です。", '__str__ では return self.owner + "の貯金: " + str(self.total) + "円" です。'],
      xp: 40,
    },
    {
      id: "l63-ex-squares",
      title: "演習：自分で作ったイテレータを filter と sum に",
      intro: [],
      example: "",
      task: "Squares(n) は、for 文で回すと 1, 4, 9, … と、1 から n までの数の2乗を順に出すクラスです。Squares(6) が出す数のうち、偶数だけの合計を、filter と sum を使って表示しよう。",
      starter: SQUARES,
      solution: SQUARES + "\nprint(sum(filter(lambda x: x % 2 == 0, Squares(6))))",
      wrong: SQUARES + "\nprint(sum(Squares(6)))",
      expect: "56",
      mustInclude: ["filter", "sum"],
      hints: ["偶数かどうかは lambda x: x % 2 == 0 で調べられます。filter には Squares(6) をそのままわたせます。", "print(sum(filter(lambda x: x % 2 == 0, Squares(6)))) です。"],
      xp: 40,
    },
    {
      id: "l63-with",
      title: "with 文に対応する",
      intro: [
        "__enter__ と __exit__ という特殊メソッドを作ると、そのクラスのものを with 文で使えます。",
        "with の中に入るときに __enter__ が、出るときに __exit__ が呼ばれます。__enter__ が返したものが、as のうしろの名前に入ります。",
      ],
      example:
        'class Door:\n    def __enter__(self):\n        print("ドアを開けた")\n        return self\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print("ドアを閉めた")\n\nwith Door() as d:\n    print("部屋の中")',
      task: "with 文の始めに print(\"準備\")、終わりに print(\"片付け\") が動くように、クラス Kitchen に __enter__ と __exit__ を足そう。with Kitchen() as k: の中で k.cook() を呼べるように、__enter__ は self を返します。",
      starter: 'class Kitchen:\n    def cook(self):\n        print("料理中")\n',
      solution:
        'class Kitchen:\n    def cook(self):\n        print("料理中")\n\n    def __enter__(self):\n        print("準備")\n        return self\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print("片付け")',
      wrong:
        'class Kitchen:\n    def cook(self):\n        print("料理中")\n\n    def __enter__(self):\n        print("準備")\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print("片付け")',
      expect: "準備\n料理中\n片付け",
      test: "with Kitchen() as k:\n    k.cook()",
      hints: ['def __enter__(self): の中で print("準備") をして、return self します。', 'def __exit__(self, exc_type, exc_value, traceback): の中で print("片付け") します。引数は4つ必要です。'],
      xp: 35,
    },
  ],
  reads: [
    {
      id: "r63-special",
      title: "len と print で呼ばれるメソッド",
      intro: "len(p) と print(p) で、それぞれどの特殊メソッドが呼ばれるかに注目しよう。",
      code: 'class Pair:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n\n    def __len__(self):\n        return 2\n\n    def __str__(self):\n        return str(self.a) + "と" + str(self.b)\n\np = Pair(30, 50)\nprint(len(p))\nprint(p)',
      choices: ["2\n30と50", "80\n30と50", "2\n<__main__.Pair object>"],
      answer: 0,
      explain:
        "len(p) を使うと __len__ が呼ばれ、その返値の 2 が len の結果になります。中の数を足した 80 ではありません。print(p) を使うと __str__ が呼ばれ、返した文字列「30と50」が表示されます。<__main__.Pair object> のような表示になるのは、__str__ を書いていないときです。",
      xp: 15,
    },
    {
      id: "r63-type",
      title: "同じクラスから作った2つのもの",
      intro: "同じクラスから2回作ると、同じものになるのか、別のものになるのかに注目しよう。",
      code: 'class Bell:\n    def ring(self):\n        return "チリン"\n\na = Bell()\nb = Bell()\nprint(a.ring() == b.ring(), a is b)',
      choices: ["True False", "True True", "False False"],
      answer: 0,
      explain:
        "Bell() と書くたびに、新しいインスタンスが1つずつ作られます。a と b はどちらも Bell の仲間なので ring() は同じ「チリン」を返し、== は True です。けれども、is は「まったく同じ1つのものか」を調べるので、別々に作った a と b では False になります。True True を選んだ人は、「同じクラスなら同じもの」と考えたのかもしれません。クラスは設計図で、そこから作ったものは1つ1つ別物です。",
      xp: 15,
    },
    {
      id: "r63-isinstance",
      title: "isinstance と type",
      intro: "2つのクラスを作り、c がどちらのクラスのインスタンスかを調べています。",
      code: "class Cat:\n    pass\n\nclass Dog:\n    pass\n\nc = Cat()\nprint(isinstance(c, Cat), isinstance(c, Dog), type(c) == Cat)",
      choices: ["True True True", "True False True", "True False False"],
      answer: 1,
      explain:
        "c は Cat() で作ったので、isinstance(c, Cat) は True、isinstance(c, Dog) は False です。type(c) は c を作ったクラスそのもの（Cat）を返すので、type(c) == Cat は True です。True True True を選んだ人は、中身が同じ（どちらも pass だけ）なら同じ種類だと考えています。クラスは名前ごとに別の種類です。",
      xp: 15,
    },
    {
      id: "r63-attr",
      title: "属性と、ふつうの変数",
      intro: "self.size と、外で作った変数 size は別のものです。__init__ の中で何が代入されたかを追いかけよう。",
      code: "class Box:\n    def __init__(self, size):\n        self.size = size * 2\n\nb = Box(3)\nsize = 10\nprint(b.size)",
      choices: ["3", "10", "6"],
      answer: 2,
      explain:
        "Box(3) で __init__ が動き、引数 size には 3 が入ります。self.size = size * 2 なので、b の属性 size は 6 になります。そのあとの size = 10 は、クラスの外のふつうの変数を作っただけで、b の属性とは関係がありません。10 を選んだ人は、名前が同じなので同じものだと思ったのでしょう。3 を選んだ人は、* 2 を見落としています。b.size のように「b の」と付いているものは、b が持っている値です。",
      xp: 15,
    },
    {
      id: "r63-super",
      title: "書いていないメソッドは親から",
      intro: "子のクラス Dog には hello が書かれていません。そのとき、どのメソッドが使われるかを考えよう。",
      code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def hello(self):\n        return self.name + "です"\n\nclass Dog(Animal):\n    def bark(self):\n        return "ワン"\n\nd = Dog("ポチ")\nprint(d.hello(), d.bark())',
      choices: ["ポチです ワン", "ワン ワン", "ポチ ワン"],
      answer: 0,
      explain:
        "Dog は Animal を継承しているので、自分で書いていない __init__ と hello は親の Animal のものが使われます。Dog(\"ポチ\") で親の __init__ が動き、self.name は「ポチ」になります。d.hello() は「ポチです」、d.bark() は Dog で書いた「ワン」です。継承では、子に書いたものが優先され、書いていないものは親から探されます。「です」を見落とした人は、hello の return の中身をもう一度読んでみよう。",
      xp: 15,
    },
    {
      id: "r63-iter",
      title: "使い切ったイテレータ",
      intro: "__next__ の中で self.n が減っていきます。同じものを2回 list にしたら、2回目はどうなるかに注目しよう。",
      code: 'class Two:\n    def __init__(self):\n        self.n = 2\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.n == 0:\n            raise StopIteration\n        self.n = self.n - 1\n        return "ぴよ"\n\nt = Two()\nprint(list(t))\nprint(list(t))',
      choices: ["['ぴよ', 'ぴよ']\n['ぴよ', 'ぴよ']", "['ぴよ']\n['ぴよ']", "['ぴよ', 'ぴよ']\n[]"],
      answer: 2,
      explain:
        "list(t) は、StopIteration が出るまで __next__ を何度も呼び、返ってきた値を集めます。1回目で「ぴよ」が2つ集まり、そのとき self.n は 0 になっています。__iter__ は self をそのまま返すだけで、n を元に戻しません。そのため2回目の list(t) では、最初の __next__ ですぐ StopIteration になり、空のリストです。もう一度回したいときは、Two() で新しく作り直します。",
      xp: 20,
    },
    {
      id: "r63-override",
      title: "self.title() はどちらのメソッド？",
      intro: "show は親の Report にしか書かれていません。その中の self.title() が、どのクラスの title を呼ぶかを考えよう。",
      code: 'class Report:\n    def title(self):\n        return "報告"\n\n    def show(self):\n        return "【" + self.title() + "】"\n\nclass Memo(Report):\n    def title(self):\n        return "メモ"\n\nprint(Report().show(), Memo().show())',
      choices: ["【報告】 【報告】", "【報告】 【メモ】", "【メモ】 【メモ】"],
      answer: 1,
      explain:
        "Memo().show() では、Memo に show がないので親の show が使われます。けれども、その中の self は Memo のインスタンスです。self.title() は「self が持っている title」を探すので、Memo で書きなおした title が使われ、「【メモ】」になります。【報告】 【報告】 を選んだ人は、「親のメソッドの中では親の title が呼ばれる」と考えたのでしょう。どのメソッドが使われるかは、書かれた場所ではなく self の種類で決まります。",
      xp: 20,
    },
  ],
  explain: {},
  topics: [],
  refSections: 7,
  refProse: 4290,
};
