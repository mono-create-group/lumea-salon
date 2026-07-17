/**
 * 来店の流れ5ステップ。「初めてでも大丈夫」と思ってもらうのが目的。
 *
 * body は横並び5列の狭い枠に入る。日本語は keep-all で折り返さないため、
 * 1行10文字前後を上限にして、はみ出さない長さで書く。
 */

export type FlowIcon = "reserve" | "counsel" | "treatment" | "finish" | "next";

export type FlowStep = {
  icon: FlowIcon;
  step: string;
  title: string;
  body: string[];
};

export const flowSteps: FlowStep[] = [
  {
    icon: "reserve",
    step: "01",
    title: "ご予約",
    body: ["WEB・LINE・電話で", "24時間受付"],
  },
  {
    icon: "counsel",
    step: "02",
    title: "カウンセリング",
    body: ["お悩みと希望を", "30分かけて確認"],
  },
  {
    icon: "treatment",
    step: "03",
    title: "施術",
    body: ["完全個室で", "あなた専用の施術"],
  },
  {
    icon: "finish",
    step: "04",
    title: "仕上げ・アドバイス",
    body: ["美しさを保つコツ", "おうちケアも"],
  },
  {
    icon: "next",
    step: "05",
    title: "次回のご提案",
    body: ["次に来る時期を", "無理なくご提案"],
  },
];
