import { site } from "@/data/site";
import { services } from "@/data/services";

/**
 * LocalBusiness / BeautySalon の構造化データ。
 * Google のローカル検索とリッチリザルト向け。
 */
export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${site.url}/#salon`,
    name: site.name,
    alternateName: site.nameJa,
    description: site.description,
    url: site.url,
    telephone: site.tel,
    image: `${site.url}/images/hero.jpg`,
    logo: `${site.url}/images/hero.jpg`,
    priceRange: "¥¥",
    currenciesAccepted: "JPY",
    paymentAccepted: "現金, クレジットカード, QRコード決済",
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressLocality: site.address.locality,
      streetAddress: site.address.street,
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.6702,
      longitude: 139.7027,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    sameAs: [site.instagramUrl],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.reserveUrl,
        inLanguage: "ja-JP",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "サロン予約" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "メニュー",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.ja}（${service.en}）`,
          description: service.lead.join(""),
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // schema は自前の静的オブジェクトなので注入リスクはない
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
