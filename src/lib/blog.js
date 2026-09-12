/**
 * Posts and projects, read from content/blog.
 *
 * This was two modules — lib/blog.js and utils/blog.js — reading the same
 * directory and exporting the same three function names, with the pages on one
 * and the sitemap, feed and admin API on the other.
 *
 * They had drifted, and both differences turned out to be dead weight that had
 * never been exercised:
 *
 *   utils/blog ran a processComponentImports step that rewrote
 *   `@/components/mdx/includes/...` imports. No post has ever used that form.
 *
 *   utils/blog also passed `scope: frontmatter` to serialize, which puts every
 *   frontmatter key in scope as a variable. 23 project posts declare `private:`,
 *   a reserved word in strict mode — which is how MDX compiles — so serializing
 *   any of them that way throws "Unexpected strict mode reserved word". It never
 *   surfaced because the sitemap and feed read frontmatter and never render the
 *   body.
 *
 * Neither was carried over. This module is what the site already rendered with.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

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
      // Posts are first-party MDX from this repo, so keep JSX expression props
      // (e.g. MermaidDiagram chart={`...`}) that next-mdx-remote strips by default.
      blockJS: false,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrism, { ignoreMissing: true }]
        ],
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