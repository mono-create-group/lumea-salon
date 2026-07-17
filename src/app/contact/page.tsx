import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JpText } from "@/components/ui/JpText";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "ご予約・お問い合わせ",
  description: `${site.name}（ルメア）のご予約・お問い合わせ窓口。`,
  robots: { index: false, follow: true },
};

/** 本番案件ではここが実際の予約フォーム / 予約基盤への導線になる */
const routes = [
  {
    label: "WEB予約",
    body: [
      "24時間受付。",
      "メニューと",
      "日時を",
      "選んで、",
      "その場で",
      "予約が",
      "確定します。",
    ],
    note: [
      "本番では",
      "予約基盤",
      "（サロンボード等）",
      "へ",
      "接続します",
    ],
  },
  {
    label: "LINE予約",
    body: [
      "友だち追加の",
      "うえトークで",
      "相談。",
      "迷っている",
      "段階の",
      "質問も",
      "ここで",
      "受けます。",
    ],
    note: [
      "本番では",
      "公式LINEの",
      "友だち追加URLへ",
      "接続します",
    ],
  },
  {
    label: "電話",
    body: [
      "当日の",
      "空き確認や、",
      "細かい",
      "相談は",
      "お電話が",
      "早いこともあります。",
    ],
    note: [
      "本番では",
      "店舗の",
      "電話番号へ",
      "接続します",
    ],
  },
];

/**
 * 予約・LINE・電話の全導線の着地点。
 *
 * Luméa は架空のサロンなので、実在の予約基盤・LINE・電話番号へは繋がない。
 * ここで「デモである」と明示してから、本番で何に繋ぐのかを示す。
 */
export default function ContactPage() {
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
                ご予約・お問い合わせ
              </li>
            </ol>
          </nav>

          <h1 className="text-[1.5rem] text-[var(--color-ink)] md:text-[2rem]">
            ご予約・お問い合わせ
          </h1>
          <p className="script mt-2 text-[1.5rem]" aria-hidden="true">
            Contact
          </p>

          {/* デモ趣旨の明示。予約を押した人が最初に読む位置に置く */}
          <div
            role="note"
            className="mt-9 max-w-2xl rounded-2xl border border-[var(--color-rose-300)]/70 bg-[var(--color-blush-50)] px-6 py-6"
          >
            <p className="text-[0.92rem] text-[var(--color-ink)]">
              これは
              <wbr />
              ポートフォリオ用の
              <wbr />
              デモサイトです
            </p>
            <p className="mt-3 text-[0.82rem] leading-jp text-[var(--color-ink-soft)]">
              <JpText phrases={site.demoNotice} />
              <JpText
                phrases={[
                  "ご予約・",
                  "LINE・",
                  "お電話のボタンは、",
                  "実在の窓口へは",
                  "繋がらず",
                  "このページへ",
                  "戻ってきます。",
                ]}
              />
            </p>
          </div>

          <h2 className="mt-14 text-[1.1rem] text-[var(--color-ink)]">
            本番案件では、3つの導線をこう繋ぎます
          </h2>

          <ul className="mt-6 max-w-2xl">
            {routes.map((route) => (
              <li
                key={route.label}
                className="border-t border-[var(--color-beige-deep)]/40 py-6"
              >
                <p className="text-[0.95rem] text-[var(--color-ink)]">
                  {route.label}
                </p>
                <p className="mt-2 text-[0.82rem] leading-jp text-[var(--color-ink-soft)]">
                  <JpText phrases={route.body} />
                </p>
                <p className="mt-2 text-[0.72rem] text-[var(--color-ink-mute)]">
                  <JpText phrases={route.note} />
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-[0.8rem] leading-jp text-[var(--color-ink-soft)]">
            接続先は
            <wbr />
            <code className="mx-1 rounded bg-[var(--color-beige)]/50 px-1.5 py-0.5 text-[0.76rem]">
              src/data/site.ts
            </code>
            <wbr />
            の
            <code className="mx-1 rounded bg-[var(--color-beige)]/50 px-1.5 py-0.5 text-[0.76rem]">
              reserveUrl
            </code>
            <wbr />/
            <code className="mx-1 rounded bg-[var(--color-beige)]/50 px-1.5 py-0.5 text-[0.76rem]">
              lineUrl
            </code>
            <wbr />/
            <code className="mx-1 rounded bg-[var(--color-beige)]/50 px-1.5 py-0.5 text-[0.76rem]">
              telHref
            </code>
            <wbr />
            の3つを
            <wbr />
            差し替えるだけで、
            <wbr />
            サイト全体の
            <wbr />
            ボタンが
            <wbr />
            一斉に
            <wbr />
            切り替わります。
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-beige-deep)]/70 bg-white/70 px-6 py-3 text-[0.76rem] tracking-[0.12em] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-rose-400)] hover:text-[var(--color-rose-600)]"
          >
            トップへ戻る
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
