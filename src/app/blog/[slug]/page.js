import { getAllPosts, getPostBySlug } from '../../../lib/markdown';
import BlogPost from '../../../components/BlogPost';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  return <BlogPost post={post} />;
} 