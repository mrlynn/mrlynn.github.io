// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'Consulting & Advisory — Michael Lynn',
  description:
    'Advisory and hands-on help for teams adopting AI tooling and modern data platforms: workshops, developer enablement, and architecture guidance.',
  alternates: { canonical: '/consulting' },
  openGraph: {
    title: 'Consulting & Advisory — Michael Lynn',
    description:
      'Advisory and hands-on help for teams adopting AI tooling and modern data platforms.',
    url: '/consulting',
  },
};

export default function ConsultingLayout({ children }) {
  return children;
}
