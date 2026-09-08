'use client';

import { Box, Chip, Stack } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Lock as LockIcon } from '@mui/icons-material';
import ContentCard from '../common/ContentCard';

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

  const badge = isPrivate ? (
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
  ) : null;

  // Private projects still carry demoUrl/githubUrl in frontmatter, but they
  // point at internal repos and gated apps. Advertising "Live" and "Source" on
  // a card badged Private promises access that isn't there.
  const footer =
    !isPrivate && (demoUrl || githubUrl) ? (
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
            <LaunchIcon sx={{ fontSize: '0.85rem' }} /> Live
          </Box>
        )}
        {githubUrl && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GitHubIcon sx={{ fontSize: '0.85rem' }} /> Source
          </Box>
        )}
      </Stack>
    ) : null;

  return (
    // Projects live at /projects/<slug>. An earlier shared card sent every
    // project to /blog/<slug> instead — the non-canonical copy.
    <ContentCard
      href={`/projects/${slug}`}
      image={image}
      imageBadge={badge}
      title={title}
      description={description}
      chips={stack}
      footer={footer}
    />
  );
}
