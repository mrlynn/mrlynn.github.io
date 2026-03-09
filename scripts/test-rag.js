/**
 * RAG Retrieval Smoke Test
 *
 * Tests the full retrieval pipeline: embed query → vector search → format context.
 *
 * Usage:
 *   node scripts/test-rag.js "What is vai?"
 *   node scripts/test-rag.js "Tell me about MongoDB Vector Search"
 */

import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { MongoClient } from 'mongodb';

// ── Load .env.local ─────────────────────────────────────────────────────────
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

if (!MONGODB_URI || !VOYAGE_API_KEY) {
  console.error('❌ Missing MONGODB_URI or VOYAGE_API_KEY');
  process.exit(1);
}

const query = process.argv[2] || 'What is vai?';

async function embedQuery(text) {
  console.log(`\n🧠 Embedding query with voyage-4-lite: "${text}"`);
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'voyage-4-lite',
      input: [text],
      input_type: 'query',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Voyage error (${res.status}): ${err}`);
  }

  const data = await res.json();
  console.log(`   ✅ Got ${data.data[0].embedding.length}-dim vector (${data.usage.total_tokens} tokens)`);
  return data.data[0].embedding;
}

async function main() {
  const queryEmbedding = await embedQuery(query);

  console.log(`\n🔍 Searching MongoDB Atlas Vector Search...`);
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const collection = client.db(DB_NAME).collection('rag_documents');

  const results = await collection.aggregate([
    {
      $vectorSearch: {
        index: 'personal_brand_vector',
        path: 'embedding',
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit: 5,
      },
    },
    {
      $addFields: { score: { $meta: 'vectorSearchScore' } },
    },
    {
      $project: {
        content: 1,
        score: 1,
        'source.title': 1,
        'source.category': 1,
        embedding: 0,
      },
    },
  ]).toArray();

  console.log(`   Found ${results.length} results\n`);

  for (const [i, r] of results.entries()) {
    console.log(`${'─'.repeat(60)}`);
    console.log(`📄 Result ${i + 1}: ${r.source?.title} (${r.source?.category})`);
    console.log(`   Score: ${r.score.toFixed(4)}`);
    console.log(`   Content preview: ${r.content.slice(0, 200)}...`);
  }

  console.log(`\n${'═'.repeat(60)}`);
  const totalDocs = await collection.countDocuments();
  console.log(`📊 Collection has ${totalDocs} total documents`);

  await client.close();
}

main().catch(err => {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
});
