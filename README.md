# Luméa — beauty salon demo site

エステ・マツエク・ネイルのトータルビューティーサロン「Luméa」のデモサイトです。
Next.js App Router + TypeScript + Tailwind CSS v4 + GSAP で実装しています。

> **Luméa は実在しません。**
> デザインと実装の技術を示すために作った架空のサロンです。
> 電話・住所・予約先・SNSはすべてダミーで、実在の窓口へは繋がりません。

---

## 起動方法

```bash
npm install
npm run dev     # http://localhost:3000
```

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー |
| `npm run build` | 本番ビルド（型チェック込み） |
| `npm run start` | ビルド結果の起動 |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | 型チェックのみ |

Node は 20 以上。Next.js 16 / React 19 / Tailwind v4 を使っています。
**Tailwind v4 なので `tailwind.config.js` はありません。** 色やフォントの定義は
`src/styles/tokens.css` の `@theme` ブロックに書きます。

---

## 編集箇所

### 1. 店名・連絡先・予約先 → `src/data/site.ts`

サイト全体でここ1つだけを見ています。**実案件へ流用するときは最初にここを直します。**

| キー | 意味 |
|---|---|
| `isDemo` | `false` にすると、フッターの「架空サイトです」表記が消えます |
| `name` / `nameJa` / `tagline` | 店名まわり |
| `tel` / `telHref` | 電話。`telHref` を `tel:0312345678` にすると発信リンクになります |
| `address` / `access` / `hours` | 住所・アクセス・営業時間 |
| `reserveUrl` / `lineUrl` / `instagramUrl` | 予約基盤・公式LINE・Instagram |
| `navLinks` / `subLinks` | ヘッダーとフッターのナビ |

デモでは `reserveUrl` / `lineUrl` / `telHref` の3つを `/contact` に向けて、
実在の窓口へ繋がらないようにしています。本番URL（`https://` で始まる値）へ
差し替えると、予約ボタンは自動で別タブ開きに戻ります。

### 2. 文言・コンテンツ → `src/data/*.ts`

| ファイル | 中身 |
|---|---|
| `services.ts` | メニュー3つ（エステ / マツエク / ネイル） |
| `reasons.ts` | 選ばれる理由5つ |
| `flow.ts` | 来店の流れ5ステップ |
| `gallery.ts` | ギャラリー画像とInstagram投稿 |
| `news.ts` | お知らせ（`campaign` を選ぶと強調表示になります） |
| `staff.ts` | スタッフ紹介 |

長い日本語は、**文節ごとに区切った配列**で持ちます（`string[]`）。
理由は次の「日本語の改行」を読んでください。

すべて typed array です。配列に足せば画面が増えます。JSXは触りません。

### 3. 画像 → `public/images/`

ファイル名を変えずに差し替えれば、そのまま反映されます。

| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `hero.jpg` | ファーストビュー | 2400×1500 以上 |
| `concept.jpg` | コンセプト | 1600×1200 以上 |
| `menu-esthe/eyelash/nail.jpg` | メニュー3枚 | 各 1200×900 以上 |
| `gallery-1〜6.jpg` | ギャラリー | 短辺 1000px 以上 |
| `instagram-1〜6.jpg` | Instagram | 正方形 |
| `staff-1〜3.jpg` | スタッフ | 各 1000×1250 |
| `cta.jpg` | 最終CTA | 縦位置 |

現状はすべて Pexels の実写（CC0）を仮当てしたものです。**公開前に、権利処理済みの
高解像度素材へ差し替えてください。** 特に `staff-*.jpg` は別々の撮影のため
トーンが揃いきっていません。3枚を同じ撮影で用意するのが理想です。

### 4. 日本語の改行（ここを踏むと必ず壊れます）

このサイトは `word-break: keep-all` です。**日本語は句読点以外では自動で折り返しません。**
長い地の文をそのまま置くと、狭い画面で箱からはみ出します。

対策として、文節の切れ目に `<wbr>` を入れます。JSXなら直接、
データなら文節の配列で持ち `<JpText>` に渡します。

```tsx
// データ側（src/data/*.ts）
message: [["肌に", "触れた", "瞬間の", "温度で、", "その日の", "調子が", "わかります。"]]

// 描画側
<JpText phrases={sentence} />
```

文節の区切りは BudouX で出せます。

```bash
python3 -c "import budoux; print(' | '.join(budoux.load_default_japanese_parser().parse('折り返したい日本語')))"
```

ルール:

- `overflow-wrap: anywhere` と `word-break: auto-phrase` は**使わない**（語の途中で切れて読みにくい）
- `「」` の内側では折らない
- `<br>` はPCの改行位置を決めるだけ。スマホで消える `<br className="hidden sm:block" />` に頼ると、
  スマホで折り返せなくなる。`<wbr>` と併用する
- 文言を足したら、必ず 320px と 390px で `scrollWidth === clientWidth` を確認する

### 5. 色・フォント・余白 → `src/styles/tokens.css`

パレット（アイボリー / ブラッシュ / ローズ / ゴールド / インク）、
フォント、影、イージングの単一ソースです。`--color-rose-500` を変えれば
サイト全体のCTAの色が変わります。

フォントの読み込み自体は `src/app/layout.tsx`（`next/font/google`）にあります。

- 見出し: Shippori Mincho（明朝）
- 本文: Noto Sans JP（ゴシック）
- 英字の筆記体装飾: Parisienne
- 連番・ロゴのセリフ: Cormorant Garamond

### 6. アニメーション → `src/styles/animations.css` と各セクション

GSAP + ScrollTrigger は `src/lib/gsap.ts` に集約しています。

**重要**: JSが動かない環境でも本文が読めるように、要素を隠すのは
`html.gsap-ready` が付いたときだけです（`gsap.ts` がGSAPの読み込み成功時に付けます）。
CSSだけで先に隠すと、JSが落ちた瞬間に文字が永久に消えます。

`prefers-reduced-motion: reduce` では、花びらを消し、
スクロール連動をすべて止めて最終状態で即表示します（`globals.css` 末尾）。

---

## 構成

```
src/
├── app/
│   ├── page.tsx          トップページ（セクションの並び順＝導線設計）
│   ├── layout.tsx        フォント・metadata・OGP
│   ├── contact/          予約導線の着地点（デモ趣旨の明示）
│   ├── staff/            スタッフ紹介
│   ├── privacy/          プライバシーポリシー
│   └── globals.css       土台のスタイルのみ
├── components/
│   ├── layout/           Header, MobileMenu, Footer, FloatingReservation,
│   │                     MobileCTABar, SectionPair
│   ├── sections/         Hero, Concept, Service, Reason, Gallery, Flow,
│   │                     Instagram, News, FinalCTA
│   ├── ui/               SectionHeading, Button, Logo, Reveal, JpText,
│   │                     PetalAnimation, BrandIcons, ServiceIcons
│   └── seo/              StructuredData（BeautySalon JSON-LD）
├── data/                 コンテンツ（typed array）
├── hooks/                useReducedMotion, useScrolled
├── lib/                  gsap.ts, cta.ts
└── styles/               tokens.css, animations.css
```

CSSは1ファイルに詰めず、**トークン / アニメーション / 土台**の3つに分けています。
セクション固有の見た目は各コンポーネント側（Tailwind）に置きます。

`SectionPair` は、参考デザインどおり Gallery/Flow と Instagram/News を左右の対にする器です。
中に入るセクションは背景・上下余白・コンテナを持たず、`min-w-0` を付けます。
**`min-w-0` を外すと、日本語の min-content が大きいせいで列が縮まず、画面からはみ出します。**

---

## CTAの計測

予約・LINE・電話のボタンには計測用の属性が付いています。付与は
`src/lib/cta.ts` の `ctaAttrs()` に集約しているので、手書きしないでください。

```html
<a data-cta="reserve" data-cta-location="header" data-track="reservation">
```

| セレクタ | 拾えるもの |
|---|---|
| `[data-track="reservation"]` | 予約クリック全部 |
| `[data-track="line"]` | LINEクリック全部 |
| `[data-track="phone"]` | 電話クリック全部 |
| `[data-cta-location="float-rail"]` | 場所を絞りたいとき |

GA4なら、この属性でクリックイベントを取ります。

```js
document.querySelectorAll("[data-track]").forEach((el) => {
  el.addEventListener("click", () => {
    gtag("event", "cta_click", {
      cta: el.dataset.track,
      location: el.dataset.ctaLocation,
    });
  });
});
```

---

## デモを実案件へ転用するときの手順

1. `src/data/site.ts` の `isDemo` を `false` にする
2. `tel` / `telHref` / `address` / `reserveUrl` / `lineUrl` / `instagramUrl` を実データにする
3. `public/images/` を権利処理済みの素材へ差し替える
4. `src/data/*.ts` の文言を差し替える
5. `src/app/contact/page.tsx` を実際の予約フォームへ作り替える
6. `src/components/seo/StructuredData.tsx` の住所・営業時間を実データに合わせる
7. `npm run build` が通ることを確認する
