import { EditorialPhotoHero } from './EditorialPhotoHero'
import { ButtonLink, Icon, Reveal } from './ui'

const careersUrl = 'https://www.kennco.ie/careers/'

const highlights = [
  { icon: 'people', title: 'An Irish insurance team', text: 'Join a growing business that values the people behind its service and invests in a skilled team.' },
  { icon: 'shield', title: 'Work that helps customers', text: 'Bring your insurance experience to a team that helps customers find cover and supports them when they need it.' },
  { icon: 'star', title: 'Reward for your work', text: 'KennCo offers competitive pay, employee benefits and performance-related bonuses.' },
] as const

export function Careers() {
  return <>
    <EditorialPhotoHero
      title="Careers at KennCo"
      breadcrumb="Careers"
      description="Put your insurance experience to work with a growing Irish team that cares about the service it gives customers."
      image="careers-workspace"
    >
      <ButtonLink href="#career-opportunities">Explore opportunities</ButtonLink>
    </EditorialPhotoHero>

    <section className="section-space" aria-labelledby="career-team-title">
      <div className="container-shell">
        <Reveal>
          <h2 className="section-title" id="career-team-title">Working at KennCo</h2>
          <p className="career-intro">We’re based in Rathfarnham, Dublin, and help customers with car, home, travel and van insurance. We look for experienced people who take pride in getting the details right.</p>
        </Reveal>
        <div className="career-highlights">
          {highlights.map(({ icon, title, text }) => <Reveal key={title}>
            <article className="career-highlight">
              <span className="insurance-feature-icon"><Icon name={icon} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="career-opportunities" id="career-opportunities" aria-labelledby="career-opportunities-title">
      <div className="container-shell">
        <Reveal className="career-opportunities-inner">
          <div>
            <h2 className="section-title" id="career-opportunities-title">Take the next step</h2>
            <p>Visit KennCo’s careers site for the latest application information.</p>
          </div>
          <ButtonLink href={careersUrl} variant="white">Visit KennCo Careers</ButtonLink>
        </Reveal>
      </div>
    </section>
  </>
}
