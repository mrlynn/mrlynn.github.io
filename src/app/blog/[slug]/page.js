import { getPostBySlug, getAllPosts } from '../../../lib/blog';
import { BlogLayout } from '../../../components/blog/BlogLayout';
import BlogPostContent from '../../../components/blog/BlogPostContent';
import { notFound } from 'next/navigation';
import { SITE_URL } from '../../../lib/siteUrl';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  // Project posts also render at /projects/<slug>, which is where they are
  // linked from and listed. Point the canonical there so the two URLs don't
  // compete as duplicate content.
  const canonicalPath =
    post.category === 'project' ? `/projects/${params.slug}` : `/blog/${params.slug}`;
  const fullUrl = `${SITE_URL}${canonicalPath}`;
  // When a post has no cover, omit the image keys entirely rather than
  // naming a default file. Next then falls back to app/opengraph-image.js,
  // which is generated and therefore cannot 404 the way the old hardcoded
  // /images/og-image.jpg did.
  const cover = post.image
    ? {
        openGraph: {
          images: [
            { url: `${SITE_URL}${post.image}`, width: 1200, height: 630, alt: post.title },
          ],
        },
        twitter: { images: [`${SITE_URL}${post.image}`] },
      }
    : { openGraph: {}, twitter: {} };

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: fullUrl,
      siteName: 'Michael Lynn',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      ...cover.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...cover.twitter,
      creator: '@mlynn',
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  
  // Unknown slugs used to render this message with a 200, so retired and
  // mistyped URLs looked like real, thin pages to crawlers. notFound()
  // sends a real 404 and renders app/not-found.js.
  if (!post) {
    notFound();
  }

  return (
    <BlogLayout
      title={post.title}
      description={post.description}
      image={post.image}
      date={post.date}
      author={post.author}
      demoUrl={post.demoUrl}
      githubUrl={post.githubUrl}
      slug={params.slug}
      enableAskArticle
    >
      <BlogPostContent post={post} slug={params.slug} />
    </BlogLayout>
  );
}
