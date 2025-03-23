'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Modal, IconButton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Close as CloseIcon } from '@mui/icons-material';

const MotionPaper = motion(Paper);

const artwork = [
  { title: 'Splash', image: '/images/artwork/splash.png' },
  { title: 'Flowers', image: '/images/artwork/flowers.png' },
  { title: 'Water Play', image: '/images/artwork/waterplay.png' },
  { title: 'Wave', image: '/images/artwork/wave.png' },
  { title: 'Two Waves', image: '/images/artwork/twowaves.png' },
  { title: 'Shoreline', image: '/images/artwork/shoreline.png' },
  { title: 'Abstract 1', image: '/images/artwork/abstract1.png' },
  { title: 'Lava', image: '/images/artwork/lava.png' },
  { title: 'Wave 2', image: '/images/artwork/wave2.png' },
  { title: 'Wave 1', image: '/images/artwork/wave1.png' },
  { title: 'Fence Posts', image: '/images/artwork/fenceposts.png' },
];

export default function ArtGallery() {
  const theme = useTheme();
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleOpen = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleClose = () => {
    setSelectedArtwork(null);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 12,
      pb: 8,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)',
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
            Art Gallery
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              textAlign: 'center',
              opacity: 0.9,
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            A collection of my paintings and artwork
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {artwork.map((piece, index) => (
            <Grid item xs={12} sm={6} md={4} key={piece.title}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleOpen(piece)}
                sx={{
                  cursor: 'pointer',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(6, 39, 54, 0.9)'
                    : '#ffffff',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)'}`,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <Box
                  component="img"
                  src={piece.image}
                  alt={piece.title}
                  sx={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {piece.title}
                  </Typography>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>

        <Modal
          open={Boolean(selectedArtwork)}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              outline: 'none',
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: -40,
                top: -40,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedArtwork && (
              <Box
                component="img"
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: 1,
                  boxShadow: 24,
                }}
              />
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
} 