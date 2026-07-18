/**
 * サイト全体の基本情報。
 * 店名・電話番号・住所・予約URLを変えるときはここだけを直す。
 *
 * 【重要】Luméa は実在しない架空のサロンです。
 * 電話・住所・予約先・SNSは、実在の相手へ到達しないダミー値に固定しています。
 * 本番案件へ流用するときは下の値を実データへ差し替え、isDemo を false に
 * してください（フッター等の架空サイト表記が消えます）。
 */

/** 予約・LINE・電話の全導線をここへ集める。デモ趣旨を明示するページ */
const DEMO_CONTACT = "/contact";

export const site = {
  /** 架空サイトである旨をUIに出すかどうか */
  isDemo: true,

  name: "Luméa",
  nameJa: "ルメア",
  tagline: "beauty salon",
  description:
    "エステ・マツエク・ネイルの3つを1か所で。トータルビューティーサロン Luméa（ルメア）。完全個室・オーダーメイド施術で、あなたらしい美しさを一緒に育てます。24時間WEB予約OK。",
  url: "https://mono-create-group.github.io/lumea-salon",
  locale: "ja_JP",

  /** 実在番号へ発信させないためのダミー表記 */
  tel: "00-0000-0000",
  /** tel: リンクにはしない。押すとデモ趣旨のページへ送る */
  telHref: DEMO_CONTACT,

  address: {
    postalCode: "000-0000",
    region: "東京都",
    locality: "〇〇区",
    street: "〇〇 1-2-3 ルメアビル 2F",
    full: "東京都〇〇区〇〇 1-2-3 ルメアビル 2F",
  },

  access: "最寄駅より徒歩5分（架空の設定です）",

  hours: {
    weekday: "10:00 - 20:00",
    weekend: "10:00 - 19:00",
    closed: "毎週火曜・第2水曜",
  },

  /** 3つとも実在の予約基盤・LINE・Instagramへは飛ばさない */
  reserveUrl: DEMO_CONTACT,
  lineUrl: DEMO_CONTACT,
  instagramUrl: DEMO_CONTACT,
  instagramHandle: "@lumea_beauty",

  /**
   * フッターとcontactページに出す但し書き。
   * word-break: keep-all のため日本語は勝手に折り返さない。
   * 文節で区切って持ち、<JpText> が切れ目に <wbr> を入れる。
   */
  demoNotice: [
    "本サイトは、",
    "デザインと",
    "実装の技術を",
    "紹介するために",
    "制作した",
    "架空の",
    "サロンサイトです。",
    "店舗・",
    "電話番号・",
    "住所・",
    "予約先は",
    "すべて",
    "実在しません。",
  ],
} as const;

/**
 * ヘッダー / フッター共通のナビゲーション。
 *
 * MENU・GALLERY・ACCESS は下層ページを持つため絶対パスにする。
 * CONCEPT・BLOG はトップページ内のセクションなので "/#id" にして、
 * 下層ページから踏んでも一度トップへ戻ってからそのセクションへ着地させる
 * （下層ページで裸の "#id" を使うと、リンク先が存在せず何も起きない）。
 */
export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "CONCEPT", href: "/#concept" },
  { label: "MENU", href: "/menu" },
  { label: "GALLERY", href: "/gallery" },
  { label: "STAFF", href: "/staff" },
  { label: "ACCESS", href: "/access" },
  { label: "BLOG", href: "/#blog" },
] as const;

/** フッターの補助リンク（ナビに載せないもの） */
export const subLinks = [
  { label: "Q&A", href: "/#reason" },
  { label: "CONTACT", href: DEMO_CONTACT },
  { label: "プライバシーポリシー", href: "/privacy" },
] as const;
