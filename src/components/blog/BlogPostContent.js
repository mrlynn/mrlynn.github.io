'use client';

<<<<<<< Updated upstream
<<<<<<< HEAD
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
=======
import { MDXRemote } from 'next-mdx-remote/rsc';
=======
import { MDXRemote } from 'next-mdx-remote';
>>>>>>> Stashed changes
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';
import { trackContentView } from '../../lib/analytics';
import { mdxComponents } from '../mdx/MDXComponents';

export default function BlogPostContent({ post, slug }) {
  useEffect(() => {
    trackContentView(slug);
  }, [slug]);

  return (
<<<<<<< Updated upstream
    <Box sx={{ mt: 4 }}>
      <MDXRemote source={post.content} components={components} />
>>>>>>> 00ae68e0dff597081fbfcbcd9c2805c6b9342fa9
=======
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <MDXRemote
        {...post.content}
        components={mdxComponents}
      />
>>>>>>> Stashed changes
    </Box>
  );
} 