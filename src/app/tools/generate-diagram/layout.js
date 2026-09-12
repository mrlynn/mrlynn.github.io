import { pageMetadata } from '../../../lib/pageMetadata';

// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = pageMetadata({
  title: 'Diagram Generator — Michael Lynn',
  description:
    'Turn a plain-English description into a Mermaid diagram you can edit, export, and drop into docs.',
  path: '/tools/generate-diagram',
  socialDescription:
    'Turn a plain-English description into a Mermaid diagram you can edit and export.',
});

export default function GenerateDiagramLayout({ children }) {
  return children;
}
