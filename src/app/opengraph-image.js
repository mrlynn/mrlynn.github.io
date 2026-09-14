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

// Night palette, matching the dark theme in src/theme/designSystem.js. The
// yellow reads at about 10.9:1 on this canvas, so it can carry text here.
const CANVAS = '#131512';
const INK = '#e8e6dc';
const MUTED = '#a9a79d';
const ACCENT = '#e8c547';
const RULE = '#2d2f2a';

export default async function OpengraphImage() {
  const [groteskRegular, groteskSemiBold, mono] = await Promise.all([
    loadFont('FamiljenGrotesk-Regular.ttf'),
    loadFont('FamiljenGrotesk-SemiBold.ttf'),
    loadFont('FragmentMono-Regular.ttf'),
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
            fontFamily: 'Fragment Mono',
            fontSize: 22,
            letterSpacing: 2,
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
              fontFamily: 'Familjen Grotesk',
              fontWeight: 600,
              letterSpacing: -2,
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
              fontFamily: 'Familjen Grotesk',
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
              fontFamily: 'Familjen Grotesk',
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
        { name: 'Familjen Grotesk', data: groteskRegular, weight: 400, style: 'normal' },
        { name: 'Familjen Grotesk', data: groteskSemiBold, weight: 600, style: 'normal' },
        { name: 'Fragment Mono', data: mono, weight: 400, style: 'normal' },
      ],
    }
  );
}
