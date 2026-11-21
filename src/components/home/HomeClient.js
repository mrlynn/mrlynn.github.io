'use client';

import { Box, Container, Typography, Button, Grid, Stack, useTheme, IconButton, Divider } from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as AutoAwesomeIcon,
  PlaceOutlined as PlaceIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import Spotlight from './Spotlight';
import WorkShowcase from './WorkShowcase';
import Eyebrow from '../common/Eyebrow';
import SectionHeading from '../common/SectionHeading';
import { SECTION_RHYTHM } from '../common/Section';
import { MotionBox, fadeUp, EASE } from '../common/motion';
import { SOCIAL_LINKS } from '../../lib/navigation';

const focusAreas = [
  {
    no: '01',
    title: 'Developer Advocacy',
    body: 'Meeting developers where they are — talks, workshops, and writing that turn dense platform concepts into things people can actually build with.',
  },
  {
    no: '02',
    title: 'Data & AI Platforms',
    body: 'Fifteen years helping teams adopt modern databases and, more recently, AI-native tooling — retrieval, vector search, and agents grounded in real data.',
  },
  {
    no: '03',
    title: 'Advising & Speaking',
    body: 'Working with founders and engineering teams as an advisor, and taking the stage at conferences to share what is working and what is still hard.',
  },
];

// The project count is real (it's read from content/blog at build time); it
// used to be a hardcoded "11+" that had fallen well behind.
const buildStats = (projectCount) => [
  { number: '15+', label: 'Years in tech' },
  { number: '200+', label: 'Talks given' },
  { number: '50K+', label: 'Developers reached' },
  { number: String(projectCount), label: 'Projects shipped' },
];

function formatTalkDate(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

const reveal = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-60px' },
  variants: fadeUp,
};

export default function HomeClient({ spotlight = [], showcase = [], themes = [], projectCount = 0, talks = [] }) {
  const theme = useTheme();
  const hairline = theme.palette.border.subtle;
  const stats = buildStats(projectCount);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* ---------- HERO ---------- */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 16 },
          pb: { xs: 8, md: 12 },
          background: theme.palette.background.mesh,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={0}>
                <Eyebrow>Engineer at SpaceXAI · Developer Advocate · Advisor</Eyebrow>
              </MotionBox>

              {/* One h1 carrying both the name and what I do, so the accessible
                  name reads "Michael Lynn. I help people build with data & AI."
                  rather than the run-together "MichaelLynn". */}
              <Typography variant="h1" sx={{ m: 0 }}>
                <MotionBox
                  component="span"
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  custom={1}
                  sx={{
                    display: 'block',
                    fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '3.25rem', sm: '4.25rem', md: '5.5rem' },
                    lineHeight: 0.98,
                    letterSpacing: '-0.03em',
                    color: theme.palette.text.primary,
                    mt: 3,
                  }}
                >
                  <Box component="span" sx={{ display: 'block' }}>Michael</Box>{' '}
                  <Box component="span" sx={{ display: 'block' }}>Lynn</Box>
                </MotionBox>{' '}
                <MotionBox
                  component="span"
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  custom={2}
                  sx={{
                    display: 'block',
                    fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: { xs: '1.4rem', md: '1.7rem' },
                    lineHeight: 1.3,
                    letterSpacing: 'normal',
                    color: theme.palette.primary.main,
                    mt: 3,
                    mb: 3,
                  }}
                >
                  I help people build with data &amp; AI.
                </MotionBox>
              </Typography>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={3}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    lineHeight: 1.75,
                    color: theme.palette.text.secondary,
                    maxWidth: 540,
                    mb: 4,
                  }}
                >
                  I&apos;m an engineer at SpaceXAI, working on GTM, revenue operations,
                  and internal tools for Customer Success. For fifteen years I&apos;ve
                  turned complex ideas into clear talks, open-source projects, and
                  hands-on workshops — helping developers and teams adopt AI-driven
                  tools and modern data platforms.
                </Typography>
              </MotionBox>

              {/* Two CTAs, not three. "Book a call" lives in the header on every
                  page, and a third button here wrapped onto its own line at 390px. */}
              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={4}>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 3.5 }}>
                  <Button
                    variant="contained"
                    size="large"
                    disableElevation
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    href="/blog"
                    sx={{ px: 3.5, py: 1.4, fontWeight: 600, fontSize: '0.95rem', borderRadius: '4px' }}
                  >
                    Read the writing
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />}
                    component={Link}
                    href="/ask-ai"
                    sx={{
                      borderColor: theme.palette.border.default,
                      color: theme.palette.text.primary,
                      px: 3.5,
                      py: 1.4,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      borderRadius: '4px',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.surface.primary,
                      },
                    }}
                  >
                    Ask my AI
                  </Button>
                </Stack>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={5}>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    href={SOCIAL_LINKS.github}
                    size="small"
                    aria-label="GitHub"
                    sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    href={SOCIAL_LINKS.linkedin}
                    size="small"
                    aria-label="LinkedIn"
                    sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </MotionBox>
            </Grid>

            {/* Portrait. It used to be display:none below md, so every phone
                visitor met a personal brand site with no picture of the person. */}
            <Grid item xs={12} md={5}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                sx={{
                  position: 'relative',
                  maxWidth: { xs: 260, sm: 300, md: 380 },
                  mx: { xs: 0, md: 'auto' },
                }}
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
                    filter: 'grayscale(0.15)',
                  }}
                >
                  <Image
                    src="/images/headshot.jpg"
                    alt="Michael Lynn"
                    fill
                    sizes="(max-width: 900px) 300px, 380px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                  />
                </Box>
                <Typography
                  sx={{
                    mt: 2,
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: theme.palette.text.secondary,
                    textAlign: { xs: 'left', md: 'right' },
                  }}
                >
                  Based in the Northeast US
                </Typography>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---------- NOW SHOWING ---------- */}
      <Spotlight items={spotlight} />

      {/* ---------- STATS ---------- */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            borderBottom: `1px solid ${hairline}`,
          }}
        >
          {stats.map((stat, i) => (
            <Box
              key={stat.label}
              sx={{
                py: { xs: 3, md: 4 },
                px: 2,
                textAlign: 'center',
                borderLeft: { md: i === 0 ? 'none' : `1px solid ${hairline}` },
                borderTop: { xs: i > 1 ? `1px solid ${hairline}` : 'none', md: 'none' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  lineHeight: 1,
                  color: theme.palette.text.primary,
                  mb: 1,
                }}
              >
                {stat.number}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: theme.palette.text.secondary,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ---------- WHAT I DO ---------- */}
      <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
        <SectionHeading
          eyebrow="What I do"
          title="Turning hard problems into things people can build with."
        />
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {focusAreas.map((area, i) => (
            <Grid item xs={12} md={4} key={area.no}>
              <MotionBox {...reveal} custom={i}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.8rem',
                    color: theme.palette.primary.main,
                    mb: 2,
                    letterSpacing: '0.1em',
                  }}
                >
                  {area.no}
                </Typography>
                <Divider sx={{ mb: 2.5, borderColor: hairline }} />
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    color: theme.palette.text.primary,
                    mb: 1.5,
                  }}
                >
                  {area.title}
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.7, fontSize: '1rem' }}>
                  {area.body}
                </Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ---------- THE WORK: skyline + mosaic ---------- */}
      {showcase.length > 0 && <WorkShowcase items={showcase} themes={themes} />}

      {/* ---------- SPEAKING ---------- */}
      {talks.length > 0 && (
        <Box sx={{ borderTop: `1px solid ${hairline}`, backgroundColor: theme.palette.background.paper }}>
          <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{ mb: { xs: 4, md: 6 } }}
            >
              <SectionHeading eyebrow="On stage" title="Recent talks" sx={{ mb: 0 }} />
              <Button
                component={Link}
                href="/speaking"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  flexShrink: 0,
                  display: { xs: 'none', sm: 'inline-flex' },
                  '&:hover': { color: theme.palette.primary.main, backgroundColor: 'transparent' },
                }}
              >
                All engagements
              </Button>
            </Stack>

            <Box>
              {talks.map((talk, i) => (
                <MotionBox
                  key={talk.slug}
                  {...reveal}
                  custom={i}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '120px 1fr 1fr' },
                    gap: { xs: 0.75, md: 4 },
                    alignItems: 'baseline',
                    py: { xs: 2.5, md: 3 },
                    px: { xs: 1, md: 2 },
                    borderTop: `1px solid ${hairline}`,
                    borderBottom: i === talks.length - 1 ? `1px solid ${hairline}` : 'none',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: talk.isUpcoming ? theme.palette.primary.main : theme.palette.text.secondary,
                    }}
                  >
                    {formatTalkDate(talk.date)}
                    {talk.isUpcoming ? ' · Upcoming' : ''}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 600,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.3,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {talk.title}
                  </Typography>
                  {talk.location && (
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        color: theme.palette.text.secondary,
                        fontSize: '0.9rem',
                      }}
                    >
                      <PlaceIcon sx={{ fontSize: '1rem', flexShrink: 0 }} />
                      {talk.venue || talk.location}
                    </Typography>
                  )}
                </MotionBox>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* ---------- CLOSING CTA ----------
          This used to be a raw Google Calendar appointment iframe: Google's blue
          buttons, Google Sans pulled in as a fourth font family, and the name
          rendered as a truncated "Mich… Lynn" — the last thing every visitor saw.
          The scheduler now lives on /contact, where someone arrives having
          decided to book. */}
      <Box sx={{ borderTop: `1px solid ${hairline}` }}>
        <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.loose }}>
          <MotionBox
            {...reveal}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              justifyContent: 'space-between',
              gap: { xs: 3, md: 6 },
            }}
          >
            <Box sx={{ maxWidth: 620 }}>
              <Box sx={{ mb: 2.5 }}>
                <Eyebrow>Let&apos;s talk</Eyebrow>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.015em',
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                Have something to build or discuss?
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.7, color: theme.palette.text.secondary }}>
                Book a time and we can dig into your project, a collaboration, or
                whatever&apos;s on your mind.
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              disableElevation
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4, py: 1.6, fontWeight: 600, fontSize: '1rem', borderRadius: '4px', flexShrink: 0 }}
            >
              Book a call
            </Button>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}
