import { Container, Typography, Box, Stack, Chip, Link as MuiLink } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';

const HeroSection = ({ children, sx }) => (
  <Box
    sx={{
      position: 'relative',
      height: '60vh',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1,
      },
      ...sx,
    }}
  >
    <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
      {children}
    </Box>
  </Box>
);

const HeroContent = ({ children }) => (
  <Container maxWidth="md">
    <Stack spacing={2}>{children}</Stack>
  </Container>
);

export default function ProjectLayout({
  children,
  title,
  description,
  image,
  date,
  author,
  tags,
  color,
  technologies,
  demoUrl,
  githubUrl,
}) {
  // Add JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: description,
    image: image,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    technologies: technologies,
  };

  return (
    <Container maxWidth="lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box>
        <HeroSection
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <HeroContent>
            <Typography variant="h1" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {description}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Typography variant="subtitle1">
                By {author} • {format(new Date(date), 'MMMM yyyy')}
              </Typography>
              {demoUrl && (
                <MuiLink
                  component={Link}
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', textDecoration: 'underline' }}
                >
                  Live Demo
                </MuiLink>
              )}
              {githubUrl && (
                <MuiLink
                  component={Link}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', textDecoration: 'underline' }}
                >
                  GitHub
                </MuiLink>
              )}
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{
                    bgcolor: color,
                    color: 'white',
                    '&:hover': {
                      bgcolor: color,
                      opacity: 0.9,
                    },
                  }}
                />
              ))}
            </Box>
          </HeroContent>
        </HeroSection>
        <Container maxWidth="md" sx={{ py: 8 }}>
          {children}
        </Container>
      </Box>
    </Container>
  );
} 