import { createTheme } from '@mui/material/styles';

const theme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#d9622b' : '#be4e1c',
      },
      background: {
        default: isDark ? '#14120e' : '#fafdfb',
        paper: isDark ? '#0d1117' : '#ffffff',
        gradient: isDark
          ? 'linear-gradient(135deg, #d9622b 0%, #e8794a 100%)'
          : 'linear-gradient(135deg, #be4e1c 0%, #d9622b 100%)',
      },
      text: {
        primary: isDark ? '#f0ebe0' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.2,
        marginBottom: '1.5rem',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        marginBottom: '1.25rem',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '1rem',
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.75rem',
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.5rem',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.5rem',
      },
      body1: {
        fontSize: '1.125rem',
        lineHeight: 1.6,
        marginBottom: '1rem',
      },
      body2: {
        fontSize: '1rem',
        lineHeight: 1.6,
        marginBottom: '0.75rem',
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
    },
  });
};

export default theme; 