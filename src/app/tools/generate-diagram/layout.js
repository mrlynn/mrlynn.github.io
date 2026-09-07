// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'Diagram Generator — Michael Lynn',
  description:
    'Turn a plain-English description into a Mermaid diagram you can edit, export, and drop into docs.',
  alternates: { canonical: '/tools/generate-diagram' },
  openGraph: {
    title: 'Diagram Generator — Michael Lynn',
    description:
      'Turn a plain-English description into a Mermaid diagram you can edit and export.',
    url: '/tools/generate-diagram',
  },
};

export default function GenerateDiagramLayout({ children }) {
  return children;
}
