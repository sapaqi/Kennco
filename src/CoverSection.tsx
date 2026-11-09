import { covers } from './content'
import { Icon, Reveal } from './ui'

const aboutOffers = [
  { ...covers[0], name: 'Car Insurance', description: 'Cover for new, young and returning drivers – competitively priced with cover that fits your needs.' },
  { ...covers[2], name: 'Travel Insurance', description: 'Single-trip, annual multi-trip and family travel cover so you can go away with peace of mind.' },
  { ...covers[1], name: 'Van Insurance', description: 'Reliable cover for your van, backed by the same great service KennCo is known for.' },
  { ...covers[3], name: 'Home Insurance', description: 'Buildings and contents cover for homeowners, first-time buyers and landlords across Ireland.' },
]

export function CoverSection({ about = false }: { about?: boolean }) {
  const offers = about ? aboutOffers : covers
  return <section id="choose-cover" className="cover-section section-space" aria-labelledby="cover-heading">
    <div className="container-shell">
      <Reveal><div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div>
          {!about && <span className="eyebrow mb-3 block">A little peace of mind</span>}
          <h2 id="cover-heading" className="section-title">{about ? 'What we offer' : <>Choose your cover<span className="text-brand-green">.</span></>}</h2>
        </div>
        <p className="max-w-72 text-sm leading-6 text-muted">{about ? 'Get a secure quote online in minutes' : <>Car, van, travel or home.<br />Find the cover that’s right for you.</>}</p>
      </div></Reveal>
      <div className="cover-grid">
        {offers.map((cover, index) => <Reveal key={cover.key} delay={index * 45}><a href={cover.href} className={`cover-card cover-${cover.key}`} aria-label={`Explore ${cover.key} insurance cover`}>
          <div className="cover-illustration" aria-hidden="true"><span className="cover-disc" /><span className="cover-orbit" /><span className="cover-dot" /><img src={`/assets/${cover.image}.png`} alt="" width={cover.width} height={cover.height} className={`cover-icon cover-icon-${cover.key}`} /></div>
          <div className="relative">
            <h3 className="font-heading text-[22px] font-bold md:text-2xl">{cover.name}</h3>
            {'description' in cover ? <p className="mt-2 text-sm leading-relaxed text-muted">{cover.description}</p> : <span className="cover-link">Explore cover<Icon name="arrow" /></span>}
          </div>
        </a></Reveal>)}
      </div>
    </div>
  </section>
}
