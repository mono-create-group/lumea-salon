import Image from "next/image";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PetalAnimation } from "@/components/ui/PetalAnimation";

/**
 * 最終CTA。淡いピンク→ゴールドのグラデーションで一段格を上げ、
 * 「予約する」ではなく「第一歩を踏み出す」という感情の言葉で締める。
 */
export function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden"
    >
      {/* --- 背景: 全体はピンク→ゴールド、人物は左端だけ ---
          帯状のセクションに人物写真を全面で敷くと、顔が横一文字に
          切り取られてしまう。参考デザインと同じく左端にだけ置く。 */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-rose-400)] via-[var(--color-rose-500)] to-[var(--color-gold-400)]"
        />

        <div className="absolute inset-y-0 left-0 w-[42%] sm:w-[34%] lg:w-[26%]">
          <Image
            src="/images/cta.webp"
            alt=""
            // 純粋な装飾なので読み上げ対象から外す
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 34vw, 26vw"
            className="object-cover object-[50%_22%] mix-blend-luminosity opacity-45"
          />
          {/* 右端をピンクへ溶かして、写真の切れ目を消す */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-rose-500)]/35 to-[var(--color-rose-500)]"
          />
        </div>
      </div>

      <PetalAnimation count={9} className="-z-10 opacity-70" />

      <div className="container-lumea py-16 md:py-20">
        <div className="flex flex-col items-center gap-9 lg:flex-row lg:justify-end lg:gap-12">
          <Reveal className="text-center lg:text-right">
            <h2
              id="cta-title"
              className="text-[1.35rem] leading-[2] text-white drop-shadow-[0_1px_10px_rgba(120,70,70,0.35)] md:text-[1.75rem]"
            >
              あなたの
              <wbr />
              「なりたい」を
              <wbr />
              叶える
              <wbr />
              第一歩を、
              <br />
              <span className="font-[family-name:var(--font-cormorant)] text-[1.6em] leading-none tracking-wide">
                {site.name}
              </span>
              <span className="ml-1">で踏み出しませんか？</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="shrink-0">
            <ButtonLink
              href={site.reserveUrl}
              external
              variant="gold"
              action="reserve"
              location="final-cta"
              withArrow
              note="24時間WEB予約OK"
              ariaLabel="WEBで予約する（別ウィンドウで開きます）"
              className="scale-105 px-10 py-5 md:scale-110"
            >
              ご予約はこちら
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
