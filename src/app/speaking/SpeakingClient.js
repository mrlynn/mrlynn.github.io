'use client';

import { useState, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  ToggleButton, 
  ToggleButtonGroup, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Badge,
  Button,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { isSameDay, isSameMonth, format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MapIcon from '@mui/icons-material/Map';
import SpeakingCard from '../../components/speaking/SpeakingCard';
import SpeakingList from '../../components/speaking/SpeakingList';
import SpeakingMap from '../../components/speaking/SpeakingMap';
import DatePickerProvider from '../../components/providers/DatePickerProvider';

export default function SpeakingClient({ initialEngagements }) {
  const [view, setView] = useState('cards');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filter, setFilter] = useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Create a map of dates that have events and store events by date
  const { eventDates, eventsByDate, eventsByMonth } = useMemo(() => {
    const dates = new Set();
    const byDate = new Map();
    const byMonth = new Map();
    
    initialEngagements.forEach(engagement => {
      const eventDate = new Date(engagement.date);
      const dateStr = eventDate.toISOString().split('T')[0];
      const monthStr = format(eventDate, 'yyyy-MM');
      
      dates.add(dateStr);
      
      if (!byDate.has(dateStr)) {
        byDate.set(dateStr, []);
      }
      byDate.get(dateStr).push(engagement);

      if (!byMonth.has(monthStr)) {
        byMonth.set(monthStr, []);
      }
      byMonth.get(monthStr).push(engagement);
    });
    
    return { eventDates: dates, eventsByDate: byDate, eventsByMonth: byMonth };
  }, [initialEngagements]);

  // Custom day renderer for the calendar
  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const dateStr = day.toISOString().split('T')[0];
    const hasEvent = eventDates.has(dateStr);
    const isSelected = selectedDate && isSameDay(day, selectedDate);
    const isInSelectedMonth = selectedMonth && isSameMonth(day, selectedMonth);
    const eventCount = hasEvent ? eventsByDate.get(dateStr).length : 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={hasEvent ? eventCount : undefined}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: isSelected ? theme.palette.common.white : theme.palette.primary.main,
            color: isSelected ? theme.palette.primary.main : theme.palette.common.white,
            minWidth: 16,
            height: 16,
            padding: '0 4px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            bottom: 2,
            right: 2,
          },
        }}
      >
        <PickersDay 
          {...other} 
          outsideCurrentMonth={outsideCurrentMonth} 
          day={day}
          selected={isSelected || isInSelectedMonth}
        />
      </Badge>
    );
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      setSelectedDate(null);
      setSelectedMonth(null);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedMonth(null);
    setFilter('all');
  };

  const handleMonthSelect = () => {
    if (selectedDate) {
      setSelectedMonth(selectedDate);
      setSelectedDate(null);
    }
  };

  const handleClearDateFilter = () => {
    setSelectedDate(null);
    setSelectedMonth(null);
  };

  const filteredEngagements = useMemo(() => {
    return initialEngagements.filter(engagement => {
      const engagementDate = new Date(engagement.date);
      const now = new Date();

      // Apply date/month filters first
      if (selectedDate) {
        return isSameDay(engagementDate, selectedDate);
      }
      
      if (selectedMonth) {
        return isSameMonth(engagementDate, selectedMonth);
      }
      
      // Then apply upcoming/past filter
      if (filter === 'upcoming') {
        return engagementDate >= now;
      } else if (filter === 'past') {
        return engagementDate < now;
      }
      return true;
    });
  }, [initialEngagements, selectedDate, selectedMonth, filter]);

  // Get event counts for current filter
  const eventCount = selectedDate 
    ? (eventsByDate.get(selectedDate.toISOString().split('T')[0])?.length || 0)
    : selectedMonth
    ? (eventsByMonth.get(format(selectedMonth, 'yyyy-MM'))?.length || 0)
    : filteredEngagements.length;

  // Generate the subtitle text based on current filter
  const getSubtitleText = () => {
    if (selectedDate) {
      return `${eventCount} event${eventCount !== 1 ? 's' : ''} on ${format(selectedDate, 'MMMM d, yyyy')}`;
    }
    if (selectedMonth) {
      return `${eventCount} event${eventCount !== 1 ? 's' : ''} in ${format(selectedMonth, 'MMMM yyyy')}`;
    }
    if (filter === 'upcoming') {
      return `${eventCount} upcoming events`;
    }
    if (filter === 'past') {
      return `${eventCount} past events`;
    }
    return 'Upcoming and past speaking engagements, conferences, and workshops.';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 8, pb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 600,
            mb: 2,
          }}
        >
          Speaking Engagements
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            fontWeight: 400,
            mb: 4,
          }}
        >
          {getSubtitleText()}
        </Typography>

        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          sx={{ 
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            aria-label="filter engagements"
            size={isMobile ? 'small' : 'medium'}
            disabled={!!(selectedDate || selectedMonth)}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="upcoming">Upcoming</ToggleButton>
            <ToggleButton value="past">Past</ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view type"
            size={isMobile ? 'small' : 'medium'}
          >
            <ToggleButton value="cards">Cards</ToggleButton>
            <ToggleButton value="list">List</ToggleButton>
            <ToggleButton value="map">
              <MapIcon sx={{ mr: 1 }} />
              Map
            </ToggleButton>
          </ToggleButtonGroup>

          {(selectedDate || selectedMonth) && (
            <Button
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
              onClick={handleClearDateFilter}
              startIcon={<ClearIcon />}
            >
              Clear Date Filter
            </Button>
          )}
        </Stack>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper 
            sx={{ 
              p: 2,
              position: 'sticky',
              top: 24,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: theme.shadows[1],
            }}
          >
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h2">
                Calendar
              </Typography>
              <Box>
                {selectedDate && (
                  <Tooltip title="View entire month">
                    <IconButton 
                      size="small" 
                      onClick={handleMonthSelect}
                      color="primary"
                    >
                      <CalendarViewMonthIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
            <DatePickerProvider>
              <DateCalendar
                value={selectedDate || selectedMonth}
                onChange={handleDateChange}
                slots={{ day: CustomDay }}
                sx={{ 
                  width: '100%',
                  '& .MuiPickersDay-root': {
                    fontWeight: 400,
                  },
                  '& .MuiPickersDay-today': {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              />
            </DatePickerProvider>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          {filteredEngagements.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No events found {selectedDate || selectedMonth ? 'for the selected date' : 'matching the selected filter'}.
            </Typography>
          ) : view === 'list' ? (
            <SpeakingList engagements={filteredEngagements} />
          ) : view === 'map' ? (
            <SpeakingMap engagements={filteredEngagements} />
          ) : (
            <Grid container spacing={3}>
              {filteredEngagements.map((engagement) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6}
                  md={4}
                  key={engagement.slug}
                >
                  <SpeakingCard engagement={engagement} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
} 