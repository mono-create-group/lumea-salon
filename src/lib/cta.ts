/**
 * CTAの計測属性を作る唯一の場所。
 *
 * 2種類の属性を同時に載せている:
 *  - data-cta / data-cta-location … どのCTAが、どの場所で押されたかまで採る用
 *  - data-track                   … 実装キットが規定する語彙（reservation|line|phone）
 *
 * 語彙が2つあるのは、計測基盤側がどちらのセレクタで拾いに来ても
 * 取りこぼさないようにするため。手書きせず必ずこの関数を通す。
 */

export type CtaAction = "reserve" | "line" | "tel" | "instagram" | "nav";

/** data-track はキット規定の3種だけ。nav や instagram には付けない */
const trackNames: Partial<Record<CtaAction, string>> = {
  reserve: "reservation",
  line: "line",
  tel: "phone",
};

export type CtaAttrs = {
  "data-cta"?: CtaAction;
  "data-cta-location"?: string;
  "data-track"?: string;
};

export function ctaAttrs(action?: CtaAction, location?: string): CtaAttrs {
  if (!action) return {};

  const track = trackNames[action];

  return {
    "data-cta": action,
    "data-cta-location": location,
    ...(track ? { "data-track": track } : {}),
  };
}
