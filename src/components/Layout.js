'use client';

import { Box } from '@mui/material';
import NavigationImproved from './NavigationImproved';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavigationImproved />

      {/*
        No horizontal padding here on purpose. Every page nests its own MUI
        Container, which supplies gutters; adding px to <main> as well doubled
        them site-wide and stopped full-bleed section bands short of the
        viewport edge.
      */}
      <Box
        component="main"
        sx={{
          pt: { xs: 8, md: 9 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
