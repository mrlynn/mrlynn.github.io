import { Typography, Box } from '@mui/material';
import Image from 'next/image';

export const mdxComponents = {
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
    // Clean up the src path
    let src = props.src || '';
    
    // Handle markdown image syntax [path]
    if (src.startsWith('[') && src.endsWith(']')) {
      src = src.slice(1, -1);
    }
    
    // Handle relative paths
    if (src.startsWith('./')) {
      src = src.substring(2);
    }
    
    // Handle absolute paths starting with /
    if (src.startsWith('/')) {
      src = src.substring(1);
    }

    return (
      <Box sx={{ my: 4 }}>
        <Image
          src={`/${src}`}
          alt={props.alt || ''}
          width={1200}
          height={630}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        />
      </Box>
    );
  },
}; 