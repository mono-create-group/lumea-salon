/**
 * ギャラリーとInstagram。
 * gallery の span でグリッドにリズムをつける（全部同じ大きさにしない）。
 * 画像は実装キット（salon-demo-kit）の公式素材。
 */

export type GalleryItem = {
  src: string;
  alt: string;
  /** グリッド上の占有。参考デザインの「大1・小2・中2」の崩しを再現する */
  span: "wide" | "tall" | "normal";
};

export const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/interior-detail.webp", alt: "アーチ窓と間接照明が並ぶLuméaの店内", span: "wide" },
  { src: "/images/gallery/flowers.webp", alt: "受付に生けられた季節の花", span: "normal" },
  { src: "/images/gallery/nail-detail.webp", alt: "淡いピンクに仕上げたネイルの手元", span: "normal" },
  { src: "/images/gallery/eyelash-detail.webp", alt: "マツエクを施した目元のクローズアップ", span: "normal" },
  { src: "/images/gallery/skincare.webp", alt: "施術に使うスキンケア商材", span: "wide" },
  { src: "/images/gallery/esthe-detail.webp", alt: "フェイシャルエステの施術風景", span: "normal" },
];

export const instagramPosts: { src: string; alt: string }[] = [
  { src: "/images/staff/staff-01.webp", alt: "Instagram投稿: スタッフの紹介" },
  { src: "/images/gallery/nail-detail.webp", alt: "Instagram投稿: 今週のネイルデザイン" },
  { src: "/images/gallery/eyelash-detail.webp", alt: "Instagram投稿: マツエクの仕上がり" },
  { src: "/images/gallery/esthe-detail.webp", alt: "Instagram投稿: フェイシャルケアの様子" },
  { src: "/images/gallery/interior-detail.webp", alt: "Instagram投稿: サロンの店内" },
  { src: "/images/gallery/flowers.webp", alt: "Instagram投稿: 季節の装花" },
];
