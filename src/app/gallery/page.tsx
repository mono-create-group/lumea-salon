import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JpText } from "@/components/ui/JpText";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { galleryPageItems } from "@/data/galleryPage";

export const metadata: Metadata = {
  title: "ギャラリー",
  description: `${site.name}（ルメア）のギャラリー。施術風景から店内・外観まで、サロンの空気感をご紹介します。`,
  robots: { index: false, follow: true },
};

const galleryLead = [
  "施術の",
  "様子から",
  "店内の",
  "雰囲気まで、",
  `${site.name}の`,
  "空気感を",
  "まとめました。",
];

/** span をグリッドの占有クラスに変換する（トップの GallerySection と同じ考え方） */
const spanClass: Record<string, string> = {
  wide: "col-span-2",
  tall: "row-span-2",
  normal: "",
};

export default function GalleryPage() {
  return (
    <>
      <Header />

      <main id="main" className="pt-[var(--header-h)]">
        <div className="container-lumea py-14 md:py-20">
          <Breadcrumb items={[{ label: "HOME", href: "/" }, { label: "ギャラリー" }]} />

          <h1 className="text-[1.5rem] text-[var(--color-ink)] md:text-[2rem]">
            ギャラリー
          </h1>
          <p className="script mt-2 text-[1.5rem]" aria-hidden="true">
            Gallery
          </p>

          <p className="mt-8 max-w-2xl text-[0.84rem] leading-jp text-[var(--color-ink-soft)]">
            <JpText phrases={galleryLead} />
          </p>

          <Reveal
            as="ul"
            stagger={0.06}
            className="mt-12 grid auto-rows-[7.5rem] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:auto-rows-[8.5rem] lg:grid-cols-4 lg:auto-rows-[10rem]"
          >
            {galleryPageItems.map((item) => (
              <li
                key={item.src}
                className={`group relative min-w-0 overflow-hidden rounded-xl ${spanClass[item.span]}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-silk)] group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white/0 transition-colors duration-700 group-hover:bg-white/12"
                />
              </li>
            ))}
          </Reveal>

          <div className="mt-14 flex justify-center">
            <ButtonLink
              href={site.reserveUrl}
              external
              variant="gold"
              action="reserve"
              location="gallery-page"
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
