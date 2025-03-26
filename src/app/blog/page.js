import { getAllPosts } from '../../lib/blog';
import BlogList from '../../components/blog/BlogList';

export const metadata = {
  title: 'Blog | Michael Lynn',
  description: 'Technical articles, tutorials, and insights from Michael Lynn',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogList posts={posts} />;
} 