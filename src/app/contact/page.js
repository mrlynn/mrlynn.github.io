'use client';

import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@mui/icons-material';

export default function Contact() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Connect With Me
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find me on social media or reach out through your preferred platform
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/mrlynn"
                  target="_blank"
                  rel="noopener noreferrer"
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
                >
                  Instagram
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 