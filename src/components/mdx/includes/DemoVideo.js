import React from 'react';
import { Box, Typography } from '@mui/material';

const DemoVideo = ({ videoId, platform = 'youtube', title }) => {
  if (!videoId) {
    return null;
  }

  const getEmbedUrl = () => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`;
      default:
        return `https://www.youtube.com/embed/${videoId}`;
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%', // 16:9 aspect ratio
          width: '100%',
        }}
      >
        <iframe
          src={getEmbedUrl()}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default DemoVideo; 