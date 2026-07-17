import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JpText } from "@/components/ui/JpText";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${site.name}（ルメア）における個人情報の取り扱いについて。`,
  robots: { index: false, follow: true },
};

const sections = [
  {
    title: "1. 取得する情報",
    body: [
      "ご予約・",
      "お問い",
      "合わせの",
      "際に、",
      "お名前、",
      "電話番号、",
      "メールアドレス、",
      "ご希望の",
      "メニューを",
      "お伺いします。",
      "施術に",
      "あたり、",
      "肌や",
      "お身体の",
      "状態を",
      "必要な",
      "範囲で",
      "お伺い",
      "する",
      "ことがあります。",
    ],
  },
  {
    title: "2. 利用目的",
    body: [
      "ご予約の",
      "確認、",
      "施術の",
      "ご提案、",
      "アフターケアの",
      "ご連絡に",
      "使います。",
      "ご本人の",
      "同意なく、",
      "これ以外の",
      "目的には",
      "使いません。",
    ],
  },
  {
    title: "3. 第三者への提供",
    body: [
      "法令に",
      "基づく",
      "場合を",
      "除き、",
      "お客様の",
      "情報を",
      "第三者へ",
      "提供する",
      "ことは",
      "ありません。",
    ],
  },
  {
    title: "4. 管理",
    body: [
      "取得した",
      "情報は",
      "施錠された",
      "場所および",
      "権限を",
      "制限した",
      "システムで",
      "管理し、",
      "漏えい・滅失の",
      "防止に",
      "努めます。",
      "保管の",
      "必要が",
      "なくなった",
      "情報は",
      "速やかに",
      "廃棄します。",
    ],
  },
  {
    title: "5. 開示・訂正・削除",
    body: [
      "お客様",
      "ご本人からの",
      "お申し出が",
      "あった",
      "場合、",
      "内容を",
      "確認の",
      "うえ、",
      "速やかに",
      "開示・訂正・削除に",
      "対応します。",
      `お電話（${site.tel}）で`,
      "承ります。",
    ],
  },
  {
    title: "6. お問い合わせ窓口",
    body: [
      site.name,
      `　${site.address.region}${site.address.locality}`,
      site.address.street,
      `　電話 ${site.tel}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main id="main" className="pt-[var(--header-h)]">
        <div className="container-lumea py-14 md:py-20">
          {/* パンくず。下層ページなので現在地を明示する */}
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
                プライバシーポリシー
              </li>
            </ol>
          </nav>

          <h1 className="text-[1.5rem] text-[var(--color-ink)] md:text-[2rem]">
            プライバシーポリシー
          </h1>
          <p className="script mt-2 text-[1.5rem]" aria-hidden="true">
            Privacy Policy
          </p>

          <p className="mt-8 max-w-2xl text-[0.84rem] leading-jp text-[var(--color-ink-soft)]">
            {site.name}
            は、お客様からお預かりする個人情報を、以下のとおり取り扱います。
          </p>

          <div className="mt-10 max-w-2xl">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-t border-[var(--color-beige-deep)]/40 py-7"
              >
                <h2 className="text-[1rem] text-[var(--color-ink)]">
                  {section.title}
                </h2>
                <p className="mt-3 text-[0.82rem] leading-jp text-[var(--color-ink-soft)]">
                  <JpText phrases={section.body} />
                </p>
              </section>
            ))}
          </div>

          <p className="mt-8 text-[0.7rem] text-[var(--color-ink-mute)]">
            制定日: 2026年7月1日
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
