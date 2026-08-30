import { getAllPosts } from '../../utils/blog';
import { SITE_URL } from '../../lib/siteUrl';
import RSS from 'rss';

export async function GET() {
  const posts = await getAllPosts();
  const feed = new RSS({
    title: 'Michael Lynn\'s Blog',
    description: 'Thoughts and insights on technology, development, and more',
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    image_url: `${SITE_URL}/images/logo.png`,
    language: 'en',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Michael Lynn`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      guid: post.slug,
      categories: post.tags,
      author: post.author,
      date: new Date(post.date),
      enclosure: post.image ? {
        url: post.image,
        type: 'image/jpeg',
      } : undefined,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
