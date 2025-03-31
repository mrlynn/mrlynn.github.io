'use client';

import { Box, Typography } from '@mui/material';

export default function AsciiDiagram({ children }) {
  return (
    <Box
      sx={{
        my: 4,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'auto',
        '& pre': {
          margin: 0,
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          lineHeight: 1.5,
        },
      }}
    >
      <pre>{children}</pre>
    </Box>
  );
} 