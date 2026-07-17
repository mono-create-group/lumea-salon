"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, CalendarCheck } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { ctaAttrs } from "@/lib/cta";

/**
 * 固定ヘッダー。
 * 最上部では透明でヒーローに溶かし、スクロール後は半透明ガラスに変える。
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-silk)] ${
          scrolled
            ? "glass border-b border-white/50 shadow-[var(--shadow-panel)]"
            : "bg-transparent"
        }`}
        style={{ height: "var(--header-h)" }}
      >
        <div className="container-lumea flex h-full items-center justify-between gap-6">
          <Link
            href="#home"
            aria-label={`${site.name} ホームへ`}
            className="shrink-0"
          >
            <Logo />
          </Link>

          {/* PCナビ。中央に置く */}
          <nav
            aria-label="メインメニュー"
            className="hidden flex-1 justify-center lg:flex"
          >
            <ul className="flex items-center gap-7 xl:gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative block py-2 font-[family-name:var(--font-cormorant)] text-[0.95rem] tracking-[0.16em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-rose-600)]"
                  >
                    {link.label}
                    {/* ホバーで下線が伸びる */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--color-rose-400)] transition-transform duration-400 ease-[var(--ease-silk)] group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {/* PCの予約ボタン */}
            <a
              href={site.reserveUrl}
              {...ctaAttrs("reserve", "header")}
              className="hidden items-center gap-2.5 rounded-full bg-gradient-to-r from-[var(--color-rose-400)] to-[var(--color-rose-600)] px-6 py-2.5 text-white shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-silk)] hover:shadow-[var(--shadow-lift)] hover:brightness-105 lg:flex"
            >
              <CalendarCheck aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[0.85rem] tracking-[0.1em]">
                  ご予約はこちら
                </span>
                <span className="text-[0.6rem] tracking-[0.06em] opacity-90">
                  24時間WEB予約OK
                </span>
              </span>
            </a>

            {/* スマホのハンバーガー */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="メニューを開く"
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-[var(--color-ink)] transition-colors hover:bg-white/60 lg:hidden"
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
