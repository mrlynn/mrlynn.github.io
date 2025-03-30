import { getAllPosts } from '../../lib/blog';
import BlogList from '../../components/blog/BlogList';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Projects | Michael Lynn',
  description: 'Software development projects and experiments by Michael Lynn',
};

export default async function ProjectsPage() {
  // Get only project posts
  const projects = await getAllPosts('project');

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="A showcase of my work in software development, from experimental prototypes to production applications."
      />
      <BlogList posts={projects} />
    </>
  );
} 