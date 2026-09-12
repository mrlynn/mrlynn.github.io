import { pageMetadata } from '../../lib/pageMetadata';
import { Container, Typography, Box } from '@mui/material';
import InstagramFeed from '../../components/InstagramFeed';

export const metadata = pageMetadata({
  title: 'Social Media | Michael Lynn',
  description:
    'Follow my journey through social media posts and updates',
  path: '/social',
});

export default function SocialPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Social Media
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Follow my journey through social media posts and updates
        </Typography>
        <InstagramFeed />
      </Box>
    </Container>
  );
} 