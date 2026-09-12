import { getAllPosts } from '../../lib/blog';
import { getSpeakingSummaries } from '../../lib/speaking';
import { SITE_URL } from '../../lib/siteUrl';
import { personalInfo } from '../../data/personalInfo';

/**
 * /llms.txt — the llmstxt.org convention.
 *
 * A curated map of the site in markdown, for models that are answering a
 * question about Michael rather than rendering the pages. Without it, an
 * assistant either crawls a React site it cannot read well or falls back to
 * whatever it half-remembers.
 *
 * Generated, not hand-written, for the same reason the sitemap is: a static
 * file would be wrong the first time a post shipped. Everything here reads from
 * the MDX under content/ and from personalInfo — deliberately NOT from
 * personalInfo.projects or personalInfo.speaking, which are older hardcoded
 * arrays that no longer match what the site actually publishes.
 */

const ymd = (date) => {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
};

/** Collapse newlines: one bullet per item, so descriptions must stay on a line. */
const oneLine = (text) =>
  (text || '').replace(/\s+/g, ' ').trim();

function bullet({ title, url, suffix, note }) {
  const head = `- [${oneLine(title)}](${url})${suffix ? ` ${suffix}` : ''}`;
  return note ? `${head}: ${oneLine(note)}` : head;
}

/**
 * Venue plus city/state, not the full street address. "Jacob K. Javits
 * Convention Center, Javits Center 429 11th Ave, New York, NY 10001" is most of
 * a line for one talk; the /speaking page carries the full address.
 *
 * Parsed from the right, because the addresses are authored inconsistently —
 * some have a comma before the city, some don't ("Levine Center for the Arts
 * Charlotte, NC 28202"), so anything anchored on the left picks up half the
 * venue name as the city.
 */
function cityState(location) {
  const segments = (location || '').split(',').map((part) => part.trim()).filter(Boolean);
  const stateIndex = segments.findIndex((part) => /^[A-Z]{2}(\s+\d{5})?$/.test(part));
  if (stateIndex < 1) return '';

  const state = segments[stateIndex].slice(0, 2);
  const words = segments[stateIndex - 1].split(/\s+/);
  // A long run of words before the state means the comma is missing and the
  // venue name ran into the city; the city is the tail of it.
  const city = words.length > 3 ? words.slice(-1).join(' ') : words.join(' ');
  return `${city}, ${state}`;
}

function place({ venue, location }) {
  const where = cityState(location) || location || '';
  // venue="Denver" with where="Denver, CO" would otherwise read "Denver, Denver, CO".
  if (venue && where.toLowerCase().startsWith(venue.toLowerCase())) return where;
  return [venue, where].filter(Boolean).join(', ');
}

export async function GET() {
  const [articles, projects, talks] = await Promise.all([
    getAllPosts(null, 'project'),
    getAllPosts('project'),
    getSpeakingSummaries(),
  ]);

  // Most recent first, and only talks that actually happened or are booked.
  const datedTalks = talks.filter((talk) => talk.date);

  const currentRole = personalInfo.career[personalInfo.career.length - 1];
  const priorRoles = personalInfo.career
    .slice(0, -1)
    .reverse()
    .map((role) => `${role.role}, ${role.company} (${role.period})`);

  const lines = [
    `# ${personalInfo.name}`,
    '',
    `> Personal site of ${personalInfo.name}, ${personalInfo.currentRole} at ${personalInfo.company}. Writing, open-source projects, conference talks, and hands-on workshops about building with data and AI.`,
    '',
    oneLine(personalInfo.bio),
    '',
    `Currently ${currentRole.role} at ${currentRole.company} (${currentRole.period}). Previously: ${priorRoles.join('; ')}.`,
    '',
    `Works on: ${personalInfo.expertise.join(', ')}.`,
    '',
    '## Writing',
    '',
    `${articles.length} posts. Newest first; the date is the publication date.`,
    '',
    ...articles.map((post) =>
      bullet({
        title: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        suffix: ymd(post.date) ? `(${ymd(post.date)})` : '',
        note: post.description,
      })
    ),
    '',
    '## Projects',
    '',
    `${projects.length} projects. These render at /projects/<slug>, which is the canonical URL; the same write-ups are also reachable under /blog/<slug>.`,
    '',
    ...projects.map((project) =>
      bullet({
        title: project.title,
        url: `${SITE_URL}/projects/${project.slug}`,
        note: project.description,
      })
    ),
    '',
    '## Speaking',
    '',
    `${datedTalks.length} talks and workshops. They are all listed on one page; individual talks do not have their own URLs.`,
    '',
    ...datedTalks.map((talk) => {
      const parts = [talk.eventType, place(talk), ymd(talk.date)]
        .filter(Boolean)
        .join(', ');
      return `- ${oneLine(talk.eventName || talk.title)}${parts ? ` (${parts})` : ''}`;
    }),
    '',
    '## Pages',
    '',
    bullet({
      title: 'About',
      url: `${SITE_URL}/about`,
      note: 'Background, career timeline, certifications',
    }),
    bullet({
      title: 'Resume',
      url: `${SITE_URL}/resume`,
      note: 'Full work history, also downloadable as PDF',
    }),
    bullet({
      title: 'Consulting',
      url: `${SITE_URL}/consulting`,
      note: 'Advisory and workshop engagements',
    }),
    bullet({
      title: 'Speaking',
      url: `${SITE_URL}/speaking`,
      note: 'Past and upcoming talks, and how to book one',
    }),
    bullet({
      title: 'Podcasts',
      url: `${SITE_URL}/podcasts`,
      note: 'The MongoDB Podcast and the Daily Reflection Podcast, both hosted by Michael',
    }),
    bullet({
      title: 'Ask my AI',
      url: `${SITE_URL}/ask-ai`,
      note: "A retrieval-backed assistant that answers questions about Michael's work using this site as its source",
    }),
    bullet({
      title: 'Contact',
      url: `${SITE_URL}/contact`,
      note: 'Booking link and social profiles',
    }),
    '',
    '## Optional',
    '',
    bullet({
      title: 'RSS feed',
      url: `${SITE_URL}/feed.xml`,
      note: 'Every post with its summary, newest first',
    }),
    bullet({
      title: 'Sitemap',
      url: `${SITE_URL}/sitemap.xml`,
      note: 'Every indexable URL',
    }),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      // text/plain, not text/markdown: browsers download an unknown type rather
      // than showing it, and this file is meant to be readable by opening it.
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
