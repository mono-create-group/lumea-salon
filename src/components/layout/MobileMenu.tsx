"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, CalendarCheck } from "lucide-react";
import { LineIcon } from "@/components/ui/BrandIcons";
import { navLinks, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ctaAttrs } from "@/lib/cta";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * スマホのハンバーガーメニュー。
 * ・開いている間は背面のスクロールを止める
 * ・Escで閉じる
 * ・開いた瞬間に閉じるボタンへフォーカスを移し、パネル内にフォーカスを閉じ込める
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // 背面スクロールの固定
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Esc で閉じる + Tab をパネル内に閉じ込める
  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 背景。クリックで閉じる */}
          <button
            type="button"
            aria-label="メニューを閉じる"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-[var(--color-ink)]/25 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="メニュー"
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-[var(--color-cream)] shadow-[var(--shadow-lift)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-beige)]/60 px-6 py-5">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="メニューを閉じる"
                className="rounded-full p-2 text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-blush-50)]"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="モバイルメニュー" className="px-6 py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-baseline gap-3 border-b border-[var(--color-beige)]/40 py-4 transition-colors hover:text-[var(--color-rose-600)]"
                    >
                      <span className="font-[family-name:var(--font-cormorant)] text-lg tracking-[0.18em]">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 予約導線はメニュー内でも最下部に必ず置く */}
            <div className="mt-auto flex flex-col gap-3 px-6 pb-8">
              <Link
                href={site.reserveUrl}
                {...ctaAttrs("reserve", "mobile-menu")}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-rose-400)] to-[var(--color-rose-600)] py-4 text-white shadow-[var(--shadow-soft)]"
              >
                <CalendarCheck aria-hidden="true" className="h-4 w-4" />
                <span className="text-sm tracking-[0.1em]">WEBで予約する</span>
              </Link>
              <Link
                href={site.lineUrl}
                {...ctaAttrs("line", "mobile-menu")}
                className="flex items-center justify-center gap-2 rounded-full border border-[#06C755] py-4 text-[#06C755]"
              >
                <LineIcon className="h-4 w-4" />
                <span className="text-sm tracking-[0.1em]">LINEで予約する</span>
              </Link>
              <Link
                href={site.telHref}
                {...ctaAttrs("tel", "mobile-menu")}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-beige-deep)] py-4 text-[var(--color-ink-soft)]"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                <span className="text-sm tracking-[0.1em]">{site.tel}</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
