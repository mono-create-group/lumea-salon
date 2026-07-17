"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, EASE, DURATION } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Reveal が描画できるタグ。ref の型を保つため意図的に絞っている */
type RevealTag = "div" | "section" | "ul" | "ol" | "figure" | "header" | "p";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 描画に使うタグ。既定は div */
  as?: RevealTag;
  /** 開始を遅らせる秒数 */
  delay?: number;
  /** 直下の子要素を1つずつずらして出す（カード並びなどに使う） */
  stagger?: number;
  /** 下から出す量(px) */
  y?: number;
};

/**
 * スクロールで下からフェードアップさせる共通ラッパ。
 *
 * 初期状態は CSS(.reveal-init) が持つ。JS到達前のちらつきを防ぐためで、
 * モーション抑制時は globals.css が !important で打ち消すので、
 * ここでGSAPを動かさなくても中身は必ず見える。
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger,
  y = 28,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || reduced) return;

      if (stagger) {
        // 親はすぐ見せて、子を順番に出す
        gsap.set(root, { opacity: 1, y: 0 });
        const children = Array.from(root.children);
        gsap.set(children, { opacity: 0, y });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: DURATION,
          ease: EASE,
          delay,
          stagger,
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });
        return;
      }

      gsap.to(root, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: EASE,
        delay,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    },
    { scope, dependencies: [reduced, delay, stagger, y] },
  );

  const props = {
    ref: scope as React.RefObject<never>,
    className: `reveal-init ${className}`,
  };

  return <Tag {...props}>{children}</Tag>;
}
