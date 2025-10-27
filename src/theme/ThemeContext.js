'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { colors, typography, shadows, gradients, borderRadius, transitions } from './designSystem';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: colors.primary[600],
        light: colors.primary[400],
        dark: colors.primary[800],
      },
      secondary: {
        main: colors.secondary[600],
        light: colors.secondary[400],
        dark: colors.secondary[800],
      },
      accent: {
        main: colors.accent.main,
        light: colors.accent.light,
        dark: colors.accent.dark,
      },
      background: {
        default: isDarkMode ? colors.dark.bg.primary : colors.light.bg.primary,
        paper: isDarkMode ? colors.dark.bg.paper : colors.light.bg.paper,
        card: isDarkMode ? colors.dark.bg.tertiary : colors.light.bg.tertiary,
        elevated: isDarkMode ? colors.dark.bg.elevated : colors.light.bg.elevated,
        gradient: gradients.primary,
        gradientAccent: gradients.accent,
        gradientSecondary: gradients.secondary,
        mesh: isDarkMode ? gradients.mesh.dark : gradients.mesh.light,
      },
      surface: {
        primary: isDarkMode ? colors.dark.surface.primary : colors.light.surface.primary,
        secondary: isDarkMode ? colors.dark.surface.secondary : colors.light.surface.secondary,
        tertiary: isDarkMode ? colors.dark.surface.tertiary : colors.light.surface.tertiary,
      },
      border: {
        subtle: isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle,
        default: isDarkMode ? colors.dark.border.default : colors.light.border.default,
        strong: isDarkMode ? colors.dark.border.strong : colors.light.border.strong,
      },
      text: {
        primary: isDarkMode ? '#ffffff' : colors.gray[900],
        secondary: isDarkMode ? colors.gray[400] : colors.gray[600],
        disabled: isDarkMode ? colors.gray[600] : colors.gray[400],
      },
      divider: isDarkMode ? colors.dark.border.default : colors.light.border.default,
    },
    typography: {
      fontFamily: typography.fontFamily.primary,
      h1: {
        fontSize: typography.fontSize['5xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
        marginBottom: '1.25rem',
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
        marginBottom: '1rem',
      },
      h4: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
        marginBottom: '0.75rem',
      },
      h5: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
        marginBottom: '0.5rem',
      },
      h6: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
        marginBottom: '0.5rem',
      },
      body1: {
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.relaxed,
        marginBottom: '1rem',
      },
      body2: {
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.normal,
        marginBottom: '0.75rem',
      },
      caption: {
        fontSize: typography.fontSize.xs,
        lineHeight: typography.lineHeight.normal,
      },
    },
    shape: {
      borderRadius: parseInt(borderRadius.md),
    },
    shadows: isDarkMode ? [
      'none',
      shadows.dark.xs,
      shadows.dark.sm,
      shadows.dark.sm,
      shadows.dark.md,
      shadows.dark.md,
      shadows.dark.lg,
      shadows.dark.lg,
      shadows.dark.xl,
      shadows.dark.xl,
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
      shadows.dark['2xl'],
    ] : [
      'none',
      shadows.light.xs,
      shadows.light.sm,
      shadows.light.sm,
      shadows.light.md,
      shadows.light.md,
      shadows.light.lg,
      shadows.light.lg,
      shadows.light.xl,
      shadows.light.xl,
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
      shadows.light['2xl'],
    ],
    transitions: {
      easing: {
        easeInOut: transitions.base,
        easeOut: transitions.fast,
        easeIn: transitions.slow,
        sharp: transitions.bounce,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            body1: 'p',
            body2: 'p',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--color-calendar-graph-day-bg': isDarkMode ? colors.dark.bg.secondary : colors.light.bg.secondary,
            '--color-calendar-graph-day-L1-bg': isDarkMode ? '#0e4429' : '#9be9a8',
            '--color-calendar-graph-day-L2-bg': isDarkMode ? '#006d32' : '#40c463',
            '--color-calendar-graph-day-L3-bg': isDarkMode ? '#26a641' : '#30a14e',
            '--color-calendar-graph-day-L4-bg': isDarkMode ? '#39d353' : '#216e39',
          },
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
          'html, body': {
            scrollBehavior: 'smooth',
          },
          body: {
            backgroundColor: isDarkMode ? colors.dark.bg.primary : colors.light.bg.primary,
            color: isDarkMode ? '#ffffff' : colors.gray[900],
            transition: `background-color ${transitions.base}, color ${transitions.base}`,
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode ? `${colors.gray[700]} ${colors.dark.bg.secondary}` : `${colors.gray[400]} ${colors.gray[100]}`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            '&::-webkit-scrollbar': {
              width: '10px',
              height: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDarkMode ? colors.dark.bg.secondary : colors.gray[100],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDarkMode ? colors.gray[700] : colors.gray[400],
              borderRadius: borderRadius.md,
              border: `2px solid ${isDarkMode ? colors.dark.bg.secondary : colors.gray[100]}`,
              '&:hover': {
                backgroundColor: isDarkMode ? colors.gray[600] : colors.gray[500],
              },
            },
          },
          'a': {
            color: isDarkMode ? colors.primary[400] : colors.primary[600],
            textDecoration: 'none',
            transition: `color ${transitions.fast}`,
            '&:hover': {
              color: isDarkMode ? colors.primary[300] : colors.primary[700],
              textDecoration: 'underline',
            },
          },
          'img': {
            maxWidth: '100%',
            height: 'auto',
          },
          'code': {
            fontFamily: typography.fontFamily.mono,
            fontSize: '0.875em',
            padding: '0.125em 0.375em',
            borderRadius: borderRadius.sm,
            backgroundColor: isDarkMode ? colors.dark.surface.secondary : colors.light.surface.secondary,
          },
          'pre': {
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            padding: '1rem',
            borderRadius: borderRadius.lg,
            overflow: 'auto',
            backgroundColor: isDarkMode ? colors.dark.surface.secondary : colors.light.surface.secondary,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? colors.dark.bg.paper : colors.light.bg.paper,
            backgroundImage: 'none',
            transition: `all ${transitions.base}`,
          },
          elevation1: {
            boxShadow: isDarkMode ? shadows.dark.sm : shadows.light.sm,
          },
          elevation2: {
            boxShadow: isDarkMode ? shadows.dark.md : shadows.light.md,
          },
          elevation3: {
            boxShadow: isDarkMode ? shadows.dark.lg : shadows.light.lg,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? colors.dark.bg.paper : colors.light.bg.paper,
            backgroundImage: 'none',
            borderRadius: borderRadius.lg,
            border: `1px solid ${isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle}`,
            transition: `all ${transitions.base}`,
            '&:hover': {
              borderColor: isDarkMode ? colors.dark.border.default : colors.light.border.default,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? 'rgba(30, 46, 66, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backgroundImage: 'none',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle}`,
            boxShadow: isDarkMode ? shadows.dark.sm : shadows.light.sm,
            transition: `all ${transitions.base}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? colors.dark.bg.paper : colors.light.bg.paper,
            backgroundImage: 'none',
            borderRight: `1px solid ${isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: borderRadius.md,
            fontWeight: typography.fontWeight.medium,
            transition: `all ${transitions.fast}`,
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: isDarkMode ? shadows.dark.md : shadows.light.md,
            },
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? colors.dark.surface.secondary : colors.light.surface.secondary,
            color: isDarkMode ? '#ffffff' : colors.gray[900],
            borderRadius: borderRadius.md,
            fontWeight: typography.fontWeight.medium,
            transition: `all ${transitions.fast}`,
            '&:hover': {
              backgroundColor: isDarkMode ? colors.dark.surface.tertiary : colors.light.surface.tertiary,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : colors.gray[900],
            transition: `all ${transitions.fast}`,
            '&:hover': {
              backgroundColor: isDarkMode ? colors.dark.surface.secondary : colors.light.surface.secondary,
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: isDarkMode ? colors.primary[400] : colors.primary[600],
            transition: `all ${transitions.fast}`,
            '&:hover': {
              color: isDarkMode ? colors.primary[300] : colors.primary[700],
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDarkMode ? colors.dark.bg.elevated : colors.gray[800],
            fontSize: typography.fontSize.sm,
            borderRadius: borderRadius.md,
            padding: '8px 12px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: borderRadius.md,
              transition: `all ${transitions.fast}`,
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? colors.dark.border.strong : colors.light.border.strong,
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 