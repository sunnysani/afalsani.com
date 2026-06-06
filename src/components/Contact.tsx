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
      className="relative mx-auto max-w-5xl px-6 py-28 text-center md:py-40"
    >
      <Reveal>
        <span className="label justify-center">Contact</span>
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          {profile.closing}
        </h2>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted">
          Open to roles, collaborations, or a good conversation. The inbox is always on.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            {copied ? 'Copied to clipboard' : profile.email}
            <span aria-hidden className="opacity-80">
              {copied ? '✓' : '⧉'}
            </span>
          </button>
          <button
            onClick={() => setResumeOpen(true)}
            className="rounded-full border border-border-strong px-7 py-3.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            View résumé
          </button>
        </div>
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
