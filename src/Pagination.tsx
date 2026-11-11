import { Fragment } from 'react'
import { Icon } from './ui'

export function Pagination({ page, pageCount, onPageChange, label = 'Pagination' }: {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  label?: string
}) {
  if (pageCount < 2) return null

  const pages = [...new Set([1, page - 1, page, page + 1, pageCount])]
    .filter(number => number >= 1 && number <= pageCount)
    .sort((first, second) => first - second)
  const control = 'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold'
  const inactive = 'border-[#a8c9de] bg-white text-brand-blue enabled:hover:bg-pale-blue disabled:cursor-not-allowed disabled:opacity-50'

  return <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label={label}>
    <button type="button" className={`${control} ${inactive}`} onClick={() => onPageChange(page - 1)} disabled={page === 1}>
      <Icon name="arrow" className="size-4 rotate-180" />Back
    </button>
    {pages.map((number, index) => <Fragment key={number}>
      {index > 0 && number - pages[index - 1] > 1 && <span className="px-1 text-muted" aria-hidden="true">…</span>}
      <button type="button" className={`${control} ${number === page ? 'border-brand-blue bg-brand-blue text-white' : inactive}`}
        aria-label={`Page ${number}`} aria-current={number === page ? 'page' : undefined} onClick={() => onPageChange(number)}>
        {number}
      </button>
    </Fragment>)}
    <button type="button" className={`${control} ${inactive}`} onClick={() => onPageChange(page + 1)} disabled={page === pageCount}>
      Next<Icon name="arrow" className="size-4" />
    </button>
  </nav>
}
