'use client';

import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { PlayArrow as PlayIcon } from '@mui/icons-material';
import { trackVideoPlay } from '../../lib/analytics';

export default function VideoCard({ video }) {
  const handleVideoClick = () => {
    trackVideoPlay(video.videoId, video.title, video.platform);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={video.thumbnail}
          alt={video.title}
          sx={{ objectFit: 'cover' }}
        />
        <IconButton
          onClick={handleVideoClick}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <PlayIcon sx={{ color: 'white', fontSize: 40 }} />
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {video.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {video.description}
        </Typography>
      </CardContent>
    </Card>
  );
} 