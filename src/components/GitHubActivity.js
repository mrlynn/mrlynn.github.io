'use client';

import { Box, Button, Paper, useTheme } from '@mui/material';
import GitHubCalendar from 'react-github-calendar';
import Link from 'next/link';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import SectionHeading from './common/SectionHeading';
import { MotionBox, EASE } from './common/motion';
import { SOCIAL_LINKS } from '../lib/navigation';

/**
 * Contribution ramps for both themes. Only the dark ramp used to be defined, so
 * in light mode the calendar fell back to the library's default grey and read
 * as broken rather than quiet. Both ramps are the persimmon scale from
 * src/theme/designSystem.js.
 */
const CALENDAR_THEME = {
  light: ['#e1e0d8', '#faefc2', '#eed267', '#c9a52b', '#7d6200'],
  dark: ['#1e201c', '#5c4800', '#7d6200', '#c9a52b', '#e8c547'],
};

export default function GitHubActivity({ eyebrow = 'Open source' }) {
  const theme = useTheme();

  return (
    <Box>
      <SectionHeading
        eyebrow={eyebrow}
        title="What I've been building"
        intro="Public contributions across my repositories over the last year."
      />

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'background.paper',
            border: `1px solid ${theme.palette.border.subtle}`,
            borderRadius: '6px',
            overflowX: 'auto',
          }}
        >
          <GitHubCalendar
            username="mrlynn"
            theme={CALENDAR_THEME}
            colorScheme={theme.palette.mode}
            fontSize={12}
            blockSize={10}
            blockMargin={4}
            style={{ color: theme.palette.text.secondary, padding: '0.5rem 0' }}
          />
        </Paper>
      </MotionBox>

      <Box sx={{ mt: 3 }}>
        <Button
          component={Link}
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderColor: theme.palette.border.default,
            color: theme.palette.text.primary,
            borderRadius: '4px',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: 'transparent',
            },
          }}
        >
          View on GitHub
        </Button>
      </Box>
    </Box>
  );
}
