'use client';

import { Box, Container, useTheme } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import TalkToMyAI from '../../components/TalkToMyAI';

export default function AskAIPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 12,
        pb: 8,
        background: isDark
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(6, 182, 212, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(6, 182, 212, 0.03) 100%)',
      }}
    >
      <PageHeader
        title="Ask My AI"
        subtitle="Ask questions about my experience, projects, and expertise — or copy a prompt to use with your favorite LLM."
      />
      <Container maxWidth="md">
        <TalkToMyAI variant="full" />
      </Container>
    </Box>
  );
}
