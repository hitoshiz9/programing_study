# 教科書形式(説明 → 確認問題): 2-1 の記録

| 回 | 内容 | 結果 |
|---|---|---|
| 作成 | 16節・32対(教材の「文字列とメソッド」の小見出し 置換・検索・数え上げ・大文字小文字・空白文字の削除 も節にした)。f文字列は教材にないが、既存の問題とあとの章のため「文字列の連結」の節で説明。演習 remove_hyphen / flip_lr / swap_name / countchar / is_shout / ext。新しい問題: 書く l21-triple, l21-last, l21-indexerr, l21-immut, l21-step, l21-quote, l21-index, l21-cap、読む r21-quote, r21-index, r21-emptyslice, r21-empty, r21-triplecomment, r21-method, r21-count | テスト全件合格、一致0件 |
| 直した問題 | is_shout を isupper(教材にない)から text == text.upper() に。find / is_shout の画面に出ない example を空に(count などを先に使っていたため) | starter・wrong 不合格、solution 合格を確認 |
| 1-2〜2-1 共通 | 課題文で、表示する言葉を「」で囲んでいたものを外した(if, logic, error, callparen, l14-swap, fstring, concat, strip, backslash) | 判定は変えていない |

| 監修1 | 指摘を全部反映(1-2: pass はアプリの話を消して意味だけ・例の題材変更・IndentationError と数字で始まる名前のエラー例・r12-refname 追加・r-order/r-aug/r-none の形を変更・課題を考える形に。1-3: 題材を変更・if/logic を関数にして境目を test・if を2つ続ける例・課題文の「」を " " に・r-truthy を 0/None/" "/"0" に。1-4: cube・( の閉じ忘れ・全角空白の例・runtime を変数名のつづりに・PEP 8 に is。2-1: IndexError の説明を訂正・置換の例・\U の注意・strip に全角空白と改行・l21-cap に lower・find は . だけ・ext の test 追加・intconv に float・解説に勘違いを追加) | テスト全件合格 x2、一致0件 |
