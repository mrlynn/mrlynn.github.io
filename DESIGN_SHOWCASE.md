# 🎨 Visual Design Showcase

## Professional UI Components Examples

This document provides copy-paste ready examples of professionally styled components using the new design system.

---

## 🎯 Hero Sections

### **Option 1: Mesh Gradient Hero**

```javascript
<Box
  sx={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.mesh,
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <Container maxWidth="lg">
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5.5rem' },
        fontWeight: 800,
        mb: 3,
        background: theme.palette.background.gradientAccent,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.02em',
      }}
    >
      Michael Lynn
    </Typography>
    <Typography
      variant="h5"
      sx={{
        color: theme.palette.text.secondary,
        maxWidth: '600px',
        lineHeight: 1.6,
        mb: 4,
      }}
    >
      Building bridges between developers and technology
    </Typography>
  </Container>
</Box>
```

### **Option 2: Animated Gradient Hero**

```javascript
<Box
  component={motion.div}
  animate={{
    background: [
      'linear-gradient(135deg, #2196f3 0%, #8bc34a 100%)',
      'linear-gradient(225deg, #8bc34a 0%, #2196f3 100%)',
      'linear-gradient(135deg, #2196f3 0%, #8bc34a 100%)',
    ],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: 'linear',
  }}
  sx={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: isDarkMode 
        ? 'rgba(10, 14, 39, 0.85)' 
        : 'rgba(255, 255, 255, 0.85)',
    },
  }}
>
  {/* Content here */}
</Box>
```

---

## 💳 Card Designs

### **Elevated Card with Hover Effect**

```javascript
<Card
  component={motion.div}
  whileHover={{ y: -8 }}
  sx={{
    height: '100%',
    borderRadius: '16px',
    border: `1px solid ${theme.palette.border.subtle}`,
    background: theme.palette.background.paper,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      boxShadow: isDarkMode 
        ? '0 20px 40px rgba(33, 150, 243, 0.2)' 
        : '0 20px 40px rgba(33, 150, 243, 0.15)',
    },
  }}
>
  <CardMedia
    component="img"
    height="240"
    image="/path/to/image.jpg"
    alt="Project"
    sx={{
      objectFit: 'cover',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
  />
  <CardContent sx={{ p: 3 }}>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
      Project Title
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Project description goes here...
    </Typography>
    <Stack direction="row" spacing={1}>
      <Chip label="React" size="small" />
      <Chip label="Next.js" size="small" />
      <Chip label="MongoDB" size="small" />
    </Stack>
  </CardContent>
</Card>
```

### **Glass Card**

```javascript
<Card
  sx={{
    background: isDarkMode
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${theme.palette.border.subtle}`,
    borderRadius: '20px',
    boxShadow: isDarkMode 
      ? '0 8px 32px rgba(0, 0, 0, 0.4)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
  }}
>
  <CardContent sx={{ p: 4 }}>
    {/* Content */}
  </CardContent>
</Card>
```

---

## 🔘 Button Styles

### **Primary CTA Button**

```javascript
<Button
  variant="contained"
  size="large"
  sx={{
    px: 4,
    py: 1.5,
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '12px',
    background: theme.palette.background.gradient,
    boxShadow: 'none',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: isDarkMode
        ? '0 12px 24px rgba(33, 150, 243, 0.3)'
        : '0 12px 24px rgba(33, 150, 243, 0.25)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }}
>
  Get Started
</Button>
```

### **Outlined Button with Icon**

```javascript
<Button
  variant="outlined"
  startIcon={<GitHubIcon />}
  sx={{
    px: 3,
    py: 1.25,
    borderRadius: '10px',
    borderWidth: '1.5px',
    borderColor: theme.palette.border.default,
    fontWeight: 500,
    transition: 'all 0.2s',
    '&:hover': {
      borderWidth: '1.5px',
      borderColor: theme.palette.primary.main,
      background: theme.palette.surface.secondary,
      transform: 'translateY(-1px)',
    },
  }}
>
  View on GitHub
</Button>
```

### **Ghost Button**

```javascript
<Button
  variant="text"
  sx={{
    px: 2,
    py: 1,
    borderRadius: '8px',
    color: theme.palette.text.secondary,
    transition: 'all 0.2s',
    '&:hover': {
      background: theme.palette.surface.secondary,
      color: theme.palette.text.primary,
    },
  }}
>
  Learn More
</Button>
```

---

## 📝 Input Fields

### **Modern Text Field**

```javascript
<TextField
  fullWidth
  label="Email Address"
  variant="outlined"
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: theme.palette.surface.primary,
      transition: 'all 0.2s',
      '& fieldset': {
        borderColor: theme.palette.border.subtle,
        borderWidth: '1.5px',
      },
      '&:hover': {
        backgroundColor: theme.palette.surface.secondary,
        '& fieldset': {
          borderColor: theme.palette.border.default,
        },
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        '& fieldset': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
  }}
/>
```

---

## 🏷️ Chip/Tag Designs

### **Gradient Chip**

```javascript
<Chip
  label="Featured"
  sx={{
    background: theme.palette.background.gradientAccent,
    color: 'white',
    fontWeight: 600,
    borderRadius: '8px',
    px: 1,
    '&:hover': {
      opacity: 0.9,
    },
  }}
/>
```

### **Subtle Chip**

```javascript
<Chip
  label="Technology"
  size="small"
  sx={{
    background: theme.palette.surface.secondary,
    border: `1px solid ${theme.palette.border.subtle}`,
    borderRadius: '6px',
    fontWeight: 500,
    transition: 'all 0.2s',
    '&:hover': {
      background: theme.palette.surface.tertiary,
      borderColor: theme.palette.border.default,
    },
  }}
/>
```

---

## 📊 Statistics Display

### **Stat Card**

```javascript
<Paper
  elevation={0}
  sx={{
    p: 3,
    textAlign: 'center',
    borderRadius: '16px',
    border: `1px solid ${theme.palette.border.subtle}`,
    background: theme.palette.background.paper,
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
      borderColor: theme.palette.primary.main,
    },
  }}
>
  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      background: theme.palette.background.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: 1,
    }}
  >
    200+
  </Typography>
  <Typography
    variant="caption"
    sx={{
      color: theme.palette.text.secondary,
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      fontWeight: 600,
    }}
  >
    Tech Talks
  </Typography>
</Paper>
```

---

## 🎭 Loading States

### **Skeleton Card**

```javascript
<Card sx={{ p: 3, borderRadius: '16px' }}>
  <Skeleton 
    variant="rectangular" 
    height={200} 
    sx={{ borderRadius: '12px', mb: 2 }} 
  />
  <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
  <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
  <Stack direction="row" spacing={1}>
    <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: '6px' }} />
    <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: '6px' }} />
  </Stack>
</Card>
```

---

## 🎨 Section Headers

### **Professional Section Header**

```javascript
<Box sx={{ textAlign: 'center', mb: 8 }}>
  <Typography
    variant="overline"
    sx={{
      color: theme.palette.primary.main,
      fontWeight: 600,
      letterSpacing: '2px',
      mb: 2,
      display: 'block',
    }}
  >
    Portfolio
  </Typography>
  <Typography
    variant="h2"
    sx={{
      fontWeight: 700,
      mb: 2,
      position: 'relative',
      display: 'inline-block',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 80,
        height: 4,
        background: theme.palette.background.gradient,
        borderRadius: '4px',
      },
    }}
  >
    Featured Projects
  </Typography>
  <Typography
    variant="body1"
    sx={{
      color: theme.palette.text.secondary,
      maxWidth: '600px',
      mx: 'auto',
      mt: 4,
      lineHeight: 1.6,
    }}
  >
    Explore my latest work and creative solutions
  </Typography>
</Box>
```

---

## 🎬 Animated Components

### **Fade In On Scroll**

```javascript
<Box
  component={motion.div}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</Box>
```

### **Stagger Children**

```javascript
<Grid
  container
  spacing={3}
  component={motion.div}
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }}
>
  {items.map((item, index) => (
    <Grid
      item
      xs={12}
      md={4}
      key={index}
      component={motion.div}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {/* Card content */}
    </Grid>
  ))}
</Grid>
```

---

## 🎯 Call to Action Sections

### **CTA Banner**

```javascript
<Paper
  elevation={0}
  sx={{
    p: { xs: 4, md: 6 },
    borderRadius: '24px',
    background: theme.palette.background.gradient,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: isDarkMode
        ? 'rgba(10, 14, 39, 0.3)'
        : 'rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
    },
  }}
>
  <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
    <Typography
      variant="h3"
      sx={{
        color: 'white',
        fontWeight: 700,
        mb: 2,
      }}
    >
      Ready to get started?
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: 'rgba(255, 255, 255, 0.9)',
        mb: 4,
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      Let's build something amazing together
    </Typography>
    <Button
      variant="contained"
      size="large"
      sx={{
        background: 'white',
        color: theme.palette.primary.main,
        px: 4,
        py: 1.5,
        borderRadius: '12px',
        fontWeight: 600,
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.95)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      Contact Me
    </Button>
  </Box>
</Paper>
```

---

## 📱 Mobile-Optimized Components

### **Responsive Card Grid**

```javascript
<Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
  {items.map((item) => (
    <Grid item xs={12} sm={6} md={4} key={item.id}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: { xs: '12px', md: '16px' },
        }}
      >
        {/* Card content */}
      </Card>
    </Grid>
  ))}
</Grid>
```

---

## 🎨 Color Accents

### **Accent Border**

```javascript
<Box
  sx={{
    p: 3,
    borderRadius: '12px',
    border: `1px solid ${theme.palette.border.subtle}`,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    background: theme.palette.surface.primary,
  }}
>
  {/* Content */}
</Box>
```

### **Gradient Border**

```javascript
<Box
  sx={{
    p: 3,
    borderRadius: '16px',
    position: 'relative',
    background: theme.palette.background.paper,
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '16px',
      padding: '2px',
      background: theme.palette.background.gradient,
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    },
  }}
>
  {/* Content */}
</Box>
```

---

## 💡 Pro Tips

1. **Consistency**: Use theme values instead of hardcoded colors
2. **Transitions**: Keep them subtle and quick (150-250ms)
3. **Spacing**: Stick to the 8px grid system
4. **Typography**: Use variant prop, avoid inline fontSize
5. **Shadows**: Less is more - use sparingly for depth
6. **Hover States**: Always provide feedback on interactive elements
7. **Mobile**: Test on actual devices, not just browser devtools
8. **Accessibility**: Ensure proper contrast and focus states
9. **Performance**: Use transform and opacity for animations
10. **Dark Mode**: Test both modes thoroughly

---

## 📚 Implementation Checklist

- [ ] Replace hardcoded colors with theme palette
- [ ] Update all spacing to use 8px grid
- [ ] Add smooth transitions to interactive elements
- [ ] Implement consistent border radius
- [ ] Update shadows to use theme shadows
- [ ] Add hover states to all clickable elements
- [ ] Ensure mobile responsiveness
- [ ] Test dark mode thoroughly
- [ ] Add loading states
- [ ] Implement error states
- [ ] Add focus indicators
- [ ] Optimize animations

---

## 🎯 Next Steps

1. Pick one component type (e.g., cards)
2. Update all instances to use new design
3. Test thoroughly
4. Move to next component type
5. Repeat until complete

Remember: **Rome wasn't built in a day**. Focus on incremental improvements!

