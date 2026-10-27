import Link from "next/link";
import Brote from "@/components/Brote";
import TreeBackground from "@/components/TreeBackground";

function BookCover({ withMascot }: { withMascot?: boolean }) {
  return (
    <svg width="150" height="170" viewBox="0 0 150 170" aria-hidden="true" className="drop-shadow-md">
      <path d="M22 14 L128 8 L128 150 L22 158 Z" fill={withMascot ? "#FFB319" : "#1FAFC7"} stroke="#1F2937" strokeWidth="5" strokeLinejoin="round" />
      <path d="M14 22 L22 14 L22 158 L14 150 Z" fill={withMascot ? "#F97A2D" : "#0E7C8F"} stroke="#1F2937" strokeWidth="5" strokeLinejoin="round" />
      <path d="M22 150 L128 142 L128 150 L22 158Z" fill="#fff" stroke="#1F2937" strokeWidth="3" />
      {withMascot ? null : (
        <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round">
          <path d="M45 50 L105 46" />
          <path d="M45 70 L105 66" />
          <path d="M45 90 L85 87" />
        </g>
      )}
    </svg>
  );
}

export default function DemoHub() {
  return (
    <section className="relative overflow-hidden">
      <TreeBackground />
      <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-14 text-center">
        <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">Welcome to Early Spanish Reading</h1>
        <p className="mt-3 font-heading text-3xl font-bold text-orange-dark">¡Bienvenidos!</p>
        <p className="mt-2 text-xl font-semibold">Choose a book to get started</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Link
            href="/demo/book-1"
            className="card group flex flex-col items-center gap-4 p-8 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative">
              <BookCover withMascot />
              <Brote size={80} className="absolute left-[34px] top-[28px]" />
            </div>
            <span className="font-heading text-4xl font-extrabold">Book 1</span>
            <span className="text-base font-semibold text-ink/80">Colors, animals and first sentences</span>
            <span className="btn btn-orange mt-1 w-full group-hover:bg-orange">Start reading</span>
          </Link>

          <Link
            href="/demo/fables"
            className="card group flex flex-col items-center gap-4 p-8 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <BookCover />
            <span className="font-heading text-4xl font-extrabold">Fables</span>
            <span className="text-base font-semibold text-ink/80">Four stories with songs and exercises</span>
            <span className="btn btn-teal mt-1 w-full group-hover:bg-teal">Open fables</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
