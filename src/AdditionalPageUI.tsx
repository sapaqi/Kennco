import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Reveal } from './ui'

export const pagePanel = 'rounded-2xl border border-[#d8e8f2] bg-white p-5 shadow-card sm:p-7'

export function StorySection({ id, eyebrow, title, paragraphs }: {
  id: string
  eyebrow: string
  title: string
  paragraphs: readonly string[]
}) {
  return <section className="section-space border-b border-slate-100" aria-labelledby={id}>
    <div className="container-shell grid gap-5 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-12 lg:gap-16">
      <Reveal>
        <p className="eyebrow mb-3 text-brand-blue"><span className="eyebrow-line" aria-hidden="true" />{eyebrow}</p>
        <h2 id={id} className="section-title max-w-96">{title}</h2>
      </Reveal>
      <Reveal>
        {paragraphs.map(paragraph => <p key={paragraph} className="max-w-prose leading-relaxed text-muted [&+p]:mt-4">{paragraph}</p>)}
      </Reveal>
    </div>
  </section>
}

export function HeroCars() {
  return <img className="car-hero-photo" src="/assets/help-centre-hero.webp" alt="" width="1700" height="711" fetchPriority="high" />
}

export function PageHero({ title, label, intro, children, aside, cars = false, parent }: {
  title: string
  label: string
  intro?: string
  children?: ReactNode
  aside?: ReactNode
  cars?: boolean
  parent?: { label: string; href: string }
}) {
  const columns = cars ? 'car-photo-hero-inner lg:grid-cols-[1.1fr_1fr] lg:gap-5' : aside ? 'lg:grid-cols-2' : ''
  return <section className="information-hero" aria-labelledby="new-page-title">
    <div className={`container-shell page-hero-heading additional-hero-inner grid gap-6 ${columns}`}>
      <div>
        <nav className="insurance-breadcrumb" aria-label="Breadcrumb">
          <ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li>
            {parent && <><li><a href={parent.href}>{parent.label}</a></li><li aria-hidden="true">/</li></>}
            <li aria-current="page">{label}</li>
          </ol>
        </nav>
        <h1 id="new-page-title">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl leading-relaxed text-ink">{intro}</p>}
        {children}
      </div>
      {aside}
      {cars && <HeroCars />}
    </div>
  </section>
}

export function PageSearch({ label, onSearch }: { label: string; onSearch: (query: string) => void }) {
  const [value, setValue] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(value.trim())
  }
  return <form className="mt-6 flex max-w-xl flex-wrap gap-2" role="search" onSubmit={submit}>
    <input className="min-h-12 min-w-0 flex-1 rounded-md border border-[#a8c9de] bg-white px-4 text-sm" type="search" aria-label={label} placeholder={label} value={value} onChange={event => {
      setValue(event.target.value)
      if (!event.target.value) onSearch('')
    }} />
    <button className="button button-primary" type="submit">Search</button>
  </form>
}

export function PageFilters({ options, current, onChange }: { options: readonly string[]; current: string; onChange: (value: string) => void }) {
  return <div className="border-b border-[#d8e8f2]">
    <div className="container-shell flex flex-wrap items-center gap-2 py-4" role="group" aria-label="Filter results">
      <span className="mr-2 text-sm font-semibold">Filter by:</span>
      {options.map(option => <button key={option} type="button" aria-pressed={current === option} onClick={() => onChange(option)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${current === option ? 'border-brand-blue bg-brand-blue text-white' : 'border-[#a8c9de] bg-white text-brand-blue hover:bg-pale-blue'}`}>{option}</button>)}
    </div>
  </div>
}

export function PageSection({ title, eyebrow, children, tint = false, id }: { title: string; eyebrow?: string; children: ReactNode; tint?: boolean; id?: string }) {
  return <section id={id} className={`section-space ${tint ? 'bg-pale-blue' : ''}`}>
    <div className="container-shell">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="section-title mb-6">{title}</h2>
      {children}
    </div>
  </section>
}
