import { Fragment } from "react";

type JpTextProps = {
  /** 文節ごとに区切った日本語。区切り目が改行の候補になる */
  phrases: readonly string[];
};

/**
 * 日本語を文節単位で折り返させる。
 *
 * このサイトは word-break: keep-all なので、日本語は句読点以外では折り返さない。
 * 長い地の文をそのまま置くと、狭い画面で箱からはみ出して横スクロールが出る
 * （実際にフッターの但し書きで発生した）。
 *
 * 文節の切れ目に <wbr> を入れて、そこだけで折らせる。
 * overflow-wrap: anywhere や auto-phrase は、語の途中で切れて読みにくくなるため使わない。
 */
export function JpText({ phrases }: JpTextProps) {
  return (
    <>
      {phrases.map((phrase, index) => (
        <Fragment key={`${index}-${phrase}`}>
          {index > 0 ? <wbr /> : null}
          {phrase}
        </Fragment>
      ))}
    </>
  );
}
