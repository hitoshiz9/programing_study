# 章ファイルの作り方(2-2 以降・付録)

利用者はプログラミング未経験の初心者です。東京大学「Pythonプログラミング入門」(https://utokyo-ipp.github.io/)の各ページを**省略せずに**、問題と説明にします。

## 作るもの
担当の章ごとに `lib/chapters/<ファイル>.ts` の `chapter` を埋めます。**ほかのファイルは変更しません**(記録用の `docs/loop-log/<ファイル>.md` だけは新しく作ります)。

- `order`: この章の問題の並び(易しい順)。**この章の既存の問題も必ず入れます**(下の表)。
- `lessons`: 新しく作る「書く」(または「AI」)の問題。型は `Lesson` から `ref` を除いたもの(lib/lessons.ts を参照)。
- `reads`: 新しく作る「読む」の問題(3択)。型は `ReadLesson` から `ref` を除いたもの(lib/reading.ts を参照)。
- `explain`: 問題の id ごとの「くわしい説明」。`{ h: 見出し } / { p: 段落 } / { code, out }` の並び(lib/explain.ts の既存の書き方を参照)。既存の問題の id に説明を付けてもかまいません。
- `topics`: 教材の節(見出し)と練習を、ページの順に1行ずつ。`[節の名前, [問題の id, ...]]`。**1つめの id は説明のある問題**(explain がある「書く」問題、または解説が80字以上の「読む」問題)。教材の練習は `"練習: 〇〇"` という名前にして、同じ内容を自分で作り直した問題を対応させます。
- `refSections` と `refProse` は**変えません**(教材を数えた目標値です)。

既存の問題(order に必ず入れる id):
| 章 | 既存の「書く」/「AI」問題 | 既存の「読む」問題(topics に使ってよい) |
|---|---|---|
| 2-2 | list, append, sorted | r-list, r-append |
| 2-3 | elif, in | r-elif-order |
| 3-1 | dict, dictloop | r-dict |
| 3-2 | for, sum, while, forlist, break | r-indent, r-range, r-sum, r-sum-inside, r-while, r-nested |
| 3-3 | sumto, fizzbuzz | r-func, r-none |
| 4-2 | zip | |
| 5-1 | math | |
| 5-3 | m-np-array, m-np-stats, m-np-filter, m-np-2d | |
| 6-1 | comp, comp2 | r-comp |
| 6-2 | sortkey, lambda | |
| 6-3 | class, counter | |
| 7-1 | m-pd-df, m-pd-filter, m-pd-groupby, m-pd-sort | |
| 7-2 | m-sk-linear, m-sk-coef, m-sk-knn, m-sk-iris | |

## 守ること
1. **著作権**: 教材は CC BY-NC-ND(改変禁止)。**文章も問題も写さず、自分の言葉と自分の例で書く**。教材の練習は「同じことを学べる別の問題」に作り直す。`node scripts/check-similarity.mts` で、教材と25文字以上同じ文章が 0 件であること。
2. **id**: 新しい id は章ごとの接頭辞を付けて、ほかの章と重ならないようにする(例: 2-2 の書く問題は `l22-tuple`、読む問題は `r22-tuple`、付録 set は `set-union` / `rset-union`)。
3. **日本語**: 初心者向けのやさしい日本語。専門用語は初出で言いかえる。「〜しよう」「〜です」調。既存の lib/explain.ts の 1-1〜2-1 と同じ調子。
4. **説明の量**: 章の「書く」(AI の章は「AI」)問題の intro と、explain の見出しと段落の合計(空白を除く字数)が、`refProse` の9割以上。量を水増しせず、教材の節の内容をちゃんと説明する。
5. **問題の判定**: 「書く」は、出力(test があれば test の出力)が expect と一致し、mustInclude の文字がすべてコードに含まれれば正解。
   - starter(最初の状態)と wrong(わざと間違えた答え)は不正解に、solution は正解になること(自動テストで確かめる)。
   - mustInclude は、正しい別解を落とさない最小限にする(空白の有無で落ちる条件にしない)。
   - 課題文だけで、何を表示すればよいかが分かるように書く(「何番目」は「0 から数えた番号」と書くなど)。
   - input() は使えない(エラーになる)。
6. **読む問題**: 3択。答えの位置(answer)は 0/1/2 をばらつかせる。正解の選択肢だけが実際の実行結果と一致すること(自動テストで確かめる)。explain はやさしく、まちがえた人がどこで勘違いしたかも書く。
7. **このアプリでできないこと**:
   - ファイル(4-1、付録 CSV)・ディレクトリ(4-3)・モジュールの作成(5-2): ブラウザの中の仮のファイル置き場で、open() や os が使える。問題の中で先にファイルを書いてから読む形にする。前の実行のファイルが残っていることがあるので、毎回作り直すコードにする。
   - コマンドライン(付録): 実際には動かせないので、説明と「読む」問題(sys.argv の中身を仮に作って読むなど)で扱う。
   - Colab / Jupyter の使い方(1-0、付録 Jupyter): このアプリでの操作(実行ボタン・Ctrl+Enter・Tab の字下げ・止まらないコードは5秒で止まる・進み具合の保存・ヒント)に置きかえて説明し、節ごとに対応する内容を書く。
   - グラフ(付録の可視化・Matplotlib・Bokeh、stage は "ml"): matplotlib で描くと、図が画像として結果の下に表示される。日本語の文字は表示できないので、グラフの中の文字は英語にする。判定は test で図の中身を print して確かめる(例: `import matplotlib.pyplot as plt\nax = plt.gca()\nprint(len(ax.lines), list(ax.lines[0].get_ydata()))`)。Bokeh は外部通信が必要なため使わず、説明の中で「Bokeh ではこう書く」と紹介し、練習は同じ種類のグラフを matplotlib で描く。
   - AI の章(5-3, 7-1, 7-2)は numpy / pandas / scikit-learn が使える(初回は読み込みに時間がかかる)。
8. **説明の例**: explain の `code` は自動テストで実行され、`out` と完全に一致する必要がある(最後の改行は除く)。乱数を使うときは seed を固定する。

## 確かめ方(全部合格するまで直す)
```
npx tsc --noEmit -p .
npx eslint app lib
npm test            # 全件合格を2回続けて
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/check-similarity.mts
```
テストは、その章の「節の数が refSections と一致」「全節に問題と説明」「説明の量が9割以上」「説明の例が正しい」「各問題の判定」を確かめます。テストを弱めたり消したりしてはいけません。

## 記録
`docs/loop-log/<ファイル>.md` に、何が落ちて何を直したかを短く書きます。
