import { Fragment } from "react";

type JpTextProps = {
  /** 文節ごとに区切った日本語。区切り目が改行の候補になる */
  phrases: readonly string[];
};

/**
 * 日本語を文節単位で折り返させ、文は句点で必ず改行する。
 *
 * このサイトは word-break: keep-all なので、日本語は句読点以外では折り返さない。
 * 長い地の文をそのまま置くと、狭い画面で箱からはみ出して横スクロールが出る
 * （実際にフッターの但し書きで発生した）。
 *
 * ルール（会長指定・全ページ適用）:
 * - 文節の切れ目 → <wbr>（そこでだけ折り返せる）
 * - 「。」で終わる文節の直後 → <br>（1文ごとに改行。文の途中で流し込まない）
 * overflow-wrap: anywhere や auto-phrase は、語の途中で切れて読みにくくなるため使わない。
 */
export function JpText({ phrases }: JpTextProps) {
  const last = phrases.length - 1;
  return (
    <>
      {phrases.map((phrase, index) => (
        <Fragment key={`${index}-${phrase}`}>
          {phrase}
          {index < last ? (phrase.endsWith("。") ? <br /> : <wbr />) : null}
        </Fragment>
      ))}
    </>
  );
}
