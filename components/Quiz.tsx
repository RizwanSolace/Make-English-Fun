"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/data/fables";
import { speak } from "@/lib-progress";

type Props = {
  questions: QuizQuestion[];
  onComplete?: () => void;
};

export default function Quiz({ questions, onComplete }: Props) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const answered = picked.filter((p) => p !== null).length;
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const finished = answered === questions.length;

  const choose = (qi: number, oi: number) => {
    if (picked[qi] !== null) return; // lock after first answer
    const next = [...picked];
    next[qi] = oi;
    setPicked(next);
    if (next.every((p) => p !== null)) onComplete?.();
  };

  const reset = () => setPicked(questions.map(() => null));

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const chosen = picked[qi];
        return (
          <fieldset key={qi} className="rounded-2xl bg-[#FFF8E7] p-4">
            <legend className="px-1 font-heading text-lg font-bold">
              {qi + 1}. What does{" "}
              <span className="rounded-lg bg-teal-light/50 px-2 py-0.5 text-teal-dark">“{q.prompt}”</span> mean?
              <button
                type="button"
                onClick={() => speak(q.prompt)}
                aria-label={`Hear “${q.prompt}” in Spanish`}
                className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white align-middle shadow-soft hover:bg-teal-light/40"
              >
                🔊
              </button>
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isRight = q.answer === oi;
                let style = "bg-white hover:bg-teal-light/30";
                if (chosen !== null) {
                  if (isRight) style = "bg-green-100 ring-2 ring-green-600";
                  else if (isChosen) style = "bg-red-100 ring-2 ring-red-500";
                  else style = "bg-white opacity-70";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={chosen !== null}
                    onClick={() => choose(qi, oi)}
                    className={`min-h-[48px] rounded-xl px-4 py-2 text-left font-semibold shadow-soft transition ${style}`}
                  >
                    {opt}
                    {chosen !== null && isRight && <span className="ml-2" aria-label="correct">✓</span>}
                    {chosen !== null && isChosen && !isRight && <span className="ml-2" aria-label="incorrect">✗</span>}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 min-h-[1.5rem] text-sm font-bold" aria-live="polite">
              {chosen === null ? "" : chosen === q.answer ? "¡Muy bien! Correct." : `Not quite. The answer is “${q.options[q.answer]}”.`}
            </p>
          </fieldset>
        );
      })}

      <div className="flex flex-wrap items-center justify-between gap-3" aria-live="polite">
        <p className="font-heading text-xl font-bold">
          {finished ? `Score: ${score} / ${questions.length} ${score === questions.length ? "🎉" : ""}` : `${answered} of ${questions.length} answered`}
        </p>
        {finished && (
          <button type="button" onClick={reset} className="rounded-full bg-ink px-5 py-2 font-bold text-white">
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
