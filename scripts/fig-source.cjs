/* Reads the embedded Kiwi schema in a local .fig export. No network or Figma account required. */
const fs = require('node:fs');
const zlib = require('node:zlib');
const JSZip = require('jszip');

class ByteReader {
  constructor(bytes) { this.bytes = bytes; this.offset = 0; }
  byte() {
    if (this.offset >= this.bytes.length) throw new Error('Unexpected end of Figma data');
    return this.bytes[this.offset++];
  }
  uint() {
    let value = 0, shift = 0, byte;
    do { byte = this.byte(); value |= (byte & 127) << shift; shift += 7; } while (byte & 128 && shift < 35);
    return value >>> 0;
  }
  int() { const value = this.uint(); return value & 1 ? ~(value >>> 1) : value >>> 1; }
  string() {
    const end = this.bytes.indexOf(0, this.offset);
    if (end < 0) throw new Error('Unterminated Figma string');
    const value = this.bytes.toString('utf8', this.offset, end); this.offset = end + 1; return value;
  }
  float() {
    if (this.bytes[this.offset] === 0) { this.offset++; return 0; }
    const bits = this.bytes.readUInt32LE(this.offset); this.offset += 4;
    const value = Buffer.alloc(4); value.writeUInt32LE(((bits << 23) | (bits >>> 9)) >>> 0); return value.readFloatLE();
  }
  uint64() {
    let value = 0n, shift = 0n, byte;
    while ((byte = this.byte()) & 128 && shift < 56n) { value |= BigInt(byte & 127) << shift; shift += 7n; }
    return value | BigInt(byte) << shift;
  }
}

async function readFig(filename) {
  const zip = await JSZip.loadAsync(fs.readFileSync(filename));
  const canvas = await zip.file('canvas.fig').async('nodebuffer');
  if (canvas.toString('ascii', 0, 8) !== 'fig-kiwi') throw new Error('Unsupported .fig format');
  const schemaLength = canvas.readUInt32LE(12);
  const schema = new ByteReader(zlib.inflateRawSync(canvas.subarray(16, 16 + schemaLength)));
  const definitions = [];
  const definitionCount = schema.uint();
  for (let i = 0; i < definitionCount; i++) {
    const definition = { name: schema.string(), kind: schema.byte(), fields: [] };
    const fieldCount = schema.uint();
    for (let j = 0; j < fieldCount; j++) definition.fields.push({ name: schema.string(), type: schema.int(), array: !!(schema.byte() & 1), tag: schema.uint() });
    definitions.push(definition);
  }
  const compressed = canvas.subarray(20 + schemaLength);
  const reader = new ByteReader(compressed.readUInt32LE(0) === 0xfd2fb528 ? zlib.zstdDecompressSync(compressed) : zlib.inflateRawSync(compressed));
  function decode(type) {
    if (type < 0) {
      switch (~type) {
        case 0: return !!reader.byte();
        case 1: return reader.byte();
        case 2: return reader.int();
        case 3: return reader.uint();
        case 4: return reader.float();
        case 5: return reader.string();
        case 6: { const value = reader.uint64(); return (value & 1n ? ~(value >> 1n) : value >> 1n).toString(); }
        case 7: return reader.uint64().toString();
        default: throw new Error(`Unknown primitive ${type}`);
      }
    }
    const definition = definitions[type];
    if (definition.kind === 0) { const value = reader.uint(); return definition.fields.find(field => field.tag === value)?.name ?? value; }
    const result = {};
    function fieldValue(field) {
      if (!field.array) return decode(field.type);
      const length = reader.uint();
      if (field.type === -2) { const value = reader.bytes.subarray(reader.offset, reader.offset + length); reader.offset += length; return value; }
      return Array.from({ length }, () => decode(field.type));
    }
    if (definition.kind === 1) for (const field of definition.fields) result[field.name] = fieldValue(field);
    else for (;;) {
      const tag = reader.uint(); if (!tag) break;
      const field = definition.fields.find(field => field.tag === tag);
      if (!field) throw new Error(`Unknown field ${tag} in ${definition.name}`);
      result[field.name] = fieldValue(field);
    }
    return result;
  }
  const document = decode(definitions.findIndex(definition => definition.name === 'Message'));
  const id = guid => guid ? `${guid.sessionID}:${guid.localID}` : '';
  const nodes = new Map(document.nodeChanges.map(node => [id(node.guid), node]));
  const children = new Map();
  for (const node of nodes.values()) {
    const parent = id(node.parentIndex?.guid);
    if (!children.has(parent)) children.set(parent, []);
    children.get(parent).push(node);
  }
  for (const list of children.values()) list.sort((a, b) => (a.parentIndex?.position ?? '').localeCompare(b.parentIndex?.position ?? '', 'en', { sensitivity: 'variant' }));
  return { zip, document, nodes, children, id };
}

module.exports = { readFig };
