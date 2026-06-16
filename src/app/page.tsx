"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Translator from "@/components/Translator";
import MooDictionary from "@/components/MooDictionary";
import SuggestMoo from "@/components/SuggestMoo";
import ShareSection from "@/components/ShareSection";
import AboutSection from "@/components/AboutSection";
import BadgeToast from "@/components/BadgeToast";
import { useTranslationTracker } from "@/lib/useTranslationTracker";

export default function HomePage() {
  const [prefillMoo, setPrefillMoo] = useState<string | undefined>();
  const { count, toastMessage, increment, clearToast } = useTranslationTracker();

  const handleUsePhraseInTranslator = useCallback((moo: string) => {
    setPrefillMoo(moo);
    setTimeout(() => {
      document.getElementById("translator")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />

      {/* Translation counter badge */}
      {count > 0 && (
        <div className="text-center pt-4 pb-0">
          <span className="inline-flex items-center gap-1.5 bg-beige text-brown-700 text-xs font-bold px-3 py-1.5 rounded-full">
            🐄 {count} moo{count !== 1 ? "s" : ""} translated
          </span>
        </div>
      )}

      <Translator
        onTranslateSuccess={increment}
        prefillMoo={prefillMoo}
      />

      <MooDictionary onUsePhraseInTranslator={handleUsePhraseInTranslator} />

      <SuggestMoo />

      <ShareSection />

      <AboutSection />

      <BadgeToast message={toastMessage} onDismiss={clearToast} />
    </main>
  );
}
