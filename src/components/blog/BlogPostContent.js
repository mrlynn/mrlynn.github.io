'use client';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { trackContentView } from '../../lib/analytics';
import { mdxComponents } from '../mdx/MDXComponents';

export default function BlogPostContent({ post, slug }) {
  useEffect(() => {
    if (post?.title) {
      trackContentView(slug);
    }
  }, [post?.title, slug]);

  if (!post?.content) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <MDXRemote
        {...post.content}
        components={{
          ...mdxComponents,
          img: ({ src, alt }) => (
            <Box sx={{ my: 4, position: 'relative', height: '400px', width: '100%' }}>
              <Image
                src={src}
                alt={alt || ''}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          ),
        }}
      />
    </Box>
  );
} 