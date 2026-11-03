import { readFile, mkdir, writeFile } from 'node:fs/promises'

const content = await Promise.all(['src/content.ts', 'src/App.tsx'].map(path => readFile(path, 'utf8')))
const urls = [...new Set(content.join('\n').match(/https:\/\/[^\s'"<>}]+/g))]
  .filter(url => new URL(url).hostname === 'www.kennco.ie')
const results = []
for (let offset = 0; offset < urls.length; offset += 4) {
  const group = await Promise.all(urls.slice(offset, offset + 4).map(async url => {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) })
      await response.body?.cancel()
      return { url, status: response.status, resolved: response.url }
    } catch (error) { return { url, error: error.message } }
  }))
  results.push(...group)
  for (const result of group) console.log(result.status ?? 'ERROR', result.url)
}
await mkdir('.qa', { recursive: true })
await writeFile('.qa/link-check.json', `${JSON.stringify(results, null, 2)}\n`)
if (results.some(result => !result.status || result.status >= 400)) process.exitCode = 1
