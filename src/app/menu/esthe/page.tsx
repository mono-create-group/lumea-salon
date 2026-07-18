import type { Metadata } from "next";
import { MenuDetailPage } from "@/components/sections/MenuDetailPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "エステ",
  description: `${site.name}（ルメア）のエステメニュー。フェイシャルベーシックから痩身ボディまで、料金と施術の流れをご紹介します。`,
  robots: { index: false, follow: true },
};

export default function EstheMenuPage() {
  return <MenuDetailPage serviceId="esthe" />;
}
