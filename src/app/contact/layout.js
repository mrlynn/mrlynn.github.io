// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'Contact — Michael Lynn',
  description:
    'Get in touch with Michael Lynn about a project, a speaking engagement, an advisory conversation, or a collaboration.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Michael Lynn',
    description:
      'Get in touch about a project, a speaking engagement, or a collaboration.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }) {
  return children;
}
