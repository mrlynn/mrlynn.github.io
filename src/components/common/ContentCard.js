'use client';

import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

/**
 * The one card shell.
 *
 * BlogCard and ProjectCard were near-clones — same frame, same hover, same chip
 * row — to the point that ProjectCard imported CARD_IMAGE_SIZES out of BlogCard.
 * A third, glassy variant lived inline in ProjectsSection and rendered the same
 * project data a fourth way. Everything cards now comes through here; the
 * wrappers only supply what genuinely differs.
 */

// Cards in a row must line up. Passing height="200" to CardMedia did not become
// CSS for component="img", so thumbnails rendered at their own aspect ratios
// (measured: 189-272px) and titles started at a different height per column.
const ThumbFrame = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
});

// Grid is xs=12 sm=6 md=4 inside maxWidth="lg": full viewport on phones, half on
// tablets, a third on desktop. Without this next/image assumes 100vw everywhere.
export const CARD_IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.border.subtle}`,
  transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: theme.palette.border.strong,
  },
}));

const chipSx = {
  backgroundColor: 'transparent',
  borderColor: 'border.default',
  color: 'text.secondary',
  fontFamily: 'var(--font-mono), monospace',
  fontSize: '0.68rem',
};

export default function ContentCard({
  href,
  image,
  imageBadge,
  meta,
  title,
  description,
  chips = [],
  maxChips = 4,
  footer,
}) {
  const visible = chips.slice(0, maxChips);
  const overflow = chips.length - visible.length;

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <StyledCard>
        {image && (
          <Box sx={{ position: 'relative' }}>
            <ThumbFrame>
              <Image
                src={image}
                alt=""
                fill
                sizes={CARD_IMAGE_SIZES}
                style={{ objectFit: 'cover' }}
              />
            </ThumbFrame>
            {imageBadge}
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {meta && (
            <Typography
              sx={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 1,
              }}
            >
              {meta}
            </Typography>
          )}

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

          {visible.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: footer ? 1.5 : 0 }}>
              {visible.map((chip) => (
                <Chip key={chip} label={chip} size="small" variant="outlined" sx={chipSx} />
              ))}
              {overflow > 0 && (
                <Typography
                  component="span"
                  sx={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.68rem',
                    color: 'text.secondary',
                    alignSelf: 'center',
                  }}
                >
                  +{overflow}
                </Typography>
              )}
            </Box>
          )}

          {footer}
        </CardContent>
      </StyledCard>
    </Link>
  );
}
