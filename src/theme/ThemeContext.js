'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
      background: {
        paper: isDarkMode ? '#1a1a1a' : '#ffffff',
        default: isDarkMode ? '#121212' : '#f5f5f5',
        gradient: isDarkMode 
          ? 'linear-gradient(135deg, #05668D 0%, #679436 100%)'
          : 'linear-gradient(135deg, #05668D 0%, #679436 100%)',
      },
      primary: {
        main: '#05668D',
      },
      secondary: {
        main: '#679436',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--color-calendar-graph-day-bg': isDarkMode ? 'rgb(20, 20, 20)' : 'rgb(235, 237, 240)',
            '--color-calendar-graph-day-L1-bg': '#0a4208',
            '--color-calendar-graph-day-L2-bg': '#047526',
            '--color-calendar-graph-day-L3-bg': '#45a045',
            '--color-calendar-graph-day-L4-bg': '#39dd34',
          },
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode ? '#444 rgb(15, 15, 15)' : '#ccc #f5f5f5',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDarkMode ? 'rgb(15, 15, 15)' : '#f5f5f5',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDarkMode ? '#444' : '#ccc',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: isDarkMode ? '#555' : '#bbb',
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