// 進み具合を、このブラウザの中だけに保存する(外部には送らない)
const KEY = "python-learn:v1";
const listeners = new Set<() => void>();

export function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function getRaw(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// 保存できたら true。ブラウザの設定で保存できないときは false。
export function save(value: unknown): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
    listeners.forEach((cb) => cb());
    return true;
  } catch {
    return false;
  }
}
