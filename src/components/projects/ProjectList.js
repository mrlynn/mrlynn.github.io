import { Container, Grid, Typography, Box } from '@mui/material';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }) {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Projects
        </Typography>
        <Typography variant="h5" color="text.secondary">
          A collection of my work and experiments
        </Typography>
      </Box>

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