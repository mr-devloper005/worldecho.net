'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/*
  Lightweight scroll-reveal wrapper.

  - Renders children immediately and visible, so content is never hidden when
    JavaScript is disabled or fails (the start/hidden state is only "armed" on
    the client via the `is-armed` class added in useEffect).
  - Uses a single IntersectionObserver to add `is-revealed` once the element
    scrolls into view, then unobserves (one-shot reveal).
  - `delay` staggers grouped items (cards in a grid) for a refined cascade.
  - Honors prefers-reduced-motion through CSS in editable-global.css.
*/
export function EditableReveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.classList.add('is-armed')

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('is-revealed')
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`editable-reveal ${className}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
