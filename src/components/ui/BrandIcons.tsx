/**
 * ブランドアイコン（Instagram / LINE）。
 * lucide-react v1 はブランドアイコンを収録していないため自前で持つ。
 * 社内ルールにより絵文字は使わず、インラインSVGで描く。
 */

/** lucide のアイコンと差し替えできるよう、SVG の属性をそのまま受ける */
type IconProps = React.SVGProps<SVGSVGElement>;

/** Instagram のカメラマーク。currentColor で色を継承する */
export function InstagramIcon({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** LINE の吹き出しマーク。塗りで描くので currentColor は fill に効かせる */
export function LineIcon({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      {...props}
    >
      <path d="M12 3C6.9 3 2.8 6.4 2.8 10.6c0 3.8 3.3 6.9 7.7 7.5.3.1.7.2.8.5.1.3.1.6 0 .9l-.1.8c0 .2-.2.9.8.5s5.4-3.2 7.4-5.5c1.3-1.5 1.9-3 1.9-4.7C21.2 6.4 17.1 3 12 3ZM8.1 13.1H6.3c-.3 0-.5-.2-.5-.5V9c0-.3.2-.5.5-.5s.5.2.5.5v3.1h1.3c.3 0 .5.2.5.5s-.2.5-.5.5Zm2.1-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9c0-.3.2-.5.5-.5s.5.2.5.5v3.6Zm4.3 0c0 .2-.1.4-.4.5h-.2c-.2 0-.3-.1-.4-.2l-1.9-2.5v2.2c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9c0-.2.1-.4.4-.5h.2c.1 0 .3.1.4.2l1.9 2.6V9c0-.3.2-.5.5-.5s.5.2.5.5v3.6Zm2.9-2.3c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v.8h1.3c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5V9c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v.8h1.3Z" />
    </svg>
  );
}
