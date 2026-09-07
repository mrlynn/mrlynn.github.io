// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'Art Gallery — Michael Lynn',
  description: 'A collection of paintings and artwork by Michael Lynn.',
  alternates: { canonical: '/art' },
  openGraph: {
    title: 'Art Gallery — Michael Lynn',
    description: 'A collection of paintings and artwork by Michael Lynn.',
    url: '/art',
  },
};

export default function ArtLayout({ children }) {
  return children;
}
