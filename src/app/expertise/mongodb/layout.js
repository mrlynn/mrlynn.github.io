import { pageMetadata } from '../../../lib/pageMetadata';

// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = pageMetadata({
  title: 'MongoDB Expertise — Michael Lynn',
  description:
    'MongoDB work by Michael Lynn: Atlas, vector search, RAG pipelines, schema design, and the talks, tools, and projects built around them.',
  path: '/expertise/mongodb',
  socialDescription:
    'Atlas, vector search, RAG pipelines, schema design, and the talks and tools built around them.',
});

export default function MongoDbExpertiseLayout({ children }) {
  return children;
}
