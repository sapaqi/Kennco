import { useState } from 'react'
import { ButtonLink, Icon, Reveal } from './ui'
import { homeInsurance as content, homeOptionalExtras } from './home-insurance-content'

export const homeQuoteUrl = 'https://www.kennco.ie/home-insurance-quote/'
const documents = [
  { title: 'Key Facts Statement', badge: 'IPID', href: 'https://www.kennco.ie/wp-content/uploads/2017/05/KennCo-Home-Policy-Key-Facts.pdf' },
  { title: 'Policy Booklet', badge: 'Claims form', href: 'https://www.kennco.ie/files/home/KennCo-Household-Insurance-Policy-Booklet-WEF-05-2026.pdf' },
]
const relatedHref = (name: string) => name === 'Landlord insurance'
  ? 'https://www.kennco.ie/landlord-insurance/'
  : name === 'Contents only insurance' ? 'https://www.kennco.ie/home-insurance-contents-only/'
  : name === 'New build home insurance' ? 'https://www.kennco.ie/first-time-buyer-home-insurance/'
  : name.startsWith('Buildings') ? '#standard-cover' : 'https://www.kennco.ie/home-insurance/'

function HomeInsuranceHero() {
  return <section className="insurance-hero" aria-labelledby="insurance-title">
    <div className="container-shell insurance-hero-layout">
      <div className="insurance-hero-copy">
        <nav aria-label="Breadcrumb" className="insurance-breadcrumb"><ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li><li aria-current="page">Home Insurance</li></ol></nav>
        <h1 id="insurance-title">Cover for the place<br className="hidden xl:block" /> that <span className="hero-highlight">matters most</span></h1>
        <p>{content.hero.intro}</p>
        <ButtonLink href={homeQuoteUrl}>{content.hero.cta}</ButtonLink>
      </div>
      <Reveal className="insurance-glance-scene">
        <div className="insurance-glance-photo">
          <img src="/assets/home-insurance-house.png" width="1121" height="548" alt="" fetchPriority="high" />
        </div>
        <div className="insurance-glance">
          <table>
            <caption>At A Glance</caption>
            <tbody>{content.glance.map(([label, value], index) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{index === 0 ? <strong>{value}</strong> : <span className="included-value"><Icon name="check" />{value}</span>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Reveal>
    </div>
  </section>
}

function HomeOptionalExtras() {
  return <section className="insurance-extras section-space" aria-labelledby="extras-title">
    <div className="container-shell">
      <Reveal><div className="insurance-section-heading"><span className="eyebrow">Optional extras</span><h2 id="extras-title" className="section-title mt-3">Tailor your policy</h2></div></Reveal>
      <div className="insurance-extras-grid">{homeOptionalExtras.map((extra, index) => <Reveal key={extra.title} className="h-full" delay={index * 45}>
        <article className={`insurance-extra insurance-extra-${extra.tone}`}>
          <div className="insurance-extra-art" aria-hidden="true"><span className="insurance-extra-disc" /><span className="insurance-extra-orbit" /><span className="insurance-extra-dot" /><Icon name={extra.icon} /></div>
          <h3>{extra.title}</h3><p>{extra.body}</p>
        </article>
      </Reveal>)}</div>
    </div>
  </section>
}

function HomeHelp() {
  return <section className="section-space insurance-help"><div className="container-shell insurance-help-grid">
    <Reveal><div className="insurance-talk"><span className="insurance-feature-icon" aria-hidden="true"><Icon name="phone" /></span><h2>Prefer to talk?</h2><p>To get a quote over the phone please call us.</p><a className="insurance-phone" href="tel:+35314092600">01 409 2600<Icon name="arrow" /></a><p className="insurance-hours">Mon-Fri 9:00-17:00</p></div></Reveal>
    <Reveal delay={60}><div className="insurance-eligibility"><div className="insurance-card-heading"><span className="insurance-feature-icon" aria-hidden="true"><Icon name="shield" /></span><h2>Who we cover</h2></div><ul>{content.eligibility.map(item => <li key={item}><Icon name="check" /><span>{item}</span></li>)}</ul></div></Reveal>
  </div></section>
}

function HomeSavings() {
  return <section className="insurance-savings section-space" aria-labelledby="savings-title"><div className="insurance-savings-orbit" aria-hidden="true" /><div className="container-shell insurance-savings-layout">
    <Reveal><span className="eyebrow">{content.savings.tag}</span><h2 id="savings-title" className="section-title mt-4">{content.savings.title}</h2><p className="mt-5 text-sm leading-7">{content.savings.intro}</p></Reveal>
    <Reveal delay={60}><ul className="insurance-saving-list">{content.savings.items.map(item => { const split = item.indexOf(':'); return <li key={item}><span className="insurance-saving-check"><Icon name="check" /></span><span><strong>{item.slice(0, split + 1)}</strong>{item.slice(split + 1)}</span></li> })}</ul></Reveal>
  </div></section>
}

function HomeIncluded() {
  return <section className="section-space" id="standard-cover" aria-labelledby="included-title"><div className="container-shell">
    <Reveal><div className="insurance-section-heading"><span className="eyebrow">{content.included.tag}</span><h2 className="section-title mt-3" id="included-title">{content.included.title}</h2><p className="mt-4 text-sm leading-7 text-muted">{content.included.intro}</p></div></Reveal>
    <div className="insurance-cover-grid">{content.included.cards.map((card, index) => <Reveal key={card.title} delay={index % 3 * 45} className="h-full"><article className={`insurance-cover-card insurance-cover-tone-${index % 3}`}><span className="insurance-feature-icon" aria-hidden="true"><Icon name={card.icon} /></span><h3>{card.title}</h3><p>{card.body}</p></article></Reveal>)}</div>
  </div></section>
}

function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)
  return <section className="insurance-faq section-space" id="faqs" aria-labelledby="home-faq-title"><div className="container-shell">
    <Reveal><div className="insurance-faq-heading"><h2 className="section-title" id="home-faq-title">Home insurance FAQs</h2><button className="text-link" type="button" aria-pressed={showAll} onClick={() => setShowAll(value => !value)}>View all FAQs<Icon name="arrow" /></button></div></Reveal>
    <Reveal><div className="faq-list">{content.faqs.map((faq, index) => {const expanded = showAll || open === index; return <div key={index} className={`faq-item ${expanded ? 'faq-open' : ''}`}><h3><button className="faq-trigger" type="button" id={`home-faq-button-${index}`} aria-expanded={expanded} aria-controls={`home-faq-answer-${index}`} onClick={() => {setShowAll(false);setOpen(expanded ? null : index)}}>{faq.question}<span className="faq-plus" aria-hidden="true"><span /><span /></span></button></h3><div className="faq-answer" role="region" id={`home-faq-answer-${index}`} aria-labelledby={`home-faq-button-${index}`} hidden={!expanded}><p>{faq.answer}</p></div></div>})}</div></Reveal>
  </div></section>
}

function HomeDocuments() {
  return <section className="insurance-documents section-space" aria-labelledby="documents-title"><div className="container-shell"><Reveal><h2 className="section-title" id="documents-title">House Insurance Documents</h2></Reveal><div className="insurance-documents-grid">{documents.map((document, index) => <Reveal key={document.title} delay={index * 50}><a className="insurance-document" href={document.href}><span className="insurance-feature-icon" aria-hidden="true"><Icon name="document" /></span><span className="insurance-document-title"><h3>{document.title}</h3><span className="insurance-document-badge">{document.badge}</span></span><Icon name="arrow" className="insurance-document-arrow" /></a></Reveal>)}</div></div></section>
}

function HomeRelated() {
  return <nav className="insurance-related" aria-label="Home insurance cover options"><div className="container-shell insurance-related-grid">{content.related.map((column, index) => <ul key={index}>{column.map(name => <li key={name}><a href={relatedHref(name)}>{name}<Icon name="arrow" /></a></li>)}</ul>)}</div></nav>
}

export function HomeInsuranceContent() {
  return <><HomeInsuranceHero /><HomeOptionalExtras /><HomeHelp /><HomeSavings /><HomeIncluded /><HomeFaq /><HomeDocuments /><HomeRelated /></>
}
