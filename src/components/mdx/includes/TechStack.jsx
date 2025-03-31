'use client';

import { Box, Chip, Stack, Typography } from '@mui/material';

export default function TechStack({ items, technologies }) {
  // Use either items or technologies prop, defaulting to empty array if neither is provided
  const techItems = items || technologies || [];

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Tech Stack</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {techItems.map((item, index) => (
          <Chip
            key={index}
            label={item}
            variant="outlined"
            color="primary"
          />
        ))}
      </Stack>
    </Box>
  );
} 