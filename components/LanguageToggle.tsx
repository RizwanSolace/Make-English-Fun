"use client";

type Props = {
  value: "es" | "en";
  onChange: (v: "es" | "en") => void;
  label?: string;
};

export default function LanguageToggle({ value, onChange, label = "Video language" }: Props) {
  const opts: { v: "es" | "en"; text: string }[] = [
    { v: "es", text: "Español" },
    { v: "en", text: "English" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-full bg-white p-1 shadow-soft"
    >
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          onClick={() => onChange(o.v)}
          className={`min-h-[44px] rounded-full px-5 font-heading text-lg font-semibold transition ${
            value === o.v ? "bg-teal-dark text-white" : "text-ink hover:bg-teal-light/40"
          }`}
        >
          {o.text}
        </button>
      ))}
    </div>
  );
}
