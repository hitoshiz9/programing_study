# a-command ループ記録

- 1回目: tsc・eslint・npm test(599件)は合格。著作権チェックで2件一致(cmd-script・cmd-argv の段落)→ 自分の言葉と別の例に書き直して 0 件。
- 見直し: shebang の問題は判定をファイルの1行目で行うように直し、cmd-script の mustInclude(空白の有無で落ちる条件)を外した。
- 2回目・3回目: npm test 全件合格(2回続けて)。著作権チェック 0 件。
