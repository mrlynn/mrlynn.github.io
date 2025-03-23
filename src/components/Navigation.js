'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  useTheme as useMuiTheme,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../theme/ThemeContext';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Projects', path: '/projects' },
  { title: 'Videos', path: '/videos' },
  { title: 'Art', path: '/art' },
];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            background: theme.palette.mode === 'dark' 
              ? 'rgba(6, 39, 54, 0.9)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.1)'}`,
            borderRadius: 0,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                component={Link}
                href="/"
                sx={{
                  mr: 4,
                  fontWeight: 700,
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                  textDecoration: 'none',
                  background: theme.palette.background.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Michael Lynn
              </Typography>

              {/* Desktop Navigation */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.path}
                    component={Link}
                    href={page.path}
                    sx={{
                      mx: 1,
                      color: pathname === page.path ? 'primary.main' : 'text.primary',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: pathname === page.path ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
                        height: '2px',
                        width: '100%',
                        background: theme.palette.background.gradient,
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover::after': {
                        transform: 'translateX(-50%) scaleX(1)',
                      },
                    }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>

              {/* Theme Toggle Button */}
              <IconButton
                onClick={toggleTheme}
                sx={{
                  mr: { xs: 1, md: 2 },
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>

              {/* Mobile Menu Button */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMobileMenuToggle}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px',
            background: theme.palette.mode === 'dark'
              ? 'rgba(6, 39, 54, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <List sx={{ pt: 8 }}>
          {pages.map((page) => (
            <ListItem
              key={page.path}
              component={Link}
              href={page.path}
              onClick={handleMobileMenuToggle}
              sx={{
                color: pathname === page.path ? 'primary.main' : 'text.primary',
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <ListItemText primary={page.title} />
            </ListItem>
          ))}
          <ListItem
            button
            onClick={() => {
              toggleTheme();
              handleMobileMenuToggle();
            }}
            sx={{
              color: 'text.primary',
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            <ListItemText 
              primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} 
              secondary={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
} 