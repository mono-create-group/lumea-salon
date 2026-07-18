import Image from "next/image";
import { MessagesSquare, Droplet, Wand2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JpText } from "@/components/ui/JpText";
import { MenuPriceTable } from "@/components/ui/MenuPriceTable";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { getMenuCategory } from "@/data/menu";
import { menuDetails, type MenuDetailFlowIcon } from "@/data/menuDetail";
import type { ServiceId } from "@/data/services";

const flowIconMap: Record<MenuDetailFlowIcon, LucideIcon> = {
  counsel: MessagesSquare,
  prep: Droplet,
  treatment: Wand2,
  finish: Sparkles,
};

type MenuDetailPageProps = {
  serviceId: ServiceId;
};

/**
 * エステ・マツエク・ネイル、3つの詳細ページを1つで賄う共通テンプレート。
 * 差分は menuDetail.ts と menu.ts のデータだけが持つ。
 */
export function MenuDetailPage({ serviceId }: MenuDetailPageProps) {
  const detail = menuDetails[serviceId];
  const category = getMenuCategory(serviceId);
  const ctaLocation = `menu-detail-${serviceId}`;

  return (
    <>
      <Header />

      <main id="main" className="pt-[var(--header-h)]">
        <div className="container-lumea py-14 md:py-20">
          <Breadcrumb
            items={[
              { label: "HOME", href: "/" },
              { label: "メニュー", href: "/menu" },
              { label: detail.title },
            ]}
          />

          <h1 className="text-[1.5rem] text-[var(--color-ink)] md:text-[2rem]">
            {detail.title}
          </h1>
          <p className="script mt-2 text-[1.5rem]" aria-hidden="true">
            {detail.en}
          </p>

          <p className="mt-8 max-w-2xl text-[0.86rem] leading-[2] text-[var(--color-ink-soft)]">
            {detail.intro.map((sentence, index) => (
              <span key={index} className="block">
                <JpText phrases={sentence} />
              </span>
            ))}
          </p>

          <Reveal>
            <div className="relative mt-10 aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] sm:aspect-[2/1]">
              <Image
                src={detail.image}
                alt={detail.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* --- 料金表 --- */}
          <h2 className="mt-14 text-[1.1rem] text-[var(--color-ink)]">料金</h2>
          <MenuPriceTable items={category.items} className="mt-4 max-w-2xl" />

          {/* --- 施術の流れ --- */}
          <h2 className="mt-14 text-[1.1rem] text-[var(--color-ink)]">
            施術の流れ
          </h2>
          <Reveal
            as="ol"
            stagger={0.1}
            className="mt-6 grid max-w-3xl gap-8 sm:grid-cols-4 sm:gap-4"
          >
            {detail.flow.map((step) => {
              const Icon = flowIconMap[step.icon];
              return (
                <li
                  key={step.step}
                  className="flex min-w-0 gap-4 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
                >
                  <span className="flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded-full border border-[var(--color-blush-200)] bg-white shadow-[var(--shadow-soft)]">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-[var(--color-rose-500)]"
                      strokeWidth={1.3}
                    />
                  </span>
                  <div className="min-w-0 sm:mt-3">
                    <span
                      aria-hidden="true"
                      className="section-number block text-[1rem] opacity-60"
                    >
                      {step.step}
                    </span>
                    <h3 className="mt-1 text-[0.78rem] text-[var(--color-ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[0.68rem] leading-[1.8] text-[var(--color-ink-mute)]">
                      {step.body.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </Reveal>

          {/* --- 注意事項 --- */}
          <div
            role="note"
            className="mt-14 max-w-2xl rounded-2xl border border-[var(--color-beige-deep)]/50 bg-white/60 px-6 py-5"
          >
            <p className="text-[0.78rem] font-medium text-[var(--color-ink)]">
              ご利用にあたって
            </p>
            <p className="mt-2 text-[0.74rem] leading-jp text-[var(--color-ink-mute)]">
              <JpText phrases={detail.cautions} />
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <ButtonLink
              href={site.reserveUrl}
              external
              action="reserve"
              location={ctaLocation}
              withArrow
              note="24時間WEB予約OK"
              ariaLabel="WEBで予約する（別ウィンドウで開きます）"
            >
              ご予約はこちら
            </ButtonLink>

            <ButtonLink href="/menu" variant="outline" action="nav" location={ctaLocation}>
              メニュー一覧へ戻る
            </ButtonLink>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
