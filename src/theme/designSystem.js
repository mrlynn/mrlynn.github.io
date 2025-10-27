/**
 * Professional Design System
 * A cohesive design language for mrlynn.github.io
 */

export const colors = {
  // Primary Brand Colors - Professional Blues
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Main primary
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Secondary Brand Colors - Vibrant Greens
  secondary: {
    50: '#f1f8e9',
    100: '#dcedc8',
    200: '#c5e1a5',
    300: '#aed581',
    400: '#9ccc65',
    500: '#8bc34a', // Main secondary
    600: '#7cb342',
    700: '#689f38',
    800: '#558b2f',
    900: '#33691e',
  },
  
  // Accent Colors - MongoDB Green
  accent: {
    light: '#A5BE00',
    main: '#00ED64',
    dark: '#679436',
    mongodb: '#00ED64',
  },
  
  // Neutral Grays - For text and backgrounds
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Dark mode specific colors
  dark: {
    bg: {
      primary: '#0a0e27',
      secondary: '#141b2d',
      tertiary: '#1a2332',
      paper: '#1e293b',
      elevated: '#273244',
    },
    surface: {
      primary: 'rgba(255, 255, 255, 0.05)',
      secondary: 'rgba(255, 255, 255, 0.08)',
      tertiary: 'rgba(255, 255, 255, 0.12)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      default: 'rgba(255, 255, 255, 0.12)',
      strong: 'rgba(255, 255, 255, 0.16)',
    },
  },
  
  // Light mode specific colors
  light: {
    bg: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      tertiary: '#f1f3f5',
      paper: '#ffffff',
      elevated: '#ffffff',
    },
    surface: {
      primary: 'rgba(0, 0, 0, 0.02)',
      secondary: 'rgba(0, 0, 0, 0.04)',
      tertiary: 'rgba(0, 0, 0, 0.06)',
    },
    border: {
      subtle: 'rgba(0, 0, 0, 0.06)',
      default: 'rgba(0, 0, 0, 0.12)',
      strong: 'rgba(0, 0, 0, 0.16)',
    },
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

// Shadow System (Professional depth)
export const shadows = {
  light: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  dark: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
  },
  glow: {
    primary: '0 0 20px rgba(33, 150, 243, 0.3)',
    secondary: '0 0 20px rgba(139, 195, 74, 0.3)',
    accent: '0 0 20px rgba(0, 237, 100, 0.3)',
  },
};

// Gradients
export const gradients = {
  primary: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
  secondary: 'linear-gradient(135deg, #8bc34a 0%, #689f38 100%)',
  accent: 'linear-gradient(135deg, #00ED64 0%, #A5BE00 100%)',
  hero: {
    light: 'linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%)',
    dark: 'linear-gradient(135deg, #0a0e27 0%, #141b2d 100%)',
  },
  mesh: {
    light: 'radial-gradient(at 40% 20%, #e3f2fd 0px, transparent 50%), radial-gradient(at 80% 0%, #f1f8e9 0px, transparent 50%), radial-gradient(at 0% 50%, #ffffff 0px, transparent 50%)',
    dark: 'radial-gradient(at 40% 20%, rgba(33, 150, 243, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 195, 74, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0, 237, 100, 0.1) 0px, transparent 50%)',
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

