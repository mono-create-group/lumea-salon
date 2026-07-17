import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsItems, categoryLabel, type NewsCategory } from "@/data/news";
import { Reveal } from "@/components/ui/Reveal";
import { ctaAttrs } from "@/lib/cta";

/** カテゴリごとのバッジ色。キャンペーンだけ濃くして目を引かせる */
const badgeStyle: Record<NewsCategory, string> = {
  campaign: "bg-[var(--color-rose-500)] text-white",
  info: "bg-[var(--color-blush-200)] text-[var(--color-ink-soft)]",
  blog: "bg-[var(--color-beige)] text-[var(--color-ink-soft)]",
};

/**
 * お知らせ。SectionPair の右半分に入る前提なので、
 * 背景・上下余白・コンテナは持たない。
 */
export function NewsSection() {
  return (
    <section
      id="blog"
      aria-labelledby="news-title"
      className="relative min-w-0 pt-14 lg:pt-0 lg:pl-12 xl:pl-16"
    >
      <div>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="news-title" className="script text-[1.9rem]">
              News
            </h2>

            <Link
              href="#blog"
              {...ctaAttrs("nav", "news")}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-beige-deep)]/70 bg-white/70 px-5 py-2.5 text-[0.72rem] tracking-[0.12em] text-[var(--color-ink-soft)] transition-all duration-500 ease-[var(--ease-silk)] hover:border-[var(--color-rose-400)] hover:text-[var(--color-rose-600)]"
            >
              お知らせ一覧
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal as="ul" stagger={0.1} className="mt-7">
          {newsItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className={`group flex flex-wrap items-center gap-x-3.5 gap-y-2 border-b border-[var(--color-beige-deep)]/35 px-2 py-4 transition-colors duration-400 hover:bg-white/60 ${
                  // キャンペーンは背景を薄く敷いて優先度を上げる
                  item.category === "campaign" ? "bg-white/45" : ""
                }`}
              >
                <time
                  dateTime={item.dateTime}
                  className="font-[family-name:var(--font-cormorant)] text-[0.95rem] tracking-[0.08em] text-[var(--color-ink-mute)]"
                >
                  {item.date}
                </time>

                <span
                  className={`shrink-0 rounded-full px-3.5 py-1 text-[0.62rem] tracking-[0.1em] ${badgeStyle[item.category]}`}
                >
                  {categoryLabel[item.category]}
                </span>

                <span className="flex-1 text-[0.84rem] leading-[1.9] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-rose-600)]">
                  {item.title}
                </span>

                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-[var(--color-ink-mute)] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[var(--color-rose-500)]"
                />
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
