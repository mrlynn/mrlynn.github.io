import { getAllSpeakingEngagements } from '../../lib/speaking';
import SpeakingClient from './SpeakingClient';

export default async function SpeakingPage() {
  const engagements = await getAllSpeakingEngagements();

  return <SpeakingClient initialEngagements={engagements} />;
} 