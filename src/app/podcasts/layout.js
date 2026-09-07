// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'Podcasts — Michael Lynn',
  description:
    'Podcast episodes hosted and guested by Michael Lynn, covering databases, developer relations, vector search, and building with AI.',
  alternates: { canonical: '/podcasts' },
  openGraph: {
    title: 'Podcasts — Michael Lynn',
    description:
      'Episodes on databases, developer relations, vector search, and building with AI.',
    url: '/podcasts',
  },
};

export default function PodcastsLayout({ children }) {
  return children;
}
