"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { galleryItems } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** span をグリッドの占有クラスに変換する */
const spanClass: Record<string, string> = {
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  normal: "col-span-1 row-span-1",
};

/**
 * ギャラリー。左に見出し、右にリズムのあるグリッド。
 * タイルは左右交互から寄ってくる。
 *
 * SectionPair の左半分に入る前提なので、背景・上下余白・コンテナは持たない。
 */
export function GallerySection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const tiles = gsap.utils.toArray<HTMLElement>(".gallery-tile");

      tiles.forEach((tile, index) => {
        gsap.from(tile, {
          // 偶数は左から、奇数は右から
          x: index % 2 === 0 ? -46 : 46,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: tile, start: "top 88%", once: true },
        });
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative min-w-0 lg:pr-12 xl:pr-16"
    >
      <div>
        <div className="grid min-w-0 gap-8 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-7">
          {/* --- 見出し --- */}
          <div className="sm:pt-2">
            <Reveal>
              <SectionHeading id="gallery-title" number="04" en="Gallery">
                心ときめく
                <wbr />
                上質な空間
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[0.82rem] leading-jp text-[var(--color-ink-soft)]">
                扉を
                <wbr />
                開けた
                <wbr />
                瞬間から、
                <br />
                いつもと
                <wbr />
                違う
                <wbr />
                時間が
                <wbr />
                はじまります。
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <ButtonLink
                href="#gallery"
                action="nav"
                location="gallery"
                withArrow
                className="mt-7"
              >
                ギャラリーを見る
              </ButtonLink>
            </Reveal>
          </div>

          {/* --- グリッド ---
              一部を横2枠にして、単調な並びを崩す */}
          <ul className="grid auto-rows-[6.2rem] grid-cols-3 gap-2 sm:auto-rows-[5.6rem] lg:auto-rows-[6.4rem] xl:auto-rows-[7.2rem]">
            {galleryItems.map((item) => (
              <li
                key={item.src}
                className={`gallery-tile group relative overflow-hidden rounded-xl ${spanClass[item.span]}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-silk)] group-hover:scale-110"
                />
                {/* ホバーで淡く白を敷いて、画像を柔らかく持ち上げる */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white/0 transition-colors duration-700 group-hover:bg-white/12"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
