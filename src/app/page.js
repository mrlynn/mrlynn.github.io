'use client';

import { Box, Container, Typography, Button, Grid, Stack, useTheme, IconButton, Divider } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, ArrowForward as ArrowForwardIcon, AutoAwesome as AutoAwesomeIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectsSection from '../components/ProjectsSection';
import VideosSection from '../components/VideosSection';
import GitHubActivity from '../components/GitHubActivity';
import Certifications from '../components/Certifications';
import CalendarBooking from '../components/CalendarBooking';
import TalkToMyAI from '../components/TalkToMyAI';
import Image from 'next/image';
import Link from 'next/link';

const MotionBox = motion.create(Box);

// Areas of focus — editorial prose instead of code snippets
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

const stats = [
  { number: '15+', label: 'Years in tech' },
  { number: '200+', label: 'Talks given' },
  { number: '50K+', label: 'Developers reached' },
  { number: '11+', label: 'Open projects' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Small mono eyebrow used across sections
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
          lineHeight: 1.1,
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
            maxWidth: 620,
            mx: align === 'center' ? 'auto' : 0,
          }}
        >
          {intro}
        </Typography>
      )}
    </Box>
  );
}

function formatDate(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function Home() {
  const theme = useTheme();
  const ref = useRef(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((all) => {
        const articles = Array.isArray(all) ? all.filter((p) => p.category !== 'project') : [];
        setPosts(articles.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  const hairline = theme.palette.border.subtle;

  return (
    <Box ref={ref} sx={{ backgroundColor: theme.palette.background.default }}>
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
            <Grid item xs={12} md={7}>
              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={0}>
                <Eyebrow>AI Adoption Engineer · Developer Advocate · Advisor</Eyebrow>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={1}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontWeight: 600,
                    fontSize: { xs: '3.25rem', sm: '4.25rem', md: '5.5rem' },
                    lineHeight: 0.98,
                    letterSpacing: '-0.03em',
                    color: theme.palette.text.primary,
                    mt: 3,
                    mb: 0,
                  }}
                >
                  Michael
                  <br />
                  Lynn
                </Typography>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={2}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: { xs: '1.4rem', md: '1.7rem' },
                    color: theme.palette.primary.main,
                    mt: 3,
                    mb: 3,
                  }}
                >
                  I help people build with data &amp; AI.
                </Typography>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={3}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    lineHeight: 1.75,
                    color: theme.palette.text.secondary,
                    maxWidth: 540,
                    mb: 4.5,
                  }}
                >
                  I&apos;m an AI Adoption Engineer at Cursor. For fifteen years I&apos;ve
                  turned complex ideas into clear talks, open-source projects, and
                  hands-on workshops — helping developers and teams adopt AI-driven
                  tools and modern data platforms.
                </Typography>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={4}>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="center" sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    href="/blog"
                    disableElevation
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: '#fff',
                      px: 3.5,
                      py: 1.4,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      borderRadius: '8px',
                      '&:hover': { backgroundColor: theme.palette.primary.dark },
                    }}
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
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.surface.primary,
                      },
                    }}
                  >
                    Ask my AI
                  </Button>
                  <CalendarBooking
                    variant="button"
                    buttonProps={{
                      variant: 'text',
                      size: 'large',
                      children: 'Book a call',
                      sx: {
                        color: theme.palette.text.secondary,
                        px: 1,
                        py: 1.4,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        '&:hover': { color: theme.palette.primary.main, backgroundColor: 'transparent' },
                      },
                    }}
                  />
                </Stack>
              </MotionBox>

              <MotionBox initial="hidden" animate="show" variants={fadeUp} custom={5}>
                <Stack direction="row" spacing={1}>
                  <IconButton href="https://github.com/mrlynn" size="small" aria-label="GitHub"
                    sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}>
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                  <IconButton href="https://linkedin.com/in/mlynn" size="small" aria-label="LinkedIn"
                    sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}>
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </MotionBox>
            </Grid>

            {/* Portrait — editorial framed treatment */}
            <Grid item xs={12} md={5}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                sx={{
                  position: 'relative',
                  maxWidth: 380,
                  mx: 'auto',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {/* offset accent block */}
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
                    textAlign: 'right',
                  }}
                >
                  Based in the Northeast US
                </Typography>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---------- STATS STRIP ---------- */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            borderTop: `1px solid ${hairline}`,
            borderBottom: `1px solid ${hairline}`,
          }}
        >
          {stats.map((s, i) => (
            <Box
              key={s.label}
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
                  fontFamily: 'var(--font-fraunces), Georgia, serif',
                  fontWeight: 600,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  lineHeight: 1,
                  color: theme.palette.text.primary,
                  mb: 1,
                }}
              >
                {s.number}
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
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ---------- FOCUS AREAS ---------- */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <SectionHeading
          eyebrow="What I do"
          title="Turning hard problems into things people can build with."
        />
        <Grid container spacing={{ xs: 5, md: 6 }}>
          {focusAreas.map((area, i) => (
            <Grid item xs={12} md={4} key={area.no}>
              <MotionBox
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={i}
              >
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
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
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

      {/* ---------- LATEST WRITING ---------- */}
      {posts.length > 0 && (
        <Box sx={{ borderTop: `1px solid ${hairline}`, backgroundColor: theme.palette.background.paper }}>
          <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: { xs: 5, md: 7 } }}>
              <Box>
                <Box sx={{ mb: 2.5 }}><Eyebrow>From the journal</Eyebrow></Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontWeight: 600,
                    fontSize: { xs: '2rem', md: '2.75rem' },
                    color: theme.palette.text.primary,
                    letterSpacing: '-0.015em',
                  }}
                >
                  Latest writing
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/blog"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: theme.palette.text.primary, fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' }, '&:hover': { color: theme.palette.primary.main, backgroundColor: 'transparent' } }}
              >
                All posts
              </Button>
            </Stack>

            <Box>
              {posts.map((post, i) => (
                <MotionBox
                  key={post.slug || i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i}
                  component={Link}
                  href={`/blog/${post.slug}`}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '160px 1fr auto' },
                    gap: { xs: 1, md: 4 },
                    alignItems: 'baseline',
                    py: { xs: 3, md: 4 },
                    borderTop: `1px solid ${hairline}`,
                    borderBottom: i === posts.length - 1 ? `1px solid ${hairline}` : 'none',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    '&:hover': { backgroundColor: theme.palette.surface.primary },
                    '&:hover .post-title': { color: theme.palette.primary.main },
                    px: { xs: 1, md: 2 },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {formatDate(post.date || post.publishedAt || post.createdAt)}
                  </Typography>
                  <Box>
                    <Typography
                      className="post-title"
                      sx={{
                        fontFamily: 'var(--font-fraunces), Georgia, serif',
                        fontWeight: 600,
                        fontSize: { xs: '1.35rem', md: '1.6rem' },
                        lineHeight: 1.2,
                        color: theme.palette.text.primary,
                        mb: 1,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {post.title}
                    </Typography>
                    {post.excerpt && (
                      <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.6, fontSize: '0.98rem', maxWidth: 620 }}>
                        {post.excerpt}
                      </Typography>
                    )}
                  </Box>
                  <ArrowForwardIcon sx={{ color: theme.palette.text.secondary, display: { xs: 'none', md: 'block' }, fontSize: '1.2rem' }} />
                </MotionBox>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* ---------- SELECTED WORK ---------- */}
      <Box sx={{ borderTop: `1px solid ${hairline}`, backgroundColor: theme.palette.background.paper }}>
        <ProjectsSection />
      </Box>

      {/* ---------- CERTIFICATIONS ---------- */}
      <Certifications />

      {/* ---------- ASK AI TEASER ---------- */}
      <Box sx={{ borderTop: `1px solid ${hairline}`, py: { xs: 10, md: 12 } }}>
        <Container maxWidth="sm">
          <TalkToMyAI variant="teaser" />
        </Container>
      </Box>

      {/* ---------- GITHUB + VIDEOS ---------- */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <GitHubActivity />
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <VideosSection />
        </Box>
      </Container>

      {/* ---------- SCHEDULE ---------- */}
      <Box sx={{ borderTop: `1px solid ${hairline}`, backgroundColor: theme.palette.background.paper, py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <SectionHeading
            align="center"
            eyebrow="Let's talk"
            title="Have something to build or discuss?"
            intro="Book a time and we can dig into your project, a collaboration, or whatever's on your mind."
          />
          <Box sx={{ maxWidth: 900, mx: 'auto', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${hairline}`, boxShadow: theme.shadows[4] }}>
            <CalendarBooking variant="iframe" />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
