import { Card, CardContent, CardHeader, Typography, Chip, Box, Link, useTheme } from '@mui/material';
import { format, isToday, isFuture, isPast } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import LaunchIcon from '@mui/icons-material/Launch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventDetailsModal from './EventDetailsModal';
import { useState } from 'react';

// Helper function to sort engagements by date
export const sortEngagements = (engagements) => {
  return [...engagements].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
};

export default function SpeakingCard({ engagement }) {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    title,
    date,
    eventName,
    location,
    venue,
    eventType,
    tags,
    slidesUrl,
    recordingUrl,
    abstract,
    isUpcoming,
    content
  } = engagement;

  const theme = useTheme();
  const eventDate = new Date(date);

  const getEventStatus = () => {
    if (isToday(eventDate)) {
      return {
        label: 'Live Now',
        color: 'success',
        show: true
      };
    }
    if (isFuture(eventDate)) {
      return {
        label: 'Upcoming',
        color: 'primary',
        show: true
      };
    }
    return {
      label: 'Past',
      color: 'default',
      show: false // Set to true if you want to show past event badges
    };
  };

  const eventStatus = getEventStatus();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card 
        onClick={handleOpenModal}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        }}
      >
        {eventStatus.show && (
          <Chip
            label={eventStatus.label}
            color={eventStatus.color}
            sx={{
              position: 'absolute',
              top: -12,
              right: 16,
              zIndex: 1,
            }}
          />
        )}
        
        <CardHeader
          title={
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
          }
          subheader={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" color="text.secondary">
                  {eventType} • {eventName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" color="text.secondary">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" color="text.secondary">
                  {venue}, {location}
                </Typography>
              </Box>
            </Box>
          }
          sx={{
            pb: 0,
            '& .MuiCardHeader-content': {
              overflow: 'visible',
            },
          }}
        />

        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 3,
            }}
          >
            {abstract}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '10',
                  },
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
            {slidesUrl && (
              <Link
                href={slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <SlideshowIcon fontSize="small" />
                Slides
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
                  gap: 0.5,
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <VideocamIcon fontSize="small" />
                Recording
              </Link>
            )}
          </Box>
        </CardContent>
      </Card>

      <EventDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        event={engagement}
        content={content}
      />
    </>
  );
} 