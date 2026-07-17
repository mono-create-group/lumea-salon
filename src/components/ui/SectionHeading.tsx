import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** 背景に大きく薄く出す連番。例: "01" */
  number: string;
  /** 筆記体の英字ラベル。例: "Concept" */
  en: string;
  /** 日本語見出し。h2 として出る */
  children: ReactNode;
  /** 見出しの寄せ。既定は左 */
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/**
 * 全セクション共通の見出し。「01 + Concept + 日本語見出し」の3層構造。
 * 連番と英字はあくまで装飾なので、読み上げには h2 だけを渡す。
 */
export function SectionHeading({
  number,
  en,
  children,
  align = "left",
  className = "",
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={className}>
      <div
        className={`flex items-baseline gap-4 ${centered ? "justify-center" : ""}`}
      >
        <span
          aria-hidden="true"
          className="section-number text-[3.25rem] opacity-70 md:text-[4rem]"
        >
          {number}
        </span>
        <span aria-hidden="true" className="script text-2xl md:text-[1.75rem]">
          {en}
        </span>
      </div>

      <h2
        id={id}
        className={`mt-3 text-[1.6rem] leading-[1.75] text-[var(--color-ink)] md:mt-4 md:text-[2.05rem] ${
          centered ? "text-center" : ""
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
