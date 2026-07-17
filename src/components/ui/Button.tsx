import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ctaAttrs, type CtaAction } from "@/lib/cta";

export type { CtaAction };

type Variant = "rose" | "gold" | "outline";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** 計測用。data-cta / data-cta-location に入る */
  action?: CtaAction;
  location?: string;
  /** 右端に矢印を出す */
  withArrow?: boolean;
  /** ボタン下に小さく添える補足（例: 24時間WEB予約OK） */
  note?: string;
  className?: string;
  /**
   * 外部リンクとして別タブで開きたい、という意思表示。
   * href が実際に外部URLのときだけ効く（内部パスなら無視される）。
   */
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full text-center transition-all duration-500 ease-[var(--ease-silk)] focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  // 主要導線。ローズのグラデーション
  rose: "bg-gradient-to-r from-[var(--color-rose-400)] to-[var(--color-rose-600)] text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:brightness-105",
  // 最終CTA。ゴールドで一段格上に見せる
  gold: "bg-gradient-to-r from-[var(--color-gold-400)] via-[#d9b98a] to-[var(--color-gold-500)] text-white shadow-[var(--shadow-lift)] hover:brightness-105",
  // 補助導線
  outline:
    "border border-[var(--color-rose-400)]/60 bg-white/70 text-[var(--color-rose-700)] backdrop-blur-sm hover:border-[var(--color-rose-500)] hover:bg-white",
};

/**
 * サイト内の全CTAはこれを通す。
 * 計測属性は ctaAttrs() が載せるので、GA等での計測は
 * [data-cta="reserve"] や [data-track="reservation"] のセレクタ1本で拾える。
 */
export function ButtonLink({
  href,
  children,
  variant = "rose",
  action,
  location,
  withArrow = false,
  note,
  className = "",
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const content = (
    <>
      <span className="flex flex-col items-center leading-tight">
        <span className="text-[0.95rem] tracking-[0.12em]">{children}</span>
        {note ? (
          <span className="mt-0.5 text-[0.68rem] tracking-[0.08em] opacity-90">
            {note}
          </span>
        ) : null}
      </span>
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  const classes = `${base} ${variants[variant]} px-8 py-4 ${className}`;
  const dataProps = ctaAttrs(action, location);

  // デモでは予約先が内部の /contact なので、external が付いていても別タブにしない。
  // 本番URLへ差し替えた瞬間に、自動で別タブ挙動へ戻る。
  const opensNewTab = external && /^https?:\/\//.test(href);

  if (opensNewTab) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
        {...dataProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel} {...dataProps}>
      {content}
    </Link>
  );
}
