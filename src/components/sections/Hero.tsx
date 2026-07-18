"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { services } from "@/data/services";
import { serviceIcons } from "@/components/ui/ServiceIcons";
import { PetalAnimation } from "@/components/ui/PetalAnimation";

/** navigator.connection は型定義に無いブラウザ拡張なので最小限だけ切り出す */
type ConnectionInfo = { saveData?: boolean };

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void): () => void {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** PC幅かつ省データ設定でないときだけ true。SSR/ハイドレート時は false */
function getDesktopSnapshot(): boolean {
  const connection = (navigator as Navigator & { connection?: ConnectionInfo })
    .connection;
  if (connection?.saveData) return false;
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * ファーストビュー。
 * ・画面幅いっぱいのモデル画像を、スクロールに合わせてゆっくりズームアウト
 * ・左にキャッチコピー、下に3つの丸型サービスリンク
 * 「何の店で、どう予約するか」を1画面で理解させるのが役割。
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // 髪が風に揺れるループ動画（1.6MB）。全員に配ると重いので、
  // 「PC幅 かつ モーション抑制なし かつ 省データ設定なし」のときだけ後載せする。
  // SSR/ハイドレート時は false＝静止画から始まるので、不一致も起きない。
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  );
  const showVideo = isDesktop && !reduced;

  useGSAP(
    () => {
      if (reduced) return;

      // 画像はスクロールに合わせてゆっくり引く（scrub で手動送り感を出す）
      gsap.to(".hero-media", {
        scale: 1,
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      // コピーは読み終わる前に消えないよう、退場を遅らせる
      gsap.to(".hero-copy", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "35% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 入場アニメーションはCSS(.hero-rise)が担当する。
      // ファーストビューの文字をJSで隠すと、JSが落ちた環境で
      // キャッチコピーが永久に消えるため、ここでは触らない。
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="home"
      aria-label="ファーストビュー"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-ivory)] pt-[var(--header-h)]"
    >
      {/* --- 背景画像 ---
          キット公式のヒーロー素材（1586x992）。参考デザインと同じ
          「右に人物・左はピンクのボケと花びら」の構図が最初から入っているので、
          全面 cover で敷き、object-position で人物を右に保つ。 */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-media absolute inset-0 scale-105 will-change-transform">
          <Image
            src="/images/hero/hero.webp"
            alt="ピンクの花びらが舞う光のなかで振り返る女性"
            fill
            // LCP要素。即時読み込みで最優先に取りにいく
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[68%_30%]"
          />

          {/* 静止画の上に、髪が風で揺れるループ動画を重ねる。
              読み込み中・非対象環境では下の静止画がそのまま見えるので
              「何も映らない瞬間」が発生しない。object-position は静止画と揃える */}
          {showVideo ? (
            <video
              className="hero-video absolute inset-0 h-full w-full object-cover object-[68%_30%]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={asset("/images/hero/hero-motion.mp4")} type="video/mp4" />
            </video>
          ) : null}
        </div>

        {/* 左のコピーを読ませるための薄いベール。
            素材の左側がもともと明るいので、読みやすさの底上げ程度に留める */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)]/90 via-[var(--color-ivory)]/45 to-transparent to-70% lg:from-[var(--color-ivory)]/75 lg:via-[var(--color-ivory)]/30 lg:via-35% lg:to-transparent lg:to-60%"
        />
        {/* 上下は白に溶かして、ヘッダーと次セクションへ自然につなぐ */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-ivory)] to-transparent"
        />

        {/* ふわっとした光 */}
        <div
          aria-hidden="true"
          className="glow-breathe absolute top-1/4 left-1/3 h-[46vmax] w-[46vmax] rounded-full bg-[radial-gradient(circle,rgba(255,240,238,0.85),transparent_66%)] blur-2xl"
        />
      </div>

      <PetalAnimation count={16} className="-z-10" />

      {/* --- コピー --- */}
      <div className="container-lumea">
        <div className="hero-copy max-w-xl">
          <h1 className="hero-line hero-rise text-[2.15rem] leading-[1.5] tracking-[0.04em] text-[var(--color-ink)] sm:text-[2.9rem] lg:text-[3.4rem]"
            style={{ "--rise-delay": "0.15s" } as React.CSSProperties}>
            私史上、
            <wbr />
            最高のわたしへ。
          </h1>

          <p className="hero-line hero-rise mt-7 text-[0.94rem] leading-[2.2] text-[var(--color-ink-soft)] sm:text-[1.02rem]"
            style={{ "--rise-delay": "0.32s" } as React.CSSProperties}>
            エステ・マツエク・ネイルで叶える
            <br />
            新しい自分との出会い
          </p>

          <p
            className="hero-line hero-rise script mt-4 text-[1.9rem] sm:text-[2.3rem]"
            style={{ "--rise-delay": "0.46s" } as React.CSSProperties}
            aria-hidden="true"
          >
            Be your true self
          </p>

          {/* --- 3つの丸型サービスリンク --- */}
          <nav aria-label="メニューへのショートカット" className="mt-10">
            <ul className="flex gap-3.5 sm:gap-5">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.id];
                return (
                  <li
                    key={service.id}
                    className="hero-circle hero-rise"
                    // 3つを少しずつ遅らせて出す
                    style={
                      {
                        "--rise-delay": `${0.6 + index * 0.11}s`,
                      } as React.CSSProperties
                    }
                  >
                    <Link
                      href={service.href}
                      className="group flex aspect-square w-[6.2rem] flex-col items-center justify-center rounded-full border border-white/70 bg-white/85 shadow-[var(--shadow-soft)] backdrop-blur-md transition-all duration-500 ease-[var(--ease-silk)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[var(--shadow-lift)] sm:w-[7.5rem]"
                    >
                      <Icon className="h-7 w-7 text-[var(--color-rose-400)] transition-colors duration-500 group-hover:text-[var(--color-rose-600)] sm:h-8 sm:w-8" />
                      <span className="script mt-1 text-[1.15rem] leading-none sm:text-[1.3rem]">
                        {service.en}
                      </span>
                      <span className="mt-1.5 text-[0.6rem] tracking-[0.14em] text-[var(--color-ink-mute)]">
                        {service.ja}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
