'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { Typography } from '@mui/material';
import TechStack from '../mdx/includes/TechStack';
import DemoVideo from '../mdx/includes/DemoVideo';

const components = {
  TechStack,
  DemoVideo,
  h1: (props) => <Typography variant="h1" gutterBottom {...props} />,
  h2: (props) => <Typography variant="h2" gutterBottom {...props} />,
  h3: (props) => <Typography variant="h3" gutterBottom {...props} />,
  h4: (props) => <Typography variant="h4" gutterBottom {...props} />,
  h5: (props) => <Typography variant="h5" gutterBottom {...props} />,
  h6: (props) => <Typography variant="h6" gutterBottom {...props} />,
  p: (props) => <Typography paragraph {...props} />,
  ul: (props) => <Typography component="ul" sx={{ mb: 2, pl: 2 }} {...props} />,
  ol: (props) => <Typography component="ol" sx={{ mb: 2, pl: 2 }} {...props} />,
  li: (props) => <Typography component="li" sx={{ mb: 1 }} {...props} />,
  blockquote: (props) => (
    <Typography
      component="blockquote"
      sx={{
        borderLeft: (theme) => `4px solid ${theme.palette.grey[300]}`,
        margin: 2,
        padding: 2,
        bgcolor: (theme) => theme.palette.grey[50],
      }}
      {...props}
    />
  ),
  code: (props) => (
    <Typography
      component="code"
      sx={{
        bgcolor: (theme) => theme.palette.grey[100],
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
        bgcolor: (theme) => theme.palette.grey[100],
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        mb: 2,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  img: (props) => (
    <Typography
      component="img"
      sx={{
        maxWidth: '100%',
        height: 'auto',
        mb: 2,
        borderRadius: 1,
      }}
      {...props}
    />
  ),
};

export default function ProjectContent({ content }) {
  if (!content) {
    return null;
  }

  try {
    return (
      <div className="mdx-content">
        <MDXRemote 
          source={content} 
          components={components}
        />
      </div>
    );
  } catch (error) {
    console.error('Error rendering MDX:', error);
    return null;
  }
} 