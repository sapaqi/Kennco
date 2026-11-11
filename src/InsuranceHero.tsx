import type { ReactNode } from 'react'
import { ButtonLink, Reveal } from './ui'

export function InsuranceHero({ label, title, intro, quote, photo, rows, panel, badge, children }: {
  label: string
  title: ReactNode
  intro: string
  children?: ReactNode
  photo: { src: string; width: number; height: number; softFade?: boolean; mirrored?: boolean }
} & (
  | { quote: { href: string; label: string }; rows: readonly { label: string; value: ReactNode }[]; panel?: never; badge?: never }
  | { panel?: ReactNode; badge?: ReactNode; quote?: never; rows?: never }
)) {
  return <section className="insurance-hero" aria-labelledby="insurance-title">
    <div className="container-shell page-hero-heading insurance-hero-layout">
      <div className="insurance-hero-copy">
        <nav aria-label="Breadcrumb" className="insurance-breadcrumb">
          <ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li><li aria-current="page">{label}</li></ol>
        </nav>
        <h1 id="insurance-title">{title}</h1>
        <p>{intro}</p>
        {quote && <ButtonLink href={quote.href}>{quote.label}</ButtonLink>}
        {badge && <div className="insurance-hero-badge">{badge}</div>}
        {children}
      </div>
      <Reveal className={rows ? 'insurance-glance-scene' : 'insurance-glance-scene insurance-quote-scene'}>
        <div className={`insurance-glance-photo${photo.softFade ? ' insurance-glance-photo-soft' : ''}`}>
          <img className={photo.mirrored ? '-scale-x-100' : undefined} src={photo.src} width={photo.width} height={photo.height} alt="" fetchPriority="high" />
        </div>
        {rows ? <div className="insurance-glance">
          <table>
            <caption>At A Glance</caption>
            <tbody>{rows.map(row => <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>)}</tbody>
          </table>
        </div> : panel}
      </Reveal>
    </div>
  </section>
}
