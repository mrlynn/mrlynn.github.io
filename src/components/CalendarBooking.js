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
      // The script tag exists, but it may still be in flight — a second
      // instance on the same page must wait for the API, not assume it.
      if (window.calendar?.schedulingButton) {
        setIsScriptLoaded(true);
      } else {
        const existing = document.querySelector('script[src*="scheduling-button-script.js"]');
        existing.addEventListener('load', () => setIsScriptLoaded(true), { once: true });
      }
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
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2QFBjXXlNk5fK-AeYLAkGBdT6tKZnmS0wtU5sVWtW4DPl5iajADiMFwa5zggu6yrJL2e7lKGS5?gv=true',
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
    const isDark = theme.palette.mode === 'dark';

    // Google's appointment scheduler has no dark mode and no theme parameter,
    // and it is cross-origin, so its content cannot be restyled. Inverting the
    // iframe does produce a dark widget, but it also renders the headshot
    // Google shows inside it as a photo negative.
    //
    // So the widget stays light and gets framed instead: a warm inset that
    // matches the site's cream palette, so the light panel reads as a
    // deliberate card rather than a white hole punched in a near-black page.
    return (
      <Box
        sx={{
          width: '100%',
          p: isDark ? { xs: 1.5, md: 2 } : 0,
          borderRadius: '12px',
          backgroundColor: isDark ? 'rgba(250, 246, 240, 0.92)' : 'transparent',
          border: isDark ? '1px solid rgba(217, 98, 43, 0.22)' : 'none',
          boxShadow: isDark
            ? '0 12px 40px rgba(0,0,0,0.45)'
            : '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            // 600px clipped the time-slot list mid-row. The widget does not
            // report its own height across origins, so this is sized to fit
            // the tallest state it renders.
            height: { xs: '760px', sm: '700px' },
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2QFBjXXlNk5fK-AeYLAkGBdT6tKZnmS0wtU5sVWtW4DPl5iajADiMFwa5zggu6yrJL2e7lKGS5?gv=true"
            style={{
              border: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
            }}
            title="Book a meeting with Michael Lynn"
          />
        </Box>
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