'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { colors, typography, shadows, gradients, borderRadius, transitions } from './designSystem';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
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
        main: colors.primary[500],
        light: colors.primary[400],
        dark: colors.primary[700],
      },
      secondary: {
        main: colors.secondary[500],
        light: colors.secondary[400],
        dark: colors.secondary[700],
      },
      accent: {
        main: colors.accent.main,
        light: colors.accent.light,
        dark: colors.accent.dark,
        neon: colors.accent.neon,
      },
      background: {
        default: isDarkMode ? colors.dark.bg.primary : colors.light.bg.primary,
        paper: isDarkMode ? colors.dark.bg.paper : colors.light.bg.paper,
        card: isDarkMode ? colors.dark.bg.tertiary : colors.light.bg.tertiary,
        elevated: isDarkMode ? colors.dark.bg.elevated : colors.light.bg.elevated,
        gradient: gradients.primary,
        gradientAccent: gradients.accent,
        gradientSecondary: gradients.secondary,
        gradientNeon: gradients.neon,
        gradientText: gradients.text.primary,
        gradientHero: gradients.text.hero,
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
        glow: isDarkMode ? colors.dark.border.glow : colors.light.border.strong,
      },
      text: {
        primary: isDarkMode ? '#e2e8f0' : colors.gray[900],
        secondary: isDarkMode ? colors.gray[400] : colors.gray[600],
        disabled: isDarkMode ? colors.gray[600] : colors.gray[400],
      },
      divider: isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle,
    },
    typography: {
      fontFamily: typography.fontFamily.primary,
      h1: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['5xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        marginBottom: '1.5rem',
        letterSpacing: '-0.03em',
      },
      h2: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
        marginBottom: '1.25rem',
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
        marginBottom: '1rem',
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: typography.fontFamily.display,
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
        letterSpacing: '0.02em',
      },
      overline: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
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
            '--color-calendar-graph-day-L1-bg': isDarkMode ? '#064e3b' : '#a7f3d0',
            '--color-calendar-graph-day-L2-bg': isDarkMode ? '#047857' : '#6ee7b7',
            '--color-calendar-graph-day-L3-bg': isDarkMode ? '#059669' : '#34d399',
            '--color-calendar-graph-day-L4-bg': isDarkMode ? '#10b981' : '#10b981',
            // Accent glow custom property
            '--glow-color': colors.accent.main,
            '--glow-color-rgb': '0, 237, 100',
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
            color: isDarkMode ? '#e2e8f0' : colors.gray[900],
            transition: `background-color ${transitions.base}, color ${transitions.base}`,
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode
              ? `${colors.gray[700]} ${colors.dark.bg.primary}`
              : `${colors.gray[400]} ${colors.gray[100]}`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDarkMode ? colors.dark.bg.primary : colors.gray[100],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDarkMode ? colors.gray[700] : colors.gray[400],
              borderRadius: borderRadius.full,
              border: `2px solid ${isDarkMode ? colors.dark.bg.primary : colors.gray[100]}`,
              '&:hover': {
                backgroundColor: isDarkMode ? colors.primary[600] : colors.primary[500],
              },
            },
          },
          'a': {
            color: isDarkMode ? colors.primary[400] : colors.primary[600],
            textDecoration: 'none',
            transition: `color ${transitions.fast}`,
            '&:hover': {
              color: isDarkMode ? colors.accent.main : colors.primary[700],
              textDecoration: 'none',
            },
          },
          'img': {
            maxWidth: '100%',
            height: 'auto',
          },
          '::selection': {
            backgroundColor: isDarkMode
              ? 'rgba(0, 237, 100, 0.25)'
              : 'rgba(16, 185, 129, 0.25)',
            color: isDarkMode ? '#ffffff' : colors.gray[900],
          },
          'code': {
            fontFamily: typography.fontFamily.mono,
            fontSize: '0.875em',
            padding: '0.15em 0.4em',
            borderRadius: borderRadius.sm,
            backgroundColor: isDarkMode
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(16, 185, 129, 0.08)',
            color: isDarkMode ? colors.primary[300] : colors.primary[700],
            border: `1px solid ${isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)'}`,
          },
          'pre': {
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            padding: '1.25rem',
            borderRadius: borderRadius.lg,
            overflow: 'auto',
            backgroundColor: isDarkMode
              ? 'rgba(3, 7, 18, 0.8)'
              : colors.gray[50],
            border: `1px solid ${isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle}`,
            '& code': {
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? colors.dark.bg.paper : colors.light.bg.paper,
            backgroundImage: isDarkMode ? gradients.card.dark : 'none',
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
            backgroundImage: isDarkMode ? gradients.card.dark : 'none',
            borderRadius: borderRadius.lg,
            border: `1px solid ${isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle}`,
            transition: `all ${transitions.base}`,
            '&:hover': {
              borderColor: isDarkMode ? colors.dark.border.default : colors.light.border.default,
              backgroundImage: isDarkMode ? gradients.card.hover : 'none',
              boxShadow: isDarkMode ? shadows.glow.subtle : shadows.light.md,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode
              ? 'rgba(3, 7, 18, 0.85)'
              : 'rgba(255, 255, 255, 0.85)',
            backgroundImage: 'none',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: `1px solid ${isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle}`,
            boxShadow: isDarkMode
              ? '0 1px 0 0 rgba(16, 185, 129, 0.05)'
              : shadows.light.xs,
            transition: `all ${transitions.base}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? colors.dark.bg.primary : colors.light.bg.paper,
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
              boxShadow: isDarkMode ? shadows.glow.primary : shadows.light.md,
            },
          },
          containedPrimary: {
            background: gradients.primary,
            '&:hover': {
              background: gradients.primary,
              filter: 'brightness(1.1)',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            borderColor: isDarkMode ? colors.dark.border.default : colors.light.border.default,
            '&:hover': {
              borderWidth: '1.5px',
              borderColor: colors.primary[500],
              backgroundColor: isDarkMode
                ? 'rgba(16, 185, 129, 0.08)'
                : 'rgba(16, 185, 129, 0.04)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(16, 185, 129, 0.08)',
            color: isDarkMode ? colors.primary[300] : colors.primary[700],
            borderRadius: borderRadius.md,
            fontWeight: typography.fontWeight.medium,
            fontSize: typography.fontSize.xs,
            border: `1px solid ${isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)'}`,
            transition: `all ${transitions.fast}`,
            '&:hover': {
              backgroundColor: isDarkMode
                ? 'rgba(16, 185, 129, 0.18)'
                : 'rgba(16, 185, 129, 0.12)',
              boxShadow: isDarkMode ? shadows.glow.subtle : 'none',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? colors.gray[300] : colors.gray[700],
            transition: `all ${transitions.fast}`,
            '&:hover': {
              backgroundColor: isDarkMode
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(16, 185, 129, 0.06)',
              color: colors.primary[isDarkMode ? 400 : 600],
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
              color: isDarkMode ? colors.accent.main : colors.primary[700],
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDarkMode ? colors.dark.bg.elevated : colors.gray[800],
            color: isDarkMode ? colors.gray[200] : '#ffffff',
            fontSize: typography.fontSize.sm,
            borderRadius: borderRadius.md,
            padding: '8px 14px',
            border: `1px solid ${isDarkMode ? colors.dark.border.subtle : 'transparent'}`,
            boxShadow: isDarkMode ? shadows.dark.md : shadows.light.md,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: borderRadius.md,
              transition: `all ${transitions.fast}`,
              '& fieldset': {
                borderColor: isDarkMode ? colors.dark.border.subtle : colors.light.border.default,
              },
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? colors.primary[600] : colors.primary[400],
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary[500],
                  boxShadow: isDarkMode ? shadows.glow.subtle : 'none',
                },
              },
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDarkMode ? colors.dark.border.subtle : colors.light.border.subtle,
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
