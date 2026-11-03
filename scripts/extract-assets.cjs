const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { readFig } = require('./fig-source.cjs');

async function main() {
  const filename = process.argv[2];
  if (!filename) throw new Error('Usage: node scripts/extract-assets.cjs "path/to/project.fig" (Node 22.15+ or 24+)');
  const fig = await readFig(filename);
  const output = path.resolve('public/assets');
  fs.mkdirSync(output, { recursive: true });
  const manifest = { source: path.basename(filename), assets: [] };
  const assets = [
    { name: 'kennco-logo', hash: '6946edfb5c33428e0fe40f4bee90ffda399c97f3', kind: 'logo', node: '2003:427' },
    { name: 'cover-car', hash: '5f34625018e50121d41ba6597b7628dfcdb29afa', kind: 'icon', node: '2003:1020' },
    { name: 'cover-van', hash: '55777502646c14ea6f62891db7df7389e5953ed6', kind: 'icon', node: '2003:1024' },
    { name: 'cover-travel', hash: '61453aa23b27553b72c2308cb9fe2d8d1c3cd06b', kind: 'icon', node: '2003:1022' },
    { name: 'cover-home', hash: '5b0a402b498a18860cf05c0c5f68bbe800aa2838', kind: 'icon', node: '2003:1018' },
    { name: 'hero', hash: 'c2bcffb6797fc5f3a53af6158287b92c14bb3b61', kind: 'photo', node: '2003:1326', widths: [960, 1600] },
    { name: 'news-driving', hash: '20b602710576f653ebc6f6c77aedc5eda7ada1f7', kind: 'photo', widths: [480, 800] },
    { name: 'news-scooter', hash: 'fc43446c723294c1ff6fa7b8402421a2852c8f3b', kind: 'photo', widths: [480, 800] },
    { name: 'news-home', hash: 'bf1a9617fec02cac278cfc7e148cdba515621f97', kind: 'photo', widths: [480, 800] },
  ];
  for (const asset of assets) {
    const entry = fig.zip.file(`images/${asset.hash}`);
    if (!entry) throw new Error(`Missing source asset: ${asset.name}`);
    const bytes = await entry.async('nodebuffer');
    const metadata = await sharp(bytes).metadata();
    const files = [];
    if (asset.kind === 'logo') {
      // Preserve the exact original pixels. The supplied Figma logo is a PNG, not a vector.
      fs.writeFileSync(path.join(output, `${asset.name}.png`), bytes);
      files.push(`${asset.name}.png`);
    } else if (asset.kind === 'icon') {
      // Only remove transparent canvas; retain the original artwork and its colours.
      await sharp(bytes).trim({ threshold: 5 }).resize({ width: 640, height: 440, fit: 'inside', withoutEnlargement: true }).png().toFile(path.join(output, `${asset.name}.png`));
      files.push(`${asset.name}.png`);
    } else {
      for (const width of asset.widths) {
        const name = `${asset.name}-${width}.webp`;
        await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 85, effort: 5 }).toFile(path.join(output, name));
        files.push(name);
      }
    }
    manifest.assets.push({ ...asset, original: { width: metadata.width, height: metadata.height, format: metadata.format }, files });
  }
  // The original favicon in the source file is supplied as a raster too.
  const faviconBytes = await fig.zip.file('images/f3f163565e12f1b98aab936dbc5011af1274f4b8').async('nodebuffer');
  await sharp(faviconBytes).resize(64, 64).png().toFile(path.join(output, 'favicon.png'));
  fs.writeFileSync(path.join(output, 'source-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Exported ${manifest.assets.length} original Figma assets to public/assets.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
