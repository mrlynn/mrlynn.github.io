'use client';

import { Typography, useTheme } from '@mui/material';

/**
 * The small mono label that opens a section ("— WHAT I DO").
 *
 * This lived twice, copy-pasted between app/page.js and app/consulting/page.js,
 * and the two copies had already drifted apart.
 */
export default function Eyebrow({ children, sx }) {
  const theme = useTheme();

  return (
    <Typography
      component="span"
      sx={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: theme.palette.primary.main,
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        '&::before': {
          content: '""',
          width: 28,
          height: '1px',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.6,
        },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
