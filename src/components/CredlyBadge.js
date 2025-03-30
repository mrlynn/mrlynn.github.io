'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';

export default function CredlyBadge({ badgeId, width = 150, height = 270 }) {
  useEffect(() => {
    // Load Credly embed script
    const script = document.createElement('script');
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      component="div"
      data-iframe-width={width}
      data-iframe-height={height}
      data-share-badge-id={badgeId}
      data-share-badge-host="https://www.credly.com"
    />
  );
} 