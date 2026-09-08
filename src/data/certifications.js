/**
 * MongoDB skill badges, self-hosted.
 *
 * These used to render as eight Credly <iframe>s on the homepage, none of them
 * lazy-loaded, pulling credly.com and cdn.credly.com on every visit. Credly's
 * embed also truncated the names at its 150px width, so "Securing MongoDB
 * Atlas: Authentication & Authorization" and "Securing MongoDB Self-Managed:
 * Authentication & Authorization" both rendered as "Securing Mong…" and were
 * indistinguishable from each other.
 *
 * Titles and artwork come from the badges themselves; the images live in
 * public/images/certifications/ so the page owes nothing to a third party.
 * Each card still links to the verifiable badge on Credly.
 */
export const certifications = [
  {
    id: '4e0273eb-a641-4a76-80b0-f5e0db12b4ab',
    title: 'From Relational Model (SQL) to MongoDB’s Document Model',
    image: '/images/certifications/relational-to-document.png',
  },
  {
    id: '833ef744-f741-45bd-857a-4023517b16bf',
    title: 'MongoDB Schema Design Patterns and Anti-patterns',
    image: '/images/certifications/schema-design-patterns.png',
  },
  {
    id: '0a059146-6f29-42ba-b438-9bc1bfe7d0cb',
    title: 'Building AI-Powered Search with MongoDB Vector Search',
    image: '/images/certifications/vector-search.png',
  },
  {
    id: 'a5c70efa-5e60-4430-b19c-0674fa71041c',
    title: 'Building RAG Apps Using MongoDB',
    image: '/images/certifications/rag-apps.png',
  },
  {
    id: 'eae0010a-b157-4f78-aa07-29ff0647c2c0',
    title: 'MongoDB Schema Design Optimization',
    image: '/images/certifications/schema-design-optimization.png',
  },
  {
    id: '7b8c4dd2-68e2-4ce3-81c1-6aac27870d65',
    title: 'Securing MongoDB Atlas: Authentication & Authorization',
    image: '/images/certifications/securing-atlas-authn.png',
  },
  {
    id: 'dfbff6c9-ff28-4621-959b-d1906cb96698',
    title: 'Securing MongoDB Self-Managed: Authentication & Authorization',
    image: '/images/certifications/securing-self-managed-authn.png',
  },
  {
    id: '356fc291-29d7-46e8-b3ec-f519e0908edc',
    title: 'Securing MongoDB Atlas Networking',
    image: '/images/certifications/securing-atlas-networking.png',
  },
];

export const CREDLY_PROFILE = 'https://www.credly.com/users/michael-lynn';
