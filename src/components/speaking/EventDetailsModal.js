'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import { format, isToday, isFuture, isPast, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import LaunchIcon from '@mui/icons-material/Launch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideocamIcon from '@mui/icons-material/Videocam';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function EventDetailsModal({ open, onClose, event }) {
  if (!event) return null;

  const {
    title,
    description,
    eventType,
    eventName,
    date,
    time,
    timezone,
    location,
    venue,
    tags,
    slidesUrl,
    recordingUrl,
    registrationUrl,
    abstract,
    isUpcoming,
    content,
  } = event;

  // Safely parse the date
  const parsedDate = date ? parseISO(date) : null;
  
  // Format date and time if available
  const formattedDate = parsedDate ? format(parsedDate, 'MMMM d, yyyy') : 'Date TBD';
  const formattedTime = time || 'Time TBD';

  const getEventStatus = () => {
    if (!parsedDate) return { label: 'TBD', color: 'default', show: true };
    
    if (isToday(parsedDate)) {
      return {
        label: 'Live Now',
        color: 'success',
        show: true
      };
    }
    if (isFuture(parsedDate)) {
      return {
        label: 'Upcoming',
        color: 'primary',
        show: true
      };
    }
    return {
      label: 'Past',
      color: 'default',
      show: true
    };
  };

  const eventStatus = getEventStatus();

  // Custom components for MDX
  const components = {
    h1: (props) => <Typography variant="h4" {...props} gutterBottom />,
    h2: (props) => <Typography variant="h5" {...props} gutterBottom />,
    h3: (props) => <Typography variant="h6" {...props} gutterBottom />,
    p: (props) => <Typography variant="body1" {...props} paragraph />,
    ul: (props) => <Box component="ul" sx={{ pl: 2, mb: 2 }} {...props} />,
    li: (props) => <Typography component="li" variant="body1" {...props} />,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="event-details-title"
    >
      <DialogTitle 
        id="event-details-title"
        sx={{ 
          pr: 6,
          pb: 0
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {eventStatus.show && (
          <Chip
            label={eventStatus.label}
            color={eventStatus.color}
            size="small"
            sx={{ mb: 1 }}
          />
        )}
        
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <EventIcon color="primary" />
            <Typography variant="subtitle1">
              {eventType} • {eventName}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CalendarTodayIcon color="primary" />
            <Typography variant="subtitle1">
              {formattedDate} at {formattedTime} {timezone}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="subtitle1">
              {venue}, {location}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          About this session
        </Typography>
        
        <Typography variant="body1" paragraph>
          {abstract}
        </Typography>

        {content && (
          <Box 
            sx={{ 
              mt: 3,
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: 'text.primary',
                fontWeight: 600,
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2,
              },
              '& li': {
                mb: 1,
              },
            }}
          >
            <MDXRemote {...content} components={components} />
          </Box>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Resources
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {registrationUrl && (
            <Link
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <HowToRegIcon />
              Register for this event
              <LaunchIcon fontSize="small" />
            </Link>
          )}
          
          {slidesUrl && (
            <Link
              href={slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <SlideshowIcon />
              View presentation slides
              <LaunchIcon fontSize="small" />
            </Link>
          )}
          
          {recordingUrl && (
            <Link
              href={recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <VideocamIcon />
              Watch recording
              <LaunchIcon fontSize="small" />
            </Link>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Close</Button>
        {registrationUrl && eventStatus.label === 'Upcoming' && (
          <Button
            variant="contained"
            color="primary"
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon />}
          >
            Register Now
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
} 