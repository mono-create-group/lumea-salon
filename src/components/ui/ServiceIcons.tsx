/**
 * メニュー3種の手描き風アイコン。
 * Lucideに該当形がないので線画で自作する（社内ルールで絵文字は使わない）。
 * currentColor で色を継承するので、置き場所を選ばない。
 */

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** エステ: 頬に手を添えた横顔 */
export function EstheIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <g {...stroke}>
        <path d="M20.5 6.4c-3.6-1.6-8 .2-9.6 3.7-1 2.2-.6 4.3.3 6.2.5 1 .3 1.8-.4 2.4l-1 .9c-.5.4-.4 1 .2 1.3l1.6.6c.4.2.6.5.6.9v1.5c0 1.4 1.2 2.5 2.6 2.4l2.4-.2" />
        <path d="M20.7 6.5c2.8 1.5 4.3 4.6 3.7 7.7-.4 2.2-1.7 3.9-3.4 5" />
        <path d="M14.6 13.2c.5-.5 1.3-.5 1.8 0" />
        <path d="M21 12.8c.5-.5 1.3-.5 1.8 0" />
        <path d="M17.5 19.6c1 .7 2.3.6 3.2-.2" />
      </g>
    </svg>
  );
}

/** マツエク: まつげのある閉じた目 */
export function EyelashIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <g {...stroke}>
        <path d="M6 19c3.2-4.6 6.6-6.9 10-6.9S22.8 14.4 26 19" />
        <path d="M8.6 13.6 6.4 10.7M12.2 11.3l-1.3-3.2M16 10.6V7.2M19.8 11.3l1.3-3.2M23.4 13.6l2.2-2.9" />
        <path d="M12.4 19.4c.6-2 1.9-3 3.6-3s3 1 3.6 3" />
      </g>
    </svg>
  );
}

/** ネイル: マニキュアのボトルと爪 */
export function NailIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <g {...stroke}>
        <path d="M12.4 8.2h3.4v2.1c0 .5.2 1 .6 1.3l.9.8c.5.4.8 1 .8 1.7v8.5c0 1.1-.9 2-2 2h-4.6c-1.1 0-2-.9-2-2v-8.5c0-.7.3-1.3.8-1.7l.9-.8c.4-.3.6-.8.6-1.3V8.2Z" />
        <path d="M13 5.6h2.2v2.6H13z" />
        <path d="M9.5 15.4h8.6" />
        <path d="M22.4 12.4c1.6 0 2.9 1.3 2.9 2.9v6.2c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9v-6.2c0-1.6 1.3-2.9 2.9-2.9Z" />
        <path d="M19.5 17.6h5.8" />
      </g>
    </svg>
  );
}

export const serviceIcons = {
  esthe: EstheIcon,
  eyelash: EyelashIcon,
  nail: NailIcon,
} as const;
