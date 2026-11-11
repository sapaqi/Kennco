import type { ReactNode } from 'react'
import { links } from './content'
import { FaqAccordion } from './FaqAccordion'
import { InsuranceHero } from './InsuranceHero'
import { carFaqs, vanFaqs } from './faq-design'
import * as design from './product-design'
import { PageHero, PageSection, pagePanel } from './AdditionalPageUI'
import { ButtonLink, Icon, InsuranceExtraArt, Reveal } from './ui'

const travelQuote = 'https://www.kennco.ie/travel-insurance-quote/'
const vanQuote = 'https://www.kennco.ie/van-insurance-quote/'
const travelFaqPdf = 'https://travel.kennco.ie/Documents/travel/FAQ.pdf'

function pairs(items: readonly string[]) {
  return items.filter((_, index) => index % 2 === 0).map((title, index) => ({ title, body: items[index * 2 + 1] }))
}

function ProductCards({ items }: { items: readonly { title: string; body: string; tag?: string; icon?: ReactNode }[] }) {
  return <div className={`grid gap-4 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
    {items.map(({ title, body, tag, icon }, index) => <Reveal key={title} className="h-full" delay={index % 3 * 45}>
      <article className={pagePanel + ' h-full'}>
        <span className="mb-4 grid min-h-10 w-fit min-w-10 place-items-center rounded-full bg-pale-green px-2 text-sm font-bold text-brand-blue">{icon ?? (tag || <Icon name="check" />)}</span>
        <h3 className="font-heading text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </article>
    </Reveal>)}
  </div>
}

function ProductFaqs({ title, questions, href }: { title: string; questions: readonly { question: string; answer?: string }[]; href: string }) {
  return <FaqAccordion title={title} faqs={questions.map(faq => ({
    question: faq.question,
    answer: faq.answer ?? <>For details, <a href={href}>see KennCo’s product information</a> or <a href={links.help}>contact the team</a>.</>,
  }))} />
}

function RelatedCover({ labels, destinations, fallback }: { labels: readonly string[]; destinations: readonly string[]; fallback: string }) {
  return <nav aria-label="Related cover" className="container-shell section-space">
    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {labels.map((label, index) => <li key={label}><a className="text-link" href={destinations[index] ?? fallback}>{label}<Icon name="arrow" className="shrink-0" /></a></li>)}
    </ul>
  </nav>
}

function QuoteCard({ href, inHero = false }: { href: string; inHero?: boolean }) {
  return <div id="start-quote" className={inHero ? 'insurance-glance insurance-hero-quote' : pagePanel}>
    <h2 className="section-title mb-3">Start your quote</h2>
    <p className="mb-4 text-sm text-muted">Have your vehicle registration to hand. No obligation.</p>
    <ButtonLink href={href}>Get quote</ButtonLink>
  </div>
}

export function CarInsurancePage() {
  const comparison = design.carComparison
  return <>
    <PageHero label="Car Insurance" title={design.carHero[0]} intro={design.carHero[1]}>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">{design.carHero.slice(2).map(item => <li key={item} className="flex items-center gap-2"><Icon name="check" className="text-brand-blue" />{item}</li>)}</ul>
    </PageHero>
    <div className="container-shell py-8"><QuoteCard href={links.car} /></div>
    <PageSection title={comparison[1]} eyebrow={comparison[0]}>
      <div className="overflow-hidden rounded-xl border border-[#d8e8f2]">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-pale-blue"><tr><th scope="col" className="w-2/5 p-3 text-left">Cover</th>{comparison.slice(8, 10).map(label => <th key={label} scope="col" className="p-3 text-center">{label}</th>)}</tr></thead>
          <tbody>{comparison.slice(2, 8).map((label, index) => <tr className="border-t border-[#d8e8f2]" key={label}>
            <th scope="row" className="p-3 text-left font-medium">{label}</th>
            {[index !== 2 && index !== 3, true].map((included, column) => <td key={column} className="p-3 text-center"><Icon name={included ? 'check' : 'close'} className="mx-auto text-brand-blue" /><span className="sr-only">{included ? 'Included' : 'Not included'}</span></td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">{comparison[10]}</p>
    </PageSection>
    <PageSection title={design.carExtras[1]} eyebrow={design.carExtras[0]} tint><ProductCards items={pairs(design.carExtras.slice(2))} /></PageSection>
    <PageSection title={design.carIncluded[0]}>
      <div className="grid items-center gap-6 md:grid-cols-2">
        <dl className="divide-y divide-[#d8e8f2]">{pairs(design.carIncluded.slice(1)).map(({ title, body }) => <div className="py-3" key={title}><dt className="font-heading font-bold">{title}</dt><dd className="mt-1 text-sm text-muted">{body}</dd></div>)}</dl>
        <img src="/assets/car-cover-detail.webp" className="aspect-video w-full rounded-2xl object-cover" alt="" width="1440" height="2160" loading="lazy" />
      </div>
    </PageSection>
    <ProductFaqs title="Car insurance FAQs" questions={carFaqs} href={links.car} />
    <RelatedCover labels={design.carRelated} destinations={['https://www.kennco.ie/young-drivers-car-insurance/', 'https://www.kennco.ie/young-drivers-car-insurance/', 'https://www.kennco.ie/womens-car-insurance/', 'https://www.kennco.ie/car-insurance-after-returning-to-ireland/']} fallback={links.car} />
  </>
}

const tripFaqs = [
  { question: 'Can I buy single-trip or annual multi-trip cover?', answer: 'KennCo offers both options. See the comparison above or continue to the quote to choose your cover.' },
  { question: 'Where can I find the policy wording?', answer: 'The policy wording and IPID are available under Travel in Policy documents & downloads.' },
  { question: 'Who do I contact in a medical emergency abroad?', answer: 'Check your policy documents for the emergency assistance number that applies to your cover.' },
  { question: 'Where can I find more travel insurance FAQs?' },
]

export function TravelInsurancePage() {
  const t = design.travelHero
  const options = design.travelOptions
  const extras = design.travelExtras
  const support = design.travelSupport
  return <>
    <InsuranceHero label="Travel Insurance" title={<>{t[0].replace(/peace of mind$/, '')}<span className="hero-highlight">peace of mind</span></>} intro={t[1]}
      quote={{ href: '#trip-cover', label: t[2] }}
      photo={{ src: '/assets/travel-insurance-coast.webp', width: 1700, height: 740, softFade: true }}
      rows={t.slice(4, 8).map((label, index) => ({ label, value: <strong>{t[8 + index]}</strong> }))} />
    <PageSection id="trip-cover" title={options[1]} eyebrow={options[0]}>
      <p className="mb-5 text-muted">{options[2]}</p>
      <div className="grid gap-5 md:grid-cols-2">
        {([
          { title: options[3], body: options[4], features: options.slice(5, 8), cta: options[8], icon: 'personal-items', tone: 'teal', tag: null },
          { title: options[10], body: options[11], features: options.slice(12, 15), cta: options[15], icon: 'calendar', tone: 'featured', tag: options[9] },
        ] as const).map(option => <article className={`insurance-extra insurance-extra-${option.tone} travel-cover-option`} key={option.title}>
          {option.tag && <span className="insurance-plan-badge travel-popular-badge"><Icon name="star" />{option.tag}</span>}
          <InsuranceExtraArt icon={option.icon} />
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <h3>{option.title}</h3>
            <p>{option.body}</p>
            <ul className="my-5 space-y-3">{option.features.map(feature => <li key={feature} className="flex gap-2 text-sm"><Icon name="check" className="travel-cover-check shrink-0" />{feature}</li>)}</ul>
            <ButtonLink className="mt-auto" href={travelQuote}>{option.cta}</ButtonLink>
          </div>
        </article>)}
      </div>
    </PageSection>
    <PageSection title={design.travelIncluded[1]} eyebrow={design.travelIncluded[0]} tint>
      <ProductCards items={pairs(design.travelIncluded.slice(3))} />
    </PageSection>
    <section className="insurance-savings section-space" aria-labelledby="travel-extras-title">
      <div className="insurance-savings-orbit" aria-hidden="true" />
      <div className="container-shell insurance-savings-layout">
        <div>
          <span className="eyebrow">{extras[6]}</span>
          <h2 className="section-title mt-3" id="travel-extras-title">{extras[7]}</h2>
          <p className="mt-4 leading-relaxed">{extras[8]}</p>
        </div>
        <ul className="insurance-saving-list">{pairs(extras.slice(0, 6)).map(({ title: body, body: title }) => <li key={title}>
          <span className="insurance-saving-check"><Icon name="check" /></span>
          <span><strong className="block">{title}</strong>{body}</span>
        </li>)}</ul>
      </div>
    </section>
    <div className="container-shell section-space grid gap-5 md:grid-cols-2">
      <section className={pagePanel}><h2 className="section-title">{support[0]}</h2><p className="mt-3 text-muted">{support[1]}</p><a className="text-link mt-5" href="tel:+35391545997">{support[2]}<Icon name="phone" /></a><p className="mt-1 text-sm text-muted">{support[3]}</p></section>
      <section className={pagePanel}><h2 className="section-title">{support[4]}</h2><p className="mt-3 text-muted">{support[5]}</p><ButtonLink className="mt-5" href={travelQuote}>{support[6]}</ButtonLink></section>
    </div>
    <ProductFaqs title="Travel insurance FAQs" questions={tripFaqs} href={travelFaqPdf} />
    <RelatedCover labels={design.travelRelated} destinations={[]} fallback={links.travel} />
  </>
}

const vanFactorIcons = [
  <img src="/assets/van-factor-van.svg" alt="" width="24" height="24" />,
  <Icon name="document" />,
  <img src="/assets/van-factor-scale.svg" alt="" width="24" height="24" />,
  <Icon name="eye" />,
  <Icon name="percent" />,
]
const vanHighlightIcons = ['shield', 'people', 'clock'] as const

export function VanInsurancePage() {
  const hero = design.vanHero
  const privateVan = design.vanPrivate
  const support = design.vanSupport
  return <>
    <InsuranceHero label="Van Insurance"
      title={<>{hero[0].replace(/keeps you working$/, '')}<span className="hero-highlight">keeps you working</span></>}
      intro={hero[1]}
      photo={{ src: '/assets/van-insurance-road.webp', width: 1700, height: 1133, softFade: true, mirrored: true }}
      panel={<QuoteCard href={vanQuote} inHero />}
      badge={<><strong>{hero[8]}</strong><span>{hero[7]}</span></>} />
    <div className="insurance-savings van-highlights">
      <ul className="container-shell flex flex-wrap justify-center gap-x-16 gap-y-3 py-5 text-sm font-semibold">
        {design.vanHighlights.map((item, index) => <li key={item} className="flex items-center gap-2"><Icon name={vanHighlightIcons[index]} className="shrink-0 text-white" />{item}</li>)}
      </ul>
    </div>
    <section className="section-space van-private-section" aria-labelledby="private-van-title">
      <div className="container-shell">
        <article className="grid overflow-hidden rounded-2xl border border-[#d8e8f2] bg-white shadow-card md:grid-cols-2">
          <div className="insurance-extra-featured p-6 sm:p-8">
            <span className="insurance-plan-badge">{privateVan[0]}</span>
            <h2 className="section-title mt-3" id="private-van-title">{privateVan[1]}</h2>
            <p className="mt-3 leading-relaxed">{privateVan[2]}</p>
            <ButtonLink className="mt-5" href={vanQuote}>{privateVan[3]}</ButtonLink>
          </div>
          <div className="p-6 sm:p-8"><h3 className="eyebrow">{privateVan[4]}</h3><dl className="mt-4 grid gap-4 sm:grid-cols-2">{pairs(privateVan.slice(5, 13)).map(({ title, body }) => <div key={title}><dt className="font-semibold">{title}</dt><dd className="mt-1 text-sm text-muted">{body}</dd></div>)}</dl><a href={links.van} className="text-link mt-5">{privateVan[13]}<Icon name="arrow" /></a></div>
        </article>
      </div>
    </section>
    <PageSection title={design.vanSteps[1]} eyebrow={design.vanSteps[0]}><ProductCards items={[2, 5, 8].map(index => ({ tag: design.vanSteps[index], title: design.vanSteps[index + 1], body: design.vanSteps[index + 2] }))} /></PageSection>
    <section className="insurance-savings section-space" aria-labelledby="van-savings-title">
      <div className="insurance-savings-orbit" aria-hidden="true" />
      <div className="container-shell insurance-savings-layout">
        <div>
          <span className="eyebrow">{design.vanSavings[8]}</span>
          <h2 className="section-title mt-3" id="van-savings-title">{design.vanSavings[9]}</h2>
          <p className="mt-4 leading-relaxed">{design.vanSavings[10]}</p>
        </div>
        <ul className="insurance-saving-list">{pairs(design.vanSavings.slice(0, 8)).map(({ title: body, body: title }) => <li key={title}>
          <span className="insurance-saving-check"><Icon name="check" /></span>
          <span><strong className="block">{title}</strong>{body}</span>
        </li>)}</ul>
      </div>
    </section>
    <PageSection title={design.vanFactors[0]}><ProductCards items={pairs(design.vanFactors.slice(1)).map((item, index) => ({ ...item, icon: vanFactorIcons[index] }))} /></PageSection>
    <ProductFaqs title="Van insurance FAQs" questions={vanFaqs} href={links.van} />
    <div className="container-shell section-space grid gap-5 md:grid-cols-2">
      <section className={pagePanel}><h2 className="section-title">{support[0]}</h2><p className="mt-3 text-muted">{support[1]}</p><ButtonLink className="mt-5" href={vanQuote}>{support[2]}</ButtonLink></section>
      <section className={pagePanel}><h2 className="section-title">{support[3]}</h2><p className="mt-3 text-muted">{support[4]}</p><a className="text-link mt-5" href="tel:+35314998316">{support[5]}<Icon name="phone" /></a><p className="mt-1 text-sm text-muted">{support[6]}</p></section>
    </div>
  </>
}
