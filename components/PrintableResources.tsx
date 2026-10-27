"use client";

import { useState } from "react";
import type { Lesson } from "@/data/book1";

type Props = {
  lesson: Lesson;
};

export default function PrintableResources({ lesson }: Props) {
  const [docType, setDocType] = useState<"tracing" | "minibook" | "flashcards">("tracing");

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const words = lesson.sentences.flatMap((s) => s.words || []);

  return (
    <div className="space-y-6">
      {/* Control bar (hidden during print) */}
      <div className="no-print card bg-white p-5 shadow-soft border-2 border-orange/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-orange/20 px-3 py-1 font-heading text-sm font-bold text-orange-dark">
              🖨️ Centro de Imprimibles (Printable Hub)
            </span>
            <h3 className="mt-1 font-heading text-2xl font-bold">
              Classroom & Home Practice Sheets
            </h3>
            <p className="text-sm font-semibold text-ink/70">
              Select a format below and click Print to generate paper activities for offline learning.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-orange !min-h-[48px] !px-7 !text-lg shadow-md hover:scale-105"
          >
            🖨️ Print Worksheet
          </button>
        </div>

        {/* Tab selection */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-trunk/30 pt-4">
          <button
            type="button"
            onClick={() => setDocType("tracing")}
            className={`rounded-2xl px-4 py-2 font-heading text-base font-bold transition ${
              docType === "tracing"
                ? "bg-teal-dark text-white shadow-soft"
                : "bg-teal-light/20 text-ink hover:bg-teal-light/40"
            }`}
          >
            ✍️ Tracing & Handwriting
          </button>
          <button
            type="button"
            onClick={() => setDocType("minibook")}
            className={`rounded-2xl px-4 py-2 font-heading text-base font-bold transition ${
              docType === "minibook"
                ? "bg-teal-dark text-white shadow-soft"
                : "bg-teal-light/20 text-ink hover:bg-teal-light/40"
            }`}
          >
            📖 Foldable Mini-Book
          </button>
          <button
            type="button"
            onClick={() => setDocType("flashcards")}
            className={`rounded-2xl px-4 py-2 font-heading text-base font-bold transition ${
              docType === "flashcards"
                ? "bg-teal-dark text-white shadow-soft"
                : "bg-teal-light/20 text-ink hover:bg-teal-light/40"
            }`}
          >
            ✂️ Cut-Out Flashcards
          </button>
        </div>
      </div>

      {/* Printable Sheet Area */}
      <div className="printable-sheet card bg-white p-8 border-2 border-dashed border-trunk/50 print:border-none print:p-0 print:m-0">
        {/* Printable Header */}
        <div className="border-b-2 border-ink pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-teal-dark">
                Early Spanish Reading • Material Imprimible
              </p>
              <h2 className="font-heading text-3xl font-extrabold text-ink">
                {lesson.emoji} Lección {lesson.n}: {lesson.es} ({lesson.en})
              </h2>
            </div>
            <div className="space-y-1 text-right text-sm font-semibold">
              <p>Nombre (Name): <span className="inline-block w-40 border-b border-ink"></span></p>
              <p>Fecha (Date): <span className="inline-block w-32 border-b border-ink"></span></p>
            </div>
          </div>
        </div>

        {/* 1. Tracing & Handwriting Sheet */}
        {docType === "tracing" && (
          <div className="mt-6 space-y-6">
            <p className="text-sm font-bold text-ink/70">
              Instrucciones: Lee cada frase, traza las palabras punteadas con tu lápiz y colorea.
            </p>

            <div className="space-y-5">
              {lesson.sentences.map((s, idx) => (
                <div key={idx} className="rounded-2xl border border-trunk/40 p-4 bg-[#FAFAFA] print:bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-lg font-bold text-teal-dark">
                      Frase {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-ink/60">
                      {s.en}
                    </span>
                  </div>

                  {/* Big Tracing Line */}
                  <div className="mt-2 text-3xl font-extrabold tracking-wide text-ink border-b-2 border-dashed border-trunk/60 pb-2">
                    {s.es}
                  </div>

                  {/* Dotted tracing guide line */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs font-bold uppercase text-ink/50">Tu turno:</span>
                    <div className="flex-1 border-b-2 border-dotted border-ink/40 h-8"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Target Vocabulary Box */}
            <div className="mt-6 rounded-2xl border-2 border-orange/40 p-4 bg-leaf-yellow/20 print:bg-white">
              <h4 className="font-heading text-lg font-bold text-orange-dark">
                Vocabulario Clave para Practicar (Key Words):
              </h4>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {words.slice(0, 8).map((w, wi) => (
                  <div key={wi} className="rounded-xl border border-trunk/50 bg-white p-2 text-center">
                    <p className="font-heading text-xl font-bold">{w.es}</p>
                    <p className="text-xs font-semibold text-ink/70">{w.en}</p>
                    <p className="mt-1 font-mono text-[11px] text-teal-dark font-bold">
                      {w.syllables.join("·")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Foldable Mini-Book */}
        {docType === "minibook" && (
          <div className="mt-6 space-y-6">
            <p className="text-sm font-bold text-ink/70">
              Instrucciones: Dobla esta hoja por la mitad horizontal y luego vertical para crear tu librito de bolsillo.
            </p>

            <div className="grid grid-cols-2 gap-4 border-2 border-dashed border-trunk/60 p-4 rounded-2xl">
              {/* Page 1 (Cover) */}
              <div className="border border-trunk/40 p-4 rounded-xl text-center bg-teal-light/10 flex flex-col justify-between min-h-[160px]">
                <span className="text-xs font-bold text-teal-dark">Portada (Page 1)</span>
                <div>
                  <p className="text-3xl">{lesson.emoji}</p>
                  <h3 className="font-heading text-2xl font-extrabold">{lesson.es}</h3>
                  <p className="text-xs text-ink/70">Librito de Lectura</p>
                </div>
                <p className="text-xs font-semibold">Autor: _________</p>
              </div>

              {/* Page 2 */}
              <div className="border border-trunk/40 p-4 rounded-xl flex flex-col justify-between min-h-[160px]">
                <span className="text-xs font-bold text-ink/50">Página 2</span>
                <p className="font-heading text-xl font-bold">{lesson.sentences[0]?.es}</p>
                <div className="border border-dashed border-trunk/40 h-16 flex items-center justify-center text-xs text-ink/40">
                  (Dibuja aquí)
                </div>
              </div>

              {/* Page 3 */}
              <div className="border border-trunk/40 p-4 rounded-xl flex flex-col justify-between min-h-[160px]">
                <span className="text-xs font-bold text-ink/50">Página 3</span>
                <p className="font-heading text-xl font-bold">{lesson.sentences[1]?.es}</p>
                <div className="border border-dashed border-trunk/40 h-16 flex items-center justify-center text-xs text-ink/40">
                  (Dibuja aquí)
                </div>
              </div>

              {/* Page 4 (Back Cover) */}
              <div className="border border-trunk/40 p-4 rounded-xl text-center bg-leaf-yellow/20 flex flex-col justify-between min-h-[160px]">
                <span className="text-xs font-bold text-orange-dark">Contraportada (Page 4)</span>
                <div className="my-auto">
                  <p className="font-heading text-lg font-bold">¡Lo leí yo mismo!</p>
                  <p className="text-xs text-ink/70">I read it myself!</p>
                  <p className="mt-2 text-2xl">⭐⭐⭐⭐⭐</p>
                </div>
                <p className="text-[11px] text-ink/50">Early Spanish Reading</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Cut-out Flashcards */}
        {docType === "flashcards" && (
          <div className="mt-6 space-y-6">
            <p className="text-sm font-bold text-ink/70">
              Instrucciones: Recorta por las líneas punteadas ✂️ para crear tus tarjetas de vocabulario.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {words.slice(0, 9).map((w, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-dashed border-trunk p-4 text-center bg-[#FFF8E7] relative"
                >
                  <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-ink/60">
                    ✂️ Cortar
                  </span>
                  <p className="font-heading text-2xl font-extrabold text-teal-dark mt-2">
                    {w.es}
                  </p>
                  <p className="font-mono text-sm font-bold text-orange-dark mt-0.5">
                    {w.syllables.join(" · ")}
                  </p>
                  <div className="my-3 border-b border-trunk/30"></div>
                  <p className="font-heading text-base font-bold text-ink">
                    “{w.en}”
                  </p>
                  <p className="text-xs text-purple-800 font-semibold mt-1">
                    [{w.phonetic}]
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Printable Footer Stamp */}
        <div className="mt-8 border-t border-trunk/30 pt-3 text-center text-xs font-semibold text-ink/60">
          © Early Spanish Reading • www.earlyspanishreading.com • Free Educational Practice Sheet
        </div>
      </div>
    </div>
  );
}

