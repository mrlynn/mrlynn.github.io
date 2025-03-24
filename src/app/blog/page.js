import { getAllPosts } from '../../lib/markdown';
import BlogList from '../../components/BlogList';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogList posts={posts} />;
} 