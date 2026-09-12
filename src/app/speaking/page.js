import { pageMetadata } from '../../lib/pageMetadata';
import { getAllSpeakingEngagements } from '../../lib/speaking';
import SpeakingClient from './SpeakingClient';

export const metadata = pageMetadata({
  title: 'Speaking — Michael Lynn',
  description:
    'Conference talks, workshops, and developer sessions on AI adoption, vector search, and modern data platforms. Past engagements and how to book me.',
  path: '/speaking',
  socialDescription:
    'Conference talks, workshops, and developer sessions on AI adoption, vector search, and modern data platforms.',
});

export default async function SpeakingPage() {
  const engagements = await getAllSpeakingEngagements();

  return <SpeakingClient initialEngagements={engagements} />;
} 