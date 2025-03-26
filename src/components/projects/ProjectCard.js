import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

export default function ProjectCard({ project }) {
  const { title, description, image, tags = [], color, date, private: isPrivate } = project;

  const formatDate = (dateString) => {
    try {
      // First try parsing with parseISO since we're using ISO format
      return format(parseISO(dateString), 'MMMM yyyy');
    } catch (error) {
      try {
        // Fallback to new Date if parseISO fails
        return format(new Date(dateString), 'MMMM yyyy');
      } catch (error) {
        // If all parsing fails, return a default value
        return 'Date unavailable';
      }
    }
  };

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {title}
                {isPrivate && (
                  <Chip
                    label="Private"
                    size="small"
                    sx={{ ml: 1 }}
                    color="primary"
                  />
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {formatDate(date)}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>

            {tags && tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: color,
                      color: 'white',
                      '&:hover': {
                        bgcolor: color,
                        opacity: 0.9,
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
} 