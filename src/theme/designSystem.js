/**
 * Editorial Design System
 * Typography-led personal brand — warm neutral canvas, a single confident
 * persimmon/clay signature accent, and a muted gold support tone.
 * Serif display (Fraunces) + clean sans (Inter) + mono (JetBrains Mono).
 */

export const colors = {
  // Primary Brand Colors — Persimmon / Clay (the signature accent)
  primary: {
    50: '#fdf3ee',
    100: '#fbe2d5',
    200: '#f6c3a9',
    300: '#ef9d76',
    400: '#e8794a',
    500: '#d9622b', // Main primary
    600: '#be4e1c',
    700: '#9c3e15',
    800: '#7c3315',
    900: '#652c15',
  },

  // Secondary Brand Colors — Muted Gold / Ochre (warm support tone)
  secondary: {
    50: '#fbf6ea',
    100: '#f5e9c9',
    200: '#ebd08f',
    300: '#dfb457',
    400: '#cf9d3c',
    500: '#c79a3a', // Main secondary
    600: '#a67c2b',
    700: '#835f24',
    800: '#674b22',
    900: '#573f20',
  },

  // Accent Colors — a warm ember highlight (used sparingly)
  accent: {
    light: '#f6c3a9',
    main: '#e8794a',
    dark: '#9c3e15',
    mongodb: '#d9622b', // legacy key retained; now the signature persimmon
    neon: '#f0955c',
    glow: 'rgba(217, 98, 43, 0.5)',
  },

  // Neutral Grays — WARM-tinted (taupe/stone) for an editorial feel
  gray: {
    50: '#faf8f3',
    100: '#f3efe7',
    200: '#e7e1d5',
    300: '#d4ccbc',
    400: '#a69e90',
    500: '#7f776a',
    600: '#635c51',
    700: '#4a453c',
    800: '#302c26',
    900: '#1f1b16',
    950: '#14120e',
  },

  // Dark mode — warm near-black "ink" canvas (not cold blue-black)
  dark: {
    bg: {
      primary: '#14120e',    // warm ink
      secondary: '#1a1712',  // slightly lifted
      tertiary: '#211d16',   // card backgrounds
      paper: '#1a1712',      // paper surface
      elevated: '#252118',   // elevated surfaces
    },
    surface: {
      primary: 'rgba(232, 121, 74, 0.05)',
      secondary: 'rgba(232, 121, 74, 0.08)',
      tertiary: 'rgba(232, 121, 74, 0.12)',
    },
    border: {
      subtle: 'rgba(240, 235, 224, 0.08)',
      default: 'rgba(240, 235, 224, 0.14)',
      strong: 'rgba(232, 121, 74, 0.35)',
      glow: 'rgba(232, 121, 74, 0.3)',
    },
  },

  // Light mode — warm ivory paper with warm ink
  light: {
    bg: {
      primary: '#faf8f3',    // warm ivory paper
      secondary: '#f3efe7',
      tertiary: '#ede7db',
      paper: '#ffffff',
      elevated: '#ffffff',
    },
    surface: {
      primary: 'rgba(217, 98, 43, 0.04)',
      secondary: 'rgba(217, 98, 43, 0.06)',
      tertiary: 'rgba(217, 98, 43, 0.10)',
    },
    border: {
      subtle: 'rgba(31, 27, 22, 0.10)',
      default: 'rgba(31, 27, 22, 0.16)',
      strong: 'rgba(217, 98, 43, 0.30)',
    },
  },

  // Status colors
  status: {
    success: '#4f9d69',
    warning: '#c79a3a',
    error: '#c2461f',
    info: '#4a6d8c',
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
    primary: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'var(--font-fraunces), Georgia, "Times New Roman", serif',
    mono: 'var(--font-mono), "JetBrains Mono", "Fira Code", "Courier New", monospace',
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
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.7,
    loose: 2,
  },
};

// Border Radius System — crisper, more editorial
export const borderRadius = {
  none: '0',
  sm: '3px',
  md: '6px',
  lg: '10px',
  xl: '14px',
  '2xl': '20px',
  '3xl': '28px',
  full: '9999px',
};

// Shadow System — soft, warm, understated (no neon)
export const shadows = {
  light: {
    xs: '0 1px 2px 0 rgba(31, 27, 22, 0.04)',
    sm: '0 1px 3px 0 rgba(31, 27, 22, 0.06), 0 1px 2px 0 rgba(31, 27, 22, 0.04)',
    md: '0 4px 12px -2px rgba(31, 27, 22, 0.08), 0 2px 6px -2px rgba(31, 27, 22, 0.05)',
    lg: '0 12px 28px -6px rgba(31, 27, 22, 0.10), 0 6px 12px -6px rgba(31, 27, 22, 0.06)',
    xl: '0 24px 48px -12px rgba(31, 27, 22, 0.14), 0 12px 20px -10px rgba(31, 27, 22, 0.08)',
    '2xl': '0 40px 72px -20px rgba(31, 27, 22, 0.18)',
    inner: 'inset 0 2px 4px 0 rgba(31, 27, 22, 0.05)',
  },
  dark: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    sm: '0 2px 6px 0 rgba(0, 0, 0, 0.45)',
    md: '0 6px 16px -2px rgba(0, 0, 0, 0.55)',
    lg: '0 14px 32px -6px rgba(0, 0, 0, 0.6)',
    xl: '0 24px 48px -10px rgba(0, 0, 0, 0.7)',
    '2xl': '0 40px 72px -18px rgba(0, 0, 0, 0.8)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  },
  glow: {
    primary: '0 8px 24px rgba(217, 98, 43, 0.28)',
    secondary: '0 8px 24px rgba(199, 154, 58, 0.24)',
    accent: '0 8px 28px rgba(232, 121, 74, 0.30)',
    neon: '0 6px 20px rgba(232, 121, 74, 0.22)',
    subtle: '0 4px 16px rgba(217, 98, 43, 0.12)',
  },
};

// Gradients — warm, restrained (persimmon → gold family)
export const gradients = {
  primary: 'linear-gradient(135deg, #e8794a 0%, #d9622b 55%, #be4e1c 100%)',
  secondary: 'linear-gradient(135deg, #cf9d3c 0%, #a67c2b 100%)',
  accent: 'linear-gradient(135deg, #f0955c 0%, #d9622b 100%)',
  neon: 'linear-gradient(135deg, #e8794a 0%, #c79a3a 100%)',
  hero: {
    light: 'linear-gradient(135deg, #faf8f3 0%, #f3efe7 50%, #f6e9dd 100%)',
    dark: 'linear-gradient(135deg, #14120e 0%, #1a1712 50%, #14120e 100%)',
  },
  mesh: {
    light: 'radial-gradient(at 18% 18%, rgba(217, 98, 43, 0.07) 0px, transparent 55%), radial-gradient(at 82% 12%, rgba(199, 154, 58, 0.06) 0px, transparent 50%), radial-gradient(at 55% 85%, rgba(232, 121, 74, 0.05) 0px, transparent 55%)',
    dark: 'radial-gradient(at 18% 18%, rgba(217, 98, 43, 0.14) 0px, transparent 55%), radial-gradient(at 82% 12%, rgba(199, 154, 58, 0.10) 0px, transparent 50%), radial-gradient(at 55% 85%, rgba(232, 121, 74, 0.08) 0px, transparent 55%)',
  },
  // Text gradient for the occasional highlighted word
  text: {
    primary: 'linear-gradient(135deg, #d9622b, #e8794a)',
    hero: 'linear-gradient(135deg, #e8794a, #d9622b, #c79a3a)',
    accent: 'linear-gradient(135deg, #e8794a, #f0955c)',
  },
  // Card/surface gradients
  card: {
    dark: 'linear-gradient(145deg, rgba(232, 121, 74, 0.05) 0%, rgba(199, 154, 58, 0.03) 100%)',
    hover: 'linear-gradient(145deg, rgba(232, 121, 74, 0.10) 0%, rgba(199, 154, 58, 0.05) 100%)',
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
