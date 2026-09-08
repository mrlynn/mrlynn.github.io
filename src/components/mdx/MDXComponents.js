import {
  Typography,
  Box,
  Chip,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
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
import BlogCTA from './includes/BlogCTA';
import BlogPdfDownload from './includes/BlogPdfDownload';

// Use this in post bodies instead of a raw <img> tag.
//
// MDX routes markdown-generated elements through the components map below, so
// `![alt](src)` picks up the `img` entry and its next/image treatment. A
// literal <img> written in the source does not — MDX passes intrinsic JSX
// straight through as HTML — so those images silently shipped at full size.
// A capitalized component name is resolved by MDX, which closes that hole.
//
// width/height are the file's real pixel dimensions. next/image needs them to
// reserve the right space before the image loads; `height: auto` in the style
// keeps the rendered image fluid at the column width.
function PostImage({ src, alt = '', width, height, rounded = true, ...props }) {
  return (
    <Box component="figure" sx={{ my: 4, mx: 0, p: 0 }}>
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        // The post column is capped at 800px; 860 covers it plus padding.
        sizes="(max-width: 900px) 100vw, 860px"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: rounded ? 8 : 0,
        }}
        {...props}
      />
    </Box>
  );
}

export const mdxComponents = {
  // The page template already renders the post title as the document's h1, and
  // most MDX bodies open with "# Title" as well — which shipped two h1s on every
  // article. An h1 written in the body renders as the next level down.
  h1: (props) => (
    <Typography variant="h2" component="h2" gutterBottom {...props} />
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
  table: ({ children, ...props }) => (
    <TableContainer component={Paper} sx={{ my: 4, overflowX: 'auto' }}>
      <Table size="small" {...props}>
        {children}
      </Table>
    </TableContainer>
  ),
  thead: ({ children, ...props }) => <TableHead {...props}>{children}</TableHead>,
  tbody: ({ children, ...props }) => <TableBody {...props}>{children}</TableBody>,
  tr: ({ children, ...props }) => <TableRow {...props}>{children}</TableRow>,
  th: ({ children, ...props }) => (
    <TableCell
      component="th"
      sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
      {...props}
    >
      {children}
    </TableCell>
  ),
  td: ({ children, ...props }) => <TableCell {...props}>{children}</TableCell>,
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
  PostImage,
  TechStack,
  DemoVideo,
  AsciiDiagram,
  MermaidDiagram,
  CodeDemo,
  ImageGrid,
  VideoPlayer,
  ScreenshotSlideshow,
  BlogCTA,
  BlogPdfDownload,
}; 