import type { ReactNode } from 'react'

type EditorialPhotoHeroProps = {
  title: string
  breadcrumb: string
  description: string
  image: 'help-centre-coffee' | 'careers-workspace' | 'meet-the-team'
  children?: ReactNode
}

const imageHeights = {
  'help-centre-coffee': 1066,
  'careers-workspace': 892,
  'meet-the-team': 1076,
}

export function EditorialPhotoHero({ title, breadcrumb, description, image, children }: EditorialPhotoHeroProps) {
  return <section className={`information-hero editorial-photo-hero editorial-photo-hero--${image}`} aria-labelledby="editorial-photo-title">
    <div className="container-shell page-hero-heading editorial-photo-hero-inner">
      <div className="editorial-photo-hero-copy">
        <nav className="insurance-breadcrumb" aria-label="Breadcrumb">
          <ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li><li aria-current="page">{breadcrumb}</li></ol>
        </nav>
        <h1 id="editorial-photo-title">{title}</h1>
        <p>{description}</p>
        {children && <div className="editorial-photo-hero-actions">{children}</div>}
      </div>
      <img
        className="editorial-photo-hero-image"
        src={`/assets/${image}.webp`}
        srcSet={`/assets/${image}-800.webp 800w, /assets/${image}.webp 1600w`}
        sizes="(max-width: 1023px) 100vw, (max-width: 1450px) 62vw, 880px"
        width="1600"
        height={imageHeights[image]}
        alt=""
        fetchPriority="high"
      />
    </div>
  </section>
}
