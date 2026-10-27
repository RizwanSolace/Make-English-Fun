"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Brote from "@/components/Brote";
import TreeBackground from "@/components/TreeBackground";
import { setAuth } from "@/lib-progress";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setAuth(true); // mock auth: any non-empty values work
    router.push("/home");
  };

  return (
    <section className="relative overflow-hidden">
      <TreeBackground className="opacity-60" />
      <div className="relative mx-auto flex max-w-md flex-col items-center px-4 pb-24 pt-14">
        <Brote size={96} className="animate-float" />
        <h1 className="mt-2 text-4xl font-extrabold">Welcome back</h1>
        <p className="mb-6 mt-1 text-lg font-semibold">Log in to continue reading</p>

        <form onSubmit={submit} noValidate className="card w-full space-y-5 p-6">
          <div>
            <label htmlFor="email" className="mb-1 block font-heading text-lg font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error && !email.trim()}
              className="min-h-[48px] w-full rounded-xl border-2 border-trunk/60 bg-white px-4 text-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block font-heading text-lg font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!error && !password.trim()}
              className="min-h-[48px] w-full rounded-xl border-2 border-trunk/60 bg-white px-4 text-lg"
            />
          </div>

          <p role="alert" className="min-h-[1.5rem] text-sm font-bold text-red-700">
            {error}
          </p>

          <button type="submit" className="btn btn-orange w-full">
            Log in
          </button>
          <p className="text-center text-sm text-ink/70">Prototype only: any email and password will work.</p>
        </form>

        <Link href="/" className="mt-6 font-bold text-teal-dark underline underline-offset-4">
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
