'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const DiagramContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const MermaidDiagram = ({ chart, title, caption }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [diagramSvg, setDiagramSvg] = useState('');

  useEffect(() => {
    // Load mermaid dynamically
    const loadMermaid = async () => {
      try {
        setLoading(true);
        
        // Import mermaid dynamically
        const mermaid = (await import('mermaid')).default;
        
        // Initialize mermaid with configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
          securityLevel: 'loose', // Adjust as needed
          fontSize: 16,
          fontFamily: '"Inter", sans-serif',
        });
        
        // Generate the SVG for the diagram
        const { svg } = await mermaid.render(`mermaid-diagram-${Math.random().toString(36).substr(2, 9)}`, chart);
        setDiagramSvg(svg);
        setLoading(false);
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        setError(`Error rendering diagram: ${err.message}`);
        setLoading(false);
      }
    };
    
    loadMermaid();
  }, [chart]);

  return (
    <DiagramContainer elevation={1}>
      {title && (
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Box ref={containerRef} sx={{ minHeight: 100 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Box sx={{ 
            p: 2, 
            border: '1px solid',
            borderColor: 'error.main',
            color: 'error.main',
            borderRadius: 1,
            backgroundColor: 'error.light',
            opacity: 0.7
          }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {error}
              {'\n\n'}
              <Typography variant="caption" component="div" sx={{ mt: 1 }}>
                Check the Mermaid syntax in your diagram code
              </Typography>
            </Typography>
          </Box>
        ) : (
          <Box 
            sx={{ 
              '& svg': { 
                maxWidth: '100%',
                height: 'auto'
              },
              textAlign: 'center'
            }}
            dangerouslySetInnerHTML={{ __html: diagramSvg }} 
          />
        )}
      </Box>
      
      {caption && (
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'center', 
            mt: 2,
            color: 'text.secondary'
          }}
        >
          {caption}
        </Typography>
      )}
    </DiagramContainer>
  );
};

export default MermaidDiagram;