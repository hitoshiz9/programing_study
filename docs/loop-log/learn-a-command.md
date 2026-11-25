# 教科書 付録 コマンドライン実行 の記録

| 回 | 内容 | 結果 |
|---|---|---|
| 作成 | 5節・1対11。新しい問題なし(既存15問を全部配置)。演習: cmd-arg-last, cmd-arg0, cmd-argc, cmd-argprod。古い explain / topics は空に。runpy.run_path と sys.argv を自分で入れる形で、実行をまねる | テスト全件合格、一致0件 |
| 監修1 | アプリの話を Python の機能として書き直し(runpy・chdir・sys.modules の仕組み)。テストのためだけの名前の文を削除。演習 cmd-arg-last / cmd-arg0 / cmd-argc を runpy+sys.argv+int+if __name__ の組み合わせに作り直し、cmd-main は演習へ。cmd-script・rcmd-str・rcmd-main の形を変更、rcmd-name(新規)。argsprint.py を echo_args.py に。文字コード宣言がないときの SyntaxError の例を追加 | テスト全件合格、一致0件 |
