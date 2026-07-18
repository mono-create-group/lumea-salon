#!/usr/bin/env python3
"""折り返せない日本語の塊を「ビルド後HTML」から検出する品質ゲート。

背景: このサイトは word-break:keep-all のため、<wbr> か 句読点(、。！？)が
無い日本語は1かたまりでしか折り返せない。長い塊は狭い画面で必ずはみ出す。
ソース側の監査は「」等でかたまりが途切れて見逃すため（実際に最終CTAで事故）、
実際に描画される out/**/*.html を対象にする。<wbr> はタグとしてテキストを
分断するので、タグ間のテキストをそのまま測ればよい。

使い方: python3 scripts/jp_runcheck.py out
1件でも違反があれば exit 1（ビルドゲートとして使う）。
"""
import glob
import re
import sys

# 何文字つながったら違反とするか。
# 実害ライン: 見出み(モバイル最大28px)×16文字 ≒ 450px で 390px 画面が破綻する。
# 本文サイズ(13-15px)の16文字は約240pxで収まるが、余白次第で危ないため
# 16 を下限のゲートとする（12-15文字は要注意だが機械ゲートでは止めない）。
LIMIT = 16

TAG = re.compile(r"<[^>]+>")
# 折り返し機会になる文字で分割（句読点の後では折り返せる）
BREAKABLE = re.compile(r"[、。！？!?\s]")
# 日本語を含む判定
HAS_JP = re.compile(r"[ぁ-ヿ一-鿿]")


def check(path: str) -> list[str]:
    html = open(path, encoding="utf-8").read()
    # script/style の中身は描画されない
    html = re.sub(r"<head\b.*?</head>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<script\b.*?</script>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<style\b.*?</style>", " ", html, flags=re.S | re.I)

    out = []
    # タグでテキストノードに分割（<wbr>もここで塊を切る）
    for text in TAG.split(html):
        for run in BREAKABLE.split(text):
            run = run.strip()
            # 電話番号など記号・数字主体の塊は折り返し機会(ハイフン等)が
            # あるので対象外。日本語が6文字以上つながるものだけ見る
            if len(run) >= LIMIT and len(HAS_JP.findall(run)) >= 6:
                out.append(run)
    return out


def main() -> int:
    base = sys.argv[1] if len(sys.argv) > 1 else "out"
    files = sorted(glob.glob(f"{base}/**/*.html", recursive=True))
    if not files:
        print(f"NG: {base} にHTMLがありません（先に npm run build）")
        return 1

    bad = 0
    for f in files:
        for run in check(f):
            print(f"NG {f}: 「{run}」({len(run)}文字・<wbr>なし)")
            bad += 1
    if bad:
        print(f"\n違反 {bad} 件。文節に <wbr> を入れるか <JpText> を使ってください。")
        return 1
    print(f"OK: {len(files)}ファイル、折り返し不能な長い日本語なし")
    return 0


if __name__ == "__main__":
    sys.exit(main())
