# Integrating MongoDB ERD Generator

## Overview
The MongoDB ERD Generator is a tool that automatically generates Entity Relationship Diagrams from MongoDB databases. This document explains how to integrate it into your Next.js portfolio site.

## Required Files

### 1. Core Library Files
Create these files in your `src/lib` directory:

```javascript
// src/lib/mongoIntrospector.js
// Handles MongoDB database introspection and relationship detection
```

```javascript
// src/lib/mermaidGenerator.js
// Converts MongoDB metadata into Mermaid diagram syntax
```

### 2. API Route
Add this to your existing API routes:

```javascript
// src/app/api/generate-diagram/route.js
import { NextResponse } from 'next/server';
import { introspectDatabase } from '../../../lib/mongoIntrospector';

export async function POST(request) {
  try {
    const { uri, dbName } = await request.json();
    
    if (!uri || !dbName) {
      return NextResponse.json(
        { error: 'MongoDB URI and database name are required' },
        { status: 400 }
      );
    }
    
    const metadata = await introspectDatabase(uri, dbName);
    return NextResponse.json({ metadata });
  } catch (error) {
    console.error('Introspection error:', error);
    return NextResponse.json(
      { error: 'Failed to introspect database' },
      { status: 500 }
    );
  }
}
```

### 3. React Component
Add this to your components:

```javascript
// src/components/DiagramGenerator.js
'use client';

import { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Paper, 
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import mermaid from 'mermaid';
import { generateMermaidDiagram } from '../lib/mermaidGenerator';

// Initialize mermaid
mermaid.initialize({ 
  startOnLoad: true,
  theme: 'default',
  er: {
    useMaxWidth: true,
    titleTopMargin: 25,
    diagramPadding: 15
  }
});

export default function DiagramGenerator() {
  const [uri, setUri] = useState('');
  const [dbName, setDbName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [diagram, setDiagram] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDiagram('');

    try {
      const response = await fetch('/api/generate-diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri, dbName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to introspect database');
      }

      const mermaidCode = generateMermaidDiagram(data.metadata);
      setDiagram(mermaidCode);
      
      // Re-render the diagram
      const element = document.querySelector("#erd-diagram");
      if (element) {
        element.removeAttribute("data-processed");
        await mermaid.init(undefined, element);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom>
          MongoDB ERD Generator
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="MongoDB URI"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            margin="normal"
            required
            type="password"
          />
          
          <TextField
            fullWidth
            label="Database Name"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
            margin="normal"
            required
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate ERD'}
          </Button>
        </form>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {diagram && (
          <Box sx={{ mt: 4, overflowX: 'auto' }}>
            <div className="mermaid" id="erd-diagram">
              {diagram}
            </div>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
```

### 4. Page Component
Add a new page to your site:

```javascript
// src/app/tools/generate-diagram/page.js
import DiagramGenerator from '../../../components/DiagramGenerator';
import PageHeader from '../../../components/PageHeader';

export default function GenerateDiagramPage() {
  return (
    <>
      <PageHeader 
        title="MongoDB ERD Generator" 
        description="Generate Entity Relationship Diagrams from MongoDB databases"
      />
      <DiagramGenerator />
    </>
  );
}
```

## Dependencies
Add these to your `package.json`:

```json
{
  "dependencies": {
    "mermaid": "^11.6.0",
    "mongodb": "^6.15.0"
  }
}
```

## Integration Steps

1. **Copy Core Files**
   - Copy `mongoIntrospector.js` and `mermaidGenerator.js` to your `src/lib` directory
   - These files handle the core functionality of database introspection and diagram generation

2. **Add API Route**
   - Add the `generate-diagram` API route to handle database connections
   - This provides a secure way to connect to MongoDB databases

3. **Add Component**
   - Add the `DiagramGenerator` component to your components directory
   - This provides the user interface for the ERD generator

4. **Create Page**
   - Add the page component to make the tool accessible in your portfolio
   - The tool will be available at `/tools/generate-diagram`

5. **Update Navigation**
   - Add a link to the ERD generator in your site navigation
   - Consider adding it under a "Tools" section

## Security Considerations

1. **Database Connection**
   - The MongoDB URI is treated as a password field to prevent exposure
   - Consider adding rate limiting to the API route
   - Add appropriate CORS settings

2. **Error Handling**
   - All database errors are caught and displayed user-friendly messages
   - Connection timeouts are handled gracefully

## Usage

1. Navigate to `/tools/generate-diagram`
2. Enter your MongoDB connection string
3. Enter your database name
4. Click "Generate ERD"
5. The diagram will be generated and displayed using Mermaid

## Customization

You can customize the appearance of the ERD by:

1. Modifying the Mermaid initialization options in `DiagramGenerator.js`
2. Adjusting the Material UI styling in the component
3. Updating the relationship detection logic in `mongoIntrospector.js`
4. Modifying the diagram generation in `mermaidGenerator.js`

## Next Steps

1. Add the tool to your projects section
2. Create a blog post about the tool
3. Add analytics to track usage
4. Consider adding features like:
   - Diagram export
   - Custom styling options
   - Saved diagrams
   - Multiple database support 