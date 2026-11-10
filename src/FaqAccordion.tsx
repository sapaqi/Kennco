import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { Icon, Reveal } from './ui'

export function FaqAccordion({ title, faqs }: {
  title: string
  faqs: readonly { question: string; answer: ReactNode }[]
}) {
  const id = useId()
  const [open, setOpen] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  return <section className="insurance-faq section-space" id="faqs" aria-labelledby={`${id}-title`}>
    <div className="container-shell">
      <Reveal><div className="insurance-faq-heading">
        <h2 className="section-title" id={`${id}-title`}>{title}</h2>
        <button className="text-link" type="button" aria-pressed={showAll} onClick={() => setShowAll(value => !value)}>View all FAQs<Icon name="arrow" /></button>
      </div></Reveal>
      <Reveal><div className="faq-list">
        {faqs.map((faq, index) => {
          const expanded = showAll || open === index
          const buttonId = `${id}-button-${index}`
          const answerId = `${id}-answer-${index}`
          return <div key={index} className={`faq-item ${expanded ? 'faq-open' : ''}`}>
            <h3><button className="faq-trigger" type="button" id={buttonId} aria-expanded={expanded} aria-controls={answerId} onClick={() => {
              setShowAll(false)
              setOpen(expanded ? null : index)
            }}>{faq.question}<span className="faq-plus" aria-hidden="true"><span /><span /></span></button></h3>
            <div className="faq-answer [&_a]:text-brand-blue [&_a]:underline" role="region" id={answerId} aria-labelledby={buttonId} hidden={!expanded}><p>{faq.answer}</p></div>
          </div>
        })}
      </div></Reveal>
    </div>
  </section>
}
