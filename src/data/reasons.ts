/**
 * 「選ばれる理由」5点。不安の解消が目的なので、実感に落ちる言葉で書く。
 * icon はコンポーネント側で Lucide のコンポーネントに割り当てる。
 */

export type ReasonIcon = "room" | "product" | "custom" | "space" | "aftercare";

export type Reason = {
  icon: ReasonIcon;
  /** 見出し。改行位置を制御したいので配列で持つ */
  title: string[];
  body: string[];
};

export const reasons: Reason[] = [
  {
    icon: "room",
    title: ["完全個室の", "プライベート空間"],
    body: ["まわりの目を気にせず、", "あなただけの時間に集中できます。"],
  },
  {
    icon: "product",
    title: ["高品質な商材と", "確かな技術"],
    body: ["厳選した商材を、経験を重ねた", "スタッフだけが扱います。"],
  },
  {
    icon: "custom",
    title: ["一人ひとりに合わせた", "オーダーメイド施術"],
    body: ["はじめに30分のカウンセリング。", "その日の肌と気分から組み立てます。"],
  },
  {
    icon: "space",
    title: ["リラックスできる", "上質な空間"],
    body: ["香り・照明・音まで整えました。", "眠ってしまう方もいます。"],
  },
  {
    icon: "aftercare",
    title: ["安心の", "アフターケア"],
    body: ["帰ったあとの過ごし方まで。", "LINEでいつでも相談できます。"],
  },
];
