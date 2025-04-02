/**
 * Converts a MongoDB schema type to an ERD-friendly type
 */
const convertType = (fieldInfo) => {
  if (fieldInfo.type === 'array') {
    const itemType = convertType(fieldInfo.itemType);
    return `${itemType}[]`;
  }
  if (fieldInfo.type === 'object' && fieldInfo.fields) {
    return 'object';
  }
  if (fieldInfo.type === 'objectId') {
    return 'ObjectId';
  }
  return fieldInfo.type.toLowerCase();
};

/**
 * Generates field definitions for a collection
 */
const generateFields = (schema) => {
  return Object.entries(schema)
    .map(([fieldName, fieldInfo]) => {
      const type = convertType(fieldInfo);
      return `    ${fieldName} ${type}`;
    })
    .join('\n');
};

/**
 * Generates relationship lines for the ERD
 */
const generateRelationships = (relationships) => {
  return relationships
    .filter(rel => rel.to && rel.from) // Only include relationships with valid source and target
    .map(rel => {
      const arrow = rel.type === 'many' ? '}o--||' : 'o--||';
      return `    "${rel.from}" ${arrow} "${rel.to}" : "${rel.field}"`;
    })
    .join('\n');
};

/**
 * Generates a Mermaid ERD diagram from database metadata
 */
export const generateMermaidDiagram = (metadata) => {
  // Generate entity definitions
  const collections = metadata.map(coll => `
    entity "${coll.name}" {
${generateFields(coll.schema)}
    }`).join('\n');

  // Generate relationships
  const relationships = metadata
    .flatMap(coll => coll.relationships)
    .filter((rel, index, self) => 
      index === self.findIndex(r => 
        r.from === rel.from && 
        r.to === rel.to && 
        r.field === rel.field && 
        rel.to !== undefined // Additional check for valid target
      )
    );

  return `erDiagram
${collections}

${generateRelationships(relationships)}`;
};

/**
 * Generates a comparison diagram highlighting changes between two schemas
 */
export const generateComparisonDiagram = (metadata1, metadata2) => {
  const collections1 = new Set(metadata1.map(c => c.name));
  const collections2 = new Set(metadata2.map(c => c.name));
  
  // Helper to generate collection styling
  const getCollectionStyle = (name) => {
    if (!collections1.has(name)) return ' %% Added';
    if (!collections2.has(name)) return ' %% Removed';
    return '';
  };

  // Generate collections with change annotations
  const collections = Array.from(new Set([...collections1, ...collections2]))
    .map(name => {
      const coll1 = metadata1.find(c => c.name === name);
      const coll2 = metadata2.find(c => c.name === name);
      
      if (!coll1) {
        // New collection
        return `
entity ${name} {
${generateFields(coll2.schema)}
}${getCollectionStyle(name)}`;
      }
      
      if (!coll2) {
        // Removed collection
        return `
entity ${name} {
${generateFields(coll1.schema)}
}${getCollectionStyle(name)}`;
      }
      
      // Modified collection
      const allFields = new Set([
        ...Object.keys(coll1.schema),
        ...Object.keys(coll2.schema)
      ]);
      
      const fields = Array.from(allFields)
        .map(field => {
          const field1 = coll1.schema[field];
          const field2 = coll2.schema[field];
          
          if (!field1) return `    ${field} ${convertType(field2)} %% Added`;
          if (!field2) return `    ${field} ${convertType(field1)} %% Removed`;
          
          const type1 = convertType(field1);
          const type2 = convertType(field2);
          if (type1 !== type2) {
            return `    ${field} ${type2} %% Changed from ${type1}`;
          }
          
          return `    ${field} ${type1}`;
        })
        .join('\n');
      
      return `
entity ${name} {
${fields}
}`;
    })
    .join('\n');

  // Generate relationships with change annotations
  const allRelationships = [
    ...metadata1.flatMap(coll => coll.relationships.map(rel => ({...rel, source: 'old'}))),
    ...metadata2.flatMap(coll => coll.relationships.map(rel => ({...rel, source: 'new'}))),
  ];
  
  const relationships = allRelationships
    .filter((rel, index, self) => 
      index === self.findIndex(r => 
        r.from === rel.from && r.to === rel.to && r.field === rel.field
      )
    )
    .map(rel => {
      const arrow = rel.type === 'many' ? '}o--||' : 'o--||';
      const style = rel.source === 'new' ? ' %% Added' : '';
      return `${rel.from} ${arrow} ${rel.to} : "${rel.field}"${style}`;
    })
    .join('\n');

  return `erDiagram
${collections}

${relationships}

%% Legend
%% Added - New in second schema
%% Removed - Only in first schema
%% Changed - Modified between schemas`;
};

/**
 * Generates a focused diagram for a specific collection and its relationships
 */
export const generateFocusedDiagram = (metadata, focusCollection) => {
  const collection = metadata.find(c => c.name === focusCollection);
  if (!collection) return null;
  
  // Get all directly related collections
  const relatedCollections = new Set(
    collection.relationships
      .filter(rel => rel.to)
      .map(rel => rel.to)
  );
  
  // Add collections that reference our focus collection
  metadata.forEach(coll => {
    coll.relationships.forEach(rel => {
      if (rel.to === focusCollection) {
        relatedCollections.add(coll.name);
      }
    });
  });
  
  // Generate diagram with focus collection and related collections
  const collections = [
    collection,
    ...metadata.filter(c => relatedCollections.has(c.name))
  ];
  
  return generateMermaidDiagram(collections);
}; 