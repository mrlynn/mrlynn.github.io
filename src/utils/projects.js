import { getAllMDXFiles, getMDXFileBySlug } from './mdx';
import { parseISO } from 'date-fns';

const PROJECTS_DIR = 'content/projects';

export async function getAllProjects() {
  const projects = await getAllMDXFiles(PROJECTS_DIR);
  
  // Sort projects by date
  return projects.sort((a, b) => {
    const dateA = parseISO(a.date || new Date().toISOString());
    const dateB = parseISO(b.date || new Date().toISOString());
    return dateB - dateA;
  });
}

export async function getProjectBySlug(slug) {
  const project = await getMDXFileBySlug(PROJECTS_DIR, slug);
  
  if (!project) return null;

  // Ensure date is properly formatted
  if (project.date) {
    project.date = parseISO(project.date).toISOString();
  }

  // Ensure tags is an array
  if (!Array.isArray(project.tags)) {
    project.tags = [];
  }

  // Ensure technologies is an array
  if (!Array.isArray(project.technologies)) {
    project.technologies = [];
  }

  console.log('Project data:', {
    title: project.title,
    hasContent: !!project.content,
    contentType: typeof project.content,
    contentPreview: JSON.stringify(project.content).substring(0, 100),
  });

  return project;
}

export function getAllProjectSlugs() {
  return getAllProjects().then(projects => projects.map(project => project.slug));
} 