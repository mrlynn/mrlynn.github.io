'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
  Stack,
  TextField,
  Paper,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  ContentPaste as ContentPasteIcon,
  Check as CheckIcon,
  OpenInNew as OpenInNewIcon,
  Send as SendIcon,
  AutoAwesome as AutoAwesomeIcon,
  SmartToy as SmartToyIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { personalInfo, generateUserFacingPrompt } from '../data/personalInfo';

const MotionBox = motion(Box);

const MAX_INPUT_LENGTH = 500;

const LLM_TARGETS = [
  { name: 'ChatGPT', url: 'https://chat.openai.com', color: '#10a37f' },
  { name: 'Claude', url: 'https://claude.ai', color: '#d97757' },
  { name: 'Gemini', url: 'https://gemini.google.com', color: '#4285f4' },
  { name: 'Perplexity', url: 'https://perplexity.ai', color: '#7c3aed' },
];

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: `Hey! I'm an AI assistant that knows about **Michael Lynn** — his career, projects, and technical expertise. What would you like to know?`,
};

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / insecure contexts
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

function TypingIndicator({ isDark }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, p: 1 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: isDark ? 'rgba(0, 237, 100, 0.6)' : '#10b981',
          }}
        />
      ))}
    </Box>
  );
}

function MarkdownMessage({ content, isDark, theme }) {
  return (
    <Box
      sx={{
        fontSize: '0.85rem',
        color: theme.palette.text.primary,
        lineHeight: 1.7,
        '& p': { m: 0, mb: 1, '&:last-child': { mb: 0 } },
        '& ul, & ol': { m: 0, mb: 1, pl: 2.5, '&:last-child': { mb: 0 } },
        '& li': { mb: 0.3 },
        '& strong': { fontWeight: 600 },
        '& code': {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.8rem',
          px: 0.7,
          py: 0.2,
          borderRadius: 0.5,
          background: isDark ? 'rgba(0, 237, 100, 0.1)' : 'rgba(16, 185, 129, 0.08)',
        },
        '& a': {
          color: isDark ? '#00ED64' : '#10b981',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        },
        '& pre': {
          background: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(16, 185, 129, 0.04)',
          borderRadius: 1,
          p: 1.5,
          overflow: 'auto',
          '& code': { px: 0, py: 0, background: 'none' },
        },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
}

function QuickLaunchTab({ isDark, theme }) {
  const [copied, setCopied] = useState(false);
  const [clickedLLM, setClickedLLM] = useState(null);
  const prompt = generateUserFacingPrompt();

  const handleCopy = async () => {
    const success = await copyToClipboard(prompt);
    if (success) {
      setCopied(true);
      setClickedLLM(null);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenLLM = async (llm) => {
    await copyToClipboard(prompt);
    setCopied(true);
    setClickedLLM(llm.name);
    setTimeout(() => {
      setCopied(false);
      setClickedLLM(null);
    }, 4000);
    window.open(llm.url, '_blank');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Prompt preview — the main content */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
          This prompt tells an AI about Michael — copy it or send it directly:
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy prompt'}>
          <Button
            size="small"
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            onClick={handleCopy}
            sx={{
              color: copied ? '#10b981' : theme.palette.text.secondary,
              textTransform: 'none',
              fontSize: '0.8rem',
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </Tooltip>
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(16, 185, 129, 0.03)',
          border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)'}`,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.75rem',
          color: theme.palette.text.secondary,
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          maxHeight: 280,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)',
            borderRadius: 4,
          },
        }}
      >
        {prompt}
      </Box>

      {/* Suggested questions to try */}
      <Box sx={{ mt: 2, mb: 2.5 }}>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem', mb: 1, opacity: 0.7 }}>
          Try asking:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {personalInfo.suggestedQuestions.map((q) => (
            <Chip
              key={q}
              label={q}
              size="small"
              sx={{
                background: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)',
                color: theme.palette.text.secondary,
                border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'}`,
                fontSize: '0.72rem',
                cursor: 'default',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Compact LLM launch row */}
      <Divider sx={{ borderColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.05)', mb: 2 }} />

      {/* Copied confirmation */}
      {copied && (
        <MotionBox
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1.5,
            px: 1.5,
            py: 0.75,
            borderRadius: 1.5,
            background: isDark ? 'rgba(0, 237, 100, 0.1)' : 'rgba(16, 185, 129, 0.07)',
            border: `1px solid ${isDark ? 'rgba(0, 237, 100, 0.2)' : 'rgba(16, 185, 129, 0.15)'}`,
          }}
        >
          <CheckIcon sx={{ fontSize: 14, color: isDark ? '#00ED64' : '#10b981' }} />
          <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.primary, fontWeight: 500 }}>
            Prompt copied!
          </Typography>
          {clickedLLM && (
            <Typography sx={{ fontSize: '0.72rem', color: theme.palette.text.secondary }}>
              Paste into {clickedLLM} with Cmd+V / Ctrl+V
            </Typography>
          )}
        </MotionBox>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem', mr: 0.5 }}>
          Open in:
        </Typography>
        {LLM_TARGETS.map((llm) => (
          <Chip
            key={llm.name}
            label={llm.name}
            size="small"
            icon={<OpenInNewIcon sx={{ fontSize: '13px !important' }} />}
            onClick={() => handleOpenLLM(llm)}
            sx={{
              height: 28,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: llm.color,
              background: `${llm.color}11`,
              border: `1px solid ${llm.color}33`,
              cursor: 'pointer',
              transition: 'all 0.15s',
              '& .MuiChip-icon': { color: llm.color, ml: 0.5 },
              '&:hover': {
                background: `${llm.color}22`,
                borderColor: `${llm.color}55`,
                transform: 'translateY(-1px)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

function ChatTab({ isDark, theme }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remainingRequests, setRemainingRequests] = useState(null);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = useCallback(async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    // Filter out welcome message from API payload (it's display-only)
    const conversationHistory = messages.filter(
      (m) => m !== WELCOME_MESSAGE
    );
    const apiMessages = [...conversationHistory, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    // Abort any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, stream: true }),
        signal: abortControllerRef.current.signal,
      });

      // Check remaining requests header
      const remaining = res.headers.get('X-Remaining-Requests');
      if (remaining !== null) {
        setRemainingRequests(parseInt(remaining, 10));
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      // Stream the response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      // Add empty assistant message to fill via streaming
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const data = trimmed.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              fullContent += parsed.content;
              const snapshot = fullContent;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: snapshot,
                };
                return updated;
              });
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError('Failed to connect. Please try again.');
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (question) => {
    sendMessage(question);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_INPUT_LENGTH) {
      setInput(value);
    }
  };

  const showSuggestions = messages.length <= 1; // Only welcome message

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: { xs: 450, md: 500 } }}>
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          pr: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)',
            borderRadius: 4,
          },
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 1.5,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                maxWidth: '80%',
                borderRadius: 2,
                backgroundImage: 'none',
                ...(msg.role === 'user'
                  ? {
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0, 237, 100, 0.15))'
                        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(0, 237, 100, 0.08))',
                      border: `1px solid ${isDark ? 'rgba(0, 237, 100, 0.2)' : 'rgba(16, 185, 129, 0.15)'}`,
                    }
                  : {
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(16, 185, 129, 0.03)',
                      border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)'}`,
                    }),
              }}
            >
              {msg.role === 'assistant' ? (
                <MarkdownMessage content={msg.content} isDark={isDark} theme={theme} />
              ) : (
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: theme.palette.text.primary,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.content}
                </Typography>
              )}
            </Paper>
          </Box>
        ))}

        {/* Suggestion chips below welcome message */}
        {showSuggestions && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 1, mb: 2 }}>
            {personalInfo.suggestedQuestions.slice(0, 4).map((q) => (
              <Chip
                key={q}
                label={q}
                size="small"
                onClick={() => handleSuggestionClick(q)}
                sx={{
                  background: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)',
                  color: theme.palette.text.secondary,
                  border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'}`,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': {
                    background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundImage: 'none',
                background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(16, 185, 129, 0.03)',
                border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)'}`,
              }}
            >
              <TypingIndicator isDark={isDark} />
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Error Display */}
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ mb: 1.5, fontSize: '0.8rem' }}
        >
          {error}
        </Alert>
      )}

      {/* Input Area */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Ask about Michael's experience, projects, or expertise..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          size="small"
          slotProps={{
            htmlInput: { maxLength: MAX_INPUT_LENGTH },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '0.85rem',
              borderRadius: 2,
              height: 40,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(16, 185, 129, 0.02)',
              '& fieldset': {
                borderColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)',
              },
              '&:hover fieldset': {
                borderColor: isDark ? 'rgba(0, 237, 100, 0.3)' : 'rgba(16, 185, 129, 0.25)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#10b981',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          sx={{
            minWidth: 44,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            '&:hover': {
              background: 'linear-gradient(135deg, #059669, #047857)',
            },
            '&.Mui-disabled': {
              background: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)',
            },
          }}
        >
          {loading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <SendIcon sx={{ fontSize: 18 }} />}
        </Button>
      </Box>

      {/* Character count + rate limit */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        {input.length > MAX_INPUT_LENGTH * 0.8 ? (
          <Typography
            sx={{
              fontSize: '0.68rem',
              color: input.length >= MAX_INPUT_LENGTH ? '#ef4444' : theme.palette.text.secondary,
              opacity: 0.7,
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {input.length}/{MAX_INPUT_LENGTH}
          </Typography>
        ) : (
          <span />
        )}
        {remainingRequests !== null && (
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.68rem', opacity: 0.5, fontFamily: '"JetBrains Mono", monospace' }}>
            {remainingRequests} messages remaining
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default function TalkToMyAI({ variant = 'full' }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeTab, setActiveTab] = useState(0);

  // Teaser variant for homepage
  if (variant === 'teaser') {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            backgroundImage: 'none',
            background: isDark
              ? 'rgba(16, 185, 129, 0.04)'
              : 'rgba(16, 185, 129, 0.03)',
            border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)'}`,
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: isDark ? 'rgba(0, 237, 100, 0.25)' : 'rgba(16, 185, 129, 0.2)',
              boxShadow: isDark ? '0 0 20px rgba(0, 237, 100, 0.08)' : '0 4px 20px rgba(16, 185, 129, 0.08)',
            },
          }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AutoAwesomeIcon sx={{ fontSize: 16, color: isDark ? '#00ED64' : '#10b981' }} />
            <Typography
              sx={{
                fontSize: '0.7rem',
                color: isDark ? 'rgba(0, 237, 100, 0.8)' : '#10b981',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 500,
              }}
            >
              AI-Powered
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1.5,
            }}
          >
            Want to know more? Ask my AI.
          </Typography>

          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.9rem',
              mb: 3,
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            Chat with an AI that knows about my career, projects, and expertise — or copy a prompt to use with your favorite LLM.
          </Typography>

          {/* Sample question chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3 }}>
            {personalInfo.suggestedQuestions.slice(0, 3).map((q) => (
              <Chip
                key={q}
                label={q}
                size="small"
                sx={{
                  background: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)',
                  color: theme.palette.text.secondary,
                  border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'}`,
                  fontSize: '0.72rem',
                }}
              />
            ))}
          </Box>

          <Button
            component={Link}
            href="/ask-ai"
            variant="contained"
            endIcon={<AutoAwesomeIcon />}
            sx={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              textTransform: 'none',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              px: 4,
              py: 1.2,
              borderRadius: 2,
              '&:hover': {
                background: 'linear-gradient(135deg, #059669, #047857)',
                transform: 'translateY(-2px)',
                boxShadow: isDark ? '0 0 20px rgba(0, 237, 100, 0.2)' : '0 4px 12px rgba(16, 185, 129, 0.3)',
              },
            }}
          >
            Talk to My AI
          </Button>
        </Paper>
      </MotionBox>
    );
  }

  // Full variant for /ask-ai page
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          backgroundImage: 'none',
          background: isDark
            ? 'rgba(16, 185, 129, 0.04)'
            : 'rgba(16, 185, 129, 0.02)',
          border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)'}`,
          overflow: 'hidden',
        }}
      >
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            px: 3,
            pt: 2,
            '& .MuiTab-root': {
              color: theme.palette.text.secondary,
              textTransform: 'none',
              fontSize: '0.875rem',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 500,
              '&.Mui-selected': { color: theme.palette.text.primary },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: isDark ? '#00ED64' : '#10b981',
            },
          }}
        >
          <Tab label="Quick Launch" icon={<OpenInNewIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
          <Tab label="Chat" icon={<SmartToyIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
        </Tabs>

        <Divider sx={{ borderColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)' }} />

        {activeTab === 0 && <QuickLaunchTab isDark={isDark} theme={theme} />}
        {activeTab === 1 && <ChatTab isDark={isDark} theme={theme} />}
      </Paper>

      {/* Footer note */}
      <Typography
        sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          fontSize: '0.72rem',
          mt: 2,
          opacity: 0.5,
          fontFamily: '"JetBrains Mono", monospace',
        }}
      >
        Prompt-powered &middot; No data stored &middot; Works with any AI assistant
      </Typography>
    </MotionBox>
  );
}
