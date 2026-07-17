"use client";

import { useMemo } from "react";
import Image from "next/image";

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

/** 実装キット付属の透過花びら4種。i % 4 で巡回させて自然なばらつきを出す */
const PETAL_SOURCES = [
  "/images/petals/petal-01.webp",
  "/images/petals/petal-02.webp",
  "/images/petals/petal-03.webp",
  "/images/petals/petal-04.webp",
];

/**
 * 背景をゆっくり漂う花びら。
 * 実写調の透過WebP（キット素材・各2〜3KB）を純CSSアニメーションで流す。
 * aria-hidden + pointer-events-none で操作と読み上げの邪魔をしない。
 * モーション抑制時は globals.css 側で display:none にする。
 */
export function PetalAnimation({ count = 14, className = "" }: PetalAnimationProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        src: PETAL_SOURCES[i % PETAL_SOURCES.length],
        left: `${round(seeded(i, 1) * 100)}%`,
        size: Math.round(14 + seeded(i, 2) * 24),
        duration: `${round(16 + seeded(i, 3) * 14)}s`,
        delay: `${round(-seeded(i, 4) * 24)}s`,
        drift: `${round((seeded(i, 5) - 0.5) * 220)}px`,
        spin: `${round(180 + seeded(i, 6) * 360)}deg`,
        opacity: `${round(0.4 + seeded(i, 7) * 0.45, 3)}`,
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal absolute top-0"
          style={
            {
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              "--petal-duration": petal.duration,
              "--petal-delay": petal.delay,
              "--petal-drift": petal.drift,
              "--petal-spin": petal.spin,
              "--petal-opacity": petal.opacity,
            } as React.CSSProperties
          }
        >
          <Image
            src={petal.src}
            alt=""
            width={petal.size}
            height={petal.size}
            className="h-full w-full"
          />
        </span>
      ))}
    </div>
  );
}
