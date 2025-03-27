import React from 'react';
import { Box, Chip, Typography, Stack } from '@mui/material';

const TechStack = ({ technologies }) => {
  if (!technologies || !Array.isArray(technologies)) {
    return null;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        Technologies Used
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {technologies.map((tech, index) => (
          <Chip
            key={index}
            label={tech}
            color="primary"
            variant="outlined"
            size="small"
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TechStack; 