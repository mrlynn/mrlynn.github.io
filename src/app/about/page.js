'use client';

import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, Download as DownloadIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import Eyebrow from '../../components/common/Eyebrow';
import { SECTION_RHYTHM } from '../../components/common/Section';
import { MotionBox, fadeUp, EASE } from '../../components/common/motion';
import CareerTimeline from '../../components/about/CareerTimeline';
import Certifications from '../../components/Certifications';
import GitHubActivity from '../../components/GitHubActivity';

export default function AboutPage() {
  const theme = useTheme();
  const hairline = theme.palette.border.subtle;

  return (
    <Box>
      {/* Bio */}
      <Box sx={{ background: theme.palette.background.mesh }}>
        <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="flex-start">
            <Grid item xs={12} md={7}>
              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={0}>
                <Eyebrow>About</Eyebrow>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={1}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontWeight: 600,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    mt: 2.5,
                    mb: 3.5,
                  }}
                >
                  Michael Lynn
                </Typography>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={2}>
                <Box
                  sx={{
                    maxWidth: '58ch',
                    fontSize: '1.0625rem',
                    '& p': {
                      fontSize: '1.0625rem',
                      lineHeight: 1.75,
                      color: theme.palette.text.secondary,
                      mb: 2.5,
                    },
                  }}
                >
                  <Typography component="p">
                    I&apos;m an AI Adoption Engineer at Cursor. The job is helping
                    engineering teams actually use AI-assisted development, which in
                    practice means writing workshops and education programs and then
                    standing in front of people and running them.
                  </Typography>
                  <Typography component="p">
                    Before that I was at MongoDB for ten years, the last eight as a
                    Principal Developer Advocate, working on data modeling, Atlas,
                    vector search, and retrieval. I hosted the MongoDB Podcast from
                    2018 until 2024.
                  </Typography>
                  <Typography component="p">
                    The twenty years before MongoDB were infrastructure work. UNIX
                    engineering at Merrill Lynch, then system design and data center
                    migrations at Bank of America, then pre-sales consulting at BMC
                    and Medallia. That is a long time spent on the operations side of
                    other people&apos;s rollouts, and it is most of the reason I am
                    wary of tooling that only works in a demo.
                  </Typography>
                  <Typography component="p">
                    I live outside Philadelphia. I paint when I&apos;m not working,
                    mostly acrylic pours, and a fair amount of it ends up{' '}
                    <Box
                      component={Link}
                      href="/art"
                      sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                    >
                      on this site
                    </Box>
                    .
                  </Typography>
                </Box>
              </MotionBox>

              <MotionBox
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={3}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}
              >
                <Button
                  component={Link}
                  href="/resume"
                  variant="contained"
                  disableElevation
                  endIcon={<ArrowForwardIcon />}
                  sx={{ px: 3.5, py: 1.3, fontWeight: 600, borderRadius: '8px' }}
                >
                  Read the résumé
                </Button>
                <Button
                  href="/Michael_Lynn_Resume.pdf"
                  download
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{
                    px: 3.5,
                    py: 1.3,
                    fontWeight: 600,
                    borderRadius: '8px',
                    borderColor: theme.palette.border.default,
                    color: theme.palette.text.primary,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  Download PDF
                </Button>
              </MotionBox>
            </Grid>

            <Grid item xs={12} md={5}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                sx={{ position: 'relative', maxWidth: { xs: 280, md: 400 }, mx: { xs: 0, md: 'auto' } }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'translate(18px, 18px)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '4px',
                    opacity: 0.5,
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: '4 / 5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.border.default}`,
                    boxShadow: theme.shadows[6],
                  }}
                >
                  <Image
                    src="/images/headshot.jpg"
                    alt="Michael Lynn"
                    fill
                    sizes="(max-width: 900px) 280px, 400px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                  />
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Career */}
      <Box sx={{ borderTop: `1px solid ${hairline}` }}>
        <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
          <CareerTimeline />
        </Container>
      </Box>

      {/* Certifications */}
      <Box sx={{ borderTop: `1px solid ${hairline}`, backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
          <Certifications />
        </Container>
      </Box>

      {/* Open source */}
      <Box sx={{ borderTop: `1px solid ${hairline}` }}>
        <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
          <GitHubActivity />
        </Container>
      </Box>
    </Box>
  );
}
