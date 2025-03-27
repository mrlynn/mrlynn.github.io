'use client';

import { Box, Paper, Typography } from '@mui/material';

export default function CodeBlock({ children, language }) {
  return (
    <Paper
      component="pre"
      elevation={0}
      sx={{
        p: 2,
        my: 2,
        bgcolor: 'grey.100',
        borderRadius: 1,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      {language && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
          }}
        >
          {language}
        </Typography>
      )}
      <Typography
        component="code"
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          display: 'block',
          whiteSpace: 'pre',
        }}
      >
        {children}
      </Typography>
    </Paper>
  );
} 