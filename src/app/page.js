import { getAllPosts } from '../lib/blog';
import { getSpeakingSummaries } from '../lib/speaking';
import { toCardPost } from '../lib/collection';
import HomeClient from '../components/home/HomeClient';

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
    <HomeClient
      posts={articles.slice(0, 3).map(toCardPost)}
      projects={featuredProjects}
      talks={talks.slice(0, 4)}
    />
  );
}
