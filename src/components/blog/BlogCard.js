'use client';

import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { format } from 'date-fns';

// Cards in a row must line up. The old markup passed height="200" to CardMedia,
// which MUI does not turn into CSS for component="img", so every thumbnail
// rendered at its own aspect ratio (measured: 189-272px) and titles started at
// a different height in each column. A fixed ratio fixes the baseline.
const Thumb = styled('img')({
  width: '100%',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  display: 'block',
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

const MAX_VISIBLE_TAGS = 4;

export default function BlogCard({ post }) {
  const { title, description, date, image, tags = [], slug, readingTime } = post;
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = tags.length - visibleTags.length;

  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <StyledCard>
        {image && <Thumb src={image} alt="" loading="lazy" />}

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
            {date ? format(new Date(date), 'MMM d, yyyy') : ''}
            {date && readingTime ? ' · ' : ''}
            {readingTime ? `${readingTime} min read` : ''}
          </Typography>

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

          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {visibleTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
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
        </CardContent>
      </StyledCard>
    </Link>
  );
}
