import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const speakingDirectory = path.join(process.cwd(), 'content/speaking');

export async function getAllSpeakingEngagements() {
  // Get file names under /speaking
  const fileNames = await fs.readdir(speakingDirectory);
  
  const engagements = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx') && fileName !== 'index.mdx')
      .map(async (fileName) => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, '');

        // Read markdown file as string
        const fullPath = path.join(speakingDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Serialize the MDX content
        const mdxSource = await serialize(content);

        // Combine the data with the slug and content
        return {
          slug,
          ...data,
          content: mdxSource
        };
      })
  );

  return engagements.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getSpeakingEngagementBySlug(slug) {
  const fullPath = path.join(speakingDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data
  };
} 