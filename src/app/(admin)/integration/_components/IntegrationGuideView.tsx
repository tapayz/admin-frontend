'use client';

import { useEffect, useMemo, useState } from "react";
import Select from "@/_components/Select/Select";
import type { SelectOption } from "@/_components/Select/types/select.types";
import { ChevronUp } from "lucide-react";

const MERMAID_SCRIPT_ID = "integration-guide-mermaid-script";
const MERMAID_CDN_SRC = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";

interface GuideContent {
  label: string;
  html?: string | null;
}

interface IntegrationGuideViewProps {
  defaultLanguage: string;
  contents: Record<string, GuideContent>;
}

type MaybeMermaidWindow = Window & {
  mermaid?: {
    initialize: (config: Record<string, unknown>) => void;
    run: (options?: Record<string, unknown>) => void;
  };
};

function loadMermaid(): Promise<MaybeMermaidWindow["mermaid"] | null> {
  if (typeof window === "undefined") return Promise.resolve(null);

  const typedWindow = window as MaybeMermaidWindow;

  if (typedWindow.mermaid) {
    return Promise.resolve(typedWindow.mermaid);
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(
      MERMAID_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        resolve((window as MaybeMermaidWindow).mermaid ?? null);
      });
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = MERMAID_SCRIPT_ID;
    script.src = MERMAID_CDN_SRC;
    script.async = true;
    script.onload = () => {
      resolve((window as MaybeMermaidWindow).mermaid ?? null);
    };
    script.onerror = reject;

    document.body.appendChild(script);
  });
}

export default function IntegrationGuideView({
  defaultLanguage,
  contents,
}: IntegrationGuideViewProps) {
  const languageOptions = useMemo<SelectOption<string>[]>(
    () =>
      Object.entries(contents).map(([value, content]) => ({
        label: content.label,
        value,
      })),
    [contents],
  );

  const [language, setLanguage] = useState<string>(defaultLanguage);
  const [isScrollButtonVisible, setScrollButtonVisible] = useState(false);

  useEffect(() => {
    setLanguage(defaultLanguage);
  }, [defaultLanguage]);

  const selectedOption = useMemo(() => {
    return (
      languageOptions.find((option) => option.value === language) ??
      languageOptions[0] ??
      null
    );
  }, [language, languageOptions]);

  const selectedContent = selectedOption
    ? contents[selectedOption.value]
    : undefined;

  useEffect(() => {
    let isCancelled = false;

    if (!selectedContent?.html) {
      return () => {
        isCancelled = true;
      };
    }

    loadMermaid()
      .then((mermaid) => {
        if (isCancelled || !mermaid) return;

        try {
          mermaid.initialize({ startOnLoad: false, theme: "neutral" });
        } catch (error) {
          // Ignore re-initialization errors that Mermaid can throw
        }

        try {
          mermaid.run({ querySelector: ".mermaid" });
        } catch (error) {
          // If Mermaid fails we silently ignore; raw diagram text will remain visible
        }
      })
      .catch(() => {
        // Ignore script loading errors; users will still see the preformatted text
      });

    return () => {
      isCancelled = true;
    };
  }, [language, selectedContent?.html]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrollButtonVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              パートナー連携ガイド
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              表示言語を選択してください。初期表示は日本語です。
            </p>
          </div>

          <div className="w-full max-w-xs">
            <label
              htmlFor="integration-language"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Language
            </label>
            <Select<SelectOption<string>>
              inputId="integration-language"
              options={languageOptions}
              value={selectedOption}
              onChange={(option) => {
                if (!option?.value) return;
                setLanguage(option.value);
              }}
              isClearable={false}
            />
          </div>
        </div>
      </section>

      {selectedContent?.html ? (
        <section
          className="rounded-3xl bg-white p-4 shadow-sm sm:p-8"
          dangerouslySetInnerHTML={{ __html: selectedContent.html }}
        />
      ) : (
        <section className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="max-w-lg text-sm text-slate-500">
            {selectedContent?.label ?? "選択した"}版のコンテンツは準備中です。
            <br />
            公開され次第こちらでご案内します。
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => {
          if (typeof window === "undefined") return;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-200 ${
          isScrollButtonVisible
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-label="ページ先頭へ移動"
      >
        <ChevronUp className="h-6 w-6" strokeWidth={2} />
      </button>
    </div>
  );
}
