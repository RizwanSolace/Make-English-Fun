"use client";

import { useState } from "react";
import { speak } from "@/lib-progress";

type Badge = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
  praise: string;
};

type Props = {
  completedCount: number;
};

export default function BadgeCollection({ completedCount }: Props) {
  const [activeBadge, setActiveBadge] = useState<Badge | null>(null);

  const badges: Badge[] = [
    {
      id: "b1",
      emoji: "🎨",
      title: "Maestro de Colores",
      subtitle: "Colors Master",
      unlocked: true,
      praise: "¡Excelente! Conoces el azul, rojo, amarillo y verde.",
    },
    {
      id: "b2",
      emoji: "🐔",
      title: "Amigo de los Animales",
      subtitle: "Animal Explorer",
      unlocked: completedCount >= 1,
      praise: "¡Guau! Conoces a la gallina, el perro y el gato.",
    },
    {
      id: "b3",
      emoji: "👨‍👩‍👧",
      title: "Corazón Familiar",
      subtitle: "Family Words",
      unlocked: completedCount >= 3,
      praise: "¡Qué lindo! Leíste sobre mamá, papá y el hermano.",
    },
    {
      id: "b4",
      emoji: "🔢",
      title: "Cuenta Estrellas",
      subtitle: "Number Counter",
      unlocked: completedCount >= 5,
      praise: "¡Uno, dos, tres! Eres un campeón con los números.",
    },
    {
      id: "b5",
      emoji: "📖",
      title: "Lector de Fábulas",
      subtitle: "Fables Reader",
      unlocked: completedCount >= 7,
      praise: "¡Fantástico! Descubriste los secretos de las fábulas.",
    },
    {
      id: "b6",
      emoji: "🏆",
      title: "Super Estrella",
      subtitle: "Master Reader",
      unlocked: completedCount >= 10,
      praise: "¡Increíble logro! Eres un súper lector en español.",
    },
  ];

  const handleBadgeClick = (badge: Badge) => {
    setActiveBadge(badge);
    if (badge.unlocked) {
      speak(badge.praise, "es-ES", 0.95);
    } else {
      speak("Sigue leyendo para desbloquear esta estampa", "es-ES", 0.9);
    }
  };

  return (
    <div className="card p-6 bg-white shadow-soft border-2 border-trunk/30">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl font-bold text-ink">
          🎖️ Colección de Estampas (Sticker Book)
        </h3>
        <span className="font-heading text-sm font-bold text-teal-dark">
          {badges.filter((b) => b.unlocked).length} / {badges.length} Desbloqueadas
        </span>
      </div>

      <p className="mt-1 text-sm font-semibold text-ink/70">
        Tap any badge to hear Brote’s cheerful encouragement!
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {badges.map((badge) => (
          <button
            key={badge.id}
            type="button"
            onClick={() => handleBadgeClick(badge)}
            className={`group flex flex-col items-center rounded-2xl p-3 text-center transition ${
              badge.unlocked
                ? "bg-leaf-yellow/30 hover:bg-leaf-yellow/70 hover:scale-105 shadow-sm border border-orange/30"
                : "bg-gray-100 opacity-50 grayscale hover:opacity-70"
            }`}
          >
            <span className="text-3xl filter drop-shadow-sm">{badge.emoji}</span>
            <span className="mt-1 font-heading text-xs font-bold leading-tight line-clamp-1">
              {badge.title}
            </span>
            <span className="text-[10px] text-ink/60">
              {badge.unlocked ? "⭐ Libre" : "🔒 Bloqueado"}
            </span>
          </button>
        ))}
      </div>

      {activeBadge && (
        <div className="mt-4 rounded-xl bg-teal-light/20 p-3 text-center animate-in fade-in">
          <p className="font-heading text-lg font-bold text-teal-dark">
            {activeBadge.emoji} {activeBadge.title} ({activeBadge.subtitle})
          </p>
          <p className="text-sm font-semibold text-ink/80 mt-0.5">
            {activeBadge.unlocked ? activeBadge.praise : "Keep reading more lessons and fables to unlock this special sticker!"}
          </p>
        </div>
      )}
    </div>
  );
}

