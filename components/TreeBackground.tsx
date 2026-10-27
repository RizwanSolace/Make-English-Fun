/**
 * Soft decorative tree made of inline SVG (trunk + pastel leaves).
 * Sits behind content; aria-hidden and low contrast so text stays readable.
 */
export default function TreeBackground({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full select-none ${className}`}
    >
      {/* trunk */}
      <path
        d="M560 900 C575 740 585 640 575 560 C520 500 440 470 360 470 C450 450 540 480 590 530 C610 420 600 320 560 230 C620 290 650 380 640 520 C700 470 790 440 880 450 C790 480 700 520 650 580 C640 680 650 780 690 900 Z"
        fill="#C5AFA0"
        opacity="0.75"
      />
      <g opacity="0.8">
        {/* teal leaves */}
        <path d="M120 120 C260 130 330 230 300 330 C200 320 110 240 120 120Z" fill="#6AD6DE" opacity="0.8" />
        <path d="M1080 120 C940 130 870 230 900 330 C1000 320 1090 240 1080 120Z" fill="#6AD6DE" opacity="0.8" />
        <path d="M500 20 C560 60 560 160 510 220 C450 170 440 80 500 20Z" fill="#6AD6DE" opacity="0.7" />
        <path d="M1130 480 C1180 510 1180 570 1130 600 C1070 580 1060 520 1130 480Z" fill="#6AD6DE" opacity="0.8" />
        {/* yellow leaves */}
        <path d="M600 0 C690 30 700 150 620 250 C540 160 530 40 600 0Z" fill="#FDE08B" opacity="0.9" />
        <path d="M60 480 C140 440 230 470 260 540 C180 580 90 560 60 480Z" fill="#FDE08B" opacity="0.85" />
        <path d="M900 600 C1000 560 1110 620 1140 720 C1040 750 930 700 900 600Z" fill="#FDE08B" opacity="0.9" />
        {/* peach leaves */}
        <path d="M900 0 C1000 10 1060 80 1040 170 C960 160 890 100 900 0Z" fill="#F9C195" opacity="0.9" />
        <path d="M100 640 C200 600 300 640 310 740 C230 770 120 740 100 640Z" fill="#F9C195" opacity="0.9" />
        <path d="M1000 860 C1060 830 1120 860 1130 900 L1000 900Z" fill="#F9C195" opacity="0.8" />
        {/* dots */}
        <circle cx="210" cy="480" r="38" fill="#F9C195" />
        <circle cx="990" cy="470" r="38" fill="#F9C195" />
        <circle cx="270" cy="760" r="30" fill="#6AD6DE" opacity="0.7" />
        <circle cx="960" cy="40" r="34" fill="#6AD6DE" opacity="0.7" />
        <circle cx="330" cy="60" r="30" fill="#FDE08B" />
      </g>
    </svg>
  );
}
