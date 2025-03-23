'use client';

import { Container, Typography, Box, Button, Grid, Paper, useTheme } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@mui/icons-material';

export default function Contact() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 12,
        pb: 8,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              fontWeight: 600,
            }}
          >
            Connect With Me
          </Typography>
          <Typography 
            variant="h6" 
            sx={{
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            Find me on social media or reach out through your preferred platform
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(6, 39, 54, 0.9)'
                  : '#ffffff',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/mrlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    GitHub
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<LinkedInIcon />}
                    href="https://linkedin.com/in/mlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    LinkedIn
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<TwitterIcon />}
                    href="https://twitter.com/@mlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    Twitter
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<InstagramIcon />}
                    href="https://instagram.com/mlynn_stagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    Instagram
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 