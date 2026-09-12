import { pageMetadata } from '../../lib/pageMetadata';
import JsonLd from '../../components/JsonLd';
import { breadcrumbNode, eventNode, graph } from '../../lib/structuredData';
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

  return (
    <>
      {/*
        One Event node per talk, each performed by the site's Person. Past talks
        are included deliberately: they are the evidence behind the speaking
        claim, and Event has no "this already happened" exclusion.
      */}
      <JsonLd
        data={graph(
          engagements.map((engagement) =>
            eventNode({
              title: engagement.eventName || engagement.title,
              description: engagement.description,
              date: engagement.date,
              time: engagement.time,
              timezone: engagement.timezone,
              venue: engagement.venue,
              location: engagement.location,
              anchor: `event-${engagement.slug}`,
              registrationUrl: engagement.registrationUrl,
              isUpcoming: engagement.isUpcoming,
            })
          ),
          breadcrumbNode([{ name: 'Speaking', path: '/speaking' }])
        )}
      />
      <SpeakingClient initialEngagements={engagements} />
    </>
  );
} 