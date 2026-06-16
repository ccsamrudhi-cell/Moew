"use client";

import { useState, useEffect, useCallback } from "react";

export type Badge = "herd-member" | "moo-master";

const BADGE_THRESHOLDS: Array<[number, Badge, string]> = [
  [5, "herd-member", "🏅 Badge unlocked: Certified Herd Member!"],
  [20, "moo-master", "🌟 Badge unlocked: Moo Master!"],
];

export function useTranslationTracker() {
  const [count, setCount] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("moo_translate_count");
    const savedBadges = localStorage.getItem("moo_badges");
    if (saved) setCount(parseInt(saved, 10));
    if (savedBadges) setEarnedBadges(JSON.parse(savedBadges));
  }, []);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      localStorage.setItem("moo_translate_count", String(next));

      // Check badge thresholds
      setEarnedBadges((badges) => {
        const newBadges = [...badges];
        for (const [threshold, badge, message] of BADGE_THRESHOLDS) {
          if (next === threshold && !badges.includes(badge)) {
            newBadges.push(badge);
            setTimeout(() => setToastMessage(message), 400);
          }
        }
        localStorage.setItem("moo_badges", JSON.stringify(newBadges));
        return newBadges;
      });

      return next;
    });
  }, []);

  const clearToast = useCallback(() => setToastMessage(null), []);

  return { count, earnedBadges, toastMessage, increment, clearToast };
}
