import Image from "next/image";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { instagramPosts } from "@/data/gallery";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { ctaAttrs } from "@/lib/cta";

/**
 * Instagram。最新投稿を並べてアカウントへ送る。
 * 実運用ではここを Instagram Graph API の取得結果に差し替える。
 *
 * SectionPair の左半分に入る前提なので、背景・上下余白・コンテナは持たない。
 */
export function InstagramSection() {
  return (
    <section
      id="instagram"
      aria-labelledby="instagram-title"
      className="relative min-w-0 lg:pr-12 xl:pr-16"
    >
      <div>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="instagram-title" className="script text-[1.9rem]">
                Instagram
              </h2>
              <p className="mt-1 text-[0.74rem] tracking-[0.1em] text-[var(--color-ink-mute)]">
                {site.instagramHandle}
              </p>
            </div>

            <a
              href={site.instagramUrl}
              {...ctaAttrs("instagram", "instagram-section")}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-beige-deep)]/70 bg-white/70 px-5 py-2.5 text-[0.72rem] tracking-[0.12em] text-[var(--color-ink-soft)] transition-all duration-500 ease-[var(--ease-silk)] hover:border-[var(--color-rose-400)] hover:text-[var(--color-rose-600)]"
            >
              もっと見る
              <InstagramIcon
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          </div>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.07}
          className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-5"
        >
          {/* 半分の幅に収める都合上、参考モックと同じ5枚に絞る */}
          {instagramPosts.slice(0, 5).map((post) => (
            <li key={post.src}>
              <a
                href={site.instagramUrl}
                {...ctaAttrs("instagram", "instagram-grid")}
                className="group relative block aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 120px"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-silk)] group-hover:scale-110"
                />
                {/* ホバーでインスタのアイコンを浮かせる */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-[var(--color-ink)]/0 opacity-0 transition-all duration-500 group-hover:bg-[var(--color-ink)]/25 group-hover:opacity-100"
                >
                  <InstagramIcon className="h-5 w-5 text-white" />
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
