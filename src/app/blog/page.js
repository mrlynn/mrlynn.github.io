import { getAllPosts } from '../../lib/blog';
import BlogList from '../../components/blog/BlogList';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Blog | Michael Lynn',
  description: 'Technical articles, tutorials, and insights from Michael Lynn',
};

export default async function BlogPage() {
  // Get all posts except projects
  const posts = await getAllPosts(null, 'project');

  return (
    <>
      <PageHeader
        title="Blog Articles"
        subtitle="A collection of blog articles and thoughts on software development, technology, and other topics."
      />
      <BlogList posts={posts} />
    </>
  );
} 


