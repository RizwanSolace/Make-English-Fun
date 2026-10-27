"use client";

import { useState } from "react";
import type { Lesson } from "@/data/book1";
import LessonReader from "./LessonReader";
import PrintableResources from "./PrintableResources";
import SentenceScramble from "./SentenceScramble";

type TabMode = "reader" | "game" | "printables";

export default function LessonView({ lesson }: { lesson: Lesson }) {
  const [tab, setTab] = useState<TabMode>("reader");
  const [showTeacherGuide, setShowTeacherGuide] = useState(false);

  return (
    <div className="space-y-6">
      {/* Activity Mode Switcher Tabs */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-trunk/30 pb-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab("reader")}
            className={`rounded-2xl px-5 py-2.5 font-heading text-lg font-bold transition ${
              tab === "reader"
                ? "bg-teal-dark text-white shadow-soft"
                : "bg-white text-ink hover:bg-teal-light/30 shadow-soft"
            }`}
          >
            📖 Lectura (Reader)
          </button>
          <button
            type="button"
            onClick={() => setTab("game")}
            className={`rounded-2xl px-5 py-2.5 font-heading text-lg font-bold transition ${
              tab === "game"
                ? "bg-orange-dark text-white shadow-soft"
                : "bg-white text-ink hover:bg-orange/20 shadow-soft"
            }`}
          >
            🧩 Construye la Frase
          </button>
          <button
            type="button"
            onClick={() => setTab("printables")}
            className={`rounded-2xl px-5 py-2.5 font-heading text-lg font-bold transition ${
              tab === "printables"
                ? "bg-amber text-ink shadow-soft"
                : "bg-white text-ink hover:bg-leaf-yellow/40 shadow-soft"
            }`}
          >
            🖨️ Imprimibles (Worksheets)
          </button>
        </div>

        {/* Teacher & Parent Guide Toggle */}
        <button
          type="button"
          onClick={() => setShowTeacherGuide((v) => !v)}
          className="rounded-full bg-purple-100 px-4 py-2 font-heading text-sm font-bold text-purple-900 shadow-soft hover:bg-purple-200 transition"
        >
          {showTeacherGuide ? "✕ Hide Teacher Guide" : "👩‍🏫 Teacher & Parent Guide"}
        </button>
      </div>

      {/* Teacher Guide Drawer */}
      {showTeacherGuide && (
        <div className="no-print card border-2 border-purple-400 bg-purple-50/70 p-6 shadow-soft animate-in fade-in">
          <div className="flex items-start justify-between">
            <div>
              <span className="rounded-full bg-purple-200 px-3 py-1 font-heading text-xs font-bold text-purple-900 uppercase tracking-wider">
                Guía Docente / Teacher & Parent Guide
              </span>
              <h3 className="mt-1 font-heading text-2xl font-bold text-purple-950">
                Lesson Objectives & Classroom Activities
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowTeacherGuide(false)}
              className="text-sm font-bold text-purple-900 hover:underline"
            >
              Close
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <h4 className="font-heading font-bold text-teal-dark">🎯 Learning Goals</h4>
              <ul className="mt-1 list-disc list-inside space-y-1 text-ink/80 text-xs">
                <li>Identify key topic vocabulary: {lesson.es}.</li>
                <li>Practice basic Spanish sentence structure (Subject + Verb + Adjective).</li>
                <li>Sound out multi-syllable Spanish words using <em>el método silábico</em>.</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm">
              <h4 className="font-heading font-bold text-orange-dark">💡 Classroom Routine</h4>
              <ul className="mt-1 list-disc list-inside space-y-1 text-ink/80 text-xs">
                <li><strong>Warm-up:</strong> Review words with the Syllable audio buttons.</li>
                <li><strong>Choral Reading:</strong> Use "Read All" and read together as a group.</li>
                <li><strong>Kinesthetic Practice:</strong> Print the Foldable Mini-Book for coloring.</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm">
              <h4 className="font-heading font-bold text-purple-900">🗣️ Parent Support Tip</h4>
              <p className="mt-1 text-xs text-ink/80">
                If you do not speak Spanish at home, activate the <strong>Parent Guide</strong> switch in the reader to see simple English phonetic pronunciations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <div>
        {tab === "reader" && <LessonReader lesson={lesson} />}
        {tab === "game" && <SentenceScramble sentences={lesson.sentences} />}
        {tab === "printables" && <PrintableResources lesson={lesson} />}
      </div>
    </div>
  );
}

