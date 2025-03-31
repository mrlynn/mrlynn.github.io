'use client';

import { Box, Typography } from '@mui/material';

export default function VideoPlayer({ title, description, src }) {
  // Convert YouTube URL to embed URL if needed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(src);

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1" color="text.secondary" paragraph>
          {description}
        </Typography>
      )}
      <Box
        sx={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: 1,
          boxShadow: 1,
          '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          },
        }}
      >
        <iframe
          src={embedUrl}
          title={title || 'Video Player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
} 