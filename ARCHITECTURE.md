# System Architecture Documentation

## Overview
This is a Next.js-based personal website/portfolio built with Material UI, featuring a blog, projects showcase, and various content sections. The application uses the App Router pattern and follows React Server Component principles.

## Tech Stack
- **Framework**: Next.js 14
- **UI Library**: Material UI (MUI)
- **Content**: MDX for rich content
- **Styling**: Material UI's styling system
- **Data Storage**: MongoDB with Mongoose
- **Deployment**: Vercel
- **Media Storage**: Vercel Blob Storage

## Core Architecture

### 1. Application Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── theme/              # Material UI theming
├── lib/                # Utility functions and helpers
├── hooks/              # Custom React hooks
├── utils/              # Helper utilities
└── content/            # MDX content files
```

### 2. Routing Architecture
- Uses Next.js App Router
- File-based routing structure
- Dynamic routes for blog posts and projects
- API routes for data fetching

### 3. Component Architecture
- Server Components by default
- Client Components marked with 'use client'
- Shared components in `/components`
- Page-specific components co-located with pages

## Key Features

### 1. Content Management
- **MDX Processing**
  - Raw MDX files in `/content`
  - Frontmatter for metadata
  - Custom MDX components
  - Syntax highlighting

- **Media Handling**
  - Images stored in public directory
  - Vercel Blob Storage for uploaded content
  - Optimized image loading with Next.js Image component

### 2. Projects Section
```
/projects
├── [slug]/             # Dynamic project routes
│   ├── page.js         # Project detail page
│   └── ProjectDetailClient.js
├── page.js             # Projects listing
└── metadata.js         # SEO configuration
```

#### Project Features
- **Content Display**
  - MDX rendering
  - Image carousels
  - Tech stack visualization
  - Demo video integration

- **Data Flow**
  ```mermaid
  graph TD
    A[MDX Files] --> B[getAllPosts]
    B --> C[Project List]
    B --> D[Project Detail]
    D --> E[MDX Content]
    D --> F[Image Carousel]
  ```

### 3. Blog System
- Similar structure to projects
- Category and tag support
- RSS feed generation
- Reading time calculation

### 4. Data Layer

#### MongoDB Integration
```javascript
// Database Schema Example
const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  content: String,
  date: Date,
  tags: [String],
  image: String,
  // ... other fields
});
```

#### Content Loading Pipeline
1. MDX files processed at build time
2. Frontmatter extracted and validated
3. Content rendered with custom components
4. Dynamic data fetched from MongoDB

### 5. Theme System
- Material UI theming
- Dark/light mode support
- Custom color schemes
- Responsive design system

## Performance Optimizations

### 1. Static Generation
- Pages pre-rendered at build time
- Incremental Static Regeneration for dynamic content
- Static paths for known routes

### 2. Image Optimization
- Next.js Image component
- Lazy loading
- Responsive images
- WebP format support

### 3. Code Splitting
- Automatic code splitting by route
- Dynamic imports for heavy components
- Client/server component separation

## Security Measures

### 1. Content Security
- Input sanitization
- MDX content validation
- Secure image handling

### 2. API Security
- API route protection
- Environment variable security
- CORS configuration

## Environment Configuration

### Required Environment Variables
```
MONGODB_URI=           # MongoDB connection string
BLOB_READ_WRITE_TOKEN= # Vercel Blob Storage token
JWT_SECRET=           # JWT authentication secret
NEXT_PUBLIC_GA_ID=    # Google Analytics ID
```

## Deployment

### Vercel Deployment
1. Connected to GitHub repository
2. Automatic deployments on push
3. Environment variable configuration
4. Domain management

### Build Process
1. MDX content processing
2. Static page generation
3. Image optimization
4. Asset compilation

## Development Workflow

### Local Development
1. Clone repository
2. Install dependencies
3. Set up environment variables
4. Run development server

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Adding New Content
1. Create MDX file in appropriate directory
2. Add required frontmatter
3. Add media assets
4. Test locally
5. Deploy changes

## Monitoring and Analytics

### Performance Monitoring
- Vercel Analytics
- Google Analytics
- Custom performance metrics

### Error Tracking
- Error boundary implementation
- Server-side error logging
- Client-side error reporting

## Future Considerations

### Planned Improvements
1. Enhanced search functionality
2. Image optimization improvements
3. Additional content types
4. Performance optimizations
5. Enhanced analytics

### Scalability Considerations
1. Content delivery optimization
2. Database scaling
3. Build time optimization
4. Cache strategy improvements

## Troubleshooting

### Common Issues
1. MDX parsing errors
2. Image optimization issues
3. MongoDB connection problems
4. Build failures

### Debug Procedures
1. Check logs in Vercel dashboard
2. Verify environment variables
3. Test content rendering locally
4. Validate database connections

## Support and Maintenance

### Regular Maintenance Tasks
1. Dependency updates
2. Security patches
3. Content backups
4. Performance monitoring

### Support Procedures
1. Issue tracking in GitHub
2. Documentation updates
3. Security vulnerability handling
4. Performance optimization

Would you like me to elaborate on any specific section of the architecture document? 