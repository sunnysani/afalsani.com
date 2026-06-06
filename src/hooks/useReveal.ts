import { useEffect, useRef } from 'react'

/**
 * One-shot scroll reveal. Adds `is-visible` to the element once it enters the
 * viewport, then stops observing. Pair with the `.reveal` class in index.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delay) el.style.transitionDelay = `${delay}ms`
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}
