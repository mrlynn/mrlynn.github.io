'use client';

import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { format } from 'date-fns';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const BlogCard = ({ post }) => {
  const { title, description, date, image, tags, slug } = post;

  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
      <StyledCard>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: '1.3rem',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          >
            {format(new Date(date), 'MMMM d, yyyy')}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1 }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tags?.map((tag) => (
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
          </Box>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default BlogCard; 