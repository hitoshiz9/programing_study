"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { chapterLabel, chapterUrl, LESSONS, type Lesson } from "@/lib/lessons";
import { READ_LESSONS, type ReadLesson } from "@/lib/reading";
import { ML_LESSONS } from "@/lib/ml";
import { EXPLAIN, type Block } from "@/lib/explain";
import { judge, type RunResult } from "@/lib/judge";
import { BADGES, complete, dayString, EMPTY, levelBar, parse } from "@/lib/progress";
import { getRaw, save, subscribe } from "@/lib/store";
import { preload, runPython } from "@/lib/runner";
import { LEARN } from "@/lib/learn";
import type { Section } from "@/lib/learn/types";

// 教科書の節。「知る(説明) → すぐにやってみる → 演習問題」の順に進む。
// 各章は、節(説明と問題が1対)のあとに、独立した「演習問題」のページを置く
type SectionMeta = { id: string; title: string; ref: string; ids: string[]; section?: Section; exercises?: string[] };
const SECTIONS: SectionMeta[] = LEARN.flatMap((ch) => [
  ...ch.sections.map((s, i) => ({ id: `s-${ch.ref}-${i}`, title: s.title, ref: ch.ref, section: s, ids: s.blocks.flatMap((b) => ("try" in b ? [b.try] : [])) })),
  ...(ch.guide ? [] : [{ id: `x-${ch.ref}`, title: "演習問題", ref: ch.ref, exercises: ch.exercises, ids: ch.exercises }]),
]);

// 数えるのは教科書に入っている問題。章の問題をすべて解くとバッジ
const TOTAL = new Set(SECTIONS.flatMap((m) => m.ids)).size;
const CLEARS: [string, string[]][] = LEARN.map((ch) => ["chapter-clear", SECTIONS.filter((m) => m.ref === ch.ref).flatMap((m) => m.ids)]);
const ALL_READ = new Map(READ_LESSONS.map((l) => [l.id, l]));
const ALL_WRITE = new Map([...LESSONS, ...ML_LESSONS].map((l) => [l.id, l]));

type Toast = { id: number; text: string };
let toastSeq = 0;

export default function App() {
  const raw = useSyncExternalStore(subscribe, getRaw, () => null);
  const progress = raw === null ? EMPTY : parse(raw);
  const isDone = (id: string) => progress.done.includes(id);
  // 節は、やってみる・演習問題をすべて解いたら「済み」
  const sectionDone = (m: SectionMeta) => m.ids.every(isDone);

  // 選んでいないときは、最初の「まだ終わっていない」節を開く
  const [sel, setSel] = useState<number | null>(null);
  // はじめての人は、アプリの使い方(問題のない章)から
  const auto = progress.done.length === 0 ? 0 : Math.max(0, SECTIONS.findIndex((m) => !sectionDone(m)));
  const cur = sel ?? auto;
  const meta = SECTIONS[cur];
  const goNext = () => setSel(cur + 1);

  const [codes, setCodes] = useState<Record<string, string>>({});
  const [party, setParty] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    preload();
    // 公開版だけ、オフライン用の仕組み(service worker)を登録する
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` }).catch(() => {});
    }
  }, []);

  const toast = (text: string) => {
    const id = ++toastSeq;
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  function onCorrect(id: string, xp: number) {
    setSel(cur); // 正解で「最初の未クリア」が変わっても、今のレッスンに留まる
    const c = complete(progress, id, xp, dayString(new Date()), TOTAL, CLEARS);
    if (!save(c.next)) setSaveFailed(true);
    setParty((p) => p + 1);
    if (c.gainedXp) toast(`+${c.gainedXp} XP`);
    if (c.leveledUp) toast(`🎉 レベル ${levelBar(c.next.xp).level} になりました！`);
    for (const b of c.newBadges) {
      const badge = BADGES.find((x) => x.id === b);
      if (badge) toast(`${badge.emoji} バッジ「${badge.name}」を手に入れた！`);
    }
  }

  const bar = levelBar(progress.xp);

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      <header className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-amber-200 bg-white/90 px-4 py-3 backdrop-blur">
        <h1 className="text-lg font-bold">Python学習</h1>
        <div className="flex min-w-48 flex-1 items-center gap-2">
          <span className="rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-white">Lv {bar.level}</span>
          <div
            className="h-3 flex-1 overflow-hidden rounded-full bg-amber-100"
            role="progressbar"
            aria-label="次のレベルまで"
            aria-valuemin={0}
            aria-valuemax={bar.need}
            aria-valuenow={bar.into}
          >
            <div className="h-full bg-amber-400 transition-all" style={{ width: `${(bar.into / bar.need) * 100}%` }} />
          </div>
          <span className="text-sm tabular-nums text-stone-600">
            {bar.into}/{bar.need} XP
          </span>
        </div>
        <span className="text-sm font-semibold" title="連続日数">
          🔥 {progress.streak}日連続
        </span>
        <span className="text-sm">
          ✅ {progress.done.length}/{TOTAL}
        </span>
      </header>

      {saveFailed && (
        <p className="bg-red-100 px-4 py-2 text-sm text-red-800" role="alert">
          このブラウザでは進み具合を保存できませんでした（プライベートモードなど）。閉じると記録が消えます。
        </p>
      )}

      <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[260px_1fr]">
        <nav aria-label="レッスン一覧" className="md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto">
          <p className="mb-2 px-1 text-xs text-stone-500">目次。各節は「説明を読む → すぐ下の問題で試す」のくり返しです。章の最後に 📝 演習問題 があります。</p>
          <ol className="space-y-1">
            {SECTIONS.map((m, n) => (
              <li key={m.id}>
                {m.ref !== SECTIONS[n - 1]?.ref && <p className="mt-3 mb-1 px-1 text-xs font-bold text-stone-500">{chapterLabel(m.ref)}</p>}
                <button
                  onClick={() => setSel(n)}
                  aria-current={n === cur ? "page" : undefined}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${n === cur ? "bg-amber-400 font-bold text-white" : "hover:bg-amber-100"}`}
                >
                  {m.ids.length === 0 ? "📘" : sectionDone(m) ? "✅" : "⬜"} {m.exercises ? "📝 演習問題" : `${n + 1 - SECTIONS.findIndex((x) => x.ref === m.ref)}. ${m.title}`}
                </button>
              </li>
            ))}
          </ol>
          <h2 className="mt-6 mb-2 text-sm font-bold">バッジ</h2>
          <ul className="grid grid-cols-5 gap-2">
            {BADGES.map((b) => {
              const has = progress.badges.includes(b.id);
              return (
                <li
                  key={b.id}
                  title={`${b.name}：${b.desc}`}
                  aria-label={`${b.name}（${has ? "獲得済み" : "未獲得"}）：${b.desc}`}
                  className={`flex aspect-square items-center justify-center rounded-lg bg-white text-2xl ${has ? "" : "opacity-25 grayscale"}`}
                >
                  {b.emoji}
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="space-y-4">
          <SectionView
            key={meta.id}
            meta={meta}
            isDone={isDone}
            codes={codes}
            setCodes={setCodes}
            onCorrect={onCorrect}
            onNext={cur < SECTIONS.length - 1 ? goNext : undefined}
          />
        </main>
      </div>

      {party > 0 && <Confetti key={party} />}
      <div className="fixed right-4 bottom-4 z-20 space-y-2" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast rounded-xl bg-stone-800 px-4 py-3 font-bold text-white shadow-lg">
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// inLesson: 教科書の節の中に出すとき。説明は節に書いてあるので、問題の部分だけを出す
type ViewProps = {
  n: number;
  done: boolean;
  onCorrect: (id: string, xp: number) => void;
  onNext?: () => void;
  inLesson?: string; // 節の中での呼び名(「やってみよう」「演習問題 1」など)
};

// コードの欄のキー操作: Ctrl + Enter で実行、Tab で字下げ(スペース4つ。Python は字下げが大事なので)
function editorKeys(e: React.KeyboardEvent<HTMLTextAreaElement>, code: string, setCode: (v: string) => void, run: () => void) {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    run();
  } else if (e.key === "Tab" && !e.shiftKey) {
    e.preventDefault();
    const t = e.currentTarget;
    // ブラウザの「入力」として入れると、Ctrl + Z で取り消せる(入らないブラウザでは直接書きかえる)
    if (!document.execCommand("insertText", false, "    ")) {
      const s = t.selectionStart;
      setCode(code.slice(0, s) + "    " + code.slice(t.selectionEnd));
      requestAnimationFrame(() => t.setSelectionRange(s + 4, s + 4));
    }
  }
}

// 実行結果の文: エラーより前に表示されたものも、エラーと一緒に出す
const resultText = (r: RunResult) =>
  r.timedOut ? TIMEOUT_MSG : [r.out.trimEnd(), r.error].filter(Boolean).join("\n") || (r.images?.length ? "(グラフ)" : "(何も表示されていません)");

function ChapterLink({ refId }: { refId: string }) {
  return (
    <a
      href={chapterUrl(refId)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block text-sm text-sky-700 underline hover:text-sky-900"
    >
      {refId === "1-0"
        ? "📘 参考：東大教材の最初の章（教材では Google Colaboratory を使います。このアプリでは使いません。別タブで開きます）"
        : `📘 もっと詳しく：東大教材「${chapterLabel(refId)}」を読む（別タブで開きます）`}
    </a>
  );
}

// くわしい説明。コード例は「予想してから実行」できるよう、結果は実行ボタンを押すまで出さない。
function Explain({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-4 border-t border-amber-100 pt-2">
      <h3 className="mt-2 font-bold">📚 くわしい説明</h3>
      {blocks.map((b, i) =>
        "h" in b ? (
          <h4 key={i} className="mt-5 mb-1 font-bold text-amber-800">
            {b.h}
          </h4>
        ) : "p" in b ? (
          <p key={i} className="mb-2 leading-relaxed">
            {b.p}
          </p>
        ) : (
          <Example key={i} code={b.code} />
        ),
      )}
    </div>
  );
}

function Example({ code }: { code: string }) {
  const [out, setOut] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  return (
    <div className="mb-3">
      <pre className="overflow-x-auto rounded-lg bg-stone-800 p-3 font-mono text-sm text-amber-100">{code}</pre>
      <button
        onClick={async () => {
          setRunning(true);
          setOut(await runPython(code));
          setRunning(false);
        }}
        disabled={running}
        className="mt-1 rounded-full border border-amber-400 px-3 py-1 text-sm hover:bg-amber-50 disabled:opacity-50"
      >
        {running ? "実行中…" : "▶ 実行してみる（結果を予想してから押そう）"}
      </button>
      {out && (
        <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded-lg bg-stone-700 p-3 font-mono text-sm text-green-200">
          {out.timedOut ? TIMEOUT_MSG : (out.error ?? (out.out || (out.images?.length ? "(グラフ)" : "(何も表示されていません)")))}
        </pre>
      )}
      {out && <Figures images={out.images} />}
    </div>
  );
}

// 止まらないコードを止めたときの表示(「書く」の判定と同じ文)
const TIMEOUT_MSG = "時間がかかりすぎたので止めました。くり返しが終わらなくなっていないか見直そう。";

// matplotlib で描いたグラフ(PNG)を表示する
function Figures({ images }: { images?: string[] }) {
  if (!images?.length) return null;
  return (
    <div className="mt-2 space-y-2">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- 実行のたびに作られる画像なので next/image は使わない
        <img
          key={i}
          src={`data:image/png;base64,${src}`}
          alt={`グラフ ${i + 1}`}
          className="max-w-full rounded-lg border border-stone-200 bg-white"
        />
      ))}
    </div>
  );
}

function NextButton({ onNext }: { onNext?: () => void }) {
  if (!onNext) return null;
  return (
    <button onClick={onNext} className="mt-3 rounded-full bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-700">
      次の問題へ進む →
    </button>
  );
}

// ---- 読む: 結果を3択で予想し、実行して確かめる ----
function ReadView({ lesson, n, done, onCorrect, onNext, inLesson }: ViewProps & { lesson: ReadLesson }) {
  const qid = useId();
  const [picked, setPicked] = useState<number | null>(null);
  const [run, setRun] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const ok = picked === lesson.answer;

  function pick(c: number) {
    if (ok) return; // 正解したあとは選び直さない
    setPicked(c);
    if (c === lesson.answer) onCorrect(lesson.id, lesson.xp);
  }

  async function check() {
    setRunning(true);
    setRun(await runPython(lesson.code));
    setRunning(false);
  }

  return (
    <>
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-stone-500">
          {inLesson ?? `読む ${n}`} ・ {lesson.xp} XP {done && "・ クリア済み"}
        </p>
        <h2 className={`mb-3 font-bold ${inLesson ? "text-xl" : "text-2xl"}`}>{lesson.title}</h2>
        {!inLesson && <p className="mb-3 leading-relaxed">{lesson.intro}</p>}
        <pre className="overflow-x-auto rounded-lg bg-stone-800 p-3 font-mono text-sm text-amber-100">{lesson.code}</pre>
        {!inLesson && <ChapterLink refId={lesson.ref} />}
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 id={qid} className="mb-3 font-bold">
          🤔 このコードを実行すると、何が表示される？
        </h3>
        <div role="radiogroup" aria-labelledby={qid} className="grid gap-2 sm:grid-cols-3">
          {lesson.choices.map((c, i) => {
            const state = picked === i ? (i === lesson.answer ? "ok" : "ng") : ok && i === lesson.answer ? "ok" : "";
            return (
              <button
                key={i}
                role="radio"
                aria-checked={picked === i}
                onClick={() => pick(i)}
                className={`rounded-xl border-2 p-3 text-left ${
                  state === "ok"
                    ? "border-green-500 bg-green-50"
                    : state === "ng"
                      ? "border-orange-400 bg-orange-50"
                      : "border-stone-200 hover:border-amber-400"
                }`}
              >
                <span className="mb-1 block text-xs text-stone-500">{["ア", "イ", "ウ"][i]}</span>
                <pre className="font-mono text-sm whitespace-pre-wrap">{c}</pre>
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div aria-live="polite" className="mt-4">
            <p className={`rounded-lg p-3 font-bold ${ok ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-900"}`}>
              {ok ? "🎉 正解！" : "おしい！ もう一度コードを読んで、選び直してみよう。"}
            </p>
            {ok && <p className="mt-2 leading-relaxed">💡 {lesson.explain}</p>}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-start gap-2">
          <button
            onClick={check}
            disabled={running || picked === null}
            className="rounded-full border border-amber-400 px-5 py-2 hover:bg-amber-50 disabled:opacity-50"
          >
            {running ? "実行中…" : "▶ 実行して確かめる"}
          </button>
          {picked === null && <span className="self-center text-xs text-stone-500">選んでから実行できます</span>}
        </div>
        {run && (
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg bg-stone-800 p-3 font-mono text-sm text-green-200">
            {resultText(run)}
          </pre>
        )}
        {ok && <NextButton onNext={onNext} />}
      </section>
    </>
  );
}

// ---- 書く: コードを書いて実行し、自動で判定する ----
function WriteView({
  lesson,
  n,
  done,
  code,
  setCode,
  onCorrect,
  onNext,
  label,
  inLesson,
}: ViewProps & {
  lesson: Lesson;
  label: string;
  code: string;
  setCode: (v: string) => void;
}) {
  const uid = useId();
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{
    r: RunResult;
    ok: boolean;
    message: string;
  } | null>(null);
  const [hintCount, setHintCount] = useState(0);

  async function run() {
    if (running) return;
    setRunning(true);
    const r = await runPython(code, lesson.test);
    const j = judge(lesson, code, r);
    setResult({ r, ...j });
    setRunning(false);
    if (j.ok) onCorrect(lesson.id, lesson.xp);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => editorKeys(e, code, setCode, run);

  return (
    <>
      {!inLesson && (
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">
            {label} {n} ・ {lesson.xp} XP {done && "・ クリア済み"}
          </p>
          <h2 className={`mb-3 font-bold ${inLesson ? "text-xl" : "text-2xl"}`}>{lesson.title}</h2>
          {!inLesson && (
            <>
              {lesson.intro.map((p, i) => (
                <p key={i} className="mb-2 leading-relaxed">
                  {p}
                </p>
              ))}
              <p className="mt-3 text-sm font-semibold">お手本</p>
              <pre className="mt-1 overflow-x-auto rounded-lg bg-stone-800 p-3 font-mono text-sm text-amber-100">{lesson.example}</pre>
              {EXPLAIN[lesson.id] && (
                <>
                  <a href={`#${uid}-practice`} className="mt-3 inline-block text-sm text-sky-700 underline hover:text-sky-900">
                    ✏️ 説明を飛ばして練習へ ↓
                  </a>
                  <Explain blocks={EXPLAIN[lesson.id]} />
                </>
              )}
              <ChapterLink refId={lesson.ref} />
            </>
          )}
        </section>
      )}

      <section id={`${uid}-practice`} className="scroll-mt-20 rounded-2xl bg-white p-5 shadow-sm">
        {inLesson && (
          <p className="text-sm text-stone-500">
            {inLesson} ・ {lesson.title} ・ {lesson.xp} XP {done && "・ クリア済み"}
          </p>
        )}
        <h3 className="mb-2 font-bold">✏️ 練習：{lesson.task}</h3>
        <label htmlFor={`${uid}-code`} className="sr-only">
          コードを書く欄
        </label>
        <textarea
          id={`${uid}-code`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          rows={Math.max(6, code.split("\n").length + 1)}
          className="w-full rounded-lg border border-stone-300 bg-stone-50 p-3 font-mono text-sm focus:outline-2 focus:outline-amber-400"
        />
        <p className="text-xs text-stone-500">Tab で字下げ、Ctrl + Enter で実行できます。</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={run}
            disabled={running}
            className="rounded-full bg-amber-500 px-5 py-2 font-bold text-white hover:bg-amber-600 disabled:opacity-60"
          >
            {running ? "実行中…" : "▶ 実行する"}
          </button>
          <button
            onClick={() => setHintCount((h) => Math.min(h + 1, lesson.hints.length))}
            disabled={hintCount >= lesson.hints.length}
            className="rounded-full border border-amber-400 px-5 py-2 hover:bg-amber-50 disabled:opacity-50"
          >
            💡 ヒント（{hintCount}/{lesson.hints.length}）
          </button>
          {onNext && (
            <button onClick={onNext} className="ml-auto rounded-full px-5 py-2 text-stone-600 hover:bg-stone-100">
              次の問題 →
            </button>
          )}
        </div>
        {hintCount > 0 && (
          <ol className="mt-3 list-decimal space-y-1 rounded-lg bg-sky-50 p-3 pl-8 text-sm">
            {lesson.hints.slice(0, hintCount).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ol>
        )}
      </section>

      {result && (
        <section aria-live="polite" className="rounded-2xl bg-white p-5 shadow-sm">
          <p
            className={`mb-3 whitespace-pre-wrap rounded-lg p-3 font-bold ${result.ok ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-900"}`}
          >
            {result.ok ? "🎉 正解！ よくできました！" : result.message}
          </p>
          <p className="text-sm font-semibold">実行結果</p>
          <pre className="mt-1 min-h-10 overflow-x-auto whitespace-pre-wrap rounded-lg bg-stone-800 p-3 font-mono text-sm text-green-200">
            {result.r.out + (result.r.testOut ? `--- 確認用の実行 ---\n${result.r.testOut}` : "") || "(何も表示されていません)"}
          </pre>
          {result.r.error && (
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-red-50 p-3 font-mono text-sm text-red-800">{result.r.error}</pre>
          )}
          <Figures images={result.r.images} />
          {result.ok && <NextButton onNext={onNext} />}
        </section>
      )}
    </>
  );
}

// ---- 学ぶ: 節の説明を読み、そのあと確認問題を解く ----
function SectionView({
  meta,
  isDone,
  codes,
  setCodes,
  onCorrect,
  onNext,
}: {
  meta: SectionMeta;
  isDone: (id: string) => boolean;
  codes: Record<string, string>;
  setCodes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onCorrect: (id: string, xp: number) => void;
  onNext?: () => void;
}) {
  const allDone = meta.ids.every(isDone);
  const problem = (id: string, label: string) => {
    const r = ALL_READ.get(id);
    if (r) return <ReadView key={id} lesson={r} n={0} done={isDone(id)} onCorrect={onCorrect} inLesson={label} />;
    const w = ALL_WRITE.get(id)!;
    return (
      <WriteView
        key={id}
        lesson={w}
        label="書く"
        n={0}
        done={isDone(id)}
        code={codes[id] ?? w.starter}
        setCode={(v) => setCodes((c) => ({ ...c, [id]: v }))}
        onCorrect={onCorrect}
        inLesson={label}
      />
    );
  };
  // 説明のまとまりと、その直後の問題を1対にする
  const pairs: { blocks: Block[]; problem?: string }[] = [{ blocks: [] }];
  for (const b of meta.section?.blocks ?? []) {
    if ("try" in b) {
      pairs.at(-1)!.problem = b.try;
      pairs.push({ blocks: [] });
    } else pairs.at(-1)!.blocks.push(b);
  }
  return (
    <>
      <header className="px-1">
        <p className="text-sm text-stone-500">📘 {chapterLabel(meta.ref)}</p>
        <h2 className="text-2xl font-bold">{meta.exercises ? "📝 演習問題（この章で習ったことを組み合わせて解こう）" : meta.title}</h2>
      </header>
      {pairs
        .filter((p) => p.blocks.length || p.problem)
        .map((p, k) => (
          <div key={k} className="space-y-2 rounded-3xl border-2 border-amber-200 p-2">
            {p.blocks.length > 0 && (
              <section className="rounded-2xl bg-white p-5 shadow-sm">
                {p.blocks.map((b, i) =>
                  "h" in b ? (
                    <h3 key={i} className="mt-2 mb-2 text-lg font-bold text-amber-800">
                      📖 {b.h}
                    </h3>
                  ) : "p" in b ? (
                    <p key={i} className="mb-2 leading-relaxed">
                      {b.p}
                    </p>
                  ) : (
                    <LearnExample key={i} code={b.code} out={b.out} />
                  ),
                )}
              </section>
            )}
            {p.problem && problem(p.problem, "✋ やってみよう（すぐ上の説明を試す問題）")}
          </div>
        ))}
      {meta.exercises?.map((id, n) => problem(id, `📝 演習問題 ${n + 1}`))}
      <ChapterLink refId={meta.ref} />
      {onNext && (
        <div>
          <button
            onClick={() => {
              onNext();
              document.querySelector("main")?.scrollIntoView();
            }}
            className={`rounded-full px-5 py-2 font-bold ${allDone ? "bg-green-600 text-white hover:bg-green-700" : "border border-stone-300 text-stone-600 hover:bg-stone-100"}`}
          >
            {allDone ? "次へ進む →" : "とばして次へ →"}
          </button>
        </div>
      )}
    </>
  );
}

// 教科書の例: 結果をはじめから見せる。書きかえて実行すれば、自分で試せる。
function LearnExample({ code: first, out }: { code: string; out: string }) {
  const [code, setCode] = useState(first);
  const [run, setRun] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const shown = run ? resultText(run) : out;
  const exec = async () => {
    setRunning(true);
    setRun(await runPython(code));
    setRunning(false);
  };
  return (
    <div className="mb-3">
      <textarea
        aria-label="例のコード（書きかえて実行できます）"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => editorKeys(e, code, setCode, exec)}
        spellCheck={false}
        rows={code.split("\n").length}
        className="w-full rounded-lg bg-stone-800 p-3 font-mono text-sm text-amber-100 focus:outline-2 focus:outline-amber-400"
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={exec}
          disabled={running}
          className="rounded-full border border-amber-400 px-3 py-1 text-sm hover:bg-amber-50 disabled:opacity-50"
        >
          {running ? "実行中…" : "▶ 実行"}
        </button>
        {code !== first && (
          <button onClick={() => (setCode(first), setRun(null))} className="rounded-full px-3 py-1 text-sm text-stone-600 hover:bg-stone-100">
            元に戻す
          </button>
        )}
        <span className="text-xs text-stone-500">数字などを書きかえて、実行して試せます</span>
      </div>
      <p className="mt-1 text-xs font-semibold text-stone-500">結果</p>
      <pre
        className={`overflow-x-auto whitespace-pre-wrap rounded-lg p-3 font-mono text-sm ${run?.error ? "bg-red-50 text-red-800" : "bg-stone-700 text-green-200"}`}
      >
        {shown}
      </pre>
      {run && <Figures images={run.images} />}
    </div>
  );
}

// お祝いの紙吹雪(自作)。動きを減らす設定の人には CSS 側で出さない。
const PIECES = Array.from({ length: 40 }, (_, n) => ({
  left: (n * 37) % 100,
  delay: (n % 10) * 0.08,
  emoji: ["🎉", "⭐", "🐤", "✨"][n % 4],
}));

function Confetti() {
  return (
    <div aria-hidden className="confetti pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {PIECES.map((p, n) => (
        <span key={n} style={{ left: `${p.left}%`, animationDelay: `${p.delay}s` }}>
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
