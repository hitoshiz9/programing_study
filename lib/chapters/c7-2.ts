import type { Chapter } from "./types.ts";

// scikit-learnライブラリ。文章と問題は独自(教材の文は写さない)。
const DATA = "from sklearn.datasets import load_iris\n\n";
const CLS =
  "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\n" +
  "X, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)\n";
const CLS_FIT = CLS + "model = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)\n";
const WINE =
  "from sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\n" +
  "wine = load_wine()\nmask = wine.target < 2  # 種類 0 と 1 のワインだけを使う\nX = wine.data[mask][:, [0, 9]]  # 特徴量はアルコール度数と色の濃さの2つ\ny = wine.target[mask]\n";
const WINE_FIT =
  WINE + "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)\n";
const REG =
  "from sklearn.datasets import load_diabetes\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\n" +
  "data = load_diabetes()\nX = data.data[:, [2]]  # 特徴量は BMI(体格の指数)だけ\ny = data.target  # ラベルは1年後の病気の進み具合(数)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)\n";
const REG_FIT = REG + "model = LinearRegression()\nmodel.fit(X_train, y_train)\n";
const KM = "from sklearn.datasets import load_iris\nfrom sklearn.cluster import KMeans\n\nX, y = load_iris(return_X_y=True)\nX = X[:, 2:]  # 花びらの長さと幅の2つだけを使う\n";
const KM_TEST = "import numpy as np\nprint(sorted(np.bincount(km.labels_).tolist()))\nprint(km.predict([[1.5, 0.2]])[0] == km.labels_[0])";
const WKM = "from sklearn.datasets import load_wine\nfrom sklearn.cluster import KMeans\n\nwine = load_wine()\nX = wine.data[:, [0, 9]]  # アルコール度数と色の濃さ\n";
const PCA_S = "from sklearn.datasets import load_iris\nfrom sklearn.decomposition import PCA\n\nX, y = load_iris(return_X_y=True)\n";

export const chapter: Chapter = {
  ref: "7-2",
  title: "scikit-learnライブラリ",
  url: "https://utokyo-ipp.github.io/7/7-2.html",
  stage: "ml",
  order: [
    "m-sk-linear", "m-sk-coef", "m-sk-knn", "l72-data", "m-sk-iris",
    "l72-logistic", "l72-wine", "l72-regression", "l72-kmeans", "l72-wine-km", "l72-pca",
  ],
  lessons: [
    {
      id: "l72-data",
      title: "機械学習のデータの形",
      intro: [
        "機械学習のデータは、1行が1つのデータ、1列が1つの特徴（特徴量）という2次元配列 X と、それぞれの答え（ラベル）を並べた1次元配列 y に分けて持ちます。",
        "load_iris() は、アヤメの花のデータを読みこみます。.data が特徴量、.target がラベル、.target_names がラベルの番号に対応する種類の名前です。",
      ],
      example: DATA + "iris = load_iris()\nprint(iris.feature_names[0])",
      task: "load_iris() で読みこんだデータの、特徴量（data）の形、ラベル（target）の形、種類の名前（target_names を .tolist() でリストにしたもの）を、この順に1行ずつ表示しよう。",
      starter: DATA + "iris = load_iris()\n",
      solution: DATA + "iris = load_iris()\nprint(iris.data.shape)\nprint(iris.target.shape)\nprint(iris.target_names.tolist())",
      wrong: DATA + "iris = load_iris()\nprint(iris.data.shape)\nprint(iris.target.shape)\nprint(iris.feature_names)",
      expect: "(150, 4)\n(150,)\n['setosa', 'versicolor', 'virginica']",
      hints: ["形は .shape です。print(iris.data.shape) のように書きます。", "種類の名前は print(iris.target_names.tolist()) です。"],
      xp: 25,
    },
    {
      id: "l72-logistic",
      title: "分類：ロジスティック回帰",
      intro: [
        "LogisticRegression（ロジスティック回帰）は、分類によく使われるモデルです。名前に「回帰」と付いていますが、種類を当てる分類の道具です。",
        "accuracy_score(正解, 予測) は、予測が正解と一致した割合（正解率）を返します。",
      ],
      example: "from sklearn.metrics import accuracy_score\nprint(accuracy_score([0, 1, 1, 0], [0, 1, 0, 0]))",
      task: "LogisticRegression(max_iter=1000) で model を作って学習用データで学習し、テスト用データ X_test の予測から、accuracy_score で正解率を求めて、round で小数第3位までにして表示しよう。",
      starter: CLS,
      solution: CLS_FIT + "pred = model.predict(X_test)\nprint(round(accuracy_score(y_test, pred), 3))",
      wrong: CLS_FIT + "pred = model.predict(X_train)\nprint(round(accuracy_score(y_train, pred), 3))",
      expect: "0.978",
      mustInclude: ["LogisticRegression(", "fit"],
      hints: ["model = LogisticRegression(max_iter=1000) と model.fit(X_train, y_train) を書きます。", "pred = model.predict(X_test) のあと print(round(accuracy_score(y_test, pred), 3)) です。"],
      xp: 35,
    },
    {
      id: "l72-wine",
      title: "練習：2つの特徴量でワインを分類する",
      intro: ["分類の流れは、どのデータでも同じです。データを分ける → モデルを作る → 学習する → テスト用データで予測して正解率を測る、の順に書いてみよう。"],
      example: "# 分ける → 作る → fit → predict → accuracy_score",
      task: "X と y を train_test_split で分け（test_size=0.3, random_state=0, stratify=y）、LogisticRegression(max_iter=1000) で学習して、テスト用データの正解率を round で小数第3位までにして表示しよう。",
      starter: WINE,
      solution: WINE_FIT + "print(round(accuracy_score(y_test, model.predict(X_test)), 3))",
      wrong: WINE_FIT + "print(round(accuracy_score(y_train, model.predict(X_train)), 3))",
      expect: "0.872",
      mustInclude: ["train_test_split(", "fit"],
      hints: ["X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y) で分けます。", "model.fit(X_train, y_train) のあと print(round(accuracy_score(y_test, model.predict(X_test)), 3)) です。"],
      xp: 40,
    },
    {
      id: "l72-regression",
      title: "回帰：数を予測してずれを測る",
      intro: [
        "数そのもの（値段や点数など）を予測することを「回帰」といいます。LinearRegression（線形回帰）は、データにいちばん合う直線を求めます。",
        "mean_squared_error(正解, 予測) は、予測のずれを2乗して平均した値（平均二乗誤差）です。小さいほど、よく当たっています。",
      ],
      example: "from sklearn.metrics import mean_squared_error\nprint(mean_squared_error([1, 2], [2, 4]))",
      task: "LinearRegression で model を作って学習用データで学習し、テスト用データでの平均二乗誤差を、round で小数第1位までにして表示しよう。",
      starter: REG,
      solution: REG_FIT + "pred = model.predict(X_test)\nprint(round(mean_squared_error(y_test, pred), 1))",
      wrong: REG_FIT + "pred = model.predict(X_train)\nprint(round(mean_squared_error(y_train, pred), 1))",
      expect: "3921.4",
      mustInclude: ["fit", "mean_squared_error("],
      hints: ["model = LinearRegression() と model.fit(X_train, y_train) を書きます。", "pred = model.predict(X_test) のあと print(round(mean_squared_error(y_test, pred), 1)) です。"],
      xp: 35,
    },
    {
      id: "l72-kmeans",
      title: "クラスタリング：似たものどうしに分ける",
      intro: [
        "答え（ラベル）を使わずに、データを似たものどうしのグループ（クラスタ）に分けることを「クラスタリング」といいます。KMeans は、その代表的なモデルです。",
        "KMeans(n_clusters=グループの数) で作り、fit で学習すると、.labels_ に、それぞれのデータが入ったグループの番号が入ります。",
        "はじめて動かすときは、部品の読みこみに少し時間がかかります。",
      ],
      example: "from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=2, n_init=10, random_state=0)",
      task: "KMeans(n_clusters=3, n_init=10, random_state=0) で km という名前のモデルを作り、X で学習しよう（判定では、グループごとの数などを調べます）。",
      starter: KM,
      solution: KM + "km = KMeans(n_clusters=3, n_init=10, random_state=0)\nkm.fit(X)",
      wrong: KM + "km = KMeans(n_clusters=2, n_init=10, random_state=0)\nkm.fit(X)",
      test: KM_TEST,
      expect: "[48, 50, 52]\nTrue",
      mustInclude: ["KMeans(", "fit"],
      hints: ["km = KMeans(n_clusters=3, n_init=10, random_state=0) で作ります。", "km.fit(X) で学習します。fit には y を渡しません。"],
      xp: 35,
    },
    {
      id: "l72-wine-km",
      title: "練習：ワインをクラスタリングする",
      intro: ["クラスタリングでも、作る → fit の流れは同じです。グループの数は、自分で決めて渡します。"],
      example: "# km = KMeans(...)\n# km.fit(X)\n# print(km.labels_)",
      task: "ワインの2つの特徴量 X を、KMeans(n_clusters=3, n_init=10, random_state=0) で km という名前のモデルにして学習しよう。そのあと、グループごとのデータの数を、少ない順に並べたリストで表示しよう（ヒント：np.bincount(km.labels_) でグループごとの数になります）。",
      starter: WKM,
      solution: WKM + "import numpy as np\n\nkm = KMeans(n_clusters=3, n_init=10, random_state=0)\nkm.fit(X)\nprint(sorted(np.bincount(km.labels_).tolist()))",
      wrong: WKM + "import numpy as np\n\nkm = KMeans(n_clusters=2, n_init=10, random_state=0)\nkm.fit(X)\nprint(sorted(np.bincount(km.labels_).tolist()))",
      test: "import numpy as np\nprint(sorted(np.bincount(km.labels_).tolist()))",
      expect: "[36, 65, 77]",
      mustInclude: ["KMeans(", "fit"],
      hints: ["km = KMeans(n_clusters=3, n_init=10, random_state=0) と km.fit(X) を書きます。", "import numpy as np のあと print(sorted(np.bincount(km.labels_).tolist())) です。"],
      xp: 40,
    },
    {
      id: "l72-pca",
      title: "次元削減：特徴量を少なくまとめる",
      intro: [
        "PCA（主成分分析）は、たくさんの特徴量を、もとの情報をなるべく残したまま、少ない数の特徴量にまとめなおします。これを「次元削減」といいます。",
        "PCA(n_components=まとめたあとの数) で作り、fit で学習してから transform で変換します。",
      ],
      example: "from sklearn.decomposition import PCA\npca = PCA(n_components=1)",
      task: "PCA(n_components=2) で pca を作り、4つの特徴量を持つ X を学習・変換して X_2d としよう。X_2d の形を表示し、次の行に pca.explained_variance_ratio_ を .round(2) で小数第2位までにして表示しよう。",
      starter: PCA_S,
      solution: PCA_S + "pca = PCA(n_components=2)\npca.fit(X)\nX_2d = pca.transform(X)\nprint(X_2d.shape)\nprint(pca.explained_variance_ratio_.round(2))",
      wrong: PCA_S + "pca = PCA(n_components=3)\npca.fit(X)\nX_2d = pca.transform(X)\nprint(X_2d.shape)\nprint(pca.explained_variance_ratio_.round(2))",
      expect: "(150, 2)\n[0.92 0.05]",
      mustInclude: ["PCA("],
      hints: ["pca = PCA(n_components=2)、pca.fit(X)、X_2d = pca.transform(X) の順です。", "print(X_2d.shape) と print(pca.explained_variance_ratio_.round(2)) です。"],
      xp: 35,
    },
  ],
  reads: [],
  explain: {
    "m-sk-linear": [
      { h: "機械学習とは" },
      { p: "機械学習では、まず「モデル」と呼ばれる計算のしくみを用意します。モデルの中には、計算の仕方を決める数（パラメータ）がいくつも入っています。手元のデータにできるだけよく合うように、このパラメータを自動で調整することを「学習」と呼びます。人が決まりを1つずつ書くのではなく、データから決まりを見つけさせるのがポイントです。" },
      { p: "学習が終わったモデルは、まだ見たことのない新しいデータについても、それらしい答えを出せます。これを「予測」と呼びます。たとえば、勉強時間と点数のデータで学習したモデルに「6時間」を渡すと、そのときの点数を予測してくれます。" },
      { h: "scikit-learn" },
      { p: "scikit-learn は、分類・回帰・クラスタリング・次元削減といった機械学習の手法に加えて、データの前処理（使いやすい形に整えること）や、モデルの選び方・確かめ方の道具までそろえたライブラリです。import するときの名前は sklearn です。" },
      { p: "scikit-learn のモデルは、どれも Python のクラスとして作られていて、使い方がそろっています。モデルを作る、fit で学習する、predict で予測する、の3つを覚えれば、ほかのモデルにもすぐに乗りかえられます。" },
    ],
    "m-sk-coef": [
      { h: "学習したパラメータを見る" },
      { p: "線形回帰が学習するパラメータは、直線の傾きと切片です。scikit-learn では、学習して決まったパラメータの名前の最後に _（アンダースコア）が付いています。coef_ や intercept_ のように _ で終わる属性は、「fit のあとで値が入るもの」という目じるしです。fit する前に見ようとするとエラーになります。" },
      { p: "傾き 10 は「1時間ふやすごとに点数が 10 点上がる」、切片 40 は「0時間でも 40 点」という意味です。モデルの中身を見て、データの決まりを読みとれるのも、線形回帰のよいところです。" },
    ],
    "m-sk-knn": [
      { h: "教師あり学習" },
      { p: "データの特徴（特徴量）と、それぞれのデータの「正解」（ラベル）がそろっているとき、そのラベルをお手本（教師）にして、特徴量からラベルを当てるモデルを学習することを「教師あり学習」といいます。" },
      { p: "教師あり学習は、ラベルの種類によって2つに分かれます。値段や気温のように、なめらかにつながった数（連続値）を当てるのが「回帰」、りんごかみかんか、のように、とびとびの種類（離散値）を当てるのが「分類」です。同じ数のラベルでも、0・1・2 が「種類の番号」を表しているなら分類です。" },
      { h: "k 近傍法" },
      { p: "KNeighborsClassifier（k 近傍法）は、予測したいデータにいちばん近い k 個の学習データを探し、その中で多い種類を答えにします。n_neighbors= が k です。しくみが分かりやすいので、分類の入門によく使われます。" },
    ],
    "l72-data": [
      { h: "データは表の形" },
      { p: "機械学習に使うデータは、DataFrame や2次元配列のような表の形で表します。1行が1つのデータ（ここでは1本の花）、1列が1つの特徴量です。アヤメのデータは150本の花について、がくの長さと幅、花びらの長さと幅の4つの特徴量を持っているので、形は (150, 4) です。" },
      { p: "ラベルは、データの数と同じ長さの1次元配列（または pandas の Series）で持ちます。アヤメでは、花の種類が 0・1・2 の番号に置きかえられていて、target_names を見ると、どの番号がどの種類かが分かります。" },
      { code: "from sklearn.datasets import load_iris\n\niris = load_iris()\nprint(iris.data[0])\nprint(iris.target[0], iris.target_names[iris.target[0]])", out: "[5.1 3.5 1.4 0.2]\n0 setosa" },
      { p: "load_iris(return_X_y=True) と書くと、特徴量の X とラベルの y を、2つの配列としてまとめて受け取れます。as_frame=True を付ければ、pandas の DataFrame として受け取ることもできます。" },
      { p: "scikit-learn には、アヤメのほかにも、ワイン（load_wine）、手書き数字（load_digits）、病気の進み具合（load_diabetes）など、練習用のデータが最初から入っています。インターネットから取ってくる種類のデータ（fetch_ で始まるもの）は、このアプリでは使えません。" },
    ],
    "m-sk-iris": [
      { h: "学習の手順" },
      { p: "scikit-learn でモデルを学習させる手順は、どのモデルでもほぼ同じです。①使うモデルのクラスを選ぶ。②モデルの設定（ハイパーパラメータ）を決めて、モデルを作る。③データを用意する。④fit で学習する。⑤モデルを評価する（どのくらい当たるか確かめる）。" },
      { p: "ハイパーパラメータとは、n_neighbors やグループの数のように、学習の前に人が決めておく設定のことです。学習で自動的に決まるパラメータとは区別して呼びます。" },
      { p: "教師あり学習では、③で特徴量とラベルを用意し、それを学習用（訓練データ）と評価用（テストデータ）に分けます。⑤では、テストデータの特徴量から predict でラベルを予測し、本当のラベルと比べます。教師なし学習ではラベルを使わず、特徴量だけで fit し、transform や predict で結果を取り出します。" },
      { h: "なぜ分けるのか" },
      { p: "学習に使ったデータでモデルを評価すると、答えを知っている問題でテストするのと同じなので、実力より高く出てしまいます。テストデータは学習に一切使わずに取っておき、最後の評価だけに使います。train_test_split の random_state= は分け方を決める乱数の種で、決めておくと毎回同じ分け方になります。" },
    ],
    "l72-logistic": [
      { h: "ロジスティック回帰で分類する" },
      { p: "ロジスティック回帰は、特徴量から「それぞれの種類である確からしさ」を計算し、いちばん確からしい種類を答えにするモデルです。scikit-learn では、すべてのモデルがクラスになっているので、from sklearn.linear_model import LogisticRegression のように、使うクラスを import してから作ります。" },
      { p: "max_iter= は、学習のときに計算をくり返す回数の上限です。足りないと「収束しなかった」（ConvergenceWarning）という注意書きが出るので、ここでは多めの 1000 にしています。" },
      { h: "stratify で割合をそろえる" },
      { p: "train_test_split に stratify=y を付けると、学習用とテスト用のそれぞれで、ラベルの種類の割合が元のデータと同じになるように分けてくれます。アヤメは3種類が50本ずつなので、30% をテスト用にすると、テスト用には各種類が15本ずつ入ります。" },
      { code: "import numpy as np\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)\nprint(len(X_tr), len(X_te))\nprint(np.bincount(y_te))", out: "105 45\n[15 15 15]" },
      { h: "正解率" },
      { p: "accuracy_score(本当のラベル, 予測したラベル) は、予測が当たった割合を 0〜1 で返します。0.978 なら、45本のうち44本を正しく分類できた、ということです。model.score(X_test, y_test) でも同じ値が求められます。" },
    ],
    "l72-wine": [
      { h: "練習のねらい" },
      { p: "この練習では、アヤメとは別のデータ（ワイン）で、データの分割から評価までを自分で書きます。データの中身が変わっても、書くコードの形はほとんど変わらないことを確かめましょう。" },
      { p: "最初のコードでは、ワインの3種類のうち2種類だけを選び（mask）、13ある特徴量のうちアルコール度数と色の濃さの2つだけを取り出しています。wine.target < 2 は真理値の配列なので、5-3 で学んだ「真理値の配列で取り出す」書き方で行を選べます。[:, [0, 9]] は「すべての行の、0列目と9列目」です。" },
      { p: "特徴量を2つにしぼると、正解率はアヤメのときほど高くなりません。どの特徴量を使うかで結果が大きく変わるので、実際の分析では、いろいろな組み合わせを試して比べます。" },
      { code: "from sklearn.datasets import load_wine\n\nwine = load_wine()\nprint(wine.data.shape)\nprint(wine.feature_names[0], wine.feature_names[9])", out: "(178, 13)\nalcohol color_intensity" },
    ],
    "l72-regression": [
      { h: "線形回帰で数を予測する" },
      { p: "回帰では、ラベルが連続した数です。ここでは、糖尿病の人の検査データ（load_diabetes）から、BMI（体格の指数）を特徴量、1年後の病気の進み具合を表す数をラベルにして、線形回帰で予測します。データを分ける、fit で学習する、predict で予測する、という流れは分類と同じです。" },
      { p: "学習の前に、まず散布図（付録の Matplotlib で学ぶ scatter）で特徴量とラベルの関係を見て、「直線で表せそうか」を確かめておくと、モデル選びの手がかりになります。" },
      { h: "平均二乗誤差" },
      { p: "回帰では、分類のように「当たった・外れた」で数えることができません。そこで、予測と本当の値の差（誤差）を2乗して平均した「平均二乗誤差」で、どのくらいずれているかを測ります。2乗するのは、プラスとマイナスのずれが打ち消しあわないようにするためです。0 に近いほど、よく当たっています。" },
      { code: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit([[1], [2], [3]], [3, 5, 7])\nprint(round(model.coef_[0], 2), round(model.intercept_, 2))\nprint(model.predict([[10]]).round(2))", out: "2.0 1.0\n[21.]" },
      { p: "学習した coef_（傾き）と intercept_（切片）を使えば、学習した直線を、元のデータの散布図に重ねて描くこともできます。線がデータの集まりの中を通っていれば、うまく当てはまっているといえます。" },
    ],
    "l72-kmeans": [
      { h: "教師なし学習" },
      { p: "ラベルを使わずに、特徴量だけからデータの構造やパターンを見つけるモデルを学習することを「教師なし学習」といいます。代表的なものが、データを似たものどうしのグループに分ける「クラスタリング」と、特徴量をより少ない数で表しなおす「次元削減」です。" },
      { h: "KMeans" },
      { p: "KMeans（k 平均法）は、グループの中心をいくつか置き、「それぞれのデータをいちばん近い中心のグループに入れる」「グループの中心を、入ったデータの平均の位置に動かす」をくり返して、グループを決めます。n_clusters= で、いくつのグループに分けるか（ハイパーパラメータ）を決めます。" },
      { p: "はじめの中心の置き方は乱数で決まるので、random_state= で種を決めておくと、毎回同じ結果になります。n_init=10 は、置き方を10通り試して、いちばんよくまとまった結果を選ぶ、という指定です。" },
      { p: "fit で学習すると、labels_ にそれぞれのデータのグループの番号が入ります。新しいデータが、どのグループに入るかは predict で調べられます。グループの番号（0・1・2）は、たまたま付いた名前のようなもので、花の種類の番号とは一致するとは限りません。" },
      { p: "アヤメの花びらの長さと幅でクラスタリングすると、ほぼ 50 本ずつの3つのグループに分かれ、本当の3つの種類とよく対応します。ラベルを一度も見ていないのに、種類の違いを見つけられたことになります。" },
    ],
    "l72-wine-km": [
      { h: "練習のねらい" },
      { p: "ワインの2つの特徴量（アルコール度数と色の濃さ）で、3つのグループに分けてみます。np.bincount( ) は、0, 1, 2, … のそれぞれの番号が何回出てくるかを数える関数なので、labels_ に使うとグループごとのデータの数になります。グループの番号の付き方に左右されないよう、sorted で少ない順に並べて表示します。" },
      { code: "import numpy as np\n\nprint(np.bincount(np.array([0, 2, 2, 1, 2])))", out: "[1 1 3]" },
      { p: "結果のグループの大きさは、本当のワインの種類ごとの数（59・71・48本）とはずいぶん違います。クラスタリングは、与えた特徴量の上で「近いもの」をまとめるだけなので、選んだ特徴量で種類の違いがはっきり表れていなければ、種類と一致するグループにはなりません。n_clusters や特徴量を変えて、結果がどう変わるか試してみましょう。" },
    ],
    "l72-pca": [
      { h: "次元削減" },
      { p: "特徴量が多いと、グラフに描いて眺めることができず、計算にも時間がかかります。次元削減は、データのちらばり方の特徴をなるべく保ったまま、特徴量の数（次元）を減らす方法です。PCA（主成分分析）は、データがいちばん大きくちらばっている向きを1つめの新しい軸、その次に大きくちらばっている向きを2つめの軸…と選びなおします。" },
      { p: "n_components= で、減らしたあとの次元の数を決めます。fit で軸を学習し、transform で、それぞれのデータを新しい軸での値に変換します。fit_transform(X) と書くと、2つを一度に行えます。" },
      { p: "explained_variance_ratio_ は、それぞれの新しい軸が、もとのデータのちらばりの何割を表しているかです。アヤメでは1つめの軸だけで 92%、2つめと合わせて約 98% になるので、4つの特徴量を2つにしても、ほとんどの情報が残っていることが分かります。" },
      { code: "from sklearn.datasets import load_iris\nfrom sklearn.decomposition import PCA\n\nX, y = load_iris(return_X_y=True)\nX_2d = PCA(n_components=2).fit_transform(X)\nprint(X_2d.shape)\nprint(X_2d[y == 0, 0].max() < X_2d[y == 1, 0].min())", out: "(150, 2)\nTrue" },
      { p: "2次元にしたデータは、散布図に描けます。種類ごとに色を分けて描くと、新しい2つの軸の上でも、種類ごとにまとまって分かれている様子が見えます。上の例でも、1つめの軸だけで setosa（0）と versicolor（1）がきれいに分かれています。" },
    ],
  },
  topics: [
    ["機械学習について", ["m-sk-linear", "m-sk-coef"]],
    ["教師あり学習", ["m-sk-knn", "m-sk-linear"]],
    ["教師なし学習", ["l72-kmeans", "l72-pca"]],
    ["データ", ["l72-data"]],
    ["モデル学習の基礎", ["m-sk-iris"]],
    ["教師あり学習・分類の例", ["l72-logistic"]],
    ["練習: 2つの特徴量で2種類を分類する", ["l72-wine"]],
    ["教師あり学習・回帰の例", ["l72-regression"]],
    ["教師なし学習・クラスタリングの例", ["l72-kmeans"]],
    ["練習: 2つの特徴量でクラスタリングする", ["l72-wine-km"]],
    ["教師なし学習・次元削減の例", ["l72-pca"]],
  ],
  refSections: 11,
  refProse: 4923,
};
