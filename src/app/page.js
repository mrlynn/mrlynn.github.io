import { pageMetadata } from '../lib/pageMetadata';
import JsonLd from '../components/JsonLd';
import { graph, webPageNode } from '../lib/structuredData';
import { getAllPosts } from '../lib/blog';
import { getSpeakingSummaries } from '../lib/speaking';
import { toCardPost } from '../lib/collection';
import HomeClient from '../components/home/HomeClient';

export const metadata = pageMetadata({
  title: 'Michael Lynn — AI Adoption Engineer, Developer Advocate & Advisor',
  description:
    'AI Adoption Engineer at Cursor. I help developers and teams build with AI and modern data platforms — talks, open-source projects, writing, and hands-on workshops from 15+ years in tech.',
  path: '/',
  socialDescription:
    'Writing, open-source projects, talks, and hands-on workshops about building useful AI systems.',
});

/**
 * The homepage loads on the server now.
 *
 * "Latest writing" used to fetch('/api/blog') from a useEffect, so the section
 * popped in after hydration with no skeleton and none of it was in the HTML for
 * crawlers. Selected work used a hardcoded 12-item array in src/data/projects.js
 * that had drifted out of step with the 22 MDX projects behind /projects — and
 * three of its six featured cards were href="#" dead ends.
 */
export default async function Home() {
  const [articles, projects, talks] = await Promise.all([
    getAllPosts(null, 'project'),
    getAllPosts('project'),
    getSpeakingSummaries(),
  ]);

  // Optional `featured: true` in frontmatter pins a project to the homepage;
  // otherwise it's simply the most recent work.
  const featuredProjects = [...projects]
    .sort((a, b) => Boolean(b.featured) - Boolean(a.featured))
    .slice(0, 6)
    .map(toCardPost);

  return (
    <>
      {/*
        The site's identity anchor. Every other page's JSON-LD references this
        Person by @id rather than repeating the name, so a crawler resolves one
        entity across the whole site.
      */}
      <JsonLd
        data={graph(
          webPageNode({
            path: '/',
            name: 'Michael Lynn — AI Adoption Engineer, Developer Advocate & Advisor',
            description:
              'AI Adoption Engineer at Cursor. I help developers and teams build with AI and modern data platforms — talks, open-source projects, writing, and hands-on workshops from 15+ years in tech.',
          })
        )}
      />
      <HomeClient
        posts={articles.slice(0, 3).map(toCardPost)}
        projects={featuredProjects}
        talks={talks.slice(0, 4)}
      />
    </>
  );
}
