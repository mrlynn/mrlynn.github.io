// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'MongoDB Expertise — Michael Lynn',
  description:
    'MongoDB work by Michael Lynn: Atlas, vector search, RAG pipelines, schema design, and the talks, tools, and projects built around them.',
  alternates: { canonical: '/expertise/mongodb' },
  openGraph: {
    title: 'MongoDB Expertise — Michael Lynn',
    description:
      'Atlas, vector search, RAG pipelines, schema design, and the talks and tools built around them.',
    url: '/expertise/mongodb',
  },
};

export default function MongoDbExpertiseLayout({ children }) {
  return children;
}
