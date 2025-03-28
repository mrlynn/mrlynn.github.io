import { getAllProjects } from '../../utils/projects';
import ProjectList from '../../components/projects/ProjectList';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Projects | Michael Lynn',
  description: 'A collection of my work and experiments in software development',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="A showcase of my work in software development, from experimental prototypes to production applications. Each project represents a unique challenge and learning opportunity."
      />
      <ProjectList projects={projects} />
    </>
  );
} 