import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

export const MotionBox = motion(Box);
export const MotionTypography = motion(Typography);

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

export const AnimatedSection = ({ children, delay = 0 }) => (
  <MotionBox
    component="section"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </MotionBox>
);

export const AnimatedTypography = ({ variant, component, children, delay = 0, ...props }) => (
  <MotionTypography
    variant={variant}
    component={component}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    {...props}
  >
    {children}
  </MotionTypography>
); 