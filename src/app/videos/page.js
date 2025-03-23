'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Stack, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { YouTube as YouTubeIcon, MusicNote as TikTokIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { videos } from '@/data/videos';

const MotionPaper = motion(Paper);

const getVideoUrl = (video) => {
  switch (video.platform) {
    case 'youtube':
      return `https://www.youtube.com/watch?v=${video.videoId}`;
    case 'tiktok':
      return `https://www.tiktok.com/@fitbodymike/video/${video.videoId}`;
    default:
      return '';
  }
};

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'youtube':
      return <YouTubeIcon sx={{ fontSize: '32px', color: 'white' }} />;
    case 'tiktok':
      return <TikTokIcon sx={{ fontSize: '32px', color: 'white' }} />;
    default:
      return null;
  }
};

export default function VideosPage() {
  const theme = useTheme();
  const [selectedTags, setSelectedTags] = useState([]);

  // Get unique tags from all videos
  const allTags = [...new Set(videos.flatMap(video => video.tags))];

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredVideos = videos.filter(video =>
    selectedTags.length === 0 || 
    selectedTags.some(tag => video.tags.includes(tag))
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 12,
      pb: 8,
      background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)',
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Video Content
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Tutorials, tech talks, and conference presentations about MongoDB, cloud computing, and modern development
          </Typography>
        </motion.div>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Filter by Topic:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                sx={{
                  m: 0.5,
                  background: selectedTags.includes(tag) 
                    ? theme.palette.background.gradient
                    : 'rgba(255,255,255,0.05)',
                  color: selectedTags.includes(tag) ? 'white' : 'text.primary',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  height: { xs: 24, sm: 32 },
                  '&:hover': {
                    opacity: 0.9,
                    background: selectedTags.includes(tag)
                      ? theme.palette.background.gradient
                      : 'rgba(255,255,255,0.1)',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {filteredVideos.map((video, index) => (
            <Grid item xs={12} md={4} key={video.videoId}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  background: 'rgba(6, 39, 54, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  component="a"
                  href={getVideoUrl(video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    cursor: 'pointer',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                    '&:hover .play-icon': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={video.thumbnail}
                    alt={video.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <Box
                    className="play-icon"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: video.platform === 'youtube' 
                        ? 'rgba(255, 0, 0, 0.8)'
                        : 'rgba(0, 0, 0, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {getPlatformIcon(video.platform)}
                  </Box>
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {video.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ opacity: 0.9, mb: 2 }}
                  >
                    {video.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
                    {video.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={() => handleTagClick(tag)}
                        sx={{
                          m: 0.5,
                          background: selectedTags.includes(tag)
                            ? theme.palette.background.gradient
                            : 'rgba(255,255,255,0.05)',
                          color: selectedTags.includes(tag) ? 'white' : 'text.primary',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 32 },
                          '&:hover': {
                            opacity: 0.9,
                            background: selectedTags.includes(tag)
                              ? theme.palette.background.gradient
                              : 'rgba(255,255,255,0.1)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 