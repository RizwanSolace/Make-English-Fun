"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Brote from "./Brote";
import { isAuthed, setAuth } from "@/lib-progress";

const learningLinks = [
  { href: "/demo", label: "📚 Libros (Hub)" },
  { href: "/demo/book-1", label: "🎨 Libro 1" },
  { href: "/demo/fables", label: "🦊 Fábulas" },
  { href: "/home", label: "🌳 Mi Progreso" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isAuthed());
  }, [pathname]);

  // HIDE NAVBAR on the main landing page and login page
  // so the user first chooses between "Try it out" and "Log in"
  if (pathname === "/" || pathname === "/login") {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/demo") return pathname === "/demo";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    setAuth(false);
    setAuthed(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-trunk/40 bg-white/95 backdrop-blur shadow-sm">
      <nav
        aria-label="Learning Portal"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5"
      >
        {/* Brand Link */}
        <div className="flex items-center gap-4">
          <Link
            href="/demo"
            className="flex items-center gap-2 group"
            onClick={() => setOpen(false)}
            title="Ir al Hub de Aprendizaje"
          >
            <Brote size={42} cap={false} />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-extrabold leading-none text-teal-dark group-hover:text-teal">
                Early Spanish Reading
              </span>
              <span className="text-[11px] font-bold text-orange-dark uppercase tracking-wider">
                Portal de Aprendizaje
              </span>
            </div>
          </Link>

          {/* Quick exit to landing page */}
          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-1 text-xs font-bold text-ink/50 hover:text-ink border-l border-trunk/40 pl-3 py-1"
            title="Volver a la portada principal"
          >
            ← Salir al Inicio
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light/20 text-teal-dark md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        {/* Desktop Learning Links */}
        <ul className="hidden items-center gap-1.5 md:flex">
          {learningLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 font-heading text-base font-bold transition ${
                  isActive(l.href)
                    ? "bg-teal-dark text-white shadow-soft"
                    : "text-ink hover:bg-teal-light/30"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Auth Button */}
          <li className="ml-2 pl-2 border-l border-trunk/40">
            {authed ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-red-50 hover:bg-red-100 text-red-700 px-3.5 py-1.5 text-sm font-bold transition"
              >
                🚪 Salir
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-orange-dark hover:bg-orange text-white px-4 py-2 text-sm font-bold shadow-soft transition"
              >
                🔑 Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <ul id="mobile-menu" className="space-y-1.5 border-t border-trunk/40 bg-white px-4 py-3 md:hidden animate-in fade-in">
          {learningLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`block min-h-[44px] rounded-xl px-4 py-2.5 font-heading text-lg font-bold ${
                  isActive(l.href) ? "bg-teal-dark text-white" : "hover:bg-teal-light/30"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="border-t border-trunk/30 pt-2 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-sm font-bold text-ink/60 underline"
            >
              ← Portada Principal
            </Link>
            {authed ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="text-sm font-bold text-red-700"
              >
                🚪 Salir
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-orange-dark"
              >
                🔑 Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
