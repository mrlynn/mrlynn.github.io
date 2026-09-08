'use client';

import { Box, Typography, useTheme } from '@mui/material';
import Eyebrow from './Eyebrow';

/**
 * The one section heading for the whole site: mono eyebrow, serif title,
 * optional intro. Replaces three competing treatments that used to appear
 * on the homepage at the same time.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  component = 'h2',
  sx,
}) {
  const theme = useTheme();
  const centered = align === 'center';

  return (
    <Box
      sx={{
        maxWidth: 720,
        mb: { xs: 5, md: 7 },
        mx: centered ? 'auto' : 0,
        textAlign: align,
        ...sx,
      }}
    >
      {eyebrow && (
        <Box sx={{ mb: 2.5, ...(centered && { display: 'flex', justifyContent: 'center' }) }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Box>
      )}
      <Typography
        variant="h2"
        component={component}
        sx={{
          fontFamily: 'var(--font-fraunces), Georgia, serif',
          fontWeight: 600,
          fontSize: { xs: '2rem', md: '2.75rem' },
          lineHeight: 1.1,
          letterSpacing: '-0.015em',
          color: theme.palette.text.primary,
          mb: intro ? 2 : 0,
        }}
      >
        {title}
      </Typography>
      {intro && (
        <Typography
          sx={{
            fontSize: { xs: '1.05rem', md: '1.15rem' },
            lineHeight: 1.7,
            color: theme.palette.text.secondary,
            maxWidth: 620,
            mx: centered ? 'auto' : 0,
          }}
        >
          {intro}
        </Typography>
      )}
    </Box>
  );
}
