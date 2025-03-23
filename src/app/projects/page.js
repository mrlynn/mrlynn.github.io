'use client';

import { useState } from 'react';
import { Box, Button, Container, Typography, Grid, Paper, Chip, Stack, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Lock as LockIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { projects } from '@/data/projects';

const MotionPaper = motion(Paper);

export default function Projects() {
  const theme = useTheme();
  const [selectedTags, setSelectedTags] = useState([]);

  // Get unique tags from all projects
  const allTags = [...new Set(projects.flatMap(project => project.tags))];

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredProjects = projects.filter(project =>
    selectedTags.length === 0 || 
    selectedTags.some(tag => project.tags.includes(tag))
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 12,
      pb: 8,
      background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)',
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Projects
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            A collection of my work in AI, web development, and developer tools
          </Typography>
        </motion.div>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Filter by Technology:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                sx={{
                  m: 0.5,
                  background: selectedTags.includes(tag) 
                    ? theme.palette.background.gradient
                    : 'rgba(255,255,255,0.05)',
                  color: selectedTags.includes(tag) ? 'white' : 'text.primary',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  height: { xs: 24, sm: 32 },
                  '&:hover': {
                    opacity: 0.9,
                    background: selectedTags.includes(tag)
                      ? theme.palette.background.gradient
                      : 'rgba(255,255,255,0.1)',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} md={4} key={project.title}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  background: 'rgba(6, 39, 54, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={project.image}
                    alt={project.title}
                    sx={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      filter: project.private ? 'brightness(0.7)' : 'none',
                    }}
                  />
                  {project.private && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <LockIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Private
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ opacity: 0.9, mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={() => handleTagClick(tag)}
                        sx={{
                          m: 0.5,
                          background: selectedTags.includes(tag)
                            ? theme.palette.background.gradient
                            : 'rgba(255,255,255,0.05)',
                          color: selectedTags.includes(tag) ? 'white' : 'text.primary',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 32 },
                          '&:hover': {
                            opacity: 0.9,
                            background: selectedTags.includes(tag)
                              ? theme.palette.background.gradient
                              : 'rgba(255,255,255,0.1)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Tooltip title={project.private ? "This is a private project" : "View Project"}>
                    <span>
                      <Button
                        size="small"
                        startIcon={project.private ? <LockIcon /> : <LaunchIcon />}
                        href={project.private ? '#' : project.demoUrl}
                        target="_blank"
                        disabled={project.private}
                        sx={{
                          color: project.private ? 'text.secondary' : theme.palette.text.primary,
                          '&:hover': {
                            color: project.private ? 'text.secondary' : theme.palette.secondary.light,
                          },
                        }}
                      >
                        {project.private ? 'Private Project' : 'View Project'}
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 