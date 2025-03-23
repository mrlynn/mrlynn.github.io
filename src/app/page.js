'use client';

import { Box, Container, Typography, Button, Grid, Paper, Stack, useTheme } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Code as CodeIcon, Terminal as TerminalIcon, Cloud as CloudIcon } from '@mui/icons-material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectsSection from '@/components/ProjectsSection';
import VideosSection from '@/components/VideosSection';
import GitHubActivity from '@/components/GitHubActivity';
import Timeline from '@/components/Timeline';
import { projects } from '@/data/projects';
import { timelineEvents } from '@/data/timeline';
import Image from 'next/image';

// Create motion components using motion.create()
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionPaper = motion.create(Paper);

const titles = [
  "Creative Technologist",
  "Developer Advocate",
  "Passionate Teacher",
  "Open Source Contributor",
  "Community Builder",
  "Technical Advisor",
  "Fitness Geek",
  "Podcaster",
  "Problem Solver",
  "Innovator",
  "Tech Enthusiast",
  "Creative Mind",
  "Digital Artist",
  "Innovator",
  "Tech Enthusiast",
  "Creative Mind",
  "Artist",
  "Developer",
];

const techCards = [
  {
    title: 'MongoDB',
    content: '{ "database": "NoSQL", "type": "Document" }',
    color: '#05668D', // Lapis Lazuli
  },
  {
    title: 'Node.js',
    content: 'async function build() {\n  await dream();\n  return future;\n}',
    color: '#679436', // Asparagus
  },
  {
    title: 'React',
    content: '<Innovation\n  future={tech}\n  passion={true}\n/>',
    color: '#427AA1', // UCLA Blue
  }
];

function CyclingTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ height: '3.5rem', display: 'flex', justifyContent: 'center', mb: 4 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 600,
              background: `linear-gradient(135deg, #427AA1 0%, #A5BE00 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            {titles[currentIndex]}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}

function FloatingProjectCards() {
  const [visibleProjects, setVisibleProjects] = useState(projects.slice(0, 3));
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleProjects(currentProjects => {
        const availableProjects = projects.filter(p => !currentProjects.includes(p));
        const newProject = availableProjects[Math.floor(Math.random() * availableProjects.length)];
        const projectToReplace = Math.floor(Math.random() * 3);
        return currentProjects.map((p, i) => i === projectToReplace ? newProject : p);
      });
    }, 4000); // Change a random card every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {visibleProjects.map((project, i) => (
        <motion.div
          key={`${project.title}-${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, i % 2 === 0 ? 3 : -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '280px',
            height: '180px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: project.color,
            }}
          />
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.8)',
              transition: 'filter 0.3s ease',
              '&:hover': {
                filter: 'brightness(1)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'rgba(6, 39, 54, 0.9)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: 'white',
                fontWeight: 600,
              }}
            >
              {project.title}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}

export default function Home() {
  const theme = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <Box ref={containerRef}>
      <Box
        sx={{
          minHeight: '100vh',
          pt: 12,
          pb: 8,
          background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 600,
                    background: theme.palette.background.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  Michael Lynn
                </Typography>

                <CyclingTitle />

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Building bridges between developers and technology. Passionate about creating intuitive solutions and sharing knowledge through teaching and community engagement.
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/mrlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<LinkedInIcon />}
                    href="https://linkedin.com/in/mlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: '280px', sm: '320px', md: '400px' },
                    height: { xs: '280px', sm: '320px', md: '400px' },
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src="./mike-mexico.jpg"
                    alt="Michael Lynn"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      borderRadius: '16px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box sx={{ py: 8, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Timeline events={timelineEvents} />
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ProjectsSection />
        <GitHubActivity />
        <VideosSection />
      </Container>
    </Box>
  );
}
