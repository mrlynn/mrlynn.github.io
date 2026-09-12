import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';
import { getAllPosts, getPostBySlug } from '../../../lib/blog';

/**
 * Per-project social card, for projects whose own cover is too small.
 *
 * Nine project covers are app screenshots around 950x720 — under LinkedIn's
 * 1200x627 threshold, so those pages rendered a thumbnail card instead of the
 * large one no matter how correct the markup was. Upscaling a screenshot looks
 * soft; this draws a real 1200x630 card from the project's own title and stack
 * instead.
 *
 * generateMetadata in page.js decides which projects use it: a cover that is
 * already big enough keeps its own artwork, and only the undersized ones point
 * here. See the note there.
 */
export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Project by Michael Lynn';

export async function generateStaticParams() {
  const projects = await getAllPosts('project');
  return projects.map((project) => ({ slug: project.slug }));
}

const fontDir = path.join(process.cwd(), 'src/app/_og-fonts');
const loadFont = (file) => readFile(path.join(fontDir, file));

// Same palette as app/opengraph-image.js.
const CANVAS = '#faf8f3';
const INK = '#1f1b16';
const MUTED = '#635c51';
const ACCENT = '#be4e1c';
const RULE = '#e7e1d5';

export default async function ProjectOpengraphImage({ params }) {
  const [project, fraunces, interRegular, interSemiBold] = await Promise.all([
    getPostBySlug(params.slug),
    loadFont('Fraunces.ttf'),
    loadFont('Inter-Regular.ttf'),
    loadFont('Inter-SemiBold.ttf'),
  ]);

  const title = project?.title || 'Project';
  const stack = (project?.technologies || project?.tags || []).slice(0, 5);

  // Long titles need to step down or they overflow the card.
  const titleSize = title.length > 46 ? 62 : title.length > 28 ? 78 : 96;

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
          Project · Michael Lynn
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Fraunces',
              fontSize: titleSize,
              lineHeight: 1.04,
              color: INK,
            }}
          >
            {title}
          </div>
          {stack.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 32, gap: 12 }}>
              {stack.map((tech) => (
                <div
                  key={tech}
                  style={{
                    display: 'flex',
                    fontFamily: 'Inter',
                    fontSize: 24,
                    color: MUTED,
                    border: `2px solid ${RULE}`,
                    borderRadius: 999,
                    padding: '8px 20px',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>

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
