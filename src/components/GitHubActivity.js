'use client';

import { Box, Paper, Typography, useTheme, Button } from '@mui/material';
import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion';
import Section from './Section';
import Link from 'next/link';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Lock as LockIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';


const MotionPaper = motion(Paper);

export default function GitHubActivity() {
  const theme = useTheme();

  // Theme with exactly 5 colors for dark mode
  const colorTheme = {
    dark: [
      '#141414', // No contributions
      '#0a4208', // Level 1
      '#047526', // Level 2
      '#45a045', // Level 3
      '#39dd34', // Level 4
    ]
  };

  return (
    <Section title="GitHub Activity" subtitle="My open source contributions">
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <GitHubCalendar 
          username="mrlynn"
          theme={colorTheme}
          fontSize={12}
          blockSize={10}
          blockMargin={4}
          style={{
            color: theme.palette.text.secondary,
            padding: '1rem 0',
          }}
        />
      </MotionPaper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            component={Link}
            href="https://github.com/mrlynn"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            View More
          </Button>
        </Box>
    </Section>
  );
} 