'use client';

import { Box, Container, Typography, Chip, useTheme } from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import TalkToMyAI from '../../components/TalkToMyAI';
import { personalInfo } from '../../data/personalInfo';

const MotionBox = motion(Box);

export default function AskAIPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, md: 12 },
        pb: 8,
        background: isDark
          ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, rgba(6, 182, 212, 0.02) 40%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 100%)',
      }}
    >
      {/* Hero Header */}
      <Container maxWidth="md">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}
        >
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              mb: 3,
              borderRadius: 5,
              background: isDark ? 'rgba(0, 237, 100, 0.08)' : 'rgba(16, 185, 129, 0.06)',
              border: `1px solid ${isDark ? 'rgba(0, 237, 100, 0.2)' : 'rgba(16, 185, 129, 0.15)'}`,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 14, color: isDark ? '#00ED64' : '#10b981' }} />
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: isDark ? '#00ED64' : '#10b981',
                letterSpacing: 1,
                textTransform: 'uppercase',
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              AI-Powered
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              mb: 2,
              background: isDark
                ? 'linear-gradient(135deg, #ffffff 0%, #00ED64 50%, #06b6d4 100%)'
                : 'linear-gradient(135deg, #1a1a2e 0%, #10b981 50%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ask My AI Anything
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.9rem', md: '1.05rem' },
              maxWidth: 560,
              mx: 'auto',
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            Chat with an AI trained on {personalInfo.stats.yearsExperience} years of career history,{' '}
            {personalInfo.projects.length}+ projects, and {personalInfo.stats.techTalks} talks — or copy the prompt to use with your favorite LLM.
          </Typography>

          {/* Trust signals */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 4 }, flexWrap: 'wrap', mb: 1 }}
          >
            {[
              { label: personalInfo.stats.techTalks, sublabel: 'Talks' },
              { label: personalInfo.stats.developersReached, sublabel: 'Devs Reached' },
              { label: personalInfo.stats.openSourceContributions, sublabel: 'OSS Contributions' },
            ].map(({ label, sublabel }) => (
              <Box key={sublabel} sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: isDark ? '#00ED64' : '#10b981',
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    fontFamily: '"JetBrains Mono", monospace',
                  }}
                >
                  {sublabel}
                </Typography>
              </Box>
            ))}
          </MotionBox>

          {/* "What this AI knows" chips */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, flexWrap: 'wrap', mt: 2.5 }}
          >
            {['Career History', 'Projects & Demos', 'Technical Talks', 'MongoDB Expertise', 'Podcasts', 'Open Source'].map((topic) => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                icon={<VerifiedIcon sx={{ fontSize: '13px !important', color: `${isDark ? '#00ED64' : '#10b981'} !important` }} />}
                sx={{
                  height: 26,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  background: isDark ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.04)',
                  border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)'}`,
                  '& .MuiChip-icon': { ml: 0.5 },
                }}
              />
            ))}
          </MotionBox>
        </MotionBox>

        {/* Main Component */}
        <TalkToMyAI variant="full" />
      </Container>
    </Box>
  );
}
