import { getAllSpeakingEngagements } from '../../lib/speaking';
import SpeakingClient from './SpeakingClient';

export const metadata = {
  title: 'Speaking — Michael Lynn',
  description:
    'Conference talks, workshops, and developer sessions on AI adoption, vector search, and modern data platforms. Past engagements and how to book me.',
  alternates: { canonical: '/speaking' },
  openGraph: {
    title: 'Speaking — Michael Lynn',
    description:
      'Conference talks, workshops, and developer sessions on AI adoption, vector search, and modern data platforms.',
    url: '/speaking',
  },
};

export default async function SpeakingPage() {
  const engagements = await getAllSpeakingEngagements();

  return <SpeakingClient initialEngagements={engagements} />;
} 