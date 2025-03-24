'use client';

import { Box, Container, Typography, Chip, Grid, Paper, Stack, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub as GitHubIcon, Launch as LaunchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const MotionPaper = motion(Paper);

export default function ProjectDetailClient({ project }) {
  const theme = useTheme();
  const router = useRouter();

  const handleBack = () => {
    router.push('/projects/');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '300px', md: '400px' },
          width: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 24, md: 48 },
                left: 24,
                right: 24,
              }}
            >
              <Button
                component={Link}
                href="/projects/"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
              >
                Back to Projects
              </Button>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 600,
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {project.title}
              </Typography>
            </Box>
          </Container>
        </motion.div>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Project Overview */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Project Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {project.description}
              </Typography>
            </Paper>

            {/* Goals & Objectives */}
            {project.goals && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Goals & Objectives
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {project.goals.map((goal, index) => (
                    <li key={index}>
                      <Typography variant="body1" paragraph>
                        {goal}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            )}

            {/* Experience & Challenges */}
            {project.experience && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Experience & Challenges
                </Typography>
                <Typography variant="body1" paragraph>
                  {project.experience}
                </Typography>
              </Paper>
            )}

            {/* Key Features */}
            {project.features && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Key Features
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {project.features.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body1" paragraph>
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Project Image */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Paper>

            {/* Project Details */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Project Details
              </Typography>
              
              {project.timeline && (
                <>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Timeline
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {project.timeline}
                  </Typography>
                </>
              )}

              {project.technologies && (
                <>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Technologies Used
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                    {project.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Stack>
                </>
              )}

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {project.githubUrl && (
                  <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    View Code
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    variant="outlined"
                    startIcon={<LaunchIcon />}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Live Demo
                  </Button>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 