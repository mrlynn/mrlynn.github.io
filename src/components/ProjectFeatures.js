'use client';

import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

export default function ProjectFeatures({ features }) {
  if (!features || features.length === 0) return null;

  return (
    <Box sx={{ my: 2 }}>
      <List>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={typeof feature === 'string' ? feature : feature.title}
              secondary={feature.description}
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: 'medium',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 