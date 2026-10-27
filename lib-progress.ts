"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "esr-progress";
const LAST = "esr-last";
const AUTH = "esr-auth";

function read(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

/** Progress ticks per activity id, persisted in localStorage. */
export function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDone(read());
    setReady(true);
  }, []);

  const set = useCallback((id: string, value: boolean) => {
    setDone((prev) => {
      const next = { ...prev, [id]: value };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable: keep in-memory only */
      }
      return next;
    });
  }, []);

  return { done, set, ready };
}

export function saveLast(label: string, href: string) {
  try {
    localStorage.setItem(LAST, JSON.stringify({ label, href }));
  } catch {
    /* ignore */
  }
}

export function readLast(): { label: string; href: string } | null {
  try {
    const raw = localStorage.getItem(LAST);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuth(on: boolean) {
  try {
    if (on) localStorage.setItem(AUTH, "1");
    else localStorage.removeItem(AUTH);
  } catch {
    /* ignore */
  }
}

export function isAuthed(): boolean {
  try {
    return localStorage.getItem(AUTH) === "1";
  } catch {
    return false;
  }
}

/** Speak Spanish text with the browser's built-in voices. */
export function speak(text: string, lang = "es-ES", rate = 0.85, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  if (onEnd) {
    u.onend = () => onEnd();
    u.onerror = () => onEnd();
  }
  window.speechSynthesis.speak(u);
}

/** Cancel any active speech */
export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
