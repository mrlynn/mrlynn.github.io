'use client';

import { Box, Chip, Stack, Typography } from '@mui/material';

export default function TechStack({ items }) {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Tech Stack</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {items.map((item, index) => (
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