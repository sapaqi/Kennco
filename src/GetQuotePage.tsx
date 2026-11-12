import { covers } from './content'
import { CoverIllustration } from './CoverSection'
import { Icon } from './ui'
import './get-quote.css'

export function GetQuotePage() {
  return <div className="quote-page">
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="quote-header">
      <div className="container-shell quote-header-inner">
        <img src="/assets/kennco-logo.png" alt="KennCo Insurance" width="2000" height="1039" className="brand-logo" />
        <div className="quote-help">
          <span className="quote-help-contact"><span className="quote-phone-icon"><Icon name="phone" /></span><span><span className="quote-help-label">Need help? Call </span><strong>01 409 2600</strong></span></span>
          <p>Mon–Fri 9am–5pm</p>
        </div>
      </div>
    </header>
    <main id="main" className="quote-main">
      <div className="quote-intro">
        <span className="eyebrow"><span className="eyebrow-line" />Get a quote</span>
        <h1>What would you like<br className="quote-title-break" /> to <span className="hero-highlight">insure?</span></h1>
        <p>Get a quote in minutes. No obligation.</p>
      </div>
      <nav className="quote-cover-grid" aria-label="Choose your insurance">
        {(['car', 'van', 'home', 'travel'] as const).map(key => {
          const cover = covers.find(item => item.key === key)!
          const Card = key === 'travel' ? 'a' : 'div'
          return <Card key={key} href={key === 'travel' ? '/get-a-quote/travel/' : undefined} className={`cover-card cover-${key} quote-cover-card`} aria-disabled={key === 'travel' ? undefined : true}>
            <CoverIllustration cover={cover} />
            <div className="quote-cover-label"><h2>{cover.name}</h2><span className="cover-link"><Icon name="arrow" /></span></div>
          </Card>
        })}
      </nav>
      <section className="quote-existing" aria-labelledby="existing-quote-heading">
        <h2 id="existing-quote-heading">Already have a car or van quote or policy?</h2>
        <div className="quote-existing-links">
          <div aria-disabled="true" className="support-link quote-support-link">
            <span className="faq-help-icon"><Icon name="document" /></span>
            <span className="quote-support-copy"><strong>Resume a saved car or van quote</strong><span>Pick up where you left off with your quote reference.</span></span>
            <Icon name="arrow" className="quote-support-arrow" />
          </div>
          <div aria-disabled="true" className="support-link quote-support-link">
            <span className="faq-help-icon"><Icon name="calendar" /></span>
            <span className="quote-support-copy"><strong>Renew your car or van policy</strong><span>Renewing an existing car or van policy with us? Start here.</span></span>
            <Icon name="arrow" className="quote-support-arrow" />
          </div>
        </div>
        <p className="quote-travel-note"><Icon name="mail" /><span><strong>Travel quote or policy?</strong> Use the link in your email to resume your quote or renew your policy.</span></p>
      </section>
    </main>
    <footer className="quote-footer"><p>KennCo Underwriting Ltd is regulated by the Central Bank of Ireland.</p></footer>
  </div>
}
