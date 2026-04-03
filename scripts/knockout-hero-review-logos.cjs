/**
 * Knock out black (edge-connected) background on hero review badge PNGs.
 * Same algorithm as partner-logos script; outputs transparent PNGs in public/book-to-video/.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FILES = [
  'hero-review-trustpilot.png',
  'hero-review-clutch.png',
  'hero-review-bark.png',
];
const DIR = path.join(__dirname, '../public/book-to-video');
/** Edge-connected “canvas”: raise if exports use #121212-style grey instead of #000 */
const DARK = 52;
const LIGHT = 249;
const MIN_ALPHA = 64;

function idxOf(w, x, y) {
  return (y * w + x) * 4;
}

function maxCh(out, w, x, y) {
  const i = idxOf(w, x, y);
  return Math.max(out[i], out[i + 1], out[i + 2]);
}

function removeInterLetterBlackFringe(out, w, h) {
  const DARK_FR = 40;
  const BRIGHT = 50;
  const MIN_A_SELF = 85;
  const MIN_NEI_TRANS = 45;
  const MIN_SUPPORT = 5;
  const DX = [1, -1, 0, 0, 1, 1, -1, -1];
  const DY = [0, 0, 1, -1, 1, -1, 1, -1];
  const iters = 5;
  for (let iter = 0; iter < iters; iter++) {
    const next = Buffer.from(out);
    let changed = false;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = idxOf(w, x, y);
        if (out[i + 3] < MIN_A_SELF) continue;
        if (maxCh(out, w, x, y) > DARK_FR) continue;
        let support = 0;
        for (let k = 0; k < 8; k++) {
          const nx = x + DX[k];
          const ny = y + DY[k];
          if (nx < 0 || nx >= w || ny < 0 || ny >= h) {
            support++;
            continue;
          }
          const j = idxOf(w, nx, ny);
          if (out[j + 3] < MIN_NEI_TRANS) support++;
          else if (maxCh(out, w, nx, ny) >= BRIGHT) support++;
        }
        if (support >= MIN_SUPPORT) {
          next[i + 3] = 0;
          changed = true;
        }
      }
    }
    if (!changed) break;
    next.copy(out);
  }
}

function floodRemove(out, w, h, match) {
  const visited = new Uint8Array(w * h);
  const queue = [];

  const trySeed = (x, y) => {
    const k = y * w + x;
    if (visited[k] || !match(x, y)) return;
    visited[k] = 1;
    queue.push(x, y);
  };

  for (let x = 0; x < w; x++) {
    trySeed(x, 0);
    trySeed(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    trySeed(0, y);
    trySeed(w - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const neigh = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of neigh) {
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const k = ny * w + nx;
      if (visited[k] || !match(nx, ny)) continue;
      visited[k] = 1;
      queue.push(nx, ny);
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (visited[y * w + x]) {
        out[idxOf(w, x, y) + 3] = 0;
      }
    }
  }
}

async function processPng(filePath) {
  const {
    data,
    info: { width: w, height: h, channels },
  } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  if (channels !== 4) throw new Error('Expected RGBA');

  const out = Buffer.from(data);

  const isDarkOpaque = (x, y) => {
    const i = idxOf(w, x, y);
    if (out[i + 3] < MIN_ALPHA) return false;
    return out[i] <= DARK && out[i + 1] <= DARK && out[i + 2] <= DARK;
  };

  const isLightOpaque = (x, y) => {
    const i = idxOf(w, x, y);
    if (out[i + 3] < MIN_ALPHA) return false;
    return out[i] >= LIGHT && out[i + 1] >= LIGHT && out[i + 2] >= LIGHT;
  };

  floodRemove(out, w, h, (x, y) => isDarkOpaque(x, y));
  floodRemove(out, w, h, (x, y) => isLightOpaque(x, y));

  const tmp = filePath + '.tmp.png';
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, filePath);
}

function punchEnclosedLetterHoles(out, w, h) {
  const MAX_CH = 22;
  const MIN_AREA = 24;
  const MAX_AREA = 12000;
  const MIN_A = 100;
  const seen = new Uint8Array(w * h);
  const isCand = (x, y) => {
    const i = idxOf(w, x, y);
    if (out[i + 3] < MIN_A) return false;
    return Math.max(out[i], out[i + 1], out[i + 2]) <= MAX_CH;
  };
  for (let sy = 0; sy < h; sy++) {
    for (let sx = 0; sx < w; sx++) {
      const sk = sy * w + sx;
      if (seen[sk] || !isCand(sx, sy)) continue;
      const qx = [sx];
      const qy = [sy];
      seen[sk] = 1;
      let touchesEdge = sx === 0 || sx === w - 1 || sy === 0 || sy === h - 1;
      for (let qi = 0; qi < qx.length; qi++) {
        const x = qx[qi];
        const y = qy[qi];
        const neigh = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ];
        for (const [nx, ny] of neigh) {
          if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
          const nk = ny * w + nx;
          if (seen[nk] || !isCand(nx, ny)) continue;
          seen[nk] = 1;
          qx.push(nx);
          qy.push(ny);
          if (nx === 0 || nx === w - 1 || ny === 0 || ny === h - 1) touchesEdge = true;
        }
      }
      const area = qx.length;
      if (!touchesEdge && area >= MIN_AREA && area <= MAX_AREA) {
        for (let qi = 0; qi < qx.length; qi++) {
          out[idxOf(w, qx[qi], qy[qi]) + 3] = 0;
        }
      }
    }
  }
}

async function processWordmarkFringe(filePath) {
  const {
    data,
    info: { width: w, height: h, channels },
  } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (channels !== 4) throw new Error('Expected RGBA');
  const out = Buffer.from(data);
  removeInterLetterBlackFringe(out, w, h);
  const tmp = filePath + '.fr.png';
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, filePath);
}

async function processLetterHoles(filePath) {
  const {
    data,
    info: { width: w, height: h, channels },
  } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (channels !== 4) throw new Error('Expected RGBA');
  const out = Buffer.from(data);
  punchEnclosedLetterHoles(out, w, h);
  const tmp = filePath + '.tmp2.png';
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, filePath);
}

/** Per-file post-pass (same heuristics as partner-logos). */
const WORDMARK_FRINGE = new Set(['hero-review-trustpilot.png', 'hero-review-clutch.png']);
const LETTER_HOLES = new Set(['hero-review-trustpilot.png', 'hero-review-bark.png']);

async function main() {
  for (const f of FILES) {
    const fp = path.join(DIR, f);
    if (!fs.existsSync(fp)) {
      console.error('Missing:', fp);
      process.exit(1);
    }
    await processPng(fp);
    if (WORDMARK_FRINGE.has(f)) await processWordmarkFringe(fp);
    if (LETTER_HOLES.has(f)) await processLetterHoles(fp);
    console.log('knocked out:', f);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
