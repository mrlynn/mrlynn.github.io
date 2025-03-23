import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true }]],
    format: 'mdx',
  },
  parseFrontmatter: true,
};

export async function getAllPosts() {
  try {
    const files = fs.readdirSync(BLOG_DIR);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          try {
            const filePath = path.join(BLOG_DIR, file);
            const source = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(source);
            
            // Validate and format the date
            if (data.date) {
              const date = new Date(data.date);
              if (isNaN(date.getTime())) {
                console.warn(`Invalid date in ${file}: ${data.date}`);
                data.date = new Date().toISOString();
              }
            } else {
              console.warn(`No date found in ${file}`);
              data.date = new Date().toISOString();
            }

            const mdxSource = await serialize(content, {
              ...mdxOptions,
              scope: data,
            });

            return {
              ...data,
              slug: file.replace(/\.mdx$/, ''),
              content: mdxSource,
            };
          } catch (error) {
            console.error(`Error processing file ${file}:`, error);
            return null;
          }
        })
    );

    return posts.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    // Validate and format the date
    if (data.date) {
      const date = new Date(data.date);
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date in ${slug}.mdx: ${data.date}`);
        data.date = new Date().toISOString();
      }
    } else {
      console.warn(`No date found in ${slug}.mdx`);
      data.date = new Date().toISOString();
    }

    const mdxSource = await serialize(content, {
      ...mdxOptions,
      scope: data,
    });

    return {
      ...data,
      slug,
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw error;
  }
} 