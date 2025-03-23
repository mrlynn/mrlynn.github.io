'use client';

import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import BlogCard from './BlogCard';

export default function BlogList({ posts }) {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            background: theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
          }}
        >
          Blog
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} key={post.slug}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 