"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pointer } from "lucide-react";

type SwipeHintProps = {
  label?: string;
};

/**
 * 横スクロール領域に重ねる「スワイプできます」の案内。
 *
 * 参考（できるくんLP等）は黒い半透明ボックスだが、Luméaでは
 * ガラス+ローズ罫の白いピルにして世界観を崩さない。
 *
 * 挙動:
 * - スマホ幅のみ表示（カルーセルはmd未満だけなので md:hidden）
 * - ユーザーが一度でも横にスクロールしたら、静かにフェードアウト
 * - 8秒たっても触られなければ自動で消す（コンテンツを隠し続けない）
 *
 * 置き方: 横スクロールする要素と同じ「relativeな親」の中に並べる。
 * scrollイベントはバブルしないため、親要素の capture で拾う。
 */
export function SwipeHint({ label = "横にスワイプできます" }: SwipeHintProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const wrapper = ref.current?.parentElement;
    if (!wrapper) return;

    const dismiss = () => setHidden(true);
    wrapper.addEventListener("scroll", dismiss, { capture: true, once: true });
    const timer = window.setTimeout(dismiss, 8000);

    return () => {
      wrapper.removeEventListener("scroll", dismiss, { capture: true });
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      // 読み上げには不要な視覚ヒントなので隠す（操作自体は普通のスクロール）
      aria-hidden="true"
      // カルーセルの「直下」に出す。中央に重ねるとカードの見出しに被って
      // 双方が読めなくなるため、コンテンツと重ならない位置に置く
      className={`pointer-events-none absolute inset-x-0 top-full z-10 mt-1 flex justify-center transition-opacity duration-700 ease-[var(--ease-silk)] md:hidden ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="glass flex items-center gap-2.5 rounded-full border border-[var(--color-rose-400)]/45 px-5 py-2.5 shadow-[var(--shadow-soft)]">
        <ChevronLeft
          className="swipe-nudge-l h-4 w-4 shrink-0 text-[var(--color-rose-400)]"
          strokeWidth={1.6}
        />
        <Pointer
          className="h-[1.05rem] w-[1.05rem] shrink-0 text-[var(--color-rose-500)]"
          strokeWidth={1.4}
        />
        <span className="text-[0.7rem] tracking-[0.1em] whitespace-nowrap text-[var(--color-ink-soft)]">
          {label}
        </span>
        <ChevronRight
          className="swipe-nudge-r h-4 w-4 shrink-0 text-[var(--color-rose-400)]"
          strokeWidth={1.6}
        />
      </span>
    </div>
  );
}
