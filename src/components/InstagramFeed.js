import { Box, Typography, Grid } from '@mui/material';
import { Instagram as InstagramIcon } from '@mui/icons-material';

const InstagramFeed = () => {
  // Add your Instagram post URLs here
  const instagramPosts = [
    'https://www.instagram.com/p/Cwn9hd6J4Rr/',
    'https://www.instagram.com/p/CvzskTQgYgA/',
    'https://www.instagram.com/p/CupldQhJIwI/',
    'https://www.instagram.com/reel/CnhWpHLhoGw/',
    'https://www.instagram.com/reel/CucGbwQgpmX/',
    'https://www.instagram.com/reel/CuU9NucpV4l/'
    // Add more post URLs as needed
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <InstagramIcon sx={{ mr: 1 }} />
        <Typography variant="h4" component="h2">
          Instagram Feed
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {instagramPosts.map((postUrl, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '125%', // This maintains Instagram's typical aspect ratio
                backgroundColor: '#fafafa',
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                component="iframe"
                src={`${postUrl}embed`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                loading="lazy"
                allowFullScreen
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InstagramFeed; 