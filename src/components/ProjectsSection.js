'use client';

import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, useTheme, Tooltip, Chip, Stack, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Lock as LockIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { projects } from '../data/projects';
import Link from 'next/link';

const MotionCard = motion.create(Card);

export default function ProjectsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        py: 12,
        background: isDark
          ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)'
          : 'radial-gradient(circle at center, rgba(16, 185, 129, 0.04) 0%, transparent 70%)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 700,
            fontFamily: '"Space Grotesk", sans-serif',
            background: theme.palette.background.gradientAccent,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Featured Projects
        </Typography>
        <Grid container spacing={4}>
          {projects.slice(0, 6).map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={project.title}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: theme.palette.background.paper,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.border.subtle}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : theme.palette.border.default,
                    boxShadow: isDark
                      ? '0 8px 24px rgba(0,0,0,0.3), 0 0 15px rgba(16, 185, 129, 0.08)'
                      : theme.shadows[8],
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                      borderBottom: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.06)'}`,
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        sx={{
                          m: 0.5,
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          fontFamily: '"JetBrains Mono", monospace',
                          height: { xs: 24, sm: 28 },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Tooltip title={project.private ? "This is a private project" : "View Project"}>
                    <span>
                      <Button
                        size="small"
                        startIcon={project.private ? <LockIcon /> : <LaunchIcon />}
                        href={project.private ? '#' : project.demoUrl}
                        target="_blank"
                        disabled={project.private}
                        sx={{
                          color: project.private
                            ? theme.palette.text.disabled
                            : theme.palette.text.primary,
                          '&:hover': {
                            color: project.private
                              ? theme.palette.text.disabled
                              : theme.palette.primary.main,
                          },
                        }}
                      >
                        {project.private ? 'Private Project' : 'View Project'}
                      </Button>
                    </span>
                  </Tooltip>
                </CardActions>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            component={Link}
            href="/projects"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : theme.palette.border.default,
              borderWidth: '1.5px',
              color: theme.palette.text.primary,
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 600,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderWidth: '1.5px',
                borderColor: theme.palette.primary.main,
                backgroundColor: isDark
                  ? 'rgba(16, 185, 129, 0.08)'
                  : 'rgba(16, 185, 129, 0.04)',
                transform: 'translateY(-2px)',
                boxShadow: isDark
                  ? '0 4px 16px rgba(16, 185, 129, 0.15)'
                  : theme.shadows[4],
              },
            }}
          >
            View More Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 