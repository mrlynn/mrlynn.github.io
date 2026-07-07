'use client';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { trackBlogCtaClick } from '../../../lib/analytics';

function appendUtm(href, ctaId, slug) {
  if (!href.startsWith('http')) {
    return href;
  }

  try {
    const url = new URL(href);
    url.searchParams.set('utm_source', 'mlynn');
    url.searchParams.set('utm_medium', 'blog');
    url.searchParams.set('utm_campaign', slug || 'blog');
    url.searchParams.set('utm_content', ctaId);
    return url.toString();
  } catch {
    return href;
  }
}

export default function BlogCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  primaryExternal = false,
  secondaryLabel,
  secondaryHref,
  secondaryExternal = false,
  ctaId = 'blog-cta',
  slug = 'blog',
  variant = 'primary',
}) {
  const isExternalPrimary = primaryExternal || primaryHref?.startsWith('http');
  const isExternalSecondary =
    secondaryExternal || secondaryHref?.startsWith('http');

  const primaryUrl = primaryHref
    ? appendUtm(primaryHref, ctaId, slug)
    : undefined;
  const secondaryUrl = secondaryHref
    ? appendUtm(secondaryHref, `${ctaId}-secondary`, slug)
    : undefined;

  const handleClick = (label, href, destination) => {
    trackBlogCtaClick({
      slug,
      ctaId,
      label,
      href,
      destination,
    });
  };

  const paperSx =
    variant === 'subtle'
      ? {
          my: 4,
          p: 3,
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'divider',
        }
      : {
          my: 4,
          p: { xs: 3, md: 4 },
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 2,
        };

  const textColor = variant === 'subtle' ? 'text.primary' : 'inherit';
  const descColor = variant === 'subtle' ? 'text.secondary' : 'inherit';

  return (
    <Paper elevation={variant === 'subtle' ? 0 : 2} sx={paperSx}>
      <Stack spacing={2}>
        {title && (
          <Typography
            variant="h6"
            component="p"
            sx={{ color: textColor, fontWeight: 700, mb: 0 }}
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body1" sx={{ color: descColor, mb: 0 }}>
            {description}
          </Typography>
        )}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          {primaryLabel && primaryUrl && (
            <Button
              component={isExternalPrimary ? 'a' : Link}
              href={primaryUrl}
              target={isExternalPrimary ? '_blank' : undefined}
              rel={isExternalPrimary ? 'noopener noreferrer' : undefined}
              variant={variant === 'subtle' ? 'contained' : 'contained'}
              color={variant === 'subtle' ? 'primary' : 'secondary'}
              onClick={() =>
                handleClick(primaryLabel, primaryUrl, 'primary')
              }
            >
              {primaryLabel}
            </Button>
          )}
          {secondaryLabel && secondaryUrl && (
            <Button
              component={isExternalSecondary ? 'a' : Link}
              href={secondaryUrl}
              target={isExternalSecondary ? '_blank' : undefined}
              rel={isExternalSecondary ? 'noopener noreferrer' : undefined}
              variant="outlined"
              sx={
                variant === 'primary'
                  ? {
                      color: 'primary.contrastText',
                      borderColor: 'primary.contrastText',
                      '&:hover': {
                        borderColor: 'primary.contrastText',
                        bgcolor: 'rgba(255,255,255,0.08)',
                      },
                    }
                  : undefined
              }
              onClick={() =>
                handleClick(secondaryLabel, secondaryUrl, 'secondary')
              }
            >
              {secondaryLabel}
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
