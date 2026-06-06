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
            <div className="overflow-hidden rounded-lg border border-border">
              <img
                src={profile.portrait}
                alt={profile.name}
                className="block aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-faint">{profile.location}</p>
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
    </section>
  )
}
