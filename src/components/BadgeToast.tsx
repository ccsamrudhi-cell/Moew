"use client";

import { useEffect } from "react";

interface Props {
  message: string | null;
  onDismiss: () => void;
}

export default function BadgeToast({ message, onDismiss }: Props) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      onClick={onDismiss}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-brown-800 text-cream text-sm font-bold px-5 py-3 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4 cursor-pointer text-center max-w-[280px]"
    >
      {message}
    </div>
  );
}
