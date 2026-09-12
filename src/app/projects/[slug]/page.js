import { absoluteUrl } from '../../../lib/structuredData';
import { coverImageSize } from '../../../lib/imageSize';
import { OG_IMAGE } from '../../../lib/pageMetadata';
import JsonLd from '../../../components/JsonLd';
import { articleNode, breadcrumbNode, graph } from '../../../lib/structuredData';
import { getPostBySlug, getAllPosts } from '../../../lib/blog';
import { BlogLayout } from '../../../components/blog/BlogLayout';
import BlogPostContent from '../../../components/blog/BlogPostContent';
import { notFound } from 'next/navigation';
import { SITE_URL } from '../../../lib/siteUrl';

export async function generateStaticParams() {
  const projects = await getAllPosts('project');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = await getPostBySlug(params.slug);
  if (!project) return {};

  const fullUrl = `${SITE_URL}/projects/${params.slug}`;
  // When a post has no cover, omit the image keys entirely rather than
  // naming a default file. Next then falls back to app/opengraph-image.js,
  // which is generated and therefore cannot 404 the way the old hardcoded
  // /images/og-image.jpg did.
  // Absolute-aware: three posts store their cover on Vercel Blob as a full URL,
  // and concatenating SITE_URL in front of those produced
  // "https://mlynn.orghttps//g1iq…" — a dead image on every share of them.
  const coverUrl = project.image ? absoluteUrl(project.image) : null;
  // Real pixel dimensions, not an assumption. 29 of 34 covers are not 1200x630,
  // and a scraper lays the card out from these numbers before it fetches the
  // file. Unknown (remote) covers omit them rather than assert a wrong hint.
  const coverSize = coverImageSize(project.image);

  const cover = coverUrl
    ? {
        openGraph: {
          images: [{ url: coverUrl, ...(coverSize || {}), alt: project.title }],
        },
        twitter: { images: [coverUrl] },
      }
    : // Not `{}`: a page that declares any openGraph object REPLACES its parent's
      // rather than merging, which drops the card app/opengraph-image.js
      // contributes — the exact failure pageMetadata() exists to prevent. Name
      // the fallback explicitly so a coverless post still ships an image.
      {
        openGraph: { images: [OG_IMAGE] },
        twitter: { images: [OG_IMAGE.url] },
      };

  return {
    title: project.title,
    description: project.description,
    authors: [{ name: project.author }],
    alternates: {
      canonical: `${SITE_URL}/projects/${params.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: fullUrl,
      siteName: 'Michael Lynn',
      publishedTime: project.date,
      modifiedTime: project.updated || project.date,
      authors: [project.author],
      ...cover.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      ...cover.twitter,
      creator: '@mlynn',
    },
  };
}

export default async function Project({ params }) {
  const project = await getPostBySlug(params.slug);
  
  // Unknown slugs used to render this message with a 200, so retired and
  // mistyped URLs looked like real, thin pages to crawlers. notFound()
  // sends a real 404 and renders app/not-found.js.
  if (!project) {
    notFound();
  }

  // Emitted here rather than inside BlogLayout, which is a client
  // component — structured data has to be in the server-rendered HTML.
  const articleGraph = graph(
    articleNode({
      title: project.title,
      description: project.description,
      image: project.image,
      date: project.date,
      updated: project.updated,
      path: `/projects/${params.slug}`,
      tags: project.tags,
    }),
    breadcrumbNode([
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${params.slug}` },
    ])
  );

  return (
    <>
      <JsonLd data={articleGraph} />
      <BlogLayout
        title={project.title}
        description={project.description}
        image={project.image}
        date={project.date}
        author={project.author}
        demoUrl={project.demoUrl}
        githubUrl={project.githubUrl}
      >
        <BlogPostContent post={project} slug={params.slug} />
      </BlogLayout>
    </>
  );
}
