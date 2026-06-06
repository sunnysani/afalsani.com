import { profile } from '@data/portfolio'

/**
 * Hero with a staggered on-load reveal. Each line uses an inline animation-delay
 * so they cascade in once, the highest-impact motion moment on the page.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-16"
    >
      {/* Soft ambient accent glow — the hero's single accent moment */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #ff2563 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <p className="hero-line label" style={{ animationDelay: '0ms' }}>
          {profile.location}
        </p>

        <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          <span className="hero-line block" style={{ animationDelay: '80ms' }}>
            {profile.name.split(' ')[0]}
          </span>
          <span className="hero-line block" style={{ animationDelay: '160ms' }}>
            {profile.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>

        <p
          className="hero-line mt-7 max-w-xl text-lg leading-relaxed text-muted"
          style={{ animationDelay: '260ms' }}
        >
          <span className="text-foreground">{profile.role}.</span> {profile.tagline}
        </p>

        {/* Credibility line — surfaced in the first viewport */}
        <p
          className="hero-line mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint"
          style={{ animationDelay: '320ms' }}
        >
          <span>
            Currently at <span className="text-muted">{profile.current}</span>
          </span>
          <span aria-hidden>·</span>
          <span>
            previously{' '}
            <span className="text-muted">{profile.past.join(', ')}</span>
          </span>
        </p>

        <div
          className="hero-line mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '400ms' }}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            View work
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border-strong px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="hero-bob text-xs text-faint">scroll ↓</span>
      </div>
    </section>
  )
}
