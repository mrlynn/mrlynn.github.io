'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { getVideoUrl, getVideoEmbedUrl } from '../utils/videoUtils'; 

const MotionTypography = motion(Typography);

export default function PageHeader({ title, subtitle, align = 'center', maxWidth = 'lg' }) {
  return (
    <Box 
      sx={{ 
        py: { xs: 4, md: 8 },
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
      }}
    >
      <Container maxWidth={maxWidth}>
        <MotionTypography
          variant="h1"
          component="h1"
          align={align}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
            fontWeight: 600,
            mb: 2,
            background: (theme) => theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </MotionTypography>
        {subtitle && (
          <MotionTypography
            variant="h5"
            color="text.secondary"
            align={align}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              maxWidth: '800px',
              mx: align === 'center' ? 'auto' : 0,
              mb: { xs: 3, md: 6 },
            }}
          >
            {subtitle}
          </MotionTypography>
        )}
      </Container>
    </Box>
  );
} 