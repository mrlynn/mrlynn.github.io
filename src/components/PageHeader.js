'use client';

import { Box, Container, Typography } from '@mui/material';
import { MotionTypography, EASE } from './common/motion';

/**
 * The one page title treatment.
 *
 * Six different h1 sizes used to ship across the site (PageHeader, consulting,
 * art, Resume, the homepage hero and the theme's own h1). This is the size every
 * page-level title uses now; the homepage hero is the single deliberate exception.
 */
export const PAGE_TITLE_SIZE = { xs: '2.5rem', sm: '3rem', md: '3.5rem' };

export default function PageHeader({
  title,
  subtitle,
  align = 'center',
  maxWidth = 'lg',
}) {
  return (
    <Box sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth={maxWidth}>
        <MotionTypography
          variant="h1"
          component="h1"
          align={align}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          sx={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: PAGE_TITLE_SIZE,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            mb: 2,
            color: 'text.primary',
          }}
        >
          {title}
        </MotionTypography>
        {subtitle && (
          <MotionTypography
            component="p"
            align={align}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            sx={{
              fontSize: { xs: '1.05rem', md: '1.15rem' },
              lineHeight: 1.7,
              color: 'text.secondary',
              maxWidth: 680,
              mx: align === 'center' ? 'auto' : 0,
            }}
          >
            {subtitle}
          </MotionTypography>
        )}
      </Container>
    </Box>
  );
}
