<<<<<<< HEAD
import { getProjectBySlug, getAllProjects } from '../../../utils/blog';
import { BlogLayout } from '../../../components/blog/BlogLayout';
import BlogPostContent from '../../../components/blog/BlogPostContent';
import { Typography, Container } from '@mui/material';
=======
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getAllProjects } from '../../../utils/projects';
import ProjectLayout from '../../../components/projects/ProjectLayout';
import { mdxComponents } from '../../../components/mdx/MDXComponents';
import { Typography, Box, Container } from '@mui/material';
import Image from 'next/image';
import ImageCarousel from '../../../components/projects/ImageCarousel';
>>>>>>> 00ae68e0dff597081fbfcbcd9c2805c6b9342fa9

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
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
  const project = await getProjectBySlug(params.slug);
  
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
<<<<<<< HEAD
      <BlogPostContent post={project} slug={params.slug} />
    </BlogLayout>
=======
      {project.screenshots?.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <ImageCarousel images={project.screenshots} alt={project.title} />
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <MDXRemote source={project.content} components={components} />
      </Box>
    </ProjectLayout>
>>>>>>> 00ae68e0dff597081fbfcbcd9c2805c6b9342fa9
  );
} 