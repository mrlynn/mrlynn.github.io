'use client';

import { Box, Container, Divider, Grid, Link as MuiLink, Typography, useTheme } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';
import CalendarBooking from '../../components/CalendarBooking';
import Eyebrow from '../../components/common/Eyebrow';
import { SECTION_RHYTHM } from '../../components/common/Section';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../../lib/navigation';

const reasons = [
  {
    title: 'AI enablement and training',
    body: 'Building curriculum for engineering teams, field teams, or everyone else in the company. This is the work described on the consulting page.',
    href: '/consulting',
    hrefLabel: 'See what that looks like',
  },
  {
    title: 'Speaking',
    body: 'Conferences, meetups, and internal engineering events. I have done about two hundred of these, and I still write every talk from scratch.',
    href: '/speaking',
    hrefLabel: 'Past engagements',
  },
  {
    title: 'Something you are building',
    body: 'If you want another pair of eyes on a data or AI problem, or you just want to argue about retrieval, book the time. No agenda required.',
  },
];

export default function ContactPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: SECTION_RHYTHM.normal }}>
      <Grid container spacing={{ xs: 6, md: 8 }}>
        <Grid item xs={12} md={5}>
          <Eyebrow>Get in touch</Eyebrow>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              mt: 2.5,
              mb: 2.5,
            }}
          >
            Book a call.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.05rem', md: '1.15rem' },
              lineHeight: 1.7,
              color: theme.palette.text.secondary,
              mb: 5,
            }}
          >
            The calendar is the fastest way to reach me. Thirty minutes, and you
            do not need a polished pitch to take one.
          </Typography>

          <Box component="dl" sx={{ m: 0 }}>
            {reasons.map((reason, i) => (
              <Box key={reason.title} sx={{ pt: i === 0 ? 0 : 3 }}>
                {i > 0 && <Divider sx={{ mb: 3, borderColor: theme.palette.border.subtle }} />}
                <Typography
                  component="dt"
                  sx={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    mb: 1,
                  }}
                >
                  {reason.title}
                </Typography>
                <Typography
                  component="dd"
                  sx={{ m: 0, color: theme.palette.text.secondary, lineHeight: 1.7 }}
                >
                  {reason.body}
                  {reason.href && (
                    <>
                      {' '}
                      <MuiLink
                        href={reason.href}
                        sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                      >
                        {reason.hrefLabel}
                      </MuiLink>
                    </>
                  )}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4, borderColor: theme.palette.border.subtle }} />

          <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.7, mb: 2 }}>
            If a call is the wrong shape for it, these work too.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <MuiLink
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                color: theme.palette.text.primary,
                width: 'fit-content',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              <LinkedInIcon sx={{ fontSize: 20 }} /> linkedin.com/in/mlynn
            </MuiLink>
            <MuiLink
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                color: theme.palette.text.primary,
                width: 'fit-content',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              <GitHubIcon sx={{ fontSize: 20 }} /> github.com/mrlynn
            </MuiLink>
            {CONTACT_EMAIL && (
              <MuiLink
                href={`mailto:${CONTACT_EMAIL}`}
                sx={{
                  color: theme.palette.text.primary,
                  width: 'fit-content',
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                {CONTACT_EMAIL}
              </MuiLink>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <CalendarBooking variant="iframe" />
        </Grid>
      </Grid>
    </Container>
  );
}
