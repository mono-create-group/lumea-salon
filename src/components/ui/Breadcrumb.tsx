import { Fragment } from "react";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  /** 省略すると現在地(aria-current="page")として表示する */
  href?: string;
};

/**
 * 下層ページ共通のパンくず。
 * staff / contact / privacy ページの元々の markup をそのまま部品化したもの。
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくず" className="mb-9">
      <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] text-[var(--color-ink-mute)]">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 ? <li aria-hidden="true">/</li> : null}
            <li
              aria-current={item.href ? undefined : "page"}
              className={item.href ? undefined : "text-[var(--color-ink-soft)]"}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--color-rose-600)]"
                >
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
