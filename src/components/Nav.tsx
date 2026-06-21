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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape, and lock body scroll while it's open.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

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
        scrolled || menuOpen
          ? 'border-b border-border bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          aria-label={`${profile.name} — home`}
          className="group flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
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
          className="hidden rounded-full border border-border-strong px-4 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary md:inline-flex"
        >
          Get in touch
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="-mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-primary md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-border bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-96 border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`block rounded-md px-2 py-2.5 text-base transition-colors ${
                  active === link.id
                    ? 'text-foreground'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setMenuOpen(false)}
              className="inline-flex rounded-full border border-border-strong px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
