import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ButtonLink, Icon, Reveal } from './ui'
import { HomeInsuranceContent, homeQuoteUrl } from './HomeInsurance'
import { CoverSection } from './CoverSection'
import { HelpCentre } from './HelpCentre'
import { ArticleCard, articlePath, BlogArticlePage, BlogPage, MediaCentrePage } from './EditorialPages'
import { FaqDirectoryPage, PolicyDownloadsPage } from './ResourcePages'
import { CarInsurancePage, TravelInsurancePage, VanInsurancePage } from './ProductPages'
import { findInformationPage, InformationPage } from './InformationPage'
import { articles, covers, faqs, footerGroups, guideLinks, links, reviews, supportLinks } from './content'

function HeaderDropdown({ label, items }: { label: string; items: readonly { name: string; href: string }[] }) {
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
    <div className="header-dropdown-panel">{items.map(item => <a key={item.name} href={item.href} aria-current={item.href === window.location.pathname ? 'page' : undefined} onClick={() => { if (details.current) details.current.open = false }}>{item.name}</a>)}</div>
  </details>
}

function Header({ productPage, homePrefix, quoteHref }: { productPage: boolean; homePrefix: string; quoteHref: string }) {
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
      <a href={homePrefix || '#top'} aria-label="KennCo Insurance home" className="shrink-0"><img src="/assets/kennco-logo.png" alt="KennCo Insurance" width="2000" height="1039" className="brand-logo" /></a>
      <nav aria-label="Main navigation" className="header-nav hidden lg:flex">
        {['car', 'van', 'home', 'travel'].map(key => {
          const cover = covers.find(cover => cover.key === key)!
          return <a className="nav-link" key={cover.key} href={cover.href} aria-current={productPage && cover.key === 'home' ? 'page' : undefined}>{cover.name}</a>
        })}
        <HeaderDropdown label="About Us" items={footerGroups.find(group => group.title === 'About us')!.items} />
        <HeaderDropdown label="Help Centre" items={[...supportLinks, { name: 'FAQs', href: '/faqs/' }]} />
        <a href={links.renew} className="nav-link">Renew Now</a>
      </nav>
      <div className="header-actions hidden lg:flex">
        <ButtonLink href={quoteHref} arrow={false}>Get a Quote</ButtonLink>
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
          <a className="mobile-nav-link" href={links.help} onClick={closeMenu}>Help Centre<Icon name="arrow" /></a>
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

function Stars() {
  return <span className="rating-stars" role="img" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map(star => <svg key={star} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="24" height="24" rx="2" fill="#00875b" /><path fill="white" d="m12 3 2.5 5.4 5.9.7-4.4 4 1.2 5.9-5.2-3-5.2 3 1.2-5.9-4.4-4 5.9-.7Z" /></svg>)}</span>
}

function ReviewsSection({ about = false }: { about?: boolean }) {
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
    const element = track.current
    const card = element?.querySelector<HTMLElement>('.review-card')
    if (!element || !card) return
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap)
    element.scrollBy({ left: direction * step, behavior: reduced ? 'instant' : 'smooth' })
  }
  return <section className="reviews-section section-space" aria-labelledby="reviews-heading">
    <div className="container-shell">
      <Reveal><div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div>{!about && <span className="eyebrow mb-3 block">Real people. Real peace of mind.</span>}<h2 className="section-title" id="reviews-heading">What our customers say</h2></div><a className="text-link" href="https://ie.trustpilot.com/review/kennco.ie">View all testimonials<Icon name="arrow" /></a></div></Reveal>
      <Reveal><div className="reviews-layout">
        <a className="trustpilot-summary" href="https://ie.trustpilot.com/review/kennco.ie"><img src="/assets/trustpilot-rating.png" width="380" height="292" alt="Excellent. Based on 1,882 reviews. Trustpilot." /></a>
        <div className="min-w-0"><div ref={track} className="review-track" role="region" aria-label="Customer testimonials" tabIndex={0}>
          {reviews.map(review => <figure key={review.name} className="review-card"><div className="mb-6 flex items-center justify-between gap-4"><Stars /><span className="quote-mark" aria-hidden="true">“</span></div><blockquote className="grow text-[.875rem] leading-[1.85] text-ink">{review.text}</blockquote><figcaption className="mt-7 flex items-center gap-3 border-t border-brand-blue/10 pt-5"><span className="review-avatar">{review.initials}</span><span className="font-heading text-sm font-bold">{review.name}</span></figcaption></figure>)}
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

function QuickLinksSection({ about = false }: { about?: boolean }) {
  const linkHref = (href: string) => about && href.startsWith('#') ? '/' + href : href
  return <section id="quick-links" className="quick-section section-space" aria-labelledby="quick-heading"><div className="quick-orbit" aria-hidden="true" /><div className="container-shell relative">
    <Reveal>{!about && <span className="eyebrow mb-3 block">Right this way</span>}<h2 id="quick-heading" className="section-title mb-9">Quick Links</h2></Reveal>
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <Reveal><h3 className="mb-4 font-heading text-lg font-bold">Support</h3><div className="grid gap-3 sm:grid-cols-2">{supportLinks.map(link => <a href={linkHref(link.href)} key={link.name} className="support-link"><span className="support-icon"><Icon name={link.icon} /></span><span>{link.name}</span><Icon name="arrow" className="ml-auto shrink-0" /></a>)}</div></Reveal>
      <Reveal delay={60}><h3 className="mb-4 font-heading text-lg font-bold">Guides</h3><div className="guide-list">{guideLinks.map(link => <a key={link.name} href={linkHref(link.href)}>{link.name}<Icon name="arrow" /></a>)}</div></Reveal>
    </div>
  </div></section>
}

function NewsSection() {
  return <section className="section-space" aria-labelledby="news-heading"><div className="container-shell">
    <Reveal><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow mb-3 block">A little local knowledge</span><h2 className="section-title" id="news-heading">Latest news and articles</h2></div><a href="/blog/" className="text-link">View all blog<Icon name="arrow" /></a></div></Reveal>
    <div className="grid gap-7 md:grid-cols-3">
      {articles.map((article, index) => <Reveal key={article.title} delay={index * 45} className="h-full">
        <ArticleCard item={article} />
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

function Footer({ homeHref }: { homeHref: string }) {
  return <footer className="site-footer"><div className="container-shell">
    <div className="footer-top"><a href={homeHref} aria-label="KennCo Insurance home"><img src="/assets/kennco-logo.png" alt="KennCo Insurance" width="2000" height="1039" className="brand-logo" loading="lazy" /></a><div className="flex flex-wrap gap-2"><a className="social-link" href="https://www.facebook.com/KennCoInsurance/" aria-label="KennCo on Facebook">f</a><a className="social-link" href="https://www.linkedin.com/company/kennco-underwriting-limited/" aria-label="KennCo on LinkedIn">in</a><a className="social-link" href="https://www.instagram.com/kenncoinsurance/" aria-label="KennCo on Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" /></svg></a></div></div>
    <div className="footer-columns"><div className="footer-contact"><h2>Contact us</h2><a href="tel:+35314092600"><Icon name="phone" />01 409 2600</a><a href="mailto:Insurance@Kennco.ie"><Icon name="mail" />Insurance@Kennco.ie</a><a href="mailto:Claims@Kennco.ie"><Icon name="mail" />Claims@Kennco.ie</a><address className="mt-3 text-xs not-italic leading-6 text-muted">Suite 5, 6 &amp; 7<br />Grange Road Office Park<br />Grange Road, Rathfarnham<br />Dublin 16, Ireland.</address></div>{footerGroups.map(group => <div key={group.title}><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item.name}><a href={item.href}>{item.name}</a></li>)}</ul></div>)}</div>
    <div className="mt-6 flex justify-end"><a className="text-link text-xs" href="https://brokers.kennco.ie/">Broker Website<Icon name="external" /></a></div>
    <div className="footer-legal"><p>KennCo Underwriting Ltd T/A KennCo Insurance is regulated by The Central Bank of Ireland. Directors: J. Kennedy (Managing), S. Merity, M. Stapleton, C. McDonagh. Co. Reg. No. 454673. Registered at Suite 7, Grange Road Office Park, Rathfarnham, Dublin 16.</p><div className="mt-5 flex flex-wrap items-start justify-between gap-5"><div><span>KennCo © 2026</span><div className="legal-links"><a href={links.documents}>User Guide</a><a href={links.privacy}>Privacy Policy</a><a href={links.terms}>Terms of Business</a><a href="https://www.kennco.ie/accessibility-statement/">Accessibility</a><a href="https://www.kennco.ie/distance-sales-information/">Distance Sales</a><a href="https://www.kennco.ie/duty-of-disclosure/">Honesty &amp; Accuracy</a></div></div><a className="shrink-0" href="https://www.matrixinternet.ie/">Designed &amp; Developed by <span className="font-semibold">Matrix Internet</span></a></div></div>
  </div></footer>
}

export function App() {
  const path = window.location.pathname
  const additionalPage = [
    { path: '/blog/', title: 'Blog', Content: BlogPage },
    { path: articlePath, title: 'Who Pays for Fire Brigade Charges After a Car Accident?', Content: BlogArticlePage },
    { path: '/media-centre/', title: 'Media Centre', Content: MediaCentrePage },
    { path: '/downloads/', title: 'Policy documents & downloads', Content: PolicyDownloadsPage },
    { path: '/faqs/', title: 'Frequently Asked Questions', Content: FaqDirectoryPage },
    { path: '/car-insurance/', title: 'Car Insurance', Content: CarInsurancePage, quote: '#start-quote' },
    { path: '/travel-insurance/', title: 'Travel Insurance', Content: TravelInsurancePage, quote: '#trip-cover' },
    { path: '/van-insurance/', title: 'Van Insurance', Content: VanInsurancePage, quote: '#start-quote' },
  ].find(page => page.path === path || page.path === path + '/')
  const productPage = /^\/home-insurance\/?$/.test(path)
  const helpPage = /^\/help-centre\/?$/.test(path)
  const informationPage = findInformationPage(path)
  const aboutPage = informationPage?.path === '/about'
  const pageTitle = additionalPage?.title ?? (helpPage ? 'Help Centre' : aboutPage ? 'About Us' : informationPage?.title ?? (productPage ? 'Home Insurance' : undefined))
  const homePrefix = pageTitle ? '/' : ''
  const quoteHref = productPage ? homeQuoteUrl : additionalPage?.quote ?? (aboutPage ? links.quote : homePrefix + links.quote)
  const pageClass = productPage ? 'home-insurance-page' : informationPage || helpPage || additionalPage ? 'information-page' : undefined
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — KennCo Insurance` : "KennCo Insurance — Cover for life's journeys"
  }, [pageTitle])
  return <div className={pageClass}>
    <a href="#main" className="skip-link">Skip to content</a>
    <div id="top" />
    <Header productPage={productPage} homePrefix={homePrefix} quoteHref={quoteHref} />
    <main id="main">
      {additionalPage ? <additionalPage.Content /> : helpPage ? <HelpCentre /> : informationPage ? <InformationPage page={informationPage}><ReviewsSection about /><QuickLinksSection about /></InformationPage> : productPage ? <HomeInsuranceContent /> : <>
        <Hero /><CoverSection /><ReviewsSection /><FaqSection /><QuickLinksSection /><NewsSection /><NewsletterSection />
      </>}
    </main>
    <Footer homeHref={homePrefix || '#top'} />
  </div>
}
