'use client';

import { Box, Typography, Button, useTheme } from '@mui/material';
import { CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';

const CalendarBooking = ({ variant = 'button' }) => {
  const theme = useTheme();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    if (variant === 'button') {
      // Load the Google Calendar scheduling button script
      scriptRef.current = document.createElement('script');
      scriptRef.current.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      scriptRef.current.async = true;
      scriptRef.current.onload = () => {
        setIsScriptLoaded(true);
        // Initialize the scheduling button after script is loaded
        if (window.calendar && window.calendar.schedulingButton && containerRef.current) {
          window.calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ22pDnyxL4HQX5BuG5tS9zzj3z58zaoB2oqDwHUl2rfBKM5O6oJ2MnHzVKSBaHOW23TKtvQ1_6I?gv=true',
            color: theme.palette.primary.main,
            label: 'Book an appointment',
            target: containerRef.current,
          });
        }
      };

      // Load the CSS
      linkRef.current = document.createElement('link');
      linkRef.current.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
      linkRef.current.rel = 'stylesheet';

      // Append elements to document
      document.head.appendChild(linkRef.current);
      document.body.appendChild(scriptRef.current);

      return () => {
        // Cleanup
        if (scriptRef.current && document.body.contains(scriptRef.current)) {
          document.body.removeChild(scriptRef.current);
        }
        if (linkRef.current && document.head.contains(linkRef.current)) {
          document.head.removeChild(linkRef.current);
        }
      };
    }
  }, [variant, theme.palette.primary.main]);

  if (variant === 'iframe') {
    return (
      <Box 
        sx={{ 
          width: '100%', 
          height: '600px', 
          border: 'none',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          mb: 4,
          backgroundColor: 'white',
        }}
      >
        <iframe 
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ22pDnyxL4HQX5BuG5tS9zzj3z58zaoB2oqDwHUl2rfBKM5O6oJ2MnHzVKSBaHOW23TKtvQ1_6I?gv=true" 
          style={{ 
            border: 0, 
            width: '100%', 
            height: '100%',
            backgroundColor: 'white',
          }} 
          frameBorder="0"
          title="Calendar Booking"
        />
      </Box>
    );
  }

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        my: 4
      }}
    >
      {!isScriptLoaded && (
        <Button
          variant="contained"
          startIcon={<CalendarIcon />}
          sx={{
            py: 1.5,
            px: 3,
            borderRadius: '8px',
            fontWeight: 600,
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Book an appointment
        </Button>
      )}
    </Box>
  );
};

export default CalendarBooking; 