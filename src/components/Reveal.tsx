import type { ReactNode } from 'react'
import { useReveal } from '@hooks/useReveal'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Wraps children in a scroll-revealed container. */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const ref = useReveal<HTMLElement>(delay)
  const Tag = as
  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
