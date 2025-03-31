'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import * as htmlToImage from 'html-to-image';

const DiagramContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
  opacity: 0,
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 1,
  },
}));

const MermaidDiagram = ({ chart, title, caption }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [diagramSvg, setDiagramSvg] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Load mermaid dynamically
    const loadMermaid = async () => {
      try {
        setLoading(true);
        console.log('Loading Mermaid with chart:', chart);
        
        // Import mermaid dynamically
        const mermaid = (await import('mermaid')).default;
        
        // Initialize mermaid with configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
          securityLevel: 'loose',
          fontSize: 16,
          fontFamily: '"Inter", sans-serif',
          er: {
            diagramPadding: 20,
            layoutDirection: 'TB',
            minEntityWidth: 100,
            minEntityHeight: 75,
            entityPadding: 15,
            stroke: '#666',
            fill: '#f9f9f9'
          }
        });
        
        // Generate the SVG for the diagram
        const { svg } = await mermaid.render(`mermaid-diagram-${Math.random().toString(36).substr(2, 9)}`, chart);
        console.log('Generated SVG:', svg);
        setDiagramSvg(svg);
        setLoading(false);
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        console.error('Chart that caused error:', chart);
        setError(`Error rendering diagram: ${err.message}`);
        setLoading(false);
      }
    };
    
    // Add a small delay before loading Mermaid
    const timer = setTimeout(() => {
      loadMermaid();
    }, 100);

    // Cleanup function to clear the timeout if the component unmounts or chart changes
    return () => clearTimeout(timer);
  }, [chart]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(chart);
    setSnackbarMessage('Mermaid code copied to clipboard!');
    setSnackbarOpen(true);
  };

  const handleDownloadSVG = () => {
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = async () => {
    if (!containerRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(containerRef.current, {
        quality: 0.95,
        backgroundColor: 'white',
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left',
        },
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'diagram.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error capturing diagram as PNG:', error);
      setError('Failed to download diagram as PNG');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <DiagramContainer elevation={1}>
      {title && (
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Box ref={containerRef} sx={{ minHeight: 100, position: 'relative' }}>
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
          <>
            <ActionButtons>
              <Tooltip title="Copy Mermaid Code">
                <IconButton onClick={handleCopyCode} size="small">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download as SVG">
                <IconButton onClick={handleDownloadSVG} size="small">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download as PNG">
                <IconButton onClick={handleDownloadPNG} size="small">
                  <PhotoCameraIcon />
                </IconButton>
              </Tooltip>
            </ActionButtons>
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
          </>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </DiagramContainer>
  );
};

export default MermaidDiagram;