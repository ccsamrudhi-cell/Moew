import mooDict from "@/data/moo-dictionary.json";

export interface MooEntry {
  moo: string;
  human: string;
}

export const dictionary: MooEntry[] = mooDict;

// Easter egg phrases
const EASTER_EGGS: Record<string, string> = {
  "mooooooo": "Some feelings are too big for words. 🐄❤️",
};

export type TranslateResult =
  | { found: true; result: string; isEasterEgg?: boolean }
  | { found: false };

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[-\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .trim()
    .replace(/^-+|-+$/g, "");
}

function similarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  if (na.includes(nb) || nb.includes(na)) return 0.9;
  // simple char overlap ratio
  let matches = 0;
  const longer = na.length > nb.length ? na : nb;
  const shorter = na.length <= nb.length ? na : nb;
  for (let i = 0; i < shorter.length; i++) {
    if (longer[i] === shorter[i]) matches++;
  }
  return matches / longer.length;
}

export function translateMooToHuman(input: string): TranslateResult {
  const trimmed = input.trim();
  if (!trimmed) return { found: false };

  // Check easter eggs
  const key = normalize(trimmed);
  if (EASTER_EGGS[key]) {
    return { found: true, result: EASTER_EGGS[key], isEasterEgg: true };
  }

  // Exact match first
  const exact = dictionary.find(
    (e) => normalize(e.moo) === normalize(trimmed)
  );
  if (exact) return { found: true, result: exact.human };

  // Fuzzy match
  let best: MooEntry | null = null;
  let bestScore = 0;
  for (const entry of dictionary) {
    const score = similarity(trimmed, entry.moo);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0.6) {
    return { found: true, result: best.human };
  }

  return { found: false };
}

export function translateHumanToMoo(input: string): TranslateResult {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return { found: false };

  // Exact / substring match
  for (const entry of dictionary) {
    const human = entry.human.toLowerCase();
    if (trimmed === human || trimmed.includes(human) || human.includes(trimmed)) {
      return { found: true, result: entry.moo };
    }
  }

  // Word-level fuzzy match
  const inputWords = trimmed.split(/\s+/);
  let best: MooEntry | null = null;
  let bestScore = 0;

  for (const entry of dictionary) {
    const humanWords = entry.human.toLowerCase().split(/\s+/);
    const matches = inputWords.filter((w) =>
      humanWords.some((h) => h.includes(w) || w.includes(h))
    ).length;
    const score = matches / Math.max(inputWords.length, humanWords.length);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0.3) {
    return { found: true, result: best.moo };
  }

  return { found: false };
}
