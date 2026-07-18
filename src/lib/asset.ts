/**
 * public/ 配下の静的ファイルへの basePath 前置。
 *
 * next/image は imageLoader.ts が面倒を見るが、<video> や <source> の
 * src には何も付かないため、プロジェクトページ配下（/lumea-salon/）で
 * 素の絶対パスを書くと404になる。動画・音声などはこれを通す。
 */
export function asset(src: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("http") || src.startsWith("data:")) return src;
  return `${basePath}${src}`;
}
