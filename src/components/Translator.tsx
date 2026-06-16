"use client";

import { useState, useRef, useCallback } from "react";
import { translateMooToHuman, translateHumanToMoo } from "@/lib/translator";
import Confetti from "./Confetti";

interface Props {
  onTranslateSuccess: () => void;
  prefillMoo?: string;
}

type Tab = "moo-to-human" | "human-to-moo";

export default function Translator({ onTranslateSuccess, prefillMoo }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("moo-to-human");
  const [input, setInput] = useState(prefillMoo ?? "");
  const [result, setResult] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleTranslate = useCallback(() => {
    if (!input.trim()) return;

    const res =
      activeTab === "moo-to-human"
        ? translateMooToHuman(input)
        : translateHumanToMoo(input);

    if (res.found) {
      setResult(res.result);
      setIsEasterEgg(res.isEasterEgg ?? false);
      setNotFound(false);
      if (!res.isEasterEgg) {
        setShowConfetti(true);
        clearTimeout(confettiTimeout.current);
        confettiTimeout.current = setTimeout(() => setShowConfetti(false), 2500);
      }
      onTranslateSuccess();
    } else {
      setResult(null);
      setNotFound(true);
      setIsEasterEgg(false);
    }
  }, [input, activeTab, onTranslateSuccess]);

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setInput("");
    setResult(null);
    setNotFound(false);
    setIsEasterEgg(false);
  };

  return (
    <section id="translator" className="px-5 py-8">
      <h2 className="text-center text-xl font-bold text-brown-700 mb-5">
        🔤 Moo Translator
      </h2>

      {/* Tabs */}
      <div className="flex bg-beige rounded-2xl p-1 mb-5">
        {(["moo-to-human", "human-to-moo"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === tab
                ? "bg-farm-green text-cream shadow-sm"
                : "text-brown-500 hover:text-brown-700"
            }`}
          >
            {tab === "moo-to-human" ? "🐄 Moo → Human" : "🧑 Human → Moo"}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="bg-white border border-brown-200 rounded-2xl p-4 shadow-sm relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleTranslate()}
          placeholder={
            activeTab === "moo-to-human"
              ? "Paste your mysterious moo here..."
              : "Type your message..."
          }
          rows={3}
          className="w-full bg-transparent border border-brown-200 rounded-xl px-3 py-2.5 text-base text-brown-900 resize-none font-sans placeholder:text-brown-400 focus:outline-none focus:border-farm-green"
        />

        <button
          onClick={handleTranslate}
          className="w-full mt-3 bg-brown-700 hover:bg-brown-600 text-cream font-bold py-3 rounded-xl text-base tracking-wide transition-colors"
        >
          ✨ Translate
        </button>

        {/* Result area */}
        <div className="relative mt-3 min-h-[60px]">
          {showConfetti && <Confetti />}

          {result && !notFound && (
            <div
              className={`bg-beige rounded-xl p-3 text-center font-semibold text-brown-700 text-base leading-relaxed ${
                isEasterEgg ? "animate-pulse border-2 border-beige-dark" : ""
              }`}
            >
              {result}
            </div>
          )}

          {notFound && (
            <div className="bg-beige rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🐄</div>
              <p className="text-sm text-brown-500 mb-3">
                Hmm... even our cows don&apos;t know this one yet
              </p>
              <a
                href="#suggest"
                className="inline-block bg-farm-green text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                Suggest a New Moo
              </a>
            </div>
          )}

          {!result && !notFound && (
            <div className="bg-beige rounded-xl p-3 text-center text-sm text-brown-400">
              Translation appears here...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
