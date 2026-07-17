"use client";

import { useMemo } from "react";

type PetalAnimationProps = {
  /** 花びらの枚数。多用すると重くなるので既定は控えめ */
  count?: number;
  className?: string;
};

/**
 * 決定的な擬似乱数（0〜1）。
 * Math.sin の結果は末尾数桁がNodeとブラウザで一致しないため、
 * 小数3桁に丸めてからSSR/クライアント双方に同じ文字列を出させる。
 * ここを丸めないとハイドレート不一致になる。
 */
function seeded(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  const fraction = value - Math.floor(value);
  return Math.round(fraction * 1000) / 1000;
}

/** 文字列化した数値の桁も固定する */
function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

/**
 * 背景をゆっくり漂う花びら。
 * 純CSSアニメーション（GSAP不使用）＝メインスレッドを使わない。
 * aria-hidden + pointer-events-none で操作と読み上げの邪魔をしない。
 * モーション抑制時は globals.css 側で display:none にする。
 */
export function PetalAnimation({ count = 14, className = "" }: PetalAnimationProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${round(seeded(i, 1) * 100)}%`,
        size: `${round(10 + seeded(i, 2) * 16)}px`,
        duration: `${round(16 + seeded(i, 3) * 14)}s`,
        delay: `${round(-seeded(i, 4) * 24)}s`,
        drift: `${round((seeded(i, 5) - 0.5) * 220)}px`,
        spin: `${round(180 + seeded(i, 6) * 360)}deg`,
        opacity: `${round(0.35 + seeded(i, 7) * 0.4, 3)}`,
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* グラデーションとパスの定義は1回だけ。各花びらは <use> で参照する
          （id を花びらごとに複製すると重複IDになる） */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="lumea-petal-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbe3e1" />
            <stop offset="100%" stopColor="#eeb6b8" />
          </linearGradient>
          {/* 桜の花びら1枚。左右を非対称にして自然に見せる */}
          <path
            id="lumea-petal-shape"
            d="M12 1.5c4.6 2.4 8 6.4 8 10.7 0 5.1-3.7 9-8 10.3-4.3-1.3-8-5.2-8-10.3C4 7.9 7.4 3.9 12 1.5Z"
          />
        </defs>
      </svg>

      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal absolute top-0"
          style={
            {
              left: petal.left,
              width: petal.size,
              height: petal.size,
              "--petal-duration": petal.duration,
              "--petal-delay": petal.delay,
              "--petal-drift": petal.drift,
              "--petal-spin": petal.spin,
              "--petal-opacity": petal.opacity,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 24 24" className="h-full w-full" focusable="false">
            <use href="#lumea-petal-shape" fill="url(#lumea-petal-gradient)" />
          </svg>
        </span>
      ))}
    </div>
  );
}
