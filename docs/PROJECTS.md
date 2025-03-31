# Projects Section Documentation

## Overview
The projects section is a key feature of the website, showcasing development work through an interactive gallery of projects with detailed individual project pages.

## Component Structure

### 1. Project List Page (`/src/app/projects/page.js`)
```javascript
export default async function ProjectsPage() {
  const projects = await getAllPosts('project');
  return (
    <>
      <PageHeader />
      <BlogList posts={projects} />
    </>
  );
}
```

### 2. Project Card Component (`/src/components/projects/ProjectCard.js`)
- Displays project preview
- Handles:
  - Image thumbnails
  - Title and description
  - Tags and dates
  - Private project indicators
  - Hover animations

### 3. Project Detail Page (`/src/app/projects/[slug]/page.js`)
- Dynamic routing for individual projects
- MDX content rendering
- Image carousel integration
- Tech stack display

## Data Flow

### 1. Content Creation
```
content/
└── projects/
    ├── project-1.mdx
    ├── project-2.mdx
    └── project-n.mdx
```

### 2. Data Processing Pipeline
1. MDX files read at build time
2. Frontmatter parsed and validated
3. Content converted to HTML
4. Data cached for performance

### 3. Project Schema
```javascript
{
  title: string,          // Project title
  slug: string,          // URL-friendly identifier
  description: string,   // Brief project description
  content: string,       // Main MDX content
  date: Date,           // Publication date
  image: string,        // Hero/thumbnail image path
  tags: string[],       // Technology tags
  color: string,        // Theme color
  private: boolean,     // Visibility flag
  technologies: string[], // Detailed tech stack
  demoUrl?: string,     // Optional demo link
  githubUrl?: string    // Optional repository link
}
```

## Key Components

### 1. ImageCarousel.js
- Features:
  - Touch-enabled navigation
  - Keyboard controls
  - Fullscreen mode
  - Progress indicators
  - Responsive design

### 2. ProjectLayout.js
- Sections:
  - Hero image
  - Project metadata
  - Content area
  - Navigation links

### 3. ProjectContent.js
- MDX rendering with custom components
- Syntax highlighting
- Custom styling for:
  - Headers
  - Code blocks
  - Lists
  - Blockquotes

## Adding New Projects

### 1. Create MDX File
```mdx
---
title: "Project Title"
description: "Project description"
date: "2024-03-30"
image: "/images/projects/thumbnail.jpg"
tags: ["React", "Node.js"]
color: "#4A90E2"
private: false
technologies: ["React", "Node.js", "MongoDB"]
demoUrl: "https://demo.example.com"
githubUrl: "https://github.com/example/project"
---

# Project Content
```

### 2. Add Media
1. Place images in `/public/images/projects/`
2. Optimize images for web
3. Use consistent naming convention

### 3. Test Locally
```bash
npm run dev
# Visit http://localhost:3000/projects/[slug]
```

## Styling Guidelines

### 1. Material UI Theme Integration
```javascript
// Example theme customization
{
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: '0.3s'
        }
      }
    }
  }
}
```

### 2. Responsive Design
- Mobile-first approach
- Breakpoint system:
  - xs: 0px
  - sm: 600px
  - md: 900px
  - lg: 1200px

## Performance Considerations

### 1. Image Optimization
- Use Next.js Image component
- Implement lazy loading
- Proper image sizing
- WebP format support

### 2. Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting
- Lazy loading of carousel images

## Testing

### 1. Component Testing
```javascript
describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    // Test implementation
  });
});
```

### 2. Integration Testing
- Page navigation
- Image carousel functionality
- MDX rendering

## Common Issues and Solutions

### 1. Image Loading
- Issue: Images not displaying
- Solution: Check paths and Image component props

### 2. MDX Parsing
- Issue: Content not rendering
- Solution: Verify frontmatter format

### 3. Carousel Performance
- Issue: Slow image loading
- Solution: Implement progressive loading

## Best Practices

### 1. Content Organization
- Consistent file naming
- Proper image optimization
- Clear documentation

### 2. Component Design
- Single responsibility
- Reusable components
- Proper prop typing

### 3. Performance
- Lazy loading
- Image optimization
- Code splitting

## Future Improvements

### 1. Planned Features
- Advanced filtering
- Search functionality
- Related projects
- Project categories

### 2. Performance Optimizations
- Enhanced caching
- Better image loading
- Reduced bundle size

Would you like me to elaborate on any specific aspect of the projects section? 