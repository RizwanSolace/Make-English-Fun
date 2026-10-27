type Props = { done: number; total: number; label?: string };

export default function ProgressBar({ done, total, label = "Activities completed" }: Props) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between text-sm font-bold">
        <span>{label}</span>
        <span>
          {done} / {total}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label}
        className="h-3 w-full overflow-hidden rounded-full bg-trunk/40"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal to-orange transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
