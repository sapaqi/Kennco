import { mkdir, writeFile } from 'node:fs/promises'

const directory = new URL('../public/assets/fonts/', import.meta.url)
await mkdir(directory, { recursive: true })
const families = [
  { query: 'Plus+Jakarta+Sans:wght@400;500;600;700;800', stem: 'plus-jakarta-sans', variable: true },
  { query: 'Poppins:wght@400;500;600', stem: 'poppins', variable: false },
]
for (const family of families) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${family.query}&display=swap`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' },
  })
  if (!response.ok) throw new Error(`Font stylesheet: HTTP ${response.status}`)
  const css = await response.text()
  const blocks = [...css.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g)].map(match => match[1])
  if (!blocks.length) throw new Error(`No Latin font files for ${family.stem}`)
  const done = new Set()
  for (const block of blocks) {
    const url = block.match(/url\(([^)]+)\)/)?.[1]
    const weight = block.match(/font-weight:\s*([^;]+)/)?.[1]
    if (!url) throw new Error('Missing font URL')
    const suffix = family.variable ? '' : weight === '400' ? '-regular' : `-${weight}`
    const name = `${family.stem}${suffix}-latin.woff2`
    if (done.has(name)) continue
    const font = await fetch(url)
    if (!font.ok) throw new Error(`Font file: HTTP ${font.status}`)
    await writeFile(new URL(name, directory), Buffer.from(await font.arrayBuffer()))
    done.add(name)
    console.log(name)
  }
}
for (const [family, directoryName] of [['poppins', 'poppins'], ['plus-jakarta-sans', 'plusjakartasans']]) {
  const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${directoryName}/OFL.txt`)
  if (!response.ok) throw new Error(`Font licence: HTTP ${response.status}`)
  await writeFile(new URL(`${family}-OFL.txt`, directory), await response.text())
}
