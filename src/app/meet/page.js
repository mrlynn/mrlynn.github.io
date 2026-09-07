import CalendarBooking from '../../components/CalendarBooking';
import { Container, Box, Typography } from '@mui/material';

export const metadata = {
  title: 'Book a Meeting — Michael Lynn',
  description:
    'Schedule time with Michael Lynn to talk through a project, an AI adoption question, a collaboration, or an advisory engagement.',
  alternates: { canonical: '/meet' },
  openGraph: {
    title: 'Book a Meeting — Michael Lynn',
    description:
      'Schedule time to talk through a project, an AI adoption question, or an advisory engagement.',
    url: '/meet',
  },
};

export default function MeetPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ pt: 10, pb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Book a Meeting with Michael
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Schedule a time to meet, discuss your project, or just connect!
        </Typography>
        <CalendarBooking variant="iframe" />
      </Box>
    </Container>
  );
} 