import Link from "next/link";
import Brote from "@/components/Brote";
import TreeBackground from "@/components/TreeBackground";
import VideoCard from "@/components/VideoCard";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-between">
      <TreeBackground />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-10 text-center">
        {/* Mascot & Brand Header */}
        <div className="flex flex-col items-center">
          <Brote size={110} className="animate-float" />
          <span className="mt-3 rounded-full bg-teal-light/40 px-4 py-1.5 font-heading text-sm font-bold text-teal-dark tracking-wide uppercase shadow-sm">
            ¡Aprender a leer en español es divertido!
          </span>
          <h1 className="mt-3 text-5xl font-extrabold leading-tight sm:text-6xl text-ink">
            Early Spanish Reading
          </h1>
          <p className="mt-3 max-w-2xl text-xl font-semibold text-ink/80">
            A joyful, multisensory platform designed for early readers, dual-language classrooms, and parents.
          </p>
        </div>

        {/* 🌟 The Main Gate: Choose Try or Login */}
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-ink mb-6">
            Choose how you would like to get started:
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 text-left">
            {/* Option 1: Try It Out (Demo) */}
            <div className="card group relative flex flex-col justify-between p-7 border-2 border-teal/40 hover:border-teal transition hover:-translate-y-1 hover:shadow-xl bg-white/95">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl" aria-hidden="true">🚀</span>
                  <span className="rounded-full bg-teal-light/30 px-3 py-1 font-heading text-xs font-bold text-teal-dark uppercase">
                    No Sign Up Needed
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-extrabold text-teal-dark">
                  Try It Out
                </h3>
                <p className="text-base font-semibold text-ink/75 leading-relaxed">
                  Explore Book 1 lessons, interactive syllable reading, sentence scramble puzzles, fables, and printable worksheets for free.
                </p>

                <ul className="space-y-1.5 text-xs font-bold text-ink/70 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-teal font-extrabold">✓</span> 6 Syllable Lessons & Fables
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal font-extrabold">✓</span> Tap-to-Speak & Slow Turtle Speed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal font-extrabold">✓</span> Foldable Mini-Books & Tracing Sheets
                  </li>
                </ul>
              </div>

              <Link
                href="/demo"
                className="btn btn-teal mt-6 w-full text-center group-hover:bg-teal shadow-md"
              >
                Start Free Demo →
              </Link>
            </div>

            {/* Option 2: Existing Users / Log In */}
            <div className="card group relative flex flex-col justify-between p-7 border-2 border-orange/40 hover:border-orange transition hover:-translate-y-1 hover:shadow-xl bg-white/95">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl" aria-hidden="true">🔑</span>
                  <span className="rounded-full bg-orange/20 px-3 py-1 font-heading text-xs font-bold text-orange-dark uppercase">
                    Saved Progress
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-extrabold text-orange-dark">
                  Log In
                </h3>
                <p className="text-base font-semibold text-ink/75 leading-relaxed">
                  Continue your reading journey where you left off, watch your magical tree sprout leaves and apples, and print completion diplomas.
                </p>

                <ul className="space-y-1.5 text-xs font-bold text-ink/70 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-dark font-extrabold">✓</span> Continue Where You Left Off
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-dark font-extrabold">✓</span> Magical Growing Tree Progress
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-dark font-extrabold">✓</span> Printable Achievement Diplomas
                  </li>
                </ul>
              </div>

              <Link
                href="/login"
                className="btn btn-orange mt-6 w-full text-center group-hover:bg-orange shadow-md"
              >
                Log In to Account →
              </Link>
            </div>
          </div>
        </div>

        {/* Video Overview Section */}
        <div className="mt-16 w-full max-w-2xl">
          <p className="font-heading text-xl font-bold text-ink mb-3">
            🎥 Watch a 2-minute overview of our platform
          </p>
          <VideoCard title="Platform overview" lang="en" />
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-4 w-full max-w-4xl text-center">
          <div className="rounded-2xl bg-white/90 p-4 shadow-soft border border-trunk/30">
            <span className="text-3xl">🔤</span>
            <h4 className="mt-2 font-heading text-base font-bold text-teal-dark">Método Silábico</h4>
            <p className="mt-1 text-xs text-ink/70">Break words into color-coded syllables to build reading fluency.</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4 shadow-soft border border-trunk/30">
            <span className="text-3xl">🧩</span>
            <h4 className="mt-2 font-heading text-base font-bold text-orange-dark">Sentence Puzzles</h4>
            <p className="mt-1 text-xs text-ink/70">Hands-on word scramble game to master Spanish grammar.</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4 shadow-soft border border-trunk/30">
            <span className="text-3xl">🖨️</span>
            <h4 className="mt-2 font-heading text-base font-bold text-teal-dark">Printable Packs</h4>
            <p className="mt-1 text-xs text-ink/70">Foldable 8-page mini-books, tracing sheets & flashcards.</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4 shadow-soft border border-trunk/30">
            <span className="text-3xl">🌳</span>
            <h4 className="mt-2 font-heading text-base font-bold text-orange-dark">Growing Tree</h4>
            <p className="mt-1 text-xs text-ink/70">Brote’s tree grows blossoms and apples as kids read!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
