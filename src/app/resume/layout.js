// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'Resume — Michael Lynn',
  description:
    'Fifteen years across developer advocacy, data platforms, and AI adoption. Experience, talks, open-source work, and a downloadable PDF resume.',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume — Michael Lynn',
    description:
      'Fifteen years across developer advocacy, data platforms, and AI adoption. Experience, talks, and open-source work.',
    url: '/resume',
  },
};

export default function ResumeLayout({ children }) {
  return children;
}
