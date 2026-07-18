/**
 * お知らせ。category が "campaign" のものは一覧で強調して出す。
 */

export type NewsCategory = "campaign" | "info" | "blog";

export type NewsItem = {
  date: string;
  /** <time datetime=""> に入れる機械可読の日付 */
  dateTime: string;
  category: NewsCategory;
  /** 文節配列。keep-allのため<JpText>で折る */
  title: string[];
  href: string;
};

export const categoryLabel: Record<NewsCategory, string> = {
  campaign: "キャンペーン",
  info: "お知らせ",
  blog: "ブログ",
};

export const newsItems: NewsItem[] = [
  {
    date: "2026.07.15",
    dateTime: "2026-07-15",
    category: "campaign",
    title: ["初回限定・", "全メニュー20%OFF", "キャンペーンを", "実施中です"],
    href: "#blog",
  },
  {
    date: "2026.07.08",
    dateTime: "2026-07-08",
    category: "info",
    title: ["8月の", "ご予約枠を", "公開しました"],
    href: "#blog",
  },
  {
    date: "2026.06.28",
    dateTime: "2026-06-28",
    category: "blog",
    title: ["梅雨どきに", "崩れない", "肌をつくる、", "3つの習慣"],
    href: "#blog",
  },
];
