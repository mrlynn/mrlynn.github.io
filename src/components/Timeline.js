'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, useTheme, Tooltip, Chip, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import styles from './Timeline.module.css';

const getCompanyLogo = (company, isDark = false) => {
  const logoMap = {
    // Cursor's mark is monochrome — pick the variant that reads on the card
    'Cursor': isDark ? '/images/cursor-logo-white.png' : '/images/cursor-logo-dark.png',
    'MongoDB': '/images/mongodb.svg',
    'Medallia': '/images/medallia.svg',
    'BMC Software': '/images/bmc.svg',
    'Bank of America': '/images/bofa.svg',
    'Merrill Lynch': '/images/ml.svg'
  };
  return logoMap[company] || null;
};

const Timeline = ({ events, heading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null; // Hide on mobile

  // Reverse the events array to show oldest to newest
  const reversedEvents = [...events].reverse();

  return (
    <div className={styles.timelineContainer}>
      {heading && (
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          {heading}
        </Typography>
      )}
      <div className={styles.timelineWrapper}>
        <div className={styles.timelineTrack}>
          {reversedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className={`${styles.timelineItem} ${currentIndex === index ? styles.active : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1,
                y: 0,
                scale: currentIndex === index ? 1 : 0.95,
              }}
              transition={{ duration: 0.5 }}
              onClick={() => setCurrentIndex(index)}
            >
              <div className={styles.date}>
                {event.date}
                {event.date.includes('Present') && (
                  <span className={styles.currentBadge}>Current</span>
                )}
              </div>
              <div className={styles.content}>
                {getCompanyLogo(event.company, isDark) && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={getCompanyLogo(event.company, isDark)}
                      alt={`${event.company} logo`}
                      width={120}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}
                <h3>{event.title}</h3>
                <p className={styles.company}>{event.company}</p>
                <p className={styles.description}>{event.description}</p>
              </div>
              {index < reversedEvents.length - 1 && (
                <div className={styles.connector} />
              )}
            </motion.div>
          ))}
        </div>
        
        <div className={styles.progressBar}>
          {reversedEvents.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${
                currentIndex === index ? styles.active : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline; 