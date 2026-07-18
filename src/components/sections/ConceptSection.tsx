"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/**
 * コンセプト。左に内観の大型画像、右にテキスト。
 * 画像とテキストの境目は斜めに切って、四角の連続を崩す。
 */
export function ConceptSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      // 画像だけを遅れて動かす＝奥行きが出る
      gsap.fromTo(
        ".concept-media",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="concept"
      aria-labelledby="concept-title"
      className="relative overflow-hidden bg-[var(--color-ivory)] py-20 md:py-28"
    >
      {/* 右下に敷く飾り罫 */}
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(250,233,231,0.8),transparent_70%)] blur-xl"
      />

      <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-0">
        {/* --- 画像 --- */}
        <div className="relative h-[19rem] overflow-hidden sm:h-[24rem] lg:h-[34rem]">
          {/* 親を overflow-hidden にして、中の画像だけを上下に動かす */}
          <div className="concept-media absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
            <Image
              src="/images/concept/interior.webp"
              alt="Luméaの店内。やわらかな照明と生花が並ぶ待合スペース"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          {/* 斜めの切り替え。PCのみ。右端をアイボリーで斜めに削る */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              background: "var(--color-ivory)",
              clipPath: "polygon(88% 0, 100% 0, 100% 100%, 74% 100%)",
            }}
          />
        </div>

        {/* --- テキスト --- */}
        <div className="container-lumea lg:pl-4 lg:pr-16">
          <div className="max-w-[34rem]">
            <Reveal>
              <SectionHeading id="concept-title" number="01" en="Concept">
                あなただけの&ldquo;美&rdquo;を
                <wbr />
                デザインする場所
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.12}>
              {/* <br> はPCの改行位置を決めるだけ。スマホでは消えるので、
                  文節の <wbr> が無いと1文が丸ごと折り返せず画面からはみ出す */}
              <p className="mt-7 text-[0.9rem] leading-jp text-[var(--color-ink-soft)] md:text-[0.95rem]">
                {site.name}は、
                <wbr />
                エステ・マツエク・ネイルを
                <wbr />
                通して、
                <br className="hidden sm:block" />
                女性の
                <wbr />
                内側から
                <wbr />
                輝く
                <wbr />
                美しさを
                <wbr />
                引き出す
                <wbr />
                トータルビューティーサロンです。
                {/* 句点の後は必ず改行(会長ルール)。スマホでも消さない */}
                <br />
                忙しい
                <wbr />
                日常を忘れ、
                <wbr />
                心から
                <wbr />
                リラックスできる
                <wbr />
                空間で、
                <br className="hidden sm:block" />
                あなただけの
                <wbr />
                「なりたい自分」を
                <wbr />
                一緒に
                <wbr />
                叶えます。
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ButtonLink
                href="#menu"
                action="nav"
                location="concept"
                withArrow
                className="mt-9"
              >
                私たちの想いをもっと見る
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
