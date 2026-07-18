import type { ServiceId } from "@/data/services";

/**
 * メニュー3本柱（エステ・マツエク・ネイル）の料金表。
 * トップの services.priceFrom（エステ¥8,800〜/マツエク¥6,600〜/ネイル¥7,700〜）
 * と矛盾しないよう、各カテゴリの最安値を揃えてある。
 */

export type MenuItem = {
  name: string;
  /** 施術時間・本数など、コースを選ぶ判断材料になる短い一言 */
  duration: string;
  /** 税込価格。「〜」付きは変動あり */
  price: string;
  /** 一言解説。word-break: keep-all のため文節配列で持つ */
  note: string[];
};

export type MenuCategory = {
  serviceId: ServiceId;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    serviceId: "esthe",
    items: [
      {
        name: "フェイシャルベーシック",
        duration: "60分",
        price: "¥8,800",
        note: ["毛穴汚れと", "乾燥が", "気になる方の", "入り口メニューです"],
      },
      {
        name: "毛穴ディープクレンジング",
        duration: "75分",
        price: "¥11,000",
        note: ["黒ずみが", "気になる", "小鼻まわりを", "重点的に", "ケアします"],
      },
      {
        name: "小顔リフトアップ",
        duration: "80分",
        price: "¥13,200",
        note: ["頬骨まわりの", "むくみに", "手技で", "アプローチします"],
      },
      {
        name: "痩身ボディ",
        duration: "90分",
        price: "¥15,400",
        note: ["気になる", "部位を", "選んで", "集中的に", "施術します"],
      },
      {
        name: "初回トライアル",
        duration: "60分",
        price: "¥5,500",
        note: ["初めての方", "限定、", "フェイシャルの", "体験コースです"],
      },
    ],
  },
  {
    serviceId: "eyelash",
    items: [
      {
        name: "ナチュラル80本",
        duration: "90分",
        price: "¥6,600",
        note: ["初めての方に", "選ばれる", "ことが", "多い", "コースです"],
      },
      {
        name: "ボリューム120本",
        duration: "120分",
        price: "¥8,800",
        note: ["束感を", "出して", "まつ毛の", "存在感を", "強めます"],
      },
      {
        name: "フラットラッシュ100本",
        duration: "100分",
        price: "¥9,900",
        note: ["断面が", "平らな", "特殊繊維で", "軽さと", "持ちを", "両立します"],
      },
      {
        name: "まつげパーマ",
        duration: "40分",
        price: "¥6,050",
        note: ["地まつ毛の", "根元から", "カールを", "つけます"],
      },
      {
        name: "他店オフ",
        duration: "20分",
        price: "¥2,200",
        note: ["他店で", "付けた", "エクステを", "丁寧に", "取り外します"],
      },
    ],
  },
  {
    serviceId: "nail",
    items: [
      {
        name: "ワンカラー",
        duration: "60分",
        price: "¥7,700",
        note: ["定番の", "1色仕上げ、", "色選びから", "相談できます"],
      },
      {
        name: "ラメグラデーション",
        duration: "70分",
        price: "¥8,250",
        note: ["指先に", "立体感を", "出すグラデーション仕上げです"],
      },
      {
        name: "アートデザイン",
        duration: "80分〜",
        price: "¥9,900〜",
        note: ["1本ごとに", "絵柄を", "描き込むフルオーダーです"],
      },
      {
        name: "ケアコース",
        duration: "40分",
        price: "¥5,500",
        note: ["甘皮と爪表面を", "整える", "お手入れ中心の", "コースです"],
      },
      {
        name: "オフのみ",
        duration: "20分",
        price: "¥2,750",
        note: ["他店ジェルの", "除去だけを", "ご希望の方", "向けです"],
      },
    ],
  },
];

/** serviceId から料金カテゴリを引く */
export function getMenuCategory(serviceId: ServiceId): MenuCategory {
  const category = menuCategories.find((c) => c.serviceId === serviceId);
  if (!category) {
    throw new Error(`menu category not found: ${serviceId}`);
  }
  return category;
}

/** /menu ページ冒頭のリード文 */
export const menuPageLead: string[] = [
  "エステ・マツエク・ネイルの",
  "3メニューを、",
  "1つの",
  "完全個室で",
  "受けられます。",
  "価格は",
  "すべて",
  "税込表示、",
  "施術時間の",
  "目安つきです。",
];

/** /menu ページの各セクション見出し下に置く短い紹介文 */
export const menuSectionIntros: Record<ServiceId, string[]> = {
  esthe: [
    "毛穴汚れ・乾燥・たるみ、",
    "悩みの",
    "数だけコースを",
    "用意しています。",
    "60分の",
    "ベーシックから",
    "90分の",
    "痩身まで、",
    "初回トライアルを",
    "含む5コースです。",
  ],
  eyelash: [
    "本数と",
    "カールの",
    "組み合わせで、",
    "目の",
    "印象が",
    "変わります。",
    "80本の",
    "ナチュラルから",
    "120本の",
    "ボリュームまで、",
    "他店オフを",
    "含む5コースです。",
  ],
  nail: [
    "ワンカラーから",
    "アートデザインまで、",
    "爪の",
    "状態に",
    "合わせて",
    "施術します。",
    "オフのみ",
    "・ケアのみの",
    "単品予約も",
    "可能です。",
  ],
};
