import type { ReactNode } from 'react'
import { links } from './content'
import { ButtonLink } from './ui'
import { AboutContent } from './AboutContent'

const pages = [
  {
    path: '/cancel-policy',
    title: 'Cancel Policy',
    description: 'Use the KennCo cancellation page to review the information you need and submit a request.',
    linkLabel: 'Go to the cancellation form',
    href: 'https://www.kennco.ie/cancel-policy/',
  },
  {
    path: '/about',
    title: 'Irish-owned insurance, built on service & stability',
  },
  {
    path: '/terms-of-business',
    title: 'Terms of Business',
    description: 'Read the terms under which KennCo Insurance provides its services.',
    linkLabel: 'View Terms of Business',
    href: links.terms,
  },
]

export function findInformationPage(path: string) {
  return pages.find(page => page.path === path.replace(/\/$/, ''))
}

export function InformationHero({ title, about = false }: { title: string; about?: boolean }) {
  return <section className="information-hero" aria-labelledby="information-title">
    <div className={`container-shell information-hero-inner${about ? ' about-hero-inner' : ''}`}>
      {about
        ? <img className="about-hero-photo" src="/assets/about-hero.webp" width="2600" height="1164" alt="" fetchPriority="high" />
        : <img className="information-hero-photo" src="/assets/information-hero.webp" alt="" fetchPriority="high" />}
      <div className="information-hero-copy">
        <nav className="insurance-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{about ? 'About Us' : title}</li>
          </ol>
        </nav>
        <h1 id="information-title" className="font-heading font-extrabold tracking-tight text-brand-blue">{title}</h1>
        {about && <>
          <p className="mt-4 max-w-prose text-sm leading-relaxed">Founded in 2008 and based in Rathfarnham, Co. Dublin, KennCo is part of one of Ireland’s largest underwriting agencies – offering car, home, travel and van insurance where <strong>service, stability and security come as standard.</strong></p>
          <ButtonLink href={links.contact} variant="outline" className="mt-5" arrow={false}>Contact Us</ButtonLink>
        </>}
      </div>
    </div>
  </section>
}

export function InformationPage({ page, children }: { page: (typeof pages)[number]; children?: ReactNode }) {
  const about = page.path === '/about'
  return <>
    <InformationHero title={page.title} about={about} />
    {page.href ? <div className="container-shell py-10 sm:py-14">
      <p className="mb-5 max-w-prose leading-relaxed">{page.description}</p>
      <ButtonLink href={page.href} variant="outline">{page.linkLabel}</ButtonLink>
    </div> : <AboutContent>{children}</AboutContent>}
  </>
}
