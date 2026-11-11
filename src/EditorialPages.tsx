import { useState } from 'react'
import { articles } from './content'
import { article, blogHero, featured, mediaHero, mediaPanels, mediaStory } from './editorial-design'
import { PageFilters, PageHero, PageSearch, PageSection, pagePanel } from './AdditionalPageUI'
import { Pagination } from './Pagination'
import { ButtonLink, Icon } from './ui'

export const articlePath = '/blog/fire-brigade-charges-after-a-car-accident/'

export function ArticleCard({ item }: { item: (typeof articles)[number] }) {
  return <article className="news-card">
    <a href={item.href} className="news-image-link" aria-hidden="true" tabIndex={-1}><img src={`/assets/${item.image}-800.webp`} srcSet={`/assets/${item.image}-480.webp 480w, /assets/${item.image}-800.webp 800w`} sizes="(min-width: 768px) 33vw, 100vw" alt={item.alt} width="800" height="533" loading="lazy" /></a>
    <div className="news-content">
      <div className="article-meta"><span className={`news-category category-${item.category.toLowerCase()}`}>{item.category}</span><time dateTime={item.dateTime}>{item.date}</time></div>
      <h3 className="mt-4 font-heading text-lg font-bold leading-[1.5]"><a href={item.href}>{item.title}</a></h3>
      <p className="mt-3 grow text-sm leading-7 text-muted">{item.excerpt}</p>
      <a href={item.href} className="text-link mt-5 text-sm">{item.linkLabel}<Icon name="arrow" /></a>
    </div>
  </article>
}

// The Figma listing repeats the same three sample articles across six rows.
const blogCards = [
  0, 1, 2,
  1, 2, 0,
  0, 1, 2,
  1, 2, 0,
  0, 1, 2,
  1, 2, 0,
].map((articleIndex, id) => ({ item: articles[articleIndex], id }))
const blogPageSize = 9

export function BlogPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const matches = (value: string) => value.toLowerCase().includes(query.toLowerCase())
  const showFeatured = (filter === 'All' || filter === featured[1]) && matches(featured[4] + ' ' + featured[5])
  const results = blogCards.filter(({ item }) => (filter === 'All' || item.category === filter) && matches(item.title + ' ' + item.excerpt))
  const pageCount = Math.ceil(results.length / blogPageSize)
  const pageItems = results.slice((page - 1) * blogPageSize, page * blogPageSize)

  function changePage(nextPage: number) {
    if (nextPage === page) return
    setPage(nextPage)
    document.getElementById('blog-articles')?.scrollIntoView()
  }

  return <>
    <PageHero label="Blog" title={blogHero[0]} intro={blogHero[1]} cars><PageSearch label={blogHero[2]} onSearch={value => {
      setQuery(value)
      setPage(1)
    }} /></PageHero>
    <PageFilters options={['All', 'Learn', 'News', 'Media centre']} current={filter} onChange={value => {
      setFilter(value)
      setPage(1)
    }} />
    {filter === 'Media centre' ? <PageSection title="Media centre"><ButtonLink href="/media-centre/">Visit the Media Centre</ButtonLink></PageSection> : <div className="blog-listings">
      {showFeatured && <PageSection title={featured[0]}>
        <article className="grid overflow-hidden rounded-2xl border border-[#d8e8f2] bg-pale-blue md:grid-cols-2">
          <div className="relative aspect-video md:aspect-auto">
            <img className="absolute inset-0 size-full object-cover" src="/assets/blog-featured.webp" width="1440" height="960" alt="" />
          </div>
          <div className="self-center p-6 sm:p-8">
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-blue"><span className="news-category category-learn">{featured[1]}</span>{featured[2]} · {featured[3]}</p>
            <h3 className="mt-3 font-heading text-2xl font-bold"><a href={articlePath}>{featured[4]}</a></h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{featured[5]}</p>
            <ButtonLink href={articlePath} className="mt-5" variant="outline">{featured[6]}</ButtonLink>
          </div>
        </article>
      </PageSection>}
      {(results.length > 0 || !showFeatured) && <PageSection id="blog-articles" title="Latest news and articles">
        {pageItems.length ? <div className="grid gap-7 md:grid-cols-3">{pageItems.map(({ item, id }) => <ArticleCard key={id} item={item} />)}</div> : <p role="status">No articles match your search.</p>}
        <Pagination page={page} pageCount={pageCount} onPageChange={changePage} label="Blog pages" />
      </PageSection>}
    </div>}
  </>
}

export function BlogArticlePage() {
  const [copyStatus, setCopyStatus] = useState('')
  const articleUrl = window.location.href
  const url = encodeURIComponent(articleUrl)
  const title = encodeURIComponent(article[1])
  const shareClass = 'grid size-11 shrink-0 place-items-center rounded-full bg-brand-blue text-white hover:bg-ink'

  return <>
    <PageHero label="Article" parent={{ label: 'Blog', href: '/blog/' }} title={article[1]}>
      <p className="mt-3 text-sm text-muted">{article[2]}</p>
    </PageHero>
    <div className="container-shell section-space">
    <a href="/blog/" className="text-link mb-6">← {article[0]}</a>
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)]">
      <article className="min-w-0">
        <div className="my-5 flex flex-wrap items-center justify-between gap-3 border-y border-[#d8e8f2] py-3 text-sm">
          <div className="flex items-center gap-3">
            <img src="/assets/blog-author.webp" className="size-10 rounded-full" width="120" height="120" alt="" />
            <span>{article[3]} <strong>{article[4]}</strong></span>
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Share article">
            <span className="mr-1 font-semibold">{article[5]}</span>
            <a className={shareClass} aria-label="Share on Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.6v8Z" /></svg>
            </a>
            <a className={shareClass} aria-label="Share on X" href={`https://x.com/intent/post?url=${url}&text=${title}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.9 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.4 4H5.6Z" /></svg>
            </a>
            <a className={shareClass} aria-label="Share on WhatsApp" href={`https://wa.me/?text=${title}%20${url}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M5 18 3.5 21l4-1A8.5 8.5 0 1 0 5 18Z" /><path d="M9 8c-2 1 1 6 4 7 1 .4 2 0 2.5-1l-2.2-1.5-.8 1c-1.3-.6-2.3-1.7-2.8-3l.8-.7L9 8Z" /></svg>
            </a>
            <a className={shareClass} aria-label="Share by email" href={`mailto:?subject=${title}&body=${url}`}><Icon name="mail" /></a>
            <button type="button" className={shareClass} aria-label="Copy article link" onClick={async () => {
              try {
                await navigator.clipboard.writeText(articleUrl)
                setCopyStatus('Link copied')
              } catch {
                setCopyStatus('Could not copy the link')
              }
            }}><Icon name={copyStatus === 'Link copied' ? 'check' : 'external'} /></button>
            <span role="status" className="text-xs text-muted">{copyStatus}</span>
          </div>
        </div>
        <div className="grid gap-6 leading-relaxed">
          <p>{article[6]}</p>
          <img className="aspect-video w-full rounded-xl object-cover" src="/assets/article-fire-brigade.webp" alt="" width="1440" height="960" />
          <div><h2 className="section-title mb-3">{article[7]}</h2><p>{article[8]}</p></div>
          <blockquote className="rounded-e-xl border-s-4 border-brand-green bg-pale-green p-5">{article[9]}</blockquote>
          <div className="grid items-start gap-5 md:grid-cols-2"><div><h3 className="font-heading text-xl font-bold">{article[10]}</h3><p className="mt-3 whitespace-pre-line">{article[11]}</p></div><img className="rounded-xl" src="/assets/article-fire-service.webp" alt="" width="1440" height="960" loading="lazy" /></div>
          <div><h4 className="font-heading text-xl font-bold">{article[12]}</h4><ul className="mt-3 list-disc space-y-2 pl-5">{article.slice(13, 16).map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <nav className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[#d8e8f2] pt-5" aria-label="Adjacent blog posts">
          <ButtonLink href="https://www.kennco.ie/are-e-scooters-legal-in-ireland/" variant="outline" arrow={false}><Icon name="arrow" className="rotate-180" />Previous</ButtonLink>
          <ButtonLink href="https://www.kennco.ie/is-home-insurance-a-legal-requirement-in-ireland/" variant="outline">Next</ButtonLink>
        </nav>
      </article>
      <aside aria-label="Related articles"><h2 className="section-title mb-5">Related articles</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{articles.map(item => <ArticleCard key={item.title} item={item} />)}</div></aside>
    </div>
    </div>
  </>
}

export function MediaCentrePage() {
  return <>
    <PageHero label="Media Centre" title={mediaHero[0]} intro={mediaHero[1]}><ButtonLink className="mt-5" href="#press-releases" variant="outline">Latest news</ButtonLink></PageHero>
    <PageSection title={mediaStory[1]} eyebrow={mediaStory[0]}><p className="max-w-3xl whitespace-pre-line leading-relaxed text-muted">{mediaStory[2]}</p></PageSection>
    <PageSection title="Media resources" tint>
      <div className="grid gap-5 md:grid-cols-2">
        <article className={pagePanel}>
          <h3 className="font-heading text-xl font-bold">{mediaPanels[0]}</h3><p className="mt-3 leading-relaxed text-muted">{mediaPanels[1]}</p>
          <div className="mt-5 rounded-xl bg-pale-green p-4"><p className="eyebrow">{mediaPanels[2]}</p><p className="mt-2 font-semibold">{mediaPanels[3]}</p><a className="text-link mt-2 break-all" href={`mailto:${mediaPanels[4]}`}>{mediaPanels[4]}</a></div>
        </article>
        <article className={pagePanel}>
          <h3 className="font-heading text-xl font-bold">{mediaPanels[5]}</h3><p className="mt-3 leading-relaxed text-muted">{mediaPanels[6]}</p>
          <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm sm:grid-cols-2">{[...mediaPanels[8].split('\n'), ...mediaPanels[7].split('\n')].map(item => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className={pagePanel + ' md:col-span-2'}>
          <h3 className="font-heading text-xl font-bold">{mediaPanels[9]}</h3><div className="mt-4 grid gap-5 md:grid-cols-2">{mediaPanels.slice(10).map(entry => {
            const [heading, body] = entry.split('\u2028')
            return <div key={heading}><h4 className="font-semibold">{heading}</h4><p className="mt-2 text-sm leading-relaxed text-muted">{body.replace('[Name@email.com ]', mediaPanels[4])}</p></div>
          })}</div>
        </article>
      </div>
    </PageSection>
    <PageSection id="press-releases" title="Press releases & announcements"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{articles.map(item => <ArticleCard key={item.title} item={item} />)}</div></PageSection>
  </>
}
