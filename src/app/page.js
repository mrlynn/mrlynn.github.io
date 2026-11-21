import { pageMetadata } from '../lib/pageMetadata';
import JsonLd from '../components/JsonLd';
import { graph, webPageNode } from '../lib/structuredData';
import { getAllPosts } from '../lib/blog';
import { getSpeakingSummaries } from '../lib/speaking';
import { toShowcaseItem, pickSpotlight, SHOWCASE_THEMES } from '../lib/showcase';
import HomeClient from '../components/home/HomeClient';

export const metadata = pageMetadata({
  title: 'Michael Lynn — Engineer at SpaceXAI, Developer Advocate & Advisor',
  description:
    'Engineer at SpaceXAI (x.ai). I build with AI and modern data platforms — talks, open-source projects, writing, and hands-on workshops from 15+ years in tech.',
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
  const [posts, talks] = await Promise.all([getAllPosts(), getSpeakingSummaries()]);

  // Every project and essay, newest first, trimmed to what the showcase draws.
  // `featured: true` in frontmatter puts a project in the Now Showing reel.
  const showcase = posts.map(toShowcaseItem);
  const spotlight = pickSpotlight(showcase);
  const projectCount = showcase.filter((i) => i.type === 'project').length;

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
            name: 'Michael Lynn — Engineer at SpaceXAI, Developer Advocate & Advisor',
            description:
              'Engineer at SpaceXAI (x.ai). I build with AI and modern data platforms — talks, open-source projects, writing, and hands-on workshops from 15+ years in tech.',
          })
        )}
      />
      <HomeClient
        spotlight={spotlight}
        showcase={showcase}
        themes={SHOWCASE_THEMES.map(({ key, label }) => ({ key, label }))}
        projectCount={projectCount}
        talks={talks.slice(0, 4)}
      />
    </>
  );
}
