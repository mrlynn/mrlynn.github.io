import Link from 'next/link';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import PageHeader from '../components/PageHeader';

export const metadata = {
  title: 'Page Not Found — Michael Lynn',
  description: 'That page does not exist.',
  // Required, not redundant: without it this page inherits the root layout's
  // `index, follow`, which lands next to the `noindex` Next emits for not-found
  // and leaves two contradictory robots tags on the page.
  robots: { index: false, follow: true },
};

// Rendered for any real 404, including the unknown /blog/<slug> and
// /projects/<slug> URLs that used to return 200 with a bare "Not Found" line.
// The links matter: most 404s here are stale post URLs, and the two indexes are
// where that reader was trying to go.
export default function NotFound() {
  return (
    <Box sx={{ pb: { xs: 8, md: 12 } }}>
      <PageHeader
        title="That page isn't here"
        subtitle="The link may be out of date, or the page may have moved. The writing and the projects are both still where you'd expect."
      />
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button component={Link} href="/blog" variant="contained" size="large">
            Read the writing
          </Button>
          <Button component={Link} href="/projects" variant="outlined" size="large">
            See the projects
          </Button>
          <Button component={Link} href="/" variant="text" size="large">
            Back home
          </Button>
        </Stack>
        <Typography
          align="center"
          sx={{ mt: 5, color: 'text.secondary', fontSize: '0.95rem' }}
        >
          Landed here from a link on this site?{' '}
          <Box component={Link} href="/contact" sx={{ color: 'inherit' }}>
            Tell me
          </Box>{' '}
          and I&apos;ll fix it.
        </Typography>
      </Container>
    </Box>
  );
}
