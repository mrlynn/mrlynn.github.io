import { Box, Container, Typography, Chip, Stack, Link, IconButton } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import Image from 'next/image';

export function ProjectLayout({ project, children }) {
  const {
    title,
    description,
    image,
    date,
    author,
    tags = [],
    color = 'primary',
    technologies = [],
    demoUrl,
    githubUrl,
  } = project;

  return (
    <Box>
      {/* Hero Section with Image */}
      {image && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '400px',
            mb: 6,
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            priority
          />
        </Box>
      )}

      {/* Project Info Section */}
      <Box
        sx={{
          bgcolor: `${color}.main`,
          color: `${color}.contrastText`,
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h1" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                />
              ))}
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'inherit' }}
                >
                  <IconButton color="inherit">
                    <GitHubIcon />
                  </IconButton>
                </Link>
              )}
              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'inherit' }}
                >
                  <IconButton color="inherit">
                    <LaunchIcon />
                  </IconButton>
                </Link>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Project Content */}
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
} 