'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme as useCustomTheme } from '../theme/ThemeContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { NAV_ITEMS, isNavItemActive } from '../lib/navigation';

const MotionBox = motion(Box);

const NavigationImproved = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  const themeToggle = (
    <IconButton
      onClick={toggleTheme}
      sx={{
        borderRadius: '10px',
        transition: 'all 0.2s',
        border: `1px solid ${theme.palette.border.subtle}`,
        '&:hover': {
          background: theme.palette.surface.primary,
          borderColor: theme.palette.primary.main,
        },
      }}
      aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDarkMode
        ? <LightMode sx={{ fontSize: 20, color: theme.palette.secondary.main }} />
        : <DarkMode sx={{ fontSize: 20 }} />}
    </IconButton>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isDarkMode
            ? 'rgba(20, 18, 14, 0.88)'
            : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${theme.palette.border.subtle}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              gap: 2,
              minHeight: { xs: 64, md: 72 },
            }}
          >
            {/* Logo — doubles as the Home link */}
            <MotionBox
              component="a"
              href="/"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                textDecoration: 'none',
                flexShrink: 0,
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
              aria-label="Michael Lynn — home"
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '10px',
                  background: theme.palette.background.gradientAccent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/letter-m-circle.svg"
                  alt=""
                  width={20}
                  height={20}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </Box>
              <Typography
                component="span"
                sx={{
                  ml: 1.5,
                  fontFamily: 'var(--font-fraunces), Georgia, serif',
                  fontWeight: 600,
                  fontSize: '1.15rem',
                  letterSpacing: '-0.01em',
                  color: theme.palette.text.primary,
                  display: { xs: 'none', sm: 'block' },
                  whiteSpace: 'nowrap',
                }}
              >
                Michael Lynn
              </Typography>
            </MotionBox>

            {/* Desktop navigation */}
            {!isMobile && (
              <Box
                component="nav"
                aria-label="Primary"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = isNavItemActive(pathname, item);
                  return (
                    <Button
                      key={item.path}
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.path);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      sx={{
                        px: 1.75,
                        py: 1,
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                        position: 'relative',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.9375rem',
                        borderRadius: '10px',
                        whiteSpace: 'nowrap',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          bottom: 6,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: isActive ? '20px' : '0px',
                          height: '2px',
                          background: theme.palette.primary.main,
                          borderRadius: '2px',
                          transition: 'width 0.25s',
                        },
                        '&:hover': {
                          background: theme.palette.surface.primary,
                          color: theme.palette.primary.main,
                          '&::before': { width: '20px' },
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}

                <Button
                  variant="contained"
                  disableElevation
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/contact');
                  }}
                  sx={{
                    ml: 1.5,
                    px: 2,
                    py: 0.9,
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Book a call
                </Button>

                <Box sx={{ ml: 1 }}>{themeToggle}</Box>
              </Box>
            )}

            {/* Mobile controls */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {themeToggle}
                <IconButton
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  sx={{
                    color: theme.palette.text.primary,
                    borderRadius: '10px',
                    border: `1px solid ${theme.palette.border.subtle}`,
                    '&:hover': {
                      background: theme.palette.surface.primary,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer — mirrors the desktop nav exactly */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            background: isDarkMode
              ? 'rgba(20, 18, 14, 0.98)'
              : theme.palette.background.paper,
            backdropFilter: 'blur(20px)',
            borderLeft: `1px solid ${theme.palette.border.subtle}`,
          },
        }}
      >
        <Box sx={{ pt: 11, pb: 4, px: 3 }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.7rem',
              color: theme.palette.primary.main,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              pb: 2,
              mb: 1,
              borderBottom: `1px solid ${theme.palette.border.subtle}`,
            }}
          >
            Navigation
          </Typography>

          <List component="nav" aria-label="Primary" sx={{ px: 0 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(pathname, item);
              return (
                <ListItemButton
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  sx={{
                    mb: 0.5,
                    borderRadius: '10px',
                    background: isActive ? theme.palette.surface.primary : 'transparent',
                    borderLeft: `2px solid ${isActive ? theme.palette.primary.main : 'transparent'}`,
                    '&:hover': { background: theme.palette.surface.primary },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      fontSize: '1rem',
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => handleNavigation('/contact')}
            sx={{ mt: 2, py: 1.25, borderRadius: '10px', fontWeight: 600 }}
          >
            Book a call
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default NavigationImproved;
