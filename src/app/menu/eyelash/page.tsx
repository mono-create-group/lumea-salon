import type { Metadata } from "next";
import { MenuDetailPage } from "@/components/sections/MenuDetailPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "マツエク",
  description: `${site.name}（ルメア）のマツエクメニュー。ナチュラルからボリュームまで、料金と施術の流れをご紹介します。`,
  robots: { index: false, follow: true },
};

export default function EyelashMenuPage() {
  return <MenuDetailPage serviceId="eyelash" />;
}
