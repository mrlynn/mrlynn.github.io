import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '../../../utils/blog';
import BlogLayout from '../../../components/blog/BlogLayout';
import { Typography, Box, Container } from '@mui/material';
import Image from 'next/image';

const components = {
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

    // For debugging
    console.log('Image src:', src);

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

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const ogImage = post.image || '/images/default-blog-image.jpg';

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
    },
    authors: [{ name: post.author }],
    keywords: post.tags?.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Post Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <BlogLayout
      title={post.title}
      description={post.description}
      image={post.image}
      date={post.date}
      author={post.author}
    >
      <Box sx={{ mt: 4 }}>
        <MDXRemote source={post.content} components={components} />
      </Box>
    </BlogLayout>
  );
} 