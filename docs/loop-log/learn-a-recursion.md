# 教科書 付録 再帰 の記録

| 回 | 内容 | 結果 |
|---|---|---|
| 作成 | 4節・1対11。新しい問題: 読む rrec-count / rrec-head / rrec-loop / rrec-merge、書く rec-sum / rec-times / rec-count。演習: rec-digits, rec-count。古い explain / topics は空に | テスト全件合格、一致0件 |
| 監修1 | rec-merge を大きい順のマージソート(merge の比較を直す)に。接尾辞は rrec-tail(新規)、逆順は独立したまとまり+rrec-rev(新規)、rec-reverse は演習へ。rec-times をリストの積に、rrec-halve は global をやめ結果と長さを問う形に。power 系の名前と数を変更(著作権)。RecursionError の例、比較回数の rrec-mcount(新規)を追加。rec-sum の関数名を add_up に | テスト全件合格 |
