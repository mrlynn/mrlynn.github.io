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
  RecordVoiceOver as SpeakingIcon
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
  ];

  // Secondary navigation items (in More dropdown)
  const secondaryItems = [
    { text: 'Videos', icon: <YouTubeIcon />, path: '/videos' },
    { text: 'Art', icon: <PaletteIcon />, path: '/art' },
    { text: 'Resume', icon: <ArticleIcon />, path: '/resume' },
    { text: 'Contact', icon: <ContactIcon />, path: '/contact' }
  ];

  const mobileMenuItems = [...primaryItems, ...secondaryItems];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)'}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo and Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Image
                src="/letter-m-circle.svg"
                alt="M Logo"
                width={26}
                height={26}
                style={{
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                }}
              />
              <Button
                onClick={() => handleNavigation('/')}
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
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
                      color: pathname === item.path ? 'primary.main' : 'text.primary',
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
                    <MenuItem
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      selected={pathname === item.path}
                    >
                      {item.text}
                    </MenuItem>
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