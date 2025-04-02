import { MongoClient } from 'mongodb';

/**
 * Analyzes a field to determine its type and potential relationships
 */
const analyzeField = (fieldValue) => {
  if (fieldValue === null) return { type: 'null' };
  
  const type = typeof fieldValue;
  
  if (type === 'object') {
    if (Array.isArray(fieldValue)) {
      const sampleItem = fieldValue[0];
      return {
        type: 'array',
        itemType: sampleItem ? analyzeField(sampleItem) : { type: 'unknown' }
      };
    }
    
    if (fieldValue instanceof Date) return { type: 'date' };
    
    // Check for ObjectId references
    if (fieldValue._bsontype === 'ObjectID') {
      return { type: 'objectId', isReference: true };
    }
    
    // Handle embedded documents
    return {
      type: 'object',
      fields: Object.entries(fieldValue).reduce((acc, [key, value]) => {
        acc[key] = analyzeField(value);
        return acc;
      }, {})
    };
  }
  
  return { type };
};

/**
 * Analyzes a collection to extract schema and relationship information
 */
const analyzeCollection = async (collection, sampleSize = 100) => {
  const schema = {};
  const relationships = [];
  
  // Sample documents for analysis
  const samples = await collection.aggregate([{ $sample: { size: sampleSize } }]).toArray();
  
  // Analyze each sample document
  samples.forEach(doc => {
    Object.entries(doc).forEach(([fieldName, value]) => {
      if (!schema[fieldName]) {
        const analysis = analyzeField(value);
        schema[fieldName] = analysis;
        
        // Detect potential relationships
        if (analysis.isReference || 
            fieldName.endsWith('Id') || 
            fieldName.endsWith('_id') ||
            (analysis.type === 'array' && analysis.itemType.isReference)) {
          relationships.push({
            from: collection.collectionName,
            field: fieldName,
            type: analysis.type === 'array' ? 'many' : 'one',
            through: analysis.type === 'array' ? analysis.itemType.type : analysis.type
          });
        }
      }
    });
  });
  
  return { schema, relationships };
};

/**
 * Main introspection function
 */
export const introspectDatabase = async (uri, dbName, options = {}) => {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    
    // Analyze each collection
    const metadata = await Promise.all(
      collections.map(async (collInfo) => {
        const collection = db.collection(collInfo.name);
        const analysis = await analyzeCollection(collection, options.sampleSize);
        
        return {
          name: collInfo.name,
          ...analysis
        };
      })
    );
    
    // Cross-reference relationships
    const enhancedMetadata = metadata.map(collection => {
      const resolvedRelationships = collection.relationships.map(rel => {
        // Try to find the target collection based on naming conventions
        const targetCollection = metadata.find(c => 
          c.name.toLowerCase() === rel.field.replace(/(_?id[s]?$)/i, '').toLowerCase() ||
          c.name.toLowerCase() === rel.field.replace(/(ref[s]?$)/i, '').toLowerCase()
        );
        
        if (targetCollection) {
          return {
            ...rel,
            to: targetCollection.name
          };
        }
        return rel;
      });
      
      return {
        ...collection,
        relationships: resolvedRelationships
      };
    });
    
    return enhancedMetadata;
  } finally {
    await client.close();
  }
};

/**
 * Compares two database schemas
 */
export const compareDatabases = async (uri1, db1, uri2, db2) => {
  const [metadata1, metadata2] = await Promise.all([
    introspectDatabase(uri1, db1),
    introspectDatabase(uri2, db2)
  ]);
  
  const comparison = {
    collections: {
      added: metadata2.filter(col => !metadata1.find(c => c.name === col.name)).map(c => c.name),
      removed: metadata1.filter(col => !metadata2.find(c => c.name === col.name)).map(c => c.name),
      modified: []
    },
    relationships: {
      added: [],
      removed: [],
      modified: []
    }
  };
  
  // Compare collections that exist in both databases
  metadata1.forEach(col1 => {
    const col2 = metadata2.find(c => c.name === col1.name);
    if (col2) {
      const changes = compareSchemas(col1.schema, col2.schema);
      if (changes.length > 0) {
        comparison.collections.modified.push({
          collection: col1.name,
          changes
        });
      }
    }
  });
  
  return comparison;
};

/**
 * Helper function to compare two schemas
 */
const compareSchemas = (schema1, schema2) => {
  const changes = [];
  
  // Check for added fields
  Object.keys(schema2).forEach(field => {
    if (!schema1[field]) {
      changes.push({ type: 'added', field, details: schema2[field] });
    }
  });
  
  // Check for removed fields
  Object.keys(schema1).forEach(field => {
    if (!schema2[field]) {
      changes.push({ type: 'removed', field, details: schema1[field] });
    }
  });
  
  // Check for modified fields
  Object.keys(schema1).forEach(field => {
    if (schema2[field] && JSON.stringify(schema1[field]) !== JSON.stringify(schema2[field])) {
      changes.push({
        type: 'modified',
        field,
        details: {
          from: schema1[field],
          to: schema2[field]
        }
      });
    }
  });
  
  return changes;
}; 