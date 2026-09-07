// Helpers for the /blog and /projects index pages.
//
// Both indexes render a client-side browser (search + tag filters), so whatever
// we hand them crosses the server/client boundary as JSON. Post objects carry
// their full MDX body, which is why these pages were shipping ~65KB of RSC
// payload just to draw a grid of cards. toCardPost drops the body and keeps
// only what a card actually draws.

const WORDS_PER_MINUTE = 220;

export function readingTimeMinutes(content = '') {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Tags are authored inconsistently across posts: "Next.js" and "next.js",
// "vector search" and "vector-search". Normalize for grouping and filtering,
// but keep an original spelling around for display.
export function normalizeTag(tag) {
  return String(tag).toLowerCase().replace(/[\s_]+/g, '-');
}

export function toCardPost(post) {
  const {
    slug,
    title,
    description,
    date,
    updated,
    image,
    tags = [],
    technologies = [],
    demoUrl,
    githubUrl,
    private: isPrivate = false,
    color,
    content = '',
  } = post;

  return {
    slug,
    title,
    description: description || '',
    date: date || null,
    updated: updated || null,
    image: image || null,
    tags,
    technologies,
    demoUrl: demoUrl || null,
    githubUrl: githubUrl || null,
    isPrivate: Boolean(isPrivate),
    color: color || null,
    readingTime: readingTimeMinutes(content),
  };
}

// Filter chips are only useful for tags that group something. With 44 of 56
// blog tags used exactly once, showing them all would be a wall of chips that
// each narrow to a single post.
export function collectFilterTags(posts, { minCount = 2, limit = 16 } = {}) {
  const byNormalized = new Map();

  for (const post of posts) {
    for (const tag of post.tags || []) {
      const key = normalizeTag(tag);
      const entry = byNormalized.get(key) || { key, count: 0, spellings: new Map() };
      entry.count += 1;
      // The same tag is authored several ways ("MongoDB", "mongodb"). Track how
      // often each spelling appears so the chip can show the dominant one
      // instead of whichever post happened to be read first.
      const spelling = String(tag);
      entry.spellings.set(spelling, (entry.spellings.get(spelling) || 0) + 1);
      byNormalized.set(key, entry);
    }
  }

  return [...byNormalized.values()]
    .filter((tag) => tag.count >= minCount)
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit)
    .map(({ key, count, spellings }) => ({
      key,
      count,
      label: [...spellings.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0],
    }));
}
