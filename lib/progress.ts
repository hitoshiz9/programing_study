export type Progress = {
  xp: number;
  done: string[]; // 正解したレッスンの id
  lastDay: string | null; // 最後に正解した日 (YYYY-MM-DD)
  streak: number; // 連続日数
  badges: string[];
};

export const EMPTY: Progress = { xp: 0, done: [], lastDay: null, streak: 0, badges: [] };

export const BADGES = [
  { id: "first", emoji: "🐣", name: "はじめの一歩", desc: "最初の問題に正解" },
  { id: "five", emoji: "🌱", name: "5問クリア", desc: "5問に正解" },
  { id: "ten", emoji: "🌿", name: "10問クリア", desc: "10問に正解" },
  { id: "all", emoji: "🏆", name: "全問クリア", desc: "すべての問題に正解" },
  { id: "streak3", emoji: "🔥", name: "3日連続", desc: "3日連続で正解" },
  { id: "streak7", emoji: "🌟", name: "7日連続", desc: "7日連続で正解" },
  { id: "lv5", emoji: "🚀", name: "レベル5", desc: "レベル5に到達" },
  { id: "read-clear", emoji: "📖", name: "読めるようになった", desc: "「読む」を全部クリア" },
  { id: "write-clear", emoji: "✍️", name: "書けるようになった", desc: "「書く」を全部クリア" },
  { id: "ml-clear", emoji: "🤖", name: "AIの入口に立った", desc: "「AI」を全部クリア" },
] as const;

export const levelOf = (xp: number) => Math.floor(Math.sqrt(xp / 25)) + 1;

export function levelBar(xp: number) {
  const level = levelOf(xp);
  const base = 25 * (level - 1) ** 2;
  return { level, into: xp - base, need: 25 * level ** 2 - base };
}

export function dayString(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function yesterdayOf(day: string) {
  const d = new Date(`${day}T00:00:00`);
  d.setDate(d.getDate() - 1);
  return dayString(d);
}

// 正解したときの更新。XP は、その問題に初めて正解したときだけ増える。
// clears: [バッジid, そのステージの全レッスンid] の組。全部に正解したらバッジを付ける。
export function complete(
  p: Progress,
  lessonId: string,
  xp: number,
  today: string,
  totalLessons: number,
  clears: [string, string[]][] = [],
) {
  const first = !p.done.includes(lessonId);
  const streak = p.lastDay === today ? p.streak : p.lastDay === yesterdayOf(today) ? p.streak + 1 : 1;
  const next: Progress = {
    xp: p.xp + (first ? xp : 0),
    done: first ? [...p.done, lessonId] : p.done,
    lastDay: today,
    streak,
    badges: p.badges,
  };
  const earned: string[] = [];
  if (next.done.length >= 1) earned.push("first");
  if (next.done.length >= 5) earned.push("five");
  if (next.done.length >= 10) earned.push("ten");
  if (next.done.length >= totalLessons) earned.push("all");
  if (next.streak >= 3) earned.push("streak3");
  if (next.streak >= 7) earned.push("streak7");
  if (levelOf(next.xp) >= 5) earned.push("lv5");
  for (const [badge, ids] of clears) if (ids.every((id) => next.done.includes(id))) earned.push(badge);
  const newBadges = earned.filter((b) => !p.badges.includes(b));
  next.badges = [...p.badges, ...newBadges];
  return { next, gainedXp: next.xp - p.xp, newBadges, leveledUp: levelOf(next.xp) > levelOf(p.xp) };
}

// 保存データを読む。壊れていたら最初の状態に戻す(落ちない)。
export function parse(raw: string | null): Progress {
  if (!raw) return EMPTY;
  try {
    const o = JSON.parse(raw);
    const strs = (v: unknown) => Array.isArray(v) && v.every((x) => typeof x === "string");
    if (
      typeof o?.xp === "number" && Number.isFinite(o.xp) && o.xp >= 0 &&
      strs(o.done) && strs(o.badges) &&
      typeof o.streak === "number" && o.streak >= 0 &&
      (o.lastDay === null || typeof o.lastDay === "string")
    ) {
      return { xp: o.xp, done: o.done, lastDay: o.lastDay, streak: o.streak, badges: o.badges };
    }
  } catch {}
  return EMPTY;
}
