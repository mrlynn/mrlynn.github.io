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
  Stack,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import TableViewIcon from '@mui/icons-material/TableView';
import GridViewIcon from '@mui/icons-material/GridView';
import SpeakingCard from '../../components/speaking/SpeakingCard';
import SpeakingList from '../../components/speaking/SpeakingList';
import SpeakingMap from '../../components/speaking/SpeakingMap';
import SpeakingTable from '../../components/speaking/SpeakingTable';
import PageHeader from '../../components/PageHeader';

export default function SpeakingClient({ initialEngagements }) {
  const [view, setView] = useState('table');
  const [filter, setFilter] = useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredEngagements = useMemo(() => {
    const filtered = initialEngagements.filter(engagement => {
      const engagementDate = new Date(engagement.date);
      const now = new Date();

      if (filter === 'upcoming') {
        return engagementDate >= now;
      } else if (filter === 'past') {
        return engagementDate < now;
      }
      return true;
    });

    if (filter === 'upcoming') {
      return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [initialEngagements, filter]);

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  // Get event counts for current filter
  const eventCount = filteredEngagements.length;

  // Generate the subtitle text based on current filter
  const getSubtitleText = () => {
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
      <PageHeader
        title="Speaking Engagements"
        subtitle="Some of the conferences, meetups, and workshops I've spoken at or will be speaking at."
      />
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
            <ToggleButton value="table">
              <TableViewIcon sx={{ mr: 1 }} />
              Table
            </ToggleButton>
            <ToggleButton value="cards">
              <GridViewIcon sx={{ mr: 1 }} />
              Cards
            </ToggleButton>
            <ToggleButton value="map">
              <MapIcon sx={{ mr: 1 }} />
              Map
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {filteredEngagements.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No events found matching the selected filter.
        </Typography>
      ) : view === 'table' ? (
        <SpeakingTable engagements={filteredEngagements} />
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
    </Container>
  );
} 