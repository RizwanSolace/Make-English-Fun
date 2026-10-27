"use client";

import { useState } from "react";
import Brote from "./Brote";

type Props = {
  title: string;
  lang: "es" | "en";
  /** Optional video URL; defaults to sample video in /videos/overview.mp4 */
  src?: string;
};

export default function VideoCard({
  title,
  lang,
  src = "/videos/overview.mp4",
}: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="card overflow-hidden shadow-lg border-2 border-teal/20">
      <div className="relative aspect-video w-full bg-[#C8E0A3]">
        {playing ? (
          <div className="relative h-full w-full bg-black">
            <video
              className="h-full w-full"
              controls
              autoPlay
              playsInline
              src={src}
              aria-label={title}
            >
              Your browser does not support the video tag.
            </video>
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 font-heading text-xs font-bold text-white backdrop-blur hover:bg-black/80 transition"
              title="Volver a la portada / Back to poster"
            >
              ✕ Cerrar / Poster
            </button>
          </div>
        ) : (
          <>
            {/* Poster scene: chalkboard + mascot Brote */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 px-6">
              <div className="hidden h-3/4 w-1/2 rounded-2xl border-[6px] border-amber bg-[#14532D] shadow-inner sm:flex flex-col items-center justify-center p-4 text-center">
                <span className="font-heading text-2xl font-bold text-leaf-yellow">
                  ¡Bienvenidos!
                </span>
                <p className="mt-1 font-heading text-sm font-semibold text-white/90">
                  {title}
                </p>
                <div className="mt-3 flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
                </div>
              </div>
              <Brote size={112} className="animate-float drop-shadow-md" />
            </div>

            {/* Big Play Button Overlay */}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="group absolute inset-0 flex items-center justify-center bg-black/15 transition hover:bg-black/25"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-orange-dark shadow-2xl transition group-hover:scale-110 active:scale-95 ring-4 ring-orange/40">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>

      <figcaption className="flex items-center justify-between gap-2 px-5 py-3.5 bg-white">
        <span className="font-heading text-lg font-bold text-ink">{title}</span>
        <span className="rounded-full bg-teal-light/50 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-teal-dark">
          {lang === "es" ? "Español" : "English"}
        </span>
      </figcaption>
    </figure>
  );
}
