import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { JpText } from "@/components/ui/JpText";
import { staff } from "@/data/staff";

export const metadata: Metadata = {
  title: "スタッフ紹介",
  description: `${site.name}（ルメア）のスタッフ紹介。エステ・マツエク・ネイル、それぞれの担当がご案内します。`,
  robots: { index: false, follow: true },
};

export default function StaffPage() {
  return (
    <>
      <Header />

      <main id="main" className="pt-[var(--header-h)]">
        <div className="container-lumea py-14 md:py-20">
          <nav aria-label="パンくず" className="mb-9">
            <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] text-[var(--color-ink-mute)]">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[var(--color-rose-600)]"
                >
                  HOME
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[var(--color-ink-soft)]">
                スタッフ紹介
              </li>
            </ol>
          </nav>

          <h1 className="text-[1.5rem] text-[var(--color-ink)] md:text-[2rem]">
            スタッフ紹介
          </h1>
          <p className="script mt-2 text-[1.5rem]" aria-hidden="true">
            Staff
          </p>

          <p className="mt-8 max-w-2xl text-[0.84rem] leading-jp text-[var(--color-ink-soft)]">
            エステ・マツエク・ネイル、それぞれの担当をご紹介します。
            <br />
            カウンセリングから仕上げまで、同じ担当が一貫して対応します。
          </p>

          {/* --- スタッフカード3枚 --- */}
          <Reveal
            as="ul"
            stagger={0.14}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {staff.map((member) => (
              <li
                key={member.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white/90 shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="script text-[1.3rem] leading-none text-[var(--color-rose-600)]">
                    {member.en}
                  </span>

                  <div className="mt-3 flex items-baseline justify-between gap-2">
                    <h2 className="text-[1.05rem] text-[var(--color-ink)]">
                      {member.name}
                    </h2>
                    <span className="text-[0.68rem] tracking-[0.12em] text-[var(--color-ink-mute)]">
                      {member.role}
                    </span>
                  </div>

                  <p className="mt-4 text-[0.8rem] leading-[2] text-[var(--color-ink-soft)]">
                    {member.message.map((sentence, index) => (
                      <span key={index} className="block">
                        <JpText phrases={sentence} />
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>

          <Link
            href="/"
            className="mt-14 inline-flex items-center gap-2 rounded-full border border-[var(--color-beige-deep)]/70 bg-white/70 px-6 py-3 text-[0.76rem] tracking-[0.12em] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-rose-400)] hover:text-[var(--color-rose-600)]"
          >
            トップへ戻る
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
