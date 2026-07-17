import { HandHeart, Sparkles, ClipboardList, Armchair, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { reasons, type ReasonIcon } from "@/data/reasons";
import { Reveal } from "@/components/ui/Reveal";
import { PetalAnimation } from "@/components/ui/PetalAnimation";
import { site } from "@/data/site";

const iconMap: Record<ReasonIcon, LucideIcon> = {
  room: HandHeart,
  product: Sparkles,
  custom: ClipboardList,
  space: Armchair,
  aftercare: HeartHandshake,
};

/**
 * 選ばれる理由5点。来店前の不安を潰すのが目的。
 * PCは横5列。スマホは横スクロール（縦に積むと5つが長すぎて読まれない）。
 */
export function ReasonSection() {
  return (
    <section
      id="reason"
      aria-labelledby="reason-title"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--color-ivory)] via-[var(--color-blush-50)] to-[var(--color-ivory)] py-20 md:py-28"
    >
      <PetalAnimation count={10} />

      <div className="relative">
        <Reveal className="container-lumea">
          <div className="flex items-baseline justify-center gap-3">
            <span aria-hidden="true" className="section-number text-[2.5rem] opacity-70">
              03
            </span>
            <h2
              id="reason-title"
              className="text-[1.4rem] text-[var(--color-ink)] md:text-[1.85rem]"
            >
              <span className="font-[family-name:var(--font-cormorant)]">
                {site.name}
              </span>
              が選ばれる理由
            </h2>
          </div>
        </Reveal>

        {/* スマホは横スクロール、PCは5列グリッド */}
        <Reveal
          as="ul"
          stagger={0.1}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-auto md:max-w-[1200px] md:grid md:grid-cols-5 md:gap-2 md:overflow-visible md:px-10 md:pb-0"
        >
          {reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon];
            return (
              <li
                key={reason.icon}
                className={`relative flex min-w-[13rem] shrink-0 snap-center flex-col items-center px-3 text-center md:min-w-0 ${
                  // 項目のあいだに細い縦罫を入れる（参考デザインの区切り）
                  index > 0
                    ? "md:before:absolute md:before:top-4 md:before:-left-1 md:before:h-[72%] md:before:w-px md:before:bg-[var(--color-beige-deep)]/45 md:before:content-['']"
                    : ""
                }`}
              >
                <span className="flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full bg-white shadow-[var(--shadow-soft)]">
                  <Icon
                    aria-hidden="true"
                    className="h-7 w-7 text-[var(--color-rose-500)]"
                    strokeWidth={1.3}
                  />
                </span>

                <h3 className="mt-5 text-[0.94rem] leading-[1.85] text-[var(--color-ink)]">
                  {reason.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <p className="mt-3 text-[0.72rem] leading-[2] text-[var(--color-ink-mute)]">
                  {reason.body.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
