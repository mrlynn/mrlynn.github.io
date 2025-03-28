'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import CredlyBadge from './CredlyBadge';

export default function Certifications() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Certifications
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
          Professional certifications and achievements
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  MongoDB Certifications
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 4, 
                  flexWrap: 'wrap', 
                  justifyContent: 'center',
                  mt: 2
                }}>
                  <CredlyBadge badgeId="4e0273eb-a641-4a76-80b0-f5e0db12b4ab" />
                  <CredlyBadge badgeId="833ef744-f741-45bd-857a-4023517b16bf" />
                  <CredlyBadge badgeId="0a059146-6f29-42ba-b438-9bc1bfe7d0cb" />
                  <CredlyBadge badgeId="a5c70efa-5e60-4430-b19c-0674fa71041c" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 