import { useRouteError, Link } from 'react-router';
import { LuTriangleAlert, LuRefreshCw } from 'react-icons/lu';
import { useUI } from '../../lib/ui-strings';
import { buttonClass } from '../ui/primitives';

export function ErrorBoundary() {
  const error = useRouteError() as { message?: string } | undefined;
  const ui = useUI();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg p-6 text-ink">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl bg-surface-2 text-ink">
          <LuTriangleAlert size={28} aria-hidden="true" />
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-tight">{ui.error.title}</h1>
        <p className="mt-4 text-ink-muted">{error?.message || ui.error.fallback}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => window.location.reload()} className={buttonClass('primary')}>
            <LuRefreshCw size={16} aria-hidden="true" />
            {ui.error.refresh}
          </button>
          <Link to="/" className={buttonClass('secondary')}>
            {ui.error.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
