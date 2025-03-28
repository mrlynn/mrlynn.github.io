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
    description: 'In my current role at MongoDB, I\'m dedicated to empowering developers and internal technical teams by delivering hands-on enablement content focused heavily on Artificial Intelligence (AI), MongoDB Atlas, and MongoDB Vector Search. I actively design labs, interactive workshops, and comprehensive training programs that simplify and demonstrate how developers can practically leverage these advanced technologies in real-world scenarios.',
    responsibilities: [
      'Artificial Intelligence & MongoDB Integration: Built practical demonstrations and sample applications to showcase how developers can implement AI-driven solutions using MongoDB Atlas, MongoDB Vector Search, and advanced AI techniques, enabling more intelligent applications and improved user experiences.',
      'Vector Search Enablement: Created comprehensive learning resources and interactive labs that educate developers on MongoDB Vector Search, including semantic search use cases, retrieval-augmented generation (RAG) strategies, and integration with leading AI models like OpenAI.',
      'Educational Content & Community Engagement: Produced technical screencasts, articles, podcasts, and live streams focused explicitly on Data Modeling, AI implementation, MongoDB\'s innovative data platform capabilities, and emerging developer trends.',
      'Technical Advisory & Mentorship: Mentored developers, founders, and technical stakeholders, assisting them in adopting and successfully integrating advanced MongoDB features and AI technologies into their software projects.',
      'MongoDB for Startups Program: Contributed to the launch and growth of the MongoDB for Startups initiative, guiding early-stage companies.',
      'Created and produced the MongoDB Podcast, featuring interviews with industry leaders and technical deep-dives into MongoDB technologies.'
    ]
  },
  {
    title: 'Sr. Solutions Architect',
    company: 'MongoDB',
    location: 'Greater New York City Area',
    period: 'Jan 2016 - Mar 2018',
    description: 'Responsible for guiding and informing customers and users throughout the process of designing and building reliable, scalable systems using MongoDB.',
    responsibilities: [
      'Design systems, applications, and infrastructure to help drive some of the world\'s largest software development projects leveraging MongoDB',
      'Advise customers on architectures, patterns, and strategies for making best use of MongoDB',
      'Partner with our sales team to help ensure success in accounts ranging from small startups to large enterprises',
      'Lead proof of concept implementations from concept through execution',
      'Translate technical concepts and patterns into business benefits for management and executives',
      'Work with the enablement team to produce and deliver content to educate newly hired MongoDB team members',
      'Curate, develop and deliver field enablement and education content to train MongoDB employees'
    ]
  },
  {
    title: 'Co-Organizer - MongoDB Community User Group (PhillyMUG)',
    company: 'MongoDB',
    location: 'Philadelphia, PA',
    period: 'Jun 2015 - Present',
    description: 'Building and driving increased awareness of MongoDB\'s Database Platform and tools and related NoSQL technologies in and around the Philadelphia Area.',
    responsibilities: [
      'Organize and facilitate monthly meetup sessions for the Philadelphia MongoDB User Group',
      'Identify and coordinate with speakers for technical presentations and workshops',
      'Build and deliver technical presentations on MongoDB features and best practices',
      'Foster a vibrant community of MongoDB developers in the Philadelphia region',
      'Create hands-on workshops and learning opportunities for the local developer community'
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
  'Artificial Intelligence (AI)',
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
  'Solutions Architecture',
  'Python',
  'Technical Writing'
];

export default function Resume() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const paperStyle = {
    p: { xs: 2, sm: 3 },
    mb: { xs: 2, sm: 3 },
    background: isDark ? 'rgba(6, 39, 54, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    color: theme.palette.text.primary,
  };

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
            color: theme.palette.text.primary,
          }}
        >
          Professional Experience: Michael Lynn
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            color: theme.palette.text.secondary,
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
              sx={paperStyle}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  color: theme.palette.text.primary,
                }}
              >
                {exp.title}
              </Typography>
              <Typography 
                variant="subtitle1" 
                gutterBottom
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: theme.palette.text.secondary,
                }}
              >
                {exp.company} | {exp.location} | {exp.period}
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: theme.palette.text.primary,
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
                          color: theme.palette.text.primary,
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
              ...paperStyle,
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
                color: theme.palette.text.primary,
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
                    color: isDark ? 'white' : 'black',
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