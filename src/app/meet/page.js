import CalendarBooking from '../../components/CalendarBooking';
import { Container, Box, Typography } from '@mui/material';

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