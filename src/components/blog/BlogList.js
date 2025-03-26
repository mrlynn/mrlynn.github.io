'use client';

import { Grid, Container, Typography, Box } from '@mui/material';
import BlogCard from './BlogCard';

const BlogList = ({ posts }) => {
  if (!posts?.length) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            No blog posts found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new content!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog Posts
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item key={post.slug} xs={12} sm={6} md={4}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BlogList; 