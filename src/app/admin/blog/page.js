'use client';

import { Box, Container, Typography, Button, TextField, Grid, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import RichTextEditor from '../../../components/blog/RichTextEditor';
import AdminBlogList from '../../../components/blog/AdminBlogList';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '../../../components/blog/ImageUpload';

const initialPost = {
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  author: '',
  image: '',
  tags: '',
  content: '',
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(initialPost);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error fetching blog posts',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setPost((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/blog', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: `Blog post ${isEditing ? 'updated' : 'saved'} successfully!`,
        });
        setIsDialogOpen(false);
        setIsEditing(false);
        setPost(initialPost);
        fetchPosts();
      } else {
        setStatus({
          type: 'error',
          message: `Error ${isEditing ? 'updating' : 'saving'} blog post: ${result.error}`,
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error ${isEditing ? 'updating' : 'saving'} blog post: ${error.message}`,
      });
    }
  };

  const handleEdit = (post) => {
    setPost({
      ...post,
      tags: post.tags.join(', '),
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/blog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug: deleteSlug }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Blog post deleted successfully!',
        });
        setDeleteSlug(null);
        fetchPosts();
      } else {
        setStatus({
          type: 'error',
          message: `Error deleting blog post: ${result.error}`,
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error deleting blog post: ${error.message}`,
      });
    }
  };

  const handleCreate = () => {
    setPost(initialPost);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog Management
        </Typography>
        {status.message && (
          <Alert severity={status.type} sx={{ mb: 4 }}>
            {status.message}
          </Alert>
        )}
        <AdminBlogList
          posts={posts}
          onEdit={handleEdit}
          onDelete={(slug) => setDeleteSlug(slug)}
          onCreate={handleCreate}
        />

        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    value={post.date}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Author"
                    name="author"
                    value={post.author}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <ImageUpload
                    value={post.image}
                    onChange={(value) => handleChange({ target: { name: 'image', value } })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tags (comma-separated)"
                    name="tags"
                    value={post.tags}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Content
                  </Typography>
                  <RichTextEditor
                    content={post.content}
                    onChange={handleContentChange}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={status.type === 'success'}
            >
              {isEditing ? 'Update' : 'Publish'} Post
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={!!deleteSlug}
          onClose={() => setDeleteSlug(null)}
        >
          <DialogTitle>Delete Blog Post</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteSlug(null)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
} 