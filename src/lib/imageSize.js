import fs from 'fs';
import path from 'path';

/**
 * Real pixel dimensions of a cover image, read from its header at build time.
 *
 * The slug pages used to assert `width: 1200, height: 630` on every og:image
 * regardless of the file. 29 of 34 covers were something else — 1536x1024,
 * 2232x820, 640x427 — and scrapers use those numbers to lay a card out before
 * they fetch the image, so the ones that were wrong described a card that never
 * arrived.
 *
 * Parsing the header directly rather than adding an image library: the covers
 * are only PNG and JPEG, and the two formats need about thirty lines between
 * them. Anything it cannot read returns undefined, and the caller omits the
 * width and height rather than guessing — og:image:width and og:image:height are
 * optional, and no hint beats a wrong one.
 */

function pngSize(buf) {
  // 8-byte signature, then the IHDR chunk: 4-byte length, 4-byte type, then
  // width and height as big-endian uint32.
  if (buf.length < 24) return null;
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  if (buf.toString('latin1', 12, 16) !== 'IHDR') return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1; // resync past padding
      continue;
    }
    const marker = buf[offset + 1];

    // Standalone markers carry no length payload.
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    // Start-of-frame markers hold the dimensions. SOF4/SOF8/SOF12 are not
    // frame headers (DHT / JPG / DAC), so they are excluded.
    const isSof =
      (marker >= 0xc0 && marker <= 0xcf) &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isSof) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    const segmentLength = buf.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }
  return null;
}

/**
 * @param {string} imagePath Site-relative path, e.g. "/images/blog/x/cover.png".
 *   Absolute URLs return undefined: they live off-disk (Vercel Blob), and
 *   fetching them would put the network on the build's critical path.
 * @returns {{width: number, height: number} | undefined}
 */
export function coverImageSize(imagePath) {
  if (!imagePath || /^https?:\/\//.test(imagePath)) return undefined;

  const file = path.join(process.cwd(), 'public', imagePath.replace(/^\/+/, ''));
  // Keep the build alive on a missing or unreadable cover; the card just loses
  // its size hint.
  let buf;
  try {
    const fd = fs.openSync(file, 'r');
    try {
      // Enough for a PNG header and for the SOF marker of any JPEG we ship.
      buf = Buffer.alloc(65536);
      const read = fs.readSync(fd, buf, 0, 65536, 0);
      buf = buf.subarray(0, read);
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return undefined;
  }

  const size = pngSize(buf) || jpegSize(buf);
  if (!size || !size.width || !size.height) return undefined;
  return size;
}
