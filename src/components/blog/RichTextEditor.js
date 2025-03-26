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