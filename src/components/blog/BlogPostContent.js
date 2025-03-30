'use client';

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
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';
import { trackContentView } from '../../lib/analytics';
import { mdxComponents } from '../mdx/MDXComponents';

const components = {
  ...mdxComponents,
  h1: (props) => (
    <Typography variant="h1" component="h1" gutterBottom {...props} />
  ),
  h2: (props) => (
    <Typography variant="h2" component="h2" gutterBottom {...props} />
  ),
  h3: (props) => (
    <Typography variant="h3" component="h3" gutterBottom {...props} />
  ),
  h4: (props) => (
    <Typography variant="h4" component="h4" gutterBottom {...props} />
  ),
  h5: (props) => (
    <Typography variant="h5" component="h5" gutterBottom {...props} />
  ),
  h6: (props) => (
    <Typography variant="h6" component="h6" gutterBottom {...props} />
  ),
  p: (props) => (
    <Typography variant="body1" component="p" paragraph {...props} />
  ),
  ul: (props) => (
    <Typography component="ul" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  ol: (props) => (
    <Typography component="ol" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  li: (props) => (
    <Typography component="li" sx={{ mb: 1 }} {...props} />
  ),
  blockquote: (props) => (
    <Typography
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'primary.main',
        pl: 2,
        py: 1,
        my: 2,
        fontStyle: 'italic',
      }}
      {...props}
    />
  ),
  code: (props) => (
    <Typography
      component="code"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 0.5,
        borderRadius: 1,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <Typography
      component="pre"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        my: 2,
        '& code': {
          bgcolor: 'transparent',
          color: 'inherit',
          p: 0,
        }
      }}
      {...props}
    />
  ),
  img: (props) => {
    let src = props.src || '';
    
    if (src.startsWith('[') && src.endsWith(']')) {
      src = src.slice(1, -1);
    }
    
    if (src.startsWith('./')) {
      src = src.substring(2);
    }
    
    if (src.startsWith('/')) {
      src = src.substring(1);
    }

    return (
      <Box
        component="figure"
        sx={{
          my: 4,
          mx: 0,
          p: 0,
          '&::before, &::after': {
            content: '""',
            display: 'table',
          },
          '&::after': {
            clear: 'both',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            borderRadius: 1,
            overflow: 'hidden',
            boxShadow: 1,
          }}
        >
          <Image
            {...props}
            src={`/${src}`}
            alt={props.alt || ''}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority={true}
          />
        </Box>
        {props.alt && (
          <Box
            component="figcaption"
            sx={{
              textAlign: 'center',
              mt: 1,
              color: 'text.secondary',
              typography: 'caption',
            }}
          >
            {props.alt}
          </Box>
        )}
      </Box>
    );
  },
  a: (props) => (
    <Typography
      component="a"
      sx={{ color: 'primary.main', textDecoration: 'none' }}
      {...props}
    />
  ),
};

export default function BlogPostContent({ post, slug }) {
  useEffect(() => {
    trackContentView('blog', slug, post.title);
  }, [slug, post.title]);

  return (
    <Box sx={{ mt: 4 }}>
      <MDXRemote source={post.content} components={components} />
>>>>>>> 00ae68e0dff597081fbfcbcd9c2805c6b9342fa9
    </Box>
  );
} 