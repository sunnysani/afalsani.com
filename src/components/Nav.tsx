import { useEffect, useState } from 'react'
import { profile } from '@data/portfolio'
import { LogoMark } from '@components/Logo'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: mark the section currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          aria-label={`${profile.name} — home`}
          className="group flex items-center gap-2.5"
        >
          <LogoMark className="h-6 w-6 text-foreground" />
          <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`text-sm underline-offset-8 transition-colors ${
                  active === link.id
                    ? 'text-foreground underline decoration-primary decoration-2'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-border-strong px-4 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
