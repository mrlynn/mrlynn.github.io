'use client';

import { Box, Container, Typography, Stack, Chip, useTheme } from '@mui/material';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { format } from 'date-fns';

const components = {
  h1: (props) => (
    <Typography
      variant="h1"
      component="h1"
      {...props}
      sx={{
        mt: 6,
        mb: 3,
        color: 'text.primary',
      }}
    />
  ),
  h2: (props) => (
    <Typography
      variant="h2"
      component="h2"
      {...props}
      sx={{
        mt: 6,
        mb: 3,
        color: 'text.primary',
      }}
    />
  ),
  h3: (props) => (
    <Typography
      variant="h3"
      component="h3"
      {...props}
      sx={{
        mt: 4,
        mb: 2,
        color: 'text.primary',
      }}
    />
  ),
  p: (props) => (
    <Typography
      variant="body1"
      component="p"
      {...props}
      sx={{
        mb: 3,
        lineHeight: 1.8,
      }}
    />
  ),
  ul: (props) => (
    <Box
      component="ul"
      {...props}
      sx={{
        mb: 3,
        pl: 4,
        '& li': {
          mb: 1,
        },
      }}
    />
  ),
  ol: (props) => (
    <Box
      component="ol"
      {...props}
      sx={{
        mb: 3,
        pl: 4,
        '& li': {
          mb: 1,
        },
      }}
    />
  ),
  pre: (props) => (
    <Box
      component="pre"
      {...props}
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        background: 'rgba(0,0,0,0.2)',
      }}
    />
  ),
  code: (props) => (
    <Box
      component="code"
      {...props}
      sx={{
        fontFamily: 'monospace',
        background: 'rgba(0,0,0,0.1)',
        padding: '0.2em 0.4em',
        borderRadius: 0.3,
      }}
    />
  ),
  blockquote: (props) => (
    <Box
      component="blockquote"
      {...props}
      sx={{
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        pl: 3,
        py: 1,
        my: 3,
        color: 'text.secondary',
        fontStyle: 'italic',
      }}
    />
  ),
};

export default function BlogPost({ post }) {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {post.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    background: theme.palette.background.gradient,
                    color: 'white',
                  }}
                />
              ))}
            </Stack>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                background: theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {format(new Date(post.date), 'MMMM d, yyyy')}
              {post.readTime && ` • ${post.readTime}`}
            </Typography>
          </Box>

          {/* Cover Image */}
          {post.coverImage && (
            <Box
              component="img"
              src={post.coverImage}
              alt={post.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
          )}

          {/* Content */}
          <Box>
            <MDXRemote {...post.content} components={components} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
} 