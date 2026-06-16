"use client";

import { useState } from "react";

export default function SuggestMoo() {
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!phrase.trim() || !meaning.trim()) return;

    // Store locally — replace with API call when backend is ready
    const suggestions = JSON.parse(
      localStorage.getItem("moo_suggestions") ?? "[]"
    );
    suggestions.push({ phrase, meaning, timestamp: Date.now() });
    localStorage.setItem("moo_suggestions", JSON.stringify(suggestions));

    setPhrase("");
    setMeaning("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="suggest" className="px-5 py-8">
      <h2 className="text-center text-xl font-bold text-brown-700 mb-5">
        💡 Suggest a New Moo
      </h2>

      <div className="bg-white border border-brown-200 rounded-2xl p-4">
        <input
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="Cow phrase (e.g. Moooo-meow)"
          className="w-full px-3 py-2.5 border border-brown-200 rounded-xl text-sm text-brown-900 bg-transparent placeholder:text-brown-400 focus:outline-none focus:border-farm-green mb-3"
        />
        <textarea
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          rows={2}
          placeholder="What does it mean in human?"
          className="w-full px-3 py-2.5 border border-brown-200 rounded-xl text-sm text-brown-900 bg-transparent placeholder:text-brown-400 focus:outline-none focus:border-farm-green resize-none mb-3"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-farm-green hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
        >
          Send to the Herd 🐄
        </button>

        {submitted && (
          <p className="text-center text-farm-green text-xs font-semibold mt-3">
            Mooo! We&apos;ll add it to our dictionary! 🐄
          </p>
        )}
      </div>
    </section>
  );
}
