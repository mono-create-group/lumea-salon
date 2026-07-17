"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * ブラウザ側のメディアクエリを購読する。
 * useEffect + setState でやると初回に必ず1回よけいなレンダーが走るので、
 * 外部ストアとして React に直接読ませる。
 */
function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** サーバーには matchMedia が無い。動かす側の分岐に使う前提なので false に倒す */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * prefers-reduced-motion を購読する。
 * SSR中は false を返すので、「動かす側」の分岐に使うこと
 * （動かさない側を既定にする）。
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
