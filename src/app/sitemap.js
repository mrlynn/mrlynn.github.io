import { getAllPosts } from '../utils/blog';
import { SITE_URL } from '../lib/siteUrl';

export default async function sitemap() {
  const posts = await getAllPosts();

  // Project posts live under /projects/<slug>; everything else under /blog/<slug>.
  // Listing a project at /blog/<slug> here pointed crawlers at the copy that the
  // blog index deliberately hides.
  const postUrls = posts.map((post) => ({
    url:
      post.category === 'project'
        ? `${SITE_URL}/projects/${post.slug}`
        : `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const staticPages = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/projects`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/consulting`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/resume`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/speaking`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/podcasts`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/expertise/mongodb`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/ask-ai`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/art`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/social`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/tools/generate-diagram`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/tools/introspect`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  return [...staticPages, ...postUrls];
}
