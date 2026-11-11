import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export type IconName = 'arrow' | 'chevron' | 'phone' | 'document' | 'help' | 'chat' | 'book' | 'check' | 'close' | 'menu' | 'mail' | 'shield' | 'external' | 'login' | 'alarm' | 'sliders' | 'personal-items' | 'calendar' | 'people' | 'star' | 'download' | 'clock' | 'pin' | 'edit' | 'share' | 'file'

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    phone: <path d="m8 3-3 1C2 5 4 12 8 16s11 6 12 3l1-3-5-2-2 2c-2-1-5-4-6-6l2-2-2-5Z" />,
    document: <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01" /></>,
    chat: <><path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0Z" /><path d="M8 10h8M8 14h5" /></>,
    book: <><path d="M12 5v15M3 4c4-1 6-1 9 1 3-2 5-2 9-1v14c-4-1-6-1-9 2-3-3-5-3-9-2V4Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    download: <path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    edit: <><path d="M12 5H5v14h14v-7M10 14l1-4 8-8 3 3-8 8-4 1Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m2-15a3 3 0 0 1 0 6m4 9v-2a4 4 0 0 0-3-4" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    share: <><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" /><path d="m16 6-4-4-4 4m4-4v14" /></>,
    file: <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M13 2v7h7" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    alarm: <><path d="M6 15V9a6 6 0 0 1 12 0v6l2 3H4l2-3ZM10 21h4M12 2V1M3 5 1 3M21 5l2-2" /><circle cx="12" cy="10" r="2" /></>,
    sliders: <><path d="M5 3v8M5 15v6M12 3v2M12 9v12M19 3v11M19 18v3" /><circle cx="5" cy="13" r="2" /><circle cx="12" cy="7" r="2" /><circle cx="19" cy="16" r="2" /></>,
    'personal-items': <><rect x="3" y="7" width="18" height="14" rx="3" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M7 11v6M17 11v6M10 14l1.5 1.5L14 13" /></>,
    external: <><path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></>,
    login: <><path d="m10 7 5 5-5 5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></>,
  }
  return <svg viewBox={name === 'chevron' ? '6 8 12 8' : '0 0 24 24'} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>
}

export function ButtonLink({ href, children, variant = 'primary', className = '', arrow = true }: { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'white'; className?: string; arrow?: boolean }) {
  return <a href={href} className={`button button-${variant} ${className}`}>{children}{arrow && <Icon name="arrow" className="button-arrow" />}</a>
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = element.getBoundingClientRect()
    // Only hide content below the current viewport; the first screen is always immediately readable.
    if (rect.top < window.innerHeight) return
    element.classList.add('reveal-pending')
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.remove('reveal-pending'); observer.disconnect() }
    }, { threshold: 0.08 })
    observer.observe(element)
    return () => { observer.disconnect(); element.classList.remove('reveal-pending') }
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

