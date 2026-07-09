import { useState } from 'react'
import { profile } from '@data/portfolio'
import { Reveal } from '@components/Reveal'
import { ResumeModal } from '@components/ResumeModal'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-5xl overflow-hidden px-6 py-28 text-center md:py-40"
    >
      {/* Closing glow — mirrors the hero so the page bookends warmly */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #ff2563 0%, transparent 70%)' }}
      />
      <Reveal>
        <span className="label justify-center">Contact</span>
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          {profile.closing}
        </h2>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted">
          Open to roles, collaborations, or a good conversation. The inbox is always on.
        </p>

        <div className="mx-auto mt-10 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
          <button
            onClick={copyEmail}
            className="btn-glow group inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 sm:px-7"
          >
            <span className="truncate">{copied ? 'Copied to clipboard' : profile.email}</span>
            <span aria-hidden className="shrink-0 opacity-80">
              {copied ? '✓' : '⧉'}
            </span>
          </button>
          <button
            onClick={() => setResumeOpen(true)}
            className="rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary sm:px-7"
          >
            View résumé
          </button>
        </div>

        <p className="mt-8 text-sm text-faint">
          or find me on{' '}
          <a
            href={profile.socials[0].href}
            target="_blank"
            rel="noreferrer"
            className="text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            LinkedIn
          </a>
        </p>
      </Reveal>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <span className="text-sm text-faint">
          Built in {profile.location.split(',')[0]} · © {new Date().getFullYear()}{' '}
          {profile.name}
        </span>
        <ul className="flex items-center gap-6">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
