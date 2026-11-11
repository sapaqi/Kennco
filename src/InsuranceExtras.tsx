import { InsuranceExtraArt, Reveal, type IconName } from './ui'

type InsuranceExtra = {
  title: string
  body: string
  tone: 'blue' | 'green' | 'teal' | 'amber'
  icon: IconName
}

export function InsuranceExtras({ eyebrow, title, items }: {
  eyebrow: string
  title: string
  items: readonly InsuranceExtra[]
}) {
  return <section className="insurance-extras section-space" aria-labelledby="extras-title">
    <div className="container-shell">
      <Reveal><div className="insurance-section-heading"><span className="eyebrow">{eyebrow}</span><h2 id="extras-title" className="section-title mt-3">{title}</h2></div></Reveal>
      <div className="insurance-extras-grid">{items.map((extra, index) => <Reveal key={extra.title} className="h-full" delay={index * 45}>
        <article className={`insurance-extra insurance-extra-${extra.tone}`}>
          <InsuranceExtraArt icon={extra.icon} />
          <h3>{extra.title}</h3><p>{extra.body}</p>
        </article>
      </Reveal>)}</div>
    </div>
  </section>
}
