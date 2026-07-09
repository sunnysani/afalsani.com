import { profile } from '@data/portfolio'
import { Reveal } from '@components/Reveal'
import { SectionHeading } from '@components/SectionHeading'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <SectionHeading index="01" label="About" title="A bit about me" />
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-16">
        {/* Portrait — the human anchor */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-xs md:mx-0">
            {/* Soft accent halo behind the frame */}
            <div
              aria-hidden
              className="absolute -inset-2 rounded-xl bg-gradient-to-br from-primary/25 via-transparent to-primary/5 blur-md"
            />
            <div className="relative overflow-hidden rounded-lg border border-border-strong">
              <img
                src={profile.portrait}
                alt={profile.name}
                className="block aspect-square w-full object-cover"
              />
            </div>
            <p className="relative mt-3 text-sm text-faint">{profile.location}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed">
            {profile.intro}
          </p>

          <div className="mt-8">
            <p className="label">What I'm aiming for</p>
            <ul className="mt-4 space-y-3">
              {profile.aiming.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Toolbox — the stack at a glance, grouped so it scans in seconds */}
      <Reveal delay={80} className="mt-14 md:mt-20">
        <p className="label">Toolbox</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {profile.skills.map((group) => (
            <div
              key={group.group}
              className="rounded-lg border border-border bg-surface/50 p-5 transition-colors hover:border-border-strong"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                {group.group}
              </p>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
