import { NextResponse } from 'next/server';
import { introspectDatabase, compareDatabases } from '../../../lib/mongoIntrospector';
import { generateMermaidDiagram, generateComparisonDiagram, generateFocusedDiagram } from '../../../lib/mermaidGenerator';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action) {
      case 'introspect': {
        const { uri, dbName, options } = params;
        if (!uri || !dbName) {
          return NextResponse.json(
            { error: 'MongoDB URI and database name are required' },
            { status: 400 }
          );
        }

        const metadata = await introspectDatabase(uri, dbName, options);
        const mermaidCode = generateMermaidDiagram(metadata);
        
        return NextResponse.json({ metadata, mermaidCode });
      }

      case 'compare': {
        const { uri1, db1, uri2, db2 } = params;
        if (!uri1 || !db1 || !uri2 || !db2) {
          return NextResponse.json(
            { error: 'Both database URIs and names are required' },
            { status: 400 }
          );
        }

        const [metadata1, metadata2] = await Promise.all([
          introspectDatabase(uri1, db1),
          introspectDatabase(uri2, db2)
        ]);

        const comparison = await compareDatabases(uri1, db1, uri2, db2);
        const mermaidCode = generateComparisonDiagram(metadata1, metadata2);
        
        return NextResponse.json({ comparison, mermaidCode });
      }

      case 'focus': {
        const { uri, dbName, collection } = params;
        if (!uri || !dbName || !collection) {
          return NextResponse.json(
            { error: 'MongoDB URI, database name, and collection name are required' },
            { status: 400 }
          );
        }

        const metadata = await introspectDatabase(uri, dbName);
        const mermaidCode = generateFocusedDiagram(metadata, collection);
        
        if (!mermaidCode) {
          return NextResponse.json(
            { error: 'Collection not found' },
            { status: 404 }
          );
        }
        
        return NextResponse.json({ mermaidCode });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 