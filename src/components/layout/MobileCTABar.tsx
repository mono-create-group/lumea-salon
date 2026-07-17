"use client";

import { CalendarCheck, Phone } from "lucide-react";
import { LineIcon } from "@/components/ui/BrandIcons";
import { site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { ctaAttrs } from "@/lib/cta";

/**
 * スマホ画面下の固定CTA。
 * ヒーローを抜けてから出す（最初から被せるとファーストビューを潰すため）。
 */
export function MobileCTABar() {
  const visible = useScrolled(420);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      } transition-all duration-500 ease-[var(--ease-silk)]`}
      // 画面下の固定要素はランドマークにせず、補助的な位置づけにする
      aria-hidden={!visible}
    >
      <ul className="glass grid grid-cols-3 border-t border-white/60 shadow-[0_-6px_24px_-8px_rgba(160,120,110,0.3)]">
        <li>
          <a
            href={site.telHref}
            {...ctaAttrs("tel", "mobile-bar")}
            tabIndex={visible ? 0 : -1}
            className="flex h-full flex-col items-center justify-center gap-1 py-2.5 text-[var(--color-ink-soft)]"
          >
            <Phone aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" />
            <span className="text-[0.62rem] tracking-[0.06em]">電話</span>
          </a>
        </li>

        <li className="border-x border-white/70">
          <a
            href={site.lineUrl}
            {...ctaAttrs("line", "mobile-bar")}
            tabIndex={visible ? 0 : -1}
            className="flex h-full flex-col items-center justify-center gap-1 py-2.5 text-[#06C755]"
          >
            <LineIcon
              className="h-[1.15rem] w-[1.15rem]"
            />
            <span className="text-[0.62rem] tracking-[0.06em]">LINE予約</span>
          </a>
        </li>

        <li>
          {/* 主要導線なので1枠だけ塗って優先度を明示する */}
          <a
            href={site.reserveUrl}
            {...ctaAttrs("reserve", "mobile-bar")}
            tabIndex={visible ? 0 : -1}
            className="flex h-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-[var(--color-rose-400)] to-[var(--color-rose-600)] py-2.5 text-white"
          >
            <CalendarCheck
              aria-hidden="true"
              className="h-[1.15rem] w-[1.15rem]"
            />
            <span className="text-[0.62rem] tracking-[0.06em]">WEB予約</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
