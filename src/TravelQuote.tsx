import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { covers } from './content'
import { Icon } from './ui'
import './travel-quote.css'

const coverOptions = [
  ['Single Trip', 'One trip, up to 180 days (up to 31 days for travellers aged 71–79).'],
  ['Annual Multi-Trip', 'Multiple trips up to 31 days.'],
] as const
const parties = ['Just me', 'A couple', 'My family', 'A group travelling together']
const regions = [['Europe', 'Including the UK and the Mediterranean'], ['Worldwide', 'Everywhere else, including the US']] as const
const ages = ['18–65', '66–70', '71–79', '0–17']
const travelIcon = covers.find(cover => cover.key === 'travel')!.image
const headings = ['Who’s travelling?', 'Where and when?', 'Where should we send your quote?', 'Your quote', 'Your details']
const progressLabels = ['Cover & travellers', 'Destination & dates', 'Your email']
const euros = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' })

function Required() { return <span className="travel-required" aria-hidden="true"> *</span> }

function Choice({ name, value, selected, onChange, description }: {
  name: string; value: string; selected: string; onChange: (value: string) => void; description?: string
}) {
  return <label className={description ? 'travel-choice travel-option' : 'travel-choice travel-chip'}>
    <input type="radio" name={name} value={value} checked={selected === value} onChange={() => onChange(value)} required />
    <span><strong>{value}</strong>{description && <small>{description}</small>}</span>
  </label>
}

function Counter({ label, value, min = 0, max, onChange }: {
  label: string; value: number; min?: number; max: number; onChange: (value: number) => void
}) {
  return <div className="travel-counter">
    <button className="button button-outline" type="button" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
    <output aria-label={label}>{value}</output>
    <button className="button button-outline" type="button" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
  </div>
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return <label className="travel-field"><span>{label}<Required /></span>{children}{hint && <small>{hint}</small>}</label>
}

function Consent({ required, children }: { required?: boolean; children: ReactNode }) {
  return <label className="travel-choice travel-consent">
    <input type="checkbox" required={required} />
    <span>{children}{required && <Required />}</span>
  </label>
}

function Extra({ title, description, price, count, limit, onChange }: {
  title: string; description: string; price: number; count: number; limit: number; onChange: (count: number) => void
}) {
  return <section className={`travel-extra ${count ? 'travel-extra-added' : ''}`}>
    <div className="travel-extra-top">
      <div><h3>{title}</h3><p>{description}</p><strong>{euros.format(price)} per person</strong>
        {count > 0 && <span className="travel-added"><Icon name="check" />Added to your quote</span>}
      </div>
      <button type="button" className="button button-outline" aria-label={`${count ? 'Remove' : 'Add'} ${title.toLowerCase()}`} onClick={() => onChange(count ? 0 : 1)}>{count ? 'Remove' : 'Add'}</button>
    </div>
    {count > 0 && <div className="travel-extra-count"><span>How many people need {title.toLowerCase()}?</span><Counter label={title.toLowerCase()} value={count} min={1} max={limit} onChange={onChange} /></div>}
  </section>
}

export function TravelQuote() {
  const [step, setStep] = useState(1)
  const [cover, setCover] = useState('')
  const [party, setParty] = useState('')
  const [counts, setCounts] = useState([0, 0, 0, 0])
  const [region, setRegion] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [winter, setWinter] = useState(0)
  const [golf, setGolf] = useState(0)
  const [proposer, setProposer] = useState(0)
  const [error, setError] = useState('')
  const [address, setAddress] = useState(false)
  const [finished, setFinished] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const total = counts.reduce((sum, count) => sum + count, 0)
  const adults = total - counts[3]
  const annual = cover === coverOptions[1][0]
  const tripLength = start && end ? Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1 : 0
  const daysLimit = counts[2] > 0 ? 31 : 180
  const fixedPartySize = party === parties[0] ? 1 : party === parties[1] ? 2 : undefined
  const travellers = ages.flatMap((age, index) => Array.from({ length: counts[index] }, () => ({ age, child: index === 3 })))
  const price = (annual ? 91.97 : 80.60) + (annual ? 0 : winter * 12.50) + golf * 17.70
  const tripSummary = [cover, region, `${total} ${total === 1 ? 'traveller' : 'travellers'}`, ...(!annual && tripLength > 0 ? [`${tripLength} ${tripLength === 1 ? 'day' : 'days'}`] : [])].join(' · ')

  useEffect(() => {
    if (step > 1) heading.current?.focus({ preventScroll: true })
  }, [step])

  function go(next: number) {
    setError('')
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function chooseParty(value: string) {
    setParty(value)
    setCounts([value === parties[0] ? 1 : 2, 0, 0, 0])
    setProposer(0)
    setError('')
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step === 1 && (adults < 1 || (fixedPartySize !== undefined ? total !== fixedPartySize : total < 2))) {
      setError(fixedPartySize ? `Select exactly ${fixedPartySize} ${fixedPartySize === 1 ? 'traveller' : 'travellers'}.` : 'Select at least two travellers, including one adult.')
      return
    }
    if (step === 2 && !annual && (tripLength < 1 || tripLength > daysLimit)) {
      setError(`Select a return date that gives a trip of 1 to ${daysLimit} days.`)
      return
    }
    if (step === 3) {
      setWinter(value => Math.min(value, total))
      setGolf(value => Math.min(value, total))
    }
    if (step < 5) go(step + 1)
    else { setFinished(true); window.scrollTo({ top: 0, behavior: 'instant' }) }
  }

  return <div className="travel-quote">
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="quote-header">
      <div className="container-shell travel-header-inner">
        <img className="brand-logo" src="/assets/kennco-logo.png" alt="KennCo Insurance" width="2000" height="1039" />
        <span className="travel-contact"><Icon name="mail" /><span><span className="travel-help-label">Need help? Email </span><strong>travel@kennco.ie</strong></span></span>
      </div>
    </header>
    <main id="main" className={`travel-main ${step === 4 ? 'travel-main-wide' : ''}`}>
      {step < 5 && <div className="travel-progress">
        <div><span className="travel-badge"><img src={`/assets/${travelIcon}.png`} alt="" />Travel</span><strong>{step < 4 ? `Step ${step} of 3` : 'Your quote'}</strong>
          {step < 4 && <span className="travel-progress-label">{progressLabels[step - 1]}</span>}
        </div>
        <progress aria-label="Quote progress" value={Math.min(step, 3)} max={3} />
      </div>}
      <form onSubmit={advance} hidden={step === 4}>
        <section className="travel-panel travel-form-panel">
          {step !== 4 && <h1 tabIndex={-1} ref={heading}>{headings[step - 1]}</h1>}
          <div hidden={step !== 1} className="travel-step">
            <p className="travel-intro">Start with the type of cover you need.</p>
            <fieldset disabled={step !== 1}><legend>Type of cover<Required /></legend>
              {coverOptions.map(([value, description]) => <Choice key={value} name="cover" value={value} description={description} selected={cover} onChange={setCover} />)}
            </fieldset>
            {cover && <fieldset disabled={step !== 1}><legend>Who’s going?<Required /></legend>
              <div className="travel-chips">{parties.map(value => <Choice key={value} name="party" value={value} selected={party} onChange={chooseParty} />)}</div>
            </fieldset>}
            {cover && party && <fieldset disabled={step !== 1}><legend>How many travellers in each age group?<Required /></legend>
              <p className="travel-hint">Proposer must be 18 years or over.</p>
              {ages.slice(0, fixedPartySize ? 3 : 4).map((age, index) => <div className="travel-age" key={age}>
                <strong>Aged {age}{index === 2 && !annual ? ' (Trips up to 31 days)' : ''}</strong>
                <Counter label={`travellers aged ${age}`} value={counts[index]} max={counts[index] + Math.max(0, (fixedPartySize ?? 10) - total)} onChange={value => { setCounts(current => current.map((count, i) => i === index ? value : count)); setProposer(0); setError('') }} />
              </div>)}
              <p className="travel-total" aria-live="polite">{total} {total === 1 ? 'traveller' : 'travellers'}</p>
            </fieldset>}
          </div>
          <div hidden={step !== 2} className="travel-step">
            <p className="travel-intro">{cover || 'Travel insurance'} covers Europe or worldwide travel.</p>
            <fieldset disabled={step !== 2}><legend>Where are you travelling to?<Required /></legend>
              {regions.map(([value, description]) => <Choice key={value} name="region" value={value} description={description} selected={region} onChange={setRegion} />)}
            </fieldset>
            <Field label="Cover start date"><input type="date" lang="en-IE" value={start} onChange={event => { setStart(event.target.value); setError('') }} required disabled={step !== 2} /></Field>
            {!annual && <Field label="Return date"><input type="date" lang="en-IE" value={end} min={start || undefined} onChange={event => { setEnd(event.target.value); setError('') }} required disabled={step !== 2} /></Field>}
            {!annual && tripLength > 0 && <strong className="travel-total">Trip length: {tripLength} {tripLength === 1 ? 'day' : 'days'}</strong>}
          </div>
          <div hidden={step !== 3} className="travel-step">
            <p className="travel-intro">Enter an email address to see the sample price.</p>
            <fieldset disabled={step !== 3}>
              <Field label="Email address"><input type="email" placeholder="you@example.com" required /></Field>
              <div className="travel-consents">
                <Consent required>I have read the <u>Terms of Business</u></Consent>
                <Consent>I agree to be contacted about my quote, discounts, special offers and other relevant information. <u>Privacy Statement</u> (optional)</Consent>
                <Consent required>I accept the <u>Terms &amp; Conditions</u> on which this quote is provided</Consent>
              </div>
            </fieldset>
          </div>
          <div hidden={step !== 5} className="travel-step">
            {finished ? <p className="travel-intro" role="status">You’ve reached the end of the demo. Your details haven’t been submitted.</p> :
              <fieldset disabled={step !== 5}>
                <p className="travel-intro">The policyholder’s address, then everyone travelling.</p>
                <div className="travel-address"><Field label="Eircode"><input id="travel-eircode" type="text" maxLength={8} placeholder="Enter your Eircode" required /></Field>
                  <button className="button button-outline" type="button" onClick={() => {
                    const input = document.getElementById('travel-eircode') as HTMLInputElement
                    if (input.reportValidity()) setAddress(true)
                  }}>Find address</button></div>
                {address && <Field label="Address" hint="Enter a sample address for this demo."><input required /></Field>}
                <Field label="Phone number"><input type="tel" placeholder="087 123 4567" required /></Field>
                <h2>People insured</h2>
                <p className="travel-hint">One traveller must be the proposer, the person the policy is issued to. The proposer must be 18 or over.</p>
                {travellers.map(({ age, child }, index) => <section className="travel-person" key={`${age}-${index}`}>
                  <h3>Traveller {index + 1}{proposer === index ? ' · proposer' : ''}<span className="travel-badge">Aged {age}</span></h3>
                  <Field label="Title"><select defaultValue="" required><option value="" disabled>Select a title</option>{['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr'].map(title => <option key={title}>{title}</option>)}</select></Field>
                  <div className="travel-name-fields"><Field label="First name"><input required /></Field><Field label="Surname"><input required /></Field></div>
                  <Field label="Date of birth" hint={`Must fall in the ${age} band on your cover start date.`}><input type="date" lang="en-IE" max={start || undefined} required /></Field>
                  {proposer !== index && (party === parties[1] ? <p><strong>Relationship to proposer</strong><br /><small>Spouse or partner</small></p> : <Field label="Relationship to proposer"><select defaultValue="" required><option value="" disabled>Select relationship</option>{['Spouse or partner', 'Child', 'Relative', 'Other'].map(relationship => <option key={relationship}>{relationship}</option>)}</select></Field>)}
                  <fieldset><legend>Role<Required /></legend><div className="travel-chips">
                    <button type="button" className="travel-choice travel-chip" aria-pressed={proposer === index} disabled={child} onClick={() => setProposer(index)}>Proposer</button>
                    <button type="button" className="travel-choice travel-chip" aria-pressed={proposer !== index} disabled={proposer === index}>Traveller</button>
                  </div></fieldset>
                </section>)}
              </fieldset>}
          </div>
          {error && <p role="alert" className="travel-error">{error}</p>}
        </section>
        <div className="travel-actions">
          {step === 1 ? <a className="text-link travel-back" href="/get-a-quote/"><Icon name="arrow" />Back</a> : <button type="button" className="text-link travel-back" onClick={() => { setFinished(false); go(step - 1) }}><Icon name="arrow" />Back</button>}
          {!finished && <button type="submit" className="button button-primary">{step === 3 ? 'Get Quote' : 'Next'}</button>}
        </div>
      </form>
      {step === 4 && <div className="travel-result">
        <section className="travel-price travel-panel">
          <h1 tabIndex={-1} ref={heading}>Your quote <small>Ref ET3BBU</small></h1>
          <p className="travel-price-line" aria-live="polite"><strong>{euros.format(price)}</strong> {annual ? 'per year' : 'per trip'}</p>
          <p><strong>{tripSummary}</strong></p>
          <p className="travel-price-note">Example price for this demo.</p>
          <button type="button" className="button button-primary" onClick={() => go(5)}>Proceed with Cover</button>
        </section>
        <div className="travel-result-content">
          {!annual && <section className="travel-switch travel-panel"><div><h2>Want cover for the whole year instead?</h2><p>Annual Multi-Trip covers multiple trips up to 31 days for <strong>€91.97</strong> per year.</p><span className="travel-added"><Icon name="check" />Winter sports cover included as standard</span></div>
            <button type="button" className="button button-outline" onClick={() => { setCover(coverOptions[1][0]); setWinter(0) }}>Switch to Annual Multi-Trip</button>
          </section>}
          <section className="travel-panel travel-result-panel">
            <h2 className="eyebrow">Optional extras – these can change your price</h2>
            {!annual && <Extra title="Winter sports cover" description="Skiing, snowboarding and winter sports equipment" price={12.50} count={winter} limit={total} onChange={setWinter} />}
            <Extra title="Golf cover" description="Clubs, green fees and hole-in-one benefit" price={17.70} count={golf} limit={total} onChange={setGolf} />
            <div className="travel-disclosures faq-list">
              <details className="faq-item"><summary className="faq-trigger">What’s included<span className="faq-plus" aria-hidden="true"><span /><span /></span></summary>
                <div className="faq-answer"><p>Emergency medical assistance, cancellation and curtailment, and personal belongings cover.{annual && ' Winter sports cover is included.'}</p></div></details>
              <details className="faq-item"><summary className="faq-trigger">View summary<span className="faq-plus" aria-hidden="true"><span /><span /></span></summary>
                <div className="faq-answer"><p>{tripSummary}</p><p>Cover starts on {start.split('-').reverse().join('/')}.{!annual && ` Return date: ${end.split('-').reverse().join('/')}.`}</p>
                  {winter > 0 && <p>Winter sports cover: {winter}</p>}{golf > 0 && <p>Golf cover: {golf}</p>}</div></details>
            </div>
            <div className="travel-documents"><h3>Read before you buy</h3><p>Documents for your travel policy.</p>
              <ul>{['Insurance Product Information Document (IPID)', 'Policy booklet', 'Terms of business'].map(label => <li key={label}><Icon name="file" /><span aria-disabled="true">{label}</span></li>)}</ul>
            </div>
          </section>
          <button type="button" className="text-link travel-back" onClick={() => go(3)}><Icon name="arrow" />Back to your email</button>
        </div>
      </div>}
    </main>
  </div>
}
