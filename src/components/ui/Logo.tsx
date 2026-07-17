import { site } from "@/data/site";

type LogoProps = {
  /** ダーク背景に載せるとき用に色を白に倒す */
  tone?: "gold" | "ink";
  className?: string;
};

/**
 * ロゴはフォントで組む（画像にしない）。
 * 拡大しても劣化せず、文字の変更もデータ側で完結する。
 */
export function Logo({ tone = "gold", className = "" }: LogoProps) {
  const main =
    tone === "gold" ? "text-[var(--color-gold-500)]" : "text-[var(--color-ink)]";
  const sub =
    tone === "gold"
      ? "text-[var(--color-gold-400)]"
      : "text-[var(--color-ink-mute)]";

  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span
        className={`font-[family-name:var(--font-cormorant)] text-[1.85rem] font-normal tracking-[0.02em] ${main}`}
      >
        {site.name}
      </span>
      <span
        className={`mt-1 text-[0.53rem] tracking-[0.42em] ${sub}`}
        // 「beauty salon」は装飾。読み上げは店名だけで足りる
        aria-hidden="true"
      >
        {site.tagline}
      </span>
    </span>
  );
}
