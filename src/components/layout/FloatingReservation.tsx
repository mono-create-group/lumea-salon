"use client";

import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { LineIcon } from "@/components/ui/BrandIcons";
import { site } from "@/data/site";
import { ctaAttrs } from "@/lib/cta";

const items = [
  {
    icon: CalendarCheck,
    label: "ご予約",
    href: site.reserveUrl,
    action: "reserve" as const,
    color: "text-[var(--color-gold-500)]",
    ariaLabel: "WEBで予約する",
  },
  {
    icon: LineIcon,
    label: "LINE予約",
    href: site.lineUrl,
    action: "line" as const,
    color: "text-[#06C755]",
    ariaLabel: "LINEで予約する",
  },
  {
    icon: Phone,
    label: "電話する",
    href: site.telHref,
    action: "tel" as const,
    color: "text-[var(--color-rose-500)]",
    ariaLabel: `電話で予約する ${site.tel}`,
  },
];

/**
 * PC右側に固定する予約導線。
 * どこまでスクロールしても3つの予約手段が視界にある状態を作る。
 * スマホでは MobileCTABar が同じ役割を担うので出さない。
 */
export function FloatingReservation() {
  return (
    <aside
      aria-label="予約メニュー"
      className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="glass flex flex-col overflow-hidden rounded-3xl border border-white/60 shadow-[var(--shadow-lift)]">
        {items.map(({ icon: Icon, ...item }, index) => (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-label={item.ariaLabel}
              {...ctaAttrs(item.action, "float-rail")}
              className={`flex w-[74px] flex-col items-center gap-1.5 px-2 py-4 transition-colors duration-400 hover:bg-[var(--color-blush-50)] ${
                index > 0 ? "border-t border-[var(--color-beige)]/50" : ""
              }`}
            >
              <Icon aria-hidden="true" className={`h-5 w-5 ${item.color}`} />
              <span className="text-[0.62rem] tracking-[0.06em] text-[var(--color-ink-soft)]">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
