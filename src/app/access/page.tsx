import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JpText } from "@/components/ui/JpText";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { ctaAttrs } from "@/lib/cta";

export const metadata: Metadata = {
  title: "アクセス",
  description: `${site.name}（ルメア）の住所・営業時間・電話番号のご案内。`,
  robots: { index: false, follow: true },
};

const accessLead = [
  "外観から",
  "営業時間まで、",
  "来店前に",
  "知って",
  "おきたい",
  "情報を",
  "まとめました。",
];

export default function AccessPage() {
  return (
    <>
      <Header />

      <main id="main" className="pt-[var(--header-h)]">
        <div className="container-lumea py-14 md:py-20">
          <Breadcrumb items={[{ label: "HOME", href: "/" }, { label: "アクセス" }]} />

          <h1 className="text-[1.5rem] text-[var(--color-ink)] md:text-[2rem]">
            アクセス
          </h1>
          <p className="script mt-2 text-[1.5rem]" aria-hidden="true">
            Access
          </p>

          <p className="mt-8 max-w-2xl text-[0.84rem] leading-jp text-[var(--color-ink-soft)]">
            <JpText phrases={accessLead} />
          </p>

          <Reveal>
            <div className="relative mt-9 aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] sm:aspect-[2/1]">
              <Image
                src="/images/access/exterior.webp"
                alt="夕暮れに灯りがともるLuméaの外観。エントランス両脇に生花が飾られている"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid max-w-2xl gap-10 sm:grid-cols-2">
            {/* --- 住所・行き方 --- */}
            <div className="min-w-0">
              <h2 className="text-[0.72rem] tracking-[0.14em] text-[var(--color-ink-mute)]">
                住所
              </h2>
              <address className="mt-2 text-[0.9rem] leading-[2] text-[var(--color-ink)] not-italic">
                〒{site.address.postalCode}
                <br />
                {site.address.region}
                {site.address.locality}
                <br />
                {site.address.street}
              </address>
              <p className="mt-3 text-[0.78rem] leading-jp text-[var(--color-ink-soft)]">
                {site.access}
              </p>
            </div>

            {/* --- 営業時間・電話 --- */}
            <div className="min-w-0">
              <h2 className="text-[0.72rem] tracking-[0.14em] text-[var(--color-ink-mute)]">
                営業時間
              </h2>
              <dl className="mt-2 text-[0.86rem] leading-[2.1] text-[var(--color-ink)]">
                <div className="flex gap-3">
                  <dt className="shrink-0 text-[var(--color-ink-mute)]">平日</dt>
                  <dd>{site.hours.weekday}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0 text-[var(--color-ink-mute)]">土日祝</dt>
                  <dd>{site.hours.weekend}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0 text-[var(--color-ink-mute)]">定休日</dt>
                  <dd>{site.hours.closed}</dd>
                </div>
              </dl>

              <h2 className="mt-7 text-[0.72rem] tracking-[0.14em] text-[var(--color-ink-mute)]">
                電話
              </h2>
              <Link
                href={site.telHref}
                {...ctaAttrs("tel", "access-page")}
                className="group mt-2 flex items-center gap-2.5 text-[var(--color-ink)] transition-colors hover:text-[var(--color-rose-600)]"
              >
                <Phone
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[var(--color-rose-500)]"
                />
                <span className="font-[family-name:var(--font-cormorant)] text-[1.3rem] tracking-[0.06em]">
                  {site.tel}
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <ButtonLink
              href={site.reserveUrl}
              external
              variant="gold"
              action="reserve"
              location="access-page"
              withArrow
              note="24時間WEB予約OK"
              ariaLabel="WEBで予約する（別ウィンドウで開きます）"
            >
              ご予約はこちら
            </ButtonLink>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
