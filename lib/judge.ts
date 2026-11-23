import type { Lesson } from "./lessons";

export type RunResult = { out: string; testOut: string; error: string | null; timedOut?: boolean };

// 行末の空白と前後の改行の違いは気にしない
const norm = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();

export function judge(lesson: Lesson, code: string, r: RunResult): { ok: boolean; message: string } {
  if (r.timedOut) return { ok: false, message: "時間がかかりすぎたので止めました。くり返しが終わらなくなっていないか見直そう。" };
  if (r.error) return { ok: false, message: "エラーが出ました。メッセージの一番下の行に、原因のヒントがあります。" };
  const missing = (lesson.mustInclude ?? []).find((w) => !code.includes(w));
  if (missing) return { ok: false, message: `この問題では「${missing}」を使ってね。` };
  const got = lesson.test ? r.testOut : r.out;
  if (norm(got) !== norm(lesson.expect)) {
    return { ok: false, message: `おしい！ 期待する結果:\n${lesson.expect}\n\nあなたの結果:\n${norm(got) || "(何も表示されていません)"}` };
  }
  return { ok: true, message: "正解！" };
}
