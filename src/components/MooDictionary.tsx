"use client";

import { useState, useMemo } from "react";
import { dictionary } from "@/lib/translator";

interface Props {
  onUsePhraseInTranslator?: (moo: string) => void;
}

export default function MooDictionary({ onUsePhraseInTranslator }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return dictionary;
    return dictionary.filter(
      (e) =>
        e.moo.toLowerCase().includes(q) || e.human.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <section id="dictionary" className="px-5 py-8 bg-beige-light">
      <h2 className="text-center text-xl font-bold text-brown-700 mb-5">
        📖 Moo Dictionary
      </h2>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400">🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a moo phrase or meaning..."
          className="w-full pl-9 pr-3 py-2.5 border border-brown-200 rounded-xl bg-white text-sm text-brown-900 placeholder:text-brown-400 focus:outline-none focus:border-farm-green"
        />
      </div>

      {/* Results count */}
      <p className="text-xs text-brown-400 text-center mb-4">
        {filtered.length} phrase{filtered.length !== 1 ? "s" : ""} in the herd
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 text-brown-400 text-sm">
          🐄 No moos found for that search. Try something else!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 max-h-[420px] overflow-y-auto pr-1">
          {filtered.map((entry) => (
            <div
              key={entry.moo}
              onClick={() => onUsePhraseInTranslator?.(entry.moo)}
              className="bg-white border border-brown-200 rounded-2xl px-4 py-3.5 cursor-pointer hover:border-farm-green hover:bg-cream transition-all"
            >
              <p className="text-base font-bold text-brown-700">{entry.moo}</p>
              <p className="text-xs text-brown-400 my-1">↓</p>
              <p className="text-sm text-brown-800">{entry.human}</p>
              <p className="text-xs text-farm-green font-semibold mt-2">
                Tap to use in translator →
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
