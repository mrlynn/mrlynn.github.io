'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Chip,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import BlogCard from '../blog/BlogCard';
import ProjectCard from '../projects/ProjectCard';
import { normalizeTag } from '../../lib/collection';

// Shared shell for /blog and /projects: search box, tag filters, results grid.
// The cards themselves are deliberately separate components — posts and
// projects show different things — but the filtering behaves identically, so
// it lives here rather than being written twice.
export default function CollectionBrowser({
  posts,
  filterTags = [],
  kind = 'blog',
  searchLabel = 'Search posts',
  emptyMessage = 'Nothing matches that. Try a different search or clear the filters.',
}) {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  const toggleTag = (key) => {
    setActiveTags((current) =>
      current.includes(key) ? current.filter((t) => t !== key) : [...current, key]
    );
  };

  const clearAll = () => {
    setQuery('');
    setActiveTags([]);
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return posts.filter((post) => {
      // Selected tags are OR'd: picking "cursor" and "rag" widens the result
      // set rather than narrowing it to posts carrying both, which with these
      // tag counts would usually be empty.
      if (activeTags.length) {
        const postTags = (post.tags || []).map(normalizeTag);
        if (!activeTags.some((tag) => postTags.includes(tag))) return false;
      }

      if (!needle) return true;

      const haystack = [
        post.title,
        post.description,
        ...(post.tags || []),
        ...(post.technologies || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [posts, query, activeTags]);

  const isFiltered = Boolean(query.trim()) || activeTags.length > 0;

  return (
    <Container maxWidth="lg">
      <Box sx={{ pb: 8 }}>
        <Stack spacing={2.5} sx={{ mb: 5 }}>
          <TextField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchLabel}
            size="small"
            fullWidth
            // MUI 5.17's TextField does not forward `slotProps`; it leaks to the
            // DOM and React warns. InputProps is the supported spelling here.
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 460 }}
          />

          {filterTags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              {filterTags.map((tag) => {
                const selected = activeTags.includes(tag.key);
                return (
                  <Chip
                    key={tag.key}
                    label={`${tag.label} · ${tag.count}`}
                    size="small"
                    onClick={() => toggleTag(tag.key)}
                    variant={selected ? 'filled' : 'outlined'}
                    sx={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      backgroundColor: selected ? theme.palette.primary.main : 'transparent',
                      color: selected
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.secondary,
                      borderColor: selected
                        ? theme.palette.primary.main
                        : theme.palette.border.default,
                      '&:hover': {
                        backgroundColor: selected
                          ? theme.palette.primary.dark
                          : theme.palette.action.hover,
                      },
                    }}
                  />
                );
              })}

              {isFiltered && (
                <Chip
                  label="Clear"
                  size="small"
                  onClick={clearAll}
                  icon={<CloseIcon sx={{ fontSize: '0.9rem' }} />}
                  sx={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </Box>
          )}

          <Typography
            sx={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          >
            {visible.length} {visible.length === 1 ? 'result' : 'results'}
            {isFiltered ? ` of ${posts.length}` : ''}
          </Typography>
        </Stack>

        {visible.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography color="text.secondary">{emptyMessage}</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {visible.map((post) => (
              <Grid item key={post.slug} xs={12} sm={6} md={4}>
                {kind === 'project' ? (
                  <ProjectCard project={post} />
                ) : (
                  <BlogCard post={post} />
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
