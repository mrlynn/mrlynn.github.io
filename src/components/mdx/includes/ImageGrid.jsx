'use client';

import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default function ImageGrid({ images, columns = 2 }) {
  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={12 / columns} key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '300px',
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: 1,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt || ''}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            {image.alt && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                {image.alt}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 