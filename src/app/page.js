'use client';

import { Box, Container, Typography, Button, Grid, Paper, Stack, useTheme, IconButton } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, BookOutlined as BookOutlinedIcon, Code as CodeIcon, Terminal as TerminalIcon, Cloud as CloudIcon, ArrowDownward as ArrowDownwardIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
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
  "Developer",
];

const techCards = [
  {
    title: 'MongoDB',
    content: '{ "database": "NoSQL", "type": "Document" }',
    color: '#10b981',
    icon: '{ }',
  },
  {
    title: 'Node.js',
    content: 'async function build() {\n  await dream();\n  return future;\n}',
    color: '#06b6d4',
    icon: 'fn()',
  },
  {
    title: 'React',
    content: '<Innovation\n  future={tech}\n  passion={true}\n/>',
    color: '#00ED64',
    icon: '</>',
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
              fontFamily: '"Space Grotesk", sans-serif',
              background: theme.palette.background.gradientHero || theme.palette.background.gradient,
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
    }, 4000);
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
            border: '1px solid rgba(16, 185, 129, 0.15)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #10b981, #00ED64)',
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
              filter: 'brightness(0.7)',
              transition: 'filter 0.3s ease',
              '&:hover': {
                filter: 'brightness(0.9)',
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
              background: 'rgba(3, 7, 18, 0.9)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(16, 185, 129, 0.1)',
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

const GridBackground = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(30)].map((_, i) => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      opacityDark: Math.random() * 0.4 + 0.1,
      opacityLight: Math.random() * 0.3 + 0.1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      glowSize: Math.random() * 6 + 2,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
    })));
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1,
        backgroundImage: isDark
          ? `linear-gradient(rgba(16, 185, 129, 0.04) 1px, transparent 1px),
             linear-gradient(90deg, rgba(16, 185, 129, 0.04) 1px, transparent 1px)`
          : `linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
             linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: p.width,
            height: p.height,
            backgroundColor: isDark
              ? `rgba(0, 237, 100, ${p.opacityDark})`
              : `rgba(16, 185, 129, ${p.opacityLight})`,
            borderRadius: '50%',
            top: `${p.top}%`,
            left: `${p.left}%`,
            boxShadow: isDark ? `0 0 ${p.glowSize}px rgba(0, 237, 100, 0.3)` : 'none',
          }}
          animate={{
            y: [0, -800],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </Box>
  );
};

const StatCard = ({ number, label, theme }) => (
  <MotionPaper
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    sx={{
      p: 3,
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(16, 185, 129, 0.06)'
        : 'rgba(16, 185, 129, 0.04)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.1)'}`,
      textAlign: 'center',
      transition: 'all 0.3s ease',
      backgroundImage: 'none',
      '&:hover': {
        transform: 'translateY(-5px)',
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(16, 185, 129, 0.1)'
          : 'rgba(16, 185, 129, 0.08)',
        borderColor: theme.palette.mode === 'dark'
          ? 'rgba(0, 237, 100, 0.25)'
          : 'rgba(16, 185, 129, 0.2)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 0 20px rgba(0, 237, 100, 0.1)'
          : theme.shadows[4],
      },
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: { xs: '1.75rem', md: '2.25rem' },
        mb: 1,
        background: theme.palette.background.gradientAccent,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {number}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontSize: '0.7rem',
        fontWeight: 600,
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {label}
    </Typography>
  </MotionPaper>
);

export default function Home() {
  const theme = useTheme();
  const ref = useRef(null);
  const isDark = theme.palette.mode === 'dark';
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
          background: theme.palette.background.mesh,
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
            background: isDark
              ? 'rgba(3, 7, 18, 0.88)'
              : 'rgba(255, 255, 255, 0.88)',
            zIndex: 1,
          },
        }}
      >
        <GridBackground />
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
                      fontFamily: '"JetBrains Mono", monospace',
                      color: isDark ? 'rgba(0, 237, 100, 0.8)' : theme.palette.primary.main,
                      fontWeight: 500,
                      letterSpacing: 4,
                      mb: 2,
                      display: 'block',
                      fontSize: '0.7rem',
                    }}
                  >
                    {'> '}WELCOME_TO_MY_WORLD
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: { xs: '2.5rem', md: '4.5rem' },
                      fontWeight: 800,
                      color: isDark ? '#f1f5f9' : theme.palette.text.primary,
                      textShadow: isDark ? '0 0 40px rgba(0, 237, 100, 0.08)' : 'none',
                      mb: 2,
                      lineHeight: 1.1,
                      letterSpacing: '-0.03em',
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
                    color: isDark ? 'rgba(226, 232, 240, 0.85)' : theme.palette.text.secondary,
                    maxWidth: '600px',
                    lineHeight: 1.8,
                    mb: 6,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    fontWeight: 400,
                  }}
                >
                  Building bridges between developers and technology.
                  Passionate about creating intuitive solutions and sharing
                  knowledge through teaching and community engagement.
                </Typography>

                <Stack direction="row" spacing={3} sx={{ mb: 8 }} flexWrap="wrap" useFlexGap>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/mrlynn"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#fff',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: '12px',
                      boxShadow: 'none',
                      '&:hover': {
                        background: theme.palette.background.gradient,
                        filter: 'brightness(1.15)',
                        transform: 'translateY(-2px)',
                        boxShadow: isDark
                          ? '0 8px 24px rgba(16, 185, 129, 0.3), 0 0 8px rgba(0, 237, 100, 0.2)'
                          : '0 8px 24px rgba(16, 185, 129, 0.25)',
                      },
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
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
                      borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : theme.palette.border.default,
                      borderWidth: '1.5px',
                      color: isDark ? '#e2e8f0' : theme.palette.text.primary,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: '12px',
                      '&:hover': {
                        borderWidth: '1.5px',
                        borderColor: theme.palette.primary.main,
                        backgroundColor: isDark
                          ? 'rgba(16, 185, 129, 0.08)'
                          : 'rgba(16, 185, 129, 0.04)',
                        transform: 'translateY(-2px)',
                        boxShadow: isDark
                          ? '0 4px 16px rgba(16, 185, 129, 0.15)'
                          : theme.shadows[4],
                      },
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    LinkedIn
                  </Button>
                  <CalendarBooking
                    variant="button"
                    buttonProps={{
                      variant: "outlined",
                      size: "large",
                      children: "Schedule a Meeting",
                      sx: {
                        borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : theme.palette.border.default,
                        borderWidth: '1.5px',
                        color: isDark ? '#e2e8f0' : theme.palette.text.primary,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        borderRadius: '12px',
                        '&:hover': {
                          borderWidth: '1.5px',
                          borderColor: theme.palette.primary.main,
                          backgroundColor: isDark
                            ? 'rgba(16, 185, 129, 0.08)'
                            : 'rgba(16, 185, 129, 0.04)',
                          transform: 'translateY(-2px)',
                          boxShadow: isDark
                            ? '0 4px 16px rgba(16, 185, 129, 0.15)'
                            : theme.shadows[4],
                        },
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      }
                    }}
                  />
                </Stack>

                <Grid container spacing={3}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} sm={3} key={stat.label}>
                      <StatCard {...stat} theme={theme} />
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
                    boxShadow: isDark
                      ? '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(16, 185, 129, 0.08)'
                      : '0 20px 40px rgba(0,0,0,0.15)',
                    border: isDark
                      ? '1px solid rgba(16, 185, 129, 0.15)'
                      : '1px solid rgba(16, 185, 129, 0.1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isDark
                        ? 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.5) 100%)'
                        : 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)',
                      zIndex: 1,
                      opacity: 0.5,
                      transition: 'all 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 0.2,
                    },
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(0deg) translateY(-10px)',
                      boxShadow: isDark
                        ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0, 237, 100, 0.1)'
                        : '0 30px 60px rgba(0,0,0,0.2)',
                      borderColor: isDark ? 'rgba(0, 237, 100, 0.25)' : 'rgba(16, 185, 129, 0.2)',
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
                    backgroundColor: isDark
                      ? 'rgba(3, 7, 18, 0.85)'
                      : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'}`,
                    textAlign: 'center',
                    zIndex: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: isDark
                        ? 'rgba(3, 7, 18, 0.9)'
                        : 'rgba(255, 255, 255, 0.95)',
                      transform: 'translateX(-50%) translateY(-5px)',
                      borderColor: isDark ? 'rgba(0, 237, 100, 0.25)' : 'rgba(16, 185, 129, 0.2)',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? 'rgba(226, 232, 240, 0.9)' : theme.palette.text.primary,
                      fontWeight: 500,
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      position: 'relative',
                      '&::before': {
                        content: '"\\201C"',
                        position: 'absolute',
                        top: -20,
                        left: -10,
                        fontSize: '3rem',
                        color: isDark ? 'rgba(0, 237, 100, 0.3)' : theme.palette.primary.main,
                        fontFamily: 'serif',
                        lineHeight: 1,
                      },
                      '&::after': {
                        content: '"\\201D"',
                        position: 'absolute',
                        bottom: -40,
                        right: -10,
                        fontSize: '3rem',
                        color: isDark ? 'rgba(0, 237, 100, 0.3)' : theme.palette.primary.main,
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
                color: isDark ? '#10b981' : theme.palette.primary.main,
                border: `2px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(16, 185, 129, 0.06)',
                  boxShadow: isDark
                    ? '0 0 15px rgba(0, 237, 100, 0.2)'
                    : 'none',
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
      <Box sx={{
        py: 10,
        backgroundColor: isDark
          ? theme.palette.background.default
          : theme.palette.background.paper,
        position: 'relative',
      }}>
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
                    backgroundColor: isDark
                      ? 'rgba(16, 185, 129, 0.04)'
                      : 'rgba(16, 185, 129, 0.03)',
                    backgroundImage: 'none',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)'}`,
                    borderTop: `3px solid ${card.color}`,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle at top right, ${card.color}08, transparent 70%)`,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: `${card.color}40`,
                      boxShadow: isDark
                        ? `0 0 20px ${card.color}15, 0 8px 24px rgba(0,0,0,0.3)`
                        : `0 8px 24px rgba(0,0,0,0.08)`,
                    },
                  }}
                >
                  {/* Terminal-style header */}
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                  }}>
                    <Typography
                      sx={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.7rem',
                        color: card.color,
                        opacity: 0.7,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {card.icon}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.text.primary,
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? 'rgba(148, 163, 184, 0.9)' : theme.palette.text.secondary,
                      fontFamily: '"JetBrains Mono", monospace',
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.8rem',
                      lineHeight: 1.8,
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
      <Box sx={{
        py: 8,
        background: isDark
          ? 'rgba(16, 185, 129, 0.02)'
          : 'rgba(16, 185, 129, 0.015)',
        borderTop: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)'}`,
        borderBottom: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)'}`,
      }}>
        <Timeline events={timelineEvents} />
      </Box>

      {/* Certifications Section */}
      <Certifications />

      {/* Calendar Booking Section */}
      <Box
        sx={{
          py: 12,
          background: isDark
            ? 'rgba(16, 185, 129, 0.02)'
            : 'linear-gradient(180deg, rgba(16, 185, 129, 0.02) 0%, rgba(16, 185, 129, 0.05) 100%)',
          borderTop: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)'}`,
          borderBottom: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)'}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: 700,
                fontFamily: '"Space Grotesk", sans-serif',
                color: theme.palette.text.primary,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 3,
                  background: theme.palette.background.gradientAccent,
                  borderRadius: 2,
                  boxShadow: isDark ? '0 0 10px rgba(0, 237, 100, 0.3)' : 'none',
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
                background: isDark
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(6, 182, 212, 0.04) 100%)'
                  : 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(6, 182, 212, 0.03) 100%)',
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
                boxShadow: isDark
                  ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(16, 185, 129, 0.08)'
                  : '0 8px 32px rgba(0,0,0,0.08)',
                border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.06)'}`,
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
