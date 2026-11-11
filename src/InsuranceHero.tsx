import type { ReactNode } from 'react'
import { ButtonLink, Reveal } from './ui'

export function InsuranceHero({ label, title, intro, quote, photo, rows }: {
  label: string
  title: ReactNode
  intro: string
  quote: { href: string; label: string }
  photo: { src: string; width: number; height: number }
  rows: readonly { label: string; value: ReactNode }[]
}) {
  return <section className="insurance-hero" aria-labelledby="insurance-title">
    <div className="container-shell page-hero-heading insurance-hero-layout">
      <div className="insurance-hero-copy">
        <nav aria-label="Breadcrumb" className="insurance-breadcrumb">
          <ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li><li aria-current="page">{label}</li></ol>
        </nav>
        <h1 id="insurance-title">{title}</h1>
        <p>{intro}</p>
        <ButtonLink href={quote.href}>{quote.label}</ButtonLink>
      </div>
      <Reveal className="insurance-glance-scene">
        <div className="insurance-glance-photo">
          <img src={photo.src} width={photo.width} height={photo.height} alt="" fetchPriority="high" />
        </div>
        <div className="insurance-glance">
          <table>
            <caption>At A Glance</caption>
            <tbody>{rows.map(row => <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </Reveal>
    </div>
  </section>
}
