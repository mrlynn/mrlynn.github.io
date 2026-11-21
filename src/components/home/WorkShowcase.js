'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { SECTION_RHYTHM } from '../common/Section';
import { EASE } from '../common/motion';

const MOSAIC_LIMIT = 10;

// Column and row spans for the first ten tiles. With grid-auto-flow: dense
// this packs exactly into a 4 x 4 block at desktop width.
const SPANS = [
  [2, 2], [1, 1], [1, 1], [1, 2], [2, 1],
  [1, 1], [1, 1], [2, 1], [1, 1], [1, 1],
];

const mono = {
  fontFamily: 'var(--font-mono), monospace',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

function shortDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Everything, at a glance, then up close.
 *
 * The skyline draws every project and essay as a tile, stacked by year, so the
 * volume of work reads before any single title does. The filter chips drive
 * both views at once: the skyline dims what's out of scope, and the mosaic
 * below reflows to the newest ten that match.
 */
export default function WorkShowcase({ items = [], themes = [] }) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const hairline = theme.palette.border.subtle;
  const [filter, setFilter] = useState('all');

  const matches = (item) => filter === 'all' || item.themes.includes(filter);

  const counts = useMemo(() => {
    const c = { all: items.length };
    for (const t of themes) if (t.key !== 'all') c[t.key] = items.filter((i) => i.themes.includes(t.key)).length;
    return c;
  }, [items, themes]);

  // Oldest first within a year, so each column builds upward through time.
  const years = useMemo(() => {
    const byYear = new Map();
    for (const item of items) {
      if (!item.year) continue;
      if (!byYear.has(item.year)) byYear.set(item.year, []);
      byYear.get(item.year).push(item);
    }
    return [...byYear.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([year, list]) => [year, [...list].sort((a, b) => String(a.date).localeCompare(String(b.date)))]);
  }, [items]);

  const firstYear = years[0]?.[0];
  const projectCount = items.filter((i) => i.type === 'project').length;
  const essayCount = items.length - projectCount;
  const shown = items.filter(matches).slice(0, MOSAIC_LIMIT);

  return (
    <Box component="section" sx={{ borderTop: `1px solid ${hairline}`, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
        <SectionHeading
          eyebrow="The work"
          title={`${projectCount} projects and ${essayCount} essays since ${firstYear}.`}
          intro="Every tile below is one of them, stacked by the year it shipped. Open any one of them, or pick a thread to follow."
        />

        {/* ---------- SKYLINE ---------- */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: { xs: 1.5, md: 3 },
              // Headroom for the peek cards, which only appear with a pointer.
              pt: { xs: 0, md: 12 },
            }}
          >
            {years.map(([year, list], col) => {
              const align = col === 0 ? 'left' : col === years.length - 1 ? 'right' : 'center';
              const lit = list.filter(matches).length;
              return (
                <Box key={year} sx={{ flex: { md: '1 1 0' }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap-reverse',
                      alignContent: 'flex-start',
                      justifyContent: 'flex-start',
                      gap: { xs: '4px', md: '5px' },
                      // Four tiles a row on desktop, two on phones so every
                      // year fits across the screen without scrolling.
                      width: { xs: 2 * 24 + 4, md: 4 * 38 + 3 * 5 },
                    }}
                  >
                    {list.map((item) => (
                      <SkylineTile key={item.slug} item={item} dim={!matches(item)} align={align} />
                    ))}
                  </Box>
                  <Box sx={{ width: '100%', borderTop: `1px solid ${theme.palette.border.default}`, mt: 1.5, pt: 1.25, textAlign: 'center' }}>
                    <Typography sx={{ ...mono, fontSize: '0.75rem', color: theme.palette.text.primary }}>{year}</Typography>
                    <Typography sx={{ ...mono, fontSize: '0.62rem', color: theme.palette.text.secondary }}>
                      {filter === 'all' ? list.length : `${lit} / ${list.length}`}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Stack direction="row" spacing={3} sx={{ mt: 2.5, mb: { xs: 5, md: 7 } }}>
          <Legend swatch={<Box sx={{ width: 10, height: 10, borderRadius: '2px', backgroundColor: theme.palette.primary.main }} />}>
            Project
          </Legend>
          <Legend
            swatch={<Box sx={{ width: 10, height: 10, borderRadius: '2px', backgroundColor: theme.palette.text.secondary, opacity: 0.6 }} />}
          >
            Essay
          </Legend>
        </Stack>

        {/* ---------- FILTERS ---------- */}
        <Stack
          direction="row"
          flexWrap="wrap"
          useFlexGap
          gap={1}
          role="group"
          aria-label="Filter the work"
          sx={{ mb: 3 }}
        >
          {themes.map((t) => {
            const on = filter === t.key;
            return (
              <Box
                key={t.key}
                component="button"
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(t.key)}
                sx={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.75,
                  py: 0.9,
                  borderRadius: 999,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  border: `1px solid ${on ? theme.palette.text.primary : theme.palette.border.default}`,
                  backgroundColor: on ? theme.palette.text.primary : 'transparent',
                  color: on ? theme.palette.background.paper : theme.palette.text.primary,
                  transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                  '&:hover': { borderColor: theme.palette.text.primary },
                  '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
                }}
              >
                {t.label}
                <Box component="span" sx={{ ...mono, fontSize: '0.65rem', letterSpacing: '0.05em', opacity: 0.6 }}>
                  {counts[t.key]}
                </Box>
              </Box>
            );
          })}
        </Stack>

        {/* ---------- MOSAIC ---------- */}
        <LayoutGroup>
          <Box
            component={motion.div}
            layout={!reduceMotion}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gridAutoRows: { xs: 240, md: 210 },
              gridAutoFlow: 'dense',
              gap: { xs: 1.5, md: 2 },
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((item, i) => (
                <MosaicTile key={item.slug} item={item} span={SPANS[i] || [1, 1]} reduceMotion={reduceMotion} />
              ))}
            </AnimatePresence>
          </Box>
        </LayoutGroup>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
          <Button
            component={Link}
            href="/projects"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: theme.palette.border.default,
              color: theme.palette.text.primary,
              fontWeight: 600,
              borderRadius: '4px',
              '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.surface.primary },
            }}
          >
            All {projectCount} projects
          </Button>
          <Button
            component={Link}
            href="/blog"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: theme.palette.border.default,
              color: theme.palette.text.primary,
              fontWeight: 600,
              borderRadius: '4px',
              '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.surface.primary },
            }}
          >
            All the writing
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

function Legend({ swatch, children }) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {swatch}
      <Typography sx={{ ...mono, fontSize: '0.62rem', color: theme.palette.text.secondary }}>{children}</Typography>
    </Stack>
  );
}

function SkylineTile({ item, dim, align }) {
  const theme = useTheme();
  const isProject = item.type === 'project';
  const color = item.color || theme.palette.primary.main;
  const tipPos =
    align === 'left' ? { left: 0 } : align === 'right' ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' };

  return (
    <Box
      component={Link}
      href={item.href}
      aria-label={`${item.title} (${isProject ? 'project' : 'essay'}, ${shortDate(item.date)})`}
      sx={{
        position: 'relative',
        display: 'block',
        width: { xs: 24, md: 38 },
        height: { xs: 24, md: 38 },
        flexShrink: 0,
        zIndex: 1,
        '&:hover, &:focus-visible': { zIndex: 5, outline: 'none' },
        '&:hover .face, &:focus-visible .face': {
          transform: 'scale(1.55)',
          filter: 'none',
          opacity: 1,
          boxShadow: `0 8px 24px -6px rgba(0,0,0,0.5), 0 0 0 2px ${color}`,
        },
        '&:hover .tip, &:focus-visible .tip': { opacity: 1, visibility: 'visible', translate: '0 0' },
      }}
    >
      <Box
        className="face"
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: isProject ? color : theme.palette.background.default,
          boxShadow: isProject ? `inset 0 0 0 1.5px ${color}` : `inset 0 0 0 1px ${theme.palette.border.default}`,
          filter: dim ? 'grayscale(1)' : isProject ? 'none' : 'grayscale(1) contrast(0.9)',
          opacity: dim ? 0.14 : isProject ? 1 : 0.7,
          transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, filter 0.35s ease, box-shadow 0.25s ease',
        }}
      >
        {item.image && (
          <Image src={item.image} alt="" fill sizes="60px" style={{ objectFit: 'cover', opacity: isProject ? 0.92 : 1 }} />
        )}
      </Box>

      {/* Peek card */}
      <Box
        className="tip"
        role="presentation"
        sx={{
          position: 'absolute',
          bottom: 'calc(100% + 22px)',
          ...tipPos,
          width: 240,
          p: 1.25,
          borderRadius: '6px',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.border.default}`,
          boxShadow: '0 18px 40px -12px rgba(0,0,0,0.45)',
          opacity: 0,
          visibility: 'hidden',
          translate: '0 6px',
          transition: 'opacity 0.2s ease, translate 0.2s ease, visibility 0.2s',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '4px', overflow: 'hidden', mb: 1, backgroundColor: theme.palette.background.default }}>
          {item.image && <Image src={item.image} alt="" fill sizes="240px" style={{ objectFit: 'cover' }} />}
        </Box>
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.5 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isProject ? color : theme.palette.text.secondary }} />
          <Typography sx={{ ...mono, fontSize: '0.6rem', color: theme.palette.text.secondary }}>
            {isProject ? 'Project' : 'Essay'} · {shortDate(item.date)}
          </Typography>
        </Stack>
        <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.3, color: theme.palette.text.primary }}>
          {item.title}
        </Typography>
      </Box>
    </Box>
  );
}

function MosaicTile({ item, span, reduceMotion }) {
  const theme = useTheme();
  const [cols, rows] = span;
  const big = cols * rows >= 4;
  const wide = cols >= 2 || rows >= 2;
  const isProject = item.type === 'project';
  const color = item.color || theme.palette.primary.main;

  return (
    <Box
      component={motion.div}
      layout={!reduceMotion}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EASE }}
      sx={{
        gridColumn: { xs: 'span 1', sm: `span ${Math.min(cols, 2)}`, md: `span ${cols}` },
        gridRow: { xs: big ? 'span 2' : 'span 1', md: `span ${rows}` },
        minWidth: 0,
      }}
    >
      <Box
        component={Link}
        href={item.href}
        sx={{
          position: 'relative',
          display: 'block',
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          textDecoration: 'none',
          backgroundColor: '#0e0f0d',
          isolation: 'isolate',
          '&:hover .img, &:focus-visible .img': { transform: reduceMotion ? 'none' : 'scale(1.05)' },
          '&:hover .bar, &:focus-visible .bar': { transform: 'scaleX(1)' },
          '&:hover .more, &:focus-visible .more': { opacity: 1, transform: 'translateX(0)' },
          '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
        }}
      >
        {item.image && (
          <Box className="img" sx={{ position: 'absolute', inset: 0, transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
            <Image
              src={item.image}
              alt=""
              fill
              sizes={big ? '(max-width: 900px) 100vw, 600px' : '(max-width: 900px) 50vw, 300px'}
              style={{ objectFit: 'cover', filter: isProject ? 'none' : 'saturate(0.75)' }}
            />
          </Box>
        )}
        {/* Scrim for the caption */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,11,9,0) 35%, rgba(10,11,9,0.55) 62%, rgba(10,11,9,0.92) 100%)',
          }}
        />
        {/* Project colour bar, drawn in on hover */}
        <Box
          className="bar"
          aria-hidden
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: isProject ? color : theme.palette.primary.main,
            transform: 'scaleX(0)',
            transformOrigin: '0 50%',
            transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1,
            py: 0.4,
            borderRadius: '3px',
            backgroundColor: 'rgba(10,11,9,0.66)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isProject ? color : '#c9c7bd' }} />
          <Typography sx={{ ...mono, fontSize: '0.6rem', color: '#efeee8' }}>
            {isProject ? 'Project' : 'Essay'} · {item.year}
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: { xs: 2, md: big ? 3 : 2 } }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#f5f5f0',
              fontSize: big ? { xs: '1.5rem', md: '2rem' } : wide ? '1.15rem' : '1rem',
              lineHeight: 1.15,
              letterSpacing: big ? '-0.02em' : 'normal',
              display: '-webkit-box',
              WebkitLineClamp: big ? 3 : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {isProject ? item.name : item.title}
          </Typography>
          {(big || (wide && isProject)) && (item.tagline || item.description) && (
            <Typography
              sx={{
                mt: 1,
                color: 'rgba(245,245,240,0.75)',
                fontSize: big ? '0.98rem' : '0.85rem',
                lineHeight: 1.5,
                maxWidth: 520,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.tagline || item.description}
            </Typography>
          )}
          <Box
            className="more"
            sx={{
              ...mono,
              mt: 1.25,
              fontSize: '0.62rem',
              color: isProject ? '#f5f5f0' : '#e8c547',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              opacity: 0,
              transform: 'translateX(-6px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {isProject ? 'See the project' : 'Read it'} <ArrowForwardIcon sx={{ fontSize: '0.8rem' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
