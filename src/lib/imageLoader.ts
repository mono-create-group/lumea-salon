/**
 * 静的書き出し（GitHub Pages）用の画像ローダー。
 *
 * 最適化サーバーが無いので、変換はせず basePath を前置して返すだけ。
 * これが無いと next/image の src("/images/…") に basePath が付かず、
 * プロジェクトページ配下（/lumea-salon/）で全画像が404になる。
 */
export default function imageLoader({ src }: { src: string }): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // 外部URLはそのまま。サイト内の絶対パスにだけ前置する
  if (src.startsWith("http") || src.startsWith("data:")) return src;
  return `${basePath}${src}`;
}
