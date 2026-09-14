/**
 * Design System
 * Near-black "night" canvas with a single sodium-yellow accent, and a matching
 * light mode on a cool off-white. One grotesk (Familjen Grotesk) for headings
 * and body, one mono (Fragment Mono) for labels and code. No gradients or glows.
 */

export const colors = {
  // Primary — sodium yellow. 500 is the fill colour; on the light canvas it is
  // far too pale for text, so text uses 800 there (see accentText below).
  primary: {
    50: '#fdf8e4',
    100: '#faefc2',
    200: '#f4e08e',
    300: '#eed267',
    400: '#ebcb56',
    500: '#e8c547', // Main primary
    600: '#c9a52b',
    700: '#9c7e12',
    800: '#7d6200',
    900: '#5c4800',
  },

  // Secondary — olive-tinted stone, for quiet support tones
  secondary: {
    50: '#f5f5f0',
    100: '#e8e7df',
    200: '#d3d1c6',
    300: '#b8b6aa',
    400: '#9d9b8f',
    500: '#85837a',
    600: '#6b6a62',
    700: '#52514b',
    800: '#3a3a35',
    900: '#262723',
  },

  // Accent — the same yellow; kept as its own key because components read it
  accent: {
    light: '#f4e08e',
    main: '#e8c547',
    dark: '#9c7e12',
    mongodb: '#e8c547', // legacy key retained; now the signature yellow
    neon: '#eed267',
    glow: 'rgba(232, 197, 71, 0.4)',
  },

  // Neutral grays — tinted slightly toward olive to sit with the night canvas
  gray: {
    50: '#f5f5f0',
    100: '#efeee8',
    200: '#e1e0d8',
    300: '#c9c7bd',
    400: '#a9a79d',
    500: '#85837a',
    600: '#65645c',
    700: '#4a4b44',
    800: '#2d2f2a',
    900: '#1c1e1a',
    950: '#131512',
  },

  // Dark mode — near-black night canvas
  dark: {
    bg: {
      primary: '#131512',
      secondary: '#181a17',
      tertiary: '#1e201c',   // card backgrounds
      paper: '#181a17',
      elevated: '#232520',
    },
    surface: {
      primary: 'rgba(232, 197, 71, 0.05)',
      secondary: 'rgba(232, 197, 71, 0.08)',
      tertiary: 'rgba(232, 197, 71, 0.12)',
    },
    border: {
      subtle: 'rgba(232, 230, 220, 0.09)',
      default: 'rgba(232, 230, 220, 0.16)',
      strong: 'rgba(232, 197, 71, 0.4)',
      glow: 'rgba(232, 197, 71, 0.4)',
    },
  },

  // Light mode — cool off-white with night ink
  light: {
    bg: {
      primary: '#efeee8',
      secondary: '#e7e6df',
      tertiary: '#dfded6',
      paper: '#f7f6f1',
      elevated: '#fbfbf8',
    },
    surface: {
      primary: 'rgba(125, 98, 0, 0.04)',
      secondary: 'rgba(125, 98, 0, 0.07)',
      tertiary: 'rgba(125, 98, 0, 0.11)',
    },
    border: {
      subtle: 'rgba(19, 21, 18, 0.12)',
      default: 'rgba(19, 21, 18, 0.2)',
      strong: 'rgba(125, 98, 0, 0.35)',
    },
  },

  // Status colors
  status: {
    success: '#4f9d69',
    warning: '#c9a52b',
    error: '#c2461f',
    info: '#4a6d8c',
  },
};

// Professional Spacing System (8px base)
/**
 * Accent for TEXT and icons, by theme.
 *
 * The sodium yellow (#e8c547, primary.500) measures about 10.9:1 on the night
 * canvas, so dark mode reads it directly. On the light canvas it is ~1.5:1 and
 * unreadable, so light mode uses primary.800 (#7d6200, ~5.0:1 on #efeee8).
 *
 * Use this anywhere the accent is being read, not just seen. Fills and borders
 * can keep using colors.primary[500] in both modes.
 */
export const accentText = {
  light: '#7d6200',
  dark: '#e8c547',
};

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
    primary: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
    display: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
    mono: 'var(--font-mono), ui-monospace, Menlo, "Courier New", monospace',
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

// Border Radius System — tight corners
export const borderRadius = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '6px',
  xl: '8px',
  '2xl': '10px',
  '3xl': '12px',
  full: '9999px',
};

// Shadow System — understated; no coloured glows
export const shadows = {
  light: {
    xs: '0 1px 2px 0 rgba(19, 21, 18, 0.04)',
    sm: '0 1px 3px 0 rgba(19, 21, 18, 0.06), 0 1px 2px 0 rgba(19, 21, 18, 0.04)',
    md: '0 4px 12px -2px rgba(19, 21, 18, 0.08), 0 2px 6px -2px rgba(19, 21, 18, 0.05)',
    lg: '0 12px 28px -6px rgba(19, 21, 18, 0.10), 0 6px 12px -6px rgba(19, 21, 18, 0.06)',
    xl: '0 24px 48px -12px rgba(19, 21, 18, 0.14), 0 12px 20px -10px rgba(19, 21, 18, 0.08)',
    '2xl': '0 40px 72px -20px rgba(19, 21, 18, 0.18)',
    inner: 'inset 0 2px 4px 0 rgba(19, 21, 18, 0.05)',
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
  // Glows are retired. The keys stay so existing references resolve to nothing.
  glow: {
    primary: 'none',
    secondary: 'none',
    accent: 'none',
    neon: 'none',
    subtle: 'none',
  },
};

// Gradients — retired in favour of flat fills. Every key still exists because
// components read them as `background` values; each now resolves to a solid
// colour (or `none`), which also works under background-clip: text.
export const gradients = {
  primary: '#e8c547',
  secondary: '#85837a',
  accent: '#e8c547',
  neon: '#e8c547',
  hero: {
    light: '#efeee8',
    dark: '#131512',
  },
  mesh: {
    light: 'none',
    dark: 'none',
  },
  text: {
    primary: '#e8c547',
    hero: '#e8c547',
    accent: '#e8c547',
  },
  card: {
    dark: 'none',
    hover: 'none',
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
  accentText,
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
