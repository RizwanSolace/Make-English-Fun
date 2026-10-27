"use client";

type Props = {
  completed: number;
  total: number;
};

export default function GrowingTree({ completed, total }: Props) {
  const ratio = total > 0 ? Math.min(1, completed / total) : 0;
  const level = ratio === 0 ? 1 : ratio < 0.3 ? 2 : ratio < 0.6 ? 3 : ratio < 0.9 ? 4 : 5;

  const levelTitles = [
    "",
    "🌱 Semilla / Sprout (Level 1)",
    "🌿 Brote Fuerte / Sapling (Level 2)",
    "🌳 Árbol Verde / Green Tree (Level 3)",
    "🌸 Árbol Florido / Flowering Tree (Level 4)",
    "🍎 Árbol Dorado / Master Reader Tree (Level 5)",
  ];

  return (
    <div className="card p-6 text-center bg-gradient-to-b from-[#E6F8FA] via-white to-[#FFF8E7] border-2 border-teal/20 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-teal-dark/10 px-3 py-1 font-heading text-xs font-bold text-teal-dark uppercase tracking-wider">
          El Árbol de Lectura de Brote
        </span>
        <span className="font-heading text-sm font-bold text-orange-dark">
          {levelTitles[level]}
        </span>
      </div>

      <div className="relative mx-auto my-4 flex h-48 w-48 items-center justify-center">
        {/* SVG Tree Stages */}
        <svg viewBox="0 0 160 160" width="180" height="180" className="drop-shadow-md">
          {/* Soil Mound */}
          <ellipse cx="80" cy="142" rx="60" ry="14" fill="#C5AFA0" />
          <ellipse cx="80" cy="140" rx="54" ry="10" fill="#9B7861" />

          {/* Level 1: Tiny Sprout */}
          {level === 1 && (
            <g className="animate-float">
              <path d="M80 140 Q78 120 74 110" stroke="#48BB78" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M74 110 Q60 100 70 95 Q80 105 74 110" fill="#68D391" stroke="#38A169" strokeWidth="2" />
              <path d="M76 115 Q90 105 84 100 Q74 110 76 115" fill="#68D391" stroke="#38A169" strokeWidth="2" />
            </g>
          )}

          {/* Level 2: Growing Sapling */}
          {level === 2 && (
            <g className="animate-float">
              <path d="M80 140 Q79 110 75 90" stroke="#795548" strokeWidth="7" strokeLinecap="round" fill="none" />
              {/* Leaves */}
              <circle cx="65" cy="85" r="16" fill="#68D391" />
              <circle cx="85" cy="80" r="18" fill="#48BB78" />
              <circle cx="75" cy="65" r="15" fill="#38A169" />
            </g>
          )}

          {/* Level 3: Full Canopy Tree */}
          {level >= 3 && (
            <g>
              {/* Trunk */}
              <path d="M75 140 L76 95 L84 95 L85 140 Z" fill="#6D4C41" stroke="#4E342E" strokeWidth="2" />
              <path d="M77 105 Q65 95 55 90" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M83 100 Q95 90 105 85" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" fill="none" />

              {/* Foliage Clouds */}
              <circle cx="55" cy="75" r="24" fill="#48BB78" opacity="0.9" />
              <circle cx="105" cy="72" r="24" fill="#48BB78" opacity="0.9" />
              <circle cx="80" cy="55" r="30" fill="#38A169" />
              <circle cx="65" cy="65" r="20" fill="#68D391" opacity="0.8" />
              <circle cx="95" cy="65" r="20" fill="#68D391" opacity="0.8" />

              {/* Level 4: Flowers */}
              {level >= 4 && (
                <g>
                  <circle cx="60" cy="60" r="4" fill="#FFB6C1" />
                  <circle cx="98" cy="62" r="4" fill="#FFB6C1" />
                  <circle cx="78" cy="45" r="4" fill="#FFB6C1" />
                  <circle cx="75" cy="78" r="4" fill="#FFB6C1" />
                  <circle cx="110" cy="80" r="3.5" fill="#FF69B4" />
                </g>
              )}

              {/* Level 5: Golden Apples & Sparkles */}
              {level === 5 && (
                <g className="animate-pulse">
                  <circle cx="58" cy="75" r="6" fill="#F56565" stroke="#C53030" strokeWidth="1.5" />
                  <circle cx="100" cy="75" r="6" fill="#F56565" stroke="#C53030" strokeWidth="1.5" />
                  <circle cx="82" cy="65" r="7" fill="#ECC94B" stroke="#D69E2E" strokeWidth="1.5" />
                  <text x="79" y="32" fontSize="16" fill="#ECC94B">✨</text>
                  <text x="40" y="55" fontSize="14" fill="#ECC94B">⭐</text>
                  <text x="115" y="55" fontSize="14" fill="#ECC94B">⭐</text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      <p className="font-heading text-lg font-bold text-ink">
        {completed} of {total} activities finished!
      </p>
      <p className="mt-1 text-xs font-semibold text-ink/70">
        Every story read and exercise solved helps Brote’s reading tree blossom! 🌳
      </p>
    </div>
  );
}

