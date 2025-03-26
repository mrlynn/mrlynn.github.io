'use client';

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const BlogLayout = ({ children, title, description, image, date, author }) => {
  return (
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
          <Typography variant="subtitle1">
            By {author} • {new Date(date).toLocaleDateString()}
          </Typography>
        </HeroContent>
      </HeroSection>
      <Container maxWidth="md" sx={{ py: 8 }}>
        {children}
      </Container>
    </Box>
  );
};

export default BlogLayout; 