'use client';

import React, { useState, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress, 
  Alert,
  Snackbar,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendIcon from '@mui/icons-material/Send';
import MermaidDiagram from './MermaidDiagram';

const DiagramGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mermaidCode, setMermaidCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [diagramType, setDiagramType] = useState('auto');
  const promptRef = useRef(null);
  const diagramRef = useRef(null);

  // List of diagram types for the dropdown
  const diagramTypes = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'flowchart', label: 'Flowchart' },
    { value: 'sequenceDiagram', label: 'Sequence Diagram' },
    { value: 'classDiagram', label: 'Class Diagram' },
    { value: 'erDiagram', label: 'Entity Relationship' },
    { value: 'gantt', label: 'Gantt Chart' },
    { value: 'stateDiagram', label: 'State Diagram' },
    { value: 'pie', label: 'Pie Chart' }
  ];

  const generateDiagram = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description of the diagram you want to create.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          diagramType: diagramType === 'auto' ? null : diagramType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate diagram');
      }

      const data = await response.json();
      setMermaidCode(data.mermaidCode);
    } catch (err) {
      console.error('Error generating diagram:', err);
      setError(err.message || 'Failed to generate diagram. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      generateDiagram();
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mermaidCode);
    setSnackbarMessage('Mermaid code copied to clipboard!');
    setSnackbarOpen(true);
  };

  const handleRegenerateClick = () => {
    generateDiagram();
  };

  const handleClearClick = () => {
    setPrompt('');
    setMermaidCode('');
    setError(null);
    promptRef.current?.focus();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDiagramTypeChange = (event) => {
    setDiagramType(event.target.value);
  };

  // Function to download the diagram as SVG
  const downloadAsSVG = () => {
    if (!diagramRef.current) return;
    
    // Find the SVG element within the diagram container
    const svgElement = diagramRef.current.querySelector('svg');
    if (!svgElement) {
      setError('Could not find SVG element to download');
      return;
    }
    
    // Get the SVG content
    const svgContent = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    
    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSnackbarMessage('Diagram downloaded as SVG');
    setSnackbarOpen(true);
  };

  // Function to capture the diagram as PNG
  const captureAsPNG = async () => {
    if (!diagramRef.current) return;
    
    try {
      // Dynamically import html-to-image for client-side only
      const htmlToImage = await import('html-to-image');
      
      // Create a PNG from the diagram container
      const dataUrl = await htmlToImage.toPng(diagramRef.current, { 
        quality: 0.95,
        backgroundColor: 'white'
      });
      
      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'diagram.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSnackbarMessage('Diagram downloaded as PNG');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error capturing diagram as PNG:', error);
      setError('Failed to download diagram as PNG');
    }
  };

  // Example prompts for inspiration
  const examplePrompts = [
    "A flowchart showing the user authentication process with login, registration, and password reset paths",
    "A sequence diagram of an e-commerce checkout process from cart to order confirmation",
    "An entity relationship diagram for a blog database with users, posts, comments, and categories",
    "A state diagram showing the lifecycle of a support ticket from creation to resolution",
    "A gantt chart for a software development project with design, development, testing, and deployment phases"
  ];

  const placeholderText = 
    "Describe the diagram you want to create in detail.\n\nFor example:\n" +
    "• A flowchart showing user authentication with login and signup paths\n" +
    "• A sequence diagram for checkout process in an e-commerce app\n" +
    "• An entity relationship diagram for a blog database\n\n" +
    "Press Ctrl+Enter to generate";

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          AI Diagram Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Describe the diagram you want to create, and AI will generate a Mermaid diagram for you.
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="diagram-type-label">Diagram Type</InputLabel>
          <Select
            labelId="diagram-type-label"
            id="diagram-type"
            value={diagramType}
            label="Diagram Type"
            onChange={handleDiagramTypeChange}
          >
            {diagramTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Diagram Description"
          placeholder={placeholderText}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={promptRef}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Example prompts:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {examplePrompts.map((examplePrompt, index) => (
              <Chip
                key={index}
                label={examplePrompt.substring(0, 35) + '...'}
                onClick={() => setPrompt(examplePrompt)}
                variant="outlined"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            disabled={loading || !prompt.trim()}
            onClick={generateDiagram}
          >
            Generate Diagram
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {mermaidCode && !loading && (
          <Box sx={{ mt: 4 }} id="result-container">
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Generated Diagram
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={handleRegenerateClick}
                  variant="outlined"
                >
                  Regenerate
                </Button>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyCode}
                  variant="outlined"
                >
                  Copy Code
                </Button>
                <Button
                  size="small"
                  startIcon={<DownloadIcon />}
                  onClick={downloadAsSVG}
                  variant="outlined"
                >
                  Download SVG
                </Button>
                <Button
                  size="small"
                  startIcon={<PhotoCameraIcon />}
                  onClick={captureAsPNG}
                  variant="outlined"
                >
                  Download PNG
                </Button>
              </Stack>
            </Box>

            <Box ref={diagramRef} sx={{ backgroundColor: 'white', p: 2, borderRadius: 1 }}>
              <MermaidDiagram chart={mermaidCode} />
            </Box>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mt: 3,
                borderRadius: 1,
                position: 'relative',
                '&:hover .copy-button': {
                  opacity: 1,
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" component="div" sx={{ fontWeight: 'bold' }}>
                  Mermaid Code
                </Typography>
                <IconButton
                  className="copy-button"
                  size="small"
                  onClick={handleCopyCode}
                  sx={{
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box
                component="pre"
                sx={{
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'background.default',
                  overflow: 'auto',
                  fontSize: '0.8rem',
                  maxHeight: '200px',
                }}
              >
                <code>{mermaidCode}</code>
              </Box>
            </Paper>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default DiagramGenerator;