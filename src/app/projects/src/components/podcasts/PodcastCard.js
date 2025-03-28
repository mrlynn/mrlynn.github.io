'use client';

import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MotionPaper = motion(Box);

export default function PodcastCard({ episode }) {
  return (
    <MotionPaper
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Box
            component="img"
            src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
            alt={episode.title}
            sx={{
              width: '100%',
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>
            {episode.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {episode.description}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {episode.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {new Date(episode.date).toLocaleDateString()} • {episode.duration}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<YouTubeIcon />}
              href={`https://www.youtube.com/watch?v=${episode.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </MotionPaper>
  );
} 