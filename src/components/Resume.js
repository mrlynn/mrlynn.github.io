'use client';

import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, Chip, Stack, Divider, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const experiences = [
  {
    title: 'Principal Developer Advocate',
    company: 'MongoDB',
    location: 'Greater New York City Area',
    period: 'Mar 2018 - Present',
    description: 'As a Principal Developer Advocate in the Instructional Developer Advocacy team at MongoDB, I empower developers and internal technical teams by delivering hands-on enablement content focused heavily on Artificial Intelligence (AI), MongoDB Atlas, and MongoDB Vector Search. I design labs, interactive workshops, and comprehensive training programs that simplify and demonstrate how developers can practically leverage these advanced technologies in real-world scenarios.',
    responsibilities: [
      'Artificial Intelligence & MongoDB Integration: Built practical demonstrations and sample applications to showcase how developers can implement AI-driven solutions using MongoDB Atlas, MongoDB Vector Search, and advanced AI techniques.',
      'Vector Search Enablement: Created comprehensive learning resources and interactive labs that educate developers on MongoDB Vector Search, including semantic search use cases, retrieval-augmented generation (RAG) strategies, and integration with leading AI models.',
      'Educational Content & Community Engagement: Produced technical screencasts, articles, podcasts, and live streams focused on AI implementation, MongoDB\'s innovative data platform capabilities, and emerging developer trends.',
      'Technical Advisory & Mentorship: Mentored developers, founders, and technical stakeholders, assisting them in adopting and successfully integrating advanced MongoDB features and AI technologies.',
      'MongoDB for Startups Program: Contributed to the launch and growth of the MongoDB for Startups initiative, guiding early-stage companies on integrating AI and MongoDB technologies effectively.',
      'Build and nurture the MongoDB Developer Community through content, conference speaking, and curriculum designed to educate and inspire'
    ]
  },
  {
    title: 'Sr. Solutions Architect',
    company: 'MongoDB',
    location: 'Greater New York City Area',
    period: 'Jan 2016 - Mar 2018',
    description: 'Responsible for guiding and informing customers and users throughout the process of designing and building reliable, scalable systems using MongoDB.',
    responsibilities: [
      'Design systems, applications, and infrastructure for world\'s largest software development projects',
      'Advise customers on architectures, patterns, and strategies for MongoDB best practices',
      'Partner with sales team to ensure success in accounts ranging from startups to enterprises',
      'Lead proof of concept implementations from concept through execution',
      'Translate technical concepts into business benefits for management and executives',
      'Curate and deliver field enablement content to train MongoDB employees'
    ]
  },
  {
    title: 'Solutions Consultant',
    company: 'Medallia, Inc.',
    location: 'Yardley, PA',
    period: 'Jun 2013 - Dec 2015',
    description: 'Worked with businesses to measure and improve customer experience in real time through software solutions.',
    responsibilities: [
      'Drive strategy and execution of Medallia\'s referral, resell and service delivery partnerships',
      'Develop product integration, business models and sales enablement plans',
      'Create custom solutions and demonstrations for various verticals and industries'
    ]
  }
];

const skills = [
  'Large Language Models (LLM)',
  'Data Modeling',
  'AI/ML',
  'Vector Search',
  'MongoDB',
  'JavaScript',
  'Node.js',
  'Developer Advocacy',
  'Technical Training',
  'Public Speaking',
  'Podcasting',
  'Content Creation',
  'Team Leadership',
  'Community Building',
  'Photoshop',
  'Python',
  'iOS Mobile Development'
];

export default function Resume() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            lineHeight: 1.2,
          }}
        >
          Professional Experience
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          A track record of technical leadership and innovation in developer advocacy and solutions architecture
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={8}>
          {experiences.map((exp, index) => (
            <MotionPaper
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                p: { xs: 2, sm: 3 },
                mb: { xs: 2, sm: 3 },
                background: 'rgba(6, 39, 54, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                }}
              >
                {exp.title}
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                gutterBottom
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                {exp.company} | {exp.location} | {exp.period}
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                {exp.description}
              </Typography>
              <List sx={{ py: 0 }}>
                {exp.responsibilities.map((resp, i) => (
                  <ListItem 
                    key={i}
                    sx={{
                      py: { xs: 0.5, sm: 1 },
                      '& .MuiListItemText-root': {
                        m: 0,
                      },
                    }}
                  >
                    <ListItemText 
                      primary={resp}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </MotionPaper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <MotionPaper
            initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              p: { xs: 2, sm: 3 },
              background: 'rgba(6, 39, 54, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: { xs: 'sticky', md: 'static' },
              top: { xs: 16, sm: 24 },
              zIndex: 1,
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
              }}
            >
              Skills & Expertise
            </Typography>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Stack 
              direction="row" 
              spacing={1} 
              flexWrap="wrap" 
              useFlexGap
              sx={{
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    m: 0.5,
                    background: theme.palette.background.gradient,
                    color: 'white',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    height: { xs: 24, sm: 32 },
                    '&:hover': {
                      opacity: 0.9,
                    },
                  }}
                />
              ))}
            </Stack>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
} 