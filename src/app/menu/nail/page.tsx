import type { Metadata } from "next";
import { MenuDetailPage } from "@/components/sections/MenuDetailPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "ネイル",
  description: `${site.name}（ルメア）のネイルメニュー。ワンカラーからアートデザインまで、料金と施術の流れをご紹介します。`,
  robots: { index: false, follow: true },
};

export default function NailMenuPage() {
  return <MenuDetailPage serviceId="nail" />;
}
