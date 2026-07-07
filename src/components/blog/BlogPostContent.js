'use client';

import { Box } from '@mui/material';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import BlogEngagementTracker from './BlogEngagementTracker';
import BlogCTA from '../mdx/includes/BlogCTA';
import BlogPdfDownload from '../mdx/includes/BlogPdfDownload';
import { mdxComponents } from '../mdx/MDXComponents';

export default function BlogPostContent({ post, slug }) {
  if (!post?.content) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <BlogEngagementTracker slug={slug} title={post.title} />
      <MDXRemote
        {...post.content}
        components={{
          ...mdxComponents,
          BlogCTA: (props) => <BlogCTA {...props} slug={slug} />,
          BlogPdfDownload: (props) => <BlogPdfDownload {...props} slug={slug} />,
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