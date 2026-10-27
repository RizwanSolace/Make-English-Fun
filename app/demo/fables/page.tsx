"use client";

import Link from "next/link";
import FableSection from "@/components/FableSection";
import ProgressBar from "@/components/ProgressBar";
import { fables, totalActivities } from "@/data/fables";
import { useProgress } from "@/lib-progress";

export default function FablesPage() {
  const { done, set } = useProgress();
  const completed = Object.values(done).filter(Boolean).length;

  return (
    <>
      <div className="sticky top-[57px] z-40 border-b border-trunk/40 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-3">
            <Link href="/demo" className="text-sm font-bold text-teal-dark underline underline-offset-4">
              ← Books
            </Link>
            <h1 className="text-2xl font-extrabold">Fables</h1>
          </div>
          <nav aria-label="Fables" className="flex flex-wrap gap-2">
            {fables.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="min-h-[40px] rounded-full bg-teal-light/50 px-4 py-2 font-heading text-base font-bold text-ink hover:bg-teal-light"
              >
                Fable {f.n}
              </a>
            ))}
          </nav>
          <div className="md:ml-auto md:w-64">
            <ProgressBar done={completed} total={totalActivities} />
          </div>
        </div>
      </div>

      {fables.map((f) => (
        <FableSection key={f.id} fable={f} done={done} setDone={set} />
      ))}
    </>
  );
}
