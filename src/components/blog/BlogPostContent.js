'use client';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { trackContentView } from '../../lib/analytics';
import dynamic from 'next/dynamic';

const MDXRenderer = dynamic(() => import('../mdx/MDXRenderer'), {
  ssr: true,
  loading: () => <Box>Loading...</Box>
});

export default function BlogPostContent({ post, slug }) {
  useEffect(() => {
    if (post?.title) {
      trackContentView('blog', slug, post.title);
    }
  }, [slug, post?.title]);

  if (!post?.content) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <MDXRenderer source={post.content} />
    </Box>
  );
} 