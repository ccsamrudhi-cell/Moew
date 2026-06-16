"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard
      .writeText(siteConfig.url)
      .catch(() => {
        // fallback for older browsers
      });
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `🐄 Ever wonder what cows are saying? Decode Two Brothers Organic Farms' secret Moo Language! ${siteConfig.url}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
  };

  const shareInstagram = () => {
    copyLink();
    // Instagram doesn't support web share — user copies link and pastes in story
  };

  return (
    <section className="px-5 py-8 bg-beige text-center">
      <h2 className="text-xl font-bold text-brown-700 mb-1">
        📣 Share the Moo
      </h2>
      <p className="text-sm text-brown-500 mb-5">
        Show your friends the secret herd language
      </p>

      <div className="flex gap-2.5 justify-center flex-wrap">
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-4 py-2.5 border border-brown-200 bg-white rounded-full text-sm font-semibold text-brown-700 hover:bg-cream transition-colors"
        >
          💬 WhatsApp
        </button>
        <button
          onClick={shareInstagram}
          className="flex items-center gap-2 px-4 py-2.5 border border-brown-200 bg-white rounded-full text-sm font-semibold text-brown-700 hover:bg-cream transition-colors"
        >
          📸 Instagram
        </button>
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-4 py-2.5 border border-brown-200 bg-white rounded-full text-sm font-semibold text-brown-700 hover:bg-cream transition-colors"
        >
          🔗 Copy Link
        </button>
      </div>

      {copied && (
        <p className="text-xs text-farm-green font-semibold mt-3">
          Link copied! Spread the moo 🐄
        </p>
      )}
    </section>
  );
}
