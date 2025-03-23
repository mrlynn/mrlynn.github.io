import { createTheme } from '@mui/material/styles';

const commonTheme = {
  typography: {
    fontFamily: '"Space Grotesk", "Inter", sans-serif',
    h1: {
      fontSize: '5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          fontWeight: 500,
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          '& .MuiCardContent-root': {
            color: 'inherit',
          },
          '& .MuiTypography-root': {
            color: 'inherit',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // Green
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#2E7D32', // Darker green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
      dark: '#000000',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      glass: 'rgba(30, 30, 30, 0.8)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
  components: {
    ...commonTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          ...commonTheme.components.MuiCard.styleOverrides.root,
          backgroundColor: '#1E1E1E',
          borderColor: 'rgba(255,255,255,0.1)',
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        ...commonTheme.components.MuiButton.styleOverrides,
        contained: {
          ...commonTheme.components.MuiButton.styleOverrides.contained,
          '&:hover': {
            boxShadow: '0 4px 12px rgba(76,175,80,0.2)',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32', // Darker green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#4CAF50', // Green
      light: '#81C784',
      dark: '#388E3C',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
      dark: '#E0E0E0',
      gradient: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      glass: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0,0,0,0.7)',
    },
  },
  components: {
    ...commonTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          ...commonTheme.components.MuiCard.styleOverrides.root,
          backgroundColor: '#FFFFFF',
          borderColor: 'rgba(0,0,0,0.1)',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        ...commonTheme.components.MuiButton.styleOverrides,
        contained: {
          ...commonTheme.components.MuiButton.styleOverrides.contained,
          '&:hover': {
            boxShadow: '0 4px 12px rgba(46,125,50,0.2)',
          },
        },
      },
    },
  },
}); 