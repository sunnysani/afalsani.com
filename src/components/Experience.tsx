import { experiences } from '@data/portfolio'
import { Reveal } from '@components/Reveal'
import { SectionHeading } from '@components/SectionHeading'

export function Experience() {
  return (
    // Full-bleed tinted band — the one cadence break in the scroll.
    <section id="experience" className="bg-bg-soft">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <SectionHeading index="02" label="Experience" title="Where I've worked" />
        <ol className="border-t border-border">
          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.company} delay={Math.min(i, 3) * 70}>
              <div className="grid gap-2 border-b border-border py-8 md:grid-cols-[10rem_1fr] md:gap-8 md:py-10">
                <span className="flex flex-wrap items-center gap-2 self-start text-sm text-muted md:flex-col md:items-start">
                  {exp.period}
                  {exp.period.includes('Present') && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-dim px-2.5 py-0.5 text-xs font-medium text-primary-soft">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                      Now
                    </span>
                  )}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-xl font-semibold tracking-tight">{exp.role}</h3>
                    <span className="hidden text-faint sm:inline">·</span>
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1 text-lg text-foreground/90 underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    >
                      {exp.company}
                      <span
                        aria-hidden
                        className="text-sm text-faint transition-colors group-hover/link:text-primary"
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{exp.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 text-xs text-faint"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
