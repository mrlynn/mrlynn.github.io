import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
        const { data, content } = matter(source);
        const mdxSource = await serialize(content, {
          mdxOptions: {
            rehypePlugins: [rehypeSlug, rehypePrism],
            remarkPlugins: [remarkGfm],
          },
        });

        return {
          ...data,
          slug: file.replace(/\.mdx$/, ''),
          mdxSource,
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypePrism],
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    ...data,
    slug,
    mdxSource,
  };
}

export function getAllPostSlugs() {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
} 