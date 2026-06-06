/**
 * Monogram mark — an "N" whose diagonal carries the single accent stroke.
 * Reused as the favicon (see public/favicon.svg). `currentColor` drives the
 * uprights so it inherits text color; the diagonal stays brand pink.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.2}
    >
      <path d="M7 25V8" stroke="currentColor" />
      <path d="M25 24V7" stroke="currentColor" />
      <path d="M7 8l18 16" stroke="var(--color-primary)" />
    </svg>
  )
}
