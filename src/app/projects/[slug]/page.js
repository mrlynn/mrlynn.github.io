import { Box, Container, Typography, Button } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { projects } from '../../../data/projects';
import Link from 'next/link';
import ProjectDetailClient from './ProjectDetailClient';

// This function tells Next.js which project slugs to pre-render at build time
export async function generateStaticParams() {
  // Get all projects that have a slug
  const projectSlugs = projects
    .filter(project => project.slug)
    .map(project => ({
      slug: project.slug
    }));
  
  return projectSlugs;
}

export default function ProjectDetail({ params }) {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        pt: 12,
        pb: 8,
        background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)',
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Project not found
          </Typography>
          <Button
            component={Link}
            href="/projects"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
          >
            Back to Projects
          </Button>
        </Container>
      </Box>
    );
  }

  return <ProjectDetailClient project={project} />;
} 