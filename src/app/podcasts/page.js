'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { motion } from 'framer-motion';
import { podcasts } from '../../data/podcasts';
import PodcastEpisodes from '../../components/podcasts/PodcastEpisodes';
import PageHeader from '../../components/PageHeader';

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

const getPlatformIcon = (platform) => {
  switch (platform.icon) {
    case 'spotify':
      return <MusicNoteIcon />;
    case 'apple':
      return <AppleIcon />;
    case 'google':
      return <GoogleIcon />;
    default:
      return null;
  }
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`podcast-tabpanel-${index}`}
      aria-labelledby={`podcast-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `podcast-tab-${index}`,
    'aria-controls': `podcast-tabpanel-${index}`,
  };
}

export default function PodcastsPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [podcastMetadata, setPodcastMetadata] = useState({});

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMetadataLoad = (metadata, podcastTitle) => {
    setPodcastMetadata(prev => ({
      ...prev,
      [podcastTitle]: metadata
    }));
  };

  return (
    <Box>
      <PageHeader
        title="Podcasts"
        subtitle="Creating podcasts from concept to production is something I've done for a while now... and while I'm no longer the host or producer, I'm still very proud of the work and how I was able to shape the content. I worked on the MongoDB Podcast from 2018 to 2024 and thoroughly enjoyed the process of interviewing some of the most interesting people in the MongoDB community."
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 2,
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(0,0,0,0.2)' 
              : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            mb: 4
          }}
        >
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="podcast tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                py: 2
              }
            }}
          >
            {podcasts.map((podcast, index) => (
              <Tab 
                key={podcast.title}
                label={podcast.title}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Paper>

        {podcasts.map((podcast, index) => {
          const metadata = podcastMetadata[podcast.title] || {};
          
          return (
            <TabPanel key={podcast.title} value={currentTab} index={index}>
              <MotionContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Stack spacing={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      background: (theme) => theme.palette.mode === 'dark' 
                        ? 'rgba(0,0,0,0.2)' 
                        : 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={3}
                      alignItems="center"
                    >
                      <Box
                        component="img"
                        src={metadata.imageUrl || podcast.coverImage}
                        alt={metadata.title || podcast.title}
                        sx={{
                          width: { xs: '100%', sm: 200 },
                          height: 'auto',
                          borderRadius: 2,
                          boxShadow: 3,
                        }}
                      />
                      <Stack spacing={2} flex={1}>
                        <Typography variant="h4" component="h2">
                          {metadata.title || podcast.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {metadata.description || podcast.description}
                        </Typography>
                        {metadata.author && (
                          <Typography variant="body2" color="text.secondary">
                            By {metadata.author}
                          </Typography>
                        )}
                        <Stack direction="row" spacing={1}>
                          {podcast.platforms.map((platform) => (
                            <Tooltip 
                              key={platform.name} 
                              title={`Listen on ${platform.name}`}
                            >
                              <IconButton
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  color: 'primary.main',
                                  '&:hover': {
                                    color: 'primary.dark',
                                    transform: 'scale(1.1)',
                                  },
                                  transition: 'all 0.2s ease-in-out',
                                }}
                              >
                                {getPlatformIcon(platform)}
                              </IconButton>
                            </Tooltip>
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Paper>

                  <PodcastEpisodes 
                    feedUrl={podcast.feedUrl} 
                    onMetadataLoad={(metadata) => handleMetadataLoad(metadata, podcast.title)}
                  />
                </Stack>
              </MotionContainer>
            </TabPanel>
          );
        })}
      </Container>
    </Box>
  );
} 