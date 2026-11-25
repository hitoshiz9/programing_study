# 教科書形式 付録 正規表現 の記録

| 回 | 内容 | 結果 |
|---|---|---|
| 作成 | 7節・1対27(書く15・読む12)、演習問題13(教材の練習にあたる問題)。古い explain の説明を、1つの記号ごとの説明＋例に分けて書き直し。topics / explain は空に | テスト 1739件 合格、一致0件 |
| 直した問題 | re-match の課題文の「」をやめ、返す文字列を "見つけた" と書いた(判定は変えていない) | |
| 付録 Jupyter | 章を作らない指示のため、lib/chapters/a-jupyter.ts の lessons / reads / order / topics / explain を空に(問題6つを削除) | |
| 監修1 | 参照元と同じ題材(re-repeat の郵便番号→商品コード、re-meta の時刻→年、rre-group のメール→型番)を変更。re-weekday・re-seat・re-room・re-oneword を削除。^…$ の全体一致・\$ の改行の注意・SyntaxWarning・r'...'・\s+ でまとめる例を追加。1まとまり1考え方に分け、rre-concat・rre-star1・rre-qplus を新規、re-star を (ha)* の問題に作り直し、re-findall を \d+円 に。演習に re-rgb(0〜255 の3つの数)を新規。演習は10問 | テスト 1787件 合格 |
