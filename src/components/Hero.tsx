import { profile } from '@data/portfolio'

/**
 * Hero with a staggered on-load reveal. Each line uses an inline animation-delay
 * so they cascade in once, the highest-impact motion moment on the page.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-24 pt-28 sm:pt-20"
    >
      {/* Layered backdrop: blueprint grid + warm accent glow + a cool counter-glow */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #ff2563 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #6f7bff 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Availability signal — the first thing a recruiter looks for */}
        <div
          className="hero-line flex flex-wrap items-center gap-3"
          style={{ animationDelay: '0ms' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>
          <span className="label">{profile.location}</span>
        </div>

        {/* Gradient sweeps the whole name, top-left white → bottom-right accent.
            The h1 animates as one block: animated children would create
            compositing layers that break background-clip: text. */}
        <h1
          className="hero-line text-gradient mt-7 w-fit text-[2.85rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl"
          style={{ animationDelay: '100ms' }}
        >
          <span className="block">{profile.name.split(' ')[0]}</span>
          <span className="block">{profile.name.split(' ').slice(1).join(' ')}</span>
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
            Currently at <span className="font-medium text-foreground">{profile.current}</span>
          </span>
          <span aria-hidden>·</span>
          <span>
            previously <span className="text-muted">{profile.past.join(', ')}</span>
          </span>
        </p>

        <div
          className="hero-line mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '400ms' }}
        >
          <a
            href="#work"
            className="btn-glow group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            View work
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border-strong px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            View résumé
          </a>
          <a
            href="#contact"
            className="px-2 py-3 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            Get in touch
          </a>
        </div>

        {/* Proof points — scannable numbers a recruiter would otherwise dig for */}
        <ul
          className="hero-line mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-border pt-8 sm:grid-cols-4 md:mt-16"
          style={{ animationDelay: '500ms' }}
        >
          {profile.stats.map((stat) => (
            <li key={stat.label}>
              <span className="block text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 block max-w-[11rem] text-xs leading-relaxed text-faint sm:text-sm">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll cue — hidden on phones where the stats already fill the viewport */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="hero-bob text-xs text-faint">scroll ↓</span>
      </div>
    </section>
  )
}
