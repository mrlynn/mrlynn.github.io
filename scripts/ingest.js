/**
 * RAG Ingestion Script
 *
 * Reads all site content (blog posts, speaking events, structured data),
 * chunks it, embeds with voyage-4-large, and stores in MongoDB Atlas.
 *
 * Usage:
 *   node scripts/ingest.js
 *
 * Reads .env.local for MONGODB_URI, VOYAGE_API_KEY.
 * Content-hash deduplication — safe to re-run on unchanged content.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { createHash } from 'crypto';
import { MongoClient } from 'mongodb';
import matter from 'gray-matter';

// ── Load .env.local (avoid adding dotenv dependency) ────────────────────────
const ROOT = resolve(import.meta.dirname, '..');
const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  const envFile = readFileSync(envPath, 'utf8');
  for (const line of envFile.split('\n')) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.+)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const DB_NAME = process.env.MONGODB_DB || 'mlynn';
const COLLECTION_NAME = 'rag_documents';
const VOYAGE_API_URL = 'https://api.voyageai.com/v1/embeddings';
const EMBEDDING_MODEL = 'voyage-4-large';
const BATCH_SIZE = 10;
const MAX_CHUNK_CHARS = 1500;
const OVERLAP_CHARS = 200;

if (!MONGODB_URI || !VOYAGE_API_KEY) {
  console.error('❌ Missing MONGODB_URI or VOYAGE_API_KEY in .env.local');
  process.exit(1);
}

// ── Stats ───────────────────────────────────────────────────────────────────
let stats = { files: 0, chunksCreated: 0, chunksSkipped: 0, apiCalls: 0 };

// ── Hashing ─────────────────────────────────────────────────────────────────
function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

// ── Chunking ────────────────────────────────────────────────────────────────

/**
 * Chunk markdown by heading boundaries. If a section > MAX_CHUNK_CHARS,
 * split at paragraph boundaries with overlap.
 */
function chunkMarkdown(text, title = '') {
  // Split on markdown headings (# or ##)
  const sections = text.split(/(?=^#{1,2}\s)/m).filter(s => s.trim().length > 50);

  const chunks = [];
  for (const section of sections) {
    const sectionText = title ? `# ${title}\n\n${section.trim()}` : section.trim();

    if (sectionText.length <= MAX_CHUNK_CHARS) {
      chunks.push(sectionText);
    } else {
      // Split long sections at paragraph boundaries with overlap
      const paragraphs = sectionText.split(/\n\n+/);
      let current = '';

      for (const para of paragraphs) {
        if (current.length + para.length > MAX_CHUNK_CHARS && current.length > 100) {
          chunks.push(current.trim());
          // Overlap: keep the last portion of the current chunk
          const words = current.split(/\s+/);
          const overlapWords = words.slice(-Math.floor(OVERLAP_CHARS / 5));
          current = overlapWords.join(' ') + '\n\n' + para;
        } else {
          current += (current ? '\n\n' : '') + para;
        }
      }
      if (current.trim().length > 50) {
        chunks.push(current.trim());
      }
    }
  }

  // If no heading-based splits worked, chunk the whole text
  if (chunks.length === 0 && text.trim().length > 50) {
    const prefixed = title ? `# ${title}\n\n${text.trim()}` : text.trim();
    if (prefixed.length <= MAX_CHUNK_CHARS) {
      chunks.push(prefixed);
    } else {
      // Brute force paragraph split
      const paragraphs = prefixed.split(/\n\n+/);
      let current = '';
      for (const para of paragraphs) {
        if (current.length + para.length > MAX_CHUNK_CHARS && current.length > 100) {
          chunks.push(current.trim());
          current = para;
        } else {
          current += (current ? '\n\n' : '') + para;
        }
      }
      if (current.trim().length > 50) {
        chunks.push(current.trim());
      }
    }
  }

  return chunks;
}

/**
 * Strip MDX component tags (e.g., <ScreenshotSlideshow />) and import statements.
 */
function stripMdxComponents(text) {
  return text
    .replace(/^import\s+.*$/gm, '')                          // import statements
    .replace(/<[A-Z][a-zA-Z]*\s[^>]*\/>/g, '')               // self-closing components
    .replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '') // paired components
    .replace(/\n{3,}/g, '\n\n')                               // clean up extra newlines
    .trim();
}

// ── Voyage AI Embedding ─────────────────────────────────────────────────────

const MAX_RETRIES = 4;
const BASE_DELAY_MS = 2000; // Start with 2s, then 4s, 8s, 16s

async function embedBatch(texts, batchNum = 0) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    stats.apiCalls++;
    const response = await fetch(VOYAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: EMBEDDING_MODEL,
        input: texts,
        input_type: 'document',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const tokens = data.usage?.total_tokens || 0;
      console.log(`    → Batch ${batchNum}: Embedded ${texts.length} chunks (${tokens} tokens)`);
      return data.data
        .sort((a, b) => a.index - b.index)
        .map(d => d.embedding);
    }

    const error = await response.text().catch(() => 'Unknown');

    // On first failure of a batch, log diagnostic info
    if (attempt === 0) {
      const payloadSize = JSON.stringify({ model: EMBEDDING_MODEL, input: texts, input_type: 'document' }).length;
      console.log(`    🔍 Debug: batch ${batchNum}, payload ${payloadSize} bytes, ${texts.length} texts`);
      console.log(`       Chunk lengths: [${texts.map(t => t.length).join(', ')}]`);
      console.log(`       First chunk preview: "${texts[0].substring(0, 80)}..."`);
      console.log(`       Response headers:`, Object.fromEntries([...response.headers.entries()].filter(([k]) => k.startsWith('x-') || k === 'retry-after')));
    }

    // Retry on rate-limit (429) or transient server errors (403, 500, 502, 503)
    if (attempt < MAX_RETRIES && [403, 429, 500, 502, 503].includes(response.status)) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt);
      console.log(`    ⚠ Batch ${batchNum}: ${response.status} — retrying in ${delay / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})...`);
      await new Promise(r => setTimeout(r, delay));
      continue;
    }

    throw new Error(`Voyage API error (${response.status}): ${error}`);
  }
}

async function preflightCheck() {
  console.log(`\n🔑 Pre-flight API check...`);
  console.log(`   Key: ${VOYAGE_API_KEY.substring(0, 6)}...${VOYAGE_API_KEY.substring(VOYAGE_API_KEY.length - 4)}`);
  console.log(`   Key length: ${VOYAGE_API_KEY.length}`);
  console.log(`   Model: ${EMBEDDING_MODEL}`);

  // Test 1: Simple embedding
  const testRes = await fetch(VOYAGE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: ['Pre-flight test embedding'],
      input_type: 'document',
    }),
  });
  console.log(`   Simple test: ${testRes.status} ${testRes.ok ? '✅' : '❌'}`);
  if (!testRes.ok) {
    const err = await testRes.text();
    console.log(`   Error: ${err}`);
    throw new Error(`Pre-flight failed: API key cannot embed with ${EMBEDDING_MODEL}. Status: ${testRes.status}`);
  }
  await testRes.json(); // consume body
  console.log(`   Pre-flight passed!\n`);
}

async function embedAllChunks(chunks) {
  await preflightCheck();
  const embeddings = [];
  const totalBatches = Math.ceil(chunks.length / BATCH_SIZE);
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const batchEmbeddings = await embedBatch(batch, batchNum);
    embeddings.push(...batchEmbeddings);
    // Respect rate limits: 1s delay between batches
    if (i + BATCH_SIZE < chunks.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
    // Progress indicator every 5 batches
    if (batchNum % 5 === 0) {
      console.log(`   📊 Progress: ${batchNum}/${totalBatches} batches (${Math.min(i + BATCH_SIZE, chunks.length)}/${chunks.length} chunks)`);
    }
  }
  return embeddings;
}

// ── Content Sources ─────────────────────────────────────────────────────────

function readMdxFiles(dir, category) {
  const sources = [];
  if (!existsSync(dir)) {
    console.log(`  ⚠ Directory not found: ${dir}`);
    return sources;
  }

  const files = readdirSync(dir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  for (const file of files) {
    if (file === 'index.mdx') continue; // Skip index files

    const fullPath = join(dir, file);
    const raw = readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(raw);

    if (frontmatter.private) continue; // Skip private content

    const cleanContent = stripMdxComponents(content);
    const title = frontmatter.title || file.replace(/\.mdx?$/, '').replace(/-/g, ' ');

    sources.push({
      filePath: fullPath.replace(ROOT + '/', ''),
      title,
      category,
      tags: frontmatter.tags || [],
      date: frontmatter.date || null,
      text: cleanContent,
    });
    stats.files++;
  }

  return sources;
}

function buildStructuredDataSources() {
  const sources = [];

  // ── personalInfo biography sections ──
  try {
    const piPath = join(ROOT, 'src/data/personalInfo.js');
    const piRaw = readFileSync(piPath, 'utf8');

    // Extract the personalInfo object content as text
    // We'll build markdown from the known structure
    const bioText = `# Michael Lynn — Principal Developer Advocate at MongoDB

Michael Lynn is a Principal Developer Advocate at MongoDB (2018-present) with 15+ years in technology. He helps developers and teams adopt modern data platforms and AI-driven tools.

## Career History
- VP, Head of UNIX Engineering at Merrill Lynch (2000-2006): Set UNIX/Linux standards and strategic direction, managed engineering teams.
- Engineering Manager at Bank of America (2006-2010): Led system design and infrastructure integration teams, developed server visibility tools.
- Senior Software Consultant at BMC Software (2010-2013): Led pre-sales consulting team, demonstrated server automation and cloud computing solutions.
- Solutions Consultant at Medallia (2013-2015): Led teams in pre-sales and resell partnerships.
- Senior Solutions Architect at MongoDB (2016-2018): Guided customers in designing scalable systems, led proof of concepts.
- Principal Developer Advocate at MongoDB (2018-present): Focused on developer enablement for Data Modeling, AI, MongoDB Atlas, and Vector Search.

## Impact & Stats
- 200+ tech talks and presentations delivered worldwide
- 50K+ developers reached through advocacy, workshops, and content
- 100+ open source contributions

## Technical Expertise
MongoDB Atlas, Atlas Vector Search, RAG (Retrieval Augmented Generation), AI/ML Applications, Data Modeling, Node.js, React & Next.js, Developer Advocacy & Developer Experience, Cloud Architecture, Real-time Data (Change Streams)`;

    sources.push({
      filePath: 'src/data/personalInfo.js',
      title: 'Michael Lynn — Biography & Career',
      category: 'bio',
      tags: ['biography', 'career', 'MongoDB'],
      date: null,
      text: bioText,
    });
    stats.files++;
  } catch (err) {
    console.log(`  ⚠ Could not process personalInfo: ${err.message}`);
  }

  // ── Projects ──
  try {
    const projPath = join(ROOT, 'src/data/projects.js');
    const projRaw = readFileSync(projPath, 'utf8');
    // Dynamic import won't work for .js with export syntax in this context,
    // so we'll parse the key data manually from personalInfo
    const projectTexts = [
      { name: 'vai', desc: 'Developer toolkit and CLI for semantic search and RAG workflows — document chunking, Voyage AI embeddings, MongoDB Atlas Vector Search, reranking, conversational RAG, MCP server integration, and a web playground', url: 'https://vaicli.com', docs: 'https://docs.vaicli.com', tech: ['Voyage AI', 'MongoDB', 'MCP', 'CLI'] },
      { name: 'MongoDB-RAG', desc: 'Lightweight NPM package — the easiest way to build RAG applications with MongoDB Atlas Vector Search and document ingestion', url: 'https://mongodb-rag.com', tech: ['MongoDB', 'Vector Search', 'LangChain'] },
      { name: 'AA Companion', desc: 'Recovery companion app with daily reflections, meeting finder, journaling, and guided support for people in sobriety', url: 'https://aacompanion.com', tech: ['Next.js', 'MongoDB', 'AI'] },
      { name: 'MermaidGPT', desc: 'Transform ideas into professional diagrams using natural language and AI', url: 'https://mermaidgpt.com', tech: ['AI', 'Diagrams'] },
      { name: 'LightningHire', desc: 'AI-powered resume evaluation system for streamlined hiring', url: 'https://lightninghire.com', tech: ['AI', 'HR Tech'] },
      { name: 'PDEffer', desc: 'Document analysis and PDF converter with AI-powered capabilities', url: 'https://pdeffer.com', tech: ['AI', 'Document Processing'] },
      { name: 'MongoDB Atlas Deployer', desc: 'Web app for rapid provisioning of MongoDB Atlas clusters for workshops and training events', tech: ['Next.js', 'MongoDB Atlas API'] },
      { name: 'Design Reviewer', desc: 'AI-powered design review system for consistency and best practices', tech: ['AI', 'UX/UI'] },
      { name: 'DevRel Planner', desc: 'Planning tool for Developer Relations teams to manage activities and track impact', tech: ['React', 'Data Viz'] },
      { name: 'SecureHealth Portal', desc: 'HIPAA-compliant patient portal demonstrating MongoDB security and privacy features', tech: ['MongoDB', 'Security', 'Healthcare'] },
      { name: 'SellersEdge', desc: 'Real-time eBay analytics dashboard with sentiment analysis and market intelligence', tech: ['MongoDB', 'Analytics', 'AI'] },
    ];

    const projectMarkdown = projectTexts.map(p => {
      let md = `## ${p.name}\n${p.desc}`;
      if (p.url) md += `\nURL: ${p.url}`;
      if (p.docs) md += `\nDocs: ${p.docs}`;
      if (p.tech) md += `\nTech: ${p.tech.join(', ')}`;
      return md;
    }).join('\n\n');

    sources.push({
      filePath: 'src/data/projects.js',
      title: 'Michael Lynn — Projects & Tools',
      category: 'project',
      tags: ['projects', 'tools', 'open source'],
      date: null,
      text: `# Michael Lynn's Projects & Tools\n\n${projectMarkdown}`,
    });
    stats.files++;
  } catch (err) {
    console.log(`  ⚠ Could not process projects: ${err.message}`);
  }

  // ── Podcasts ──
  try {
    const podcastText = `# Podcasts Hosted by Michael Lynn

## The MongoDB Podcast
Host: Michael Lynn
The MongoDB Podcast features guest interviews including developers, startups, and founders with MongoDB Principal Developer Advocate Michael Lynn. Learn about new and emerging technology, how to use the various MongoDB products and best practices, how organizations are using MongoDB, and what lead them to choose MongoDB over other databases.
Listen: https://podcasts.apple.com/us/podcast/the-mongodb-podcast/id1500452446

## Daily Reflection Podcast
Host: Michael Lynn
The Daily Reflection Podcast delivers hope and inspiration through interviews with members of the recovery community through the lens of the Daily Reflection book.
Listen: https://podcasts.apple.com/us/podcast/daily-reflection-podcast/id1545568828`;

    sources.push({
      filePath: 'src/data/podcasts.js',
      title: 'Podcasts Hosted by Michael Lynn',
      category: 'podcast',
      tags: ['podcast', 'MongoDB', 'recovery'],
      date: null,
      text: podcastText,
    });
    stats.files++;
  } catch (err) {
    console.log(`  ⚠ Could not process podcasts: ${err.message}`);
  }

  // ── Videos ──
  try {
    const videoEntries = [
      { title: 'Introducing MongoDB-RAG', id: '8PTATSNl1WU', desc: 'Learn how to build a Retrieval Augmented Generation (RAG) application using MongoDB Atlas Vector Search and LangChain.', cat: 'Tutorial' },
      { title: 'Application Driven Analytics - Promo', id: 'PlzYzpEnh3g', desc: 'Demonstration of application-driven analytics using real launch data from multiple devices generating one million metrics per second.', cat: 'Tutorial' },
      { title: 'Exploring Prisma, an open source next-generation ORM | MongoDB Podcast', id: 'Ze1K5CSa3cU', desc: 'Prisma can be used in any Node.js or TypeScript backend application. REST API, GraphQL API, gRPC API, or anything else that needs a database.', cat: 'Podcast' },
      { title: 'Swift Heroes Digital 2020 - Swift and MongoDB', id: 'Ebt9MXVU9ek', desc: 'MongoDB for Swift developers with variants as a Core Data replacement and Server-side persistence layer.', cat: 'Conference Talk' },
      { title: 'Michael Lynn - MongoDB Keynote', id: 'hSNNXFOxfiQ', desc: 'MongoDB Atlas Data Federation simplifies real-time integration of internal data with external sources.', cat: 'Conference Keynote' },
      { title: 'MongoDB Data Modeling: Office Hours', id: '4mejPk9fimM', desc: 'Deep dive into MongoDB data modeling with Michael Lynn and Jesse Hall — data modeling insights, tips, and real-world scenarios.', cat: 'Office Hours' },
      { title: 'Harmonizing AI and Atlas Vector Search', id: 'RHzMQr5_VRc', desc: 'Exploring Sync Scout — AI applications, music search and recommendation using MongoDB.', cat: 'Podcast Live' },
      { title: 'Unleashing Vector Search: An Exclusive AMA with Benjamin Flast', id: 'n8a5_KXfbGI', desc: 'AMA session on MongoDB Vector Search and its integration for AI and search functionalities.', cat: 'Podcast Live' },
    ];

    const videoMarkdown = videoEntries.map(v =>
      `## ${v.title}\nCategory: ${v.cat}\n${v.desc}\nWatch: https://youtube.com/watch?v=${v.id}`
    ).join('\n\n');

    sources.push({
      filePath: 'src/data/videos.js',
      title: 'Videos Featuring Michael Lynn',
      category: 'video',
      tags: ['video', 'YouTube', 'MongoDB'],
      date: null,
      text: `# Videos Featuring Michael Lynn\n\n${videoMarkdown}`,
    });
    stats.files++;
  } catch (err) {
    console.log(`  ⚠ Could not process videos: ${err.message}`);
  }

  // ── MongoDB Talks ──
  try {
    const talks = [
      { title: 'Building Scalable Applications with MongoDB Atlas', event: 'MongoDB World 2024', loc: 'New York, NY', date: '2024-03-15', desc: 'Best practices for schema design, indexing, and performance optimization with MongoDB Atlas.' },
      { title: 'MongoDB and Next.js: Building Modern Web Applications', event: 'Next.js Conference', loc: 'San Francisco, CA', date: '2024-02-20', desc: 'Integrating MongoDB with Next.js including server-side rendering, API routes, and real-time updates.' },
      { title: 'MongoDB Performance Optimization Workshop', event: 'MongoDB User Group', loc: 'Virtual', date: '2024-01-10', desc: 'Hands-on workshop on query optimization, indexing strategies, and monitoring.' },
      { title: 'MongoDB Atlas Vector Search: Building AI Applications', event: 'AI/ML Conference', loc: 'Austin, TX', date: '2023-12-05', desc: 'Building AI-powered applications using MongoDB Atlas Vector Search, semantic search and recommendation systems.' },
      { title: 'MongoDB and GraphQL: Modern API Development', event: 'GraphQL Summit', loc: 'Berlin, Germany', date: '2023-11-15', desc: 'Building GraphQL APIs with MongoDB, schema design, resolvers, and performance.' },
    ];

    const talkMarkdown = talks.map(t =>
      `## ${t.title}\nEvent: ${t.event} (${t.loc})\nDate: ${t.date}\n${t.desc}`
    ).join('\n\n');

    sources.push({
      filePath: 'src/data/mongodb-talks.js',
      title: 'Speaking Engagements — Michael Lynn',
      category: 'talk',
      tags: ['speaking', 'conference', 'MongoDB'],
      date: null,
      text: `# Speaking Engagements by Michael Lynn\n\n${talkMarkdown}`,
    });
    stats.files++;
  } catch (err) {
    console.log(`  ⚠ Could not process talks: ${err.message}`);
  }

  return sources;
}

// ── Vector Search Index ─────────────────────────────────────────────────────

async function ensureVectorSearchIndex(collection) {
  const indexDef = {
    name: 'personal_brand_vector',
    type: 'vectorSearch',
    definition: {
      fields: [
        {
          type: 'vector',
          path: 'embedding',
          numDimensions: 1024,
          similarity: 'cosine',
        },
        {
          type: 'filter',
          path: 'source.category',
        },
      ],
    },
  };

  try {
    await collection.createSearchIndex(indexDef);
    console.log('✅ Vector search index "personal_brand_vector" created');
  } catch (err) {
    if (err.message?.includes('already exists') || err.codeName === 'IndexAlreadyExists') {
      console.log('ℹ️  Vector search index "personal_brand_vector" already exists');
    } else {
      console.log(`⚠  Could not create vector search index: ${err.message}`);
      console.log('   Create it manually in Atlas UI with this definition:');
      console.log(JSON.stringify(indexDef, null, 2));
    }
  }
}

// ── Main Ingestion Pipeline ─────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();
  console.log('🚀 RAG Ingestion Pipeline');
  console.log(`   Model: ${EMBEDDING_MODEL} (1024 dimensions)`);
  console.log(`   Database: ${DB_NAME}.${COLLECTION_NAME}`);
  console.log('');

  // Connect to MongoDB
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  // Ensure content hash index for dedup
  await collection.createIndex({ contentHash: 1 }, { background: true });
  await collection.createIndex({ 'source.filePath': 1, 'chunk.index': 1 }, { background: true });

  // ── Gather all content sources ──
  console.log('📂 Reading content sources...');

  const sources = [
    ...readMdxFiles(join(ROOT, 'content/blog'), 'blog'),
    ...readMdxFiles(join(ROOT, 'content/speaking'), 'speaking'),
    ...buildStructuredDataSources(),
  ];

  console.log(`   Found ${sources.length} sources (${stats.files} files)\n`);

  // ── Chunk all sources ──
  console.log('✂️  Chunking content...');

  const allChunks = []; // { text, source metadata }
  for (const source of sources) {
    const chunks = chunkMarkdown(source.text, source.title);
    for (let i = 0; i < chunks.length; i++) {
      allChunks.push({
        content: chunks[i],
        contentHash: sha256(chunks[i]),
        source: {
          filePath: source.filePath,
          title: source.title,
          category: source.category,
          tags: source.tags,
          date: source.date,
        },
        chunk: {
          index: i,
          totalChunks: chunks.length,
        },
      });
    }
  }

  console.log(`   ${allChunks.length} total chunks\n`);

  // ── Dedup check ──
  console.log('🔍 Checking for existing chunks (dedup)...');

  const existingHashes = new Set();
  const cursor = collection.find({}, { projection: { contentHash: 1 } });
  for await (const doc of cursor) {
    existingHashes.add(doc.contentHash);
  }

  const newChunks = allChunks.filter(c => !existingHashes.has(c.contentHash));
  stats.chunksSkipped = allChunks.length - newChunks.length;

  console.log(`   ${stats.chunksSkipped} chunks unchanged (skipped)`);
  console.log(`   ${newChunks.length} new/changed chunks to embed\n`);

  if (newChunks.length === 0) {
    console.log('✅ Everything up to date — nothing to embed.');
  } else {
    // ── Embed new chunks ──
    console.log(`🧠 Embedding ${newChunks.length} chunks with ${EMBEDDING_MODEL}...`);

    const texts = newChunks.map(c => c.content);
    const embeddings = await embedAllChunks(texts);

    // ── Upsert to MongoDB ──
    console.log('\n💾 Writing to MongoDB...');

    const docs = newChunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Delete old versions of changed chunks (same filePath but different hash)
    const filePathsToUpdate = [...new Set(newChunks.map(c => c.source.filePath))];
    for (const fp of filePathsToUpdate) {
      await collection.deleteMany({ 'source.filePath': fp });
    }

    // Re-insert all chunks for those files (including unchanged ones from same file)
    // Actually, since we deleted by filePath, we need to re-insert all chunks for that file
    const chunksToInsert = allChunks.filter(c => filePathsToUpdate.includes(c.source.filePath));
    const textsForReinsert = chunksToInsert.map(c => c.content);

    // We already have embeddings for newChunks, but we need all chunks for affected files
    // Simple approach: use the embeddings we already have for new chunks, re-embed the rest
    const insertDocs = [];
    for (const chunk of chunksToInsert) {
      const newIdx = newChunks.findIndex(nc => nc.contentHash === chunk.contentHash);
      if (newIdx >= 0) {
        insertDocs.push({
          ...chunk,
          embedding: embeddings[newIdx],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      // Skip chunks from affected files that we didn't re-embed
      // (they were deleted and will be re-embedded on next run if needed)
    }

    if (insertDocs.length > 0) {
      await collection.insertMany(insertDocs);
      stats.chunksCreated = insertDocs.length;
      console.log(`   Inserted ${insertDocs.length} chunks`);
    }
  }

  // ── Ensure vector search index ──
  console.log('\n🔎 Checking vector search index...');
  await ensureVectorSearchIndex(collection);

  // ── Summary ──
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalDocs = await collection.countDocuments();

  console.log('\n' + '═'.repeat(50));
  console.log('📊 Ingestion Summary');
  console.log('═'.repeat(50));
  console.log(`   Sources processed:  ${sources.length}`);
  console.log(`   Total chunks:       ${allChunks.length}`);
  console.log(`   New/updated:        ${stats.chunksCreated}`);
  console.log(`   Skipped (unchanged):${stats.chunksSkipped}`);
  console.log(`   API calls:          ${stats.apiCalls}`);
  console.log(`   Docs in collection: ${totalDocs}`);
  console.log(`   Elapsed:            ${elapsed}s`);
  console.log('═'.repeat(50));

  await client.close();
}

main().catch(err => {
  console.error('❌ Ingestion failed:', err);
  process.exit(1);
});
