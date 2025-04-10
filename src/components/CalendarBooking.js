'use client';

import { Box, useTheme } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

const CalendarBooking = ({ variant = 'button', buttonProps = {} }) => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const linkRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Only load the script once
    if (!document.querySelector('script[src*="scheduling-button-script.js"]')) {
      // Load the Google Calendar scheduling button script
      scriptRef.current = document.createElement('script');
      scriptRef.current.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      scriptRef.current.async = true;
      scriptRef.current.onload = () => {
        setIsScriptLoaded(true);
      };

      // Load the CSS if not already loaded
      if (!document.querySelector('link[href*="scheduling-button-script.css"]')) {
        linkRef.current = document.createElement('link');
        linkRef.current.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
        linkRef.current.rel = 'stylesheet';
        document.head.appendChild(linkRef.current);
      }

      document.body.appendChild(scriptRef.current);
    } else {
      setIsScriptLoaded(true);
    }

    return () => {
      // Only remove the script and CSS if this is the last instance
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      if (linkRef.current && document.head.contains(linkRef.current)) {
        document.head.removeChild(linkRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && variant === 'button' && window.calendar?.schedulingButton && containerRef.current) {
      window.calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ22pDnyxL4HQX5BuG5tS9zzj3z58zaoB2oqDwHUl2rfBKM5O6oJ2MnHzVKSBaHOW23TKtvQ1_6I?gv=true',
        color: '#fff',
        label: buttonProps.children || 'Schedule a Meeting',
        target: containerRef.current,
      });

      // Apply custom styles to the generated button
      const button = containerRef.current.querySelector('button');
      if (button) {
        button.style.border = '2px solid rgba(255,255,255,0.6)';
        button.style.padding = '12px 32px';
        button.style.fontSize = '1rem';
        button.style.fontWeight = '600';
        button.style.transition = 'all 0.3s ease';
        button.style.backgroundColor = 'transparent';
        button.style.borderRadius = '4px';

        button.addEventListener('mouseover', () => {
          button.style.borderColor = '#fff';
          button.style.backgroundColor = 'rgba(255,255,255,0.1)';
          button.style.transform = 'translateY(-2px)';
          button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });

        button.addEventListener('mouseout', () => {
          button.style.borderColor = 'rgba(255,255,255,0.6)';
          button.style.backgroundColor = 'transparent';
          button.style.transform = 'translateY(0)';
          button.style.boxShadow = 'none';
        });
      }
    }
  }, [isScriptLoaded, variant, buttonProps.children]);

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
        display: 'inline-flex',
        alignItems: 'center',
      }}
    />
  );
};

export default CalendarBooking; 