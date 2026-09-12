import { pageMetadata } from '../../lib/pageMetadata';
import { getAllPosts } from '../../lib/blog';
import CollectionBrowser from '../../components/common/CollectionBrowser';
import PageHeader from '../../components/PageHeader';
import { collectFilterTags, toCardPost } from '../../lib/collection';

export const metadata = pageMetadata({
  title: 'Projects | Michael Lynn',
  description:
    'Software development projects and experiments by Michael Lynn',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projects = (await getAllPosts('project')).map(toCardPost);
  const filterTags = collectFilterTags(projects);

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="A showcase of my work in software development, from experimental prototypes to production applications."
      />
      <CollectionBrowser
        posts={projects}
        filterTags={filterTags}
        kind="project"
        searchLabel="Search projects by name, description, or stack"
        emptyMessage="No projects match that. Try a different search or clear the filters."
      />
    </>
  );
}
