'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Motion primitives, shared.
 *
 * MotionBox was being redefined locally in nine files, half with the deprecated
 * motion() call and half with motion.create(). The fadeUp variant was likewise
 * duplicated with three different durations and easings. Everything animates on
 * these now.
 */
export const MotionBox = motion.create(Box);
export const MotionTypography = motion.create(Typography);

/** Matches transitions.slow in src/theme/designSystem.js. */
export const EASE = [0.22, 1, 0.36, 1];
export const DURATION = 0.6;

/** Staggered entrance. Pass the index as the custom prop for the stagger. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, delay: i * 0.08, ease: EASE },
  }),
};

/** Standard whileInView props, so sections reveal identically everywhere. */
export const revealOnce = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
  variants: fadeUp,
};
