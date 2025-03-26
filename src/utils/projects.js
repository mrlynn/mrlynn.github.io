import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseISO } from 'date-fns';

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export async function getAllProjects() {
  // Ensure the projects directory exists
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(PROJECTS_DIR);
  const projects = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(PROJECTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, '');

      // Ensure the date is in ISO format
      let date = data.date;
      try {
        date = parseISO(data.date).toISOString().split('T')[0];
      } catch (error) {
        console.error(`Error parsing date for project ${slug}:`, error);
      }

      return {
        slug,
        ...data,
        date,
        content,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return projects;
}

export async function getProjectBySlug(slug) {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  
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
    console.error(`Error parsing date for project ${slug}:`, error);
  }

  return {
    slug,
    ...data,
    date,
    content,
  };
}

export function getAllProjectSlugs() {
  const files = fs.readdirSync(PROJECTS_DIR);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
} 