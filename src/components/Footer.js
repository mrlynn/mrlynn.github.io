'use client';

import { Box, Container, Typography, Link as MuiLink, useTheme } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';
import NextLink from 'next/link';
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '../lib/navigation';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const theme = useTheme();

  const linkSx = {
    display: 'inline-block',
    py: 0.4,
    fontSize: '0.9375rem',
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': { color: theme.palette.primary.main },
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 10, md: 16 },
        borderTop: `1px solid ${theme.palette.border.subtle}`,
        background: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 9 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, md: 6 },
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: '1.4fr repeat(4, 1fr)',
            },
          }}
        >
          {/* Identity */}
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Typography
              component="p"
              sx={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                mb: 1,
              }}
            >
              Michael Lynn
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9375rem',
                color: theme.palette.text.secondary,
                maxWidth: 280,
                lineHeight: 1.6,
              }}
            >
              AI Adoption Engineer at Cursor. I help developers and teams build
              with AI and modern data platforms.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5 }}>
              <MuiLink
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
              >
                <GitHubIcon sx={{ fontSize: 22 }} />
              </MuiLink>
              <MuiLink
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
              >
                <LinkedInIcon sx={{ fontSize: 22 }} />
              </MuiLink>
            </Box>
          </Box>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <Box key={column.title} component="nav" aria-label={column.title}>
              <Typography
                component="h2"
                sx={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: theme.palette.primary.main,
                  mb: 1.75,
                }}
              >
                {column.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {column.links.map((link) =>
                  link.external ? (
                    <MuiLink
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={linkSx}
                    >
                      {link.label}
                    </MuiLink>
                  ) : (
                    <MuiLink
                      key={link.href}
                      component={NextLink}
                      href={link.href}
                      sx={linkSx}
                    >
                      {link.label}
                    </MuiLink>
                  )
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 3,
            borderTop: `1px solid ${theme.palette.border.subtle}`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: theme.palette.text.secondary,
            }}
          >
            © {YEAR} Michael Lynn
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: theme.palette.text.secondary,
            }}
          >
            Built with Next.js · Deployed on Vercel
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
