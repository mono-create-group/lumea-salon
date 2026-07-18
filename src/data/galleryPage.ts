import { galleryItems, type GalleryItem } from "@/data/gallery";

/**
 * /gallery ページ専用の一覧。
 * トップの galleryItems(6枚)に、コンセプト・外観・スタッフ・サービスの
 * 代表カットを足して、サイト全体の空気感が伝わる構成にする。
 * span はトップの GallerySection と同じ「大1・小2・中2」の崩し方を踏襲。
 */
export const galleryPageItems: GalleryItem[] = [
  ...galleryItems.map((item, index) => ({
    ...item,
    // トップは wide/normal 中心なので、ページ側は一部を tall にして崩す
    span: index === 3 ? ("tall" as const) : item.span,
  })),
  {
    src: "/images/concept/interior.webp",
    alt: "Luméaの店内。やわらかな照明と生花が並ぶ待合スペース",
    span: "tall",
  },
  {
    src: "/images/access/exterior.webp",
    alt: "夕暮れに灯りがともるLuméaの外観。エントランス両脇に生花が飾られている",
    span: "wide",
  },
  {
    src: "/images/staff/staff-01.webp",
    alt: "エステティシャン小林花菜のポートレート",
    span: "normal",
  },
  {
    src: "/images/services/esthe.webp",
    alt: "フェイシャルエステの施術を受ける女性",
    span: "normal",
  },
  {
    src: "/images/services/eyelash.webp",
    alt: "まつげエクステンションを施した目元のクローズアップ",
    span: "normal",
  },
  {
    src: "/images/services/nail.webp",
    alt: "淡いピンクのネイルを施した手元",
    span: "wide",
  },
];
