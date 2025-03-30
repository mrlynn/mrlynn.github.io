import { getPostBySlug, getAllPosts } from '../../../lib/blog';
import { BlogLayout } from '../../../components/blog/BlogLayout';
import BlogPostContent from '../../../components/blog/BlogPostContent';
import { Typography, Container } from '@mui/material';

export async function generateStaticParams() {
  const projects = await getAllPosts('project');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = await getPostBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      publishedTime: project.date,
      authors: [project.author],
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function Project({ params }) {
  const project = await getPostBySlug(params.slug);
  
  if (!project) {
    return (
      <Container>
        <Typography variant="h1">Project Not Found</Typography>
      </Container>
    );
  }

  return (
    <BlogLayout
      title={project.title}
      description={project.description}
      image={project.image}
      date={project.date}
      author={project.author}
    >
      <BlogPostContent post={project} slug={params.slug} />
    </BlogLayout>
  );
} 