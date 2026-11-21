// Data for the homepage showcase: the Spotlight reel, the skyline and the
// filterable mosaic. Server-only (it reads public/ to find loops and icons).

import fs from 'fs';
import path from 'path';
import { normalizeTag } from './collection';

const publicDir = path.join(process.cwd(), 'public');

// The showcase filters. Each one is a set of normalized tags; a post belongs
// to every theme any of its tags fall into. "Essays" is by type, not tag.
export const SHOWCASE_THEMES = [
  { key: 'all', label: 'Everything' },
  {
    key: 'ai',
    label: 'AI & retrieval',
    tags: [
      'ai', 'rag', 'claude', 'llm', 'embeddings', 'vector-search', 'voyage-ai',
      'atlas-vector-search', 'mcp', 'local-llm', 'openai', 'whisper', 'ollama',
      'agents', 'agent', 'structured-outputs', 'tool-use', 'evals', 'core-ml',
      'computer-vision', 'speech-recognition',
    ],
  },
  {
    key: 'apps',
    label: 'Mac, iOS & TV',
    tags: [
      'macos', 'ios', 'swiftui', 'swift', 'appkit', 'android-tv', 'google-tv',
      'widgetkit', 'menu-bar', 'kotlin', 'camera-extension', 'apple-silicon',
    ],
  },
  { key: 'mongodb', label: 'MongoDB', tags: ['mongodb'] },
  {
    key: 'craft',
    label: 'Cursor & craft',
    tags: [
      'cursor', 'git', 'developer-tools', 'cli', 'workflow', 'developer-experience',
      'skills', 'rules', 'subagents', 'agent-mode', 'productivity', 'coding',
    ],
  },
  { key: 'essays', label: 'Essays' },
];

const themeIndex = SHOWCASE_THEMES.filter((t) => t.tags).map((t) => ({
  key: t.key,
  tags: new Set(t.tags),
}));

function publicFile(rel) {
  return fs.existsSync(path.join(publicDir, rel)) ? `/${rel}` : null;
}

// "FaceSwap: Blur, Hide or Swap Your Face" -> name "FaceSwap", tagline the rest.
function splitTitle(title = '') {
  const i = title.indexOf(':');
  if (i > 0 && i < 40) {
    return { name: title.slice(0, i).trim(), tagline: title.slice(i + 1).trim() };
  }
  return { name: title, tagline: '' };
}

export function toShowcaseItem(post) {
  const isProject = post.category === 'project';
  const tags = (post.tags || []).map(normalizeTag);
  const themes = themeIndex.filter((t) => tags.some((tag) => t.tags.has(tag))).map((t) => t.key);
  if (!isProject) themes.push('essays');

  // Projects with a short film or an app icon keep them by convention at
  // public/images/projects/<slug>/{brag-loop.mp4, brag-poster.jpg, icon.png}.
  const dir = `images/projects/${post.slug}`;
  const { name, tagline } = splitTitle(post.title);

  return {
    slug: post.slug,
    type: isProject ? 'project' : 'essay',
    href: isProject ? `/projects/${post.slug}` : `/blog/${post.slug}`,
    title: post.title,
    name,
    tagline,
    description: post.description || '',
    date: post.date ? String(post.date) : null,
    year: post.date ? Number(String(post.date).slice(0, 4)) : null,
    image: post.image || null,
    color: post.color || null,
    featured: Boolean(post.featured),
    tags: (post.tags || []).slice(0, 4),
    themes,
    demoUrl: post.private ? null : post.demoUrl || null,
    loop: isProject ? publicFile(`${dir}/brag-loop.mp4`) : null,
    poster: isProject ? publicFile(`${dir}/brag-poster.jpg`) : null,
    icon: isProject ? publicFile(`${dir}/icon.png`) : null,
  };
}

/**
 * The reel: every project marked `featured: true`, newest first, topped up
 * with the most recent other projects so it always has five slides.
 */
export function pickSpotlight(items, count = 5) {
  const projects = items.filter((i) => i.type === 'project');
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
}
