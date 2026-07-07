'use client';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { trackBlogPdfDownload } from '../../../lib/analytics';

export default function BlogPdfDownload({
  slug = 'cursor-misconceptions',
  title = 'Download the one-pager',
  description = 'A printable myth-vs-reality cheat sheet you can share with your team.',
  ctaId = 'pdf-one-pager',
  downloadPath = '/api/downloads/cursor-misconceptions-one-pager',
  fileName = 'cursor-misconceptions-one-pager.pdf',
}) {
  const handleDownload = () => {
    trackBlogPdfDownload({
      slug,
      ctaId,
      fileName,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        my: 4,
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(217,98,43,0.12) 0%, rgba(31,27,22,0.9) 100%)'
            : 'linear-gradient(135deg, rgba(217,98,43,0.08) 0%, rgba(250,248,243,1) 100%)',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="overline" color="secondary" sx={{ fontWeight: 700 }}>
            Free download
          </Typography>
          <Typography variant="h6" component="p" sx={{ fontWeight: 700, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Button
          component="a"
          href={downloadPath}
          download={fileName}
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          Download PDF
        </Button>
      </Stack>
    </Paper>
  );
}
