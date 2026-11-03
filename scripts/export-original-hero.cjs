const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { readFig } = require('./fig-source.cjs');

// Export the original Figma paths and composition, rather than approximate the hero in CSS.
async function main() {
  if (!process.argv[2]) throw new Error('Usage: node scripts/export-original-hero.cjs "path/to/project.fig"');
  const fig = await readFig(process.argv[2]);
  const output = path.resolve('public/assets');
  fs.mkdirSync(output, { recursive: true });
  const number = value => Number(value.toFixed(5));
  const color = value => `#${['r', 'g', 'b'].map(key => Math.round(value[key] * 255).toString(16).padStart(2, '0')).join('')}`;
  function geometry(index) {
    const bytes = fig.document.blobs[index].bytes;
    const commands = [];
    for (let offset = 0; offset < bytes.length;) {
      const opcode = bytes[offset++];
      const command = ['Z', 'M', 'L', 'Q', 'C'][opcode];
      const length = [0, 2, 2, 4, 6][opcode];
      if (command === undefined) throw new Error(`Unknown path command ${opcode}`);
      const coordinates = [];
      for (let i = 0; i < length; i++, offset += 4) coordinates.push(number(bytes.readFloatLE(offset)));
      commands.push(command + coordinates.join(' '));
    }
    return commands.join(' ');
  }
  const definitions = [];
  function shape(nodeId) {
    const node = fig.nodes.get(nodeId);
    const paint = node.fillPaints.find(paint => paint.visible !== false);
    let fill;
    if (paint.type === 'SOLID') fill = color(paint.color);
    else {
      const gradientId = `paint-${nodeId.replace(':', '-')}`;
      const t = paint.transform;
      definitions.push(`<linearGradient id="${gradientId}" x1="0" y1=".5" x2="1" y2=".5" gradientTransform="matrix(${[t.m00,t.m10,t.m01,t.m11,t.m02,t.m12].map(number).join(' ')})">${paint.stops.map(stop => `<stop offset="${stop.position}" stop-color="${color(stop.color)}"/>`).join('')}</linearGradient>`);
      fill = `url(#${gradientId})`;
    }
    const t = node.transform;
    return `<g transform="matrix(${[t.m00,t.m10,t.m01,t.m11,t.m02,t.m12].map(number).join(' ')})" fill="${fill}">${node.fillGeometry.map(item => `<path d="${geometry(item.commandsBlob)}" fill-rule="${item.windingRule === 'ODD' ? 'evenodd' : 'nonzero'}"/>`).join('')}</g>`;
  }
  const behind = ['2003:1320', '2003:1321', '2003:1322', '2003:1323'].map(shape).join('');
  const foreground = shape('2003:1327');
  const photo = (await sharp(path.join(output, 'hero-1600.webp')).jpeg({ quality: 92 }).toBuffer()).toString('base64');
  definitions.push('<clipPath id="photo-frame"><rect x="0" y="58" width="532" height="464"/></clipPath>');
  definitions.push('<clipPath id="photo-circle"><circle cx="215.07083" cy="375.44095" r="317.17044"/></clipPath>');
  const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="624" height="522" viewBox="0 0 624 522"><defs>${definitions.join('')}</defs>${behind}<g clip-path="url(#photo-frame)"><g clip-path="url(#photo-circle)"><image width="1315.02112" height="591.75946" transform="matrix(-1 0 0 1 1136.28516 -40.68582)" href="data:image/jpeg;base64,${photo}"/></g></g>${foreground}</svg>`;
  fs.writeFileSync(path.join(output, 'hero-original.svg'), artwork);
  for (const [name, hash] of [['hero-background', '7a55e394bc1cdffcefc76880b03ecb99cc8de2e3'], ['hero-background-mobile', 'dea0f3b4219c5c2ec14f1f124cf28e9cb193f1af']]) {
    const source = await fig.zip.file(`images/${hash}`).async('nodebuffer');
    await sharp(source).webp({ lossless: true }).toFile(path.join(output, `${name}.webp`));
  }
  const trustpilot = await fig.zip.file('images/5d5def4e5d1bedb633a3d7f80efb757a7162a962').async('nodebuffer');
  // This crop is the image-fill transform of node 2003:1191 (190 × 146 in the design).
  await sharp(trustpilot).extract({ left: 106, top: 46, width: 380, height: 292 }).png().toFile(path.join(output, 'trustpilot-rating.png'));
  const manifestPath = path.join(output, 'source-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.supplementalAssets = {
    hero: { file: 'hero-original.svg', node: '2003:1319', width: 624, height: 522, originalGeometry: true },
    desktopBackground: { file: 'hero-background.webp', hash: '7a55e394bc1cdffcefc76880b03ecb99cc8de2e3' },
    mobileBackground: { file: 'hero-background-mobile.webp', hash: 'dea0f3b4219c5c2ec14f1f124cf28e9cb193f1af' },
    trustpilot: { file: 'trustpilot-rating.png', node: '2003:1191', hash: '5d5def4e5d1bedb633a3d7f80efb757a7162a962', crop: { left: 106, top: 46, width: 380, height: 292 } },
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log('Exported the original hero artwork, background fills and Trustpilot rating.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
