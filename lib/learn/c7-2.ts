import type { LearnChapter } from "./types.ts";

// 7-2 scikit-learn ライブラリ。節の並びは東大教材に合わせ、文章と例はすべて独自に書いている(教材は改変禁止のため)。
export const chapter: LearnChapter = {
  ref: "7-2",
  sections: [
    {
      title: "機械学習について",
      blocks: [
        { h: "学習と予測: fit と predict" },
        { p: "機械学習では、まず「モデル」と呼ばれる計算のしくみを用意します。モデルの中には、計算の仕方を決める数（パラメータ）が入っています。手元のデータにできるだけ合うように、パラメータを自動で調整することを「学習」と呼びます。学習が終わったモデルは、まだ見たことのない新しいデータについても答えを出せます。これを「予測」と呼びます。" },
        { p: "scikit-learn（サイキット・ラーン）は、機械学習の道具をそろえたライブラリで、import するときの名前は sklearn です。from sklearn.linear_model import LinearRegression のように、使うモデルのクラスを読みこみます。LinearRegression（線形回帰）は、データにいちばん合う直線を求めるモデルです。はじめて使うときは、読みこみに少し時間がかかります。" },
        { p: "使い方はどのモデルも同じで、① model = LinearRegression() でモデルを作る、② model.fit(X, y) で学習する、③ model.predict(新しいX) で予測する、の3つです。X は [[1], [2], [3]] のように、1つのデータを [ ] で囲んだリストのリスト（表の形）でわたします。y はそれぞれの答えのリストです。predict にも、同じ表の形でわたします。" },
        { code: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit([[1], [2], [3]], [3, 5, 7])\nprint(model.predict([[10]]))", out: "[21.]" },
        { p: "predict の結果は NumPy の配列で出てきます。[21.] は「21.0 が1つ入った配列」という意味です（NumPy は 21.0 を 21. と表示します）。" },
        { try: "m-sk-linear" },
        { h: "学習した決まり: coef_ と intercept_" },
        { p: "LinearRegression は「y = 傾き × x + 切片」という直線を学習します。学習したあと、傾きは model.coef_[0] で、切片は model.intercept_ で見られます。coef_ や intercept_ のように名前の最後に _（アンダースコア）が付いた属性は、「fit のあとで値が入るもの」という目じるしです。" },
        { code: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit([[1], [2], [3]], [3, 5, 7])\nprint(round(model.coef_[0], 2), round(model.intercept_, 2))", out: "2.0 1.0" },
        { p: "傾き 2.0 は「x が 1 ふえるごとに y が 2 ふえる」、切片 1.0 は「x が 0 のとき y は 1」という意味です。計算のずれで長い小数になることがあるので、round で丸めて表示しています。" },
        { try: "m-sk-coef" },
      ],
    },
    {
      title: "教師あり学習",
      blocks: [
        { h: "分類と回帰・k 近傍法" },
        { p: "データの特徴（特徴量）と、それぞれのデータの正解（ラベル）がそろっているとき、ラベルをお手本（教師）にして、特徴量からラベルを当てるモデルを学習することを「教師あり学習」といいます。" },
        { p: "教師あり学習は2つに分かれます。値段や点数のように、なめらかにつながった数を当てるのが「回帰」、りんごかみかんか、のように種類を当てるのが「分類」です。" },
        { p: "分類のモデルの1つに、from sklearn.neighbors import KNeighborsClassifier で読みこむ KNeighborsClassifier（k 近傍法）があります。予測したいデータにいちばん近い k 個の学習データを探し、その中で多い種類を答えにします。KNeighborsClassifier(n_neighbors=1) なら、いちばん近い1個の種類をまねします。使い方は fit → predict で同じです。predict に、いくつかのデータを [[…], […]] のようにまとめてわたすと、まとめて予測します。" },
        { code: 'from sklearn.neighbors import KNeighborsClassifier\n\nX = [[1], [2], [10], [11]]\ny = ["小", "小", "大", "大"]\nmodel = KNeighborsClassifier(n_neighbors=1)\nmodel.fit(X, y)\nprint(model.predict([[3]]))\nprint(model.predict([[3], [9]]))', out: "['小']\n['小' '大']" },
        { p: "NumPy の配列は、要素のあいだにカンマを入れずに表示します。" },
        { try: "m-sk-knn" },
      ],
    },
    {
      title: "教師なし学習",
      blocks: [
        { h: "ラベルを使わない: クラスタリング" },
        { p: "ラベルを使わずに、特徴量だけからデータの特徴やまとまりを見つけるモデルを学習することを「教師なし学習」といいます。代表的なものが、データを似たものどうしのグループ（クラスタ）に分ける「クラスタリング」と、特徴量をより少ない数で表しなおす「次元削減」です（次元削減は、この章の最後で学びます）。" },
        { p: "クラスタリングのモデルの1つが、from sklearn.cluster import KMeans で読みこむ KMeans です。KMeans(n_clusters=グループの数, n_init=10, random_state=0) で作り、km.fit(X) で学習します。ラベルを使わないので、fit には X だけをわたします。学習すると、km.labels_ に、それぞれのデータが入ったグループの番号が並びます。近いデータどうしは、同じ番号になります。" },
        { p: "グループの番号（0 や 1）は、たまたま付いた名前のようなものです。どのグループが 0 になるかは決まっていないので、「同じ番号かどうか」を見ます。" },
        { code: "from sklearn.cluster import KMeans\n\nX = [[0], [1], [20], [21], [22]]\nkm = KMeans(n_clusters=2, n_init=10, random_state=0)\nkm.fit(X)\nprint(km.labels_)", out: "[1 1 0 0 0]" },
        { try: "r72-cluster" },
      ],
    },
    {
      title: "データ",
      blocks: [
        { h: "特徴量の X と、ラベルの y" },
        { p: "機械学習のデータは、1行が1つのデータ、1列が1つの特徴量という表の形（DataFrame や2次元配列）で表します。ラベルは、データの数と同じ長さの1次元配列（または Series）で持ちます。" },
        { p: "scikit-learn には練習用のデータが入っています。from sklearn.datasets import load_iris として load_iris() を呼ぶと、アヤメの花150本のデータが読みこめます。.data が特徴量（がくの長さと幅、花びらの長さと幅の4つ）の配列、.target がラベル（種類を 0・1・2 の番号にしたもの）の配列、.target_names が番号に対応する種類の名前、.feature_names が特徴量の名前です。配列の形は .shape で、配列をリストにするには .tolist() を使います（5-3 で学びました）。" },
        { p: "load_iris(return_X_y=True) と書くと、特徴量 X とラベル y の2つを、まとめて受け取れます。ほかにも、ワインのデータを読みこむ load_wine や、病気の進み具合のデータを読みこむ load_diabetes などがあります。" },
        { code: "from sklearn.datasets import load_iris\n\niris = load_iris()\nprint(iris.data[0])\nprint(iris.target[0], iris.target_names[iris.target[0]])\nprint(iris.feature_names[0])", out: "[5.1 3.5 1.4 0.2]\n0 setosa\nsepal length (cm)" },
        { p: "1本目の花は、ラベルが 0 で、種類の名前は setosa です。" },
        { try: "l72-data" },
      ],
    },
    {
      title: "モデル学習の基礎",
      blocks: [
        { h: "学習用とテスト用に分ける" },
        { p: "モデルを学習させる手順は、どのモデルでもほぼ同じです。① 使うモデルのクラスを選ぶ。② 設定を決めてモデルを作る。③ データを用意する。④ fit で学習する。⑤ どのくらい当たるかを確かめる（評価）。n_neighbors やグループの数のように、学習の前に人が決めておく設定を「ハイパーパラメータ」といいます。" },
        { p: "学習に使ったデータで評価すると、答えを知っている問題でテストするのと同じで、実力より高く出てしまいます。そこで from sklearn.model_selection import train_test_split で読みこむ train_test_split で、データを学習用とテスト用に分けます。X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0) と書くと、30% がテスト用になります。random_state= は分け方を決める乱数の種で、決めておくと毎回同じ分け方になります。" },
        { p: "教師あり学習の評価では、テスト用の特徴量から予測して、本当のラベルと比べます。分類のモデルなら model.score(X_test, y_test) で正解の割合（0〜1。1.0 なら全問正解）が求められます。from sklearn.tree import DecisionTreeClassifier で読みこむ DecisionTreeClassifier（決定木）も分類のモデルで、使い方は同じです。" },
        { code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)\nprint(len(X_train), len(X_test))\nmodel = KNeighborsClassifier(n_neighbors=3)\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))", out: "120 30\n0.9666666666666667" },
        { p: "150本の 20% の30本がテスト用になり、30本中29本が当たっています。" },
        { try: "m-sk-iris" },
      ],
    },
    {
      title: "教師あり学習・分類の例",
      blocks: [
        { h: "割合をそろえて分ける: stratify" },
        { p: "train_test_split に stratify=y を付けると、学習用とテスト用のそれぞれで、ラベルの種類の割合が元のデータと同じになるように分けてくれます。下の例では、0 と 1 のラベルが 6:3（2:1）なので、3個のテスト用にも 0 が2個、1 が1個入ります。" },
        { code: "from sklearn.model_selection import train_test_split\n\nX = [[i] for i in range(9)]\ny = [0, 0, 0, 0, 0, 0, 1, 1, 1]\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=3, random_state=0, stratify=y)\nprint(sorted(y_tr), sorted(y_te))", out: "[0, 0, 0, 0, 1, 1] [0, 0, 1]" },
        { p: "test_size= に 3 のような整数を書くと、割合ではなく「テスト用の個数」になります。" },
        { try: "r72-stratify" },
        { h: "ロジスティック回帰と正解率" },
        { p: "from sklearn.linear_model import LogisticRegression で読みこむ LogisticRegression（ロジスティック回帰）は、分類によく使われるモデルです。名前に「回帰」と付いていますが、種類を当てる分類の道具です。LogisticRegression(max_iter=1000) の max_iter= は、学習の計算をくり返す回数の上限で、足りないと注意書きが出るので多めにしておきます。" },
        { p: "from sklearn.metrics import accuracy_score で読みこむ accuracy_score(本当のラベル, 予測したラベル) は、予測が当たった割合（正解率）を 0〜1 で返します。4個のうち3個が当たっていれば 0.75 です。" },
        { code: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nprint(accuracy_score([0, 1, 1, 0], [0, 1, 0, 0]))\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit([[1], [2], [8], [9]], [0, 0, 1, 1])\npred = model.predict([[0], [10]])\nprint(pred)\nprint(accuracy_score([0, 1], pred))", out: "0.75\n[0 1]\n1.0" },
        { p: "テスト用のデータで評価するときは、pred = model.predict(X_test) で予測してから、accuracy_score(y_test, pred) で比べます。" },
        { try: "l72-logistic" },
      ],
    },
    {
      title: "教師あり学習・回帰の例",
      blocks: [
        { h: "回帰のずれを測る: 平均二乗誤差" },
        { p: "回帰では、ラベルが数なので、分類のように「当たった・外れた」で数えられません。そこで、予測と本当の値の差（誤差）を2乗して平均した「平均二乗誤差」で、どのくらいずれているかを測ります。2乗するのは、プラスとマイナスのずれが打ち消しあわないようにするためです。0 に近いほど、よく当たっています。" },
        { p: "from sklearn.metrics import mean_squared_error で読みこむ mean_squared_error(本当の値, 予測) で計算できます。学習の流れ（分ける → 作る → fit → predict）は分類と同じです。" },
        { code: "from sklearn.metrics import mean_squared_error\n\nprint(mean_squared_error([1, 2, 3], [2, 2, 5]))", out: "1.6666666666666667" },
        { p: "ずれは 1・0・2 なので、2乗すると 1・0・4、その平均は 5 / 3 です。" },
        { p: "load_diabetes() で読みこむデータは、.data が特徴量、.target がラベル（1年後の病気の進み具合を表す数）です。data.data[:, [2]] は、5-3 で学んだ書き方で「すべての行の、2列目だけ」を2次元のまま取り出したもので、2列目は BMI（体格の指数）です。" },
        { try: "l72-regression" },
      ],
    },
    {
      title: "教師なし学習・クラスタリングの例",
      blocks: [
        { h: "KMeans のしくみ" },
        { p: "KMeans（k 平均法）は、グループの中心をいくつか置き、「それぞれのデータをいちばん近い中心のグループに入れる」「中心を、入ったデータの平均の位置に動かす」をくり返して、グループを決めます。最初の中心の置き方は乱数で決まるので、random_state= で種を決めておくと毎回同じ結果になります。n_init=10 は、置き方を10通り試して、いちばんよくまとまった結果を選ぶ、という指定です。" },
        { p: "学習したあと、km.predict(新しいX) で、新しいデータがどのグループに入るかが分かります。np.bincount(配列) は、0, 1, 2, … のそれぞれの番号が何回出てくるかを数える NumPy の関数なので、km.labels_ にわたすとグループごとのデータの数になります。番号の付き方に左右されないように、sorted で少ない順に並べて見ると比べやすくなります。" },
        { code: "import numpy as np\nfrom sklearn.cluster import KMeans\n\nX = [[1, 1], [1, 2], [8, 8], [9, 8], [8, 9]]\nkm = KMeans(n_clusters=2, n_init=10, random_state=0)\nkm.fit(X)\nprint(np.bincount(km.labels_))\nprint(sorted(np.bincount(km.labels_).tolist()))\nprint(km.predict([[9, 9]])[0] == km.labels_[2])", out: "[3 2]\n[2, 3]\nTrue" },
        { p: "最後の行は、新しいデータ [9, 9] が、3つめのデータ [8, 8] と同じグループに入ることを確かめています。" },
        { try: "l72-kmeans" },
      ],
    },
    {
      title: "教師なし学習・次元削減の例",
      blocks: [
        { h: "特徴量を少なくまとめる: PCA" },
        { p: "特徴量が多いと、グラフに描いて眺められず、計算にも時間がかかります。次元削減は、データのちらばり方の特徴をなるべく残したまま、特徴量の数（次元）を減らす方法です。from sklearn.decomposition import PCA で読みこむ PCA（主成分分析）は、データがいちばん大きくちらばっている向きを1つめの新しい軸、その次を2つめの軸…と選びなおします。" },
        { p: "PCA(n_components=減らしたあとの数) で作り、fit で軸を学習してから、transform で各データを新しい軸での値に変換します。fit_transform(X) と書くと、2つを一度にできます。explained_variance_ratio_ は、それぞれの新しい軸が、元のデータのちらばりの何割を表しているかの配列です。配列の .round(2) で、小数第2位までに丸められます。" },
        { code: "from sklearn.decomposition import PCA\n\nX = [[1, 2], [2, 4], [3, 6], [4, 8]]\npca = PCA(n_components=1)\nX1 = pca.fit_transform(X)\nprint(X1.shape)\nprint(pca.explained_variance_ratio_.round(2))", out: "(4, 1)\n[1.]" },
        { p: "この X は4つの点がすべて1本の直線の上にあるので、1つの軸だけで、ちらばりの全部（1.0 = 10割）を表せます。2次元にした後のデータは、散布図に描いて眺めることもできます。" },
        { try: "l72-pca" },
      ],
    },
  ],
  // 章末の演習問題(教材の練習にあたるものを、別のデータで作り直したもの)
  exercises: ["l72-wine", "l72-wine-km"],
};
