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
  reads: [
    {
      id: "r72-cluster",
      title: "近いものどうしが同じグループに",
      intro: "KMeans で2つのグループに分けたあと、labels_ の番号が同じかどうかをくらべています。",
      code: "from sklearn.cluster import KMeans\n\nX = [[1], [2], [10], [11]]\nkm = KMeans(n_clusters=2, n_init=10, random_state=0)\nkm.fit(X)\nprint(km.labels_[0] == km.labels_[1], km.labels_[1] == km.labels_[2])",
      choices: ["True False", "False True", "True True"],
      answer: 0,
      explain:
        "1 と 2 は近く、10 と 11 も近いので、[1] と [2] が同じグループ、[10] と [11] がもう1つのグループになります。0番目と1番目（1 と 2）は同じ番号なので True、1番目と2番目（2 と 10）は別のグループなので False です。グループの番号が 0 と 1 のどちらになるかは決まっていませんが、同じかどうかは決まります。True True を選んだ人は、n_clusters=2 で2つに分けていることを見落としています。",
      xp: 20,
    },
    {
      id: "r72-stratify",
      title: "stratify で分けたテスト用のラベル",
      intro: "ラベルは 0 が6個、1 が4個です。stratify=y を付けて半分をテスト用にしています。",
      code: "from sklearn.model_selection import train_test_split\n\nX = [[i] for i in range(10)]\ny = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.5, random_state=0, stratify=y)\nprint(sorted(y_te))",
      choices: ["[0, 0, 1, 1, 1]", "[0, 0, 0, 1, 1]", "[0, 0, 0, 0, 0]"],
      answer: 1,
      explain:
        "test_size=0.5 なので、10個の半分の5個がテスト用です。stratify=y を付けると、元の割合（0 が6個、1 が4個で 3:2）と同じ割合で分けるので、テスト用には 0 が3個、1 が2個入ります。sorted で並べると [0, 0, 0, 1, 1] です。[0, 0, 0, 0, 0] を選んだ人は、前から順に取ると考えています。[0, 0, 1, 1, 1] は割合が元とちがいます。",
      xp: 20,
    },
  ],
  explain: {},
  topics: [],
  refSections: 11,
  refProse: 4923,
};
