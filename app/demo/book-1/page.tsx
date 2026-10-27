import Link from "next/link";
import Brote from "@/components/Brote";
import TreeBackground from "@/components/TreeBackground";
import { lessons } from "@/data/book1";

export default function Book1Page() {
  return (
    <section className="relative overflow-hidden">
      <TreeBackground className="opacity-60" />
      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-10">
        <Link href="/demo" className="text-sm font-bold text-teal-dark underline underline-offset-4">
          ← Books
        </Link>

        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <Brote size={96} className="animate-float" />
          <h1 className="text-5xl font-extrabold">Book 1</h1>
          <p className="max-w-xl text-lg font-semibold">
            Six short lessons. Tap a sentence to hear it, and hide the English when you feel ready.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((l) => (
            <li key={l.slug}>
              {l.open ? (
                <Link
                  href={`/demo/book-1/${l.slug}`}
                  className="card flex h-full flex-col gap-2 p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="text-4xl" aria-hidden="true">{l.emoji}</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-teal-dark">Lesson {l.n}</span>
                  <span className="font-heading text-2xl font-bold leading-tight">{l.es}</span>
                  <span className="font-semibold text-ink/80">{l.en}</span>
                </Link>
              ) : (
                <div
                  className="card flex h-full flex-col gap-2 bg-white/70 p-6 opacity-80"
                  aria-label={`Lesson ${l.n}: ${l.en}, coming soon`}
                >
                  <span className="text-4xl grayscale" aria-hidden="true">{l.emoji}</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-ink/60">Lesson {l.n}</span>
                  <span className="font-heading text-2xl font-bold leading-tight">{l.es}</span>
                  <span className="font-semibold text-ink/80">{l.en}</span>
                  <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-trunk/40 px-3 py-1 text-sm font-bold">
                    <span aria-hidden="true">🔒</span> Coming soon
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
