import { useEffect, useRef } from 'react'
import { profile } from '@data/portfolio'

type Props = {
  open: boolean
  onClose: () => void
}

export function ResumeModal({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="overlay-in fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Résumé"
    >
      <div
        className="panel-in flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-bg-soft shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold tracking-tight">Résumé</h3>
          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              download
              className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Download
            </a>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary sm:h-9 sm:w-9"
            >
              ✕
            </button>
          </div>
        </div>
        <object
          data={`${profile.resumeUrl}#view=FitH`}
          type="application/pdf"
          className="min-h-0 flex-1 bg-bg"
          aria-label="Résumé PDF"
        >
          {/* Fallback for browsers/mobile that can't inline-render PDFs */}
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-muted">Your browser can't display the PDF inline.</p>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white"
            >
              Open résumé in a new tab →
            </a>
          </div>
        </object>
      </div>
    </div>
  )
}
