import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
  mdxSource: any;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { content, data } = matter(source);
        const mdxSource = await serialize(content);
        
        return {
          slug: file.replace('.mdx', ''),
          title: data.title,
          date: data.date,
          author: data.author,
          description: data.description,
          image: data.image,
          tags: data.tags,
          content,
          mdxSource,
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(source);
    const mdxSource = await serialize(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      image: data.image,
      tags: data.tags,
      content,
      mdxSource,
    };
  } catch (error) {
    return null;
  }
} 