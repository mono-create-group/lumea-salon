import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JpText } from "@/components/ui/JpText";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MenuPriceTable } from "@/components/ui/MenuPriceTable";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { getMenuCategory, menuPageLead, menuSectionIntros } from "@/data/menu";

export const metadata: Metadata = {
  title: "メニュー",
  description: `${site.name}（ルメア）の全メニュー。エステ・マツエク・ネイル、それぞれの料金と施術時間の目安をご紹介します。`,
  robots: { index: false, follow: true },
};

export default function MenuPage() {
  return (
    <>
      <Header />

      <main id="main" className="pt-[var(--header-h)]">
        <div className="container-lumea py-14 md:py-20">
          <Breadcrumb items={[{ label: "HOME", href: "/" }, { label: "メニュー" }]} />

          <h1 className="text-[1.5rem] text-[var(--color-ink)] md:text-[2rem]">
            メニュー
          </h1>
          <p className="script mt-2 text-[1.5rem]" aria-hidden="true">
            Menu
          </p>

          <p className="mt-8 max-w-2xl text-[0.84rem] leading-jp text-[var(--color-ink-soft)]">
            <JpText phrases={menuPageLead} />
          </p>

          <div className="mt-14 flex flex-col gap-20">
            {services.map((service) => {
              const category = getMenuCategory(service.id);

              return (
                <section
                  key={service.id}
                  id={service.id}
                  aria-labelledby={`${service.id}-title`}
                  className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-[var(--color-beige-deep)]/40 pt-14"
                >
                  <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
                    {/* --- 画像 + 紹介文 --- */}
                    <div className="min-w-0">
                      <span
                        aria-hidden="true"
                        className="script text-[1.4rem] text-[var(--color-gold-500)]"
                      >
                        {service.en}
                      </span>
                      <h2
                        id={`${service.id}-title`}
                        className="mt-1 text-[1.25rem] text-[var(--color-ink)]"
                      >
                        {service.ja}
                      </h2>

                      <Reveal>
                        <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                          <Image
                            src={service.image}
                            alt={service.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 320px"
                            className="object-cover"
                          />
                        </div>
                      </Reveal>

                      <p className="mt-5 min-w-0 text-[0.82rem] leading-jp text-[var(--color-ink-soft)]">
                        <JpText phrases={menuSectionIntros[service.id]} />
                      </p>

                      <ButtonLink
                        href={`/menu/${service.id}`}
                        variant="outline"
                        action="nav"
                        location={`menu-${service.id}`}
                        withArrow
                        className="mt-6"
                      >
                        {service.ja}の詳細を見る
                      </ButtonLink>
                    </div>

                    {/* --- 料金表 --- */}
                    <div className="min-w-0">
                      <MenuPriceTable items={category.items} />
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <Link
            href="/"
            className="mt-16 inline-flex items-center gap-2 rounded-full border border-[var(--color-beige-deep)]/70 bg-white/70 px-6 py-3 text-[0.76rem] tracking-[0.12em] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-rose-400)] hover:text-[var(--color-rose-600)]"
          >
            トップへ戻る
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
