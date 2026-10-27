"use client";

import { useState } from "react";
import type { Lesson, Sentence, WordDetail } from "@/data/book1";
import { saveLast, speak, stopSpeaking } from "@/lib-progress";

type Props = {
  lesson: Lesson;
};

export default function LessonReader({ lesson }: { lesson: Lesson }) {
  const [showEnglish, setShowEnglish] = useState(true);
  const [showSyllables, setShowSyllables] = useState(false);
  const [showParentGuide, setShowParentGuide] = useState(false);
  const [speed, setSpeed] = useState<0.75 | 0.95>(0.95);
  const [activeSentence, setActiveSentence] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<{ word: WordDetail; sentenceIdx: number } | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  const playSentence = (i: number, text: string) => {
    setActiveSentence(i);
    saveLast(`Book 1: ${lesson.en}`, `/demo/book-1/${lesson.slug}`);
    speak(text, "es-ES", speed, () => {
      setActiveSentence(null);
    });
  };

  const playWord = (word: string) => {
    speak(word, "es-ES", speed);
  };

  const playSyllable = (syllable: string) => {
    speak(syllable, "es-ES", 0.7);
  };

  const handleReadAll = () => {
    if (isPlayingAll) {
      stopSpeaking();
      setIsPlayingAll(false);
      setActiveSentence(null);
      return;
    }

    setIsPlayingAll(true);
    let index = 0;

    const playNext = () => {
      if (index >= lesson.sentences.length) {
        setIsPlayingAll(false);
        setActiveSentence(null);
        return;
      }
      setActiveSentence(index);
      const s = lesson.sentences[index];
      speak(s.es, "es-ES", speed, () => {
        index += 1;
        setTimeout(playNext, 400);
      });
    };

    playNext();
  };

  // Helper to get words with fallback if sentence words aren't defined
  const getWords = (sentence: Sentence): WordDetail[] => {
    if (sentence.words && sentence.words.length > 0) return sentence.words;
    return sentence.es
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .map((w) => ({
        es: w,
        en: "",
        syllables: [w],
        phonetic: "",
      }));
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="card bg-white/95 p-4 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleReadAll}
              aria-label={isPlayingAll ? "Stop reading all" : "Read all sentences"}
              className={`btn !min-h-[44px] !px-5 !text-base font-bold shadow-md transition ${
                isPlayingAll ? "bg-red-500 text-white hover:bg-red-600" : "btn-orange"
              }`}
            >
              {isPlayingAll ? "⏹ Stop" : "🔊 Read all"}
            </button>

            {/* Speed Toggle */}
            <div className="flex items-center rounded-full bg-[#FFF8E7] p-1 font-heading text-sm font-bold shadow-inner">
              <button
                type="button"
                onClick={() => setSpeed(0.75)}
                className={`rounded-full px-3 py-1.5 transition ${
                  speed === 0.75 ? "bg-orange-dark text-white shadow-soft" : "text-ink/80 hover:text-ink"
                }`}
                title="Slow pace (Turtle mode)"
              >
                🐢 Lento (0.75x)
              </button>
              <button
                type="button"
                onClick={() => setSpeed(0.95)}
                className={`rounded-full px-3 py-1.5 transition ${
                  speed === 0.95 ? "bg-teal-dark text-white shadow-soft" : "text-ink/80 hover:text-ink"
                }`}
                title="Normal pace (Hare mode)"
              >
                🐇 Normal (1x)
              </button>
            </div>
          </div>

          {/* Educational Feature Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Syllable Toggle */}
            <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full bg-leaf-yellow/40 px-3.5 py-1 text-sm font-bold text-ink shadow-soft hover:bg-leaf-yellow/60">
              <input
                type="checkbox"
                checked={showSyllables}
                onChange={(e) => setShowSyllables(e.target.checked)}
                className="h-4 w-4 accent-teal-dark"
              />
              <span>🔤 Sílabas (Syllables)</span>
            </label>

            {/* English Toggle */}
            <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full bg-white px-3.5 py-1 text-sm font-bold text-ink shadow-soft hover:bg-teal-light/20">
              <input
                type="checkbox"
                checked={showEnglish}
                onChange={(e) => setShowEnglish(e.target.checked)}
                className="h-4 w-4 accent-teal-dark"
              />
              <span>🌐 English</span>
            </label>

            {/* Parent Pronunciation Guide */}
            <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full bg-[#F3E8FF] px-3.5 py-1 text-sm font-bold text-purple-900 shadow-soft hover:bg-purple-100">
              <input
                type="checkbox"
                checked={showParentGuide}
                onChange={(e) => setShowParentGuide(e.target.checked)}
                className="h-4 w-4 accent-purple-700"
              />
              <span>💡 Parent Guide</span>
            </label>
          </div>
        </div>

        {/* Tip banner for children and parents */}
        <p className="mt-3 text-xs font-semibold text-ink/70">
          💡 <span className="font-bold">Tip:</span> Tap any individual word to hear its sound, see its syllables, and practice!
        </p>
      </div>

      {/* Selected Word Inspector Modal / Drawer */}
      {selectedWord && (
        <div className="card border-2 border-teal bg-gradient-to-r from-teal-light/20 via-white to-leaf-yellow/30 p-5 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-heading text-4xl font-extrabold text-teal-dark">
                  {selectedWord.word.es}
                </span>
                <button
                  type="button"
                  onClick={() => playWord(selectedWord.word.es)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-dark text-white shadow hover:scale-105"
                  aria-label={`Hear ${selectedWord.word.es}`}
                >
                  🔊
                </button>
              </div>

              {selectedWord.word.en && (
                <p className="mt-1 text-lg font-semibold text-ink/80">
                  Means: <span className="font-bold text-ink">“{selectedWord.word.en}”</span>
                </p>
              )}

              {selectedWord.word.phonetic && (
                <p className="mt-0.5 text-sm font-semibold text-purple-800">
                  How to say it: <span className="font-mono font-bold">[{selectedWord.word.phonetic}]</span>
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedWord(null)}
              className="rounded-full bg-ink/10 px-3 py-1 text-sm font-bold text-ink hover:bg-ink/20"
            >
              ✕ Close
            </button>
          </div>

          {/* Interactive Syllable Buttons */}
          {selectedWord.word.syllables && selectedWord.word.syllables.length > 0 && (
            <div className="mt-4 border-t border-teal/20 pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-dark">
                Tap each syllable to sound it out:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedWord.word.syllables.map((syl, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => playSyllable(syl)}
                    className="flex items-center gap-1.5 rounded-xl border-2 border-teal-dark/30 bg-white px-4 py-2 font-heading text-2xl font-bold text-teal-dark shadow-sm hover:scale-105 hover:bg-teal-light/30 active:scale-95"
                  >
                    <span>{syl}</span>
                    <span className="text-sm opacity-60">🔊</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sentences List */}
      <ol className="space-y-4">
        {lesson.sentences.map((sentence, i) => {
          const isActive = activeSentence === i;
          const words = getWords(sentence);

          return (
            <li key={i}>
              <div
                className={`card relative w-full p-5 text-left transition duration-200 ${
                  isActive
                    ? "ring-4 ring-teal bg-gradient-to-r from-teal-light/20 to-white shadow-xl scale-[1.01]"
                    : "hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Sentence Audio Play Button */}
                  <button
                    type="button"
                    onClick={() => playSentence(i, sentence.es)}
                    aria-label={`Hear sentence ${i + 1}: ${sentence.es}`}
                    className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-soft transition ${
                      isActive
                        ? "bg-teal-dark text-white animate-pulse"
                        : "bg-orange-dark text-white hover:bg-orange"
                    }`}
                  >
                    {isActive ? "🔊" : "▶"}
                  </button>

                  <div className="flex-1">
                    {/* Spanish Words Interactive Row */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-heading text-3xl font-bold leading-snug">
                      {words.map((w, wIdx) => {
                        const isChosenWord = selectedWord?.word.es.toLowerCase() === w.es.toLowerCase();

                        return (
                          <button
                            key={wIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWord({ word: w, sentenceIdx: i });
                              playWord(w.es);
                            }}
                            className={`rounded-xl px-2 py-0.5 text-left transition ${
                              isChosenWord
                                ? "bg-teal text-white ring-2 ring-teal-dark shadow-sm"
                                : "hover:bg-teal-light/30 hover:text-teal-dark"
                            }`}
                          >
                            {showSyllables && w.syllables && w.syllables.length > 1 ? (
                              <span className="inline-flex gap-0.5">
                                {w.syllables.map((s, si) => (
                                  <span
                                    key={si}
                                    className={si % 2 === 0 ? "text-teal-dark font-extrabold" : "text-orange-dark font-extrabold"}
                                  >
                                    {s}
                                    {si < w.syllables.length - 1 && <span className="opacity-40">·</span>}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              w.es
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Syllables Full View when enabled */}
                    {showSyllables && sentence.syllables && (
                      <p className="mt-1 text-sm font-bold text-teal-dark">
                        Sílabas: <span className="font-mono text-base font-semibold text-ink">{sentence.syllables}</span>
                      </p>
                    )}

                    {/* English Translation */}
                    {showEnglish && (
                      <p className="mt-1.5 text-lg font-semibold text-ink/75">
                        {sentence.en}
                      </p>
                    )}

                    {/* Parent Phonetic Guide */}
                    {showParentGuide && (
                      <p className="mt-1 text-sm font-semibold text-purple-900 bg-purple-50/80 px-2.5 py-1 rounded-lg inline-block">
                        🗣️ <span className="font-bold">Pronunciation:</span>{" "}
                        {words.map((w) => w.phonetic || w.es).join(" ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
