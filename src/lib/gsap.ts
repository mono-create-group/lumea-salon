"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* プラグイン登録は1回だけ。各コンポーネントはここから import する。 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  /**
   * GSAPが実際に読み込めたことを <html> に印として付ける。
   *
   * これが要:「スクロールで出す」要素を隠すのは、隠したものを必ず出せる
   * 保証があるときだけにする。CSS側は html.gsap-ready の下でしか
   * .reveal-init を透明にしないので、JSが落ちた・rAFが止まった環境では
   * 本文が最初から見えたままになる（＝文章が永久に消えない）。
   */
  document.documentElement.classList.add("gsap-ready");
}

/** 全アニメーション共通の「ゆっくり滑らかに」 */
export const EASE = "power2.out";
export const DURATION = 0.9;

export { gsap, ScrollTrigger, useGSAP };
