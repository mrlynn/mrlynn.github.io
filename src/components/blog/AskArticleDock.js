'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Chip,
  CircularProgress,
  useTheme,
  Collapse,
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  AutoAwesome as AutoAwesomeIcon,
  KeyboardArrowDown as CollapseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const MotionBox = motion(Box);

const MAX_INPUT_LENGTH = 400;
const SCROLL_REVEAL_PX = 420;

const PILOT_SUGGESTIONS = {
  'skills-rules-subagents-with-cursor': [
    'When should I use a Rule vs a Skill?',
    'What belongs in Team Rules vs project rules?',
    'What should I do in week one?',
  ],
};

function MarkdownReply({ content, isDark }) {
  return (
    <Box
      sx={{
        fontSize: '0.84rem',
        lineHeight: 1.65,
        color: 'text.primary',
        '& p': { m: 0, mb: 1, '&:last-child': { mb: 0 } },
        '& ul, & ol': { m: 0, mb: 1, pl: 2.25, '&:last-child': { mb: 0 } },
        '& li': { mb: 0.25 },
        '& strong': { fontWeight: 600 },
        '& code': {
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: '0.78rem',
          px: 0.6,
          py: 0.15,
          borderRadius: 0.5,
          background: isDark ? 'rgba(232, 121, 74, 0.12)' : 'rgba(190, 78, 28, 0.08)',
        },
        '& a': {
          color: isDark ? '#e8794a' : '#be4e1c',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
}

/**
 * Floating article ask dock — pilot on selected blog posts.
 * Collapsed bar after scroll; expands into a short article-scoped chat.
 */
export default function AskArticleDock({ slug, title, suggestedQuestions }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const accent = isDark ? '#e8794a' : '#be4e1c';

  const questions =
    suggestedQuestions?.length > 0
      ? suggestedQuestions
      : PILOT_SUGGESTIONS[slug] || [
          'What is the main takeaway?',
          'Summarize the key steps',
          'What should I try first?',
        ];

  const [revealed, setRevealed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > SCROLL_REVEAL_PX) {
        setRevealed(true);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (expanded && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, expanded]);

  useEffect(() => {
    if (expanded) {
      const t = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [expanded]);

  const sendMessage = useCallback(
    async (overrideText) => {
      const text = (overrideText || input).trim();
      if (!text || loading) return;

      const userMessage = { role: 'user', content: text };
      const apiMessages = [...messages, userMessage];

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setLoading(true);
      setError(null);
      setExpanded(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            stream: true,
            slug,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Something went wrong. Please try again.');
          setLoading(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullContent = '';

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
              if (parsed.error) {
                setError(parsed.error);
                setMessages((prev) => {
                  const updated = [...prev];
                  if (
                    updated.length > 0 &&
                    updated[updated.length - 1].role === 'assistant' &&
                    !updated[updated.length - 1].content
                  ) {
                    return updated.slice(0, -1);
                  }
                  return updated;
                });
                continue;
              }
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
              // skip malformed chunks
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
    },
    [input, loading, messages, slug]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!revealed) return null;

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          px: { xs: 1.5, sm: 2 },
          pb: { xs: 1.5, sm: 2.5 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: expanded ? 520 : 440,
            pointerEvents: 'auto',
            transition: 'max-width 0.25s ease',
          }}
        >
          <Collapse in={expanded} timeout={220}>
            <Box
              sx={{
                mb: 1,
                borderRadius: '16px 16px 12px 12px',
                overflow: 'hidden',
                background: isDark
                  ? 'linear-gradient(165deg, rgba(28, 24, 20, 0.97) 0%, rgba(18, 16, 14, 0.98) 100%)'
                  : 'linear-gradient(165deg, rgba(255, 252, 248, 0.98) 0%, rgba(250, 246, 240, 0.99) 100%)',
                border: `1px solid ${isDark ? 'rgba(232, 121, 74, 0.28)' : 'rgba(190, 78, 28, 0.22)'}`,
                boxShadow: isDark
                  ? '0 18px 48px rgba(0,0,0,0.55)'
                  : '0 18px 48px rgba(40, 20, 8, 0.16)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.75,
                  py: 1.25,
                  borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 18, color: accent }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: 'text.primary',
                    }}
                  >
                    Ask about this article
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.68rem',
                      color: 'text.secondary',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  aria-label="Collapse ask panel"
                  onClick={() => setExpanded(false)}
                  sx={{ color: 'text.secondary' }}
                >
                  <CollapseIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="Close ask panel"
                  onClick={() => {
                    setExpanded(false);
                    setRevealed(false);
                  }}
                  sx={{ color: 'text.secondary' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box
                sx={{
                  maxHeight: { xs: '42vh', sm: 280 },
                  overflowY: 'auto',
                  px: 1.75,
                  py: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                }}
              >
                {messages.length === 0 && !loading && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        mb: 1.25,
                        lineHeight: 1.5,
                      }}
                    >
                      Ask anything about this post. Answers stay grounded in the
                      article you&apos;re reading.
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {questions.map((q) => (
                        <Chip
                          key={q}
                          label={q}
                          size="small"
                          onClick={() => sendMessage(q)}
                          sx={{
                            height: 'auto',
                            py: 0.6,
                            px: 0.25,
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            color: accent,
                            background: isDark
                              ? 'rgba(232, 121, 74, 0.1)'
                              : 'rgba(190, 78, 28, 0.07)',
                            border: `1px solid ${isDark ? 'rgba(232, 121, 74, 0.28)' : 'rgba(190, 78, 28, 0.2)'}`,
                            '& .MuiChip-label': {
                              whiteSpace: 'normal',
                              lineHeight: 1.35,
                            },
                            '&:hover': {
                              background: isDark
                                ? 'rgba(232, 121, 74, 0.18)'
                                : 'rgba(190, 78, 28, 0.12)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {messages.map((m, i) => (
                  <Box
                    key={`${m.role}-${i}`}
                    sx={{
                      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '92%',
                      px: 1.4,
                      py: 1,
                      borderRadius:
                        m.role === 'user'
                          ? '14px 14px 4px 14px'
                          : '14px 14px 14px 4px',
                      background:
                        m.role === 'user'
                          ? isDark
                            ? 'rgba(232, 121, 74, 0.22)'
                            : 'rgba(190, 78, 28, 0.12)'
                          : isDark
                            ? 'rgba(255,255,255,0.04)'
                            : 'rgba(0,0,0,0.03)',
                      border:
                        m.role === 'assistant'
                          ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`
                          : 'none',
                    }}
                  >
                    {m.role === 'assistant' ? (
                      m.content ? (
                        <MarkdownReply content={m.content} isDark={isDark} />
                      ) : (
                        <CircularProgress size={16} sx={{ color: accent }} />
                      )
                    ) : (
                      <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.5 }}>
                        {m.content}
                      </Typography>
                    )}
                  </Box>
                ))}

                {loading && messages[messages.length - 1]?.role === 'user' && (
                  <Box sx={{ alignSelf: 'flex-start', px: 1 }}>
                    <CircularProgress size={16} sx={{ color: accent }} />
                  </Box>
                )}

                {error && (
                  <Typography
                    sx={{ fontSize: '0.78rem', color: 'error.main', px: 0.5 }}
                  >
                    {error}
                  </Typography>
                )}

                <div ref={messagesEndRef} />
              </Box>

              <Box
                sx={{
                  px: 1.5,
                  pb: 1,
                  pt: 0.25,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component={Link}
                  href="/ask-ai"
                  sx={{
                    fontSize: '0.68rem',
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: accent },
                  }}
                >
                  Ask about Michael instead →
                </Typography>
              </Box>
            </Box>
          </Collapse>

          {/* Input dock bar */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.25,
              py: 0.85,
              borderRadius: expanded ? '12px' : '999px',
              background: isDark
                ? 'rgba(22, 20, 17, 0.94)'
                : 'rgba(255, 252, 248, 0.96)',
              border: `1px solid ${isDark ? 'rgba(232, 121, 74, 0.35)' : 'rgba(190, 78, 28, 0.28)'}`,
              boxShadow: isDark
                ? '0 10px 36px rgba(0,0,0,0.5), 0 0 0 1px rgba(232, 121, 74, 0.08)'
                : '0 10px 36px rgba(40, 20, 8, 0.14), 0 0 0 1px rgba(190, 78, 28, 0.06)',
              backdropFilter: 'blur(12px)',
              cursor: expanded ? 'default' : 'text',
              transition: 'border-radius 0.2s ease',
            }}
            onClick={() => {
              if (!expanded) setExpanded(true);
            }}
          >
            {!expanded && (
              <AutoAwesomeIcon
                sx={{
                  fontSize: 18,
                  color: accent,
                  ml: 0.75,
                  flexShrink: 0,
                }}
              />
            )}
            <TextField
              inputRef={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
              onKeyDown={handleKeyDown}
              onFocus={() => setExpanded(true)}
              placeholder={
                expanded
                  ? 'Ask a question about this article…'
                  : 'Ask about this article…'
              }
              variant="standard"
              fullWidth
              disabled={loading}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: '0.88rem',
                  color: 'text.primary',
                  '& input::placeholder': {
                    opacity: 0.65,
                    color: 'text.secondary',
                  },
                },
              }}
              sx={{ ml: expanded ? 0.5 : 0 }}
            />
            <IconButton
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                background: accent,
                color: '#fff',
                '&:hover': {
                  background: isDark ? '#f08a58' : '#a84418',
                },
                '&.Mui-disabled': {
                  background: isDark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.08)',
                  color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={16} sx={{ color: 'inherit' }} />
              ) : (
                <SendIcon sx={{ fontSize: 17 }} />
              )}
            </IconButton>
          </Box>
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
}
