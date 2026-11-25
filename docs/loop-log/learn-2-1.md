# 教科書形式(説明 → 確認問題): 2-1 の記録

| 回 | 内容 | 結果 |
|---|---|---|
| 作成 | 16節・32対(教材の「文字列とメソッド」の小見出し 置換・検索・数え上げ・大文字小文字・空白文字の削除 も節にした)。f文字列は教材にないが、既存の問題とあとの章のため「文字列の連結」の節で説明。演習 remove_hyphen / flip_lr / swap_name / countchar / is_shout / ext。新しい問題: 書く l21-triple, l21-last, l21-indexerr, l21-immut, l21-step, l21-quote, l21-index, l21-cap、読む r21-quote, r21-index, r21-emptyslice, r21-empty, r21-triplecomment, r21-method, r21-count | テスト全件合格、一致0件 |
| 直した問題 | is_shout を isupper(教材にない)から text == text.upper() に。find / is_shout の画面に出ない example を空に(count などを先に使っていたため) | starter・wrong 不合格、solution 合格を確認 |
| 1-2〜2-1 共通 | 課題文で、表示する言葉を「」で囲んでいたものを外した(if, logic, error, callparen, l14-swap, fstring, concat, strip, backslash) | 判定は変えていない |
