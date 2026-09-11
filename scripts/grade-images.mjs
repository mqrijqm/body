import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const srcDir = path.resolve('assets/photos-src');
const outDir = path.resolve('public/bhs');
const target = { brightness: [0.62, 0.70], saturation: [0.09, 0.13], warmth: [13 / 255, 17 / 255] };

async function measure(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return measureRaw(data, info);
}

async function measureBuffer(buffer) {
  const { data, info } = await sharp(buffer).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return measureRaw(data, info);
}

function measureRaw(data, info) {
  let brightness = 0; let saturation = 0; let warmth = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i] / 255; const g = data[i + 1] / 255; const b = data[i + 2] / 255;
    brightness += (0.2126 * r + 0.7152 * g + 0.0722 * b);
    const max = Math.max(r, g, b); const min = Math.min(r, g, b);
    saturation += max === 0 ? 0 : (max - min) / max;
    warmth += r - b;
  }
  const count = data.length / info.channels;
  return { brightness: brightness / count, saturation: saturation / count, warmth: warmth / count };
}

const fmt = (m) => `brightness ${(m.brightness * 100).toFixed(1)}% | saturation ${(m.saturation * 100).toFixed(1)}% | warmth ${(m.warmth * 255).toFixed(1)}`;
await fs.mkdir(outDir, { recursive: true });
const files = (await fs.readdir(srcDir)).filter((name) => /\.(jpe?g|png|webp)$/i.test(name));
for (const name of files) {
  const input = path.join(srcDir, name);
  const stem = name.replace(/\.(jpe?g|png|webp)$/i, '');
  const output = path.join(outDir, `${stem}-graded.webp`);
  const before = await measure(input);
  let brightness = 1; let saturation = 1; let lift = 1; let warmthShift = 0;
  let after = before;
  let finalBuffer;
  for (let pass = 0; pass < 8; pass += 1) {
    finalBuffer = await sharp(input).modulate({ brightness, saturation }).linear(lift, 0).recomb([
      [1 + warmthShift, 0, 0], [0, 1, 0], [0, 0, 1 - warmthShift],
    ]).webp({ quality: 82, effort: 5 }).toBuffer();
    after = await measureBuffer(finalBuffer);
    if (after.brightness >= target.brightness[0] && after.brightness <= target.brightness[1] && after.saturation >= target.saturation[0] && after.saturation <= target.saturation[1] && after.warmth >= target.warmth[0] && after.warmth <= target.warmth[1]) break;
    brightness *= Math.max(0.88, Math.min(1.15, 0.66 / Math.max(after.brightness, 0.01)));
    saturation *= Math.max(0.88, Math.min(1.12, 0.11 / Math.max(after.saturation, 0.01)));
    lift *= Math.max(0.96, Math.min(1.06, 0.66 / Math.max(after.brightness, 0.01)));
    warmthShift = Math.max(-0.05, Math.min(0.05, (0.0588 - after.warmth) * 1.2));
  }
  await fs.writeFile(output, finalBuffer);
  console.log(`${name}\n  before: ${fmt(before)}\n  after:  ${fmt(after)}`);
}
