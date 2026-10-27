"use client";

import { useId, useState } from "react";
import type { Activity, QuizQuestion } from "@/data/fables";
import Quiz from "./Quiz";

type Props = {
  activity: Activity;
  quiz: QuizQuestion[];
  done: boolean;
  onDone: (value: boolean) => void;
};

function AudioPlaceholder({ title }: { title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FFF8E7] p-3">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-label={on ? `Pause ${title}` : `Play ${title}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-dark text-white shadow-soft"
      >
        {on ? "❚❚" : "▶"}
      </button>
      <div className="flex-1">
        <div className="h-2 overflow-hidden rounded-full bg-trunk/40">
          <div className={`h-full rounded-full bg-teal transition-all duration-[4000ms] ease-linear ${on ? "w-full" : "w-0"}`} />
        </div>
        <p className="mt-1 text-xs font-semibold text-ink/70">Audio placeholder (add a real track later)</p>
      </div>
    </div>
  );
}

export default function ActivityCard({ activity, quiz, done, onDone }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const isSong = activity.kind === "song";

  return (
    <div className={`card transition ${open ? "md:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 p-2">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-[56px] flex-1 items-center gap-3 rounded-2xl px-3 py-2 text-left hover:bg-teal-light/20"
        >
          <span
            aria-hidden="true"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
              isSong ? "bg-leaf-yellow" : "bg-leaf-peach"
            }`}
          >
            {isSong ? "♪" : "✎"}
          </span>
          <span className="flex-1 font-heading text-lg font-semibold leading-tight">{activity.title}</span>
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={`shrink-0 transition ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <label className="flex min-h-[48px] cursor-pointer items-center gap-2 rounded-2xl px-3 text-sm font-bold">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => onDone(e.target.checked)}
            className="h-6 w-6 accent-teal-dark"
          />
          Done
        </label>
      </div>

      {open && (
        <div id={panelId} role="region" aria-label={activity.title} className="space-y-3 px-4 pb-4">
          <p className="text-base">{activity.description}</p>
          {isSong ? (
            <AudioPlaceholder title={activity.title} />
          ) : (
            <Quiz questions={quiz} onComplete={() => onDone(true)} />
          )}
        </div>
      )}
    </div>
  );
}
