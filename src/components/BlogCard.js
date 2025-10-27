'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

export default function BlogCard({ post, index }) {
  const theme = useTheme();

  // Early return if post is undefined
  if (!post) {
    return null;
  }

  // Format date with error handling
  const formattedDate = post.date 
    ? format(parseISO(post.date), 'MMMM d, yyyy')
    : 'No date';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          border: `1px solid ${theme.palette.border.subtle}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            borderColor: theme.palette.border.default,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {/* Cover Image */}
        {post.coverImage && (
          <Box
            component="img"
            src={post.coverImage}
            alt={post.title || 'Blog post cover image'}
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
            }}
          />
        )}

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Tags */}
          <Box sx={{ mb: 2 }}>
            {post.tags?.map((tag) => (
              <Typography
                key={tag}
                component="span"
                variant="caption"
                sx={{
                  mr: 1,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  background: theme.palette.background.gradient,
                  color: 'white',
                }}
              >
                {tag}
              </Typography>
            ))}
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              mb: 2,
            }}
          >
            {post.title || 'Untitled Post'}
          </Typography>

          {/* Date and Read Time */}
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            {formattedDate}
            {post.readTime && ` • ${post.readTime}`}
          </Typography>

          {/* Excerpt */}
          <Typography
            variant="body1"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            {post.excerpt || 'No excerpt available'}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
} 