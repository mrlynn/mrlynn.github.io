import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { parseISO } from 'date-fns';

const projectsDirectory = join(process.cwd(), 'content/projects');

export async function getAllProjects() {
  const fileNames = readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // Remove ".mdx" from file name to get id
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = join(projectsDirectory, fileName);
      const fileContents = readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        ...data,
        date: data.date ? parseISO(data.date) : new Date(),
        content
      };
    });

  // Sort projects by date
  return allProjectsData.sort((a, b) => b.date - a.date);
}

export async function getProjectBySlug(slug) {
  const filePath = join(projectsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content
    };
  } catch (error) {
    return null;
  }
}

export function getAllProjectSlugs() {
  const files = readdirSync(projectsDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
} 