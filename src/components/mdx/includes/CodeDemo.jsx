'use client';

import { Box, Typography, Paper } from '@mui/material';
import { useState } from 'react';

export default function CodeDemo({ title, description, code, children }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ mb: 2 }}>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
        )}
      </Box>

      <Paper
        elevation={1}
        sx={{
          overflow: 'hidden',
          '& pre': {
            margin: 0,
            padding: 2,
            backgroundColor: 'background.paper',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            borderBottom: 1,
            borderColor: 'divider',
            '& button': {
              padding: '8px 16px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            },
            '& button.active': {
              color: 'primary.main',
              borderBottom: 2,
              borderColor: 'primary.main',
            },
          }}
        >
          <button
            className={!showCode ? 'active' : ''}
            onClick={() => setShowCode(false)}
          >
            Preview
          </button>
          <button
            className={showCode ? 'active' : ''}
            onClick={() => setShowCode(true)}
          >
            Code
          </button>
        </Box>

        {showCode ? (
          <pre>{code}</pre>
        ) : (
          <Box sx={{ p: 2 }}>{children}</Box>
        )}
      </Paper>
    </Box>
  );
} 