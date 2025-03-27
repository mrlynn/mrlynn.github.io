'use client';

import { Box, Typography } from '@mui/material';

export default function DemoVideo({ url, title }) {
  return (
    <Box sx={{ my: 4 }}>
      {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
      <Box
        sx={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 1,
          },
        }}
      >
        <iframe
          src={url}
          title={title || 'Demo Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
} 