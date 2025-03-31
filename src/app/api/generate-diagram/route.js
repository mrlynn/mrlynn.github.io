// src/app/api/generate-diagram/route.js
import { NextResponse } from 'next/server';

// Check for OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // Parse request body
    const { prompt, diagramType } = await request.json();

    if (!prompt || prompt.trim() === '') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Create base instructions based on diagram type
    let instructions = '';
    
    if (diagramType) {
      instructions = `Create a Mermaid diagram of type '${diagramType}' based on the following description. `;
      
      // Add specific instructions for each diagram type
      switch (diagramType) {
        case 'flowchart':
          instructions += 'Use proper flowchart syntax with nodes, edges, and appropriate directional indicators (TB, LR, etc.).';
          break;
        case 'sequenceDiagram':
          instructions += 'Include actors, messages, and optional notes in the sequence diagram.';
          break;
        case 'classDiagram':
          instructions += 'Define classes with attributes, methods, and relationships (inheritance, composition, etc.).';
          break;
        case 'erDiagram':
          instructions += 'Define entities with attributes and relationships with proper cardinality.';
          break;
        case 'gantt':
          instructions += 'Include sections, tasks with durations, and dependencies where appropriate.';
          break;
        case 'stateDiagram':
          instructions += 'Define states, transitions, and any nested states if needed.';
          break;
        case 'pie':
          instructions += 'Define the sections and their values.';
          break;
        default:
          // No specific instructions for unknown types
          break;
      }
    } else {
      instructions = 'Create an appropriate Mermaid diagram based on the following description. Choose the most suitable diagram type from flowchart, sequenceDiagram, classDiagram, erDiagram, gantt, stateDiagram, or pie.';
    }

    // Create the full prompt with instructions and examples
    const fullPrompt = `
${instructions}

Description: "${prompt}"

Follow these guidelines:
1. Ensure the diagram is clear, focused, and visually well-organized
2. Use proper Mermaid syntax and formatting
3. Add appropriate styling for clarity (colors, shapes, etc. where useful)
4. Keep the diagram size manageable (not too many elements)
5. Return only the Mermaid code without backticks or language markers

Respond ONLY with the Mermaid diagram code and nothing else.
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a diagram generator specialized in creating Mermaid diagrams from natural language descriptions. Create valid Mermaid diagram code based on the user prompt. Include appropriate styling to enhance clarity.'
          },
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Error generating diagram from OpenAI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const mermaidCode = data.choices[0].message.content.trim();

    // Clean up the code if it has markdown code block markers
    const cleanedMermaidCode = mermaidCode
      .replace(/^```mermaid\n/g, '')
      .replace(/^```\n/g, '')
      .replace(/\n```$/g, '')
      .trim();

    return NextResponse.json({ mermaidCode: cleanedMermaidCode });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}