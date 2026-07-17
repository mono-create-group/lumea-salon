import type { NextConfig } from "next";

/**
 * GitHub Pages（プロジェクトページ）向けの静的書き出し設定。
 * 公開URL: https://mono-create-group.github.io/lumea-salon/
 *
 * - output: "export" … サーバー不要の静的HTMLとして out/ へ書き出す
 * - basePath … プロジェクトページはサブパス配下になるため必須
 * - images.loaderFile … 静的書き出しでは next/image の最適化サーバーが無い。
 *   さらに素の unoptimized だと src に basePath が付かず画像が404になるので、
 *   basePath を前置するだけの自前ローダーを通す
 */
const basePath = "/lumea-salon";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default nextConfig;
