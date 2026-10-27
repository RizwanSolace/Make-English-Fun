type Props = { size?: number; className?: string; cap?: boolean };

/** Original mascot: "Brote", a smiling sprout. */
export default function Brote({ size = 120, className = "", cap = true }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Brote, a friendly sprout mascot"
      className={className}
    >
      {/* leaves */}
      <g className="origin-[60px_44px] animate-sway">
        <path d="M60 44 C38 40 28 22 30 12 C48 12 62 24 60 44Z" fill="#6AD6DE" stroke="#0E7C8F" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M60 44 C82 40 92 22 90 12 C72 12 58 24 60 44Z" fill="#FDE08B" stroke="#B7791F" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      {/* stem */}
      <path d="M60 52 L60 40" stroke="#0E7C8F" strokeWidth="5" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="60" cy="82" rx="30" ry="29" fill="#F97A2D" stroke="#7C2D12" strokeWidth="3" />
      <ellipse cx="50" cy="70" rx="9" ry="6" fill="#FFFFFF" opacity="0.35" />
      {/* eyes */}
      <circle cx="49" cy="80" r="5.5" fill="#fff" stroke="#7C2D12" strokeWidth="2" />
      <circle cx="71" cy="80" r="5.5" fill="#fff" stroke="#7C2D12" strokeWidth="2" />
      <circle cx="50.5" cy="81" r="2.4" fill="#1F2937" />
      <circle cx="72.5" cy="81" r="2.4" fill="#1F2937" />
      {/* cheeks + smile */}
      <circle cx="42" cy="92" r="4" fill="#FFB319" opacity="0.7" />
      <circle cx="78" cy="92" r="4" fill="#FFB319" opacity="0.7" />
      <path d="M52 94 Q60 103 68 94" stroke="#7C2D12" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* graduation cap */}
      {cap && (
        <g>
          <path d="M40 58 L60 49 L80 58 L60 67Z" fill="#1F2937" />
          <path d="M50 62 L50 68 Q60 73 70 68 L70 62" fill="#374151" />
          <path d="M80 58 L84 70" stroke="#FFB319" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="84" cy="72" r="2.8" fill="#FFB319" />
        </g>
      )}
    </svg>
  );
}
