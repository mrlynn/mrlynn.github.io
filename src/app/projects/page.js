import JsonLd from '../../components/JsonLd';
import { breadcrumbNode, graph, itemListNode } from '../../lib/structuredData';
import { SITE_URL } from '../../lib/siteUrl';
import { getAllPosts } from '../../lib/blog';
import CollectionBrowser from '../../components/common/CollectionBrowser';
import PageHeader from '../../components/PageHeader';
import { collectFilterTags, toCardPost } from '../../lib/collection';

export const metadata = {
  title: 'Projects | Michael Lynn',
  description: 'Software development projects and experiments by Michael Lynn',
};

export default async function ProjectsPage() {
  const projects = (await getAllPosts('project')).map(toCardPost);
  const filterTags = collectFilterTags(projects);

  return (
    <>
      <JsonLd
        data={graph(
          itemListNode({
            id: `${SITE_URL}/projects#projects`,
            name: 'Projects by Michael Lynn',
            description:
              'Software development projects and experiments by Michael Lynn',
            urls: projects.map((project) => `/projects/${project.slug}`),
          }),
          breadcrumbNode([{ name: 'Projects', path: '/projects' }])
        )}
      />
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
