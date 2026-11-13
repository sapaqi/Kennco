import type { ReactNode } from 'react'
import { SurveyChart } from './SurveyChart'
import { PageHero } from './AdditionalPageUI'
import { links } from './content'
import { Icon } from './ui'

export const customerSatisfactionTitle = 'KennCo Customer Satisfaction 2025'
export const surveyTestimonials = [
  {
    "name": "Sean L.",
    "initials": "SL",
    "text": "I dealt with James over the phone to organise a policy for my car. I don’t usually write reviews, but I have to say the experience was second to none. I spoke with 8 different insurance companies before I got on with James at KennCo, and it was by far the most smooth and helpful process. Hats off to James for being such a gentleman and making this typically tedious process so easy."
  },
  {
    "name": "Adrian N.",
    "initials": "AN",
    "text": "I had an excellent experience with Connor from the sales team. From the very beginning, he was professional, attentive, and patient in explaining every detail of the policy. He helped me find the best option for my needs, answered all my questions clearly, and made sure I understood each step of the process. His friendly attitude and dedication made everything much easier and faster. Without a doubt, top-quality service. Thank you very much, Connor!"
  },
  {
    "name": "Sami U.",
    "initials": "SU",
    "text": "It was wonderful experience, I got insurance on my Learner permit and then I updated the license to regular. The information and communication was great, the customer service is also good. On top of all, the insurance was so cheap and very customized according to my own needs. Highly recommend KennCo. Aron Fox was very helpful as he approached and updated the quote by taking information."
  }
]

const surveyResults = [
  {
    scale: { max: 350, step: 50 },
    question: "Overall, how satisfied or dissatisfied are you with the KennCo service?",
    answers: [
      ["Very Satisfied",303],
      ["Somewhat Satisfied",46],
      ["Neither Satisfied Nor Dissatisfied",10],
      ["Somewhat Dissatisfied",24],
      ["Very Dissatisfied",33],
    ],
  },
  {
    question: "How well do our products meet your needs?",
    answers: [
      ["Extremely Well",210],
      ["Very Well",145],
      ["Somewhat Well",42],
      ["Not So Well",12],
      ["Not At All Well",15],
    ],
  },
  {
    question: "How responsive have we been to your questions or concerns about our products?",
    answers: [
      ["Extremely Responsive",215],
      ["Very Responsive",112],
      ["Somewhat Responsive",48],
      ["Not At All Responsive",32],
      ["Not Applicable",17],
    ],
  },
  {
    scale: { max: 240, step: 40 },
    question: "How likely are you to purchase any of our products again?",
    answers: [
      ["Extremely likely",238],
      ["Very likely",99],
      ["Somewhat likely",42],
      ["Not so likely",26],
      ["Not at all likely",14],
    ],
  },
] as const

const contacts = [
  { label: 'KennCo Insurance', number: '01 409 2600', href: 'tel:+35314092600', icon: 'phone' },
  { label: '24-Hour Breakdown', number: '01 499 8316', href: 'tel:+35314998316', icon: 'clock' },
  { label: 'Travel Claim (emergency)', number: '+353 91 545 997', href: 'tel:+35391545997', icon: 'alarm' },
  { label: 'Travel Claim (non-emergency)', number: '091 545 997', href: 'tel:+35391545997', icon: 'phone' },
] as const

export function CustomerSatisfaction({ children }: { children: ReactNode }) {
  return <>
    <PageHero title={customerSatisfactionTitle} label={customerSatisfactionTitle} cars
      intro="We pride ourselves in having a high standard of customer service throughout all our departments here in KennCo."
    />

    <section className="section-space survey-results" aria-labelledby="survey-results-title">
      <div className="container-shell">
        <div className="survey-intro">
          <h2 className="sr-only" id="survey-results-title">Customer Satisfaction Survey results</h2>
          <p>We pride ourselves in having a high standard of customer service throughout all our departments here in KennCo. KennCo customer reviews are important to us and allow us to improve and get customer feedback.</p>
          <p>Our most recent Customer Satisfaction Survey results (<time dateTime="2025-01">January 2025</time> – <time dateTime="2025-12">December 2025</time>) are outlined below:</p>
        </div>

        <div className="survey-charts">
          {surveyResults.map(chart => <SurveyChart key={chart.question} {...chart} />)}
        </div>
      </div>
    </section>

    {children}

    <section className="section-space survey-contact-section" aria-labelledby="survey-contact-title">
      <div className="container-shell">
        <div className="survey-contact">
          <h2 className="section-title" id="survey-contact-title">Always on hand to help</h2>
          <p>If you would like to talk to any of our customer care agents give us a call on <a href="tel:+35314092600">01 409 2600</a> and follow the instructions.</p>
          <ul className="survey-contact-grid">
            {contacts.map(({ label, number, href, icon }) => <li key={label}>
              <a href={href} className="survey-contact-number">
                <span className="insurance-feature-icon" aria-hidden="true"><Icon name={icon} /></span>
                <span><span className="survey-phone">{number}</span><span>{label}</span></span>
              </a>
            </li>)}
          </ul>
          <a className="text-link" href={links.contact}>Contact us<Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  </>
}
