'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import Mermaid from './Mermaid';

export default function DiagramGenerator() {
  const [prompt, setPrompt] = useState('');
  const [diagramType, setDiagramType] = useState('flowchart');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');
  const [remainingRequests, setRemainingRequests] = useState(10);
  const [resetTime, setResetTime] = useState(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch('/api/generate-diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, diagramType }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setError(`Rate limit exceeded. Please try again in ${Math.ceil(data.remainingTime / 1000)} seconds.`);
          setRemainingRequests(0);
          setResetTime(data.resetTime);
          return;
        }
        throw new Error(data.error || 'Failed to generate diagram');
      }

      setMermaidCode(data.mermaidCode);
      setRemainingRequests(data.remainingRequests);
      setResetTime(data.resetTime);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update remaining requests countdown
  useEffect(() => {
    if (resetTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        if (now >= resetTime) {
          setRemainingRequests(10);
          setResetTime(null);
        } else {
          setRemainingRequests(Math.ceil((resetTime - now) / 60000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resetTime]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          AI Diagram Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Remaining requests: {remainingRequests}
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Diagram Type</InputLabel>
          <Select
            value={diagramType}
            label="Diagram Type"
            onChange={(e) => setDiagramType(e.target.value)}
          >
            <MenuItem value="flowchart">Flowchart</MenuItem>
            <MenuItem value="sequence">Sequence Diagram</MenuItem>
            <MenuItem value="class">Class Diagram</MenuItem>
            <MenuItem value="er">Entity Relationship</MenuItem>
            <MenuItem value="gantt">Gantt Chart</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Describe your diagram"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading || !prompt || remainingRequests === 0}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Generate Diagram
        </Button>
      </Paper>

      {mermaidCode && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Diagram
          </Typography>
          <Mermaid chart={mermaidCode} />
        </Paper>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Diagram generated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
} 