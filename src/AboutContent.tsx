import type { ReactNode } from 'react'
import { CoverSection } from './CoverSection'
import { Icon, Reveal } from './ui'

const highlights = [
  { label: 'Founded 2008', icon: 'calendar' },
  { label: '100% Irish owned', icon: 'shield' },
  { label: '1+ million customers', icon: 'people' },
  { label: '4.6 Trustpilot rating', icon: 'star' },
] as const

const supportNumbers = [
  { label: 'KennCo Insurance', display: '01 409 2600', phone: '+35314092600', icon: 'general' },
  { label: '24-Hour Breakdown', display: '01 499 8316', phone: '+35314998316', icon: 'breakdown' },
  { label: 'Travel Claim (emergency)', display: '+353 91 545 997', phone: '+35391545997', icon: 'emergency' },
  { label: 'Travel Claim (non-emergency)', display: '091 545 997', phone: '+35391545997', icon: 'travel' },
]

export function AboutContent({ children }: { children: ReactNode }) {
  return <>
    <div className="bg-linear-to-r from-pale-green to-pale-blue">
      <ul aria-label="KennCo at a glance" className="container-shell grid grid-cols-2 gap-y-4 py-7 text-center font-heading text-sm font-bold text-brand-blue sm:grid-cols-4 lg:text-lg">
        {highlights.map(({ label, icon }) => <li key={label} className="flex flex-col items-center justify-center gap-2 border-s border-blue-200 px-2 first:border-s-0 max-sm:odd:border-s-0 lg:flex-row lg:gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/80"><Icon name={icon} className="size-4" /></span>
          <span>{label}</span>
        </li>)}
      </ul>
    </div>

    <section className="section-space border-b border-slate-100" aria-labelledby="about-story">
      <div className="container-shell grid gap-5 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-12 lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-3 text-brand-blue"><span className="eyebrow-line" aria-hidden="true" />Who are we?</p>
          <h2 id="about-story" className="section-title max-w-96">A 100% Irish-owned company, proud of our roots</h2>
        </Reveal>
        <Reveal>
          <p className="max-w-prose leading-relaxed text-muted">KennCo Insurance, established in 2008, operates as part of KennCo Underwriting Limited — one of Ireland’s largest underwriting agencies. We’re proudly based in Rathfarnham, Co. Dublin, where our dedicated team works diligently to serve our clients’ needs.</p>
          <p className="mt-4 max-w-prose leading-relaxed text-muted">Our growth is built on competitively priced policies that never compromise on quality. We prioritise security and stability so our clients feel safe and supported — whether they’re insuring a car, a home, a trip or a van.</p>
        </Reveal>
      </div>
    </section>

    <CoverSection about />
    {children}

    <section className="section-space" aria-labelledby="about-service">
      <div className="container-shell">
        <div className="rounded-2xl border border-blue-200 p-5 sm:p-8 lg:p-12">
          <h2 id="about-service" className="section-title">Always on hand to help</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">For general enquiries, quotes or claims — from the moment you contact us to the day you renew, we take great care of you.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {supportNumbers.map(({ label, display, phone, icon }) => <li key={label}>
              <a href={`tel:${phone}`} className="flex h-full items-center gap-4 rounded-xl bg-pale-green p-4 hover:underline">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white">
                  <img src={`/assets/about-support-${icon}.svg`} alt="" width="24" height="24" />
                </span>
                <span><strong className="block font-heading text-brand-blue">{display}</strong><span className="block text-sm">{label}</span></span>
              </a>
            </li>)}
          </ul>
        </div>
      </div>
    </section>
  </>
}
