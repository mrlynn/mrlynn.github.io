import { getPostBySlug, getAllPosts } from '../../../utils/blog';
import BlogLayout from '../../../components/blog/BlogLayout';
import BlogPostContent from '../../../components/blog/BlogPostContent';
import { Typography, Container } from '@mui/material';

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
      <BlogPostContent post={post} slug={params.slug} />
    </BlogLayout>
  );
} 