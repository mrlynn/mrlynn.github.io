# .cursorrules

```
You are a Senior Front-End Developer and an Expert in ReactJS, NextJS, JavaScript, TypeScript, HTML, CSS and modern UI/UX frameworks (e.g., Material UI, App router for React projects, MongoDB and Mongoose for data persistence, Radix). You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.

- Follow the users requirements carefully & to the letter.
- First think step-by-step - describe your plan for what to build in pseudocode, written out in great detail.
- Confirm, then write code!
- Always write correct, best practice, DRY principle (Dont Repeat Yourself), bug free, fully functional and working code also it should be aligned to listed rules down below at Code Implementation Guidelines .
- Focus on easy and readability code, over being performant.
- Fully implement all requested functionality.
- Leave NO todos, placeholders or missing pieces.
- Ensure code is complete! Verify thoroughly finalised.
- Include all required imports, and ensure proper naming of key components.
- Be concise Minimize any other prose.
- If you think there might not be a correct answer, you say so.
- If you do not know the answer, say so, instead of guessing.

### Coding Environment
The user asks questions about the following coding languages:
- ReactJS
- NextJS
- JavaScript
- TypeScript
- Material UI
- HTML
- CSS

### Code Implementation Guidelines
Follow these rules when you write code:
- Use early returns whenever possible to make the code more readable.
- Always use Material UI component classes for styling HTML elements; avoid using CSS or tags.
- Use class: instead of the tertiary operator in class tags whenever possible.
- Use descriptive variable and function/const names. Also, event functions should be named with a handle prefix, like handleClick for onClick and handleKeyDown for onKeyDown.
- Implement accessibility features on elements. For example, a tag should have a tabindex=0, aria-label, on:click, and on:keydown, and similar attributes.
- Use consts instead of functions, for example, const toggle = () =>. Also, define a type if possible.
- Use .env, .env.local, etc for secrets and environment variables.
- Use NextJS App router for routing. Avoid using the old pages directory.
- Use MongoDB and Mongoose for data persistence. Ensure that all schemas are defined in a separate file, like `userSchema.js`.
- Whenever you use dynamic route params or cookies, these need to be awaited like this:

\`\`\`
import { cookies } from 'next/headers'
 
export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
\`\`\`
- Whever you are using params, the params are a promise and need to be awaited like this:

\`\`\`
export default async function page({ params }) {
  const { id } = await params;
  return '...'
}

\`\`\`

### Atlas Vector Search Guidelines

## Atlas Vector Search Create Index Example
- 

\`\`\`
const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  "<connectionString>";

const client = new MongoClient(uri);

async function run() {
   try {
     const database = client.db("<databaseName>");
     const collection = database.collection("<collectionName>");
    
     // define your Atlas Vector Search index
     const index = {
         name: "<indexName>",
         type: "vectorSearch",
         definition: {
           "fields": [
             {
               "type": "vector",
               "numDimensions": <numberOfDimensions>,
               "path": "<fieldToIndex>",
               "similarity": "euclidean | cosine | dotProduct"
             },
             {
               "type": "filter",
               "path": "<fieldToIndex>"
             },
             ...
           ]
         }
     }

     // run the helper method
     const result = await collection.createSearchIndex(index);
     console.log(`New search index named ${result} is building.`);
     // wait for the index to be ready to query
     console.log("Polling to check if the index is ready. This may take up to a minute.")
     let isQueryable = false;
     while (!isQueryable) {
       const cursor = collection.listSearchIndexes();
       for await (const index of cursor) {
         if (index.name === result) {
           if (index.queryable) {
             console.log(`${result} is ready for querying.`);
             isQueryable = true;
           } else {
             await new Promise(resolve => setTimeout(resolve, 5000));
           }
         }
       }
     }
   } finally {
     await client.close();
   }
}
run().catch(console.dir);
\`\`\`
## Atlas Vector Search Query Example

\`\`\`
{
  "$vectorSearch": {
    "exact": true | false,
    "filter": {<filter-specification>},
    "index": "<index-name>",
    "limit": <number-of-results>,
    "numCandidates": <number-of-candidates>,
    "path": "<field-to-search>",
    "queryVector": [<array-of-numbers>]
  }
}

\`\`\`


```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
.cursorrules
*pdf
out/*

```

# .nojekyll

```

```

# jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

```

# next.config.js

```js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      [require('rehype-prism-plus'), { ignoreMissing: true }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // This allows serving local images directly
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    return config;
  },
};

module.exports = withMDX(nextConfig); 
```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

```

# package.json

```json
{
  "name": "mrlynn.github.io",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mdx-js/loader": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@mui/icons-material": "^5.17.1",
    "@mui/material": "^5.17.1",
    "@mui/x-date-pickers": "^6.19.6",
    "@next/mdx": "^15.2.3",
    "@react-google-maps/api": "^2.20.6",
    "@tiptap/extension-blockquote": "^2.11.5",
    "@tiptap/extension-bullet-list": "^2.11.5",
    "@tiptap/extension-code-block": "^2.11.5",
    "@tiptap/extension-heading": "^2.11.5",
    "@tiptap/extension-image": "^2.11.5",
    "@tiptap/extension-link": "^2.11.5",
    "@tiptap/extension-list-item": "^2.11.5",
    "@tiptap/extension-ordered-list": "^2.11.5",
    "@tiptap/extension-strike": "^2.11.5",
    "@tiptap/extension-text-style": "^2.11.5",
    "@tiptap/extension-underline": "^2.11.5",
    "@tiptap/pm": "^2.11.5",
    "@tiptap/react": "^2.11.5",
    "@tiptap/starter-kit": "^2.11.5",
    "@vercel/blob": "^0.27.3",
    "date-fns": "^2.30.0",
    "framer-motion": "^11.18.2",
    "gray-matter": "^4.0.3",
    "next": "14.1.0",
    "next-mdx-remote": "^4.4.1",
    "react": "^18",
    "react-dom": "^18",
    "react-github-calendar": "^4.5.6",
    "react-markdown": "^10.1.0",
    "rehype-prism-plus": "^1.0.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^2.0.0",
    "rss": "^1.2.2",
    "turndown": "^7.2.0"
  },
  "devDependencies": {
    "@types/node": "22.13.11",
    "eslint": "^8",
    "eslint-config-next": "14.1.0"
  }
}

```

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src/app/admin/blog/page.js

```js
'use client';

import { Box, Container, Typography, Button, TextField, Grid, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import RichTextEditor from '../../../components/blog/RichTextEditor';
import AdminBlogList from '../../../components/blog/AdminBlogList';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '../../../components/blog/ImageUpload';

const initialPost = {
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  author: '',
  image: '',
  tags: '',
  content: '',
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(initialPost);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error fetching blog posts',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setPost((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/blog', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: `Blog post ${isEditing ? 'updated' : 'saved'} successfully!`,
        });
        setIsDialogOpen(false);
        setIsEditing(false);
        setPost(initialPost);
        fetchPosts();
      } else {
        setStatus({
          type: 'error',
          message: `Error ${isEditing ? 'updating' : 'saving'} blog post: ${result.error}`,
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error ${isEditing ? 'updating' : 'saving'} blog post: ${error.message}`,
      });
    }
  };

  const handleEdit = (post) => {
    setPost({
      ...post,
      tags: post.tags.join(', '),
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/blog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug: deleteSlug }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Blog post deleted successfully!',
        });
        setDeleteSlug(null);
        fetchPosts();
      } else {
        setStatus({
          type: 'error',
          message: `Error deleting blog post: ${result.error}`,
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error deleting blog post: ${error.message}`,
      });
    }
  };

  const handleCreate = () => {
    setPost(initialPost);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog Management
        </Typography>
        {status.message && (
          <Alert severity={status.type} sx={{ mb: 4 }}>
            {status.message}
          </Alert>
        )}
        <AdminBlogList
          posts={posts}
          onEdit={handleEdit}
          onDelete={(slug) => setDeleteSlug(slug)}
          onCreate={handleCreate}
        />

        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    value={post.date}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Author"
                    name="author"
                    value={post.author}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <ImageUpload
                    value={post.image}
                    onChange={(value) => handleChange({ target: { name: 'image', value } })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tags (comma-separated)"
                    name="tags"
                    value={post.tags}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Content
                  </Typography>
                  <RichTextEditor
                    content={post.content}
                    onChange={handleContentChange}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={status.type === 'success'}
            >
              {isEditing ? 'Update' : 'Publish'} Post
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={!!deleteSlug}
          onClose={() => setDeleteSlug(null)}
        >
          <DialogTitle>Delete Blog Post</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteSlug(null)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
} 
```

# src/app/api/blog/route.js

```js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { getPostBySlug, getAllPosts } from '../../../utils/blog';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const post = await request.json();
    const { title, description, date, author, image, tags, content } = post;

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create frontmatter
    const frontmatter = {
      title,
      description,
      date,
      author,
      image,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    // Create MDX content
    const mdxContent = `---
${Object.entries(frontmatter)
  .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  .join('\n')}
---

${content}`;

    // Write to file
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
    fs.writeFileSync(filePath, mdxContent);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const post = await request.json();
    const { title, description, date, author, image, tags, content, slug } = post;

    // Create frontmatter
    const frontmatter = {
      title,
      description,
      date,
      author,
      image,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    // Create MDX content
    const mdxContent = `---
${Object.entries(frontmatter)
  .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  .join('\n')}
---

${content}`;

    // Write to file
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
    fs.writeFileSync(filePath, mdxContent);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { slug } = await request.json();

    // Delete file
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
    fs.unlinkSync(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 
```

# src/app/api/upload/route.js

```js
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
    });

    return NextResponse.json({
      url: blob.url,
      success: true,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 
```

# src/app/art/page.js

```js
'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Modal, IconButton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Close as CloseIcon } from '@mui/icons-material';

const MotionPaper = motion(Paper);

const artwork = [
  { title: 'Splash', image: '/images/artwork/splash.png' },
  { title: 'Flowers', image: '/images/artwork/flowers.png' },
  { title: 'Water Play', image: '/images/artwork/waterplay.png' },
  { title: 'Wave', image: '/images/artwork/wave.png' },
  { title: 'Two Waves', image: '/images/artwork/twowaves.png' },
  { title: 'Shoreline', image: '/images/artwork/shoreline.png' },
  { title: 'Abstract 1', image: '/images/artwork/abstract1.png' },
  { title: 'Lava', image: '/images/artwork/lava.png' },
  { title: 'Wave 2', image: '/images/artwork/wave2.png' },
  { title: 'Wave 1', image: '/images/artwork/wave1.png' },
  { title: 'Fence Posts', image: '/images/artwork/fenceposts.png' },
];

export default function ArtGallery() {
  const theme = useTheme();
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleOpen = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleClose = () => {
    setSelectedArtwork(null);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 12,
      pb: 8,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)',
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Art Gallery
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              textAlign: 'center',
              opacity: 0.9,
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            A collection of my paintings and artwork
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {artwork.map((piece, index) => (
            <Grid item xs={12} sm={6} md={4} key={piece.title}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleOpen(piece)}
                sx={{
                  cursor: 'pointer',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(6, 39, 54, 0.9)'
                    : '#ffffff',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)'}`,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <Box
                  component="img"
                  src={piece.image}
                  alt={piece.title}
                  sx={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {piece.title}
                  </Typography>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>

        <Modal
          open={Boolean(selectedArtwork)}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              outline: 'none',
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: -40,
                top: -40,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedArtwork && (
              <Box
                component="img"
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: 1,
                  boxShadow: 24,
                }}
              />
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
} 
```

# src/app/blog/[slug]/page.js

```js
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '../../../utils/blog';
import BlogLayout from '../../../components/blog/BlogLayout';
import { Typography, Box, Container } from '@mui/material';
import Image from 'next/image';

const components = {
  h1: (props) => (
    <Typography variant="h1" component="h1" gutterBottom {...props} />
  ),
  h2: (props) => (
    <Typography variant="h2" component="h2" gutterBottom {...props} />
  ),
  h3: (props) => (
    <Typography variant="h3" component="h3" gutterBottom {...props} />
  ),
  h4: (props) => (
    <Typography variant="h4" component="h4" gutterBottom {...props} />
  ),
  h5: (props) => (
    <Typography variant="h5" component="h5" gutterBottom {...props} />
  ),
  h6: (props) => (
    <Typography variant="h6" component="h6" gutterBottom {...props} />
  ),
  p: (props) => (
    <Typography variant="body1" component="p" paragraph {...props} />
  ),
  ul: (props) => (
    <Typography component="ul" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  ol: (props) => (
    <Typography component="ol" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  li: (props) => (
    <Typography component="li" sx={{ mb: 1 }} {...props} />
  ),
  blockquote: (props) => (
    <Typography
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'primary.main',
        pl: 2,
        py: 1,
        my: 2,
        fontStyle: 'italic',
      }}
      {...props}
    />
  ),
  code: (props) => (
    <Typography
      component="code"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 0.5,
        borderRadius: 1,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <Typography
      component="pre"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        my: 2,
        '& code': {
          bgcolor: 'transparent',
          color: 'inherit',
          p: 0,
        }
      }}
      {...props}
    />
  ),
  img: (props) => {
    // Clean up the src path
    let src = props.src || '';
    
    // Handle markdown image syntax [path]
    if (src.startsWith('[') && src.endsWith(']')) {
      src = src.slice(1, -1);
    }
    
    // Handle relative paths
    if (src.startsWith('./')) {
      src = src.substring(2);
    }
    
    // Handle absolute paths starting with /
    if (src.startsWith('/')) {
      src = src.substring(1);
    }

    // For debugging
    console.log('Image src:', src);

    return (
      <Box
        component="figure"
        sx={{
          my: 4,
          mx: 0,
          p: 0,
          '&::before, &::after': {
            content: '""',
            display: 'table',
          },
          '&::after': {
            clear: 'both',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            borderRadius: 1,
            overflow: 'hidden',
            boxShadow: 1,
          }}
        >
          <Image
            {...props}
            src={`/${src}`}
            alt={props.alt || ''}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority={true}
          />
        </Box>
        {props.alt && (
          <Box
            component="figcaption"
            sx={{
              textAlign: 'center',
              mt: 1,
              color: 'text.secondary',
              typography: 'caption',
            }}
          >
            {props.alt}
          </Box>
        )}
      </Box>
    );
  },
  a: (props) => (
    <Typography
      component="a"
      sx={{ color: 'primary.main', textDecoration: 'none' }}
      {...props}
    />
  ),
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const ogImage = post.image || '/images/default-blog-image.jpg';

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
    },
    authors: [{ name: post.author }],
    keywords: post.tags?.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Post Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <BlogLayout
      title={post.title}
      description={post.description}
      image={post.image}
      date={post.date}
      author={post.author}
    >
      <Box sx={{ mt: 4 }}>
        <MDXRemote source={post.content} components={components} />
      </Box>
    </BlogLayout>
  );
} 
```

# src/app/blog/page.js

```js
import { getAllPosts } from '../../lib/blog';
import BlogList from '../../components/blog/BlogList';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Blog | Michael Lynn',
  description: 'Technical articles, tutorials, and insights from Michael Lynn',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        title="Blog Articles"
        subtitle="A collection of blog articles and thoughts on software development, technology, and other topics."
      />
      <BlogList posts={posts} />
    </>
  );
} 



```

# src/app/contact/page.js

```js
'use client';

import { Container, Typography, Box, Button, Grid, Paper, useTheme } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@mui/icons-material';

export default function Contact() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 12,
        pb: 8,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              fontWeight: 600,
            }}
          >
            Connect With Me
          </Typography>
          <Typography 
            variant="h6" 
            sx={{
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            Find me on social media or reach out through your preferred platform
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(6, 39, 54, 0.9)'
                  : '#ffffff',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/mrlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    GitHub
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<LinkedInIcon />}
                    href="https://linkedin.com/in/mlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    LinkedIn
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<TwitterIcon />}
                    href="https://twitter.com/@mlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    Twitter
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<InstagramIcon />}
                    href="https://instagram.com/mlynn_stagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: theme.palette.background.gradient,
                      color: '#ffffff',
                    }}
                  >
                    Instagram
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 
```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/feed.xml/route.js

```js
import { getAllPosts } from '../../utils/blog';
import RSS from 'rss';

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const feed = new RSS({
    title: 'Michael Lynn\'s Blog',
    description: 'Thoughts and insights on technology, development, and more',
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
    image_url: `${baseUrl}/images/logo.png`,
    language: 'en',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Michael Lynn`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
      guid: post.slug,
      categories: post.tags,
      author: post.author,
      date: new Date(post.date),
      enclosure: post.image ? {
        url: post.image,
        type: 'image/jpeg',
      } : undefined,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 
```

# src/app/globals.css

```css
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

```

# src/app/layout.js

```js
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '../theme/ThemeContext';
import Layout from '../components/Layout';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  adjustFontFallback: false,
});

export const metadata = {
  title: 'Michael Lynn - Creative Developer',
  description: 'Pushing the boundaries of web development with innovative solutions and creative coding',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}

```

# src/app/page.js

```js
'use client';

import { Box, Container, Typography, Button, Grid, Paper, Stack, useTheme } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, BookOutlined as BookOutlinedIcon, Code as CodeIcon, Terminal as TerminalIcon, Cloud as CloudIcon } from '@mui/icons-material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectsSection from '../components/ProjectsSection';
import VideosSection from '../components/VideosSection';
import GitHubActivity from '../components/GitHubActivity';
import Timeline from '../components/Timeline';
import { projects } from '../data/projects';
import { timelineEvents } from '../data/timeline';
import Image from 'next/image';

// Create motion components using motion.create()
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionPaper = motion.create(Paper);

const titles = [
  "Creative Technologist",
  "Developer Advocate",
  "Passionate Teacher",
  "Open Source Contributor",
  "Community Builder",
  "Technical Advisor",
  "Fitness Geek",
  "Podcaster",
  "Problem Solver",
  "Innovator",
  "Tech Enthusiast",
  "Creative Mind",
  "Digital Artist",
  "Innovator",
  "Tech Enthusiast",
  "Creative Mind",
  "Artist",
  "Developer",
];

const techCards = [
  {
    title: 'MongoDB',
    content: '{ "database": "NoSQL", "type": "Document" }',
    color: '#05668D', // Lapis Lazuli
  },
  {
    title: 'Node.js',
    content: 'async function build() {\n  await dream();\n  return future;\n}',
    color: '#679436', // Asparagus
  },
  {
    title: 'React',
    content: '<Innovation\n  future={tech}\n  passion={true}\n/>',
    color: '#427AA1', // UCLA Blue
  }
];

function CyclingTitle() {
  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      let newTitle;
      do {
        // Pick a random title
        newTitle = titles[Math.floor(Math.random() * titles.length)];
      } while (newTitle === currentTitle); // Make sure it's not the same as current

      setCurrentTitle(newTitle);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentTitle]);

  return (
    <Box sx={{ height: '3.5rem', display: 'flex', justifyContent: 'center', mb: 4 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 600,
              background: `linear-gradient(135deg, #427AA1 0%, #A5BE00 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            {currentTitle}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}

function FloatingProjectCards() {
  const [visibleProjects, setVisibleProjects] = useState(projects.slice(0, 3));
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleProjects(currentProjects => {
        const availableProjects = projects.filter(p => !currentProjects.includes(p));
        const newProject = availableProjects[Math.floor(Math.random() * availableProjects.length)];
        const projectToReplace = Math.floor(Math.random() * 3);
        return currentProjects.map((p, i) => i === projectToReplace ? newProject : p);
      });
    }, 4000); // Change a random card every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {visibleProjects.map((project, i) => (
        <motion.div
          key={`${project.title}-${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, i % 2 === 0 ? 3 : -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '280px',
            height: '180px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: project.color,
            }}
          />
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.8)',
              transition: 'filter 0.3s ease',
              '&:hover': {
                filter: 'brightness(1)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'rgba(6, 39, 54, 0.9)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: 'white',
                fontWeight: 600,
              }}
            >
              {project.title}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}

export default function Home() {
  const theme = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <Box ref={containerRef}>
      <Box
        sx={{
          minHeight: '100vh',
          pt: 12,
          pb: 8,
          background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 600,
                    background: theme.palette.background.gradientText,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    mb: 2,
                  }}
                >
                  Michael Lynn
                </Typography>

                <CyclingTitle />

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Building bridges between developers and technology. Passionate about creating intuitive solutions and sharing knowledge through teaching and community engagement.
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/mrlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<LinkedInIcon />}
                    href="https://linkedin.com/in/mlynn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<BookOutlinedIcon />}
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: '280px', sm: '320px', md: '400px' },
                    height: { xs: '280px', sm: '320px', md: '400px' },
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src="./mike-mexico.jpg"
                    alt="Michael Lynn"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      borderRadius: '16px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box sx={{ py: 8, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Timeline events={timelineEvents} />
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ProjectsSection />
        <GitHubActivity />
        <VideosSection />
      </Container>
    </Box>
  );
}

```

# src/app/page.module.css

```css
.page {
  --gray-rgb: 0, 0, 0;
  --gray-alpha-200: rgba(var(--gray-rgb), 0.08);
  --gray-alpha-100: rgba(var(--gray-rgb), 0.05);

  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;

  display: grid;
  grid-template-rows: 20px 1fr 20px;
  align-items: center;
  justify-items: center;
  min-height: 100svh;
  padding: 80px;
  gap: 64px;
  font-family: var(--font-geist-sans);
}

@media (prefers-color-scheme: dark) {
  .page {
    --gray-rgb: 255, 255, 255;
    --gray-alpha-200: rgba(var(--gray-rgb), 0.145);
    --gray-alpha-100: rgba(var(--gray-rgb), 0.06);

    --button-primary-hover: #ccc;
    --button-secondary-hover: #1a1a1a;
  }
}

.main {
  display: flex;
  flex-direction: column;
  gap: 32px;
  grid-row-start: 2;
}

.main ol {
  font-family: var(--font-geist-mono);
  padding-left: 0;
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  list-style-position: inside;
}

.main li:not(:last-of-type) {
  margin-bottom: 8px;
}

.main code {
  font-family: inherit;
  background: var(--gray-alpha-100);
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
}

.ctas {
  display: flex;
  gap: 16px;
}

.ctas a {
  appearance: none;
  border-radius: 128px;
  height: 48px;
  padding: 0 20px;
  border: none;
  border: 1px solid transparent;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}

a.primary {
  background: var(--foreground);
  color: var(--background);
  gap: 8px;
}

a.secondary {
  border-color: var(--gray-alpha-200);
  min-width: 158px;
}

.footer {
  grid-row-start: 3;
  display: flex;
  gap: 24px;
}

.footer a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer img {
  flex-shrink: 0;
}

/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  a.primary:hover {
    background: var(--button-primary-hover);
    border-color: transparent;
  }

  a.secondary:hover {
    background: var(--button-secondary-hover);
    border-color: transparent;
  }

  .footer a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}

@media (max-width: 600px) {
  .page {
    padding: 32px;
    padding-bottom: 80px;
  }

  .main {
    align-items: center;
  }

  .main ol {
    text-align: center;
  }

  .ctas {
    flex-direction: column;
  }

  .ctas a {
    font-size: 14px;
    height: 40px;
    padding: 0 16px;
  }

  a.secondary {
    min-width: auto;
  }

  .footer {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}

@media (prefers-color-scheme: dark) {
  .logo {
    filter: invert();
  }
}

```

# src/app/podcasts/metadata.js

```js
export const metadata = {
  title: 'Podcasts | Michael Lynn',
  description: 'Listen to my latest podcast episodes and interviews on MongoDB, technology, and more.',
  openGraph: {
    title: 'Podcasts | Michael Lynn',
    description: 'Listen to my latest podcast episodes and interviews on MongoDB, technology, and more.',
    type: 'website',
    images: [
      {
        url: '/images/podcasts/mongodb-podcast.jpg',
        width: 1200,
        height: 630,
        alt: 'MongoDB Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcasts | Michael Lynn',
    description: 'Listen to my latest podcast episodes and interviews on MongoDB, technology, and more.',
    images: ['/images/podcasts/mongodb-podcast.jpg'],
  },
}; 
```

# src/app/podcasts/page.js

```js
'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { motion } from 'framer-motion';
import { podcasts } from '../../data/podcasts';
import PodcastCard from '../../components/podcasts/PodcastCard';
import PageHeader from '../../components/PageHeader';

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

export default function PodcastsPage() {
  const [selectedPodcast, setSelectedPodcast] = useState(podcasts[0]);

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
        {podcasts.map((podcast, index) => (
          <Box 
            key={podcast.title} 
            sx={{ 
              mb: index < podcasts.length - 1 ? { xs: 6, md: 8 } : 0 
            }}
          >
            <Grid container spacing={{ xs: 3, md: 4 }}>
              <Grid item xs={12} md={4}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  elevation={3}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(0,0,0,0.2)' 
                      : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={podcast.coverImage}
                    alt={podcast.title}
                    sx={{
                      width: '100%',
                      maxWidth: 300,
                      height: 'auto',
                      borderRadius: 2,
                      mb: 3,
                      boxShadow: 3,
                    }}
                  />
                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      {podcast.platforms.map((platform) => (
                        <Tooltip key={platform.name} title={`Listen on ${platform.name}`}>
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
                </MotionPaper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  {podcast.episodes.map((episode, episodeIndex) => (
                    <PodcastCard 
                      key={episode.title} 
                      episode={episode}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: (index * podcast.episodes.length + episodeIndex) * 0.1 
                      }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
} 
```

# src/app/projects/[slug]/page.js

```js
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getAllProjects } from '../../../utils/projects';
import ProjectLayout from '../../../components/projects/ProjectLayout';
import { Typography, Box, Container } from '@mui/material';
import Image from 'next/image';

const components = {
  h1: (props) => (
    <Typography variant="h1" component="h1" gutterBottom {...props} />
  ),
  h2: (props) => (
    <Typography variant="h2" component="h2" gutterBottom {...props} />
  ),
  h3: (props) => (
    <Typography variant="h3" component="h3" gutterBottom {...props} />
  ),
  h4: (props) => (
    <Typography variant="h4" component="h4" gutterBottom {...props} />
  ),
  h5: (props) => (
    <Typography variant="h5" component="h5" gutterBottom {...props} />
  ),
  h6: (props) => (
    <Typography variant="h6" component="h6" gutterBottom {...props} />
  ),
  p: (props) => (
    <Typography variant="body1" component="p" paragraph {...props} />
  ),
  ul: (props) => (
    <Typography component="ul" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  ol: (props) => (
    <Typography component="ol" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  li: (props) => (
    <Typography component="li" sx={{ mb: 1 }} {...props} />
  ),
  blockquote: (props) => (
    <Typography
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'primary.main',
        pl: 2,
        py: 1,
        my: 2,
        fontStyle: 'italic',
      }}
      {...props}
    />
  ),
  code: (props) => (
    <Typography
      component="code"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 0.5,
        borderRadius: 1,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <Typography
      component="pre"
      sx={{
        bgcolor: {
          light: 'grey.100',
          dark: 'grey.900'
        },
        color: {
          light: 'grey.900',
          dark: 'grey.300'
        },
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        my: 2,
        '& code': {
          bgcolor: 'transparent',
          color: 'inherit',
          p: 0,
        }
      }}
      {...props}
    />
  ),
  img: (props) => {
    // Clean up the src path
    let src = props.src || '';
    
    // Handle markdown image syntax [path]
    if (src.startsWith('[') && src.endsWith(']')) {
      src = src.slice(1, -1);
    }
    
    // Handle relative paths
    if (src.startsWith('./')) {
      src = src.substring(2);
    }
    
    // Handle absolute paths starting with /
    if (src.startsWith('/')) {
      src = src.substring(1);
    }

    return (
      <Box sx={{ my: 4 }}>
        <Image
          src={`/${src}`}
          alt={props.alt || ''}
          width={1200}
          height={630}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        />
      </Box>
    );
  },
};

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const ogImage = project.image || '/images/default-project-image.jpg';

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      publishedTime: project.date,
      authors: [project.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      tags: project.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${params.slug}`,
    },
    authors: [{ name: project.author }],
    keywords: project.tags?.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Project Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <ProjectLayout
      title={project.title}
      description={project.description}
      image={project.image}
      date={project.date}
      author={project.author}
      tags={project.tags}
      color={project.color}
      technologies={project.technologies}
      demoUrl={project.demoUrl}
      githubUrl={project.githubUrl}
    >
      <Box sx={{ mt: 4 }}>
        <MDXRemote source={project.content} components={components} />
      </Box>
    </ProjectLayout>
  );
} 
```

# src/app/projects/[slug]/ProjectDetailClient.js

```js
'use client';

import { Box, Container, Typography, Chip, Grid, Paper, Stack, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub as GitHubIcon, Launch as LaunchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const MotionPaper = motion(Paper);

export default function ProjectDetailClient({ project }) {
  const theme = useTheme();
  const router = useRouter();

  const handleBack = () => {
    router.push('/projects/');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '300px', md: '400px' },
          width: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 24, md: 48 },
                left: 24,
                right: 24,
              }}
            >
              <Button
                component={Link}
                href="/projects/"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
              >
                Back to Projects
              </Button>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 600,
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {project.title}
              </Typography>
            </Box>
          </Container>
        </motion.div>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Project Overview */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Project Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {project.description}
              </Typography>
            </Paper>

            {/* Goals & Objectives */}
            {project.goals && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Goals & Objectives
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {project.goals.map((goal, index) => (
                    <li key={index}>
                      <Typography variant="body1" paragraph>
                        {goal}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            )}

            {/* Experience & Challenges */}
            {project.experience && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Experience & Challenges
                </Typography>
                <Typography variant="body1" paragraph>
                  {project.experience}
                </Typography>
              </Paper>
            )}

            {/* Key Features */}
            {project.features && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Key Features
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {project.features.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body1" paragraph>
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Project Image */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Paper>

            {/* Project Details */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Project Details
              </Typography>
              
              {project.timeline && (
                <>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Timeline
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {project.timeline}
                  </Typography>
                </>
              )}

              {project.technologies && (
                <>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Technologies Used
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                    {project.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Stack>
                </>
              )}

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {project.githubUrl && (
                  <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    View Code
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    variant="outlined"
                    startIcon={<LaunchIcon />}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Live Demo
                  </Button>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 
```

# src/app/projects/layout.js

```js
import { metadata as projectsMetadata } from './metadata';

export const metadata = projectsMetadata;

export default function ProjectsLayout({ children }) {
  return children;
} 
```

# src/app/projects/metadata.js

```js
export const metadata = {
  title: 'Projects | Michael Lynn',
  description: 'A collection of my work and experiments in software development',
}; 
```

# src/app/projects/page.js

```js
import { getAllProjects } from '../../utils/projects';
import ProjectList from '../../components/projects/ProjectList';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Projects | Michael Lynn',
  description: 'A collection of my work and experiments in software development',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="A showcase of my work in software development, from experimental prototypes to production applications. Each project represents a unique challenge and learning opportunity."
      />
      <ProjectList projects={projects} />
    </>
  );
} 
```

# src/app/projects/src/app/layout.js

```js
import { Space_Grotesk } from 'next/font/google';
import { Providers } from './providers';
import Layout from '../components/Layout';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  adjustFontFallback: false,
});

export const metadata = {
  title: 'Michael Lynn - Creative Developer',
  description: 'Pushing the boundaries of web development with innovative solutions and creative coding',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
} 
```

# src/app/projects/src/app/providers.js

```js
'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 
```

# src/app/projects/src/components/podcasts/PodcastCard.js

```js
'use client';

import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MotionPaper = motion(Box);

export default function PodcastCard({ episode }) {
  return (
    <MotionPaper
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Box
            component="img"
            src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
            alt={episode.title}
            sx={{
              width: '100%',
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>
            {episode.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {episode.description}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {episode.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {new Date(episode.date).toLocaleDateString()} • {episode.duration}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<YouTubeIcon />}
              href={`https://www.youtube.com/watch?v=${episode.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </MotionPaper>
  );
} 
```

# src/app/projects/src/theme.js

```js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
}); 
```

# src/app/resume/page.js

```js
'use client';

import Resume from '../../components/Resume';

export default function ResumePage() {
  return <Resume />;
} 
```

# src/app/robots.js

```js
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 
```

# src/app/sitemap.js

```js
import { getAllPosts } from '../utils/blog';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Get all blog posts
  const posts = await getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Define static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/art`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/podcasts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...blogUrls];
} 
```

# src/app/speaking/page.js

```js
import { getAllSpeakingEngagements } from '../../lib/speaking';
import SpeakingClient from './SpeakingClient';

export default async function SpeakingPage() {
  const engagements = await getAllSpeakingEngagements();

  return <SpeakingClient initialEngagements={engagements} />;
} 
```

# src/app/speaking/SpeakingClient.js

```js
'use client';

import { useState, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  ToggleButton, 
  ToggleButtonGroup, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Stack,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import TableViewIcon from '@mui/icons-material/TableView';
import GridViewIcon from '@mui/icons-material/GridView';
import SpeakingCard from '../../components/speaking/SpeakingCard';
import SpeakingList from '../../components/speaking/SpeakingList';
import SpeakingMap from '../../components/speaking/SpeakingMap';
import SpeakingTable from '../../components/speaking/SpeakingTable';

export default function SpeakingClient({ initialEngagements }) {
  const [view, setView] = useState('table');
  const [filter, setFilter] = useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredEngagements = useMemo(() => {
    const filtered = initialEngagements.filter(engagement => {
      const engagementDate = new Date(engagement.date);
      const now = new Date();

      if (filter === 'upcoming') {
        return engagementDate >= now;
      } else if (filter === 'past') {
        return engagementDate < now;
      }
      return true;
    });

    if (filter === 'upcoming') {
      return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [initialEngagements, filter]);

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  // Get event counts for current filter
  const eventCount = filteredEngagements.length;

  // Generate the subtitle text based on current filter
  const getSubtitleText = () => {
    if (filter === 'upcoming') {
      return `${eventCount} upcoming events`;
    }
    if (filter === 'past') {
      return `${eventCount} past events`;
    }
    return 'Upcoming and past speaking engagements, conferences, and workshops.';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 8, pb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 600,
            mb: 2,
          }}
        >
          Speaking Engagements
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            fontWeight: 400,
            mb: 4,
          }}
        >
          {getSubtitleText()}
        </Typography>

        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          sx={{ 
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            aria-label="filter engagements"
            size={isMobile ? 'small' : 'medium'}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="upcoming">Upcoming</ToggleButton>
            <ToggleButton value="past">Past</ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view type"
            size={isMobile ? 'small' : 'medium'}
          >
            <ToggleButton value="table">
              <TableViewIcon sx={{ mr: 1 }} />
              Table
            </ToggleButton>
            <ToggleButton value="cards">
              <GridViewIcon sx={{ mr: 1 }} />
              Cards
            </ToggleButton>
            <ToggleButton value="map">
              <MapIcon sx={{ mr: 1 }} />
              Map
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {filteredEngagements.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No events found matching the selected filter.
        </Typography>
      ) : view === 'table' ? (
        <SpeakingTable engagements={filteredEngagements} />
      ) : view === 'map' ? (
        <SpeakingMap engagements={filteredEngagements} />
      ) : (
        <Grid container spacing={3}>
          {filteredEngagements.map((engagement) => (
            <Grid 
              item 
              xs={12} 
              sm={6}
              md={4}
              key={engagement.slug}
            >
              <SpeakingCard engagement={engagement} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
} 
```

# src/app/videos/page.js

```js
'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Stack, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { YouTube as YouTubeIcon, MusicNote as TikTokIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { videos } from '../../data/videos';

const MotionPaper = motion(Paper);

const getVideoUrl = (video) => {
  switch (video.platform) {
    case 'youtube':
      return `https://www.youtube.com/watch?v=${video.videoId}`;
    case 'tiktok':
      return `https://www.tiktok.com/@fitbodymike/video/${video.videoId}`;
    default:
      return '';
  }
};

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'youtube':
      return <YouTubeIcon sx={{ fontSize: '32px', color: 'white' }} />;
    case 'tiktok':
      return <TikTokIcon sx={{ fontSize: '32px', color: 'white' }} />;
    default:
      return null;
  }
};

export default function VideosPage() {
  const theme = useTheme();
  const [selectedTags, setSelectedTags] = useState([]);

  // Get unique tags from all videos
  const allTags = [...new Set(videos.flatMap(video => video.tags))];

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredVideos = videos.filter(video =>
    selectedTags.length === 0 || 
    selectedTags.some(tag => video.tags.includes(tag))
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 12,
      pb: 8,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)',
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Video Content
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              textAlign: 'center',
              opacity: 0.9,
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            }}
          >
            Tutorials, tech talks, and conference presentations about MongoDB, cloud computing, and modern development
          </Typography>
        </motion.div>

        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
            }}
          >
            Filter by Topic:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                sx={{
                  m: 0.5,
                  background: selectedTags.includes(tag)
                    ? theme.palette.background.gradient
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.05)',
                  color: selectedTags.includes(tag)
                    ? theme.palette.background.gradient
                    : theme.palette.mode === 'dark'
                      ? '#ffffff'
                      : '#000000',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  height: { xs: 24, sm: 32 },
                  '&:hover': {
                    opacity: 0.9,
                    background: selectedTags.includes(tag)
                      ? theme.palette.background.gradient
                      : theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(0,0,0,0.1)',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {filteredVideos.map((video, index) => (
            <Grid item xs={12} md={4} key={video.videoId}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(6, 39, 54, 0.9)'
                    : '#ffffff',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)'}`,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  component="a"
                  href={getVideoUrl(video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    cursor: 'pointer',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                    '&:hover .play-icon': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={video.thumbnail}
                    alt={video.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <Box
                    className="play-icon"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: video.platform === 'youtube' 
                        ? 'rgba(255, 0, 0, 0.8)'
                        : 'rgba(0, 0, 0, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {getPlatformIcon(video.platform)}
                  </Box>
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {video.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      opacity: 0.9, 
                      mb: 2,
                      color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                    }}
                  >
                    {video.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
                    {video.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={() => handleTagClick(tag)}
                        sx={{
                          m: 0.5,
                          background: selectedTags.includes(tag)
                            ? theme.palette.background.gradient
                            : theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(0,0,0,0.05)',
                          color: selectedTags.includes(tag)
                            ? '#ffffff'
                            : theme.palette.mode === 'dark'
                              ? '#ffffff'
                              : '#000000',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 32 },
                          '&:hover': {
                            opacity: 0.9,
                            background: selectedTags.includes(tag)
                              ? theme.palette.background.gradient
                              : theme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(0,0,0,0.1)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 
```

# src/components/blog/AdminBlogList.js

```js
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';

const AdminBlogList = ({ posts, onEdit, onDelete, onCreate }) => {
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Fallback to original string if parsing fails
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Blog Posts</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onCreate}
        >
          New Post
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{formatDate(post.date)}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.tags?.join(', ')}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(post)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(post.slug)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBlogList; 
```

# src/components/blog/BlogCard.js

```js
'use client';

import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { format } from 'date-fns';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const BlogCard = ({ post }) => {
  const { title, description, date, image, tags, slug } = post;

  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
      <StyledCard>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {format(new Date(date), 'MMMM d, yyyy')}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ backgroundColor: 'primary.light', color: 'primary.contrastText' }}
              />
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default BlogCard; 
```

# src/components/blog/BlogHeader.js

```js
'use client';

import PageHeader from '../PageHeader';

export default function BlogHeader() {
  return (
    <PageHeader
      title="Blog"
      subtitle="A collection of blog articles and thoughts on software development, technology, and other topics."
    />
  );
} 
```

# src/components/blog/BlogLayout.js

```js
'use client';

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '60vh',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '800px',
  padding: theme.spacing(4),
}));

const BlogLayout = ({ children, title, description, image, date, author }) => {
  // Add JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Michael Lynn',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box>
        <HeroSection
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <HeroContent>
            <Typography variant="h1" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {description}
            </Typography>
            <Typography variant="subtitle1">
              By {author} • {new Date(date).toLocaleDateString()}
            </Typography>
          </HeroContent>
        </HeroSection>
        <Container maxWidth="md" sx={{ py: 8 }}>
          {children}
        </Container>
      </Box>
    </Container>
  );
};

export default BlogLayout; 
```

# src/components/blog/BlogList.js

```js
'use client';

import { Grid, Container, Typography, Box } from '@mui/material';
import BlogCard from './BlogCard';

const BlogList = ({ posts }) => {
  if (!posts?.length) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            No blog posts found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new content!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog Posts
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item key={post.slug} xs={12} sm={6} md={4}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BlogList; 
```

# src/components/blog/ImageUpload.js

```js
'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function ImageUpload({ onUpload, value, onChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error uploading file');
      }

      onChange(data.url);
      onUpload?.(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        label="Hero Image URL"
        name="image"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          disabled={isUploading}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        {isUploading && <CircularProgress size={24} />}
      </Box>
      {value && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Preview:
          </Typography>
          <Box
            component="img"
            src={value}
            alt="Preview"
            sx={{
              maxWidth: '100%',
              maxHeight: 200,
              objectFit: 'contain',
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
            }}
          />
        </Box>
      )}
    </Box>
  );
} 
```

# src/components/blog/RichTextEditor.js

```js
'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Paper,
  TextField,
} from '@mui/material';
import {
  Preview,
  Edit,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const previewStyles = {
  '& h1': { fontSize: '2.5rem', mb: 2, fontWeight: 600 },
  '& h2': { fontSize: '2rem', mb: 2, fontWeight: 600 },
  '& h3': { fontSize: '1.75rem', mb: 2, fontWeight: 600 },
  '& h4': { fontSize: '1.5rem', mb: 2, fontWeight: 600 },
  '& h5': { fontSize: '1.25rem', mb: 2, fontWeight: 600 },
  '& h6': { fontSize: '1rem', mb: 2, fontWeight: 600 },
  '& p': { mb: 2, lineHeight: 1.6 },
  '& ul, & ol': { pl: 4, mb: 2 },
  '& li': { mb: 1 },
  '& blockquote': {
    borderLeft: 4,
    borderColor: 'primary.main',
    pl: 2,
    py: 1,
    my: 2,
    fontStyle: 'italic',
  },
  '& code': {
    bgcolor: 'grey.100',
    p: 0.5,
    borderRadius: 1,
    fontFamily: 'monospace',
  },
  '& pre': {
    bgcolor: 'grey.100',
    p: 2,
    borderRadius: 1,
    overflow: 'auto',
    my: 2,
    '& code': {
      p: 0,
      bgcolor: 'transparent',
    }
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    my: 2,
    borderRadius: 1,
    boxShadow: 1,
  },
  '& a': {
    color: 'primary.main',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default function RichTextEditor({ content, onChange }) {
  const [isPreview, setIsPreview] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(content || '');

  useEffect(() => {
    if (content && !markdownContent) {
      setMarkdownContent(content);
    }
  }, [content]);

  const handleChange = (event) => {
    const newContent = event.target.value;
    setMarkdownContent(newContent);
    onChange(newContent);
  };

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Paper
        sx={{
          p: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tooltip title={isPreview ? 'Edit Mode' : 'Preview Mode'}>
          <IconButton onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? <Edit /> : <Preview />}
          </IconButton>
        </Tooltip>
      </Paper>

      <Box sx={{ p: 2, minHeight: 400 }}>
        {isPreview ? (
          <Box sx={previewStyles}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </Box>
        ) : (
          <TextField
            multiline
            fullWidth
            variant="outlined"
            value={markdownContent}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                p: 0,
                '& textarea': {
                  minHeight: '350px',
                  fontFamily: 'monospace',
                  p: 2,
                  lineHeight: 1.6,
                },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
} 
```

# src/components/BlogCard.js

```js
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
          background: theme.palette.mode === 'dark'
            ? theme.palette.background.paper
            : '#ffffff',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0,0,0,0.2)'
            : '0 4px 20px rgba(0,0,0,0.1)',
          border: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)'}`,
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
```

# src/components/BlogList.js

```js
'use client';

import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import BlogCard from './BlogCard';

export default function BlogList({ posts }) {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            background: theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
          }}
        >
          Blog
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} key={post.slug}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 
```

# src/components/BlogPost.js

```js
'use client';

import { Box, Container, Typography, Stack, Chip, useTheme } from '@mui/material';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { format } from 'date-fns';

const components = {
  h1: (props) => (
    <Typography
      variant="h1"
      component="h1"
      {...props}
      sx={{
        mt: 6,
        mb: 3,
        color: 'text.primary',
      }}
    />
  ),
  h2: (props) => (
    <Typography
      variant="h2"
      component="h2"
      {...props}
      sx={{
        mt: 6,
        mb: 3,
        color: 'text.primary',
      }}
    />
  ),
  h3: (props) => (
    <Typography
      variant="h3"
      component="h3"
      {...props}
      sx={{
        mt: 4,
        mb: 2,
        color: 'text.primary',
      }}
    />
  ),
  p: (props) => (
    <Typography
      variant="body1"
      component="p"
      {...props}
      sx={{
        mb: 3,
        lineHeight: 1.8,
      }}
    />
  ),
  ul: (props) => (
    <Box
      component="ul"
      {...props}
      sx={{
        mb: 3,
        pl: 4,
        '& li': {
          mb: 1,
        },
      }}
    />
  ),
  ol: (props) => (
    <Box
      component="ol"
      {...props}
      sx={{
        mb: 3,
        pl: 4,
        '& li': {
          mb: 1,
        },
      }}
    />
  ),
  pre: (props) => (
    <Box
      component="pre"
      {...props}
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        background: 'rgba(0,0,0,0.2)',
      }}
    />
  ),
  code: (props) => (
    <Box
      component="code"
      {...props}
      sx={{
        fontFamily: 'monospace',
        background: 'rgba(0,0,0,0.1)',
        padding: '0.2em 0.4em',
        borderRadius: 0.3,
      }}
    />
  ),
  blockquote: (props) => (
    <Box
      component="blockquote"
      {...props}
      sx={{
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        pl: 3,
        py: 1,
        my: 3,
        color: 'text.secondary',
        fontStyle: 'italic',
      }}
    />
  ),
};

export default function BlogPost({ post }) {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {post.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    background: theme.palette.background.gradient,
                    color: 'white',
                  }}
                />
              ))}
            </Stack>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                background: theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {format(new Date(post.date), 'MMMM d, yyyy')}
              {post.readTime && ` • ${post.readTime}`}
            </Typography>
          </Box>

          {/* Cover Image */}
          {post.coverImage && (
            <Box
              component="img"
              src={post.coverImage}
              alt={post.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
          )}

          {/* Content */}
          <Box>
            <MDXRemote {...post.content} components={components} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
} 
```

# src/components/CodeBlock.js

```js
'use client';

import { Box, Paper, Typography } from '@mui/material';

export default function CodeBlock({ children, language }) {
  return (
    <Paper
      component="pre"
      elevation={0}
      sx={{
        p: 2,
        my: 2,
        bgcolor: 'grey.100',
        borderRadius: 1,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      {language && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
          }}
        >
          {language}
        </Typography>
      )}
      <Typography
        component="code"
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          display: 'block',
          whiteSpace: 'pre',
        }}
      >
        {children}
      </Typography>
    </Paper>
  );
} 
```

# src/components/GitHubActivity.js

```js
'use client';

import { Box, Paper, Typography, useTheme, Button } from '@mui/material';
import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion';
import Section from './Section';
import Link from 'next/link';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Lock as LockIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';


const MotionPaper = motion(Paper);

export default function GitHubActivity() {
  const theme = useTheme();

  // Theme with exactly 5 colors for dark mode
  const colorTheme = {
    dark: [
      '#141414', // No contributions
      '#0a4208', // Level 1
      '#047526', // Level 2
      '#45a045', // Level 3
      '#39dd34', // Level 4
    ]
  };

  return (
    <Section title="GitHub Activity" subtitle="My open source contributions">
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <GitHubCalendar 
          username="mrlynn"
          theme={colorTheme}
          fontSize={12}
          blockSize={10}
          blockMargin={4}
          style={{
            color: theme.palette.text.secondary,
            padding: '1rem 0',
          }}
        />
      </MotionPaper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            component={Link}
            href="https://github.com/mrlynn"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            View More
          </Button>
        </Box>
    </Section>
  );
} 
```

# src/components/Layout.js

```js
'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

const MotionBox = motion(Box);

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          pt: 8, // Add padding top to account for fixed AppBar
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 
```

# src/components/mdx/includes/DemoVideo.js

```js
import React from 'react';
import { Box, Typography } from '@mui/material';

const DemoVideo = ({ videoId, platform = 'youtube', title }) => {
  if (!videoId) {
    return null;
  }

  const getEmbedUrl = () => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`;
      default:
        return `https://www.youtube.com/embed/${videoId}`;
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%', // 16:9 aspect ratio
          width: '100%',
        }}
      >
        <iframe
          src={getEmbedUrl()}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default DemoVideo; 
```

# src/components/mdx/includes/DemoVideo.jsx

```jsx
'use client';

import { Box, Typography } from '@mui/material';

export default function DemoVideo({ url, title }) {
  return (
    <Box sx={{ my: 4 }}>
      {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
      <Box
        sx={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 1,
          },
        }}
      >
        <iframe
          src={url}
          title={title || 'Demo Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
} 
```

# src/components/mdx/includes/TechStack.js

```js
import React from 'react';
import { Box, Chip, Typography, Stack } from '@mui/material';

const TechStack = ({ technologies }) => {
  if (!technologies || !Array.isArray(technologies)) {
    return null;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        Technologies Used
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {technologies.map((tech, index) => (
          <Chip
            key={index}
            label={tech}
            color="primary"
            variant="outlined"
            size="small"
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TechStack; 
```

# src/components/mdx/includes/TechStack.jsx

```jsx
'use client';

import { Box, Chip, Stack, Typography } from '@mui/material';

export default function TechStack({ items }) {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Tech Stack</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            variant="outlined"
            color="primary"
          />
        ))}
      </Stack>
    </Box>
  );
} 
```

# src/components/Navigation.js

```js
'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  MoreVert as MoreIcon,
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  YouTube as YouTubeIcon,
  Palette as PaletteIcon,
  Article as ArticleIcon,
  ContactMail as ContactIcon,
  Book as BookIcon,
  RecordVoiceOver as SpeakingIcon
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme as useCustomTheme } from '../theme/ThemeContext';
import Image from 'next/image';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleNavigation = (path) => {
    router.push(path);
    handleMoreClose();
    setMobileMenuOpen(false);
  };

  // Primary navigation items
  const primaryItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Projects', icon: <WorkIcon />, path: '/projects' },
    { text: 'Blog', icon: <BookIcon />, path: '/blog' },
    { text: 'Speaking', icon: <SpeakingIcon />, path: '/speaking' },
  ];

  // Secondary navigation items (in More dropdown)
  const secondaryItems = [
    { text: 'Videos', icon: <YouTubeIcon />, path: '/videos' },
    { text: 'Art', icon: <PaletteIcon />, path: '/art' },
    { text: 'Resume', icon: <ArticleIcon />, path: '/resume' },
    { text: 'Contact', icon: <ContactIcon />, path: '/contact' }
  ];

  const mobileMenuItems = [...primaryItems, ...secondaryItems];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)'}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo and Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Image
                src="/letter-m-circle.svg"
                alt="M Logo"
                width={26}
                height={26}
                style={{
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                }}
              />
              <Button
                onClick={() => handleNavigation('/')}
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                }}
              >
                Michael Lynn
              </Button>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Primary Navigation */}
                {primaryItems.map((item) => (
                  <Button
                    key={item.path}
                    startIcon={item.icon}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      mx: 1,
                      color: pathname === item.path ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {item.text}
                  </Button>
                ))}

                {/* More Dropdown */}
                <Button
                  aria-controls="more-menu"
                  aria-haspopup="true"
                  onClick={handleMoreClick}
                  endIcon={<MoreIcon />}
                  sx={{ mx: 1 }}
                >
                  More
                </Button>
                <Menu
                  id="more-menu"
                  anchorEl={moreAnchorEl}
                  keepMounted
                  open={Boolean(moreAnchorEl)}
                  onClose={handleMoreClose}
                >
                  {secondaryItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      selected={pathname === item.path}
                    >
                      {item.text}
                    </MenuItem>
                  ))}
                </Menu>

                {/* Theme Toggle */}
                <IconButton onClick={toggleTheme} sx={{ ml: 1 }}>
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{ mr: 1 }}
                >
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
                <IconButton
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  sx={{ color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: theme.palette.mode === 'dark'
              ? 'rgba(18, 18, 18, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ pt: 8 }}>
          <List>
            {mobileMenuItems.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: pathname === item.path ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
```

# src/components/PageHeader.js

```js
'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const MotionTypography = motion(Typography);

export default function PageHeader({ title, subtitle, align = 'center', maxWidth = 'lg' }) {
  return (
    <Box 
      sx={{ 
        py: { xs: 4, md: 8 },
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
      }}
    >
      <Container maxWidth={maxWidth}>
        <MotionTypography
          variant="h1"
          component="h1"
          align={align}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
            fontWeight: 600,
            mb: 2,
            background: (theme) => theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </MotionTypography>
        {subtitle && (
          <MotionTypography
            variant="h5"
            color="text.secondary"
            align={align}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              maxWidth: '800px',
              mx: align === 'center' ? 'auto' : 0,
              mb: { xs: 3, md: 6 },
            }}
          >
            {subtitle}
          </MotionTypography>
        )}
      </Container>
    </Box>
  );
} 
```

# src/components/podcasts/PodcastCard.js

```js
'use client';

import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MotionBox = motion(Box);

export default function PodcastCard({ episode, ...motionProps }) {
  return (
    <MotionBox
      {...motionProps}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        boxShadow: 2,
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'rgba(0,0,0,0.2)' 
          : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
        border: (theme) => `1px solid ${
          theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.1)' 
            : 'rgba(0,0,0,0.1)'
        }`,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Box
            component="img"
            src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
            alt={episode.title}
            sx={{
              width: '100%',
              borderRadius: 1,
              boxShadow: 2,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {episode.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              mb: 2,
            }}
          >
            {episode.description}
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              mb: 2,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {episode.tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small"
                sx={{
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(0,0,0,0.05)',
                  '&:hover': {
                    background: (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'rgba(0,0,0,0.1)',
                  },
                }}
              />
            ))}
          </Stack>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              {new Date(episode.date).toLocaleDateString()} • {episode.duration}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<YouTubeIcon />}
              href={`https://www.youtube.com/watch?v=${episode.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'rgba(0,0,0,0.2)',
                '&:hover': {
                  borderColor: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'rgba(0,0,0,0.3)',
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.05)' 
                    : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              Watch on YouTube
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </MotionBox>
  );
} 
```

# src/components/ProjectFeatures.js

```js
'use client';

import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

export default function ProjectFeatures({ features }) {
  if (!features || features.length === 0) return null;

  return (
    <Box sx={{ my: 2 }}>
      <List>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={typeof feature === 'string' ? feature : feature.title}
              secondary={feature.description}
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: 'medium',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 
```

# src/components/projects/ProjectCard.js

```js
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

export default function ProjectCard({ project }) {
  const { title, description, image, tags = [], color, date, private: isPrivate } = project;

  const formatDate = (dateString) => {
    try {
      // First try parsing with parseISO since we're using ISO format
      return format(parseISO(dateString), 'MMMM yyyy');
    } catch (error) {
      try {
        // Fallback to new Date if parseISO fails
        return format(new Date(dateString), 'MMMM yyyy');
      } catch (error) {
        // If all parsing fails, return a default value
        return 'Date unavailable';
      }
    }
  };

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {title}
                {isPrivate && (
                  <Chip
                    label="Private"
                    size="small"
                    sx={{ ml: 1 }}
                    color="primary"
                  />
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {formatDate(date)}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>

            {tags && tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: color,
                      color: 'white',
                      '&:hover': {
                        bgcolor: color,
                        opacity: 0.9,
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
} 
```

# src/components/projects/ProjectContent.js

```js
'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { Typography } from '@mui/material';
import TechStack from '../mdx/includes/TechStack';
import DemoVideo from '../mdx/includes/DemoVideo';

const components = {
  TechStack,
  DemoVideo,
  h1: (props) => <Typography variant="h1" gutterBottom {...props} />,
  h2: (props) => <Typography variant="h2" gutterBottom {...props} />,
  h3: (props) => <Typography variant="h3" gutterBottom {...props} />,
  h4: (props) => <Typography variant="h4" gutterBottom {...props} />,
  h5: (props) => <Typography variant="h5" gutterBottom {...props} />,
  h6: (props) => <Typography variant="h6" gutterBottom {...props} />,
  p: (props) => <Typography paragraph {...props} />,
  ul: (props) => <Typography component="ul" sx={{ mb: 2, pl: 2 }} {...props} />,
  ol: (props) => <Typography component="ol" sx={{ mb: 2, pl: 2 }} {...props} />,
  li: (props) => <Typography component="li" sx={{ mb: 1 }} {...props} />,
  blockquote: (props) => (
    <Typography
      component="blockquote"
      sx={{
        borderLeft: (theme) => `4px solid ${theme.palette.grey[300]}`,
        margin: 2,
        padding: 2,
        bgcolor: (theme) => theme.palette.grey[50],
      }}
      {...props}
    />
  ),
  code: (props) => (
    <Typography
      component="code"
      sx={{
        bgcolor: (theme) => theme.palette.grey[100],
        p: 0.5,
        borderRadius: 1,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <Typography
      component="pre"
      sx={{
        bgcolor: (theme) => theme.palette.grey[100],
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        mb: 2,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  img: (props) => (
    <Typography
      component="img"
      sx={{
        maxWidth: '100%',
        height: 'auto',
        mb: 2,
        borderRadius: 1,
      }}
      {...props}
    />
  ),
};

export default function ProjectContent({ content }) {
  if (!content) {
    return null;
  }

  try {
    return (
      <div className="mdx-content">
        <MDXRemote 
          source={content} 
          components={components}
        />
      </div>
    );
  } catch (error) {
    console.error('Error rendering MDX:', error);
    return null;
  }
} 
```

# src/components/projects/ProjectLayout.js

```js
import { Container, Typography, Box, Stack, Chip, Link as MuiLink } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';

const HeroSection = ({ children, sx }) => (
  <Box
    sx={{
      position: 'relative',
      height: '60vh',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1,
      },
      ...sx,
    }}
  >
    <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
      {children}
    </Box>
  </Box>
);

const HeroContent = ({ children }) => (
  <Container maxWidth="md">
    <Stack spacing={2}>{children}</Stack>
  </Container>
);

export default function ProjectLayout({
  children,
  title,
  description,
  image,
  date,
  author,
  tags,
  color,
  technologies,
  demoUrl,
  githubUrl,
}) {
  // Add JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: description,
    image: image,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    technologies: technologies,
  };

  return (
    <Container maxWidth="lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box>
        <HeroSection
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <HeroContent>
            <Typography variant="h1" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {description}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Typography variant="subtitle1">
                By {author} • {format(new Date(date), 'MMMM yyyy')}
              </Typography>
              {demoUrl && (
                <MuiLink
                  component={Link}
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', textDecoration: 'underline' }}
                >
                  Live Demo
                </MuiLink>
              )}
              {githubUrl && (
                <MuiLink
                  component={Link}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', textDecoration: 'underline' }}
                >
                  GitHub
                </MuiLink>
              )}
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{
                    bgcolor: color,
                    color: 'white',
                    '&:hover': {
                      bgcolor: color,
                      opacity: 0.9,
                    },
                  }}
                />
              ))}
            </Box>
          </HeroContent>
        </HeroSection>
        <Container maxWidth="md" sx={{ py: 8 }}>
          {children}
        </Container>
      </Box>
    </Container>
  );
} 
```

# src/components/projects/ProjectList.js

```js
'use client';

import { Container, Grid, Box, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }) {
  if (!projects?.length) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            No projects found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new projects!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item key={project.slug} xs={12} sm={6} md={4}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 
```

# src/components/projects/ProjectsHeader.js

```js
'use client';

import PageHeader from '../PageHeader';

export default function ProjectsHeader() {
  return (
    <PageHeader
      title="Projects"
      subtitle="A showcase of my work in software development, from experimental prototypes to production applications. Each project represents a unique challenge and learning opportunity."
    />
  );
} 
```

# src/components/ProjectsSection.js

```js
'use client';

import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, useTheme, Tooltip, Chip, Stack, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Lock as LockIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { projects } from '../data/projects';
import Link from 'next/link';

const MotionCard = motion.create(Card);

export default function ProjectsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        py: 12,
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at center, rgba(5, 102, 141, 0.1) 0%, rgba(4, 30, 43, 0) 70%)'
          : 'radial-gradient(circle at center, rgba(5, 102, 141, 0.05) 0%, rgba(4, 30, 43, 0) 70%)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Featured Projects
        </Typography>
        <Grid container spacing={4}>
          {projects.slice(0, 6).map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={project.title}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(6, 39, 54, 0.9)'
                    : theme.palette.background.paper,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)'}`,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      filter: project.private ? 'brightness(0.7)' : 'none',
                    }}
                  />
                  {project.private && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <LockIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Private
                      </Typography>
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      fontWeight: 600,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        sx={{
                          m: 0.5,
                          background: theme.palette.background.gradient,
                          color: isDark ? 'white' : 'black',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 32 },
                          '&:hover': {
                            opacity: 0.9,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Tooltip title={project.private ? "This is a private project" : "View Project"}>
                    <span>
                      <Button
                        size="small"
                        startIcon={project.private ? <LockIcon /> : <LaunchIcon />}
                        href={project.private ? '#' : project.demoUrl}
                        target="_blank"
                        disabled={project.private}
                        sx={{
                          color: project.private
                            ? theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
                            : theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                          '&:hover': {
                            color: project.private
                              ? theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
                              : theme.palette.secondary.main,
                          },
                        }}
                      >
                        {project.private ? 'Private Project' : 'View Project'}
                      </Button>
                    </span>
                  </Tooltip>
                </CardActions>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            component={Link}
            href="/projects"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            View More Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 
```

# src/components/providers/DatePickerProvider.js

```js
'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function DatePickerProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  );
} 
```

# src/components/Resume.js

```js
'use client';

import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, Chip, Stack, Divider, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const experiences = [
  {
    title: 'Principal Developer Advocate',
    company: 'MongoDB',
    location: 'Greater New York City Area',
    period: 'Mar 2018 - Present',
    description: 'In my current role at MongoDB, I\'m dedicated to empowering developers and internal technical teams by delivering hands-on enablement content focused heavily on Artificial Intelligence (AI), MongoDB Atlas, and MongoDB Vector Search. I actively design labs, interactive workshops, and comprehensive training programs that simplify and demonstrate how developers can practically leverage these advanced technologies in real-world scenarios.',
    responsibilities: [
      'Artificial Intelligence & MongoDB Integration: Built practical demonstrations and sample applications to showcase how developers can implement AI-driven solutions using MongoDB Atlas, MongoDB Vector Search, and advanced AI techniques, enabling more intelligent applications and improved user experiences.',
      'Vector Search Enablement: Created comprehensive learning resources and interactive labs that educate developers on MongoDB Vector Search, including semantic search use cases, retrieval-augmented generation (RAG) strategies, and integration with leading AI models like OpenAI.',
      'Educational Content & Community Engagement: Produced technical screencasts, articles, podcasts, and live streams focused explicitly on Data Modeling, AI implementation, MongoDB\'s innovative data platform capabilities, and emerging developer trends.',
      'Technical Advisory & Mentorship: Mentored developers, founders, and technical stakeholders, assisting them in adopting and successfully integrating advanced MongoDB features and AI technologies into their software projects.',
      'MongoDB for Startups Program: Contributed to the launch and growth of the MongoDB for Startups initiative, guiding early-stage companies.',
      'Created and produced the MongoDB Podcast, featuring interviews with industry leaders and technical deep-dives into MongoDB technologies.'
    ]
  },
  {
    title: 'Sr. Solutions Architect',
    company: 'MongoDB',
    location: 'Greater New York City Area',
    period: 'Jan 2016 - Mar 2018',
    description: 'Responsible for guiding and informing customers and users throughout the process of designing and building reliable, scalable systems using MongoDB.',
    responsibilities: [
      'Design systems, applications, and infrastructure to help drive some of the world\'s largest software development projects leveraging MongoDB',
      'Advise customers on architectures, patterns, and strategies for making best use of MongoDB',
      'Partner with our sales team to help ensure success in accounts ranging from small startups to large enterprises',
      'Lead proof of concept implementations from concept through execution',
      'Translate technical concepts and patterns into business benefits for management and executives',
      'Work with the enablement team to produce and deliver content to educate newly hired MongoDB team members',
      'Curate, develop and deliver field enablement and education content to train MongoDB employees'
    ]
  },
  {
    title: 'Co-Organizer - MongoDB Community User Group (PhillyMUG)',
    company: 'MongoDB',
    location: 'Philadelphia, PA',
    period: 'Jun 2015 - Present',
    description: 'Building and driving increased awareness of MongoDB\'s Database Platform and tools and related NoSQL technologies in and around the Philadelphia Area.',
    responsibilities: [
      'Organize and facilitate monthly meetup sessions for the Philadelphia MongoDB User Group',
      'Identify and coordinate with speakers for technical presentations and workshops',
      'Build and deliver technical presentations on MongoDB features and best practices',
      'Foster a vibrant community of MongoDB developers in the Philadelphia region',
      'Create hands-on workshops and learning opportunities for the local developer community'
    ]
  },
  {
    title: 'Solutions Consultant',
    company: 'Medallia, Inc.',
    location: 'Yardley, PA',
    period: 'Jun 2013 - Dec 2015',
    description: 'Worked with businesses to measure and improve customer experience in real time through software solutions.',
    responsibilities: [
      'Drive strategy and execution of Medallia\'s referral, resell and service delivery partnerships',
      'Develop product integration, business models and sales enablement plans',
      'Create custom solutions and demonstrations for various verticals and industries'
    ]
  }
];

const skills = [
  'Large Language Models (LLM)',
  'Data Modeling',
  'Artificial Intelligence (AI)',
  'Vector Search',
  'MongoDB',
  'JavaScript',
  'Node.js',
  'Developer Advocacy',
  'Technical Training',
  'Public Speaking',
  'Podcasting',
  'Content Creation',
  'Team Leadership',
  'Community Building',
  'Solutions Architecture',
  'Python',
  'Technical Writing'
];

export default function Resume() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const paperStyle = {
    p: { xs: 2, sm: 3 },
    mb: { xs: 2, sm: 3 },
    background: isDark ? 'rgba(6, 39, 54, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    color: theme.palette.text.primary,
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            lineHeight: 1.2,
            color: theme.palette.text.primary,
          }}
        >
          Professional Experience: Michael Lynn
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            color: theme.palette.text.secondary,
          }}
        >
          A track record of technical leadership and innovation in developer advocacy and solutions architecture
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={8}>
          {experiences.map((exp, index) => (
            <MotionPaper
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={paperStyle}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  color: theme.palette.text.primary,
                }}
              >
                {exp.title}
              </Typography>
              <Typography 
                variant="subtitle1" 
                gutterBottom
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: theme.palette.text.secondary,
                }}
              >
                {exp.company} | {exp.location} | {exp.period}
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: theme.palette.text.primary,
                }}
              >
                {exp.description}
              </Typography>
              <List sx={{ py: 0 }}>
                {exp.responsibilities.map((resp, i) => (
                  <ListItem 
                    key={i}
                    sx={{
                      py: { xs: 0.5, sm: 1 },
                      '& .MuiListItemText-root': {
                        m: 0,
                      },
                    }}
                  >
                    <ListItemText 
                      primary={resp}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          color: theme.palette.text.primary,
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </MotionPaper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <MotionPaper
            initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              ...paperStyle,
              position: { xs: 'sticky', md: 'static' },
              top: { xs: 16, sm: 24 },
              zIndex: 1,
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                color: theme.palette.text.primary,
              }}
            >
              Skills & Expertise
            </Typography>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Stack 
              direction="row" 
              spacing={1} 
              flexWrap="wrap" 
              useFlexGap
              sx={{
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    m: 0.5,
                    background: theme.palette.background.gradient,
                    color: isDark ? 'white' : 'black',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    height: { xs: 24, sm: 32 },
                    '&:hover': {
                      opacity: 0.9,
                    },
                  }}
                />
              ))}
            </Stack>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
} 
```

# src/components/Section.js

```js
'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Section({ title, subtitle, children }) {
  const theme = useTheme();

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      sx={{ py: 8 }}
    >
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 600,
            background: theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {children}
    </MotionBox>
  );
} 
```

# src/components/speaking/EventDetailsModal.js

```js
'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import { format, isToday, isFuture, isPast, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import LaunchIcon from '@mui/icons-material/Launch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideocamIcon from '@mui/icons-material/Videocam';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function EventDetailsModal({ open, onClose, event }) {
  if (!event) return null;

  const {
    title,
    description,
    eventType,
    eventName,
    date,
    time,
    timezone,
    location,
    venue,
    tags,
    slidesUrl,
    recordingUrl,
    registrationUrl,
    abstract,
    isUpcoming,
    content,
  } = event;

  // Safely parse the date
  const parsedDate = date ? parseISO(date) : null;
  
  // Format date and time if available
  const formattedDate = parsedDate ? format(parsedDate, 'MMMM d, yyyy') : 'Date TBD';
  const formattedTime = time || 'Time TBD';

  const getEventStatus = () => {
    if (!parsedDate) return { label: 'TBD', color: 'default', show: true };
    
    if (isToday(parsedDate)) {
      return {
        label: 'Live Now',
        color: 'success',
        show: true
      };
    }
    if (isFuture(parsedDate)) {
      return {
        label: 'Upcoming',
        color: 'primary',
        show: true
      };
    }
    return {
      label: 'Past',
      color: 'default',
      show: true
    };
  };

  const eventStatus = getEventStatus();

  // Custom components for MDX
  const components = {
    h1: (props) => <Typography variant="h4" {...props} gutterBottom />,
    h2: (props) => <Typography variant="h5" {...props} gutterBottom />,
    h3: (props) => <Typography variant="h6" {...props} gutterBottom />,
    p: (props) => <Typography variant="body1" {...props} paragraph />,
    ul: (props) => <Box component="ul" sx={{ pl: 2, mb: 2 }} {...props} />,
    li: (props) => <Typography component="li" variant="body1" {...props} />,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="event-details-title"
    >
      <DialogTitle 
        id="event-details-title"
        sx={{ 
          pr: 6,
          pb: 0
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {eventStatus.show && (
          <Chip
            label={eventStatus.label}
            color={eventStatus.color}
            size="small"
            sx={{ mb: 1 }}
          />
        )}
        
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <EventIcon color="primary" />
            <Typography variant="subtitle1">
              {eventType} • {eventName}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CalendarTodayIcon color="primary" />
            <Typography variant="subtitle1">
              {formattedDate} at {formattedTime} {timezone}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="subtitle1">
              {venue}, {location}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          About this session
        </Typography>
        
        <Typography variant="body1" paragraph>
          {abstract}
        </Typography>

        {content && (
          <Box 
            sx={{ 
              mt: 3,
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: 'text.primary',
                fontWeight: 600,
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2,
              },
              '& li': {
                mb: 1,
              },
            }}
          >
            <MDXRemote {...content} components={components} />
          </Box>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Resources
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {registrationUrl && (
            <Link
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <HowToRegIcon />
              Register for this event
              <LaunchIcon fontSize="small" />
            </Link>
          )}
          
          {slidesUrl && (
            <Link
              href={slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <SlideshowIcon />
              View presentation slides
              <LaunchIcon fontSize="small" />
            </Link>
          )}
          
          {recordingUrl && (
            <Link
              href={recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <VideocamIcon />
              Watch recording
              <LaunchIcon fontSize="small" />
            </Link>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Close</Button>
        {registrationUrl && eventStatus.label === 'Upcoming' && (
          <Button
            variant="contained"
            color="primary"
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon />}
          >
            Register Now
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
} 
```

# src/components/speaking/SpeakingCard.js

```js
import { Card, CardContent, CardHeader, Typography, Chip, Box, Link, useTheme } from '@mui/material';
import { format, isToday, isFuture, isPast } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import LaunchIcon from '@mui/icons-material/Launch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventDetailsModal from './EventDetailsModal';
import { useState } from 'react';

// Helper function to sort engagements by date
export const sortEngagements = (engagements) => {
  return [...engagements].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
};

export default function SpeakingCard({ engagement }) {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    title,
    date,
    eventName,
    location,
    venue,
    eventType,
    tags,
    slidesUrl,
    recordingUrl,
    abstract,
    isUpcoming,
    content
  } = engagement;

  const theme = useTheme();
  const eventDate = new Date(date);

  const getEventStatus = () => {
    if (isToday(eventDate)) {
      return {
        label: 'Live Now',
        color: 'success',
        show: true
      };
    }
    if (isFuture(eventDate)) {
      return {
        label: 'Upcoming',
        color: 'primary',
        show: true
      };
    }
    return {
      label: 'Past',
      color: 'default',
      show: false // Set to true if you want to show past event badges
    };
  };

  const eventStatus = getEventStatus();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card 
        onClick={handleOpenModal}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        }}
      >
        {eventStatus.show && (
          <Chip
            label={eventStatus.label}
            color={eventStatus.color}
            sx={{
              position: 'absolute',
              top: -12,
              right: 16,
              zIndex: 1,
            }}
          />
        )}
        
        <CardHeader
          title={
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
          }
          subheader={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" color="text.secondary">
                  {eventType} • {eventName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" color="text.secondary">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" color="text.secondary">
                  {venue}, {location}
                </Typography>
              </Box>
            </Box>
          }
          sx={{
            pb: 0,
            '& .MuiCardHeader-content': {
              overflow: 'visible',
            },
          }}
        />

        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 3,
            }}
          >
            {abstract}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '10',
                  },
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
            {slidesUrl && (
              <Link
                href={slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <SlideshowIcon fontSize="small" />
                Slides
              </Link>
            )}
            {recordingUrl && (
              <Link
                href={recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <VideocamIcon fontSize="small" />
                Recording
              </Link>
            )}
          </Box>
        </CardContent>
      </Card>

      <EventDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        event={engagement}
        content={content}
      />
    </>
  );
} 
```

# src/components/speaking/SpeakingList.js

```js
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Chip,
  Box,
  Link,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

export default function SpeakingList({ engagements }) {
  // Sort engagements by date (newest first)
  const sortedEngagements = [...engagements].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <List>
      {sortedEngagements.map((engagement, index) => {
        const {
          title,
          date,
          eventName,
          location,
          venue,
          eventType,
          tags,
          slidesUrl,
          recordingUrl,
          abstract,
          isUpcoming
        } = engagement;

        return (
          <Box key={engagement.slug}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventIcon fontSize="small" />
                    <Typography variant="h6" component="span">
                      {title}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarTodayIcon fontSize="small" />
                      <Typography variant="body2" component="span">
                        {format(new Date(date), 'MMMM d, yyyy')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography variant="body2" component="span">
                        {venue}, {location}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {abstract}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      {tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {slidesUrl && (
                        <Link
                          href={slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="body2"
                        >
                          View Slides
                        </Link>
                      )}
                      {recordingUrl && (
                        <Link
                          href={recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="body2"
                        >
                          Watch Recording
                        </Link>
                      )}
                    </Box>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={isUpcoming ? 'Upcoming' : 'Past'}
                  color={isUpcoming ? 'primary' : 'default'}
                  size="small"
                />
              </ListItemSecondaryAction>
            </ListItem>
            {index < sortedEngagements.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        );
      })}
    </List>
  );
} 
```

# src/components/speaking/SpeakingMap.js

```js
'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, Alert } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '600px',
  position: 'relative'
};

const defaultCenter = {
  lat: 37.0902,
  lng: -95.7129
};

// Global promise to track script loading
let loadGoogleMapsPromise = null;

const loadGoogleMapsScript = () => {
  if (loadGoogleMapsPromise) {
    return loadGoogleMapsPromise;
  }

  loadGoogleMapsPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Google Maps script loaded');
      resolve(window.google.maps);
    };

    script.onerror = (err) => {
      console.error('Error loading Google Maps script:', err);
      reject(err);
    };

    document.head.appendChild(script);
  });

  return loadGoogleMapsPromise;
};

export default function SpeakingMap({ engagements }) {
  console.log('SpeakingMap rendering');
  console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing');

  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  useEffect(() => {
    let mounted = true;

    const initializeMap = async () => {
      try {
        const maps = await loadGoogleMapsScript();
        if (!mounted || !mapRef.current || mapInstanceRef.current) return;

        // Create map instance
        mapInstanceRef.current = new maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 3,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        });
        console.log('Map instance created successfully');

        // Clear existing markers and info windows
        markersRef.current.forEach(marker => marker.setMap(null));
        infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
        markersRef.current = [];
        infoWindowsRef.current = [];

        // Add markers for each engagement
        if (engagements && engagements.length > 0) {
          const geocoder = new maps.Geocoder();
          let bounds = new maps.LatLngBounds();

          console.log('Original engagements:', engagements.map(e => ({
            title: e.title,
            date: e.date,
            parsedDate: new Date(e.date)
          })));

          // Sort engagements by date (newest first)
          const sortedEngagements = [...engagements].sort((a, b) => {
            // Ensure we have valid dates
            const dateA = a.date ? new Date(a.date) : new Date(0);
            const dateB = b.date ? new Date(b.date) : new Date(0);
            
            // Handle invalid dates
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;
            
            return dateB.getTime() - dateA.getTime();
          });

          console.log('Sorted engagements:', sortedEngagements.map(e => ({
            title: e.title,
            date: e.date,
            parsedDate: new Date(e.date)
          })));

          for (const engagement of sortedEngagements) {
            if (!engagement.location) {
              console.log(`Skipping engagement without location: ${engagement.title}`);
              continue;
            }

            try {
              console.log(`Geocoding location for: ${engagement.title} at ${engagement.location}`);
              const result = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: engagement.location }, (results, status) => {
                  if (status === 'OK') {
                    resolve(results[0]);
                  } else {
                    console.error(`Geocoding status for ${engagement.location}: ${status}`);
                    reject(new Error(`Geocoding failed: ${status}`));
                  }
                });
              });

              const position = result.geometry.location;
              bounds.extend(position);

              // Create marker
              const marker = new maps.Marker({
                position,
                map: mapInstanceRef.current,
                title: engagement.title,
                animation: maps.Animation.DROP
              });

              // Create info window
              const infoWindow = new maps.InfoWindow({
                content: `
                  <div style="padding: 8px; max-width: 300px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1976d2;">${engagement.title}</h3>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Location:</strong> ${engagement.location}
                    </p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Date:</strong> ${new Date(engagement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    ${engagement.description ? `
                      <p style="margin: 8px 0 4px 0; font-size: 14px; color: #333;">
                        ${engagement.description}
                      </p>
                    ` : ''}
                    ${engagement.url ? `
                      <p style="margin: 8px 0 0 0;">
                        <a href="${engagement.url}" target="_blank" rel="noopener noreferrer" 
                           style="color: #1976d2; text-decoration: none; font-size: 14px;">
                          View Event Details →
                        </a>
                      </p>
                    ` : ''}
                  </div>
                `
              });

              // Add click listener
              marker.addListener('click', () => {
                infoWindowsRef.current.forEach(window => window.close());
                infoWindow.open(mapInstanceRef.current, marker);
              });

              markersRef.current.push(marker);
              infoWindowsRef.current.push(infoWindow);
              console.log(`Successfully added marker for: ${engagement.title}`);
            } catch (err) {
              console.error(`Error geocoding location for ${engagement.title}:`, err);
              // Add a marker at a default location with a different icon to indicate error
              const marker = new maps.Marker({
                position: defaultCenter,
                map: mapInstanceRef.current,
                title: `${engagement.title} (Location Error)`,
                icon: {
                  path: maps.SymbolPath.CIRCLE,
                  scale: 7,
                  fillColor: '#FF0000',
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }
              });

              const infoWindow = new maps.InfoWindow({
                content: `
                  <div style="padding: 8px; max-width: 300px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1976d2;">${engagement.title}</h3>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Location:</strong> ${engagement.location}
                    </p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Date:</strong> ${new Date(engagement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    ${engagement.description ? `
                      <p style="margin: 8px 0 4px 0; font-size: 14px; color: #333;">
                        ${engagement.description}
                      </p>
                    ` : ''}
                    ${engagement.url ? `
                      <p style="margin: 8px 0 4px 0;">
                        <a href="${engagement.url}" target="_blank" rel="noopener noreferrer" 
                           style="color: #1976d2; text-decoration: none; font-size: 14px;">
                          View Event Details →
                        </a>
                      </p>
                    ` : ''}
                    <p style="margin: 8px 0 0 0; color: #d32f2f; font-size: 14px;">
                      ⚠️ Location could not be geocoded
                    </p>
                  </div>
                `
              });

              marker.addListener('click', () => {
                infoWindowsRef.current.forEach(window => window.close());
                infoWindow.open(mapInstanceRef.current, marker);
              });

              markersRef.current.push(marker);
              infoWindowsRef.current.push(infoWindow);
            }
          }

          // Fit map to show all markers
          if (markersRef.current.length > 0) {
            mapInstanceRef.current.fitBounds(bounds);
          }
        }
      } catch (err) {
        console.error('Error initializing map:', err);
        if (mounted) {
          setError(`Failed to initialize map: ${err.message}`);
        }
      }
    };

    initializeMap();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      markersRef.current.forEach(marker => marker.setMap(null));
      infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
    };
  }, [engagements]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <Paper sx={{ height: 600, p: 3 }}>
        <Typography>Google Maps API Key is missing</Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        height: 600,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box 
        ref={mapRef}
        sx={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          backgroundColor: '#f5f5f5'
        }}
      />
    </Paper>
  );
} 
```

# src/components/speaking/SpeakingTable.js

```js
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip,
  TextField,
  TableSortLabel,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import EventDetailsModal from './EventDetailsModal';
import { useState, useMemo } from 'react';

export default function SpeakingTable({ engagements }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    date: '',
    eventType: '',
    location: '',
    status: '',
  });

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  // Get unique values for filter dropdowns
  const uniqueEventTypes = useMemo(() => {
    return [...new Set(engagements.map(e => e.eventType))].sort();
  }, [engagements]);

  const uniqueLocations = useMemo(() => {
    return [...new Set(engagements.map(e => e.location))].sort();
  }, [engagements]);

  // Filter and sort the engagements
  const filteredAndSortedEngagements = useMemo(() => {
    let filtered = engagements.filter(engagement => {
      const eventDate = new Date(engagement.date);
      const isUpcoming = eventDate >= new Date();
      const status = isUpcoming ? 'Upcoming' : 'Past';

      // Apply search filter
      const searchMatch = searchQuery === '' || 
        engagement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engagement.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engagement.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply column filters
      const dateMatch = filters.date === '' || 
        format(eventDate, 'MMM yyyy') === filters.date;
      const eventTypeMatch = filters.eventType === '' || 
        engagement.eventType === filters.eventType;
      const locationMatch = filters.location === '' || 
        engagement.location === filters.location;
      const statusMatch = filters.status === '' || 
        status === filters.status;

      return searchMatch && dateMatch && eventTypeMatch && locationMatch && statusMatch;
    });

    // Sort the filtered results
    return filtered.sort((a, b) => {
      const aValue = orderBy === 'date' ? new Date(a.date) : a[orderBy];
      const bValue = orderBy === 'date' ? new Date(b.date) : b[orderBy];
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [engagements, filters, searchQuery, orderBy, order]);

  // Get unique months for date filter
  const uniqueMonths = useMemo(() => {
    return [...new Set(engagements.map(e => 
      format(new Date(e.date), 'MMM yyyy')
    ))].sort((a, b) => new Date(a) - new Date(b));
  }, [engagements]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleRequestSort('date')}
                  >
                    Date
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Dates</MenuItem>
                    {uniqueMonths.map(month => (
                      <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={() => handleRequestSort('title')}
                >
                  Event
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'location'}
                    direction={orderBy === 'location' ? order : 'asc'}
                    onClick={() => handleRequestSort('location')}
                  >
                    Location
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    {uniqueLocations.map(location => (
                      <MenuItem key={location} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'eventType'}
                    direction={orderBy === 'eventType' ? order : 'asc'}
                    onClick={() => handleRequestSort('eventType')}
                  >
                    Type
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.eventType}
                    onChange={(e) => handleFilterChange('eventType', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {uniqueEventTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Status
                  </TableSortLabel>
                  <Select
                    size="small"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                    <MenuItem value="Past">Past</MenuItem>
                  </Select>
                </Box>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedEngagements.map((engagement) => {
              const eventDate = new Date(engagement.date);
              const isUpcoming = eventDate >= new Date();
              
              return (
                <TableRow 
                  key={engagement.slug}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {format(eventDate, 'MMM d, yyyy')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" component="div">
                      {engagement.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {engagement.eventName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {engagement.venue}, {engagement.location}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {engagement.eventType}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={isUpcoming ? 'Upcoming' : 'Past'}
                      color={isUpcoming ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenModal(engagement)}
                        color="primary"
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <EventDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </>
  );
} 
```

# src/components/TechnologyList.js

```js
'use client';

import { Box, Chip, Stack, Typography } from '@mui/material';

export default function TechnologyList({ technologies }) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {technologies.map((tech, index) => (
          <Chip
            key={index}
            label={typeof tech === 'string' ? tech : tech.name}
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
} 
```

# src/components/Timeline.js

```js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, useTheme, Tooltip, Chip, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import styles from './Timeline.module.css';

const getCompanyLogo = (company) => {
  const logoMap = {
    'MongoDB': '/images/mongodb.svg',
    'Medallia': '/images/medallia.svg',
    'BMC Software': '/images/bmc.svg',
    'Bank of America': '/images/bofa.svg',
    'Merrill Lynch': '/images/ml.svg'
  };
  return logoMap[company] || null;
};

const Timeline = ({ events }) => {
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
      <Typography
        variant="h2"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          mb: 6,
          background: theme.palette.background.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Professional Timeline
      </Typography>
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
                {getCompanyLogo(event.company) && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={getCompanyLogo(event.company)}
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
```

# src/components/Timeline.module.css

```css
.timelineContainer {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.timelineWrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  padding: 3rem 0;
  backdrop-filter: blur(10px);
}

.timelineTrack {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 4rem;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}

.timelineItem {
  flex: 1;
  position: relative;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 350px;
}

.timelineItem.active {
  transform: translateY(-10px);
}

.timelineItem.active .content {
  background: rgba(66, 122, 161, 0.1);
  border-left: 3px solid #427AA1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.connector {
  position: absolute;
  top: 50%;
  right: -50%;
  width: 100%;
  height: 2px;
  background: rgba(66, 122, 161, 0.3);
  z-index: 1;
}

.timelineItem:last-child .connector {
  display: none;
}

.date {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 0.75rem;
  text-align: center;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.currentBadge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  background: #427AA1;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(66, 122, 161, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(66, 122, 161, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 122, 161, 0);
  }
}

.content {
  padding: 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(66, 122, 161, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.logoContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.timelineItem:hover .logoContainer {
  transform: scale(1.05);
}

.content h3 {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #333;
  text-align: center;
  font-weight: 600;
}

.company {
  font-size: 1rem;
  color: #427AA1;
  margin: 0 0 0.75rem 0;
  text-align: center;
  font-weight: 500;
}

.description {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
  line-height: 1.5;
  text-align: center;
}

.progressBar {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.progressDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(66, 122, 161, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.progressDot.active {
  background: #427AA1;
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(66, 122, 161, 0.3);
}

@media (max-width: 768px) {
  .timelineContainer {
    display: none;
  }
}

/* Dark theme overrides */
@media (prefers-color-scheme: dark) {
  .content {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logoContainer {
    background: rgba(255, 255, 255, 0.1);
  }

  .content h3 {
    color: #fff;
  }

  .company {
    color: #ccc;
  }

  .description {
    color: #999;
  }

  .date {
    color: rgba(255, 255, 255, 0.9);
  }

  .currentBadge {
    background: #427AA1;
    color: #fff;
  }

  .connector {
    background: rgba(255, 255, 255, 0.1);
  }

  .progressDot {
    background: rgba(255, 255, 255, 0.1);
  }

  .progressDot.active {
    background: #fff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
} 
```

# src/components/VideosSection.js

```js
'use client';

import { Box, Container, Typography, Grid, Paper, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { YouTube as YouTubeIcon, MusicNote as TikTokIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { videos } from '../data/videos';

const MotionPaper = motion(Paper);

const getVideoUrl = (video) => {
  switch (video.platform) {
    case 'youtube':
      return `https://www.youtube.com/watch?v=${video.videoId}`;
    case 'tiktok':
      return `https://www.tiktok.com/@fitbodymike/video/${video.videoId}`;
    default:
      return '';
  }
};

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'youtube':
      return <YouTubeIcon sx={{ fontSize: '32px', color: 'white' }} />;
    case 'tiktok':
      return <TikTokIcon sx={{ fontSize: '32px', color: 'white' }} />;
    default:
      return null;
  }
};

export default function VideosSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 12,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 600,
                background: theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Featured Videos
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                opacity: 0.9,
              }}
            >
              Watch my latest tech talks, tutorials, and conference presentations
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {videos.slice(0, 3).map((video, index) => (
            <Grid item xs={12} md={4} key={video.videoId}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(6, 39, 54, 0.9)'
                    : theme.palette.background.paper,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)'}`,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  component="a"
                  href={getVideoUrl(video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    cursor: 'pointer',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                    '&:hover .play-icon': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={video.thumbnail}
                    alt={video.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <Box
                    className="play-icon"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: video.platform === 'youtube' 
                        ? 'rgba(255, 0, 0, 0.8)'
                        : 'rgba(0, 0, 0, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {getPlatformIcon(video.platform)}
                  </Box>
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {video.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      opacity: 0.9, 
                      mb: 2,
                      color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                    }}
                  >
                    {video.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: { xs: 0.5, sm: 1 } }}>
                    {video.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        sx={{
                          m: 0.5,
                          background: theme.palette.background.gradient,
                          color: '#ffffff',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 32 },
                          '&:hover': {
                            opacity: 0.9,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 
```

# src/content/blog/designing-beautiful-user-interfaces.mdx

```mdx
---
title: Designing Beautiful User Interfaces
date: '2024-03-15'
tags: ['UI/UX', 'Design', 'Web Development']
excerpt: Explore principles and practices for creating stunning and user-friendly interfaces.
coverImage: './images/blog/ui-design.jpg'
readTime: '7 min read'
---

# Designing Beautiful User Interfaces

Creating beautiful and functional user interfaces is both an art and a science. In this post, we'll explore key principles and practices that lead to exceptional UI design.

## Core Design Principles

### 1. Visual Hierarchy

Visual hierarchy helps users navigate through your interface by emphasizing important elements:

- Size and scale variations
- Color and contrast
- Typography choices
- Whitespace utilization

### 2. Consistency

Maintain consistency across your interface to create a cohesive experience:

- Color schemes
- Typography systems
- Component styles
- Interaction patterns

### 3. Feedback & Affordance

Clear feedback and affordance help users understand how to interact:

- Visual feedback on interactions
- Clear hover and active states
- Loading states and transitions
- Error and success messages

## Practical Implementation

### Color Theory

\`\`\`css
:root {
  /* Primary colors */
  --primary-100: hsl(220, 100%, 90%);
  --primary-500: hsl(220, 100%, 50%);
  --primary-900: hsl(220, 100%, 10%);
  
  /* Accent colors */
  --accent-500: hsl(280, 100%, 50%);
  
  /* Neutral colors */
  --neutral-100: hsl(220, 10%, 90%);
  --neutral-900: hsl(220, 10%, 10%);
}
\`\`\`

### Typography Scale

\`\`\`css
:root {
  /* Font scale using a 1.25 ratio */
  --text-xs: 0.64rem;
  --text-sm: 0.8rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.563rem;
  --text-2xl: 1.953rem;
  --text-3xl: 2.441rem;
  --text-4xl: 3.052rem;
}
\`\`\`

## Best Practices

1. **Mobile-First Design**
   - Start with mobile layouts
   - Progressive enhancement
   - Responsive breakpoints

2. **Accessibility**
   - High contrast ratios
   - Keyboard navigation
   - Screen reader support
   - ARIA labels

3. **Performance**
   - Optimized assets
   - Smooth animations
   - Progressive loading
   - Minimal layout shifts

## Tools and Resources

Essential tools for UI design:

1. **Design Tools**
   - Figma
   - Adobe XD
   - Sketch

2. **Color Tools**
   - Coolors
   - Adobe Color
   - Colorhunt

3. **Typography Tools**
   - Google Fonts
   - Type Scale
   - Font Pair

## Conclusion

Beautiful UI design is achieved through careful attention to principles, consistent implementation, and continuous iteration based on user feedback.

> "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs

Remember that great design finds the perfect balance between aesthetics and functionality. 
```

# src/content/blog/getting-started-with-nextjs.mdx

```mdx
---
title: Getting Started with Next.js
date: '2024-03-20'
tags: ['Next.js', 'React', 'Web Development']
excerpt: Learn how to build modern web applications with Next.js and React, from setup to deployment.
coverImage: './images/blog/nextjs-starter.jpg'
readTime: '5 min read'
---

# Getting Started with Next.js

Next.js is a powerful framework for building React applications. It provides a great developer experience with features like server-side rendering, static site generation, and API routes out of the box.

## Why Next.js?

Next.js offers several advantages over traditional React applications:

- **Server-Side Rendering**: Better performance and SEO
- **Static Site Generation**: Fast page loads and reduced server load
- **API Routes**: Build backend functionality directly in your Next.js app
- **File-System Based Routing**: Intuitive and easy to understand
- **Built-in CSS Support**: Including CSS Modules and Sass

## Setting Up Your First Project

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-next-app
\`\`\`

When you run this command, you'll be prompted with configuration options. For a modern development experience, I recommend:

- Use TypeScript for better type safety
- Enable ESLint for code quality
- Add Tailwind CSS for styling
- Use the `src/` directory for better organization
- Enable the new App Router
- Keep the default import alias

## Project Structure

A typical Next.js project structure looks like this:

\`\`\`
my-next-app/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   └── lib/
├── public/
├── package.json
└── next.config.js
\`\`\`

## Creating Your First Page

In the App Router, pages are created by adding files to the `app` directory. Here's a simple example:

\`\`\`tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to My Next.js App</h1>
    </main>
  );
}
\`\`\`

## Adding API Routes

API routes are created by adding files to the `app/api` directory:

\`\`\`tsx
// src/app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API!' });
}
\`\`\`

## Deployment Options

Next.js applications can be deployed to various platforms:

- **Vercel**: The creators of Next.js offer the best deployment experience
- **Netlify**: Great for static sites
- **AWS**: Using services like Amplify or Elastic Beanstalk

## Conclusion

Next.js is an excellent choice for building modern web applications. Its features and developer experience make it a joy to work with, while its performance optimizations ensure your applications run smoothly.

> **Tip**: Check out the [Next.js documentation](https://nextjs.org/docs) for more detailed information and examples.

Happy coding! 🚀 
```

# src/content/blog/optimizing-web-performance.mdx

```mdx
---
title: Optimizing Web Performance
date: '2024-03-18'
tags: ['Performance', 'Web Development', 'Optimization']
excerpt: Learn essential techniques for optimizing web performance and improving user experience.
coverImage: './images/blog/performance.jpg'
readTime: '6 min read'
---

# Optimizing Web Performance

Web performance is crucial for user experience and business success. In this post, we'll explore various techniques to optimize your web applications.

## Why Performance Matters

Performance impacts both user experience and business metrics:

- **User Experience**: Faster sites lead to happier users
- **SEO**: Google considers performance in rankings
- **Conversion Rates**: Better performance often means better conversions
- **Cost**: Optimized sites use fewer resources

## Key Performance Metrics

The Core Web Vitals are essential metrics to track:

1. **Largest Contentful Paint (LCP)**
   - Measures loading performance
   - Should be under 2.5 seconds

2. **First Input Delay (FID)**
   - Measures interactivity
   - Should be under 100 milliseconds

3. **Cumulative Layout Shift (CLS)**
   - Measures visual stability
   - Should be under 0.1

## Optimization Techniques

### 1. Image Optimization

\`\`\`jsx
import Image from 'next/image';

function OptimizedImage() {
  return (
    <Image
      src="./path/to/image.jpg"
      alt="Description"
      width={800}
      height={600}
      quality={75}
      loading="lazy"
    />
  );
}
\`\`\`

### 2. Code Splitting

\`\`\`jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
\`\`\`

### 3. Caching Strategies

\`\`\`javascript
// Example of implementing caching headers
export async function getStaticProps() {
  return {
    props: {
      data: await fetchData(),
    },
    revalidate: 3600, // Revalidate every hour
  };
}
\`\`\`

## Performance Monitoring

Tools for monitoring performance:

1. **Lighthouse**: Built into Chrome DevTools
2. **WebPageTest**: Detailed performance analysis
3. **Google Analytics**: Real user metrics
4. **New Relic**: Application performance monitoring

## Best Practices

Here are some essential performance optimization practices:

1. **Minimize HTTP Requests**
   - Combine CSS/JS files
   - Use image sprites
   - Enable HTTP/2

2. **Optimize Assets**
   - Compress images
   - Minify code
   - Use CDNs

3. **Implement Caching**
   - Browser caching
   - Service workers
   - CDN caching

4. **Reduce Server Load**
   - Use static generation
   - Implement pagination
   - Optimize database queries

## Conclusion

Performance optimization is an ongoing process. Regular monitoring and optimization can significantly improve your site's performance and user experience.

> **Remember**: Performance optimization is not just about speed; it's about providing the best possible user experience.

Happy optimizing! ⚡ 
```

# src/data/podcasts.js

```js
export const podcasts = [
  {
    title: 'MongoDB Podcast',
    description: 'Join us as we explore the world of MongoDB, from basic concepts to advanced features, and hear from experts in the field.',
    coverImage: '/podcasts/mongodb-podcast.jpg',
    platforms: [
      {
        name: 'Spotify',
        icon: 'spotify',
        url: 'https://open.spotify.com/show/your-podcast-id'
      },
      {
        name: 'Apple Podcasts',
        icon: 'apple',
        url: 'https://podcasts.apple.com/podcast/your-podcast-id'
      },
      {
        name: 'Google Podcasts',
        icon: 'google',
        url: 'https://podcasts.google.com/feed/your-podcast-id'
      }
    ],
    episodes: [
      {
        title: 'Getting Started with MongoDB Atlas',
        description: 'Learn how to set up your first MongoDB Atlas cluster and start building your applications.',
        date: '2024-03-15',
        duration: '25:30',
        videoId: 'your-video-id',
        tags: ['MongoDB', 'Atlas', 'Getting Started']
      },
      {
        title: 'Vector Search in MongoDB',
        description: 'Explore how to implement vector search in MongoDB for AI and machine learning applications.',
        date: '2024-03-10',
        duration: '30:15',
        videoId: 'your-video-id',
        tags: ['Vector Search', 'AI', 'Machine Learning']
      }
    ]
  }
]; 
```

# src/data/projects.js

```js
export const projects = [
  {
    title: 'MongoDB Atlas Deployer',
    description: 'A web application for rapid provisioning and management of MongoDB Atlas clusters for workshops and training events.',
    image: '/images/projects/atlas-deployer.png',
    tags: ['Next.js', 'MongoDB', 'React'],
    demoUrl: 'https://deployer.mongodb.com',
    private: true,
    color: '#05668D', // Lapis Lazuli
  },
  {
    title: 'Design Reviewer',
    description: 'An AI-powered design review system that helps teams maintain consistency and best practices.',
    image: '/images/projects/design-reviewer.png',
    tags: ['AI', 'UX/UI', 'Analytics', 'React','Next.js'],
    demoUrl: 'https://app.mongodbdesign.com',
    private: true,
    color: '#679436', // Asparagus
  },
  {
    title: 'DevRel Planner',
    description: 'A comprehensive planning tool for Developer Relations teams to manage activities and track impact.',
    image: '/images/projects/devrel-planner.png',
    tags: ['React', 'Data Viz', 'Planning'],
    demoUrl: 'https://planner.mongodb.com',
    private: true,
    color: '#427AA1', // UCLA Blue
  },
  {
    title: 'MermaidGPT',
    description: 'Transform your ideas into clear, professional diagrams using natural language and AI.',
    image: '/images/projects/mermaid-gpt.png',
    tags: ['AI', 'Diagrams', 'Documentation'],
    demoUrl: 'https://mermaidgpt.com',
    private: false,
    color: '#05668D',
  },
  {
    title: 'LightningHire',
    description: 'AI-Powered Resume Evaluation System for streamlined hiring processes.',
    image: '/images/projects/lightninghire.png',
    tags: ['AI', 'HR Tech', 'Analytics'],
    demoUrl: 'https://lightninghire.com',
    private: false,
    color: '#679436',
  },
  {
    title: 'MongoDB-RAG',
    description: 'The easiest way to build RAG applications with MongoDB - a lightweight NPM package for vector search and document ingestion.',
    image: '/images/projects/mongodb-rag.png',
    tags: ['MongoDB', 'AI', 'Vector Search'],
    demoUrl: 'https://mongodb.com/rag',
    private: false,
    color: '#427AA1',
  },
  {
    title: 'PDEffer',
    description: 'Document Analysis & PDF Converter with AI-powered analysis capabilities.',
    image: '/images/projects/pdeffer.png',
    tags: ['AI', 'Document Processing', 'PDF'],
    demoUrl: 'https://pdeffer.com',
    private: false,
    color: '#05668D',
  },
  {
    title: 'Sellers Edge',
    description: 'Handle MongoDB Objections with Confidence - AI-powered sales assistant for perfect responses.',
    image: '/images/projects/sellers_edge.png',
    tags: ['AI', 'Sales', 'MongoDB'],
    demoUrl: 'https://mdbse.vercel.app',
    private: true,
    color: '#679436',
  },
  {
    title: 'MongoDBank',
    description: 'An example of MongoDB in the Financial Services Industry',
    image: '/images/projects/mongodbank.png',
    tags: ['AI', 'Sales', 'MongoDB', 'Financial Services'],
    demoUrl: 'https://mongodbank.vercel.app',
    private: false,
    color: '#679436',
  }
]; 
```

# src/data/projects/mongodb-vector-search.md

```md
---
title: 'MongoDB Vector Search'
description: 'A comprehensive exploration of vector search capabilities in MongoDB Atlas, demonstrating semantic search and AI-powered applications.'
date: '2024-03-15'
image: '/projects/vector-search.jpg'
tags: ['MongoDB', 'Vector Search', 'AI', 'Atlas']
technologies: ['MongoDB', 'Atlas', 'Python', 'JavaScript']
demoUrl: 'https://github.com/mrlynn/mongodb-vector-search-demo'
githubUrl: 'https://github.com/mrlynn/mongodb-vector-search-demo'
private: false
---

# MongoDB Vector Search

MongoDB Vector Search enables you to store and query vector embeddings alongside your data, making it perfect for semantic search, recommendations, and AI-powered applications.

## Features

- Semantic search capabilities
- Integration with popular embedding models
- Support for multiple similarity metrics
- Efficient vector indexing
- Real-time vector search queries

## Implementation

The implementation showcases how to:
1. Create and manage vector indexes
2. Generate embeddings from text
3. Perform vector similarity searches
4. Implement hybrid search combining vector and traditional queries
5. Build real-world applications using vector search 
```

# src/data/timeline.js

```js
export const timelineEvents = [
  {
    id: 1,
    date: "2018 - Present",
    title: "Principal Developer Advocate",
    company: "MongoDB",
    description: "Devoted to developer enablement focused on Data Modeling, AI, MongoDB Atlas, and Vector Search. Creating labs, workshops, and training programs for practical technology implementation."
  },
  {
    id: 2,
    date: "2016 - 2018",
    title: "Senior Solutions Architect",
    company: "MongoDB",
    description: "Guided customers in designing scalable systems, led proof of concepts, and developed enablement content for MongoDB's technical teams."
  },
  {
    id: 3,
    date: "2013 - 2015",
    title: "Solutions Consultant",
    company: "Medallia",
    description: "Led teams in Pre-sales and resell partnerships, developed custom solutions and demonstrations across various industries."
  },
  {
    id: 4,
    date: "2010 - 2013",
    title: "Senior Software Consultant",
    company: "BMC Software",
    description: "Led pre-sales consulting team, demonstrated server automation and cloud computing solutions to bridge business and IT."
  },
  {
    id: 5,
    date: "2006 - 2010",
    title: "Engineering Manager",
    company: "Bank of America",
    description: "Led system design and infrastructure integration teams, developed server visibility tools and managed large-scale data center migrations."
  },
  {
    id: 6,
    date: "2000 - 2006",
    title: "Vice President, Head of UNIX Engineering",
    company: "Merrill Lynch",
    description: "Set UNIX/Linux standards and strategic direction, managed engineering teams responsible for platform standards."
  }
]; 
```

# src/data/videos.js

```js
//     thumbnail: "https://yt3.googleusercontent.com/iJotWa4145-hi9Hz5XA5RVu9IRCQRjcNAEBmIpV4CUyGXfE_sq_2sT2RuM05M6GNfNeYBjGO=s900-c-k-c0x00ffffff-no-rj",

export const videos = [
  {
    title: "Introducing MongoDB-RAG",
    thumbnail: `https://img.youtube.com/vi/8PTATSNl1WU/maxresdefault.jpg`,
    videoId: "8PTATSNl1WU",
    platform: "youtube",
    description: "Learn how to build a Retrieval Augmented Generation (RAG) application using MongoDB Atlas Vector Search and LangChain.",
    category: "Tutorial",
    tags: ["MongoDB", "LangChain", "RAG", "Vector Search"]
  },
  {
    title: "Application Driven Analytics - Promo",
    thumbnail: `https://img.youtube.com/vi/PlzYzpEnh3g/maxresdefault.jpg`,
    videoId: "PlzYzpEnh3g",
    platform: "youtube",
    description: "Join us for a thrilling demonstration of application-driven analytics using real launch data from multiple devices generating one million metrics per second.",
    category: "Tutorial",
    tags: ["MongoDB", "Atlas Search", "E-commerce", "Analytics"]
  },
  {
    title: "Exploring Prisma, an open source next-generation ORM | MongoDB Podcast",
    thumbnail: `https://img.youtube.com/vi/Ze1K5CSa3cU/maxresdefault.jpg`,
    videoId: "Ze1K5CSa3cU",
    platform: "youtube",
    description: "Prisma can be used in any Node.js or TypeScript backend application. This can be a REST API, a GraphQL API, a gRPC API, or anything else that needs a database.",
    category: "Podcast",
    tags: ["MongoDB", "Prisma", "Podcast"]
  },
  {
    title: "Swift Heroes Digital 2020 - Swift and MongoDB",
    thumbnail: `https://img.youtube.com/vi/Ebt9MXVU9ek/maxresdefault.jpg`,
    videoId: "Ebt9MXVU9ek",
    platform: "youtube",
    description: "MongoDB is a document database with the scalability and flexibility that developers want with the querying and indexing that they need. Fortunately, MongoDB is now available for Swift developers with variants available as a Core Data replacement as well as a Server-side persistence layer. In this talk, I'll provide an overview of MongoDB and talk about how Swift developers can begin to incorporate MongoDB into their application stack.",
    category: "Conference Talk",
    tags: ["Mobile", "MongoDB", "Swift"]
  },
  {
    title: "Fitbod - A trainer in your pocket",
    thumbnail: "/images/videos/fitbod.png",
    videoId: "7273710351059848490",
    platform: "tiktok",
    description: "A quick overview of Fitbod, the AI-powered personal trainer app that creates personalized workouts based on your available equipment and fitness goals.",
    category: "Product Demo",
    tags: ["Mobile", "AI", "Fitness"]
  },
  ,
  {
    title: "Michael Lynn - MongoDB Keynote",
    thumbnail: "https://img.youtube.com/vi/hSNNXFOxfiQ/maxresdefault.jpg",
    videoId: "hSNNXFOxfiQ?si=RoWZAgf_S-4LvXqg&t=2159",
    platform: "youtube",
    description: "In this MongoDB keynote, Principal Developer Advocate Michael Lynn demonstrates how MongoDB Atlas’s Data Federation simplifies real-time integration of internal data with external sources, enabling businesses to build dynamic, unified data applications.",
    category: "Conference Keynote",
    tags: ["MongoDB", "Data Federation", "Keynote"]
  }
  ,
  {
    title: "MongoDB Data Modeling: Office Hours",
    thumbnail: "https://img.youtube.com/vi/4mejPk9fimM/maxresdefault.jpg",
    videoId: "4mejPk9fimM",
    platform: "youtube",
    description: "🚀 Join us live for a deep dive into the world of MongoDB data modeling! Tune in to Office Hours with Michael Lynn and Jesse Hall where they'll answer the questions users may have while getting started with MongoDB. They’ll also share data modeling insights, tips, and real-world scenarios to enhance your applications. Come prepared with your questions–we have answers!",
    category: "Conference Keynote",
    tags: ["MongoDB", "Data Modeling", "Video"]
  }
  ,
  {
    title: "Harmonizing AI and Atlas Vector Search",
    thumbnail: "https://img.youtube.com/vi/RHzMQr5_VRc/maxresdefault.jpg",
    videoId: "RHzMQr5_VRc",
    platform: "youtube",
    description: "🚀 In this episode of the MongoDB Podcast Live, Michael Lynn teams up with Pavel Duchovny, from MongoDB's Developer Relations, to dive deep into the intersection of AI, music, and data. They're set to explore 'Sync Scout' a project that works at the intersection of AI applications, music search and recommendation. This cutting-edge technology leverages MongoDB's powerful capabilities to transform the way music is associated with scenes and images, offering a glimpse into the future of personalized soundtracks",
    category: "Podcast Keynote",
    tags: ["MongoDB", "Podcast", "AI"]
  }
  ,
  {
    title: "Ep. 202 Unleashing Vector Search: An Exclusive AMA with Benjamin Flast",
    thumbnail: "https://img.youtube.com/vi/n8a5_KXfbGI/maxresdefault.jpg",
    videoId: "n8a5_KXfbGI",
    platform: "youtube",
    description: "🚀 In this captivating episode of the MongoDB Podcast Live, host Michael Lynn engages with Benjamin Flast, a pivotal member of the MongoDB product team. They delve into the intricacies of MongoDB's Vector Search, a cutting-edge feature enhancing the realm of AI and search functionalities. This episode offers a comprehensive Ask Me Anything (AMA) session, where Benjamin addresses a myriad of queries from listeners, shedding light on the nuances of vector search and its integration within MongoDB.",
    category: "Podcast Keynote",
    tags: ["MongoDB", "Podcast", "AI", "AMA"]
  }
]; 

```

# src/lib/blog.js

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
        const { data, content } = matter(source);
        const mdxSource = await serialize(content, {
          mdxOptions: {
            rehypePlugins: [rehypeSlug, rehypePrism],
            remarkPlugins: [remarkGfm],
          },
        });

        return {
          ...data,
          slug: file.replace(/\.mdx$/, ''),
          mdxSource,
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypePrism],
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    ...data,
    slug,
    mdxSource,
  };
}

export function getAllPostSlugs() {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
} 
```

# src/lib/markdown.js

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true }]],
    format: 'mdx',
  },
  parseFrontmatter: true,
};

export async function getAllPosts() {
  try {
    const files = fs.readdirSync(BLOG_DIR);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          try {
            const filePath = path.join(BLOG_DIR, file);
            const source = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(source);
            
            // Validate and format the date
            if (data.date) {
              const date = new Date(data.date);
              if (isNaN(date.getTime())) {
                console.warn(`Invalid date in ${file}: ${data.date}`);
                data.date = new Date().toISOString();
              }
            } else {
              console.warn(`No date found in ${file}`);
              data.date = new Date().toISOString();
            }

            const mdxSource = await serialize(content, {
              ...mdxOptions,
              scope: data,
            });

            return {
              ...data,
              slug: file.replace(/\.mdx$/, ''),
              content: mdxSource,
            };
          } catch (error) {
            console.error(`Error processing file ${file}:`, error);
            return null;
          }
        })
    );

    return posts.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    // Validate and format the date
    if (data.date) {
      const date = new Date(data.date);
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date in ${slug}.mdx: ${data.date}`);
        data.date = new Date().toISOString();
      }
    } else {
      console.warn(`No date found in ${slug}.mdx`);
      data.date = new Date().toISOString();
    }

    const mdxSource = await serialize(content, {
      ...mdxOptions,
      scope: data,
    });

    return {
      ...data,
      slug,
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw error;
  }
} 
```

# src/lib/mdx.ts

```ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
  mdxSource: any;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { content, data } = matter(source);
        const mdxSource = await serialize(content);
        
        return {
          slug: file.replace('.mdx', ''),
          title: data.title,
          date: data.date,
          author: data.author,
          description: data.description,
          image: data.image,
          tags: data.tags,
          content,
          mdxSource,
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(source);
    const mdxSource = await serialize(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      image: data.image,
      tags: data.tags,
      content,
      mdxSource,
    };
  } catch (error) {
    return null;
  }
} 
```

# src/lib/speaking.js

```js
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const speakingDirectory = path.join(process.cwd(), 'content/speaking');

export async function getAllSpeakingEngagements() {
  // Get file names under /speaking
  const fileNames = await fs.readdir(speakingDirectory);
  
  const engagements = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx') && fileName !== 'index.mdx')
      .map(async (fileName) => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, '');

        // Read markdown file as string
        const fullPath = path.join(speakingDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Ensure date is a valid Date object
        const date = new Date(data.date);
        const now = new Date();
        
        // Add isUpcoming flag
        const isUpcoming = date >= now;

        // Serialize the MDX content
        const mdxSource = await serialize(content);

        // Combine the data with the slug and content
        return {
          slug,
          ...data,
          date: date.toISOString(), // Ensure consistent date format
          isUpcoming,
          content: mdxSource
        };
      })
  );

  // Sort engagements by date
  return engagements.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // For upcoming events, sort by nearest future date first
    if (dateA >= new Date() && dateB >= new Date()) {
      return dateA - dateB;
    }
    // For past events, sort by most recent first
    return dateB - dateA;
  });
}

export async function getSpeakingEngagementBySlug(slug) {
  const fullPath = path.join(speakingDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data
  };
} 
```

# src/theme/theme.js

```js
import { createTheme } from '@mui/material/styles';

const theme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#61dafb' : '#0070f3',
      },
      background: {
        default: isDark ? '#0a1929' : '#ffffff',
        paper: isDark ? '#0a1929' : '#ffffff',
        gradient: isDark
          ? 'linear-gradient(45deg,rgb(97, 251, 141) 30%, #0070f3 90%)'
          : 'linear-gradient(45deg,rgb(29, 124, 19) 30%,rgb(97, 251, 141) 90%)',
      },
      text: {
        primary: isDark ? '#ffffff' : '#000000',
        secondary: isDark ? '#b3b3b3' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.2,
        marginBottom: '1.5rem',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        marginBottom: '1.25rem',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '1rem',
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.75rem',
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.5rem',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.5rem',
      },
      body1: {
        fontSize: '1.125rem',
        lineHeight: 1.6,
        marginBottom: '1rem',
      },
      body2: {
        fontSize: '1rem',
        lineHeight: 1.6,
        marginBottom: '0.75rem',
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            body1: 'p',
            body2: 'p',
          },
        },
      },
    },
  });
};

export default theme; 
```

# src/theme/ThemeContext.js

```js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2563eb',
        light: isDarkMode ? '#80e4ff' : '#339af0',
        dark: isDarkMode ? '#0095cc' : '#003580',
      },
      secondary: {
        main: '#679436',
        light: isDarkMode ? '#7dff9b' : '#80e27e',
        dark: isDarkMode ? '#2e7c44' : '#087f23',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
        paper: isDarkMode ? '#1a1a1a' : '#ffffff',
        card: isDarkMode ? '#242424' : '#f8f9fa',
        gradient: isDarkMode 
          ? 'linear-gradient(135deg, #2563eb 0%, #679436 100%)'
          : 'linear-gradient(135deg, #2563eb 0%, #679436 100%)',
        gradientText: isDarkMode
          ? 'linear-gradient(90deg,rgb(9, 139, 61) 30%, #80e4ff 100%)'
          : 'linear-gradient(90deg, #0070f3 30%, #339af0 100%)',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
        secondary: isDarkMode ? '#b3b3b3' : '#666666',
      },
      divider: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.2,
        marginBottom: '1.5rem',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        marginBottom: '1.25rem',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '1rem',
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.75rem',
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.5rem',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.5rem',
      },
      body1: {
        fontSize: '1.125rem',
        lineHeight: 1.6,
        marginBottom: '1rem',
      },
      body2: {
        fontSize: '1rem',
        lineHeight: 1.6,
        marginBottom: '0.75rem',
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            body1: 'p',
            body2: 'p',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--color-calendar-graph-day-bg': isDarkMode ? '#1e1e1e' : '#f8f9fa',
            '--color-calendar-graph-day-L1-bg': isDarkMode ? '#0e4429' : '#9be9a8',
            '--color-calendar-graph-day-L2-bg': isDarkMode ? '#006d32' : '#40c463',
            '--color-calendar-graph-day-L3-bg': isDarkMode ? '#26a641' : '#30a14e',
            '--color-calendar-graph-day-L4-bg': isDarkMode ? '#39d353' : '#216e39',
          },
          body: {
            backgroundColor: isDarkMode ? '#121212' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            transition: 'all 0.2s ease',
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode ? '#404040 #1e1e1e' : '#c1c1c1 #f1f1f1',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDarkMode ? '#1e1e1e' : '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDarkMode ? '#404040' : '#c1c1c1',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: isDarkMode ? '#4a4a4a' : '#a8a8a8',
              },
            },
          },
          'a': {
            color: isDarkMode ? '#61dafb' : '#0070f3',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
          '.MuiPaper-root': {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            transition: 'background-color 0.2s ease',
          },
          '.MuiAppBar-root': {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          },
          '.MuiCard-root': {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            borderColor: isDarkMode ? '#333333' : '#e0e0e0',
          },
          '.MuiButton-root': {
            textTransform: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#242424' : '#ffffff',
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backgroundImage: 'none',
            borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            color: isDarkMode ? '#ffffff' : '#000000',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#000000',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#61dafb' : '#0070f3',
            '&:hover': {
              color: isDarkMode ? '#80e4ff' : '#339af0',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 
```

# src/utils/blog.js

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseISO } from 'date-fns';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getAllPosts() {
  // Ensure the blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, '');

      // Ensure the date is in ISO format
      let date = data.date;
      try {
        // Try to parse the date and convert it to ISO format
        date = parseISO(data.date).toISOString().split('T')[0];
      } catch (error) {
        console.error(`Error parsing date for post ${slug}:`, error);
        // If parsing fails, use the original date string
      }

      return {
        slug,
        ...data,
        date,
        content,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export async function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Ensure the date is in ISO format
  let date = data.date;
  try {
    date = parseISO(data.date).toISOString().split('T')[0];
  } catch (error) {
    console.error(`Error parsing date for post ${slug}:`, error);
  }

  return {
    slug,
    ...data,
    date,
    content,
  };
} 
```

# src/utils/mdx.js

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

const MDX_COMPONENTS_DIR = path.join(process.cwd(), 'src/components/mdx/includes');

// Function to process MDX includes
function processMDXIncludes(content, filePath) {
  // Regular expression to match include statements
  const includeRegex = /import\s+(\w+)\s+from\s+'@includes\/([^']+)'/g;
  
  let processedContent = content;
  let match;

  while ((match = includeRegex.exec(content)) !== null) {
    const [fullMatch, componentName, includePath] = match;
    
    // Resolve the include path relative to the MDX components directory
    const absoluteIncludePath = path.join(MDX_COMPONENTS_DIR, includePath);
    
    try {
      // Read the included file
      const includeContent = fs.readFileSync(absoluteIncludePath, 'utf8');
      
      // Replace the import statement with the actual content
      processedContent = processedContent.replace(
        fullMatch,
        `\n\n${includeContent}\n\n`
      );
    } catch (error) {
      console.error(`Error processing include ${includePath}:`, error);
      // Keep the original import statement if there's an error
      processedContent = processedContent.replace(
        fullMatch,
        `\n\n<!-- Error: Could not include ${includePath} -->\n\n`
      );
    }
  }

  return processedContent;
}

// Function to get MDX content with component support
export async function getMDXContent(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    console.log('Attempting to read file:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log('File contents loaded, length:', fileContents.length);
    
    // Process includes before parsing frontmatter
    const processedContent = processMDXIncludes(fileContents, fullPath);
    
    // Parse frontmatter and content
    const { data, content } = matter(processedContent);
    console.log('Frontmatter parsed:', data);
    
    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true }]],
        format: 'mdx',
      },
      parseFrontmatter: true,
    });

    console.log('MDX content serialized successfully');
    console.log('Content type:', typeof mdxSource);
    console.log('Content preview:', mdxSource.substring(0, 100));

    return {
      frontmatter: data,
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Error processing MDX file ${filePath}:`, error);
    console.error('Error stack:', error.stack);
    return null;
  }
}

// Function to get all MDX files from a directory
export async function getAllMDXFiles(directory) {
  try {
    const fullPath = path.join(process.cwd(), directory);
    console.log('Reading directory:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Directory not found: ${fullPath}`);
      return [];
    }

    const files = fs.readdirSync(fullPath);
    console.log('Found files:', files);
    
    const mdxFiles = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(directory, file);
          const result = await getMDXContent(filePath);
          
          if (!result) {
            return null;
          }

          return {
            ...result.frontmatter,
            slug: file.replace(/\.mdx$/, ''),
            content: result.content,
          };
        })
    );

    return mdxFiles.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error(`Error getting MDX files from ${directory}:`, error);
    return [];
  }
} 
```

# src/utils/projects.js

```js
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { parseISO } from 'date-fns';

const projectsDirectory = join(process.cwd(), 'content/projects');

export async function getAllProjects() {
  const fileNames = readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // Remove ".mdx" from file name to get id
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = join(projectsDirectory, fileName);
      const fileContents = readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        ...data,
        date: data.date ? parseISO(data.date) : new Date(),
        content
      };
    });

  // Sort projects by date
  return allProjectsData.sort((a, b) => b.date - a.date);
}

export async function getProjectBySlug(slug) {
  const filePath = join(projectsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content
    };
  } catch (error) {
    return null;
  }
}

export function getAllProjectSlugs() {
  const files = readdirSync(projectsDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
} 
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

