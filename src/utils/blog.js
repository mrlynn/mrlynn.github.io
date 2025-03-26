import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseISO } from 'date-fns';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getAllPosts() {
  // Ensure the blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, '');

      // Ensure the date is in ISO format
      let date = data.date;
      try {
        // Try to parse the date and convert it to ISO format
        date = parseISO(data.date).toISOString().split('T')[0];
      } catch (error) {
        console.error(`Error parsing date for post ${slug}:`, error);
        // If parsing fails, use the original date string
      }

      return {
        slug,
        ...data,
        date,
        content,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export async function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Ensure the date is in ISO format
  let date = data.date;
  try {
    date = parseISO(data.date).toISOString().split('T')[0];
  } catch (error) {
    console.error(`Error parsing date for post ${slug}:`, error);
  }

  return {
    slug,
    ...data,
    date,
    content,
  };
} 