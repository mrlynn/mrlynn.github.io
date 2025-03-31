'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const EPISODES_PER_PAGE = 5;

export default function PodcastEpisodes({ feedUrl, onMetadataLoad }) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleEpisodes, setVisibleEpisodes] = useState(EPISODES_PER_PAGE);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from Spotify first
        const spotifyData = await fetchSpotifyPodcast(feedUrl);
        
        if (spotifyData) {
          setEpisodes(spotifyData.episodes);
          if (onMetadataLoad) {
            onMetadataLoad(spotifyData.podcast);
          }
        } else {
          // Fallback to RSS feed
          const response = await fetch(feedUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch podcast feed');
          }
          
          const feedData = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(feedData, 'text/xml');
          
          const items = xmlDoc.getElementsByTagName('item');
          const parsedEpisodes = Array.from(items).map(item => ({
            title: item.getElementsByTagName('title')[0]?.textContent || '',
            description: item.getElementsByTagName('description')[0]?.textContent || '',
            pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || '',
            duration: item.getElementsByTagName('itunes:duration')[0]?.textContent || '',
            audioUrl: item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || '',
            episodeNumber: item.getElementsByTagName('itunes:episode')[0]?.textContent || '',
            seasonNumber: item.getElementsByTagName('itunes:season')[0]?.textContent || '',
          }));

          setEpisodes(parsedEpisodes);
        }
      } catch (err) {
        console.error('Error fetching episodes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (feedUrl) {
      fetchEpisodes();
    }
  }, [feedUrl, onMetadataLoad]);

  const handleLoadMore = () => {
    setVisibleEpisodes(prev => prev + EPISODES_PER_PAGE);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!episodes.length) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No episodes found
      </Alert>
    );
  }

  return (
    <Box>
      {episodes.slice(0, visibleEpisodes).map((episode, index) => (
        <MotionCard
          key={episode.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          sx={{ mb: 2 }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {episode.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {episode.description}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {episode.episodeNumber && (
                <Chip
                  label={`Episode ${episode.episodeNumber}`}
                  size="small"
                />
              )}
              {episode.seasonNumber && (
                <Chip
                  label={`Season ${episode.seasonNumber}`}
                  size="small"
                />
              )}
              {episode.duration && (
                <Chip
                  label={episode.duration}
                  size="small"
                />
              )}
            </Stack>
            {episode.audioUrl && (
              <Button
                variant="contained"
                color="primary"
                href={episode.audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 2 }}
              >
                Listen Now
              </Button>
            )}
          </CardContent>
        </MotionCard>
      ))}
      {visibleEpisodes < episodes.length && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
          >
            Load More Episodes
          </Button>
        </Box>
      )}
    </Box>
  );
} 