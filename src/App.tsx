import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode } from 'react'
import { articles, covers, faqs, footerGroups, guideLinks, links, reviews, supportLinks } from './content'

type IconName = 'arrow' | 'chevron' | 'phone' | 'document' | 'help' | 'chat' | 'book' | 'check' | 'close' | 'menu' | 'mail' | 'shield' | 'external' | 'login'

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    phone: <path d="m8 3-3 1C2 5 4 12 8 16s11 6 12 3l1-3-5-2-2 2c-2-1-5-4-6-6l2-2-2-5Z" />,
    document: <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01" /></>,
    chat: <><path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0Z" /><path d="M8 10h8M8 14h5" /></>,
    book: <><path d="M12 5v15M3 4c4-1 6-1 9 1 3-2 5-2 9-1v14c-4-1-6-1-9 2-3-3-5-3-9-2V4Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    external: <><path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></>,
    login: <><path d="m10 7 5 5-5 5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></>,
  }
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>
}

function ButtonLink({ href, children, variant = 'primary', className = '', arrow = true }: { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'white'; className?: string; arrow?: boolean }) {
  return <a href={href} className={`button button-${variant} ${className}`}>{children}{arrow && <Icon name="arrow" className="button-arrow" />}</a>
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
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

function HeaderDropdown({ label, items }: { label: string; items: { name: string; href: string }[] }) {
  const details = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (details.current && !details.current.contains(event.target as Node)) details.current.open = false
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [])
  return <details ref={details} className="header-dropdown" onKeyDown={event => {
    if (event.key === 'Escape' && details.current) {
      details.current.open = false
      details.current.querySelector('summary')?.focus()
    }
  }}>
    <summary className="nav-link">{label}<Icon name="chevron" /></summary>
    <div className="header-dropdown-panel">{items.map(item => <a key={item.name} href={item.href} onClick={() => { if (details.current) details.current.open = false }}>{item.name}</a>)}</div>
  </details>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const closeMenu = () => { setMenuOpen(false); trigger.current?.focus() }

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeMenu() }
      if (event.key !== 'Tab') return
      const elements = menu.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!elements?.length) return
      const first = elements[0], last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    document.addEventListener('keydown', handleKey)
    desktop.addEventListener('change', onDesktop)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKey); desktop.removeEventListener('change', onDesktop) }
  }, [menuOpen])

  return <header className="site-header">
    <div className="header-inner">
      <a href="#top" aria-label="KennCo Insurance home" className="shrink-0"><img src="/assets/kennco-logo.png" alt="KennCo Insurance" width="2000" height="1039" className="brand-logo" /></a>
      <nav aria-label="Main navigation" className="header-nav hidden lg:flex">
        {['car', 'van', 'home', 'travel'].map(key => {
          const cover = covers.find(cover => cover.key === key)!
          return <a className="nav-link" key={cover.key} href={cover.href}>{cover.name}</a>
        })}
        <HeaderDropdown label="About Us" items={footerGroups.find(group => group.title === 'About us')!.items} />
        <HeaderDropdown label="Help Centre" items={supportLinks.map(link => ({ name: link.name, href: link.href }))} />
        <a href={links.renew} className="nav-link">Renew Now</a>
      </nav>
      <div className="header-actions hidden lg:flex">
        <ButtonLink href={links.quote} arrow={false}>Get a Quote</ButtonLink>
        <a href={links.portal} className="button button-outline login-button"><Icon name="login" />Login</a>
      </div>
      <div className="mobile-header-actions flex lg:hidden">
        <a href={links.portal} className="button button-outline login-button"><Icon name="login" />Login</a>
        <button ref={trigger} type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)} className="icon-button menu-toggle"><Icon name="menu" /></button>
      </div>
    </div>
    {menuOpen && <div className="menu-backdrop lg:hidden" onClick={closeMenu}>
      <div ref={menu} role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" id="mobile-navigation" className="mobile-menu" onClick={event => event.stopPropagation()}>
        <div className="mb-6 flex items-center justify-end gap-6"><span id="mobile-menu-title" className="sr-only">Navigation</span><button type="button" className="icon-button" onClick={closeMenu} aria-label="Close navigation menu"><Icon name="close" /></button></div>
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {['car', 'van', 'home', 'travel'].map(key => {
            const cover = covers.find(cover => cover.key === key)!
            return <a key={cover.key} href={cover.href} className="mobile-nav-link" onClick={closeMenu}>{cover.name}<Icon name="arrow" /></a>
          })}
          <a className="mobile-nav-link" href={links.about} onClick={closeMenu}>About Us<Icon name="arrow" /></a>
          <a className="mobile-nav-link" href="#quick-links" onClick={closeMenu}>Help Centre<Icon name="arrow" /></a>
          <a className="mobile-nav-link" href={links.renew} onClick={closeMenu}>Renew Now<Icon name="arrow" /></a>
          <a className="mobile-nav-link" href={links.portal} onClick={closeMenu}>Login<Icon name="external" /></a>
        </nav>
      </div>
    </div>}
  </header>
}

function Hero() {
  return <section className="hero-section" aria-labelledby="hero-heading">
    <div className="hero-layout">
      <div className="hero-art" aria-hidden="true">
        <div className="hero-floating">
          <div className="hero-floating-photo"><img src="/assets/hero-floating-photo-clean.png" alt="" width="1254" height="1254" fetchPriority="high" /></div>
          <img className="hero-floating-frame" src="/assets/hero-floating-frame.svg" alt="" width="1000" height="1000" />
          <img className="hero-floating-stars" src="/assets/hero-stars-figma.png" alt="" width="1016" height="768" />
        </div>
      </div>
      <div className="hero-copy">
        <h1 id="hero-heading">Where <span className="text-brand-blue">Service, Stability</span> and <span className="hero-highlight">Security</span> come as standard!</h1>
        <p className="hero-intro">Looking for reliable Insurance? Get a secure online quote today.</p>
        <div className="hero-reassurance"><span><Icon name="check" />Irish owned insurer</span><span><Icon name="check" />Regulated by the Central Bank of Ireland</span></div>
        <div className="hero-cta"><ButtonLink href={links.quote}>Get a Quote</ButtonLink></div>
      </div>
    </div>
  </section>
}

function CoverSection() {
  return <section id="choose-cover" className="cover-section section-space" aria-labelledby="cover-heading">
    <div className="container-shell">
      <Reveal><div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10"><div><span className="eyebrow mb-3 block">A little peace of mind</span><h2 id="cover-heading" className="section-title">Choose your cover<span className="text-brand-green">.</span></h2></div><p className="max-w-72 text-sm leading-6 text-muted">Car, van, travel or home.<br />Find the cover that’s right for you.</p></div></Reveal>
      <div className="cover-grid">
        {covers.map((cover, index) => <Reveal key={cover.key} delay={index * 45}><a href={cover.href} className={`cover-card cover-${cover.key}`} aria-label={`Explore ${cover.name.toLowerCase()} insurance cover`}>
          <div className="cover-illustration" aria-hidden="true"><span className="cover-disc" /><span className="cover-orbit" /><span className="cover-dot" /><img src={`/assets/${cover.image}.png`} alt="" width={cover.width} height={cover.height} className={`cover-icon cover-icon-${cover.key}`} /></div>
          <div className="relative"><h3 className="font-heading text-[22px] font-bold md:text-2xl">{cover.name}</h3><span className="cover-link">Explore cover<Icon name="arrow" /></span></div>
        </a></Reveal>)}
      </div>
    </div>
  </section>
}

function Stars() {
  return <span className="rating-stars" role="img" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map(star => <svg key={star} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="24" height="24" rx="2" fill="#00875b" /><path fill="white" d="m12 3 2.5 5.4 5.9.7-4.4 4 1.2 5.9-5.2-3-5.2 3 1.2-5.9-4.4-4 5.9-.7Z" /></svg>)}</span>
}

function ReviewsSection() {
  const track = useRef<HTMLDivElement>(null)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [canScrollForward, setCanScrollForward] = useState(true)
  useEffect(() => {
    const element = track.current
    if (!element) return
    const update = () => {
      setCanScrollBack(element.scrollLeft > 1)
      setCanScrollForward(element.scrollLeft + element.clientWidth < element.scrollWidth - 1)
    }
    const observer = new ResizeObserver(update)
    observer.observe(element)
    element.addEventListener('scroll', update)
    update()
    return () => { observer.disconnect(); element.removeEventListener('scroll', update) }
  }, [])
  const scrollReviews = (direction: number) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.current?.scrollBy({ left: direction * 332, behavior: reduced ? 'instant' : 'smooth' })
  }
  return <section className="reviews-section section-space" aria-labelledby="reviews-heading">
    <div className="container-shell">
      <Reveal><div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><span className="eyebrow mb-3 block">Real people. Real peace of mind.</span><h2 className="section-title" id="reviews-heading">What our customers say</h2></div><a className="text-link" href="https://ie.trustpilot.com/review/kennco.ie">View all testimonials<Icon name="arrow" /></a></div></Reveal>
      <Reveal><div className="reviews-layout">
        <a className="trustpilot-summary" href="https://ie.trustpilot.com/review/kennco.ie"><img src="/assets/trustpilot-rating.png" width="380" height="292" alt="Excellent. Based on 1,882 reviews. Trustpilot." /></a>
        <div className="min-w-0"><div ref={track} className="review-track" role="region" aria-label="Customer testimonials" tabIndex={0}>
          {reviews.map(review => <figure key={review.name} className="review-card"><div className="mb-6 flex items-center justify-between gap-4"><Stars /><span className="quote-mark" aria-hidden="true">“</span></div><blockquote className="grow text-[14px] leading-[1.85] text-ink">{review.text}</blockquote><figcaption className="mt-7 flex items-center gap-3 border-t border-brand-blue/10 pt-5"><span className="review-avatar">{review.initials}</span><span className="font-heading text-sm font-bold">{review.name}</span></figcaption></figure>)}
        </div><div className="review-controls"><button type="button" className="icon-button" aria-label="Previous testimonial" onClick={() => scrollReviews(-1)} disabled={!canScrollBack}><Icon name="arrow" className="rotate-180" /></button><button type="button" className="icon-button" aria-label="Next testimonial" onClick={() => scrollReviews(1)} disabled={!canScrollForward}><Icon name="arrow" /></button></div></div>
      </div></Reveal>
    </div>
  </section>
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return <section id="faqs" className="section-space" aria-labelledby="faq-heading"><div className="container-shell grid gap-9 lg:grid-cols-[0.8fr_1.65fr] lg:gap-20">
    <Reveal><span className="eyebrow mb-3 block">Good to know</span><h2 className="section-title" id="faq-heading">A few questions,<br className="hidden lg:block" /> answered.</h2><p className="mt-5 max-w-64 text-sm leading-7 text-muted">Everything starts with a little clarity. Here are some of your travel insurance FAQs.</p><a href={links.travel + '#faqs'} className="text-link mt-6">View all FAQs<Icon name="arrow" /></a><div className="faq-help"><span className="faq-help-icon"><Icon name="chat" /></span><span className="text-sm">Still have a question?<a href={links.contact} className="mt-1 block font-semibold underline decoration-brand-green decoration-2 underline-offset-4">We’re here to help</a></span></div></Reveal>
    <Reveal><div className="faq-list">{faqs.map((faq, index) => <div key={faq.question} className={`faq-item ${openIndex === index ? 'faq-open' : ''}`}><h3><button type="button" id={`faq-button-${index}`} className="faq-trigger" aria-expanded={openIndex === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}>{faq.question}<span className="faq-plus" aria-hidden="true"><span /><span /></span></button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={openIndex !== index} className="faq-answer"><p>{faq.answer}</p></div></div>)}</div></Reveal>
  </div></section>
}

function QuickLinksSection() {
  return <section id="quick-links" className="quick-section section-space" aria-labelledby="quick-heading"><div className="quick-orbit" aria-hidden="true" /><div className="container-shell relative">
    <Reveal><span className="eyebrow mb-3 block">Right this way</span><h2 id="quick-heading" className="section-title mb-9">Quick Links</h2></Reveal>
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <Reveal><h3 className="mb-4 font-heading text-lg font-bold">Support</h3><div className="grid gap-3 sm:grid-cols-2">{supportLinks.map(link => <a href={link.href} key={link.name} className="support-link"><span className="support-icon"><Icon name={link.icon} /></span><span>{link.name}</span><Icon name="arrow" className="ml-auto shrink-0" /></a>)}</div></Reveal>
      <Reveal delay={60}><h3 className="mb-4 font-heading text-lg font-bold">Guides</h3><div className="guide-list">{guideLinks.map(link => <a key={link.name} href={link.href}>{link.name}<Icon name="arrow" /></a>)}</div></Reveal>
    </div>
  </div></section>
}

function NewsSection() {
  return <section className="section-space" aria-labelledby="news-heading"><div className="container-shell">
    <Reveal><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow mb-3 block">A little local knowledge</span><h2 className="section-title" id="news-heading">Latest news and articles</h2></div><a href={links.blog} className="text-link">View all blog<Icon name="arrow" /></a></div></Reveal>
    <div className="grid gap-7 md:grid-cols-3">
      {articles.map((article, index) => <Reveal key={article.title} delay={index * 45} className="h-full">
        <article className="news-card">
          <a href={article.href} className="news-image-link" tabIndex={-1} aria-hidden="true"><img src={`/assets/${article.image}-800.webp`} srcSet={`/assets/${article.image}-480.webp 480w, /assets/${article.image}-800.webp 800w`} sizes="(min-width: 768px) 33vw, 100vw" width="800" height="533" loading="lazy" alt={article.alt} /></a>
          <div className="news-content">
            <div className="article-meta"><span className={`news-category category-${article.category.toLowerCase()}`}>{article.category}</span><time dateTime={article.dateTime}>{article.date}</time></div>
            <h3 className="mt-4 font-heading text-lg font-bold leading-[1.5]"><a href={article.href}>{article.title}</a></h3>
            <p className="mt-3 grow text-sm leading-7 text-muted">{article.excerpt}</p>
            <a href={article.href} className="text-link mt-5 text-sm">{article.linkLabel}<Icon name="arrow" /></a>
          </div>
        </article>
      </Reveal>)}
    </div>
  </div></section>
}

function NewsletterSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Visual prototype: keep the approved copy and native validation; no endpoint is configured.
  }
  return <section className="newsletter-section" aria-labelledby="newsletter-heading"><div className="newsletter-ring" aria-hidden="true" /><div className="container-shell newsletter-layout">
    <div><span className="eyebrow">Stay in the know</span><h2 id="newsletter-heading" className="mt-3 font-heading font-bold text-white">Get the latest news and insurance updates</h2><p className="mt-4 text-sm leading-6 text-white">We respect your privacy, unsubscribe anytime.</p></div>
    <form onSubmit={handleSubmit} className="newsletter-form">
      <div className="newsletter-fields">
        <label className="newsletter-label">Full Name<input name="name" autoComplete="name" placeholder="Your full name" required maxLength={120} /></label>
        <label className="newsletter-label">Email Address<input name="email" type="email" autoComplete="email" placeholder="Joeblogs@mail.com" required maxLength={254} /></label>
        <button className="button button-primary" type="submit">Keep me Informed<Icon name="arrow" /></button>
      </div>
      <label className="newsletter-consent"><input name="privacy" type="checkbox" required /><span>By signing to our newsletter, you agree to our <a className="underline underline-offset-2" href={links.privacy}>Privacy Policy</a>.</span></label>
    </form>
  </div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="container-shell">
    <div className="footer-top"><a href="#top" aria-label="KennCo Insurance home"><img src="/assets/kennco-logo.png" alt="KennCo Insurance" width="2000" height="1039" className="brand-logo" loading="lazy" /></a><div className="flex flex-wrap gap-2"><a className="social-link" href="https://www.facebook.com/KennCoInsurance/" aria-label="KennCo on Facebook">f</a><a className="social-link" href="https://www.linkedin.com/company/kennco-underwriting-limited/" aria-label="KennCo on LinkedIn">in</a><a className="social-link" href="https://www.instagram.com/kenncoinsurance/" aria-label="KennCo on Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" /></svg></a></div></div>
    <div className="footer-columns"><div className="footer-contact"><h2>Contact us</h2><a href="tel:+35314092600"><Icon name="phone" />01 409 2600</a><a href="mailto:Insurance@Kennco.ie"><Icon name="mail" />Insurance@Kennco.ie</a><a href="mailto:Claims@Kennco.ie"><Icon name="mail" />Claims@Kennco.ie</a><address className="mt-3 text-xs not-italic leading-6 text-muted">Suite 5, 6 &amp; 7<br />Grange Road Office Park<br />Grange Road, Rathfarnham<br />Dublin 16, Ireland.</address></div>{footerGroups.map(group => <div key={group.title}><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item.name}><a href={item.href}>{item.name}</a></li>)}</ul></div>)}</div>
    <div className="mt-6 flex justify-end"><a className="text-link text-xs" href="https://brokers.kennco.ie/">Broker Website<Icon name="external" /></a></div>
    <div className="footer-legal"><p>KennCo Underwriting Ltd T/A KennCo Insurance is regulated by The Central Bank of Ireland. Directors: J. Kennedy (Managing), S. Merity, M. Stapleton, C. McDonagh. Co. Reg. No. 454673. Registered at Suite 7, Grange Road Office Park, Rathfarnham, Dublin 16.</p><div className="mt-5 flex flex-wrap items-start justify-between gap-5"><div><span>KennCo © 2026</span><div className="legal-links"><a href={links.documents}>User Guide</a><a href={links.privacy}>Privacy Policy</a><a href={links.terms}>Terms of Business</a><a href="https://www.kennco.ie/accessibility-statement/">Accessibility</a><a href="https://www.kennco.ie/distance-sales-information/">Distance Sales</a><a href="https://www.kennco.ie/duty-of-disclosure/">Honesty &amp; Accuracy</a></div></div><a className="shrink-0" href="https://www.matrixinternet.ie/">Designed &amp; Developed by <span className="font-semibold">Matrix Internet</span></a></div></div>
  </div></footer>
}

export function App() {
  return <><a href="#main" className="skip-link">Skip to content</a><div id="top" /><Header /><main id="main"><Hero /><CoverSection /><ReviewsSection /><FaqSection /><QuickLinksSection /><NewsSection /><NewsletterSection /></main><Footer /></>
}
