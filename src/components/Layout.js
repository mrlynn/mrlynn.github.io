'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import NavigationImproved from './NavigationImproved';

const MotionBox = motion(Box);

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Navigation */}
      <NavigationImproved />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          pt: 8, // Add padding top to account for fixed AppBar
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 