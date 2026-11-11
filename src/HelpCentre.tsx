import { FaqAccordion } from './FaqAccordion'
import { HeroCars } from './AdditionalPageUI'
import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { links } from './content'
import { Icon, Reveal } from './ui'
import type { IconName } from './ui'

const claimsHref = 'https://www.kennco.ie/incident-notification-form/'
const mapQuery = encodeURIComponent('KennCo Underwriting Ltd, Grange Road Office Park, Rathfarnham, Dublin 16')
const fieldStyle = 'mt-2 block min-h-11 w-full rounded-md border border-[#8fbad5] bg-white px-3 py-2 font-normal text-ink'
const panelStyle = 'min-w-0 rounded-2xl border border-[#d8e8f2] bg-white p-5 shadow-card sm:p-7'

const actions = [
  { title: 'Make a claim', description: 'Start a car, home or travel claim and see what you’ll need to hand.', label: 'Start a claim', href: '#claims-directory', icon: 'edit' },
  { title: 'Complaints procedure', description: 'Find out the necessary steps to make a complaint.', label: 'View procedure', href: links.complaints, icon: 'document' },
  { title: 'Policy downloads', description: 'Download policy documents, booklets and archived forms.', label: 'View downloads', href: links.documents, icon: 'download' },
] as const

const general = [
  { label: 'KennCo Insurance Landline', value: '01 409 2600', href: 'tel:+35314092600' },
  { label: 'KennCo Insurance Email', value: 'Insurance@Kennco.ie', href: 'mailto:Insurance@Kennco.ie' },
]
const claims = [
  { label: 'Claims Assist', detail: '(select option 4)', value: '01 409 2600', href: 'tel:+35314092600' },
  { label: 'Out of Hours Motor Claims', value: '01 409 2605', href: 'tel:+35314092605' },
  { label: 'Home Insurance Claims', value: '01 409 2609', href: 'tel:+35314092609' },
  { label: 'Travel Medical Emergency', detail: 'MAWDY Assistance', value: '+353 91 545 997', href: 'tel:+35391545997' },
  { label: 'General Travel Claims', detail: 'Non-emergency', value: '091 545 997', href: 'tel:+35391545997' },
]
const hours = [
  { label: 'Mon – Thurs', value: '09:00 – 17:30', detail: 'Closed 13:00 – 14:00' },
  { label: 'Friday', value: '09:00 – 17:00', detail: 'Closed 13:00 – 14:00' },
  { label: 'Sat/Sun', value: 'Closed' },
  { label: 'Bank Holidays', value: 'Closed' },
]
const faqs = [
  { question: 'How do I get a quote?', answer: <>You can get a quote online in minutes for car, home, van or travel cover, or call our team on <a href="tel:+35314092600">01 409 2600</a> during office hours and we’ll talk it through with you.</> },
  { question: 'I bought my policy through a broker — who do I contact?', answer: 'Contact your broker. You can find their details in your purchase email or receipt.' },
  { question: 'How do I make a claim?', answer: <>Find the right number in the <a href="#claims-directory">claims directory</a> or use the <a href={claimsHref}>incident notification form</a> for a motor incident.</> },
  { question: 'What are your opening hours?', answer: <>See the <a href="#opening-hours">opening hours</a> above.</> },
  { question: 'How do I renew my policy?', answer: <>Visit <a href={links.renew}>Renew Now</a> for the available renewal options.</> },
  { question: 'Is my personal information safe?', answer: <>See the <a href={links.privacy}>Privacy Policy</a> for details of how KennCo handles personal information.</> },
  { question: 'Am I entitled to a discount if I have Private Medical Healthcare?', answer: <>See KennCo’s <a href="https://travel.kennco.ie/Documents/travel/FAQ.pdf">travel insurance FAQs</a> for the current answer.</> },
]

function IconBadge({ icon, green = false }: { icon: IconName; green?: boolean }) {
  return <span className={`grid size-11 shrink-0 place-items-center rounded-full text-brand-blue ${green ? 'bg-pale-green' : 'bg-[#d1eafa]'}`}><Icon name={icon} /></span>
}

function PanelTitle({ icon, children, green }: { icon: IconName; children: ReactNode; green?: boolean }) {
  return <h3 className="flex items-center gap-3 font-heading text-xl font-bold text-brand-blue"><IconBadge icon={icon} green={green} />{children}</h3>
}

function DirectoryPanel({ title, icon, rows, id }: { title: string; icon: IconName; rows: { label: string; detail?: string; value: string; href: string }[]; id?: string }) {
  return <div id={id} className={panelStyle}>
    <PanelTitle icon={icon} green>{title}</PanelTitle>
    <dl className="mt-4 divide-y divide-[#d8e8f2] border-y border-[#d8e8f2]">
      {rows.map(row => <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5 text-sm" key={row.label}>
        <dt className="font-semibold">{row.label}{row.detail && <span className="block font-normal text-muted">{row.detail}</span>}</dt>
        <dd><a className="break-all text-brand-blue underline underline-offset-2" href={row.href}>{row.value}</a></dd>
      </div>)}
    </dl>
  </div>
}

function MessageForm() {
  const [status, setStatus] = useState(false)
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(true)
  }
  return <form onSubmit={handleSubmit} id="send-message" className={panelStyle} aria-labelledby="message-heading">
    <h2 id="message-heading" className="section-title text-brand-blue">Send us a message</h2>
    <div className="mt-5 grid gap-4 text-sm font-semibold sm:grid-cols-2">
      <label>Full name*<input className={fieldStyle} name="name" autoComplete="name" placeholder="Joe Bloggs" required /></label>
      <label>Email*<input className={fieldStyle} name="email" type="email" autoComplete="email" placeholder="Example@mail.com" required /></label>
      <label>Policy / reference no (optional)<input className={fieldStyle} name="reference" placeholder="E.g. KC - 123456" /></label>
      <label>Phone number (optional)<input className={fieldStyle} name="phone" type="tel" autoComplete="tel" placeholder="086 123 1234" /></label>
      <label className="sm:col-span-2">Select department *<select className={fieldStyle} name="department" defaultValue="" required>
        <option value="" disabled>Please select</option><option>General &amp; Sales</option><option>Claims</option><option>Complaints</option>
      </select></label>
      <label className="sm:col-span-2">Message*<textarea className={fieldStyle + ' resize-y'} name="message" rows={5} placeholder="How can we help?" required /></label>
    </div>
    <label className="mt-4 flex min-h-11 items-center gap-3 text-sm"><input className="size-5 shrink-0 accent-brand-blue" type="checkbox" required /><span>By submitting this message you agree with our <a className="font-semibold text-brand-blue underline" href={links.privacy}>Privacy Policy</a>.</span></label>
    <button type="submit" className="button mt-4 bg-ink text-white hover:bg-brand-blue">Send message</button>
    {status && <p role="status" className="mt-3 text-sm">This preview does not send messages. To contact KennCo, use the <a className="text-brand-blue underline" href={links.contact}>official contact page</a>.</p>}
  </form>
}

export function HelpCentre() {
  return <>
    <section className="information-hero" aria-labelledby="help-title">
      <div className="container-shell page-hero-heading car-photo-hero-inner grid lg:grid-cols-[1.1fr_1fr] lg:gap-5">
        <div>
          <nav className="insurance-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li><li aria-current="page">Help Centre</li></ol></nav>
          <h1 id="help-title" className="font-heading font-extrabold tracking-tight text-brand-blue">How can we help you?</h1>
          <p className="mt-4 max-w-3xl leading-relaxed">From a quick quote to getting you covered, the KennCo team makes organising your car, home, travel or van insurance as painless as possible.</p>
          <a href="#send-message" className="button mt-5 w-fit bg-ink text-white hover:bg-brand-blue">Send us a message</a>
        </div>
        <aside aria-label="Important information" className="my-4 w-full max-w-[30rem] rounded-xl border border-[#d8e8f2] border-s-4 border-s-brand-blue bg-white px-5 py-4 text-sm leading-normal shadow-card lg:my-0 lg:justify-self-end lg:self-end">
          <p><strong>Please note:</strong> For policies purchased through a broker, contact your broker. Details of which can be found on your purchase email or receipt. Stay vigilant against fraudulent emails. KennCo will only contact you from official company addresses.</p>
        </aside>
        <HeroCars />
      </div>
    </section>

    <section className="section-space" aria-label="Help centre services">
      <div className="container-shell grid gap-4 md:grid-cols-3">
        {actions.map((action, index) => <Reveal key={action.title}><a href={action.href} className={`cover-card gap-3 ${index === 0 ? 'cover-van' : ''}`}>
          <IconBadge icon={action.icon} green={index === 0} />
          <div><h2 className="font-heading text-xl font-bold text-brand-blue">{action.title}</h2><p className="mt-2 text-sm leading-relaxed text-muted">{action.description}</p></div>
          <span className="cover-link">{action.label}<Icon name="arrow" /></span>
        </a></Reveal>)}
      </div>
    </section>

    <section className="bg-pale-blue py-10 lg:py-12" aria-labelledby="department-heading">
      <div className="container-shell">
        <h2 id="department-heading" className="section-title text-center text-brand-blue">Department directory</h2>
        <p className="mt-3 text-center text-sm text-muted">Reach the right team directly. Lines are open during office hours unless marked as 24-hour.</p>
        <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
          <div className="grid min-w-0 gap-4">
            <DirectoryPanel title="General & Sales" icon="phone" rows={general} />
            <div className={panelStyle}>
              <PanelTitle icon="external">Driving abroad?</PanelTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">Taking your car overseas — see the full list of our overseas claims representation offices at <a className="font-semibold text-brand-blue underline" href="https://www.vanameyde.com/offices/">vanameyde.com/offices</a>.</p>
            </div>
          </div>
          <DirectoryPanel title="Claims" icon="edit" rows={claims} id="claims-directory" />
        </div>
      </div>
    </section>

    <section className="section-space" aria-label="Contact KennCo">
      <div className="container-shell grid items-start gap-6 lg:grid-cols-[1.8fr_1fr]">
        <MessageForm />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <div id="opening-hours" className={panelStyle}>
            <PanelTitle icon="clock">Opening hours</PanelTitle>
            <dl className="mt-4 divide-y divide-[#d8e8f2] border-y border-[#d8e8f2]">
              {hours.map(row => <div className="flex justify-between gap-3 py-3 text-sm" key={row.label}><dt>{row.label}</dt><dd className="text-right">{row.value}{row.detail && <span className="block text-xs text-muted">{row.detail}</span>}</dd></div>)}
            </dl>
          </div>
          <div className={panelStyle}>
            <PanelTitle icon="pin">Location</PanelTitle>
            <address className="my-4 text-sm leading-relaxed not-italic">KennCo Underwriting Ltd<br />Suite 5, 6 &amp; 7, Grange Road Office Park<br />Grange Road, Rathfarnham<br />Dublin 16, D16 XV02, Ireland</address>
            <iframe className="h-36 w-full rounded-lg border-0" title="Map of KennCo in Rathfarnham" loading="lazy" src={`https://maps.google.com/maps?q=${mapQuery}&z=11&output=embed`} />
            <a className="mt-3 inline-block text-sm text-brand-blue underline" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}>Open map</a>
          </div>
        </div>
      </div>
    </section>

    <FaqAccordion title="FAQ’s" faqs={faqs} />
  </>
}
