import { getCollection } from './mongodb';

const VOYAGE_API_URL = 'https://api.voyageai.com/v1/embeddings';
const SCORE_THRESHOLD = 0.45;
const MAX_RESULTS = 5;

/**
 * Embed a query using voyage-4-lite (asymmetric: lighter model for queries).
 * Documents were embedded with voyage-4-large — same 1024-dim space.
 */
export async function embedQuery(text) {
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) {
    throw new Error('VOYAGE_API_KEY environment variable is not set');
  }

  const response = await fetch(VOYAGE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'voyage-4-lite',
      input: [text],
      input_type: 'query',
    }),
  });

  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error');
    throw new Error(`Voyage API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Retrieve relevant context chunks from MongoDB Atlas Vector Search.
 *
 * Asymmetric retrieval: Documents were embedded once with voyage-4-large
 * (rich, high-quality vectors). Queries are embedded per-request with
 * voyage-4-lite (fast, cheap). Compatible because the entire Voyage 4
 * family shares a single 1024-dimensional embedding space.
 */
export async function retrieveContext(queryText, options = {}) {
  const {
    maxResults = MAX_RESULTS,
    scoreThreshold = SCORE_THRESHOLD,
    category = null,
  } = options;

  const queryEmbedding = await embedQuery(queryText);
  const collection = await getCollection('rag_documents');

  // Build the $vectorSearch pipeline stage
  const vectorSearchStage = {
    $vectorSearch: {
      index: 'personal_brand_vector',
      path: 'embedding',
      queryVector: queryEmbedding,
      numCandidates: maxResults * 10,
      limit: maxResults * 2, // over-fetch, then filter by score
    },
  };

  // Add category filter if specified
  if (category) {
    vectorSearchStage.$vectorSearch.filter = {
      'source.category': category,
    };
  }

  const pipeline = [
    vectorSearchStage,
    {
      $addFields: {
        score: { $meta: 'vectorSearchScore' },
      },
    },
    {
      $match: {
        score: { $gte: scoreThreshold },
      },
    },
    {
      $limit: maxResults,
    },
    {
      $project: {
        content: 1,
        score: 1,
        'source.title': 1,
        'source.category': 1,
        'source.filePath': 1,
        'chunk.index': 1,
      },
    },
  ];

  const results = await collection.aggregate(pipeline).toArray();

  // Server-side debug logging
  if (results.length > 0) {
    console.log(`[RAG] Query: "${queryText.substring(0, 60)}..." → ${results.length} results`);
    results.forEach((r, i) => {
      console.log(`  [${i + 1}] score=${r.score.toFixed(3)} category=${r.source?.category} title="${r.source?.title}"`);
    });
  } else {
    console.log(`[RAG] Query: "${queryText.substring(0, 60)}..." → 0 results (threshold: ${scoreThreshold})`);
  }

  return results;
}

/**
 * Format retrieved results into a context block for the system prompt.
 */
export function formatContext(results) {
  if (!results || results.length === 0) {
    return '';
  }

  const contextBlocks = results.map((r, i) => {
    const source = r.source?.title || r.source?.filePath || 'Unknown';
    const category = r.source?.category || 'general';
    return `[Source ${i + 1}: ${source} (${category}, relevance: ${r.score.toFixed(2)})]
${r.content}`;
  });

  return `## Retrieved Context

The following excerpts were retrieved from Michael Lynn's content based on the user's question. Use these to ground your answer with specific, accurate details. Cite the source titles when referencing specific information.

${contextBlocks.join('\n\n---\n\n')}`;
}
