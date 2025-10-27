'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Container,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fade,
  Badge,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  MoreVert as MoreIcon,
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  YouTube as YouTubeIcon,
  Palette as PaletteIcon,
  Article as ArticleIcon,
  ContactMail as ContactIcon,
  Book as BookIcon,
  RecordVoiceOver as SpeakingIcon,
  Podcasts as PodcastsIcon,
  Instagram as InstagramIcon,
  Build as BuildIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme as useCustomTheme } from '../theme/ThemeContext';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const NavigationImproved = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleNavigation = (path) => {
    router.push(path);
    handleMoreClose();
    setMobileMenuOpen(false);
  };

  // Primary navigation items
  const primaryItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Projects', icon: <WorkIcon />, path: '/projects', badge: null },
    { text: 'Blog', icon: <BookIcon />, path: '/blog' },
    { text: 'Speaking', icon: <SpeakingIcon />, path: '/speaking' },
    { text: 'Podcasts', icon: <PodcastsIcon />, path: '/podcasts' },
  ];

  // Secondary navigation items (in More dropdown)
  const secondaryItems = [
    { text: 'Tools', icon: <BuildIcon />, items: [
      { text: 'Diagram Generator', path: '/tools/generate-diagram' },
      { text: 'MongoDB Introspector', path: '/tools/introspect' },
      { text: 'MongoDB RAG Explainer', path: 'https://rag-chunk-explainer.vercel.app/' }
    ]},
    { text: 'Videos', icon: <YouTubeIcon />, path: '/videos' },
    { text: 'Art', icon: <PaletteIcon />, path: '/art' },
    { text: 'Social', icon: <InstagramIcon />, path: '/social' },
    { text: 'Resume', icon: <ArticleIcon />, path: '/resume' },
    { text: 'Contact', icon: <ContactIcon />, path: '/contact' }
  ];

  // Combine primary and secondary items for mobile menu
  const mobileMenuItems = [...primaryItems, ...secondaryItems.reduce((acc, item) => {
    if (item.items) {
      return [...acc, ...item.items.map(subItem => ({
        ...subItem,
        icon: item.icon
      }))];
    }
    return [...acc, item];
  }, [])];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isDarkMode
            ? 'rgba(26, 35, 50, 0.92)'
            : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: `1px solid ${theme.palette.border.subtle}`,
          transition: theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.standard,
          }),
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: isDarkMode 
              ? 'linear-gradient(90deg, transparent, rgba(139, 195, 74, 0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.3), transparent)',
            opacity: 0,
            transition: 'opacity 0.3s',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 72 },
              px: { xs: 1, sm: 2 },
            }}
          >
            {/* Logo and Name */}
            <MotionBox
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                cursor: 'pointer',
              }}
              onClick={() => handleNavigation('/')}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: theme.palette.background.gradientAccent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isDarkMode ? theme.shadows[2] : theme.shadows[1],
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'rotate(-5deg)',
                  },
                }}
              >
                <Image
                  src="/letter-m-circle.svg"
                  alt="M Logo"
                  width={20}
                  height={20}
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: theme.palette.text.primary,
                    letterSpacing: '-0.01em',
                    background: theme.palette.background.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Michael Lynn
                </Typography>
              </Box>
            </MotionBox>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {/* Primary Navigation */}
                {primaryItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        mx: 0.5,
                        px: 2,
                        py: 1,
                        color: isActive 
                          ? theme.palette.primary.main 
                          : theme.palette.text.primary,
                        position: 'relative',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.9375rem',
                        borderRadius: '8px',
                        transition: 'all 0.2s',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          bottom: 8,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: isActive ? '24px' : '0px',
                          height: '2px',
                          background: theme.palette.primary.main,
                          borderRadius: '2px',
                          transition: 'all 0.3s',
                        },
                        '&:hover': {
                          background: theme.palette.surface.secondary,
                          color: theme.palette.primary.main,
                          transform: 'translateY(-1px)',
                          '&::before': {
                            width: '24px',
                          },
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  );
                })}

                {/* More Dropdown */}
                <Button
                  aria-controls="more-menu"
                  aria-haspopup="true"
                  onClick={handleMoreClick}
                  endIcon={<MoreIcon />}
                  sx={{
                    mx: 0.5,
                    px: 2,
                    py: 1,
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: theme.palette.surface.secondary,
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  More
                </Button>
                <Menu
                  id="more-menu"
                  anchorEl={moreAnchorEl}
                  keepMounted
                  open={Boolean(moreAnchorEl)}
                  onClose={handleMoreClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      minWidth: 220,
                      borderRadius: '12px',
                      border: `1px solid ${theme.palette.border.subtle}`,
                      boxShadow: isDarkMode ? theme.shadows[8] : theme.shadows[4],
                      background: theme.palette.background.paper,
                      backdropFilter: 'blur(16px)',
                      overflow: 'visible',
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: theme.palette.background.paper,
                        transform: 'translateY(-50%) rotate(45deg)',
                        borderLeft: `1px solid ${theme.palette.border.subtle}`,
                        borderTop: `1px solid ${theme.palette.border.subtle}`,
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  {secondaryItems.map((item, index) => (
                    <Box key={item.text}>
                      {item.items ? (
                        <Box>
                          <MenuItem
                            disabled
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.text.secondary,
                              fontSize: '0.75rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              py: 0.75,
                              px: 2,
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                          </MenuItem>
                          {item.items.map((subItem) => (
                            <MenuItem
                              key={subItem.path}
                              onClick={() => handleNavigation(subItem.path)}
                              selected={pathname === subItem.path}
                              sx={{
                                pl: 5,
                                py: 1,
                                borderRadius: '8px',
                                mx: 1,
                                '&:hover': {
                                  background: theme.palette.surface.secondary,
                                },
                                '&.Mui-selected': {
                                  background: theme.palette.surface.tertiary,
                                  '&:hover': {
                                    background: theme.palette.surface.tertiary,
                                  },
                                },
                              }}
                            >
                              <ListItemText 
                                primary={subItem.text}
                                primaryTypographyProps={{
                                  fontSize: '0.9375rem',
                                }}
                              />
                            </MenuItem>
                          ))}
                          {index < secondaryItems.length - 1 && (
                            <Divider sx={{ my: 1, mx: 2 }} />
                          )}
                        </Box>
                      ) : (
                        <MenuItem
                          onClick={() => handleNavigation(item.path)}
                          selected={pathname === item.path}
                          sx={{
                            py: 1,
                            px: 2,
                            borderRadius: '8px',
                            mx: 1,
                            '&:hover': {
                              background: theme.palette.surface.secondary,
                            },
                            '&.Mui-selected': {
                              background: theme.palette.surface.tertiary,
                              '&:hover': {
                                background: theme.palette.surface.tertiary,
                              },
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.text}
                            primaryTypographyProps={{
                              fontSize: '0.9375rem',
                            }}
                          />
                        </MenuItem>
                      )}
                    </Box>
                  ))}
                </Menu>

                {/* Theme Toggle */}
                <IconButton 
                  onClick={toggleTheme} 
                  sx={{ 
                    ml: 1,
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: theme.palette.surface.secondary,
                      transform: 'rotate(15deg) scale(1.05)',
                    },
                  }}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{ 
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: theme.palette.surface.secondary,
                      transform: 'rotate(15deg)',
                    },
                  }}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
                <IconButton
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  sx={{ 
                    color: theme.palette.text.primary,
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: theme.palette.surface.secondary,
                    },
                  }}
                  aria-label="Open menu"
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            background: theme.palette.background.paper,
            backdropFilter: 'blur(16px)',
            borderLeft: `1px solid ${theme.palette.border.subtle}`,
          },
        }}
      >
        <Box sx={{ pt: 10, pb: 2, px: 2 }}>
          <List sx={{ px: 1 }}>
            {mobileMenuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <ListItem
                  button
                  key={`${item.path}-${index}`}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    mb: 0.5,
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    background: isActive 
                      ? theme.palette.surface.tertiary
                      : 'transparent',
                    '&:hover': {
                      background: theme.palette.surface.secondary,
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive 
                      ? theme.palette.primary.main 
                      : theme.palette.text.secondary,
                    minWidth: 40,
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive 
                        ? theme.palette.primary.main 
                        : theme.palette.text.primary,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavigationImproved;

