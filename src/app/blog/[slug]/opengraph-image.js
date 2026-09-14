import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';
import { getAllPosts, getPostBySlug } from '../../../lib/blog';

/**
 * Per-post social card, for posts whose own cover is too small.
 *
 * Below LinkedIn's 1200x627 threshold a page gets a thumbnail instead of the
 * large image card, no matter how correct the markup is.
 *
 * A post is not a project, so this is not the project card with different words:
 * no technology chips, and the date carries the weight instead. Post titles also
 * run four times longer than project titles (84 characters at the extreme
 * against 22), so the size steps down further and earlier.
 *
 * generateMetadata in page.js decides which posts use it — a cover that is
 * already big enough keeps its own artwork.
 */
export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Writing by Michael Lynn';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const fontDir = path.join(process.cwd(), 'src/app/_og-fonts');
const loadFont = (file) => readFile(path.join(fontDir, file));

// Same palette as app/opengraph-image.js.
const CANVAS = '#131512';
const INK = '#e8e6dc';
const MUTED = '#a9a79d';
const ACCENT = '#e8c547';
const RULE = '#2d2f2a';

/** Four steps, because blog titles range from 11 to 84 characters. */
function titleSizeFor(title) {
  const n = title.length;
  if (n <= 24) return 88;
  if (n <= 44) return 72;
  if (n <= 64) return 58;
  return 48;
}

export default async function PostOpengraphImage({ params }) {
  const [post, groteskRegular, groteskSemiBold, mono] = await Promise.all([
    getPostBySlug(params.slug),
    loadFont('FamiljenGrotesk-Regular.ttf'),
    loadFont('FamiljenGrotesk-SemiBold.ttf'),
    loadFont('FragmentMono-Regular.ttf'),
  ]);

  const title = post?.title || 'Writing';
  const date = post?.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : null;

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
            fontFamily: 'Fragment Mono',
            fontSize: 22,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: ACCENT,
          }}
        >
          Writing · Michael Lynn
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Familjen Grotesk',
              fontWeight: 600,
              letterSpacing: -2,
              fontSize: titleSizeFor(title),
              lineHeight: 1.08,
              color: INK,
            }}
          >
            {title}
          </div>
          {date && (
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                fontFamily: 'Familjen Grotesk',
                fontSize: 28,
                color: MUTED,
              }}
            >
              {date}
            </div>
          )}
        </div>

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
