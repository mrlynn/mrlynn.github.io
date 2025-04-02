'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import MermaidDiagram from '../mdx/includes/MermaidDiagram';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`introspect-tabpanel-${index}`}
      aria-labelledby={`introspect-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MongoDBIntrospector() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mermaidCode, setMermaidCode] = useState('');
  
  // Single database analysis state
  const [uri, setUri] = useState('');
  const [dbName, setDbName] = useState('');
  const [collection, setCollection] = useState('');
  
  // Database comparison state
  const [uri1, setUri1] = useState('');
  const [db1, setDb1] = useState('');
  const [uri2, setUri2] = useState('');
  const [db2, setDb2] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(null);
    setMermaidCode('');
  };

  const handleIntrospect = async () => {
    setLoading(true);
    setError(null);
    setMermaidCode('');

    try {
      const response = await fetch('/api/introspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'introspect',
          uri,
          dbName,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setMermaidCode(data.mermaidCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    setMermaidCode('');

    try {
      const response = await fetch('/api/introspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'compare',
          uri1,
          db1,
          uri2,
          db2,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setMermaidCode(data.mermaidCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = async () => {
    if (!collection) {
      setError('Please enter a collection name');
      return;
    }

    setLoading(true);
    setError(null);
    setMermaidCode('');

    try {
      const response = await fetch('/api/introspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'focus',
          uri,
          dbName,
          collection,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setMermaidCode(data.mermaidCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="introspection options"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Analyze Database" />
        <Tab label="Compare Databases" />
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Database Connection
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="MongoDB URI"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                type="password"
                required
              />
              <TextField
                fullWidth
                label="Database Name"
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Collection Name (optional)"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                helperText="Leave empty to analyze all collections"
              />
              <Box>
                <Button
                  variant="contained"
                  onClick={collection ? handleFocus : handleIntrospect}
                  disabled={loading || !uri || !dbName}
                >
                  {loading ? <CircularProgress size={24} /> : 'Analyze Schema'}
                </Button>
              </Box>
            </Stack>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Stack>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              First Database
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="MongoDB URI"
                value={uri1}
                onChange={(e) => setUri1(e.target.value)}
                type="password"
                required
              />
              <TextField
                fullWidth
                label="Database Name"
                value={db1}
                onChange={(e) => setDb1(e.target.value)}
                required
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              Second Database
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="MongoDB URI"
                value={uri2}
                onChange={(e) => setUri2(e.target.value)}
                type="password"
                required
              />
              <TextField
                fullWidth
                label="Database Name"
                value={db2}
                onChange={(e) => setDb2(e.target.value)}
                required
              />
            </Stack>
          </Box>

          <Box>
            <Button
              variant="contained"
              onClick={handleCompare}
              disabled={loading || !uri1 || !db1 || !uri2 || !db2}
            >
              {loading ? <CircularProgress size={24} /> : 'Compare Schemas'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Stack>
      </TabPanel>

      {mermaidCode && (
        <Box sx={{ p: 3, mt: 2, bgcolor: 'background.default' }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <MermaidDiagram chart={mermaidCode} />
          </Paper>
        </Box>
      )}
    </Paper>
  );
} 