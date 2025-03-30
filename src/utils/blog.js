import { getAllMDXFiles, getMDXFileBySlug } from './mdx';

const BLOG_DIR = 'content/blog';

export async function getAllPosts(category = null) {
  const posts = await getAllMDXFiles(BLOG_DIR);
  
  // Filter posts by category if specified
  const filteredPosts = category 
    ? posts.filter(post => post.category === category)
    : posts;
  
  // Sort posts by date
  return filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date || new Date());
    const dateB = new Date(b.date || new Date());
    return dateB - dateA;
  });
}

export async function getPostBySlug(slug) {
  return getMDXFileBySlug(BLOG_DIR, slug);
}

// Helper function to get all projects (posts with category 'project')
export async function getAllProjects() {
  return getAllPosts('project');
}

// Helper function to get a project by slug
export async function getProjectBySlug(slug) {
  const post = await getPostBySlug(slug);
  if (!post || post.category !== 'project') {
    return null;
  }
  return post;
} 