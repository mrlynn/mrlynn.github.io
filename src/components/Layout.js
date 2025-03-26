'use client';

import { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  useTheme as useMuiTheme, 
  AppBar, 
  Toolbar, 
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Article as ArticleIcon,
  ContactMail as ContactIcon,
  YouTube as YouTubeIcon,
  LightMode,
  Book as BookIcon,
  DarkMode,
  Menu as MenuIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme as useCustomTheme } from '../theme/ThemeContext';
import Image from 'next/image';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Projects', icon: <WorkIcon />, path: '/projects' },
  { text: 'Videos', icon: <YouTubeIcon />, path: '/videos' },
  { text: 'Art', icon: <PaletteIcon />, path: '/art' },
  { text: 'Resume', icon: <ArticleIcon />, path: '/resume' },
  { text: 'Blog', icon: <BookIcon />, path: '/blog' },
  { text: 'Contact', icon: <ContactIcon />, path: '/contact' },
];

const MotionBox = motion(Box);

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
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
        <ListItem>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Subtle gradient background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(76,175,80,0.03) 0%, rgba(46,125,50,0.03) 100%)'
            : 'linear-gradient(135deg, rgba(76,175,80,0.02) 0%, rgba(46,125,50,0.02) 100%)',
          zIndex: -1,
        }}
      />

      {/* Navigation */}
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
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                fontWeight: 700,
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            >
              Michael Lynn
            </Typography>
          </Box>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2,
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: pathname === item.path ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.05)',
                  },
                }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            background: theme.palette.mode === 'dark'
              ? 'rgba(18, 18, 18, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          pt: 8, // Add padding top to account for fixed AppBar
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 