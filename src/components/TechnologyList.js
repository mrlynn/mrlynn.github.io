'use client';

import { Box, Chip, Stack, Typography } from '@mui/material';

export default function TechnologyList({ technologies }) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {technologies.map((tech, index) => (
          <Chip
            key={index}
            label={typeof tech === 'string' ? tech : tech.name}
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
} 