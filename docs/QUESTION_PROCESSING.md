# Question Processing Flow

## Overview

The MongoDB AI Lab Assistant uses a sophisticated question processing system that prioritizes efficiency by checking existing answers before falling back to RAG (Retrieval Augmented Generation). This document outlines the complete flow of how questions are processed through the system.

## Database Collections

The system uses several MongoDB collections to manage questions and answers:

```javascript
// Questions Collection (Answered Questions)
{
  question: String,              // Original question text
  question_embedding: [Number],  // Vector embedding of the question
  retrieved_chunks: [{          // Relevant document chunks used
    document_id: ObjectId,
    chunk_index: Number,
    relevance_score: Number
  }],
  response: String,             // Generated answer
  created_at: Date,            // When the question was asked
  metadata: {
    category: String,          // Question category/topic
    tags: [String],           // Relevant tags
    feedback: {               // User feedback
      helpful: Boolean,
      comments: String
    }
  }
}

// Unanswered Questions Collection
{
  question: String,            // Original question text
  question_embedding: [Number], // Vector embedding of the question
  created_at: Date,           // When the question was asked
  attempts: Number,           // Number of processing attempts
  status: String,             // Processing status
  error: String,              // Any error messages
  metadata: {
    category: String,         // Question category/topic
    tags: [String],          // Relevant tags
    priority: Number         // Processing priority
  }
}
```

## Processing Flow

1. **Initial Question Reception**
   - Question is received through the API
   - Basic validation and sanitization is performed
   - Question is embedded using the same embedding model as the knowledge base

2. **Question Matching Process**
   ```mermaid
   flowchart TD
       Q[New Question] --> VS[Vector Search]
       VS --> Match{Similar Question Found?}
       Match -->|Yes| Score{Similarity Score > 0.85?}
       Score -->|Yes| Cached[Cached Answer]
       Score -->|No| RAG[RAG Search]
       Match -->|No| RAG
       Cached --> Response[Final Response]
       RAG --> Response
   ```

3. **Vector Search Phase**
   - The question's embedding is used to search the Questions collection
   - Uses MongoDB Atlas Vector Search with a similarity threshold
   - If a similar question is found with high confidence (>0.85), the cached answer is returned
   - If no similar question is found or confidence is low, proceeds to RAG

4. **RAG Processing**
   - If no cached answer is found, the system:
     1. Searches the document chunks using vector similarity
     2. Retrieves the most relevant chunks
     3. Uses the chunks as context for the LLM
     4. Generates a new response

5. **Answer Storage**
   - New answers are stored in the Questions collection
   - Includes:
     - Original question and embedding
     - Retrieved chunks used
     - Generated response
     - Metadata and timestamps

6. **Error Handling**
   - Failed questions are stored in the Unanswered Questions collection
   - Includes error details and processing attempts
   - Can be reviewed and processed manually if needed

## Performance Optimizations

1. **Caching Strategy**
   - Questions and answers are cached at multiple levels:
     - In-memory cache for frequent questions
     - MongoDB cache for all answered questions
     - Vector search index for quick similarity matching

2. **Batch Processing**
   - Similar questions are processed in batches
   - Embeddings are computed in parallel
   - Vector searches are optimized using indexes

3. **Fallback Mechanisms**
   - If RAG fails, system attempts:
     1. Retrieve similar questions with lower similarity threshold
     2. Use cached chunks from similar questions
     3. Generate response with reduced context
     4. Log to Unanswered Questions collection

## Monitoring and Analytics

The system tracks:
- Question processing times
- Cache hit rates
- RAG usage statistics
- Error rates and types
- User feedback and satisfaction

This data is used to:
- Optimize similarity thresholds
- Improve caching strategies
- Identify common failure points
- Enhance response quality
