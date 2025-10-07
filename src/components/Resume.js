'use client';

import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, Chip, Stack, Divider, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const experiences = [
  {
    title: 'Principal Developer Advocate, Instructional Developer Advocacy Team',
    company: 'MongoDB',
    location: 'New York City Metropolitan Area',
    period: 'Mar 2018 - Present',
    description: 'Leading enterprise developer enablement and AI strategy, empowering Fortune 500 development teams to build production-scale AI applications on modern data platforms.',
    highlights: 'Enterprise Developer Enablement & AI Strategy',
    responsibilities: [
      'Led enterprise account enablement for AI + MongoDB integration across Fortune 500 clients, designing custom workshops on vector search, RAG pipelines, and schema optimization for AI workloads',
      'Delivered campus-scale developer events (100-500+ attendees) teaching modern AI architectures, including hands-on labs for migrating vector workloads and building production AI applications',
      'Created comprehensive training curricula for MongoDB\'s global field teams, solution architects, and partner ecosystem, improving technical win rates by enabling developer-first conversations',
      'Developed end-to-end AI tutorials demonstrating semantic search, hybrid search, and RAG implementations, resulting in high-impact video content with 50K+ developer views'
    ],
    secondaryHighlight: 'Product Strategy & Developer Feedback',
    secondaryResponsibilities: [
      'Piloted pre-GA AI features with enterprise development teams, providing actionable feedback to engineering that influenced MongoDB Atlas Vector Search roadmap and developer experience improvements',
      'Represented voice of the developer in product requirement discussions, ensuring AI-focused database features solved real-world developer friction points',
      'Built AI-assisted development environments using modern tooling (Cursor, GitHub Copilot) to accelerate proof-of-concept delivery and developer onboarding'
    ],
    tertiaryHighlight: 'Technical Content & Community Leadership',
    tertiaryResponsibilities: [
      'Authored technical content on AI + database integration best practices, published across MongoDB\'s developer channels and third-party publications',
      'Organized and spoke at major developer conferences and meetups, building MongoDB\'s presence in the AI developer community',
      'Co-organized Philadelphia MongoDB User Group (PhillyMUG), growing local developer community and delivering monthly technical demos'
    ]
  },
  {
    title: 'Senior Solutions Architect',
    company: 'MongoDB',
    location: 'New York City Metropolitan Area',
    period: 'Jan 2016 - Mar 2018',
    description: 'Led enterprise technical consulting and proof-of-concept development, partnering with sales teams to design and deliver scalable MongoDB architectures for Fortune 500 clients and high-growth startups.',
    highlights: 'Enterprise Technical Consulting & POC Development',
    responsibilities: [
      'Designed and delivered custom proof-of-concepts for enterprise clients ranging from Fortune 500 to high-growth startups, translating business requirements into scalable MongoDB architectures',
      'Partnered with sales teams to optimize technical presentations for business outcomes, consistently achieving technical wins in competitive enterprise deals',
      'Mentored junior solutions consultants on developer-first best practices, schema design principles, and customer engagement strategies',
      'Developed internal enablement materials used by global pre-sales teams for technical training and customer workshops'
    ]
  },
  {
    title: 'Co-Organizer',
    company: 'Philadelphia MongoDB User Group (PhillyMUG)',
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
    description: 'Implemented enterprise customer experience solutions leveraging API integrations, data pipelines, and custom frontend development for B2B SaaS scenarios.',
    highlights: 'SaaS Platform Integration & Customer Experience',
    responsibilities: [
      'Implemented enterprise customer experience solutions leveraging API integrations, data pipelines, and custom frontend development',
      'Created scalable demo environments for complex B2B SaaS scenarios, enabling consistent technical storytelling across sales teams',
      'Collaborated with product teams to translate customer feedback into product roadmap priorities'
    ]
  }
];

const skillCategories = [
  {
    category: 'AI & Data Technologies',
    skills: [
      'MongoDB Atlas Vector Search',
      'RAG Architecture',
      'In-Database ML',
      'Semantic Search',
      'LLM Integration',
      'AI-Assisted Development'
    ]
  },
  {
    category: 'Database Expertise',
    skills: [
      'MongoDB (Expert)',
      'NoSQL',
      'Vector Databases',
      'Database Schema Design',
      'Migration Strategies'
    ]
  },
  {
    category: 'Developer Enablement',
    skills: [
      'Technical Content Creation',
      'Workshop Design',
      'Campus-Scale Events',
      'Field Team Training'
    ]
  },
  {
    category: 'Enterprise Solutions',
    skills: [
      'Solution Architecture',
      'Pre-Sales Technical Consulting',
      'Customer Success',
      'POC Development'
    ]
  },
  {
    category: 'Programming',
    skills: [
      'JavaScript/TypeScript',
      'Python',
      'SQL',
      'Java',
      'API Development',
      'Cloud-Native Patterns'
    ]
  },
  {
    category: 'Communication',
    skills: [
      'Conference Speaking',
      'Technical Writing',
      'Video Content',
      'Developer Community Building'
    ]
  }
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
            fontWeight: 600,
          }}
        >
          Professional Experience
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            color: theme.palette.text.secondary,
            fontWeight: 400,
          }}
        >
          MongoDB Expert & AI-Driven Developer Advocate with 10+ years empowering enterprise development teams
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={8}>
          {experiences.map((exp, index) => (
            <MotionPaper
              key={`${exp.company}-${exp.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={paperStyle}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  color: theme.palette.text.primary,
                  fontWeight: 600,
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
                  mb: 2,
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
                  mb: 2,
                }}
              >
                {exp.description}
              </Typography>

              {exp.highlights && (
                <>
                  <Typography 
                    variant="subtitle2" 
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    {exp.highlights}
                  </Typography>
                  <List sx={{ py: 0, mb: 2 }}>
                    {exp.responsibilities.map((resp, i) => (
                      <ListItem 
                        key={i}
                        sx={{
                          py: { xs: 0.5, sm: 0.75 },
                          px: 0,
                          alignItems: 'flex-start',
                          '& .MuiListItemText-root': {
                            m: 0,
                          },
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            mr: 1,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            minWidth: '8px',
                          }}
                        >
                          •
                        </Typography>
                        <ListItemText 
                          primary={resp}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: { xs: '0.8rem', sm: '0.95rem' },
                              color: theme.palette.text.primary,
                              lineHeight: 1.6,
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {exp.secondaryHighlight && (
                <>
                  <Typography 
                    variant="subtitle2" 
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    {exp.secondaryHighlight}
                  </Typography>
                  <List sx={{ py: 0, mb: 2 }}>
                    {exp.secondaryResponsibilities.map((resp, i) => (
                      <ListItem 
                        key={i}
                        sx={{
                          py: { xs: 0.5, sm: 0.75 },
                          px: 0,
                          alignItems: 'flex-start',
                          '& .MuiListItemText-root': {
                            m: 0,
                          },
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            mr: 1,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            minWidth: '8px',
                          }}
                        >
                          •
                        </Typography>
                        <ListItemText 
                          primary={resp}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: { xs: '0.8rem', sm: '0.95rem' },
                              color: theme.palette.text.primary,
                              lineHeight: 1.6,
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {exp.tertiaryHighlight && (
                <>
                  <Typography 
                    variant="subtitle2" 
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    {exp.tertiaryHighlight}
                  </Typography>
                  <List sx={{ py: 0 }}>
                    {exp.tertiaryResponsibilities.map((resp, i) => (
                      <ListItem 
                        key={i}
                        sx={{
                          py: { xs: 0.5, sm: 0.75 },
                          px: 0,
                          alignItems: 'flex-start',
                          '& .MuiListItemText-root': {
                            m: 0,
                          },
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            mr: 1,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            minWidth: '8px',
                          }}
                        >
                          •
                        </Typography>
                        <ListItemText 
                          primary={resp}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: { xs: '0.8rem', sm: '0.95rem' },
                              color: theme.palette.text.primary,
                              lineHeight: 1.6,
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {!exp.highlights && exp.responsibilities && (
                <List sx={{ py: 0 }}>
                  {exp.responsibilities.map((resp, i) => (
                    <ListItem 
                      key={i}
                      sx={{
                        py: { xs: 0.5, sm: 0.75 },
                        px: 0,
                        alignItems: 'flex-start',
                        '& .MuiListItemText-root': {
                          m: 0,
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          mr: 1,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          minWidth: '8px',
                        }}
                      >
                        •
                      </Typography>
                      <ListItemText 
                        primary={resp}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: { xs: '0.8rem', sm: '0.95rem' },
                            color: theme.palette.text.primary,
                            lineHeight: 1.6,
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </MotionPaper>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: { xs: 'relative', md: 'sticky' },
              top: { md: 24 },
            }}
          >
            <MotionPaper
              initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={paperStyle}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Core Competencies
              </Typography>
              
              {skillCategories.map((category, catIndex) => (
                <Box key={category.category} sx={{ mb: 3 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mb: 1.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {category.category}
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    flexWrap="wrap" 
                    useFlexGap
                    sx={{ gap: { xs: 0.5, sm: 1 } }}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <Chip
                        key={`${catIndex}-${skillIndex}`}
                        label={skill}
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                          background: isDark 
                            ? 'linear-gradient(135deg, rgba(0, 104, 94, 0.3) 0%, rgba(0, 73, 66, 0.3) 100%)'
                            : 'linear-gradient(135deg, rgba(0, 237, 100, 0.15) 0%, rgba(0, 189, 242, 0.15) 100%)',
                          color: theme.palette.text.primary,
                          border: `1px solid ${isDark ? 'rgba(0, 237, 100, 0.2)' : 'rgba(0, 104, 94, 0.2)'}`,
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          fontWeight: 500,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            background: isDark
                              ? 'linear-gradient(135deg, rgba(0, 104, 94, 0.5) 0%, rgba(0, 73, 66, 0.5) 100%)'
                              : 'linear-gradient(135deg, rgba(0, 237, 100, 0.25) 0%, rgba(0, 189, 242, 0.25) 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: isDark 
                              ? '0 4px 8px rgba(0, 237, 100, 0.2)'
                              : '0 4px 8px rgba(0, 104, 94, 0.2)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                  {catIndex < skillCategories.length - 1 && (
                    <Divider sx={{ mt: 2.5, opacity: 0.3 }} />
                  )}
                </Box>
              ))}
            </MotionPaper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
} 