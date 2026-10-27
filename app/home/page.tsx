"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BadgeCollection from "@/components/BadgeCollection";
import Brote from "@/components/Brote";
import CertificateModal from "@/components/CertificateModal";
import GrowingTree from "@/components/GrowingTree";
import ProgressBar from "@/components/ProgressBar";
import TreeBackground from "@/components/TreeBackground";
import { totalActivities } from "@/data/fables";
import { isAuthed, readLast, setAuth, useProgress } from "@/lib-progress";

export default function DashboardPage() {
  const router = useRouter();
  const { done, ready } = useProgress();
  const [checked, setChecked] = useState(false);
  const [last, setLast] = useState<{ label: string; href: string } | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/login");
      return;
    }
    setLast(readLast());
    setChecked(true);
  }, [router]);

  if (!checked || !ready) {
    return <p className="p-10 text-center font-heading text-xl">Loading…</p>;
  }

  const completed = Object.values(done).filter(Boolean).length;

  return (
    <section className="relative overflow-hidden">
      <TreeBackground className="opacity-60" />
      <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-12 space-y-8">
        {/* Header with Mascot */}
        <div className="flex flex-col items-center text-center">
          <Brote size={96} className="animate-float" />
          <h1 className="mt-2 text-5xl font-extrabold">Welcome back</h1>
          <p className="mt-1 text-xl font-semibold text-teal-dark">¡Hola de nuevo!</p>
        </div>

        {/* 1. Magical Growing Tree Progress */}
        <GrowingTree completed={completed} total={totalActivities} />

        {/* 2. Main Continue & Quick Launch Card */}
        <div className="card space-y-6 p-6">
          <ProgressBar done={completed} total={totalActivities} label="Fables & Activities Progress" />

          <div>
            <h2 className="font-heading text-2xl font-bold">Continue where you left off</h2>
            <p className="mt-1 text-ink/80">
              {last ? last.label : "You haven't started yet. Pick a book to begin."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={last ? last.href : "/demo"} className="btn btn-orange w-full sm:w-auto">
                {last ? "Continue Reading →" : "Choose a book"}
              </Link>
              <button
                type="button"
                onClick={() => setShowCertificate(true)}
                className="btn btn-teal w-full sm:w-auto !text-base"
              >
                🎓 Print Diploma / Certificate
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/demo/book-1" className="btn btn-teal !text-lg">
              Book 1 (Lessons 1–6)
            </Link>
            <Link href="/demo/fables" className="btn btn-teal !text-lg">
              Fables (Stories & Quizzes)
            </Link>
          </div>
        </div>

        {/* 3. Sticker Collection / Badges */}
        <BadgeCollection completedCount={completed} />

        {/* Certificate Modal */}
        <CertificateModal
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
        />

        {/* Logout */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setAuth(false);
              router.push("/");
            }}
            className="font-bold text-teal-dark underline underline-offset-4 hover:text-orange-dark"
          >
            Log out
          </button>
        </div>
      </div>
    </section>
  );
}
