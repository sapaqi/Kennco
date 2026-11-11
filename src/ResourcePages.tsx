import { useState } from 'react'
import { PageFilters, PageHero, PageSearch, PageSection, pagePanel } from './AdditionalPageUI'
import { faqGroups } from './faq-design'
import { Pagination } from './Pagination'
import { ButtonLink, Icon } from './ui'

const mainFiles = 'https://www.kennco.ie/files/'
const travelFiles = 'https://brokers.kennco.ie/files/travel/'
const documents = [
  { title: 'Private Motor', files: [
    ['KennCo Choice Private Car IPID', 'IPID', mainFiles + 'motor/KennCo-Choice-Private-Car-IPID.pdf'],
    ['KennCo Choice Private Car Policy Wording (June 2026)', 'Policy booklet', mainFiles + 'KennCo-Choice-Private-Car-Policy-Wording-WEF-June-2026.pdf'],
    ['KennCo Unique Private Car IPID', 'IPID', mainFiles + 'motor/KennCo-Unique-Private-Car-IPID.pdf'],
    ['KennCo Unique Motor Policy Wording', 'Policy booklet', mainFiles + 'KennCo-Unique-Policy-Booklet.pdf'],
  ] },
  { title: 'Home', files: [
    ['KennCo Household Insurance IPID', 'IPID', mainFiles + 'home/KennCo-Household-Insurance-IPID.pdf'],
    ['KennCo Household Insurance Policy Booklet', 'Policy booklet', mainFiles + 'home/KennCo-Household-Insurance-Policy-Booklet-WEF-05-2026.pdf'],
  ] },
  { title: 'Travel', files: [
    ['KennCo Travel Insurance Policy Wording', 'Policy booklet', travelFiles + 'Travel-Insurance-Policy-Wording.pdf'],
    ['KennCo Travel Insurance IPID', 'IPID', travelFiles + 'Travel-Insurance-IPID.pdf'],
  ] },
  { title: 'Claims Forms', files: [
    ['KennCo Motor Incident Report Form', 'Claims form', mainFiles + 'KennCo-Motor-Incident-Report-Form.pdf'],
  ] },
]

export function PolicyDownloadsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const results = documents.filter(group => category === 'All' || category === group.title).map(group => ({
    ...group, files: group.files.filter(([name, type]) => (name + ' ' + type).toLowerCase().includes(query.toLowerCase())),
  })).filter(group => group.files.length)
  return <>
    <PageHero label="Policy downloads" title="Policy documents & downloads" intro="Download IPIDs, policy booklets and forms. Documents are updated as needed — older versions live in the archive." cars>
      <PageSearch label="Search documents" onSearch={setQuery} />
    </PageHero>
    <PageFilters options={['All', ...documents.map(group => group.title)]} current={category} onChange={setCategory} />
    <div className="container-shell section-space space-y-8">
      {!results.length && <p role="status">No documents match your search.</p>}
      {results.map(group => <section key={group.title}>
        <h2 className="section-title mb-4">{group.title}</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {group.files.map(([name, type, href]) => <li key={href}><a href={href} className={pagePanel + ' flex h-full items-center gap-4 hover:border-brand-blue'}>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-pale-blue text-brand-blue"><Icon name="document" /></span>
            <span className="flex-1"><strong className="block font-heading">{name}</strong><span className="mt-1 inline-block rounded bg-pale-green px-2 py-1 text-xs">{type}</span></span>
            <Icon name="download" className="shrink-0 text-brand-blue" />
          </a></li>)}
        </ul>
      </section>)}
    </div>
    <PageSection title="Looking for an older version?" tint>
      <p className="mb-5 text-muted">Archived IPIDs and policy booklets are kept in our file archive.</p>
      <ButtonLink href="https://brokers.kennco.ie/download-archives/" variant="outline">View file archive</ButtonLink>
    </PageSection>
  </>
}

const faqCategories = ['All', 'Car', 'Home', 'Travel', 'Van'] as const
const faqGroupsPerPage = 3

export function FaqDirectoryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const results = faqGroups.map(group => ({
    ...group,
    faqs: group.faqs.filter(faq => !faq.question.startsWith('Lorem ipsum') && (
      category === 'All' || !/\b(car|home|travel|van)s?\b/i.test(faq.question) || new RegExp(`\\b${category}s?\\b`, 'i').test(faq.question)
    ) && (faq.question + ' ' + (faq.answer ?? '')).toLowerCase().includes(query.toLowerCase())),
  })).filter(group => group.faqs.length)
  const pageCount = Math.ceil(results.length / faqGroupsPerPage)
  const visibleGroups = results.slice((page - 1) * faqGroupsPerPage, page * faqGroupsPerPage)

  function changePage(nextPage: number) {
    if (nextPage === page) return
    setPage(nextPage)
    document.getElementById('faq-results')?.scrollIntoView()
  }

  return <>
    <PageHero label="Frequently Asked Questions" title="Insurance questions, answered" intro="Choose a product below to see the questions we're asked most — about cover, claims, discounts and payments." cars>
      <PageSearch label="Search any insurance question" onSearch={value => {
        setQuery(value)
        setPage(1)
      }} />
    </PageHero>
    <PageFilters options={faqCategories} current={category} onChange={value => {
      setCategory(value)
      setPage(1)
    }} />
    <div id="faq-results" className="container-shell faq-directory section-space space-y-8">
      {!results.length && <p role="status">No questions match your search.</p>}
      {visibleGroups.map(group => <section key={group.title}>
        <h2 className="section-title mb-4">{group.title}</h2>
        <div className="faq-list">
          {group.faqs.map(faq => <details key={faq.question} className="faq-item">
            <summary className="faq-trigger cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              {faq.question}<span className="faq-plus" aria-hidden="true"><span /><span /></span>
            </summary>
            <div className="faq-answer [&_a]:text-brand-blue [&_a]:underline">
              <p>{faq.answer ?? <>For help with this question, <a href="/help-centre/#send-message">contact the KennCo team</a>.</>}</p>
            </div>
          </details>)}
        </div>
      </section>)}
      <Pagination page={page} pageCount={pageCount} onPageChange={changePage} label="FAQ pages" />
    </div>
    <PageSection title="Didn’t find an answer?" tint>
      <p className="mb-5 text-muted">Our team is happy to help during office hours.</p>
      <div className="flex flex-wrap gap-3"><ButtonLink href="tel:+35314092600" arrow={false}>Call Us · 01 409 2600</ButtonLink><ButtonLink href="/help-centre/#send-message" variant="outline">Message us</ButtonLink></div>
    </PageSection>
  </>
}
