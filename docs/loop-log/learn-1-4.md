# 教科書形式(説明 → 確認問題): 1-4 の記録

| 回 | 内容 | 結果 |
|---|---|---|
| 作成 | 8節・14対。演習 l14-ex(構文エラーと論理エラーを直して assert に合格)。新しい問題: 書く l14-colon, l14-unbound, l14-swap, l14-magic, l14-ex、読む r14-test, r14-kinds | テスト全件合格、一致0件 |
| 直した問題 | runtime を「文字列 + 数の TypeError(str は 2-1)」から「関数名のつづりまちがいの NameError」に。spec の assert を == True から assert / assert not に(PEP 8 の「真理値を == で比べない」に合わせる)。runtime / spec の画面に出ない example を空に | starter・wrong 不合格、solution 合格を確認 |
