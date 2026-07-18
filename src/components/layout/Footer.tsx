import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { InstagramIcon, LineIcon } from "@/components/ui/BrandIcons";
import { navLinks, subLinks, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { JpText } from "@/components/ui/JpText";
import { ctaAttrs } from "@/lib/cta";

/** ナビをフッター用に3列へ割る */
const columns = [
  navLinks.slice(0, 3),
  navLinks.slice(3, 6),
  [navLinks[6], ...subLinks.slice(0, 2)],
];

export function Footer() {
  return (
    <footer
      id="access"
      className="bg-gradient-to-b from-[var(--color-blush-50)] to-[var(--color-ivory-deep)] pt-14"
      // スマホは下部固定CTAの高さぶん余白を足して、footer末尾が隠れないようにする
      style={{ paddingBottom: "calc(2.5rem + var(--mobile-cta-h))" }}
    >
      <div className="container-lumea">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] md:gap-8">
          {/* --- 店舗情報 --- */}
          <div>
            <Logo tone="ink" className="!items-start" />

            <address className="mt-5 text-[0.76rem] leading-[2.1] text-[var(--color-ink-soft)] not-italic">
              〒{site.address.postalCode}
              <br />
              {site.address.region}
              {site.address.locality}
              {site.address.street}
            </address>

            <dl className="mt-4 text-[0.74rem] leading-[2.1] text-[var(--color-ink-mute)]">
              <div className="flex gap-2">
                <dt className="shrink-0">営業時間</dt>
                <dd>
                  平日 {site.hours.weekday} / 土日祝 {site.hours.weekend}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0">定休日</dt>
                <dd>{site.hours.closed}</dd>
              </div>
            </dl>

            <p className="mt-4 text-[0.72rem] leading-[2] text-[var(--color-ink-mute)]">
              <JpText phrases={site.access} />
            </p>
          </div>

          {/* --- ナビ --- */}
          <nav aria-label="フッターメニュー" className="md:px-4">
            <div className="grid grid-cols-3 gap-4">
              {columns.map((column, index) => (
                <ul key={index} className="flex flex-col gap-3.5">
                  {column.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-[family-name:var(--font-cormorant)] text-[0.82rem] tracking-[0.14em] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-rose-600)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          {/* --- 連絡・予約 ---
              架空サロンなので、電話もLINEもInstagramも実在の相手へは繋がない。
              全てデモ趣旨を書いた /contact へ寄せる（site.ts で一元管理） */}
          <div className="flex flex-col gap-3.5">
            <Link
              href={site.telHref}
              {...ctaAttrs("tel", "footer")}
              className="group flex items-center gap-3 text-[var(--color-ink)] transition-colors hover:text-[var(--color-rose-600)]"
            >
              <Phone
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[var(--color-rose-500)]"
              />
              <span className="font-[family-name:var(--font-cormorant)] text-[1.32rem] tracking-[0.06em]">
                {site.tel}
              </span>
            </Link>

            <Link
              href={site.lineUrl}
              {...ctaAttrs("line", "footer")}
              className="flex items-center gap-3 text-[0.8rem] text-[var(--color-ink-soft)] transition-colors hover:text-[#06C755]"
            >
              <LineIcon className="h-4 w-4 shrink-0 text-[#06C755]" />
              LINEで予約する
            </Link>

            <Link
              href={site.reserveUrl}
              {...ctaAttrs("reserve", "footer")}
              className="flex items-center gap-3 text-[0.8rem] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-rose-600)]"
            >
              <CalendarCheck
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[var(--color-gold-500)]"
              />
              ご予約はこちら
            </Link>

            <Link
              href={site.instagramUrl}
              {...ctaAttrs("instagram", "footer")}
              className="flex items-center gap-3 text-[0.8rem] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-rose-600)]"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-[var(--color-rose-400)]" />
              {site.instagramHandle}
            </Link>
          </div>
        </div>

        {/* 架空サイトである旨の明記。実在店舗と誤認させないための必須表示 */}
        {site.isDemo ? (
          <p className="mt-12 rounded-xl border border-[var(--color-beige-deep)]/50 bg-white/60 px-5 py-4 text-[0.7rem] leading-[2] text-[var(--color-ink-soft)]">
            <JpText phrases={site.demoNotice} />
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-beige-deep)]/40 pt-5">
          <p className="text-[0.66rem] tracking-[0.08em] text-[var(--color-ink-mute)]">
            &copy; {new Date().getFullYear()} {site.name} beauty salon
          </p>
          <Link
            href="/privacy"
            className="text-[0.66rem] tracking-[0.08em] text-[var(--color-ink-mute)] transition-colors hover:text-[var(--color-rose-600)]"
          >
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
