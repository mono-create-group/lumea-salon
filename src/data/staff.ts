/**
 * スタッフ紹介3名。
 * エステ・マツエク・ネイルの3本柱それぞれに1名を対応させる。
 */

export type StaffId = "esthe" | "eyelash" | "nail";

export type StaffMember = {
  id: StaffId;
  /** 氏名（架空） */
  name: string;
  /** 役割。例: エステティシャン */
  role: string;
  /** 英字ローマ字表記（筆記体で出す） */
  en: string;
  /**
   * 自己紹介。[文][文節] の入れ子。
   * keep-all で日本語は折り返さないので、文節に割って <wbr> を入れる。
   */
  message: string[][];
  image: string;
  imageAlt: string;
};

export const staff: StaffMember[] = [
  {
    id: "esthe",
    name: "小林 花菜",
    role: "エステティシャン",
    en: "Kana Kobayashi",
    message: [
      [
        "肌に",
        "触れた",
        "瞬間の",
        "温度で、",
        "その",
        "日の",
        "調子が",
        "わかります。",
      ],
      [
        "カウンセリングでは",
        "小さな",
        "変化も",
        "聞き逃さないように",
        "しています。",
      ],
      [
        "施術後の",
        "「軽くなった」の",
        "一言が、",
        "一番の",
        "励みです。",
      ],
    ],
    image: "/images/staff/staff-01.webp",
    imageAlt: "エステティシャンの小林花菜の写真",
  },
  {
    id: "eyelash",
    name: "青木 美咲",
    role: "アイリスト",
    en: "Misaki Aoki",
    message: [
      [
        "骨格と",
        "普段の",
        "メイクを",
        "見ながら、",
        "本数と",
        "角度を",
        "1本ず",
        "つ",
        "決めています。",
      ],
      [
        "つけすぎない、",
        "でも",
        "物足りなくもしない。",
        "その",
        "中間を",
        "狙うのが",
        "好きです。",
      ],
      [
        "鏡を",
        "見た",
        "瞬間の",
        "表情が",
        "変わる",
        "仕事だと",
        "思っています。",
      ],
    ],
    image: "/images/staff/staff-02.webp",
    imageAlt: "アイリストの青木美咲の写真",
  },
  {
    id: "nail",
    name: "田村 由衣",
    role: "ネイリスト",
    en: "Yui Tamura",
    message: [
      [
        "手元は",
        "人と",
        "話す",
        "ときに",
        "一番目に",
        "入る",
        "場所だと",
        "思っています。",
      ],
      [
        "季節や",
        "気分に",
        "合わせて、",
        "毎回",
        "少しだけ新しい",
        "提案を",
        "添えます。",
      ],
      [
        "指先が",
        "変わると",
        "姿勢まで",
        "変わる、",
        "そんな",
        "瞬間を",
        "何度も",
        "見てきました。",
      ],
    ],
    image: "/images/staff/staff-03.webp",
    imageAlt: "ネイリストの田村由衣の写真",
  },
];
