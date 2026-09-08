'use client';

import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import { MotionBox, fadeUp } from '../common/motion';
import { timelineEvents } from '../../data/timeline';

/**
 * The career timeline finally renders somewhere.
 *
 * src/data/timeline.js has been in the repo the whole time, feeding a
 * components/Timeline.js whose only importer was itself dead code — so none of
 * it reached a page. That component also returned null below 768px, which is no
 * good for the one piece of content a recruiter on a phone most wants.
 */
const LOGOS = {
  MongoDB: '/images/mongodb.svg',
  Medallia: '/images/medallia.svg',
  'BMC Software': '/images/bmc.svg',
  'Bank of America': '/images/bofa.svg',
  'Merrill Lynch': '/images/ml.svg',
};

export default function CareerTimeline() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Cursor's mark is monochrome, so it needs the variant that reads on the canvas.
  const logoFor = (company) =>
    company === 'Cursor'
      ? isDark
        ? '/images/cursor-logo-white.png'
        : '/images/cursor-logo-dark.png'
      : LOGOS[company];

  return (
    <Box>
      <SectionHeading
        eyebrow="Career"
        title="Where I've worked"
        intro="Twenty-five years, most of it spent closer to infrastructure than to marketing."
      />

      <Box>
        {timelineEvents.map((event, i) => {
          const logo = logoFor(event.company);

          return (
            <MotionBox
              key={event.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={Math.min(i, 4)}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '160px 1fr' },
                gap: { xs: 1, md: 4 },
                py: { xs: 3, md: 3.5 },
                borderTop: `1px solid ${theme.palette.border.subtle}`,
                borderBottom:
                  i === timelineEvents.length - 1
                    ? `1px solid ${theme.palette.border.subtle}`
                    : 'none',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: theme.palette.text.secondary,
                  pt: { md: 0.5 },
                }}
              >
                {event.date}
              </Typography>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  {logo && (
                    <Box sx={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}>
                      <Image
                        src={logo}
                        alt=""
                        fill
                        sizes="22px"
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>
                  )}
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: theme.palette.primary.main,
                    }}
                  >
                    {event.company}
                  </Typography>
                </Box>

                <Typography
                  component="h3"
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', md: '1.4rem' },
                    lineHeight: 1.25,
                    color: theme.palette.text.primary,
                    mb: 1,
                  }}
                >
                  {event.title}
                </Typography>

                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                    maxWidth: 640,
                  }}
                >
                  {event.description}
                </Typography>
              </Box>
            </MotionBox>
          );
        })}
      </Box>
    </Box>
  );
}
