import type { ReactNode } from "react";

type SectionPairProps = {
  /** 左右に並べる2つのセクション */
  children: ReactNode;
  /** 帯の背景。Tailwindのクラスをそのまま渡す */
  className?: string;
  /**
   * PCでの左右の比率。既定は半々。
   * 右に5列のタイムラインが来るときなど、均等では狭すぎる場合に渡す。
   */
  ratio?: "even" | "right-wide";
};

/**
 * 2つのセクションを左右に並べる器。
 *
 * 参考デザインでは Gallery と Flow、Instagram と News が
 * それぞれ縦の罫線1本で仕切られた左右50/50の対になっている。
 * 縦に積むと間延びして、密度のある紙面の雰囲気が出ない。
 *
 * 中身のセクション側は背景・上下余白・コンテナを持たず、
 * レイアウトの責任はすべてこの器に集める。
 * スマホでは1列に落として、罫線も横線に切り替える。
 */
const ratioClass: Record<NonNullable<SectionPairProps["ratio"]>, string> = {
  even: "lg:grid-cols-2",
  "right-wide": "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]",
};

export function SectionPair({
  children,
  className = "",
  ratio = "even",
}: SectionPairProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="container-lumea py-16 md:py-24">
        <div
          className={`
            grid gap-14
            divide-y divide-[var(--color-beige-deep)]/35
            lg:gap-0 lg:divide-x lg:divide-y-0
            ${ratioClass[ratio]}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
