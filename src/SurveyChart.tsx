import { useId, useState } from 'react'
import type { CSSProperties } from 'react'

const colours = [
  'var(--color-brand-blue)',
  'var(--color-brand-green)',
  'var(--color-amber)',
  'var(--survey-teal)',
  '#91436f',
]
const percent = new Intl.NumberFormat('en-IE', { style: 'percent', maximumFractionDigits: 1 })
const rx = 123
const ry = 98.4
const cx = 135
const cy = 108
const depth = 24.6

function point(angle: number, offset = 0, radius = 1) {
  return [cx + rx * radius * Math.cos(angle), cy + ry * radius * Math.sin(angle) + offset].join(',')
}

type ChartProps = {
  question: string
  answers: readonly (readonly [label: string, count: number])[]
  scale?: { max: number; step: number }
}

export function SurveyChart({ question, answers, scale }: ChartProps) {
  const id = useId()
  const [hovered, setHovered] = useState<number>()
  const [focused, setFocused] = useState<number>()
  const [selected, setSelected] = useState<number>()
  const active = hovered ?? focused ?? selected
  const total = answers.reduce((sum, [, count]) => sum + count, 0)
  let angle = -Math.PI / 2
  const slices = answers.map(([, count]) => {
    const start = angle
    angle += count / total * 2 * Math.PI
    return { start, end: angle, share: count / total }
  })
  const marks = (index: number) => ({
    onPointerEnter: () => setHovered(index),
    onPointerLeave: () => setHovered(undefined),
    onClick: () => setSelected(current => current === index ? undefined : index),
  })

  return <figure className="survey-chart" aria-labelledby={id} onKeyDown={event => {
    if (event.key === 'Escape') {
      setHovered(undefined)
      setFocused(undefined)
      setSelected(undefined)
    }
  }}>
    <figcaption id={id}>{question}</figcaption>
    <div className={'survey-chart-layout ' + (scale ? 'survey-chart-bars' : 'survey-chart-pie')}>
      <div className="survey-plot">
        {scale ? <>
          <div className="survey-bar-plot" style={{ '--grid-step': (scale.step / scale.max * 100) + '%' } as CSSProperties} aria-hidden="true">
            {answers.map(([label, count], i) => <div key={label}
              className={'survey-chart-bar' + (active === i ? ' is-active' : '')}
              style={{ width: (count / scale.max * 100) + '%', backgroundColor: colours[i] }}
              {...marks(i)}
            />)}
          </div>
          <div className="survey-axis" aria-hidden="true">
            {Array.from({ length: scale.max / scale.step + 1 }, (_, i) => <span key={i}>{i * scale.step}</span>)}
          </div>
        </> : <svg className="survey-pie" viewBox="0 0 270 240" aria-hidden="true">
          {slices.map(({ start, end }, i) => {
            const frontStart = Math.max(0, start)
            const frontEnd = Math.min(Math.PI, end)
            if (frontStart >= frontEnd) return null
            const wall = ['M', point(frontStart), 'A', rx, ry, '0 0 1', point(frontEnd),
              'L', point(frontEnd, depth), 'A', rx, ry, '0 0 0', point(frontStart, depth), 'Z'].join(' ')
            return <path key={i} d={wall} fill={'color-mix(in srgb, '+ colours[i] + ' 76%, var(--color-ink))'} {...marks(i)} />
          })}
          {slices.map(({ start, end, share }, i) => {
            const top = ['M', cx, cy, 'L', point(start), 'A', rx, ry, 0, share > .5 ? 1 : 0, 1, point(end), 'Z'].join(' ')
            const [x, y] = point((start + end) / 2, 0, .59).split(',')
            return <g key={i}>
              <path className={active === i ? 'is-active' : undefined} d={top} fill={colours[i]} {...marks(i)} />
              {share >= .2 && <text className={i === 1 || i === 2 ? 'survey-pie-label-dark' : undefined} x={x} y={y}>{percent.format(share)}</text>}
            </g>
          })}
        </svg>}
        {active !== undefined && <div className="survey-chart-tooltip" aria-hidden="true">
          <strong>{answers[active][0]}</strong>
          <span>{answers[active][1]}{!scale && ' (' + percent.format(answers[active][1] / total) + ')'}</span>
        </div>}
      </div>
      <ul className="survey-chart-legend" aria-label="Chart legend">
        {answers.map(([label, count], i) => <li key={label}>
          <button type="button" aria-pressed={selected === i}
            aria-label={label + ', ' + count + ' responses, ' + percent.format(count / total)}
            onFocus={() => setFocused(i)} onBlur={() => setFocused(undefined)} {...marks(i)}>
            <span className="survey-swatch" style={{ backgroundColor: colours[i] }} aria-hidden="true" />
            <span>{label}</span>
          </button>
        </li>)}
      </ul>
    </div>
  </figure>
}
