<<<<<<< Updated upstream
import { getAllMDXFiles, getMDXFileBySlug } from './mdx';
=======
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseISO } from 'date-fns';
import { serialize } from 'next-mdx-remote/serialize';
>>>>>>> Stashed changes

const BLOG_DIR = 'content/blog';

<<<<<<< Updated upstream
export async function getAllPosts(category = null) {
  const posts = await getAllMDXFiles(BLOG_DIR);
  
  // Filter posts by category if specified
  const filteredPosts = category 
    ? posts.filter(post => post.category === category)
    : posts;
  
  // Sort posts by date
  return filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date || new Date());
    const dateB = new Date(b.date || new Date());
    return dateB - dateA;
  });
=======
export async function getAllPosts() {
  // Ensure the blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        const slug = file.replace(/\.mdx$/, '');

        // Ensure the date is in ISO format
        let date = data.date;
        try {
          date = parseISO(data.date).toISOString().split('T')[0];
        } catch (error) {
          console.error(`Error parsing date for post ${slug}:`, error);
        }

        // Serialize the MDX content
        const mdxSource = await serialize(content, {
          mdxOptions: {
            development: process.env.NODE_ENV === 'development',
            remarkPlugins: [],
            rehypePlugins: [],
          },
          parseFrontmatter: true,
        });

        return {
          slug,
          ...data,
          date,
          content: mdxSource,
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
>>>>>>> Stashed changes
}

export async function getPostBySlug(slug) {
  return getMDXFileBySlug(BLOG_DIR, slug);
}

// Helper function to get all projects (posts with category 'project')
export async function getAllProjects() {
  return getAllPosts('project');
}

// Helper function to get a project by slug
export async function getProjectBySlug(slug) {
  const post = await getPostBySlug(slug);
  if (!post || post.category !== 'project') {
    return null;
  }
<<<<<<< Updated upstream
  return post;
=======

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Ensure the date is in ISO format
  let date = data.date;
  try {
    date = parseISO(data.date).toISOString().split('T')[0];
  } catch (error) {
    console.error(`Error parsing date for post ${slug}:`, error);
  }

  // Serialize the MDX content
  const mdxSource = await serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
      remarkPlugins: [],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  });

  return {
    slug,
    ...data,
    date,
    content: mdxSource,
  };
>>>>>>> Stashed changes
} 