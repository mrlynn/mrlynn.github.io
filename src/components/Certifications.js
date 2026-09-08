'use client';

import { Box, Link as MuiLink, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import SectionHeading from './common/SectionHeading';
import { certifications } from '../data/certifications';

export default function Certifications({
  eyebrow = 'Credentials',
  title = 'Certifications',
  intro = 'MongoDB skill badges. Each one links to the verifiable credential.',
}) {
  const theme = useTheme();

  return (
    <Box>
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2.5, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {certifications.map((cert) => (
          <MuiLink
            key={cert.id}
            href={`https://www.credly.com/badges/${cert.id}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.5,
              p: 2,
              borderRadius: '10px',
              border: `1px solid ${theme.palette.border.subtle}`,
              textDecoration: 'none',
              transition: 'border-color 0.2s, transform 0.2s',
              '&:hover': {
                borderColor: theme.palette.border.strong,
                transform: 'translateY(-3px)',
              },
            }}
          >
            <Box sx={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
              <Image
                src={cert.image}
                alt=""
                fill
                sizes="88px"
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: '0.82rem',
                lineHeight: 1.4,
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            >
              {cert.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: theme.palette.text.secondary,
                mt: 'auto',
              }}
            >
              MongoDB
            </Typography>
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
}
