import fs from "node:fs";
import path from "node:path";

import IntegrationGuideView from "./_components/IntegrationGuideView";

const GUIDE_CONFIG = {
  ja: {
    label: "日本語",
    path: "public/assets/docs/partner_integration_guide_original_ja.html",
  },
  ko: {
    label: "한국어",
    path: "public/assets/docs/partner_integration_guide_ko.html",
  },
  en: {
    label: "English",
    path: "public/assets/docs/partner_integration_guide_en.html",
  },
} as const;

type GuideLanguage = keyof typeof GUIDE_CONFIG;

type GuideContent = {
  label: string;
  html: string;
};

function loadGuideHtml(relativePath: string): string {
  const absolutePath = path.join(process.cwd(), relativePath);

  try {
    const rawHtml = fs.readFileSync(absolutePath, "utf-8");
    const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : rawHtml;

    return bodyContent
      .replace(
        /<button[^>]*id=["']scrollToTopBtn["'][\s\S]*?<\/button>/i,
        "",
      )
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .trim();
  } catch (error) {
    return "<div class=\"text-red-500\">Failed to load integration guide.</div>";
  }
}

function buildGuideContents(): Record<GuideLanguage, GuideContent> {
  return Object.entries(GUIDE_CONFIG).reduce<Record<GuideLanguage, GuideContent>>(
    (acc, [language, config]) => {
      acc[language as GuideLanguage] = {
        label: config.label,
        html: loadGuideHtml(config.path),
      };

      return acc;
    },
    {} as Record<GuideLanguage, GuideContent>,
  );
}

export default function IntegrationPage() {
  const contents = buildGuideContents();

  return (
    <IntegrationGuideView
      defaultLanguage="ja"
      contents={contents}
    />
  );
}
