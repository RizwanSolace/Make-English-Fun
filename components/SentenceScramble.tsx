"use client";

import { useEffect, useState } from "react";
import type { Sentence } from "@/data/book1";
import { speak } from "@/lib-progress";

type Props = {
  sentences: Sentence[];
  onComplete?: () => void;
};

type ShuffledWord = {
  id: string;
  text: string;
};

export default function SentenceScramble({ sentences, onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [availableWords, setAvailableWords] = useState<ShuffledWord[]>([]);
  const [selectedWords, setSelectedWords] = useState<ShuffledWord[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const sentence = sentences[currentIdx];

  // Helper to split sentence into target words clean of trailing punctuation for checking
  const cleanWord = (w: string) => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  // Initialize and shuffle words for current sentence
  useEffect(() => {
    if (!sentence) return;

    const rawWords = sentence.es.split(/\s+/).filter(Boolean);
    const wordsWithIds = rawWords.map((w, i) => ({ id: `${w}-${i}-${Date.now()}`, text: w }));

    // Deterministic shuffle
    const shuffled = [...wordsWithIds].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setStatus("idle");
  }, [currentIdx, sentence]);

  const selectWord = (word: ShuffledWord) => {
    if (status === "correct") return;
    setAvailableWords((prev) => prev.filter((w) => w.id !== word.id));
    setSelectedWords((prev) => [...prev, word]);
    speak(word.text, "es-ES", 0.9);
    setStatus("idle");
  };

  const unselectWord = (word: ShuffledWord) => {
    if (status === "correct") return;
    setSelectedWords((prev) => prev.filter((w) => w.id !== word.id));
    setAvailableWords((prev) => [...prev, word]);
    setStatus("idle");
  };

  const checkAnswer = () => {
    const constructed = selectedWords.map((w) => cleanWord(w.text)).join(" ");
    const expected = sentence.es
      .split(/\s+/)
      .map(cleanWord)
      .join(" ");

    if (constructed === expected) {
      setStatus("correct");
      setScore((s) => s + 1);
      speak("¡Excelente! Muy bien hecho.", "es-ES", 0.95);
    } else {
      setStatus("wrong");
      speak("Intenta otra vez", "es-ES", 0.9);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < sentences.length) {
      setCurrentIdx((c) => c + 1);
    } else {
      setIsDone(true);
      onComplete?.();
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsDone(false);
  };

  if (isDone) {
    return (
      <div className="card p-8 text-center bg-gradient-to-b from-amber-50 to-white">
        <p className="text-6xl animate-bounce">🏆</p>
        <h3 className="mt-4 font-heading text-4xl font-extrabold text-teal-dark">
          ¡Felicidades!
        </h3>
        <p className="mt-2 text-xl font-semibold">
          You built all the sentences! Score: {score} / {sentences.length}
        </p>
        <button
          type="button"
          onClick={resetGame}
          className="btn btn-orange mt-6 !px-8 !text-lg shadow-lg"
        >
          Play again 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 space-y-6 bg-white/95 shadow-soft border-2 border-teal/20">
      {/* Game Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-trunk/30 pb-4">
        <div>
          <span className="inline-block rounded-full bg-orange/20 px-3 py-1 font-heading text-sm font-bold text-orange-dark">
            🧩 Mini-Game: Construye la Frase
          </span>
          <h3 className="mt-1 font-heading text-2xl font-bold">
            Sentence {currentIdx + 1} of {sentences.length}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-heading text-lg font-bold text-teal-dark">
            ⭐ Stars: {score}
          </span>
          <button
            type="button"
            onClick={() => speak(sentence.es, "es-ES", 0.85)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-dark text-white shadow hover:scale-105"
            title="Listen to full sentence hint"
          >
            🔊
          </button>
        </div>
      </div>

      {/* Target translation prompt */}
      <div className="rounded-2xl bg-[#FFF8E7] p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/60">
          Build this sentence in Spanish:
        </p>
        <p className="mt-1 font-heading text-2xl font-bold text-ink">
          “{sentence.en}”
        </p>
      </div>

      {/* Answer Dropzone / Sentence Tray */}
      <div className="min-h-[90px] rounded-2xl border-2 border-dashed border-teal/40 bg-teal-light/10 p-4 transition">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-dark">
          Your Sentence (Tap a word to put it back):
        </p>
        {selectedWords.length === 0 ? (
          <p className="py-3 text-center text-base font-semibold text-ink/50 italic">
            Tap the word bubbles below in the right order...
          </p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {selectedWords.map((word) => (
              <button
                key={word.id}
                type="button"
                onClick={() => unselectWord(word)}
                className="rounded-xl border-2 border-teal-dark bg-white px-4 py-2 font-heading text-2xl font-bold text-teal-dark shadow-sm hover:bg-red-50 hover:border-red-400 transition"
                title="Tap to remove"
              >
                {word.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Word Bubbles Pool */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2">
          Available Words:
        </p>
        <div className="flex flex-wrap gap-2.5 min-h-[56px]">
          {availableWords.map((word) => (
            <button
              key={word.id}
              type="button"
              onClick={() => selectWord(word)}
              className="rounded-xl border-2 border-orange/40 bg-white px-4 py-2.5 font-heading text-2xl font-bold text-ink shadow-soft hover:bg-orange/10 hover:border-orange hover:scale-105 active:scale-95 transition"
            >
              {word.text}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-trunk/30 pt-4">
        <div>
          {status === "correct" && (
            <p className="font-heading text-2xl font-bold text-green-600 animate-bounce">
              ¡Muy bien! Correct! 🎉
            </p>
          )}
          {status === "wrong" && (
            <p className="font-heading text-xl font-bold text-red-500">
              Not quite! Check the word order and try again.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {status !== "correct" ? (
            <button
              type="button"
              disabled={selectedWords.length === 0}
              onClick={checkAnswer}
              className="btn btn-teal !text-lg !px-6 disabled:opacity-50"
            >
              Check Answer ✓
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-orange !text-lg !px-6 animate-pulse"
            >
              Next Sentence →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

