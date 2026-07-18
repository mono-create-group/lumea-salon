import { JpText } from "@/components/ui/JpText";
import type { MenuItem } from "@/data/menu";

type MenuPriceTableProps = {
  items: MenuItem[];
  className?: string;
};

/**
 * 料金表。/menu と /menu/[service] の両方で使う共通部品。
 *
 * <table> ではなく <ul> にしているのは、390px幅でセルが潰れて
 * 横スクロールが出るのを避けるため。1行を「名前＋時間＋価格」の
 * flex-wrap行と、その下の一言説明の2段に分けて折り返しに強くする。
 */
export function MenuPriceTable({ items, className = "" }: MenuPriceTableProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={item.name}
          className="border-t border-[var(--color-beige-deep)]/40 py-5 first:border-t-0"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="min-w-0 text-[0.92rem] text-[var(--color-ink)]">
              {item.name}
            </h3>
            <div className="flex shrink-0 items-baseline gap-3">
              <span className="text-[0.68rem] tracking-[0.06em] text-[var(--color-ink-mute)]">
                {item.duration}
              </span>
              <span className="font-[family-name:var(--font-cormorant)] text-[1.1rem] text-[var(--color-gold-600)]">
                {item.price}
              </span>
            </div>
          </div>
          <p className="mt-1.5 min-w-0 text-[0.74rem] leading-jp text-[var(--color-ink-mute)]">
            <JpText phrases={item.note} />
          </p>
        </li>
      ))}
    </ul>
  );
}
