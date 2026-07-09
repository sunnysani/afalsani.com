import { useEffect, useRef, useState } from 'react'
import type { Project } from '@data/portfolio'
import { ShotImage } from '@components/ShotImage'

type Props = {
  projects: Project[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

const iconBtn =
  'flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary sm:h-9 sm:w-9'

export function ProjectModal({ projects, index, onClose, onIndex }: Props) {
  const open = index !== null
  const project = open ? projects[index] : null
  const [shot, setShot] = useState(0)
  const [ratios, setRatios] = useState<Record<number, number>>({})
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Reset to the first screenshot whenever the project changes.
  useEffect(() => setShot(0), [index])

  // Probe each shot's aspect ratio so the stage can fit the set's orientation.
  // Placeholder shots (no src) are assumed wide.
  useEffect(() => {
    if (!open || !project) return
    setRatios({})
    project.shots.forEach((s, i) => {
      if (!s.src) {
        setRatios((r) => ({ ...r, [i]: 16 / 9 }))
        return
      }
      const img = new Image()
      img.onload = () =>
        setRatios((r) => ({ ...r, [i]: img.naturalWidth / img.naturalHeight }))
      img.src = s.src
    })
  }, [open, index, project])

  useEffect(() => {
    if (!open || !project) return

    const prevFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const shots = project.shots.length

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowRight') return setShot((s) => (s + 1) % shots)
      if (e.key === 'ArrowLeft') return setShot((s) => (s - 1 + shots) % shots)
      if (e.key === 'Tab') {
        // Focus trap.
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const list = Array.from(focusable)
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [open, index, project, onClose])

  if (!open || !project) return null

  const current = project.shots[shot]
  const go = (dir: number) => onIndex((index! + dir + projects.length) % projects.length)

  // Size the stage to the set: all wide → short 16:9; all tall → portrait;
  // mixed (or still loading) → a stable fixed height so swapping never jumps.
  const known = project.shots.map((_, i) => ratios[i]).filter((r): r is number => r != null)
  const allLoaded = known.length === project.shots.length
  const mode: 'wide' | 'tall' | 'mixed' = !allLoaded
    ? 'mixed'
    : known.every((r) => r >= 1)
      ? 'wide'
      : known.every((r) => r < 1)
        ? 'tall'
        : 'mixed'
  const stageClass =
    mode === 'wide' ? 'aspect-[16/9]' : mode === 'tall' ? 'max-h-[72vh]' : 'h-[58vh]'
  const imgClass =
    mode === 'tall' ? 'max-h-[72vh] w-auto object-contain' : 'h-full w-full object-contain'
  const links =
    project.links ??
    (project.href && project.href !== '#'
      ? [{ label: 'Visit project', href: project.href }]
      : [])

  return (
    <div
      className="overlay-in fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} showcase`}
    >
      <div
        ref={panelRef}
        className="panel-in relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-border bg-bg-soft shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — controls share the top row with the eyebrow so the title
            below always gets the panel's full width and never wraps against them */}
        <div className="shrink-0 border-b border-border px-6 py-4 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <p className="min-w-0 truncate text-xs text-muted">{project.context}</p>
            <div className="flex shrink-0 items-center gap-2">
              <button onClick={() => go(-1)} aria-label="Previous project" className={iconBtn}>
                ‹
              </button>
              <button onClick={() => go(1)} aria-label="Next project" className={iconBtn}>
                ›
              </button>
              <button ref={closeRef} onClick={onClose} aria-label="Close" className={iconBtn}>
                ✕
              </button>
            </div>
          </div>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
            <span className="text-xs text-faint">{project.year}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Gallery — fixed-height stage so switching aspects doesn't resize the modal */}
          <div className="bg-bg p-4 sm:p-6">
            <button
              type="button"
              onClick={() => setShot((s) => (s + 1) % project.shots.length)}
              disabled={project.shots.length <= 1}
              aria-label="Next screenshot"
              className={`flex w-full items-center justify-center overflow-hidden rounded-md border border-border-strong disabled:cursor-default ${stageClass}`}
            >
              {current.src ? (
                <img
                  src={current.src}
                  alt={current.caption}
                  loading="lazy"
                  className={imgClass}
                />
              ) : (
                <div className="aspect-video w-full">
                  <ShotImage shot={current} />
                </div>
              )}
            </button>

            {project.shots.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {project.shots.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setShot(i)}
                    aria-label={`Show ${s.caption}`}
                    aria-current={i === shot}
                    className={`h-14 w-20 shrink-0 overflow-hidden rounded border transition ${
                      i === shot
                        ? 'border-primary'
                        : 'border-border opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ShotImage shot={s} />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 text-center text-xs text-faint">{current.caption}</p>
          </div>

          {/* Meta */}
          <div className="border-t border-border px-6 py-6 sm:px-7">
            <p className="max-w-prose leading-relaxed text-muted">{project.detail}</p>

            {(project.role || project.impact) && (
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {project.role && (
                  <div>
                    <dt className="label">Role</dt>
                    <dd className="mt-1 text-foreground">{project.role}</dd>
                  </div>
                )}
                {project.impact && (
                  <div>
                    <dt className="label">Impact</dt>
                    <dd className="mt-1 text-foreground">{project.impact}</dd>
                  </div>
                )}
              </dl>
            )}

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
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

        {/* Sticky action bar — stays pinned while the body scrolls */}
        {links.length > 0 && (
          <div className="flex shrink-0 flex-wrap gap-3 border-t border-border bg-bg-soft px-6 py-4 sm:px-7">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
                  i === 0
                    ? 'bg-primary text-white'
                    : 'border border-border-strong text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
