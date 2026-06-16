"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#6B4F3A", "#4E6B45", "#EADDC8", "#C8A87A", "#8B6F5A", "#A8C89A"];

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const piece = document.createElement("div");
      const color = COLORS[i % COLORS.length];
      const delay = Math.random() * 0.4;
      const duration = 0.8 + Math.random() * 0.6;
      const xOffset = Math.random() * 240 - 120;

      piece.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 2px;
        background: ${color};
        left: calc(50% + ${xOffset}px);
        top: -10px;
        transform: rotate(${Math.random() * 360}deg);
        animation: confettiFall ${duration}s ease-out ${delay}s forwards;
        pointer-events: none;
      `;
      container.appendChild(piece);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(70px) rotate(360deg); opacity: 0; }
        }
      `}</style>
      <div ref={containerRef} className="absolute inset-x-0 top-0 overflow-hidden h-20 pointer-events-none z-10" />
    </>
  );
}
