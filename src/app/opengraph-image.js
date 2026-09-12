import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';

// Route-segment metadata file: Next serves this at /opengraph-image and injects
// it as og:image / twitter:image for every page under the root segment that
// does not set its own. Blog and project pages pass explicit images in their
// generateMetadata, so they keep their own covers and only fall back to here.
export const runtime = 'nodejs';
export const alt = 'Michael Lynn — AI Adoption Engineer, Developer Advocate & Advisor';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontDir = path.join(process.cwd(), 'src/app/_og-fonts');
const loadFont = (file) => readFile(path.join(fontDir, file));

// Editorial palette, matching src/theme/designSystem.js.
const CANVAS = '#faf8f3';
const INK = '#1f1b16';
const MUTED = '#635c51';
// The AA-compliant persimmon (4.55:1 on canvas) — same token the site uses for
// accent text.
const ACCENT = '#be5019';
const RULE = '#e7e1d5';

export default async function OpengraphImage() {
  const [fraunces, interRegular, interSemiBold] = await Promise.all([
    loadFont('Fraunces.ttf'),
    loadFont('Inter-Regular.ttf'),
    loadFont('Inter-SemiBold.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: CANVAS,
          padding: '72px 80px',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: ACCENT,
          }}
        >
          AI Adoption Engineer · Developer Advocate · Advisor
        </div>

        {/* Name + line */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Fraunces',
              fontSize: 128,
              lineHeight: 1.02,
              color: INK,
            }}
          >
            Michael Lynn
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontFamily: 'Inter',
              fontSize: 40,
              color: MUTED,
            }}
          >
            I help people build with data &amp; AI.
          </div>
        </div>

        {/* Footer rule */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 2, backgroundColor: RULE, marginBottom: 24 }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'Inter',
              fontSize: 26,
              color: MUTED,
            }}
          >
            <span>mlynn.org</span>
            <span>Writing · Projects · Talks</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, style: 'normal' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
      ],
    }
  );
}
