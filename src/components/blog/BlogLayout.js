'use client';

import { Box, Container, Typography, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';
import ShareButton from '../ShareButton';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '60vh',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '800px',
  padding: theme.spacing(4),
}));

const BlogLayout = ({ children, title, description, image, date, author, demoUrl, githubUrl }) => {
  // Add JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Michael Lynn',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box>
        <HeroSection>
          {image && (
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
          )}
          <HeroContent>
            <Typography variant="h1" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {description}
            </Typography>
            <Typography variant="subtitle1">
              By {author} • {new Date(date).toLocaleDateString()}
            </Typography>
          </HeroContent>
        </HeroSection>

        {/* Actions Section: Demo, GitHub, Share */}
        <Box sx={{ 
          py: 3,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          {demoUrl && (
            <Button
              component={Link}
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LaunchIcon />}
              variant="contained"
              color="primary"
            >
              Live Demo
            </Button>
          )}
          {githubUrl && (
            <Button
              component={Link}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              variant="outlined"
            >
              View on GitHub
            </Button>
          )}
          <Typography variant="subtitle1" color="text.secondary" sx={{ mx: 1 }}>
            Share:
          </Typography>
          <ShareButton 
            title={title}
            url={typeof window !== 'undefined' ? window.location.href : ''}
            description={description}
          />
        </Box>

        {/* Content */}
        <Container maxWidth="md" sx={{ py: 8 }}>
          {children}
        </Container>
      </Box>
    </Container>
  );
};

export { BlogLayout }; 