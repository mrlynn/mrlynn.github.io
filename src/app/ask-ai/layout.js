// Route-level metadata. page.js here is a client component, so the title and
// description live in this server layout instead of inheriting the site-wide
// homepage metadata.
export const metadata = {
  title: 'Ask My AI — Michael Lynn',
  description:
    "Chat with an AI that knows Michael Lynn's career, projects, talks, and expertise, or copy a prompt to use with your own LLM.",
  alternates: { canonical: '/ask-ai' },
  openGraph: {
    title: 'Ask My AI — Michael Lynn',
    description:
      "Chat with an AI that knows Michael Lynn's career, projects, talks, and expertise.",
    url: '/ask-ai',
  },
};

export default function AskAiLayout({ children }) {
  return children;
}
