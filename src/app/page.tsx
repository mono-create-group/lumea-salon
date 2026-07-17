import { Header } from "@/components/layout/Header";
import { FloatingReservation } from "@/components/layout/FloatingReservation";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { SectionPair } from "@/components/layout/SectionPair";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { ReasonSection } from "@/components/sections/ReasonSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FlowSection } from "@/components/sections/FlowSection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * トップページ。
 * 並び順そのものが導線設計になっている:
 * 掴む(Hero) → 世界観(Concept) → 何ができる(Menu) → 不安を消す(Reason)
 * → 空気を見せる(Gallery) → 初回の流れ(Flow) → 生っぽさ(Instagram/News) → 背中を押す(CTA)
 *
 * 後半の4つは参考デザインどおり2つずつ左右の対にする。
 * 縦に4段積むと間延びして、紙面の密度が出ないため。
 */
export default function Home() {
  return (
    <>
      <Header />
      <FloatingReservation />

      <main id="main">
        <Hero />
        <ConceptSection />
        <ServiceSection />
        <ReasonSection />

        {/* Flow は5列のタイムラインなので、半々だと日本語が収まらない。右を広く取る */}
        <SectionPair
          ratio="right-wide"
          className="bg-gradient-to-b from-[var(--color-ivory)] to-[var(--color-blush-50)]"
        >
          <GallerySection />
          <FlowSection />
        </SectionPair>

        <SectionPair className="bg-[var(--color-blush-50)]">
          <InstagramSection />
          <NewsSection />
        </SectionPair>

        <FinalCTA />
      </main>

      <Footer />
      <MobileCTABar />
    </>
  );
}
