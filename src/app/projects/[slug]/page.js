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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mlynn.org';
  const fullUrl = `${baseUrl}/projects/${params.slug}`;
  const imageUrl = project.image ? `${baseUrl}${project.image}` : `${baseUrl}/images/og-image.jpg`;

  return {
    title: project.title,
    description: project.description,
    authors: [{ name: project.author }],
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: fullUrl,
      siteName: 'Michael Lynn',
      publishedTime: project.date,
      authors: [project.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [imageUrl],
      creator: '@mlynn',
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