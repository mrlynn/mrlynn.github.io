'use client';

import { Box } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import NavigationImproved from './NavigationImproved';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    /*
      reducedMotion="user" makes every framer-motion animation on the site honour
      the OS "reduce motion" setting: transform and layout animations are dropped,
      opacity still animates, so content appears without sliding or scaling.
      Nothing here respected that setting before, and most of the page is
      motion-driven. CSS-driven animation is handled by the matching media query
      in src/app/globals.css.
    */
    <MotionConfig reducedMotion="user">
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/*
          Must be the first focusable element in the DOM. Styles live in
          globals.css so it can position itself off-screen until focused without
          MUI's emotion styles having to load first.
        */}
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <NavigationImproved />

        {/*
          No horizontal padding here on purpose. Every page nests its own MUI
          Container, which supplies gutters; adding px to <main> as well doubled
          them site-wide and stopped full-bleed section bands short of the
          viewport edge.

          tabIndex={-1} is what makes the skip link actually work: without it the
          browser moves the viewport but leaves focus in the nav, so the next Tab
          goes back to the second nav item.
        */}
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
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
    </MotionConfig>
  );
}
