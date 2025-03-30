'use client';

import { Container, Typography, Grid, Card, CardContent, Box, Chip, Stack } from '@mui/material';
import { mongodbTalks } from '../../../data/mongodb-talks';
import { mongodbProjects } from '../../../data/mongodb-projects';
import { format } from 'date-fns';
import CredlyBadge from '../../../components/CredlyBadge';

export default function MongoDBExpertise() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          MongoDB Expertise
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Deep knowledge and experience in MongoDB development, optimization, and community engagement
        </Typography>

        {/* Certifications */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Certifications
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    MongoDB Certifications
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <CredlyBadge badgeId="4e0273eb-a641-4a76-80b0-f5e0db12b4ab" />
                    <CredlyBadge badgeId="833ef744-f741-45bd-857a-4023517b16bf" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Featured Projects */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Projects
          </Typography>
          <Grid container spacing={4}>
            {mongodbProjects
              .filter(project => project.featured)
              .map((project) => (
                <Grid item xs={12} md={6} key={project.title}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {project.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>

        {/* Speaking Engagements */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Speaking Engagements
          </Typography>
          <Grid container spacing={4}>
            {mongodbTalks.map((talk) => (
              <Grid item xs={12} key={talk.title}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {talk.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {talk.event} • {format(new Date(talk.date), 'MMMM d, yyyy')} • {talk.location}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {talk.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {talk.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Skills and Expertise */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Skills and Expertise
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Technical Skills
                  </Typography>
                  <Stack spacing={2}>
                    <Typography variant="body1">
                      • MongoDB Atlas and Cloud Services
                    </Typography>
                    <Typography variant="body1">
                      • Schema Design and Data Modeling
                    </Typography>
                    <Typography variant="body1">
                      • Performance Optimization
                    </Typography>
                    <Typography variant="body1">
                      • Aggregation Pipelines
                    </Typography>
                    <Typography variant="body1">
                      • Change Streams and Real-time Data
                    </Typography>
                    <Typography variant="body1">
                      • Atlas Search and Vector Search
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Community Engagement
                  </Typography>
                  <Stack spacing={2}>
                    <Typography variant="body1">
                      • Technical Writing and Documentation
                    </Typography>
                    <Typography variant="body1">
                      • Conference Speaking
                    </Typography>
                    <Typography variant="body1">
                      • Workshop Facilitation
                    </Typography>
                    <Typography variant="body1">
                      • Open Source Contributions
                    </Typography>
                    <Typography variant="body1">
                      • Developer Support
                    </Typography>
                    <Typography variant="body1">
                      • Community Building
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
} 