import type { Metadata, Viewport } from "next";
import {
  Shippori_Mincho,
  Noto_Sans_JP,
  Parisienne,
  Cormorant_Garamond,
} from "next/font/google";
import { site } from "@/data/site";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

/* 見出し: 明朝。
   日本語グリフは unicode-range で分割配信されるため、
   subsets には preload したい latin だけを指定する。 */
const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

/* 本文: ゴシック */
const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

/* 英字装飾: 筆記体（Be your true self / Concept など） */
const parisienne = Parisienne({
  variable: "--font-parisienne",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/* 英字装飾: 上品なセリフ体（01/02 の連番・ロゴ） */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const pageTitle = `${site.name}（ルメア）| 神宮前のエステ・マツエク・ネイルサロン`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pageTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "エステ",
    "マツエク",
    "まつげエクステ",
    "ネイル",
    "ビューティーサロン",
    "神宮前",
    "表参道",
    "原宿",
    "完全個室",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: pageTitle,
    description: site.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — 私史上、最高のわたしへ。`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: site.description,
    images: ["/images/hero.jpg"],
  },
  // 架空サロンのデモ。検索に載せると実在店舗と誤認されるため noindex で公開する
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fdf9f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${shippori.variable} ${notoSansJp.variable} ${parisienne.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden">
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:shadow-[var(--shadow-lift)]"
        >
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
