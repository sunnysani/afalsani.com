import type { Shot } from '@data/portfolio'

/**
 * Renders a screenshot when `src` is set, otherwise an on-theme muted
 * placeholder (a dark hatched frame with the caption), so empty slots read as
 * intentional rather than broken. Caller controls aspect/rounding via a wrapper.
 */
export function ShotImage({
  shot,
  fit = 'cover',
}: {
  shot: Shot
  fit?: 'cover' | 'contain'
}) {
  if (shot.src) {
    return (
      <img
        src={shot.src}
        alt={shot.caption}
        loading="lazy"
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
      />
    )
  }
  // On-theme placeholder — muted, not a bright white slab. Reads as an
  // intentional empty state until a real `src` is added.
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-surface-hover">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 10px, transparent 10px 20px)',
        }}
      />
      <span className="relative flex items-center gap-2 px-3 text-center text-xs font-medium text-faint">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
          <path d="M21 16l-5-5-7 7" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {shot.caption}
      </span>
    </div>
  )
}
