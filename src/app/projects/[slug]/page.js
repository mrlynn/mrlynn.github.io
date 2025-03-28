import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getAllProjects } from '../../../utils/projects';
import ProjectLayout from '../../../components/projects/ProjectLayout';
import { mdxComponents } from '../../../components/mdx/MDXComponents';
import { Typography, Box, Container } from '@mui/material';
import Image from 'next/image';
import ImageCarousel from '../../../components/projects/ImageCarousel';

const components = {
  ...mdxComponents,
  h1: (props) => (
    <Typography variant="h1" component="h1" gutterBottom {...props} />
  ),
  h2: (props) => (
    <Typography variant="h2" component="h2" gutterBottom {...props} />
  ),
  h3: (props) => (
    <Typography variant="h3" component="h3" gutterBottom {...props} />
  ),
  h4: (props) => (
    <Typography variant="h4" component="h4" gutterBottom {...props} />
  ),
  h5: (props) => (
    <Typography variant="h5" component="h5" gutterBottom {...props} />
  ),
  h6: (props) => (
    <Typography variant="h6" component="h6" gutterBottom {...props} />
  ),
  p: (props) => (
    <Typography variant="body1" component="p" paragraph {...props} />
  ),
  ul: (props) => (
    <Typography component="ul" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  ol: (props) => (
    <Typography component="ol" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  li: (props) => (
    <Typography component="li" sx={{ mb: 1 }} {...props} />
  ),
  blockquote: (props) => (
    <Typography
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'primary.main',
        pl: 2,
        py: 1,
        my: 2,
        fontStyle: 'italic',
      }}
      {...props}
    />
  ),
  code: (props) => (
    <Typography
      component="code"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 0.5,
        borderRadius: 1,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <Typography
      component="pre"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        my: 2,
        '& code': {
          bgcolor: 'transparent',
          color: 'inherit',
          p: 0,
        }
      }}
      {...props}
    />
  ),
  img: (props) => {
    // Clean up the src path
    let src = props.src || '';
    
    // Handle markdown image syntax [path]
    if (src.startsWith('[') && src.endsWith(']')) {
      src = src.slice(1, -1);
    }
    
    // Handle relative paths
    if (src.startsWith('./')) {
      src = src.substring(2);
    }
    
    // Handle absolute paths starting with /
    if (src.startsWith('/')) {
      src = src.substring(1);
    }

    return (
      <Box sx={{ my: 4 }}>
        <Image
          src={`/${src}`}
          alt={props.alt || ''}
          width={1200}
          height={630}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        />
      </Box>
    );
  },
};

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const ogImage = project.image || '/images/default-project-image.jpg';

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      publishedTime: project.date,
      authors: [project.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      tags: project.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${params.slug}`,
    },
    authors: [{ name: project.author }],
    keywords: project.tags?.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Project Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <ProjectLayout
      title={project.title}
      description={project.description}
      image={project.image}
      date={project.date}
      author={project.author}
      tags={project.tags}
      color={project.color}
      technologies={project.technologies}
      demoUrl={project.demoUrl}
      githubUrl={project.githubUrl}
    >
      {project.screenshots?.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <ImageCarousel images={project.screenshots} alt={project.title} />
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <MDXRemote source={project.content} components={components} />
      </Box>
    </ProjectLayout>
  );
} 