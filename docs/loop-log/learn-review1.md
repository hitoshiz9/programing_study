# 2-2 / 2-3 / 3-1 / 3-2 監修の指摘を反映（1回目）

- 4章の関数の問題の starter から pass をなくし、`return 0  # ここを書きかえる`（表示する関数は `print("まだ書いていない")`）にした。2-2 の pass の段落と、3-2 の「2-2 でも」の文を消した。
- 2-2: IndexError の言い方を直し、IndexError・ValueError・TypeError（タプルへの代入）の例を足した。文字列の並びは文字コードの順と説明。extend と +=、多重リストの sorted、タプルで複数の値を返す、浅いコピー、を短く足した。in で or をまとめる話は 2-3 だけに。
  - 判定を変えた: l22-unpack（mustInclude "w, h, d ="）、l22-ops（in / not in だけ）、append（空のリストに番号で選んで集める）。
  - 置きかえた: l22-product → l22-sumsq（2乗の合計）、l22-vowels → l22-lens（[単語, 文字数] の組）。
- 2-3: elif と in を関数にして、いくつかの値で確かめる形にした（in は mustInclude "in ["）。l23-indent はグループの外に2行出す形に。l23-paren に mustInclude "if ("、l23-ternary に条件式の形を確かめる mustInclude を足した。l23-group を3チームの得点比べ（winner）に変えた。
- 3-1: l31-nested / l31-copy に mustInclude を足した。l31-setdefault は if と not in の形に。get で数える・関数の中で辞書を書きかえる・f 文字列・pop の2つめの引数を、それぞれ別のまとまりにした（l31-count, r31-func, r31-items, r31-popdef を新しく作った）。KeyError・TypeError の例を足した。浅いコピーの注意を足した。l31-roll → l31-menu（組のリストから辞書）。r31-key の形を変えた。
- 3-2: l32-nested のヒントを模範解答の形に。r32-rangeobj の説明に range(0, 3) を足した。isdigit を別のまとまりにして l32-digits をその下へ。l32-tax / l32-squares / l32-maxall / l32-stop を説明のすぐ下へ移した。写すだけで解けた問題は例のほうを変えた（l32-search / l32-nested / l32-common / l32-whilesum）。r32-pass と r-nested の問題は形を変えた。
  - 判定を変えた: l32-step（刻みで5の倍数を表示）、l32-strloop（逆の順の文字列）。
  - 消した: l32-condstop / l32-group4 / l32-firstpos / l32-seat。新しく作った: l32-runlen（続いた文字を数えて短くする）。演習は8問に。
  - lessons.ts の while の intro にあったアプリの話を消した。
