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

        // Ensure date is a valid Date object
        const date = new Date(data.date);
        const now = new Date();
        
        // Add isUpcoming flag
        const isUpcoming = date >= now;

        // Serialize the MDX content
        const mdxSource = await serialize(content);

        // Combine the data with the slug and content
        return {
          slug,
          ...data,
          date: date.toISOString(), // Ensure consistent date format
          isUpcoming,
          content: mdxSource
        };
      })
  );

  // Sort engagements by date
  return engagements.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // For upcoming events, sort by nearest future date first
    if (dateA >= new Date() && dateB >= new Date()) {
      return dateA - dateB;
    }
    // For past events, sort by most recent first
    return dateB - dateA;
  });
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