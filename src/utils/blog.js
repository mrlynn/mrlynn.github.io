import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(category = null, excludeCategory = null) {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx?$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data: frontmatter, content } = matter(fileContents);

      // Filter by category if specified
      if (category && frontmatter.category !== category) {
        return null;
      }

      // Filter out excluded category if specified
      if (excludeCategory && frontmatter.category === excludeCategory) {
        return null;
      }

      // Combine the data with the slug
      return {
        slug,
        ...frontmatter,
        content
      };
    })
  );

  // Filter out null values and sort posts by date
  const posts = allPosts
    .filter(post => post !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

  return posts;
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    
    const mdxSource = await serialize(content, {
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
    });

    return {
      slug,
      content: mdxSource,
      ...frontmatter,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs() {
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
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
} 