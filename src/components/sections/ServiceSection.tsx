import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PetalAnimation } from "@/components/ui/PetalAnimation";

/**
 * メニュー。左に見出し、右に3枚のカード。
 * カードは画像・短い説明・価格・詳細リンクを持ち、
 * ホバーで画像が拡大しカードが少し浮く。
 */
export function ServiceSection() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--color-blush-50)] to-[var(--color-ivory)] py-20 md:py-28"
    >
      <PetalAnimation count={8} />

      <div className="container-lumea relative">
        {/* 見出し列は、日本語見出しが折り返しても隣のカードにぶつからない幅を確保する */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
          {/* --- 見出し --- */}
          <div className="lg:pt-6">
            <Reveal>
              <SectionHeading id="menu-title" number="02" en="Menu">
                トータルビューティーで、
                <wbr />
                全ての「キレイ」を
                <wbr />
                サポート
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-[0.88rem] leading-jp text-[var(--color-ink-soft)]">
                一人ひとりの
                <wbr />
                お悩みや
                <wbr />
                理想に
                <wbr />
                合わせて、
                <br />
                最適な
                <wbr />
                メニューを
                <wbr />
                ご提案します。
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <ButtonLink
                href="/menu"
                action="nav"
                location="menu-heading"
                withArrow
                className="mt-8"
              >
                メニュー一覧を見る
              </ButtonLink>
            </Reveal>
          </div>

          {/* --- カード3枚 --- */}
          <Reveal as="ul" stagger={0.14} className="grid gap-5 sm:grid-cols-3">
            {services.map((service) => (
              <li key={service.id} id={`menu-${service.id}`}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/90 shadow-[var(--shadow-soft)] transition-all duration-600 ease-[var(--ease-silk)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]"
                >
                  {/* 画像。ホバーで拡大 */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 260px"
                      className="object-cover transition-transform duration-[900ms] ease-[var(--ease-silk)] group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="script text-[1.5rem] leading-none">
                        {service.en}
                      </h3>
                      <span className="text-[0.62rem] tracking-[0.14em] text-[var(--color-ink-mute)]">
                        {service.ja}
                      </span>
                    </div>

                    <p className="mt-3 text-[0.78rem] leading-[2] text-[var(--color-ink-soft)]">
                      {service.lead.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>

                    <p className="mt-3 font-[family-name:var(--font-cormorant)] text-[1.05rem] text-[var(--color-gold-600)]">
                      {service.priceFrom}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 pt-3 text-[0.68rem] tracking-[0.16em] text-[var(--color-ink-soft)] transition-colors group-hover:text-[var(--color-rose-600)]">
                      VIEW MORE
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
