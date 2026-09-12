'use client';

import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';
import ShareButton from '../ShareButton';
import AskArticleDock from './AskArticleDock';

/**
 * The article template.
 *
 * The title used to sit in white type over a 60vh cover image behind a fixed
 * rgba(0,0,0,0.5)->0.7 scrim. That works for a dark photograph and fails for
 * the light UI screenshots most posts here use — /blog/introducing-lancescope
 * rendered a title and standfirst you had to squint at. Rather than tune the
 * scrim per image, the title sits on the page where every other title on the
 * site does, and the cover image follows it.
 *
 * Body copy is held to about 70 rendered characters a line. It was running
 * ~106 inside the old maxWidth="md" container. The value is in ch so it tracks
 * the font size, but note Inter's "0" is wider than its average glyph, so 58ch
 * measures out at roughly 70 real characters, not 58.
 */
const MEASURE = '58ch';
const HEADER_MEASURE = 860;
const BODY_SIZE = '1.0625rem';

export function BlogLayout({
  children,
  title,
  description,
  image,
  date,
  author,
  demoUrl,
  githubUrl,
  slug,
  enableAskArticle = false,
  askSuggestedQuestions,
}) {
  const theme = useTheme();

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Box component="article">
      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 8 } }}>
        <Box sx={{ maxWidth: HEADER_MEASURE, mx: 'auto' }}>
          <Typography
            component="p"
            sx={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: theme.palette.primary.main,
              mb: 2.5,
            }}
          >
            {[formattedDate, author].filter(Boolean).join(' · ')}
          </Typography>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.25rem' },
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: theme.palette.text.primary,
              mb: description ? 2.5 : 0,
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              component="p"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
                color: theme.palette.text.secondary,
                maxWidth: MEASURE,
              }}
            >
              {description}
            </Typography>
          )}

          {/* Actions */}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${theme.palette.border.subtle}`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            {demoUrl && (
              <Button
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LaunchIcon />}
                variant="contained"
                disableElevation
                size="small"
                sx={{ borderRadius: '8px', fontWeight: 600 }}
              >
                Live demo
              </Button>
            )}
            {githubUrl && (
              <Button
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '8px',
                  fontWeight: 600,
                  borderColor: theme.palette.border.default,
                  color: theme.palette.text.primary,
                  '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: 'transparent' },
                }}
              >
                View source
              </Button>
            )}
            <Box sx={{ ml: 'auto' }}>
              <ShareButton
                title={title}
                url={typeof window !== 'undefined' ? window.location.href : ''}
                description={description}
              />
            </Box>
          </Box>

          {image && (
            <Box
              sx={{
                mt: { xs: 4, md: 5 },
                position: 'relative',
                aspectRatio: '16 / 9',
                borderRadius: '10px',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.border.subtle}`,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 860px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
            </Box>
          )}
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: MEASURE,
            mx: 'auto',
            // ch resolves against this element's own font size, so the measure
            // stays right if the body size changes.
            fontSize: BODY_SIZE,
            py: { xs: 6, md: 8 },
            pb: enableAskArticle ? { xs: 14, md: 16 } : { xs: 6, md: 8 },
            '& .MuiTypography-body1': { fontSize: BODY_SIZE, lineHeight: 1.75 },
            // Wide content has to scroll inside itself rather than push the
            // column out of shape.
            '& pre, & table': { maxWidth: '100%', overflowX: 'auto' },
          }}
        >
          {children}
        </Box>
      </Container>

      {enableAskArticle && slug && (
        <AskArticleDock slug={slug} title={title} suggestedQuestions={askSuggestedQuestions} />
      )}
    </Box>
  );
}

export default BlogLayout;
