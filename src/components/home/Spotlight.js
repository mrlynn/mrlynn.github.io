'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, IconButton, Stack, Typography, useTheme } from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Pause as PauseIcon,
  PlayArrow as PlayIcon,
  NorthEast as NorthEastIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import Eyebrow from '../common/Eyebrow';
import { EASE } from '../common/motion';

const SLIDE_MS = 8000;
const pad = (n) => String(n).padStart(2, '0');

/**
 * "Now showing": a reel of the featured projects.
 *
 * Each slide holds the stage for eight seconds, then hands off. The reel stops
 * whenever someone is reading it (pointer over it, keyboard focus inside it),
 * when it scrolls out of view, when the tab is hidden, and never starts for
 * people who ask for reduced motion. The stage takes on each project's own
 * colour from its frontmatter, so the section changes mood as it turns.
 */
export default function Spotlight({ items = [] }) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme.palette.mode === 'dark';
  const hairline = theme.palette.border.subtle;

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef(null);
  const progress = useMotionValue(0);

  const count = items.length;
  const active = items[index] || items[0];
  const accent = active?.color || theme.palette.primary.main;
  const playing = !reduceMotion && !userPaused && !hovering && !focused && inView && count > 1;

  const go = useCallback(
    (next) => {
      progress.set(0);
      setIndex(((next % count) + count) % count);
    },
    [count, progress]
  );

  // Off-screen, the reel waits where it is.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // One clock drives both the progress bar and the hand-off.
  useEffect(() => {
    if (!playing) return undefined;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      if (document.hidden) {
        last = now;
      } else {
        const p = progress.get() + (now - last) / SLIDE_MS;
        last = now;
        if (p >= 1) {
          go(index + 1);
          return;
        }
        progress.set(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, index, go, progress]);

  // A gentle tilt toward the pointer, so the screen feels like an object.
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-5, 5]);
  const glareX = useTransform(tiltX, [-0.5, 0.5], [-30, 30]);
  const onPointerMove = (e) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width - 0.5);
    tiltY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  if (!count) return null;

  const enter = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      };

  return (
    <Box
      component="section"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      ref={sectionRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${hairline}`,
        borderBottom: `1px solid ${hairline}`,
        isolation: 'isolate',
      }}
    >
      {/* The stage light: a wash of the active project's colour. */}
      <motion.div
        aria-hidden
        animate={{ backgroundColor: accent }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          position: 'absolute',
          zIndex: -1,
          right: '-10%',
          top: '8%',
          width: '70%',
          height: '80%',
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: isDark ? 0.28 : 0.2,
        }}
      />
      {/* Fine grid, like a cutting mat, so the light has something to fall on. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundImage: `linear-gradient(${hairline} 1px, transparent 1px), linear-gradient(90deg, ${hairline} 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 70% 45%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 45%, #000 20%, transparent 75%)',
          opacity: 0.6,
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Header rail */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: { xs: 3.5, md: 5 } }}>
          <Eyebrow>Now showing</Eyebrow>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              aria-live="polite"
              sx={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: theme.palette.text.secondary,
              }}
            >
              <Box component="span" sx={{ color: theme.palette.text.primary }}>
                {pad(index + 1)}
              </Box>{' '}
              / {pad(count)}
            </Typography>
            {!reduceMotion && count > 1 && (
              <IconButton
                size="small"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Play the reel' : 'Pause the reel'}
                sx={{ border: `1px solid ${theme.palette.border.default}`, width: 30, height: 30 }}
              >
                {userPaused ? <PlayIcon sx={{ fontSize: 16 }} /> : <PauseIcon sx={{ fontSize: 16 }} />}
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Box
          id="spotlight-panel"
          role="tabpanel"
          aria-label={active.name}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 4, md: 7 },
            alignItems: 'center',
          }}
        >
          {/* Copy */}
          <Box sx={{ order: { xs: 2, md: 1 }, minHeight: { md: 380 }, display: 'flex', alignItems: 'center' }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                {...enter}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ width: '100%' }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
                  {active.icon ? (
                    <Image src={active.icon} alt="" width={40} height={40} style={{ borderRadius: 10 }} />
                  ) : (
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: accent }} />
                  )}
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.72rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {active.featured ? 'Featured' : 'Recent'} · {active.year}
                  </Typography>
                </Stack>

                <Typography
                  component="h2"
                  sx={{
                    fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.25rem' },
                    lineHeight: 0.95,
                    letterSpacing: '-0.035em',
                    color: theme.palette.text.primary,
                    mb: 2,
                  }}
                >
                  {active.name}
                </Typography>
                {active.tagline && (
                  <Typography
                    sx={{
                      fontSize: { xs: '1.15rem', md: '1.3rem' },
                      lineHeight: 1.35,
                      color: theme.palette.text.primary,
                      opacity: 0.85,
                      mb: 2,
                      maxWidth: 460,
                    }}
                  >
                    {active.tagline}
                  </Typography>
                )}
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    mb: 3.5,
                    maxWidth: 460,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {active.description}
                </Typography>
                <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
                  <Button
                    variant="contained"
                    disableElevation
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    href={active.href}
                    sx={{ px: 2.75, fontWeight: 600, fontSize: '0.88rem', borderRadius: '4px', whiteSpace: 'nowrap' }}
                  >
                    Read the story
                  </Button>
                  {active.demoUrl && (
                    <Button
                      variant="outlined"
                      href={active.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<NorthEastIcon sx={{ fontSize: '0.95rem !important' }} />}
                      sx={{
                        borderColor: theme.palette.border.default,
                        color: theme.palette.text.primary,
                        px: 2.5,
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.surface.primary },
                      }}
                    >
                      Try it
                    </Button>
                  )}
                </Stack>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Screen */}
          <Box
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            sx={{ order: { xs: 1, md: 2 }, perspective: '1400px' }}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
              <Box
                component={Link}
                href={active.href}
                tabIndex={-1}
                aria-hidden
                sx={{
                  position: 'relative',
                  display: 'block',
                  aspectRatio: '16 / 10',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#0e0f0d',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isDark
                    ? '0 40px 80px -30px rgba(0,0,0,0.8), 0 0 0 6px #1b1c19'
                    : '0 40px 80px -30px rgba(19,21,18,0.45), 0 0 0 6px #1d1c1a',
                }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    {active.loop && !reduceMotion ? (
                      <video
                        src={active.loop}
                        poster={active.poster || active.image || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      active.image && (
                        <Image
                          src={active.poster || active.image}
                          alt=""
                          fill
                          sizes="(max-width: 900px) 100vw, 680px"
                          priority={index === 0}
                          style={{ objectFit: 'cover' }}
                        />
                      )
                    )}
                  </motion.div>
                </AnimatePresence>
                {/* Glass glare that moves against the tilt. */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background:
                        'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 38%)',
                      x: glareX,
                    }}
                  />
                )}
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* Filmstrip: the index, the progress, and the controls in one row. */}
        <Box
          role="tablist"
          aria-label="Choose a project"
          sx={{
            mt: { xs: 4, md: 6 },
            display: 'grid',
            gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
            gap: { xs: 1, md: 2 },
          }}
        >
          {items.map((item, i) => {
            const selected = i === index;
            const color = item.color || theme.palette.primary.main;
            return (
              <Box
                key={item.slug}
                component="button"
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="spotlight-panel"
                aria-label={`${item.name}, ${i + 1} of ${count}`}
                onClick={() => go(i)}
                sx={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'block',
                  minWidth: 0,
                  '&:focus-visible .thumb': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
                  '&:hover .thumb': { opacity: 1 },
                }}
              >
                {/* Progress track */}
                <Box sx={{ position: 'relative', height: 2, backgroundColor: theme.palette.border.default, mb: 1.5, overflow: 'hidden' }}>
                  {selected ? (
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: color,
                        transformOrigin: '0 50%',
                        scaleX: reduceMotion || count < 2 ? 1 : progress,
                      }}
                    />
                  ) : (
                    i < index && <Box sx={{ position: 'absolute', inset: 0, backgroundColor: theme.palette.text.secondary, opacity: 0.35 }} />
                  )}
                </Box>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Box
                    className="thumb"
                    sx={{
                      position: 'relative',
                      flexShrink: 0,
                      width: { xs: '100%', md: 64 },
                      aspectRatio: '16 / 10',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      opacity: selected ? 1 : 0.55,
                      filter: selected ? 'none' : 'grayscale(0.6)',
                      transition: 'opacity 0.3s ease, filter 0.3s ease',
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    {item.image && <Image src={item.image} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} />}
                  </Box>
                  <Box sx={{ minWidth: 0, display: { xs: 'none', md: 'block' } }}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {pad(i + 1)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
