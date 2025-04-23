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
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
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
  Build as BuildIcon
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme as useCustomTheme } from '../theme/ThemeContext';
import Image from 'next/image';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
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
    { text: 'Projects', icon: <WorkIcon />, path: '/projects' },
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
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'rgba(14, 30, 42, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.08)'}`,
          transition: 'all 0.2s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo and Name */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
            }}>
              <Image
                src="/letter-m-circle.svg"
                alt="M Logo"
                width={28}
                height={28}
                style={{
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                }}
              />
              <Button
                onClick={() => handleNavigation('/')}
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                  letterSpacing: '0.02em',
                }}
              >
                Michael Lynn
              </Button>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Primary Navigation */}
                {primaryItems.map((item) => (
                  <Button
                    key={item.path}
                    startIcon={item.icon}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      mx: 1,
                      px: 1.5,
                      color: pathname === item.path ? 'primary.main' : 'text.primary',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: pathname === item.path ? '20%' : '50%',
                        right: pathname === item.path ? '20%' : '50%',
                        height: 2,
                        bgcolor: 'primary.main',
                        transition: 'all 0.2s ease',
                        opacity: pathname === item.path ? 1 : 0,
                      },
                      '&:hover': {
                        background: 'transparent',
                        '&::after': {
                          left: '20%',
                          right: '20%',
                          opacity: 0.7,
                        },
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}

                {/* More Dropdown */}
                <Button
                  aria-controls="more-menu"
                  aria-haspopup="true"
                  onClick={handleMoreClick}
                  endIcon={<MoreIcon />}
                  sx={{ mx: 1 }}
                >
                  More
                </Button>
                <Menu
                  id="more-menu"
                  anchorEl={moreAnchorEl}
                  keepMounted
                  open={Boolean(moreAnchorEl)}
                  onClose={handleMoreClose}
                >
                  {secondaryItems.map((item) => (
                    item.items ? (
                      <div key={item.text}>
                        <MenuItem
                          sx={{
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            backgroundColor: 'background.default'
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </MenuItem>
                        {item.items.map((subItem) => (
                          <MenuItem
                            key={subItem.path}
                            onClick={() => handleNavigation(subItem.path)}
                            selected={pathname === subItem.path}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={subItem.text} />
                          </MenuItem>
                        ))}
                      </div>
                    ) : (
                      <MenuItem
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        selected={pathname === item.path}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </MenuItem>
                    )
                  ))}
                </Menu>

                {/* Theme Toggle */}
                <IconButton onClick={toggleTheme} sx={{ ml: 1 }}>
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{ mr: 1 }}
                >
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
                <IconButton
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  sx={{ color: 'text.primary' }}
                >
                  <MenuIcon />
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
            width: 280,
            background: theme.palette.mode === 'dark'
              ? 'rgba(18, 18, 18, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ pt: 8 }}>
          <List>
            {mobileMenuItems.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: pathname === item.path ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;