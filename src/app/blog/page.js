import { pageMetadata } from '../../lib/pageMetadata';
import { getAllPosts } from '../../lib/blog';
import CollectionBrowser from '../../components/common/CollectionBrowser';
import PageHeader from '../../components/PageHeader';
import { collectFilterTags, toCardPost } from '../../lib/collection';

export const metadata = pageMetadata({
  title: 'Blog | Michael Lynn',
  description:
    'Technical articles, tutorials, and insights from Michael Lynn',
  path: '/blog',
});

export default async function BlogPage() {
  // Projects render at /projects; they'd otherwise appear in both indexes.
  const posts = (await getAllPosts(null, 'project')).map(toCardPost);
  const filterTags = collectFilterTags(posts);

  return (
    <>
      <PageHeader
        title="Blog Articles"
        subtitle="A collection of blog articles and thoughts on software development, technology, and other topics."
      />
      <CollectionBrowser
        posts={posts}
        filterTags={filterTags}
        kind="blog"
        searchLabel="Search posts by title, description, or tag"
      />
    </>
  );
}
