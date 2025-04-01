'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  zIndex: 1,
}));

const FullscreenButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  zIndex: 1,
}));

const ScreenshotSlideshow = ({ screenshots = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Reset currentIndex if screenshots array changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [screenshots]);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h3">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentIndex + 1} / {screenshots.length}
            </Typography>
          </Box>
          <ImageContainer>
            <img
              src={screenshots[currentIndex]}
              alt={`${title} - Screenshot ${currentIndex + 1}`}
              loading="lazy"
            />
            <NavigationButton
              onClick={handlePrevious}
              sx={{ left: theme.spacing(1) }}
              size="large"
            >
              <ChevronLeftIcon />
            </NavigationButton>
            <NavigationButton
              onClick={handleNext}
              sx={{ right: theme.spacing(1) }}
              size="large"
            >
              <ChevronRightIcon />
            </NavigationButton>
            <FullscreenButton onClick={handleFullscreen} size="small">
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </FullscreenButton>
          </ImageContainer>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ScreenshotSlideshow; 