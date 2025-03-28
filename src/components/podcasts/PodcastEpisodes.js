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
    const fetchPodcastData = async () => {
      try {
        const response = await fetch(feedUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        
        // Parse podcast metadata
        const channel = xml.querySelector('channel');
        const podcastMetadata = {
          title: channel.querySelector('title')?.textContent || '',
          description: channel.querySelector('description')?.textContent || '',
          imageUrl: channel.querySelector('image url')?.textContent || 
                   channel.querySelector('itunes\\:image')?.getAttribute('href') || '',
          lastBuildDate: channel.querySelector('lastBuildDate')?.textContent || '',
          link: channel.querySelector('link')?.textContent || '',
          author: channel.querySelector('itunes\\:author')?.textContent || ''
        };
        
        // Notify parent component of metadata
        if (onMetadataLoad) {
          onMetadataLoad(podcastMetadata);
        }
        
        // Parse episodes
        const items = xml.querySelectorAll('item');
        const parsedEpisodes = Array.from(items).map((item, index) => {
          const title = item.querySelector('title')?.textContent || '';
          const description = item.querySelector('description')?.textContent || '';
          const pubDate = new Date(item.querySelector('pubDate')?.textContent || '');
          const duration = item.querySelector('itunes\\:duration')?.textContent || '';
          const link = item.querySelector('link')?.textContent || '';
          const audioUrl = item.querySelector('enclosure')?.getAttribute('url') || '';
          
          // Clean up description by removing HTML tags and converting entities
          const cleanDescription = description
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
            .replace(/&amp;/g, '&') // Replace &amp; with &
            .replace(/&quot;/g, '"') // Replace &quot; with "
            .replace(/&#39;/g, "'"); // Replace &#39; with '

          return {
            id: index,
            title,
            description: cleanDescription,
            pubDate,
            duration,
            link,
            audioUrl
          };
        });

        setEpisodes(parsedEpisodes);
        setLoading(false);
      } catch (err) {
        setError('Failed to load podcast episodes');
        setLoading(false);
      }
    };

    fetchPodcastData();
  }, [feedUrl, onMetadataLoad]);

  const loadMore = () => {
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
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Stack spacing={3}>
      {episodes.slice(0, visibleEpisodes).map((episode, index) => (
        <MotionCard
          key={episode.id || episode.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          elevation={2}
          sx={{
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(0,0,0,0.2)' 
              : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {episode.title}
            </Typography>
            
            <Stack direction="row" spacing={2} mb={2}>
              <Chip 
                label={new Date(episode.pubDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
                size="small"
                color="primary"
                variant="outlined"
              />
              {episode.duration && (
                <Chip 
                  label={episode.duration}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Stack>

            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {episode.description}
            </Typography>

            <Button
              variant="contained"
              href={episode.audioUrl || episode.link}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
            >
              Listen to Episode
            </Button>
          </CardContent>
        </MotionCard>
      ))}

      {visibleEpisodes < episodes.length && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button 
            variant="outlined" 
            onClick={loadMore}
            sx={{ 
              borderRadius: 4,
              px: 4
            }}
          >
            Load More Episodes
          </Button>
        </Box>
      )}
    </Stack>
  );
} 