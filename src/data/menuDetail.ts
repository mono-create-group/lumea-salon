import type { ServiceId } from "@/data/services";

/**
 * メニュー詳細ページ（/menu/esthe, /menu/eyelash, /menu/nail）の中身。
 * 3ページは MenuDetailTemplate 1つを共有し、ここのデータだけが差分になる。
 */

export type MenuDetailFlowIcon = "counsel" | "prep" | "treatment" | "finish";

export type MenuDetailFlowStep = {
  icon: MenuDetailFlowIcon;
  step: string;
  title: string;
  /** 狭い列に収める前提の短い2行。14文字を超えないよう分けてある */
  body: string[];
};

export type MenuDetail = {
  serviceId: ServiceId;
  title: string;
  en: string;
  image: string;
  imageAlt: string;
  /** 紹介文。[文][文節] の入れ子（staff.ts と同じ形） */
  intro: string[][];
  flow: MenuDetailFlowStep[];
  /** 注意事項。1つの文節配列にまとめて JpText へ渡す */
  cautions: string[];
};

export const menuDetails: Record<ServiceId, MenuDetail> = {
  esthe: {
    serviceId: "esthe",
    title: "エステ",
    en: "Esthe",
    image: "/images/services/esthe.webp",
    imageAlt: "フェイシャルエステの施術を受ける女性",
    intro: [
      ["毛穴・乾燥・たるみ、", "肌の", "状態に", "合わせて", "機材と", "手技を", "組み合わせます。"],
      [
        "フェイシャルベーシックは",
        "毛穴と",
        "乾燥の",
        "ケアが",
        "中心、",
        "小顔リフトアップは",
        "頬骨まわりの",
        "むくみに",
        "手技で",
        "働きかけます。",
      ],
      ["初めての方は", "60分の", "初回トライアルから", "試せます。"],
    ],
    flow: [
      {
        icon: "counsel",
        step: "01",
        title: "カウンセリング",
        body: ["肌の状態と", "希望を確認"],
      },
      {
        icon: "prep",
        step: "02",
        title: "クレンジング",
        body: ["メイクと", "汚れを落とす"],
      },
      {
        icon: "treatment",
        step: "03",
        title: "施術",
        body: ["コースに応じた", "機材と手技で"],
      },
      {
        icon: "finish",
        step: "04",
        title: "仕上げ・アフターケア",
        body: ["仕上げと", "自宅ケアを説明"],
      },
    ],
    cautions: [
      "施術後6時間は",
      "激しい",
      "運動と",
      "飲酒を",
      "お控えください。",
      "肌が",
      "敏感な",
      "時期は",
      "カウンセリング時に",
      "お申し出ください。",
      "持続効果には",
      "個人差が",
      "あります。",
    ],
  },
  eyelash: {
    serviceId: "eyelash",
    title: "マツエク",
    en: "Eyelash",
    image: "/images/services/eyelash.webp",
    imageAlt: "まつげエクステンションを施した目元のクローズアップ",
    intro: [
      ["本数・カール・毛質の", "組み合わせで、", "目の", "形に", "合わせた", "デザインを", "作ります。"],
      [
        "80本の",
        "ナチュラルは",
        "初めての方に",
        "多く",
        "選ばれる",
        "コース、",
        "120本の",
        "ボリュームは",
        "まつ毛の",
        "存在感を",
        "強めたい方",
        "向けです。",
      ],
      ["他店で", "付けた", "エクステの", "オフだけの", "予約も", "受けています。"],
    ],
    flow: [
      {
        icon: "counsel",
        step: "01",
        title: "カウンセリング",
        body: ["目の形と", "デザインを相談"],
      },
      {
        icon: "prep",
        step: "02",
        title: "グルーオフ・セット",
        body: ["既存の", "エクステを除去"],
      },
      {
        icon: "treatment",
        step: "03",
        title: "装着",
        body: ["本数と", "カールを調整"],
      },
      {
        icon: "finish",
        step: "04",
        title: "仕上げチェック",
        body: ["左右の", "バランスを確認"],
      },
    ],
    cautions: [
      "施術直後6時間は",
      "洗顔と",
      "入浴、",
      "水濡れを",
      "お控えください。",
      "グルーの",
      "成分で",
      "アレルギー反応が",
      "出る",
      "ことがあります。",
      "持続期間は",
      "3〜4週間が",
      "目安です。",
    ],
  },
  nail: {
    serviceId: "nail",
    title: "ネイル",
    en: "Nail",
    image: "/images/services/nail.webp",
    imageAlt: "淡いピンクのネイルを施した手元",
    intro: [
      [
        "ワンカラーから",
        "アートデザインまで、",
        "爪の",
        "状態を",
        "見ながら長さと",
        "形を",
        "整えたうえで",
        "施術します。",
      ],
      [
        "ラメグラデーションは",
        "指先に",
        "立体感を",
        "出したい方に、",
        "アートデザインは",
        "1本ごとに",
        "絵柄を",
        "描き込むコースです。",
      ],
      ["オフのみ、", "ケアのみの", "単品予約も", "できます。"],
    ],
    flow: [
      {
        icon: "counsel",
        step: "01",
        title: "カウンセリング",
        body: ["長さや形、", "デザインを相談"],
      },
      {
        icon: "prep",
        step: "02",
        title: "甘皮・爪先ケア",
        body: ["甘皮と", "爪先を整える"],
      },
      {
        icon: "treatment",
        step: "03",
        title: "カラー・アート",
        body: ["デザインを", "施術"],
      },
      {
        icon: "finish",
        step: "04",
        title: "トップコート",
        body: ["仕上げと", "持ちを説明"],
      },
    ],
    cautions: [
      "ジェルが",
      "完全硬化するまで",
      "高温の",
      "お湯を",
      "避けてください。",
      "爪や",
      "皮膚に",
      "異常を",
      "感じたら",
      "施術を",
      "中止し",
      "医師に",
      "ご相談ください。",
      "持続期間は",
      "2〜4週間が",
      "目安です。",
    ],
  },
};
