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
          borderRadius: 2,
          overflow: 'hidden',
          background: theme.palette.background.paper,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
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
              color: 'text.primary',
              mb: 2,
            }}
          >
            {post.title || 'Untitled Post'}
          </Typography>

          {/* Date and Read Time */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {formattedDate}
            {post.readTime && ` • ${post.readTime}`}
          </Typography>

          {/* Excerpt */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt || 'No excerpt available'}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
} 