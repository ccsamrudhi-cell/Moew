"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-farm-green px-5 py-10 text-center overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #FFF9F0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Animated cow */}
      <div className="relative z-10">
        <span
          className="text-6xl block mb-3 leading-none"
          style={{ animation: "cowBlink 4s infinite" }}
        >
          🐄
        </span>

        <style>{`
          @keyframes cowBlink {
            0%, 45%, 55%, 100% { opacity: 1; transform: scale(1); }
            48%, 52% { opacity: 0.2; }
            50% { transform: scale(1.05); }
          }
          @keyframes tailWag {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
        `}</style>

        <h1 className="text-2xl font-bold text-cream leading-snug mb-2">
          Ever wondered what<br />our cows are saying?
        </h1>
        <p className="text-sm text-cream/80 mb-6 leading-relaxed">
          Decode the secret Moo Language used by<br />
          <span className="font-semibold text-cream">Two Brothers Organic Farms</span>
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="#translator"
            className="bg-beige text-brown-700 font-bold text-sm px-6 py-2.5 rounded-full hover:bg-beige-dark transition-colors"
          >
            🔤 Translate a Moo
          </a>
          <a
            href="#dictionary"
            className="border-[1.5px] border-cream/50 text-cream font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cream/10 transition-colors"
          >
            📖 Browse the Moo Dictionary
          </a>
        </div>
      </div>
    </section>
  );
}
