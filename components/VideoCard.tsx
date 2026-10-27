"use client";

import { useState } from "react";
import Brote from "./Brote";

type Props = {
  title: string;
  lang: "es" | "en";
  /** Optional real video URL; when missing, a placeholder player is shown. */
  src?: string;
};

export default function VideoCard({ title, lang, src }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="card overflow-hidden">
      <div className="relative aspect-video w-full bg-[#C8E0A3]">
        {src ? (
          <video className="h-full w-full" controls preload="none" src={src} aria-label={title} />
        ) : (
          <>
            {/* poster scene: chalkboard + Brote */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 px-6">
              <div className="hidden h-3/4 w-1/2 rounded-lg border-[6px] border-amber bg-[#14532D] shadow-inner sm:block" />
              <Brote size={112} className="animate-float" />
            </div>

            {!playing ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${title}`}
                className="absolute inset-0 flex items-center justify-center bg-black/10 transition hover:bg-black/20"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-orange-dark shadow-soft">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/80 p-4 text-center text-white">
                <p className="font-heading text-xl font-semibold">Video placeholder</p>
                <p className="max-w-sm text-sm">
                  Add a file such as <code className="rounded bg-white/20 px-1">/public/videos/fable.mp4</code> and
                  pass it as the <code className="rounded bg-white/20 px-1">src</code> prop.
                </p>
                <button
                  type="button"
                  onClick={() => setPlaying(false)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink"
                >
                  Close
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
        <span className="font-heading text-lg font-semibold">{title}</span>
        <span className="rounded-full bg-teal-light/50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-dark">
          {lang === "es" ? "Español" : "English"}
        </span>
      </figcaption>
    </figure>
  );
}
