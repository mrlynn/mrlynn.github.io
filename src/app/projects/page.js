import { getAllProjects } from '../../utils/projects';
import ProjectList from '../../components/projects/ProjectList';

export const metadata = {
  title: 'Projects | Michael Lynn',
  description: 'A collection of my work and experiments in software development',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectList projects={projects} />;
} 