/**
 * Dark & Techy Design System
 * Emerald/Green-focused design language with terminal aesthetic
 */

export const colors = {
  // Primary Brand Colors - Emerald Greens
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Main primary
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // Secondary Brand Colors - Cyan/Teal
  secondary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4', // Main secondary
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },

  // Accent Colors - Neon Green (MongoDB-inspired)
  accent: {
    light: '#86efac',
    main: '#00ED64',
    dark: '#15803d',
    mongodb: '#00ED64',
    neon: '#39ff14',
    glow: 'rgba(0, 237, 100, 0.6)',
  },

  // Neutral Grays - Cool-tinted for techy feel
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Dark mode specific colors - Deep space with green tint
  dark: {
    bg: {
      primary: '#030712',    // Near black
      secondary: '#0a0f1a',  // Slightly lighter
      tertiary: '#111827',   // Card backgrounds
      paper: '#0d1117',      // GitHub-dark inspired
      elevated: '#161b22',   // Elevated surfaces
    },
    surface: {
      primary: 'rgba(16, 185, 129, 0.04)',    // Emerald tint
      secondary: 'rgba(16, 185, 129, 0.08)',
      tertiary: 'rgba(16, 185, 129, 0.12)',
    },
    border: {
      subtle: 'rgba(48, 54, 61, 0.8)',
      default: 'rgba(16, 185, 129, 0.15)',
      strong: 'rgba(16, 185, 129, 0.25)',
      glow: 'rgba(0, 237, 100, 0.3)',
    },
  },

  // Light mode specific colors - Clean with green accents
  light: {
    bg: {
      primary: '#fafdfb',
      secondary: '#f0fdf4',
      tertiary: '#ecfdf5',
      paper: '#ffffff',
      elevated: '#ffffff',
    },
    surface: {
      primary: 'rgba(16, 185, 129, 0.04)',
      secondary: 'rgba(16, 185, 129, 0.06)',
      tertiary: 'rgba(16, 185, 129, 0.10)',
    },
    border: {
      subtle: 'rgba(16, 185, 129, 0.12)',
      default: 'rgba(16, 185, 129, 0.20)',
      strong: 'rgba(16, 185, 129, 0.30)',
    },
  },

  // Status colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
  },
};

// Professional Spacing System (8px base)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
};

// Typography Scale
export const typography = {
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: '"Space Grotesk", "Inter", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

// Shadow System
export const shadows = {
  light: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  dark: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 20px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 30px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  },
  glow: {
    primary: '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)',
    secondary: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)',
    accent: '0 0 20px rgba(0, 237, 100, 0.4), 0 0 60px rgba(0, 237, 100, 0.15)',
    neon: '0 0 5px rgba(0, 237, 100, 0.4), 0 0 20px rgba(0, 237, 100, 0.2), 0 0 40px rgba(0, 237, 100, 0.1)',
    subtle: '0 0 15px rgba(16, 185, 129, 0.15)',
  },
};

// Gradients
export const gradients = {
  primary: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
  secondary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  accent: 'linear-gradient(135deg, #00ED64 0%, #10b981 100%)',
  neon: 'linear-gradient(135deg, #00ED64 0%, #06b6d4 100%)',
  hero: {
    light: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ecfeff 100%)',
    dark: 'linear-gradient(135deg, #030712 0%, #0a0f1a 50%, #030712 100%)',
  },
  mesh: {
    light: 'radial-gradient(at 20% 20%, rgba(16, 185, 129, 0.08) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(6, 182, 212, 0.06) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(0, 237, 100, 0.04) 0px, transparent 50%)',
    dark: 'radial-gradient(at 20% 20%, rgba(16, 185, 129, 0.12) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(6, 182, 212, 0.08) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(0, 237, 100, 0.06) 0px, transparent 50%)',
  },
  // Subtle text gradient for headings
  text: {
    primary: 'linear-gradient(135deg, #10b981, #00ED64)',
    hero: 'linear-gradient(135deg, #34d399, #00ED64, #06b6d4)',
    accent: 'linear-gradient(135deg, #00ED64, #86efac)',
  },
  // Card/surface gradients
  card: {
    dark: 'linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%)',
    hover: 'linear-gradient(145deg, rgba(16, 185, 129, 0.10) 0%, rgba(6, 182, 212, 0.05) 100%)',
  },
};

// Transitions
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  gradients,
  transitions,
  breakpoints,
  zIndex,
};
