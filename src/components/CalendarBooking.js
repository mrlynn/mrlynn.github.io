'use client';

import { Box, Button, useTheme } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import Link from 'next/link';

export const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2QFBjXXlNk5fK-AeYLAkGBdT6tKZnmS0wtU5sVWtW4DPl5iajADiMFwa5zggu6yrJL2e7lKGS5?gv=true';

/**
 * Booking, in two shapes.
 *
 * `button` used to load Google's scheduling-button script and then imperatively
 * restyle the button it generated — white text on a transparent background with
 * a white border, sized for a dark hero the site no longer has. On the cream
 * canvas it rendered as very nearly invisible, on the page whose whole job is
 * to get someone onto a call. It is a plain link now, pointing at /contact,
 * which carries the widget. That also drops a third-party script from every
 * page that only wanted a button.
 *
 * `iframe` embeds the real scheduler and belongs on /contact only.
 */
const CalendarBooking = ({ variant = 'button', buttonProps = {} }) => {
  const theme = useTheme();

  if (variant === 'iframe') {
    const isDark = theme.palette.mode === 'dark';

    // Google's appointment scheduler has no dark mode and no theme parameter,
    // and it is cross-origin, so its content cannot be restyled. Inverting the
    // iframe does produce a dark widget, but it renders the headshot Google
    // shows inside it as a photo negative. So the widget stays light and gets
    // framed instead, reading as a deliberate card rather than a white hole.
    return (
      <Box
        sx={{
          width: '100%',
          p: isDark ? { xs: 1.5, md: 2 } : 0,
          borderRadius: '12px',
          backgroundColor: isDark ? 'rgba(250, 246, 240, 0.92)' : 'transparent',
          border: isDark ? `1px solid ${theme.palette.border.strong}` : 'none',
          boxShadow: isDark ? theme.shadows[8] : theme.shadows[2],
        }}
      >
        <Box
          sx={{
            width: '100%',
            // The widget does not report its own height across origins, so this
            // is sized to fit the tallest state it renders; 600px clipped the
            // time-slot list mid-row.
            height: { xs: '760px', sm: '700px' },
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <iframe
            src={BOOKING_URL}
            loading="lazy"
            style={{ border: 0, width: '100%', height: '100%', backgroundColor: '#fff' }}
            title="Book a meeting with Michael Lynn"
          />
        </Box>
      </Box>
    );
  }

  const { children = 'Book a call', ...rest } = buttonProps;

  return (
    <Button
      component={Link}
      href="/contact"
      variant="contained"
      disableElevation
      size="large"
      endIcon={<ArrowForwardIcon />}
      sx={{
        px: 3.5,
        py: 1.4,
        fontWeight: 600,
        fontSize: '0.95rem',
        borderRadius: '8px',
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CalendarBooking;
