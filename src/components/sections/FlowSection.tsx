import {
  CalendarCheck,
  MessagesSquare,
  Sparkles,
  Wand2,
  CalendarHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { flowSteps, type FlowIcon } from "@/data/flow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<FlowIcon, LucideIcon> = {
  reserve: CalendarCheck,
  counsel: MessagesSquare,
  treatment: Sparkles,
  finish: Wand2,
  next: CalendarHeart,
};

/**
 * 来店の流れ5ステップ。
 * PCは横タイムライン（丸を線でつなぐ）、スマホは縦タイムライン。
 *
 * SectionPair の右半分に入る前提なので、背景・上下余白・コンテナは持たない。
 */
export function FlowSection() {
  return (
    <section
      id="flow"
      aria-labelledby="flow-title"
      className="relative min-w-0 pt-14 lg:pt-0 lg:pl-12 xl:pl-16"
    >
      <div>
        <Reveal>
          <SectionHeading
            id="flow-title"
            number="05"
            en="Flow"
            align="center"
            className="mx-auto"
          >
            ご来店から
            <wbr />
            美しくなるまでの
            <wbr />
            流れ
          </SectionHeading>
        </Reveal>

        <Reveal
          as="ol"
          stagger={0.12}
          className="relative mt-10 grid gap-9 sm:grid-cols-5 sm:gap-2"
        >
          {flowSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const isLast = index === flowSteps.length - 1;

            return (
              <li
                key={step.step}
                className="relative flex gap-5 sm:min-w-0 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
              >
                {/* --- 丸アイコン + つなぎ線 --- */}
                <div className="relative flex shrink-0 flex-col items-center sm:w-full">
                  <span className="relative z-10 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full border border-[var(--color-blush-200)] bg-white shadow-[var(--shadow-soft)]">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-[var(--color-rose-500)]"
                      strokeWidth={1.3}
                    />
                  </span>

                  {/* つなぎ線: スマホは縦、PCは横。最後の1つには引かない */}
                  {!isLast ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute top-[3.5rem] bottom-[-2.25rem] w-px bg-gradient-to-b from-[var(--color-blush-300)] to-[var(--color-blush-200)] sm:hidden"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-[1.75rem] left-[calc(50%+1.9rem)] hidden h-px w-[calc(100%-3.8rem)] bg-[var(--color-blush-300)] sm:block"
                      />
                    </>
                  ) : null}
                </div>

                {/* --- テキスト --- */}
                <div className="min-w-0 pb-2 sm:pb-0">
                  <span
                    aria-hidden="true"
                    className="section-number block text-[1.2rem] opacity-60 sm:mt-3"
                  >
                    {step.step}
                  </span>
                  <h3 className="mt-1 text-[0.74rem] leading-[1.6] text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.62rem] leading-[1.8] text-[var(--color-ink-mute)]">
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
      </div>
    </section>
  );
}
