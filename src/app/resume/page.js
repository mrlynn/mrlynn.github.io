'use client';

import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, Chip, Stack, Divider, useTheme, useMediaQuery, Link, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'framer-motion';
import Certifications from '../../components/Certifications';
import PageHeader from '../../components/PageHeader';

const MotionPaper = motion(Paper);

const contactLinks = [
  { label: 'linkedin.com/in/mlynn', href: 'https://linkedin.com/in/mlynn' },
  { label: 'github.com/mrlynn', href: 'https://github.com/mrlynn' },
  { label: '@mlynn', href: 'https://twitter.com/mlynn' },
];

const coreStrengths = [
  'Enterprise AI Deployment & Adoption Strategy',
  'Developer Workflow Optimization & SDLC Integration',
  'Executive Stakeholder Engagement (VP, CTO)',
  'Strategic Account Planning & Expansion',
  'RAG Architectures & Vector Search',
  'Prompt Strategy & AI Context Configuration',
  'Cross-Functional Post-Sale Leadership',
  'Technical Enablement & Workshop Design',
];

const mongodbPrincipalResponsibilities = [
  'Partner with VP Engineering and CTO stakeholders to align AI and data platform adoption with business and engineering objectives',
  'Design and deliver Developer Day programs used globally to drive hands-on product adoption and usage growth',
  'Advise enterprise engineering teams on AI architecture patterns including RAG, vector search, semantic retrieval, and agent workflows',
  'Collaborate with Field Engineering and Sales to deliver seamless post-sale onboarding and expansion',
  'Translate structured customer feedback into product roadmap influence across AI and search capabilities',
  'Track engagement signals and technical maturity to identify expansion opportunities',
];

const enterpriseAiRolloutItems = [
  'Guided engineering teams in production deployment of RAG-based systems using MongoDB Vector Search',
  'Developed repeatable AI enablement playbooks for secure and compliant environments including HIPAA workloads',
  'Led architecture whiteboarding sessions integrating AI workflows into existing SDLC pipelines',
  'Built open-source tooling adopted by developers implementing retrieval-augmented systems',
];

const worldwideDirectorItems = [
  'Led global developer advocacy organization, setting strategy for developer engagement, content, and community growth',
  'Built and managed distributed teams focused on developer adoption and technical enablement',
  'Established scalable programs to drive product awareness and hands-on usage across regions',
];

const seniorSolutionsArchitectItems = [
  'Advised enterprise engineering teams on production architecture, performance optimization, and cloud migration strategy',
  'Led cross-functional engagements spanning development, platform engineering, security, and executive stakeholders',
  'Drove adoption across large engineering organizations through structured onboarding and technical workshops',
  'Served as escalation point for complex architectural and deployment challenges',
];

const fortune50Responsibilities = [
  'Led global distributed engineering teams responsible for platform stability, scalability, and security',
  'Drove automation and standardization initiatives improving operational efficiency and deployment consistency',
  'Partnered with application and business leadership to align infrastructure strategy with enterprise goals',
  'Managed large-scale infrastructure environments supporting high-availability financial systems',
];

const enterpriseImpact = [
  'Enabled AI and vector search adoption across Fortune 500 financial services organizations',
  'Delivered hands-on enablement programs reaching thousands of developers globally',
  'Influenced product roadmap through structured enterprise feedback loops',
  'Built open-source tooling simplifying RAG implementation with MongoDB Atlas',
];

const projects = [
  {
    name: 'mongodb-rag',
    description: 'Open-source NPM library simplifying vector similarity search, caching, batch processing, and indexing for RAG applications.',
  },
  {
    name: 'VAI (Voyage AI)',
    description: 'AI-powered workflow template platform integrating semantic code search and MCP server capabilities.',
  },
  {
    name: 'MongoDB Next - NextJS Scaffolding framework',
    description: 'App Framework and scaffold to enable developers to efficiently create applications with NextJS and MongoDB',
  },
  {
    name: 'MongoDB Developer Days',
    description: 'Global hands-on workshop curriculum covering data modeling, aggregation, vector search, and AI application patterns.',
  },
  {
    name: 'Design Review Technical Enablement',
    description: 'Built from scratch 120 page, 12 category LMS designed to enable internal technical staff to deliver effective design reviews with enterprise software architects and engineers.',
  },
];

const technicalSkills = {
  'Data & AI Platforms': [
    'MongoDB Atlas',
    'Vector Search',
    'Atlas Search',
    'Queryable Encryption',
    'Aggregation Pipelines',
    'Change Streams',
    'Atlas Data Federation',
  ],
  'AI & Machine Learning': [
    'Retrieval-Augmented Generation',
    'Embedding Models',
    'Semantic Search',
    'AI Agent Workflows',
    'LLM Integration',
    'Prompt Engineering',
  ],
  'Development': [
    'JavaScript',
    'Node.js',
    'Python',
    'React',
    'Next.js',
    'REST APIs',
    'Model Context Protocol',
  ],
  'Infrastructure & DevOps': [
    'Kubernetes',
    'Docker',
    'AWS',
    'GCP',
    'Azure',
    'UNIX/Linux Systems Engineering',
  ],
  'Developer Productivity': [
    'AI-assisted development workflows',
    'enterprise rollout strategy',
    'workshop facilitation',
    'executive technical briefings',
  ],
};

const speakingItems = [
  'Speaker at AWS re:Invent and MongoDB.local on AI and data platform evolution',
  'Frequent presenter, founder and leader MongoDB User Groups and enterprise workshops',
  'Co-host of The MongoDB Podcast with 160+ episodes focused on developer tooling and applied AI',
  'Author of technical writing on AI, vector search, and database best practices',
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

  const sectionTitleProps = {
    variant: 'h5',
    gutterBottom: true,
    sx: {
      fontSize: { xs: '1.5rem', sm: '1.75rem' },
      color: theme.palette.text.primary,
    },
  };

  const renderListItems = (items) => (
    <List sx={{ py: 0 }}>
      {items.map((item, i) => (
        <ListItem
          key={i}
          sx={{
            py: { xs: 0.5, sm: 1 },
            '& .MuiListItemText-root': { m: 0 },
          }}
        >
          <ListItemText
            primary={item}
            primaryTypographyProps={{
              sx: {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                color: theme.palette.text.primary,
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box>
      <PageHeader
        title="Resume"
        subtitle="Professional experience, skills, and certifications"
      />

      <Container maxWidth="lg" sx={{ pt: 2, pb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <Button
            component={Link}
            href="/Michael_Lynn_Resume.pdf"
            download="Michael_Lynn_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Download PDF Resume
          </Button>
        </Box>
        {/* Contact & Header */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            ...paperStyle,
            mb: { xs: 4, md: 6 },
            p: { xs: 3, sm: 4 },
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Michael Lynn
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Philadelphia, PA
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1, mb: 2 }}>
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                underline="hover"
                sx={{ fontSize: '0.875rem' }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Enterprise AI Deployment & Developer Productivity Leader
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              lineHeight: 1.6,
              color: theme.palette.text.primary,
            }}
          >
            Enterprise AI DevRel leader helping engineering organizations adopt intelligent developer tooling at scale. 25+ years of experience across software engineering, infrastructure, enterprise architecture, and developer platforms. Currently driving strategic AI adoption at MongoDB for priority enterprise accounts in financial services, healthcare, and retail. Trusted partner to VP Engineering and CTO stakeholders on rollout strategy, developer enablement, and measurable productivity outcomes.
          </Typography>
        </MotionPaper>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={8}>
            {/* Core Strengths */}
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              sx={paperStyle}
            >
              <Typography {...sectionTitleProps}>Core Strengths</Typography>
              <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 0.75 }}>
                {coreStrengths.map((strength, index) => (
                  <Chip
                    key={index}
                    label={strength}
                    size="small"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      height: { xs: 24, sm: 28 },
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                ))}
              </Stack>
            </MotionPaper>

            {/* MongoDB Experience */}
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={paperStyle}
            >
              <Typography {...sectionTitleProps}>MongoDB</Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: theme.palette.text.secondary }}
              >
                Philadelphia, PA | 10+ Years
              </Typography>

              <Typography variant="h6" sx={{ mt: 2, mb: 1, fontSize: '1.1rem' }}>
                Principal Staff Developer Advocate — Manager, Strategic Developer Relations
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: theme.palette.text.primary }}>
                Lead AI adoption and developer enablement for MongoDB&apos;s priority enterprise accounts across financial services, healthcare, and retail.
              </Typography>
              {renderListItems(mongodbPrincipalResponsibilities)}

              <Typography variant="h6" sx={{ mt: 2, mb: 1, fontSize: '1rem' }}>
                Enterprise AI Rollout & Enablement
              </Typography>
              {renderListItems(enterpriseAiRolloutItems)}

              <Typography variant="h6" sx={{ mt: 2, mb: 1, fontSize: '1rem' }}>
                Worldwide Director of Developer Advocacy
              </Typography>
              {renderListItems(worldwideDirectorItems)}

              <Typography variant="h6" sx={{ mt: 2, mb: 1, fontSize: '1rem' }}>
                Senior Solutions Architect
              </Typography>
              {renderListItems(seniorSolutionsArchitectItems)}
            </MotionPaper>

            {/* Fortune 50 Experience */}
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              sx={paperStyle}
            >
              <Typography {...sectionTitleProps}>Fortune 50 Financial Services Firm</Typography>
              <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
                Vice President & Global Head of UNIX Engineering
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: theme.palette.text.primary }}>
                Owned global platform engineering strategy supporting mission-critical financial workloads.
              </Typography>
              {renderListItems(fortune50Responsibilities)}
            </MotionPaper>

            {/* Selected Enterprise Impact */}
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={paperStyle}
            >
              <Typography {...sectionTitleProps}>Selected Enterprise Impact</Typography>
              <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
              {renderListItems(enterpriseImpact)}
            </MotionPaper>

            {/* Selected Projects */}
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              sx={paperStyle}
            >
              <Typography {...sectionTitleProps}>Selected Projects</Typography>
              <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
              {projects.map((project, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {project.description}
                  </Typography>
                </Box>
              ))}
            </MotionPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: { xs: 'static', md: 'sticky' }, top: { md: 24 } }}>
              {/* Technical Skills */}
              <MotionPaper
                initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                sx={{ ...paperStyle, mb: { xs: 2, md: 3 } }}
              >
                <Typography {...sectionTitleProps}>Technical Skills</Typography>
                <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
                {Object.entries(technicalSkills).map(([category, skills]) => (
                  <Box key={category} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.85rem' }}>
                      {category}
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ gap: 0.5 }}>
                      {skills.map((skill, i) => (
                        <Chip
                          key={i}
                          label={skill}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            height: 22,
                            m: 0.25,
                            background: theme.palette.background.gradient,
                            color: isDark ? 'white' : 'black',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </MotionPaper>

              {/* Speaking & Publications */}
              <MotionPaper
                initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                sx={{ ...paperStyle, mb: { xs: 2, md: 3 } }}
              >
                <Typography {...sectionTitleProps}>Speaking & Publications</Typography>
                <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
                {renderListItems(speakingItems)}
              </MotionPaper>

              {/* Education & Professional Development */}
              <MotionPaper
                initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                sx={paperStyle}
              >
                <Typography {...sectionTitleProps}>Education & Professional Development</Typography>
                <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, lineHeight: 1.6 }}>
                  Ongoing professional development in artificial intelligence, machine learning, and modern application architecture. 25+ years of applied experience across enterprise infrastructure, software development, and data engineering.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary, fontStyle: 'italic' }}>
                  References available upon request.
                </Typography>
              </MotionPaper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Certifications />
    </Box>
  );
}
