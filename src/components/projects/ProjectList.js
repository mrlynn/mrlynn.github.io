'use client';

import { Container, Grid, Box, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }) {
  if (!projects?.length) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            No projects found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new projects!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item key={project.slug} xs={12} sm={6} md={4}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 