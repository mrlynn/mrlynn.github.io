import { createTheme } from '@mui/material/styles';

const theme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#61dafb' : '#0070f3',
      },
      background: {
        default: isDark ? '#0a1929' : '#ffffff',
        paper: isDark ? '#0a1929' : '#ffffff',
        gradient: isDark
          ? 'linear-gradient(45deg,rgb(97, 251, 141) 30%, #0070f3 90%)'
          : 'linear-gradient(45deg,rgb(29, 124, 19) 30%,rgb(97, 251, 141) 90%)',
      },
      text: {
        primary: isDark ? '#ffffff' : '#000000',
        secondary: isDark ? '#b3b3b3' : '#666666',
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