import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Chip,
  Box,
  Link,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

export default function SpeakingList({ engagements }) {
  // Sort engagements by date (newest first)
  const sortedEngagements = [...engagements].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <List>
      {sortedEngagements.map((engagement, index) => {
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
          isUpcoming
        } = engagement;

        return (
          <Box key={engagement.slug}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventIcon fontSize="small" />
                    <Typography variant="h6" component="span">
                      {title}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarTodayIcon fontSize="small" />
                      <Typography variant="body2" component="span">
                        {format(new Date(date), 'MMMM d, yyyy')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography variant="body2" component="span">
                        {venue}, {location}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {abstract}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      {tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {slidesUrl && (
                        <Link
                          href={slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="body2"
                        >
                          View Slides
                        </Link>
                      )}
                      {recordingUrl && (
                        <Link
                          href={recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="body2"
                        >
                          Watch Recording
                        </Link>
                      )}
                    </Box>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={isUpcoming ? 'Upcoming' : 'Past'}
                  color={isUpcoming ? 'primary' : 'default'}
                  size="small"
                />
              </ListItemSecondaryAction>
            </ListItem>
            {index < sortedEngagements.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        );
      })}
    </List>
  );
} 