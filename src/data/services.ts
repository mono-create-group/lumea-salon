/**
 * メニュー3本柱（エステ・マツエク・ネイル）。
 * ヒーローの丸型リンクとメニューセクションの両方がこの配列を参照する。
 */

export type ServiceId = "esthe" | "eyelash" | "nail";

export type Service = {
  id: ServiceId;
  /** 英字見出し（筆記体で出す） */
  en: string;
  /** 日本語ラベル */
  ja: string;
  /** カードの短い説明。2行に収まる長さに保つ */
  lead: string[];
  /** 代表価格。メニュー一覧への期待値を作る */
  priceFrom: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const services: Service[] = [
  {
    id: "esthe",
    en: "Esthe",
    ja: "エステ",
    lead: ["肌質改善から小顔・痩身まで。", "本格ケアで理想の肌へ。"],
    priceFrom: "¥8,800〜",
    image: "/images/menu-esthe.jpg",
    imageAlt: "フェイシャルエステの施術を受ける女性",
    href: "#menu-esthe",
  },
  {
    id: "eyelash",
    en: "Eyelash",
    ja: "マツエク",
    lead: ["ナチュラルからボリュームまで。", "理想の目元をデザインします。"],
    priceFrom: "¥6,600〜",
    image: "/images/menu-eyelash.jpg",
    imageAlt: "まつげエクステンションを施した目元のクローズアップ",
    href: "#menu-eyelash",
  },
  {
    id: "nail",
    en: "Nail",
    ja: "ネイル",
    lead: ["トレンドのデザインで、", "指先から気分を上げていく。"],
    priceFrom: "¥7,700〜",
    image: "/images/menu-nail.jpg",
    imageAlt: "淡いピンクのネイルを施した手元",
    href: "#menu-nail",
  },
];
