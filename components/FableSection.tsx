"use client";

import { useState } from "react";
import type { Fable } from "@/data/fables";
import { saveLast, speak } from "@/lib-progress";
import ActivityCard from "./ActivityCard";
import LanguageToggle from "./LanguageToggle";
import TreeBackground from "./TreeBackground";
import VideoCard from "./VideoCard";

type Props = {
  fable: Fable;
  done: Record<string, boolean>;
  setDone: (id: string, v: boolean) => void;
};

export default function FableSection({ fable, done, setDone }: Props) {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [whiteboardMode, setWhiteboardMode] = useState(false);
  const [activeStoryLine, setActiveStoryLine] = useState<number | null>(null);
  const [showEnglishStory, setShowEnglishStory] = useState(true);

  const amber = fable.tone === "amber";
  const title = lang === "es" ? fable.es : fable.en;
  const finished = fable.activities.filter((a) => done[a.id]).length;

  const playSentence = (idx: number, text: string) => {
    setActiveStoryLine(idx);
    speak(text, "es-ES", 0.88, () => setActiveStoryLine(null));
  };

  const playEntireStory = () => {
    let i = 0;
    const playNext = () => {
      if (i >= fable.storySentences.length) {
        setActiveStoryLine(null);
        return;
      }
      setActiveStoryLine(i);
      speak(fable.storySentences[i].es, "es-ES", 0.88, () => {
        i += 1;
        setTimeout(playNext, 400);
      });
    };
    playNext();
  };

  const printStorySheet = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section
      id={fable.id}
      aria-labelledby={`${fable.id}-h`}
      className={`relative overflow-hidden transition-all ${
        whiteboardMode
          ? "bg-amber-50/90 py-6"
          : amber
          ? "bg-amber"
          : "bg-[#FAFAFA]"
      }`}
      onFocusCapture={() => saveLast(`Fable ${fable.n}: ${fable.es}`, `/demo/fables#${fable.id}`)}
    >
      {!amber && !whiteboardMode && <TreeBackground className="opacity-60" />}

      <div className={`relative mx-auto px-4 py-14 transition-all ${whiteboardMode ? "max-w-6xl" : "max-w-5xl"}`}>
        {/* Header */}
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-heading text-lg font-bold uppercase tracking-widest text-teal-dark">
              Fable {fable.n}
            </span>
            {/* Whiteboard / Classroom Mode Switcher */}
            <button
              type="button"
              onClick={() => setWhiteboardMode((v) => !v)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition shadow-sm ${
                whiteboardMode
                  ? "bg-teal-dark text-white ring-2 ring-teal-dark"
                  : "bg-white text-ink hover:bg-teal-light/30"
              }`}
            >
              {whiteboardMode ? "✓ Modo Pizarra Activo (Classroom Mode)" : "🖥️ Modo Pizarra / Smartboard"}
            </button>
          </div>

          <h2 id={`${fable.id}-h`} className={`mt-2 font-extrabold transition-all ${whiteboardMode ? "text-5xl sm:text-6xl text-teal-dark" : "text-4xl sm:text-5xl"}`}>
            {fable.es} <span className="font-semibold opacity-70">/ {fable.en}</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-lg font-semibold">{fable.blurb}</p>
        </div>

        {/* Video & Language Switcher */}
        <div className="mt-8 flex flex-col items-center gap-5 no-print">
          <LanguageToggle value={lang} onChange={setLang} label={`Language for Fable ${fable.n} video`} />
          <div className="w-full max-w-2xl">
            <VideoCard title={title} lang={lang} />
          </div>
        </div>

        {/* Story Text Reader Section */}
        <div className="mt-12 card bg-white p-6 shadow-soft border-2 border-teal/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-trunk/30 pb-4">
            <div>
              <span className="rounded-full bg-teal-light/30 px-3 py-1 font-heading text-xs font-bold text-teal-dark uppercase tracking-wider">
                📖 Texto del Cuento (Story Reader)
              </span>
              <h3 className="mt-1 font-heading text-2xl font-bold">
                Read Along with {fable.es}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={playEntireStory}
                className="btn btn-orange !min-h-[40px] !px-4 !text-base shadow"
              >
                🔊 Read Story Aloud
              </button>

              <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full bg-[#FFF8E7] px-3.5 text-sm font-bold shadow-soft">
                <input
                  type="checkbox"
                  checked={showEnglishStory}
                  onChange={(e) => setShowEnglishStory(e.target.checked)}
                  className="h-4 w-4 accent-teal-dark"
                />
                <span>English</span>
              </label>

              <button
                type="button"
                onClick={printStorySheet}
                className="rounded-full bg-orange/20 px-3.5 py-2 font-heading text-xs font-bold text-orange-dark hover:bg-orange/30 shadow-soft"
              >
                🖨️ Print Story & Puppets
              </button>
            </div>
          </div>

          {/* Story Sentences */}
          <div className="mt-6 space-y-4">
            {fable.storySentences.map((s, idx) => {
              const isActive = activeStoryLine === idx;
              return (
                <div
                  key={idx}
                  onClick={() => playSentence(idx, s.es)}
                  className={`group cursor-pointer rounded-2xl p-4 transition duration-200 border-2 ${
                    isActive
                      ? "bg-teal-light/20 border-teal-dark shadow-md scale-[1.01]"
                      : "bg-[#FFFDF7] border-trunk/30 hover:border-teal/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-dark text-white text-sm shadow">
                      {isActive ? "🔊" : "▶"}
                    </span>
                    <div className="flex-1">
                      <p className={`font-heading font-bold text-ink leading-snug transition-all ${
                        whiteboardMode ? "text-3xl sm:text-4xl text-teal-dark" : "text-2xl sm:text-3xl"
                      }`}>
                        {s.es}
                      </p>
                      {showEnglishStory && (
                        <p className={`mt-1 font-semibold text-ink/75 ${whiteboardMode ? "text-xl" : "text-base"}`}>
                          {s.en}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Songs & Exercises */}
        <div className="mt-12 no-print">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-3xl font-bold">Songs and Exercises</h3>
            <p className="text-sm font-bold text-ink/80">
              {finished} of {fable.activities.length} completed
            </p>
          </div>
          <div className="grid items-start gap-4 md:grid-cols-2">
            {fable.activities.map((a) => (
              <ActivityCard
                key={a.id}
                activity={a}
                quiz={fable.quiz}
                done={!!done[a.id]}
                onDone={(v) => setDone(a.id, v)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
