import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';
import { getAllPosts, getPostBySlug } from '../../../lib/blog';

/**
 * Per-post social card, for posts whose own cover is too small.
 *
 * Four posts carry 640px stock photos — well under LinkedIn's 1200x627
 * threshold for the large image card — so those pages rendered a thumbnail no
 * matter how correct the markup was.
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
const CANVAS = '#faf8f3';
const INK = '#1f1b16';
const MUTED = '#635c51';
const ACCENT = '#be4e1c';
const RULE = '#e7e1d5';

/** Four steps, because blog titles range from 11 to 84 characters. */
function titleSizeFor(title) {
  const n = title.length;
  if (n <= 24) return 88;
  if (n <= 44) return 72;
  if (n <= 64) return 58;
  return 48;
}

export default async function PostOpengraphImage({ params }) {
  const [post, fraunces, interRegular, interSemiBold] = await Promise.all([
    getPostBySlug(params.slug),
    loadFont('Fraunces.ttf'),
    loadFont('Inter-Regular.ttf'),
    loadFont('Inter-SemiBold.ttf'),
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
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 3,
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
              fontFamily: 'Fraunces',
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
                fontFamily: 'Inter',
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
