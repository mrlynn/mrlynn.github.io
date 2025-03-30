'use client';

import { useState, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Modal, 
  IconButton, 
  useTheme,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  CircularProgress,
  Pagination,
  Fade,
  useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Close as CloseIcon,
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';

const MotionPaper = motion(Paper);

const artwork = [
  { 
    id: 1,
    title: 'Splash', 
    image: '/images/artwork/splash.png',
    category: 'Abstract',
    year: 2024,
    medium: 'Acrylic',
    description: 'A vibrant exploration of color and movement',
    tags: ['abstract', 'colorful', 'digital']
  },
  { 
    id: 2,
    title: 'Flowers', 
    image: '/images/artwork/flowers.png',
    category: 'Nature',
    year: 2023,
    medium: 'Acrylic',
    description: 'A celebration of natural beauty',
    tags: ['nature', 'flowers', 'brush']
  },
  { 
    id: 3,
    title: 'Water Play', 
    image: '/images/artwork/waterplay.png',
    category: 'Abstract',
    year: 2024,
    medium: 'Acrylic',
    description: 'Fluid dynamics captured in motion',
    tags: ['abstract', 'water', 'motion']
  },
  { 
    id: 4,
    title: 'Wave', 
    image: '/images/artwork/wave.png',
    category: 'Nature',
    year: 2023,
    medium: 'Acrylic',
    description: 'The power of ocean waves',
    tags: ['nature', 'ocean', 'waves']
  },
  { 
    id: 5,
    title: 'Two Waves', 
    image: '/images/artwork/twowaves.png',
    category: 'Nature',
    year: 2024,
    medium: 'Acrylic',
    description: 'Harmony in motion',
    tags: ['nature', 'ocean', 'waves']
  },
  { 
    id: 6,
    title: 'Shoreline', 
    image: '/images/artwork/shoreline.png',
    category: 'Nature',
    year: 2023,
    medium: 'Acrylic',
    description: 'Where land meets sea',
    tags: ['nature', 'shoreline', 'landscape']
  },
  { 
    id: 7,
    title: 'Abstract 1', 
    image: '/images/artwork/abstract1.png',
    category: 'Abstract',
    year: 2024,
    medium: 'Acrylic',
    description: 'Exploring form and color',
    tags: ['abstract', 'color', 'form']
  },
  { 
    id: 8,
    title: 'Lava', 
    image: '/images/artwork/lava.png',
    category: 'Abstract',
    year: 2023,
    medium: 'Acrylic',
    description: 'Molten energy captured',
    tags: ['abstract', 'lava', 'energy']
  },
  { 
    id: 9,
    title: 'Wave 2', 
    image: '/images/artwork/wave2.png',
    category: 'Nature',
    year: 2024,
    medium: 'Acrylic',
    description: 'Ocean rhythms',
    tags: ['nature', 'ocean', 'waves']
  },
  { 
    id: 10,
    title: 'Wave 1', 
    image: '/images/artwork/wave1.png',
    category: 'Nature',
    year: 2023,
    medium: 'Acrylic',
    description: 'Wave patterns',
    tags: ['nature', 'ocean', 'waves']
  },
  { 
    id: 11,
    title: 'Fence Posts', 
    image: '/images/artwork/fenceposts.png',
    category: 'Abstract',
    year: 2024,
    medium: 'Acrylic',
    description: 'Geometric patterns in nature',
    tags: ['abstract', 'geometric', 'nature']
  },
];

const ITEMS_PER_PAGE = 9;

export default function ArtGallery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMedium, setSelectedMedium] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const categories = useMemo(() => 
    ['all', ...new Set(artwork.map(piece => piece.category))], 
    []
  );

  const years = useMemo(() => 
    ['all', ...new Set(artwork.map(piece => piece.year))].sort((a, b) => b - a), 
    []
  );

  const mediums = useMemo(() => 
    ['all', ...new Set(artwork.map(piece => piece.medium))], 
    []
  );

  const filteredArtwork = useMemo(() => {
    return artwork.filter(piece => {
      const matchesSearch = piece.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          piece.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          piece.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || piece.category === selectedCategory;
      const matchesYear = selectedYear === 'all' || piece.year === selectedYear;
      const matchesMedium = selectedMedium === 'all' || piece.medium === selectedMedium;
      return matchesSearch && matchesCategory && matchesYear && matchesMedium;
    });
  }, [searchQuery, selectedCategory, selectedYear, selectedMedium]);

  const paginatedArtwork = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredArtwork.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArtwork, page]);

  const handleOpen = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleClose = () => {
    setSelectedArtwork(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setPage(1);
  };

  const handleMediumChange = (event) => {
    setSelectedMedium(event.target.value);
    setPage(1);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 12,
      pb: 8,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)',
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Art Gallery
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              textAlign: 'center',
              opacity: 0.9,
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            A collection of my paintings and artwork
          </Typography>
        </motion.div>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search artwork..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={selectedYear}
                    label="Year"
                    onChange={handleYearChange}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year === 'all' ? 'All Years' : year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Medium</InputLabel>
                  <Select
                    value={selectedMedium}
                    label="Medium"
                    onChange={handleMediumChange}
                  >
                    {mediums.map((medium) => (
                      <MenuItem key={medium} value={medium}>
                        {medium.charAt(0).toUpperCase() + medium.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <AnimatePresence>
          <Grid container spacing={4}>
            {paginatedArtwork.map((piece, index) => (
              <Grid item xs={12} sm={6} md={4} key={piece.id}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleOpen(piece)}
                  sx={{
                    cursor: 'pointer',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(6, 39, 54, 0.9)'
                      : '#ffffff',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)'}`,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={piece.image}
                    alt={piece.title}
                    sx={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {piece.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                        mb: 1,
                      }}
                    >
                      {piece.year} • {piece.medium}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {piece.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.1)'
                              : 'rgba(0,0,0,0.05)',
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>

        {filteredArtwork.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredArtwork.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? "small" : "large"}
            />
          </Box>
        )}

        <Modal
          open={Boolean(selectedArtwork)}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Fade in={Boolean(selectedArtwork)}>
            <Box
              sx={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                outline: 'none',
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                p: 4,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              {selectedArtwork && (
                <>
                  <Box
                    component="img"
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    sx={{
                      maxWidth: { xs: '100%', md: '70%' },
                      maxHeight: '80vh',
                      objectFit: 'contain',
                      borderRadius: 1,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      {selectedArtwork.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {selectedArtwork.year} • {selectedArtwork.medium}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedArtwork.description}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Category: {selectedArtwork.category}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {selectedArtwork.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.1)'
                              : 'rgba(0,0,0,0.05)',
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
} 