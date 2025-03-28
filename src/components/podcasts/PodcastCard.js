'use client';

import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MotionBox = motion(Box);

export default function PodcastCard({ episode, ...motionProps }) {
  return (
    <MotionBox
      {...motionProps}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        boxShadow: 2,
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'rgba(0,0,0,0.2)' 
          : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
        border: (theme) => `1px solid ${
          theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.1)' 
            : 'rgba(0,0,0,0.1)'
        }`,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Box
            component="img"
            src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
            alt={episode.title}
            sx={{
              width: '100%',
              borderRadius: 1,
              boxShadow: 2,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {episode.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              mb: 2,
            }}
          >
            {episode.description}
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              mb: 2,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {episode.tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small"
                sx={{
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(0,0,0,0.05)',
                  '&:hover': {
                    background: (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'rgba(0,0,0,0.1)',
                  },
                }}
              />
            ))}
          </Stack>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              {new Date(episode.date).toLocaleDateString()} • {episode.duration}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<YouTubeIcon />}
              href={`https://www.youtube.com/watch?v=${episode.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'rgba(0,0,0,0.2)',
                '&:hover': {
                  borderColor: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'rgba(0,0,0,0.3)',
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.05)' 
                    : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              Watch on YouTube
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </MotionBox>
  );
} 