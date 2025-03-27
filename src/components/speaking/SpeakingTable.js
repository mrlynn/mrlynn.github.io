import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip,
  TextField,
  TableSortLabel,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import EventDetailsModal from './EventDetailsModal';
import { useState, useMemo } from 'react';

export default function SpeakingTable({ engagements }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    date: '',
    eventType: '',
    location: '',
    status: '',
  });

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  // Get unique values for filter dropdowns
  const uniqueEventTypes = useMemo(() => {
    return [...new Set(engagements.map(e => e.eventType))].sort();
  }, [engagements]);

  const uniqueLocations = useMemo(() => {
    return [...new Set(engagements.map(e => e.location))].sort();
  }, [engagements]);

  // Filter and sort the engagements
  const filteredAndSortedEngagements = useMemo(() => {
    let filtered = engagements.filter(engagement => {
      const eventDate = new Date(engagement.date);
      const isUpcoming = eventDate >= new Date();
      const status = isUpcoming ? 'Upcoming' : 'Past';

      // Apply search filter
      const searchMatch = searchQuery === '' || 
        engagement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engagement.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engagement.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply column filters
      const dateMatch = filters.date === '' || 
        format(eventDate, 'MMM yyyy') === filters.date;
      const eventTypeMatch = filters.eventType === '' || 
        engagement.eventType === filters.eventType;
      const locationMatch = filters.location === '' || 
        engagement.location === filters.location;
      const statusMatch = filters.status === '' || 
        status === filters.status;

      return searchMatch && dateMatch && eventTypeMatch && locationMatch && statusMatch;
    });

    // Sort the filtered results
    return filtered.sort((a, b) => {
      const aValue = orderBy === 'date' ? new Date(a.date) : a[orderBy];
      const bValue = orderBy === 'date' ? new Date(b.date) : b[orderBy];
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [engagements, filters, searchQuery, orderBy, order]);

  // Get unique months for date filter
  const uniqueMonths = useMemo(() => {
    return [...new Set(engagements.map(e => 
      format(new Date(e.date), 'MMM yyyy')
    ))].sort((a, b) => new Date(a) - new Date(b));
  }, [engagements]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleRequestSort('date')}
                  >
                    Date
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Dates</MenuItem>
                    {uniqueMonths.map(month => (
                      <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={() => handleRequestSort('title')}
                >
                  Event
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'location'}
                    direction={orderBy === 'location' ? order : 'asc'}
                    onClick={() => handleRequestSort('location')}
                  >
                    Location
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    {uniqueLocations.map(location => (
                      <MenuItem key={location} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'eventType'}
                    direction={orderBy === 'eventType' ? order : 'asc'}
                    onClick={() => handleRequestSort('eventType')}
                  >
                    Type
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.eventType}
                    onChange={(e) => handleFilterChange('eventType', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {uniqueEventTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Status
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                    <MenuItem value="Past">Past</MenuItem>
                  </Select>
                </Box>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedEngagements.map((engagement) => {
              const eventDate = new Date(engagement.date);
              const isUpcoming = eventDate >= new Date();
              
              return (
                <TableRow 
                  key={engagement.slug}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {format(eventDate, 'MMM d, yyyy')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" component="div">
                      {engagement.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {engagement.eventName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {engagement.venue}, {engagement.location}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {engagement.eventType}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={isUpcoming ? 'Upcoming' : 'Past'}
                      color={isUpcoming ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenModal(engagement)}
                        color="primary"
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <EventDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </>
  );
} 