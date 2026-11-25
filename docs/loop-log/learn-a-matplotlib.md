# 教科書形式 付録 Matplotlib の記録

| 回 | 内容 | 結果 |
|---|---|---|
| 作成 | 7節・1対12、演習問題6(教材の練習にあたる mpl-p-*)。題名・軸の名前を1対にするため mpl-title を、plot で点だけ打つ書き方に mpl-dots を新しく作った。mpl-p-bar の課題文に :02d の説明を追加(判定は変えていない)。topics / explain は空に | テスト 1773件 合格、一致0件 |
| 監修1 | 演習5問の題材を架空のカフェの来客数に変え、引数の形も変更(plot_day, scatter_two, bar_weeks, hist_weeks, heat_table)。タプル比較と :02d を使わない形に。mpl-legend を grid と loc にしぼる、mpl-sortcount を2本＋凡例に、mpl-savefig を show の前に1行足す形に、mpl-bar で width も判定。arange/linspace と zeros/+= を別のまとまりにして rmpl-range・rmpl-zeros を新規。np.flip を追加 | テスト 1791件 合格、一致0件 |
