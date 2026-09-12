import JsonLd from '../../components/JsonLd';
import { breadcrumbNode, graph, PERSON_ID } from '../../lib/structuredData';
import { SITE_URL } from '../../lib/siteUrl';

export const metadata = {
  title: 'About — Michael Lynn',
  description:
    'Michael Lynn is an AI Adoption Engineer at Cursor. Twenty-five years across UNIX engineering, enterprise architecture, developer platforms, and now AI adoption — plus what he has been building lately.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Michael Lynn',
    description:
      'Twenty-five years across UNIX engineering, enterprise architecture, developer platforms, and now AI adoption.',
    url: '/about',
  },
};

export default function AboutLayout({ children }) {
  return (
    <>
      {/*
        ProfilePage is the type Google documents for "this page is about one
        person". mainEntity points at the same Person the homepage declares
        rather than defining a second one, so both pages describe one entity.
      */}
      <JsonLd
        data={graph(
          {
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/about#profile`,
            url: `${SITE_URL}/about`,
            name: 'About Michael Lynn',
            mainEntity: { '@id': PERSON_ID },
          },
          breadcrumbNode([{ name: 'About', path: '/about' }])
        )}
      />
      {children}
    </>
  );
}
