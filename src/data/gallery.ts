/**
 * ギャラリーとInstagram。
 * gallery の span でグリッドにリズムをつける（全部同じ大きさにしない）。
 */

export type GalleryItem = {
  src: string;
  alt: string;
  /** グリッド上の占有。参考デザインの「大1・小2・中2」の崩しを再現する */
  span: "wide" | "tall" | "normal";
};

export const galleryItems: GalleryItem[] = [
  { src: "/images/gallery-1.jpg", alt: "Luméaの施術スペース。鏡と間接照明が並ぶ", span: "wide" },
  { src: "/images/gallery-2.jpg", alt: "窓辺に飾られたドライフラワー", span: "normal" },
  { src: "/images/gallery-3.jpg", alt: "完全個室のトリートメントルーム", span: "normal" },
  { src: "/images/gallery-4.jpg", alt: "ネイル施術中の手元", span: "normal" },
  { src: "/images/gallery-5.jpg", alt: "受付に並ぶスキンケア商材", span: "wide" },
  { src: "/images/gallery-6.jpg", alt: "待合スペースに生けられた花", span: "normal" },
];

export const instagramPosts: { src: string; alt: string }[] = [
  { src: "/images/instagram-1.jpg", alt: "Instagram投稿: 今週のネイルデザイン" },
  { src: "/images/instagram-2.jpg", alt: "Instagram投稿: マツエクの仕上がり" },
  { src: "/images/instagram-3.jpg", alt: "Instagram投稿: フェイシャルケアの様子" },
  { src: "/images/instagram-4.jpg", alt: "Instagram投稿: サロンの店内" },
  { src: "/images/instagram-5.jpg", alt: "Instagram投稿: 使用しているスキンケア商材" },
  { src: "/images/instagram-6.jpg", alt: "Instagram投稿: 季節の装花" },
];
