interface LoaderProps {
  progress: number;
}

export function Loader({ progress }: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg text-ink"
    >
      <div className="flex items-center gap-4">
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-ink font-display text-xl font-semibold text-bg">
          BM
          <span className="absolute -end-1.5 -bottom-1.5 size-4 rounded-full border-[3px] border-bg bg-coral" />
        </span>
        <span className="font-display text-3xl font-medium tracking-tight">Basel Mohamed</span>
      </div>

      <div className="mt-10 w-56">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-coral transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="eyebrow mt-3 flex justify-between text-ink-muted">
          <span>Loading</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
