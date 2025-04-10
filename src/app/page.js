'use client';

import { Box, Container, Typography, Button, Grid, Paper, Stack, useTheme, IconButton } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, BookOutlined as BookOutlinedIcon, Code as CodeIcon, Terminal as TerminalIcon, Cloud as CloudIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectsSection from '../components/ProjectsSection';
import VideosSection from '../components/VideosSection';
import GitHubActivity from '../components/GitHubActivity';
import Timeline from '../components/Timeline';
import Certifications from '../components/Certifications';
import CalendarBooking from '../components/CalendarBooking';
import { projects } from '../data/projects';
import { timelineEvents } from '../data/timeline';
import Image from 'next/image';

// Create motion components using motion.create()
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionPaper = motion.create(Paper);
const MotionStack = motion(Stack);

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
  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      let newTitle;
      do {
        newTitle = titles[Math.floor(Math.random() * titles.length)];
      } while (newTitle === currentTitle);

      setCurrentTitle(newTitle);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentTitle]);

  return (
    <Box 
      sx={{ 
        minHeight: '3.5rem',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        mb: 4,
        position: 'relative',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTitle}
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
              lineHeight: 1.2,
            }}
          >
            {currentTitle}
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

const heroBackgroundVariants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const ParticleBackground = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 1,
    }}
  >
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, 1000],
          opacity: [1, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
      />
    ))}
  </Box>
);

const StatCard = ({ number, label }) => (
  <MotionPaper
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    sx={{
      p: 3,
      backgroundColor: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        backgroundColor: 'rgba(255,255,255,0.12)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      },
    }}
  >
    <Typography
      variant="h3"
      sx={{
        color: '#fff',
        fontWeight: 700,
        fontSize: { xs: '1.75rem', md: '2.25rem' },
        mb: 1,
        background: 'linear-gradient(135deg, #A5BE00 0%, #427AA1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {number}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: 'rgba(255,255,255,0.8)',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontSize: '0.75rem',
        fontWeight: 500,
      }}
    >
      {label}
    </Typography>
  </MotionPaper>
);

export default function Home() {
  const theme = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '200+', label: 'Tech Talks' },
    { number: '50K+', label: 'Developers Reached' },
    { number: '100+', label: 'Open Source Contributions' },
  ];

  return (
    <Box ref={ref}>
      {/* Hero Section */}
      <MotionBox
        component={motion.div}
        variants={heroBackgroundVariants}
        animate="animate"
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(-45deg, #062736, #427AA1, #679436, #A5BE00)',
          backgroundSize: '400% 400%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(6, 39, 54, 0.85)',
            zIndex: 1,
          },
        }}
      >
        <ParticleBackground />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionStack
                spacing={4}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'rgba(165, 190, 0, 0.8)',
                      fontWeight: 500,
                      letterSpacing: 3,
                      mb: 2,
                      display: 'block',
                      fontSize: '0.75rem',
                    }}
                  >
                    WELCOME TO MY WORLD
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4.5rem' },
                      fontWeight: 800,
                      color: '#fff',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      mb: 2,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Michael Lynn
                  </Typography>
                </Box>
                
                <Box sx={{ transform: 'scale(1.1)', mb: 2 }}>
                  <CyclingTitle />
                </Box>
                
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    maxWidth: '600px',
                    lineHeight: 1.8,
                    mb: 6,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 400,
                  }}
                >
                  Building bridges between developers and technology.
                  Passionate about creating intuitive solutions and sharing
                  knowledge through teaching and community engagement.
                </Typography>

                <Stack direction="row" spacing={3} sx={{ mb: 8 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/mrlynn"
                    sx={{
                      backgroundColor: '#fff',
                      color: '#062736',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<LinkedInIcon />}
                    href="https://linkedin.com/in/mlynn"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.6)',
                      borderWidth: 2,
                      color: '#fff',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#fff',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    LinkedIn
                  </Button>
                </Stack>

                <Grid container spacing={3}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} sm={3} key={stat.label}>
                      <StatCard {...stat} />
                    </Grid>
                  ))}
                </Grid>
              </MotionStack>
            </Grid>
            <Grid item xs={12} md={5}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                  position: 'relative',
                  height: { xs: '400px', md: '460px' },
                  width: '100%',
                  display: { xs: 'none', md: 'block' },
                  mt: 4,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    border: '4px solid rgba(255,255,255,0.1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(6,39,54,0) 0%, rgba(6,39,54,0.6) 100%)',
                      zIndex: 1,
                      opacity: 0.3,
                      transition: 'all 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 0.1,
                    },
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(0deg) translateY(-10px)',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                      '& + .quote-box': {
                        transform: 'translateX(-50%) translateY(-5px)',
                        backgroundColor: 'rgba(255,255,255,0.12)',
                      },
                    },
                  }}
                >
                  <Image
                    src="/mike-mexico.jpg"
                    alt="Michael Lynn"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    priority
                  />
                </Box>
                <Box
                  className="quote-box"
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    p: 3,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    textAlign: 'center',
                    zIndex: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      transform: 'translateX(-50%) translateY(-5px)',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      fontStyle: 'italic',
                      position: 'relative',
                      '&::before': {
                        content: '"\\201C"',
                        position: 'absolute',
                        top: -20,
                        left: -10,
                        fontSize: '3rem',
                        color: 'rgba(255,255,255,0.2)',
                        fontFamily: 'serif',
                        lineHeight: 1,
                      },
                      '&::after': {
                        content: '"\\201D"',
                        position: 'absolute',
                        bottom: -40,
                        right: -10,
                        fontSize: '3rem',
                        color: 'rgba(255,255,255,0.2)',
                        fontFamily: 'serif',
                        lineHeight: 1,
                      },
                    }}
                  >
                    Empowering developers to build the future of technology
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
        
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IconButton
              sx={{
                color: 'white',
                border: '2px solid white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
              onClick={() => window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              })}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </motion.div>
        </Box>
      </MotionBox>

      {/* Tech Cards Section */}
      <Box sx={{ py: 10, backgroundColor: '#062736' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {techCards.map((card, index) => (
              <Grid item xs={12} md={4} key={card.title}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  sx={{
                    p: 3,
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderTop: `4px solid ${card.color}`,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#fff',
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {card.content}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box sx={{ py: 8, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Timeline events={timelineEvents} />
      </Box>

      {/* Certifications Section */}
      <Certifications />

      {/* Calendar Booking Section */}
      <Box 
        sx={{ 
          py: 12,
          background: 'linear-gradient(180deg, rgba(6,39,54,0.03) 0%, rgba(6,39,54,0.08) 100%)',
          borderTop: '1px solid rgba(6,39,54,0.1)',
          borderBottom: '1px solid rgba(6,39,54,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: theme.palette.text.primary,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  background: 'linear-gradient(90deg, #427AA1 0%, #A5BE00 100%)',
                  borderRadius: 2,
                },
              }}
            >
              Schedule a Meeting
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Book a time to discuss your project, collaboration opportunities, or just to chat about technology.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                opacity: 0.8,
              }}
            >
              Select a convenient time slot from my calendar below. Looking forward to connecting with you!
            </Typography>
          </Box>
          
          <Box
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                background: 'linear-gradient(135deg, rgba(66,122,161,0.1) 0%, rgba(165,190,0,0.1) 100%)',
                borderRadius: '24px',
                zIndex: 0,
              },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '1px solid rgba(6,39,54,0.1)',
              }}
            >
              <CalendarBooking variant="iframe" />
            </Paper>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ProjectsSection />
        <GitHubActivity />
        <VideosSection />
      </Container>
    </Box>
  );
}
