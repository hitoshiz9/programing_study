import type { RunResult } from "./judge";

// Python は別スレッド(worker)で動かす。終わらないコードは、worker ごと止めて作り直す。
let worker: Worker | null = null;
let ready: Promise<void> | null = null;

function start() {
  const w = new Worker(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/py-worker.mjs`, { type: "module" });
  worker = w;
  ready = new Promise<void>((resolve, reject) => {
    w.onmessage = (e) => e.data.type === "ready" && resolve();
    w.onerror = () => reject(new Error("worker"));
  });
  ready.catch(() => {}); // 先読みの失敗は、実行時に報告する
}

export function preload() {
  if (!worker) start();
}

export async function runPython(code: string, test?: string, timeoutMs = 5000): Promise<RunResult> {
  preload();
  try {
    await ready;
  } catch {
    worker = null;
    return { out: "", testOut: "", error: "Python を準備できませんでした。ページを読み込み直してください。" };
  }
  const w = worker!;
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      w.terminate();
      worker = null;
      preload();
      resolve({ out: "", testOut: "", error: null, timedOut: true });
    }, timeoutMs);
    w.onmessage = (e) => {
      if (e.data.type !== "result") return;
      clearTimeout(timer);
      resolve(e.data.result);
    };
    w.postMessage({ code, test });
  });
}
