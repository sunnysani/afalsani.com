import { useState } from 'react'
import { projects } from '@data/portfolio'
import { Reveal } from '@components/Reveal'
import { SectionHeading } from '@components/SectionHeading'
import { ShotImage } from '@components/ShotImage'
import { ProjectModal } from '@components/ProjectModal'

function StackPills({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-border px-3 py-1 text-xs text-faint"
        >
          {tech}
        </li>
      ))}
    </ul>
  )
}

export function Projects() {
  const [open, setOpen] = useState<number | null>(null)

  // Keep each item's index into the source array so the modal can navigate the
  // full set. Featured items are authored first, so order is preserved.
  const indexed = projects.map((p, i) => ({ p, i }))
  const featured = indexed.filter((x) => x.p.featured)
  const compact = indexed.filter((x) => !x.p.featured)

  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <SectionHeading index="03" label="Selected Work" title="Things I've built" />

      {/* Featured — alternating image / text, the visual climax of the scroll */}
      <div className="space-y-16 md:space-y-28">
        {featured.map(({ p, i }, idx) => {
          const flip = idx % 2 === 1
          return (
            <article
              key={p.slug}
              className="grid items-center gap-7 md:grid-cols-2 md:gap-12"
            >
              {/* Screenshot — reveals a touch after the text, so the work "arrives" */}
              <Reveal delay={140} className={flip ? 'md:order-2' : ''}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open ${p.title} showcase`}
                  className="group block w-full overflow-hidden rounded-lg border border-border transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_48px_-12px_rgba(255,37,99,0.28)]"
                >
                  <div className="aspect-[16/10] w-full bg-bg-soft transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <ShotImage shot={p.shots[0]} fit="contain" />
                  </div>
                </button>
              </Reveal>

              <Reveal className={flip ? 'md:order-1' : ''}>
                <p className="text-sm text-muted">
                  {p.context} <span className="text-faint">· {p.year}</span>
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{p.problem}</p>
                {p.status && (
                  <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary-dim px-3 py-1 text-xs font-medium text-primary-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {p.status}
                  </span>
                )}
                <div className="mt-5">
                  <StackPills stack={p.stack} />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  View showcase
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </Reveal>
            </article>
          )
        })}
      </div>

      {/* Compact grid — supporting work */}
      <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
        {compact.map(({ p, i }, idx) => (
          <Reveal as="article" key={p.slug} delay={idx * 70}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group flex h-full w-full flex-col gap-4 bg-surface p-6 text-left transition-colors duration-300 hover:bg-surface-hover"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-md border border-border-strong bg-bg-soft">
                <ShotImage shot={p.shots[0]} fit="contain" />
              </div>
              <div>
                <p className="text-xs text-muted">{p.context}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {p.title}
                </h3>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <StackPills stack={p.stack} />
                <span
                  aria-hidden
                  className="text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                >
                  →
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <ProjectModal
        projects={projects}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </section>
  )
}
