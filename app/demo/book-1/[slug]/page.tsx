import Link from "next/link";
import { notFound } from "next/navigation";
import LessonView from "@/components/LessonView";
import { lessons } from "@/data/book1";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = lessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  const idx = lessons.indexOf(lesson);
  const next = lessons.slice(idx + 1).find((l) => l.open);
  const prev = [...lessons.slice(0, idx)].reverse().find((l) => l.open);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
      <Link href="/demo/book-1" className="no-print text-sm font-bold text-teal-dark underline underline-offset-4">
        ← Book 1
      </Link>

      <header className="no-print mt-4 text-center">
        <p className="text-4xl" aria-hidden="true">{lesson.emoji}</p>
        <p className="mt-1 text-sm font-bold uppercase tracking-widest text-teal-dark">Lesson {lesson.n}</p>
        <h1 className="text-5xl font-extrabold">{lesson.es}</h1>
        <p className="text-lg font-semibold text-ink/70">{lesson.en}</p>
      </header>

      <div className="mt-8">
        <LessonView lesson={lesson} />
      </div>

      <nav aria-label="Lesson navigation" className="no-print mt-10 flex justify-between gap-3">
        {prev ? (
          <Link href={`/demo/book-1/${prev.slug}`} className="btn btn-teal !text-lg">
            ← {prev.en}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/demo/book-1/${next.slug}`} className="btn btn-orange !text-lg">
            {next.en} →
          </Link>
        ) : (
          <Link href="/demo/fables" className="btn btn-orange !text-lg">
            Try the Fables →
          </Link>
        )}
      </nav>
    </div>
  );
}
