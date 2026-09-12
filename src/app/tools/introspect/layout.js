import { pageMetadata } from '../../../lib/pageMetadata';

// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = pageMetadata({
  title: 'MongoDB Introspector — Michael Lynn',
  description:
    'Point the introspector at a MongoDB database and get a readable view of its collections, schema, and indexes.',
  path: '/tools/introspect',
  socialDescription:
    'Get a readable view of a MongoDB database: collections, schema, and indexes.',
});

export default function IntrospectLayout({ children }) {
  return children;
}
