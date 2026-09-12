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
  const cover = project.image
    ? {
        openGraph: {
          images: [
            { url: `${SITE_URL}${project.image}`, width: 1200, height: 630, alt: project.title },
          ],
        },
        twitter: { images: [`${SITE_URL}${project.image}`] },
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
