'use client';

import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Lock as LockIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { CARD_IMAGE_SIZES } from '../blog/BlogCard';

// Kept in step with BlogCard's thumbnail: a fixed ratio so titles share a
// baseline across a row, and the same grid, so the same `sizes`.
const ThumbFrame = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

const MAX_VISIBLE_TECH = 4;

export default function ProjectCard({ project }) {
  const {
    slug,
    title,
    description,
    image,
    technologies = [],
    tags = [],
    demoUrl,
    githubUrl,
    isPrivate,
  } = project;

  // Projects carry both `technologies` (the real stack) and `tags` (looser
  // keywords). The stack is the more useful thing on a card; fall back to tags
  // for the handful of projects that predate the field.
  const stack = technologies.length ? technologies : tags;
  const visibleStack = stack.slice(0, MAX_VISIBLE_TECH);
  const overflowCount = stack.length - visibleStack.length;

  return (
    // Projects live at /projects/<slug>. The shared card this replaced sent
    // every project card to /blog/<slug> instead — the non-canonical copy.
    <Link
      href={`/projects/${slug}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <StyledCard>
        <Box sx={{ position: 'relative' }}>
          {image && (
            <ThumbFrame>
              <Image
                src={image}
                alt=""
                fill
                sizes={CARD_IMAGE_SIZES}
                style={{ objectFit: 'cover' }}
              />
            </ThumbFrame>
          )}
          {isPrivate && (
            <Chip
              icon={<LockIcon sx={{ fontSize: '0.8rem' }} />}
              label="Private"
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.65rem',
                backgroundColor: 'rgba(0,0,0,0.72)',
                color: '#fff',
                '& .MuiChip-icon': { color: '#fff' },
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: '1.25rem',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              mb: 1.5,
            }}
          >
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
            {description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1.5 }}>
            {visibleStack.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                variant="outlined"
                sx={{
                  backgroundColor: 'transparent',
                  borderColor: 'border.default',
                  color: 'text.secondary',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.68rem',
                }}
              />
            ))}
            {overflowCount > 0 && (
              <Typography
                component="span"
                sx={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.68rem',
                  color: 'text.secondary',
                  alignSelf: 'center',
                }}
              >
                +{overflowCount}
              </Typography>
            )}
          </Box>

          {/* Private projects still carry demoUrl/githubUrl in frontmatter, but
              they point at internal repos and gated apps. Advertising "Live" and
              "Source" on a card badged Private promises access that isn't there. */}
          {!isPrivate && (demoUrl || githubUrl) && (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.7rem',
                color: 'text.secondary',
              }}
            >
              {demoUrl && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LaunchIcon sx={{ fontSize: '0.85rem' }} />
                  Live
                </Box>
              )}
              {githubUrl && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <GitHubIcon sx={{ fontSize: '0.85rem' }} />
                  Source
                </Box>
              )}
            </Stack>
          )}
        </CardContent>
      </StyledCard>
    </Link>
  );
}
