import { Typography, Box, Chip, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import TechStack from './includes/TechStack';
import DemoVideo from './includes/DemoVideo';
import AsciiDiagram from './includes/AsciiDiagram';
import MermaidDiagram from './includes/MermaidDiagram';
import CodeDemo from './includes/CodeDemo';
import ImageGrid from './includes/ImageGrid';
import VideoPlayer from './includes/VideoPlayer';
import ScreenshotSlideshow from '../ScreenshotSlideshow';
import CodeBlock from '../CodeBlock';


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
  p: ({ children, ...props }) => (
    <Typography variant="body1" component="div" paragraph {...props}>
      {children}
    </Typography>
  ),
  a: ({ children, href, ...props }) => (
    <Typography
      component={Link}
      href={href}
      color="primary"
      sx={{
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  ul: ({ children, ...props }) => (
    <Typography component="ul" sx={{ pl: 2, mb: 2 }} {...props}>
      {children}
    </Typography>
  ),
  ol: ({ children, ...props }) => (
    <Typography component="ol" sx={{ pl: 2, mb: 2 }} {...props}>
      {children}
    </Typography>
  ),
  li: ({ children, ...props }) => (
    <Typography component="li" sx={{ mb: 1 }} {...props}>
      {children}
    </Typography>
  ),
  blockquote: ({ children, ...props }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'primary.main',
        pl: 2,
        py: 1,
        my: 2,
        bgcolor: 'background.paper',
      }}
      {...props}
    >
      <Typography component="div">{children}</Typography>
    </Box>
  ),
  img: ({ src, alt, ...props }) => (
    <Box
      component="figure"
      sx={{
        my: 4,
        mx: 0,
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          minHeight: '300px',
        }}
      >
        <Image
          src={src}
          alt={alt || ''}
          fill
          style={{ objectFit: 'contain' }}
          {...props}
        />
      </Box>
      {alt && (
        <Typography
          component="figcaption"
          variant="caption"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {alt}
        </Typography>
      )}
    </Box>
  ),
  pre: ({ children, ...props }) => {
    const content = children?.props?.children || '';
    const isAsciiDiagram = /[┌┐└┘├┤─│]/.test(content);

    if (isAsciiDiagram) {
      return <AsciiDiagram {...props}>{content}</AsciiDiagram>;
    }

    return (
      <CodeBlock language={children?.props?.className?.replace('language-', '')}>
        {content}
      </CodeBlock>
    );
  },
  code: ({ children, className, ...props }) => {
    const content = children || '';
    const isAsciiDiagram = /[┌┐└┘├┤─│]/.test(content);

    if (isAsciiDiagram) {
      return <AsciiDiagram {...props}>{content}</AsciiDiagram>;
    }

    return (
      <Typography
        component="code"
        sx={{
          p: 0.5,
          bgcolor: 'background.paper',
          borderRadius: 0.5,
          fontFamily: 'monospace',
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  },
  TechStack,
  DemoVideo,
  AsciiDiagram,
  MermaidDiagram,
  CodeDemo,
  ImageGrid,
  VideoPlayer,
  ScreenshotSlideshow,
}; 