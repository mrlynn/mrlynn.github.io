'use client';

import { Box, Container, Typography, Button, Grid, Stack, useTheme, Chip } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, EventAvailable as EventIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CalendarBooking from '../../components/CalendarBooking';
import { consulting } from '../../data/consulting';

const MotionBox = motion.create(Box);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Eyebrow({ children, sx }) {
  const theme = useTheme();
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: theme.palette.primary.main,
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        '&::before': {
          content: '""',
          width: 28,
          height: '1px',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.6,
        },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function SectionHeading({ eyebrow, title, intro, align = 'left' }) {
  const theme = useTheme();
  return (
    <Box sx={{ maxWidth: 720, mb: { xs: 5, md: 7 }, mx: align === 'center' ? 'auto' : 0, textAlign: align }}>
      {eyebrow && (
        <Box sx={{ mb: 2.5, ...(align === 'center' && { display: 'flex', justifyContent: 'center' }) }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Box>
      )}
      <Typography
        variant="h2"
        sx={{
          fontFamily: 'var(--font-fraunces), Georgia, serif',
          fontWeight: 600,
          fontSize: { xs: '2rem', md: '2.75rem' },
          lineHeight: 1.15,
          color: theme.palette.text.primary,
          mb: intro ? 2 : 0,
          letterSpacing: '-0.015em',
        }}
      >
        {title}
      </Typography>
      {intro && (
        <Typography
          sx={{
            fontSize: { xs: '1.05rem', md: '1.15rem' },
            lineHeight: 1.7,
            color: theme.palette.text.secondary,
            maxWidth: 640,
            mx: align === 'center' ? 'auto' : 0,
          }}
        >
          {intro}
        </Typography>
      )}
    </Box>
  );
}

export default function ConsultingPage() {
  const theme = useTheme();
  const hairline = theme.palette.border.subtle;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* ---------- HERO ---------- */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 14, md: 20 },
          pb: { xs: 8, md: 12 },
          background: theme.palette.background.mesh,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={9}>
              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={0}>
                <Eyebrow>{consulting.eyebrow}</Eyebrow>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={1}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontWeight: 600,
                    fontSize: { xs: '2.5rem', sm: '3.25rem', md: '4rem' },
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    color: theme.palette.text.primary,
                    mt: 3,
                    mb: 3,
                    maxWidth: 900,
                  }}
                >
                  {consulting.headline}
                </Typography>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={2}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                    color: theme.palette.primary.main,
                    mb: 3,
                    maxWidth: 640,
                  }}
                >
                  {consulting.subhead}
                </Typography>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={3}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                    lineHeight: 1.75,
                    color: theme.palette.text.secondary,
                    maxWidth: 640,
                    mb: 4.5,
                  }}
                >
                  {consulting.intro}
                </Typography>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={4}>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="center">
                  <Box sx={{ '& > div': { display: 'inline-flex' } }}>
                    <CalendarBooking
                      variant="button"
                      buttonProps={{ children: 'Book a discovery call' }}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    href="/contact"
                    sx={{
                      borderColor: theme.palette.border.default,
                      color: theme.palette.text.primary,
                      px: 3.5,
                      py: 1.4,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    Get in touch
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---------- THE WEDGE ---------- */}
      <Box component="section" sx={{ py: { xs: 6, md: 8 }, borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}` }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: { xs: '1.3rem', md: '1.75rem' },
              lineHeight: 1.5,
              color: theme.palette.text.primary,
              textAlign: 'center',
              maxWidth: 780,
              mx: 'auto',
            }}
          >
            &ldquo;{consulting.wedge}&rdquo;
          </Typography>
        </Container>
      </Box>

      {/* ---------- OFFERS ---------- */}
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="How we could work together"
            title="Four ways in, depending on what you need"
          />
          <Grid container spacing={4}>
            {consulting.offers.map((offer, i) => (
              <Grid item xs={12} md={6} key={offer.title}>
                <MotionBox
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i}
                  sx={{
                    height: '100%',
                    p: { xs: 3, md: 4 },
                    borderRadius: '14px',
                    border: `1px solid ${hairline}`,
                    backgroundColor: theme.palette.background.paper,
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: theme.palette.primary.main },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.85rem',
                        color: theme.palette.primary.main,
                        opacity: 0.7,
                      }}
                    >
                      {offer.no}
                    </Typography>
                    <Chip
                      label={offer.tag}
                      size="small"
                      sx={{
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme.palette.border.default}`,
                        color: theme.palette.text.secondary,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'var(--font-fraunces), Georgia, serif',
                      fontWeight: 600,
                      fontSize: '1.35rem',
                      color: theme.palette.text.primary,
                      mb: 0.75,
                    }}
                  >
                    {offer.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.78rem',
                      color: theme.palette.text.secondary,
                      mb: 2,
                      opacity: 0.85,
                    }}
                  >
                    {offer.duration}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.7, fontSize: '0.98rem' }}>
                    {offer.body}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---------- WHO THIS IS FOR ---------- */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, backgroundColor: theme.palette.background.card }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <SectionHeading eyebrow="Fit" title={consulting.icp.heading} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: theme.palette.text.secondary }}>
                {consulting.icp.body}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---------- PROOF ---------- */}
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <SectionHeading eyebrow="Track record" title={consulting.proof.heading} />
          <Grid container spacing={2}>
            {consulting.proof.points.map((point, i) => (
              <Grid item xs={12} md={6} key={point}>
                <MotionBox
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  custom={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    py: 1.5,
                    borderBottom: `1px solid ${hairline}`,
                  }}
                >
                  <Box
                    sx={{
                      mt: '9px',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.7, fontSize: '1rem' }}>
                    {point}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---------- DIFFERENTIATION ---------- */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, borderTop: `1px solid ${hairline}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <SectionHeading eyebrow="Positioning" title={consulting.differentiation.heading} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: theme.palette.text.secondary }}>
                {consulting.differentiation.body}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---------- CTA ---------- */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 14 },
          background: theme.palette.background.gradientAccent,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: { xs: '1.9rem', md: '2.5rem' },
              color: '#fff',
              mb: 2,
            }}
          >
            {consulting.cta.heading}
          </Typography>
          <Typography sx={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: 560, mx: 'auto', mb: 4, lineHeight: 1.7 }}>
            {consulting.cta.body}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
            <Box sx={{ '& > div': { display: 'inline-flex' } }}>
              <CalendarBooking
                variant="button"
                buttonProps={{ children: 'Book a discovery call' }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
