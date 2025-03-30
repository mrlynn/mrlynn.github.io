import { getPostBySlug, getAllPosts } from '../../../utils/blog';
import { BlogLayout } from '../../../components/blog/BlogLayout';
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
  if (!post) return {};

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return (
      <Container>
        <Typography variant="h1">Blog Post Not Found</Typography>
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