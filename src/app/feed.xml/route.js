import { getAllPosts } from '../../utils/blog';
import RSS from 'rss';

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const feed = new RSS({
    title: 'Michael Lynn\'s Blog',
    description: 'Thoughts and insights on technology, development, and more',
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
    image_url: `${baseUrl}/images/logo.png`,
    language: 'en',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Michael Lynn`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
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