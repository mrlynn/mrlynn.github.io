// src/app/api/generate-diagram/route.js
import { NextResponse } from 'next/server';
import { rateLimiter } from '../../../lib/rateLimit';
import { cookies } from 'next/headers';

// Check for OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to validate Mermaid syntax
const validateMermaidSyntax = (code) => {
  // Remove any markdown code block markers and 'mermaid' keyword
  const cleanCode = code
    .replace(/^```mermaid\n/g, '')
    .replace(/^```\n/g, '')
    .replace(/\n```$/g, '')
    .replace(/^mermaid\n/g, '')  // Remove 'mermaid' keyword if present
    .trim();

  // Check for invalid style definitions
  const invalidStylePattern = /style\s+\w+\s+fill:[^,]+/;
  if (invalidStylePattern.test(cleanCode)) {
    throw new Error('Invalid style syntax detected. Use classDef instead of direct style definitions.');
  }

  // Check for invalid classDef syntax in ER diagrams
  if (cleanCode.startsWith('erDiagram')) {
    // Split the code into sections
    const lines = cleanCode.split('\n').map(line => line.trim()).filter(line => line);
    
    // Find the first classDef line
    const firstClassDefIndex = lines.findIndex(line => line.startsWith('classDef'));
    
    // Find the first entity definition line
    const firstEntityIndex = lines.findIndex(line => line.includes('||--'));
    
    // Check if classDef comes before entity definitions
    if (firstClassDefIndex > firstEntityIndex) {
      throw new Error('In ER diagrams, classDef statements must come before entity definitions. Move all classDef and class statements to the top of the diagram.');
    }

    // Check for any classDef that doesn't match the exact format
    const classDefLines = lines.filter(line => line.startsWith('classDef'));
    for (const line of classDefLines) {
      const isValidFormat = /^classDef\s+\w+\s+fill:#[0-9a-fA-F]{6},stroke:#[0-9a-fA-F]{6},stroke-width:2px$/.test(line);
      if (!isValidFormat) {
        throw new Error(`Invalid classDef syntax in ER diagram. Line: "${line}". Use the exact format: classDef styleName fill:#color,stroke:#color,stroke-width:2px`);
      }
    }

    // Check for relationship names with spaces
    const relationshipLines = lines.filter(line => line.includes('||--'));
    for (const line of relationshipLines) {
      if (line.includes('"') && line.includes('" : ')) {
        throw new Error('Relationship names with spaces should use underscores instead of quotes. For example, use "part_of" instead of "part of".');
      }
    }
  }

  return cleanCode;
};

export async function POST(request) {
  try {
    // Get a unique identifier for the user (using a cookie)
    const cookieStore = cookies();
    let userId = cookieStore.get('diagram_user_id')?.value;

    // If no user ID exists, create one
    if (!userId) {
      userId = Math.random().toString(36).substring(2);
      cookieStore.set('diagram_user_id', userId, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    // Check rate limit
    if (rateLimiter.isRateLimited(userId)) {
      const remainingTime = rateLimiter.getResetTime(userId) - Date.now();
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          remainingTime,
          remainingRequests: 0,
        },
        { status: 429 }
      );
    }

    // Get the request body
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
          instructions += 'Define entities with attributes and relationships with proper cardinality. For ER diagrams, use ONLY the exact classDef syntax shown in the example. The classDef lines must match the format exactly, including the hex color codes and stroke-width property. IMPORTANT: Place all classDef and class statements at the top of the diagram, before any entity definitions.';
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

IMPORTANT: Follow these guidelines strictly:
1. Ensure the diagram is clear, focused, and visually well-organized
2. Use proper Mermaid syntax and formatting
3. For styling, ONLY use classDef and class syntax:
   - First define styles: classDef styleName fill:#color,stroke:#color,stroke-width:2px
   - Then apply styles: class nodeName styleName
4. NEVER use direct style definitions with colons
5. Keep the diagram size manageable (not too many elements)
6. Return only the Mermaid diagram code without backticks, language markers, or the 'mermaid' keyword
7. Use proper spacing and line breaks between style definitions
8. For ER diagrams, use ONLY the exact classDef syntax shown in the example
9. Use 6-digit hex color codes (e.g., #74c0fc) for all colors
10. For ER diagrams, place ALL classDef and class statements at the TOP of the diagram, before any entity definitions

Example of correct syntax:
\`\`\`mermaid
flowchart LR
    A[Start] --> B[Process]
    B --> C[End]
    
    classDef default fill:#f9f9f9,stroke:#333333,stroke-width:2px
    classDef process fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    classDef start fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    classDef end fill:#fce4ec,stroke:#e91e63,stroke-width:2px
    
    class A start
    class B process
    class C end
\`\`\`

Example of ER diagram with correct syntax:
\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#74c0fc', 'primaryTextColor': '#000000', 'primaryBorderColor': '#74c0fc', 'lineColor': '#74c0fc', 'secondaryColor': '#f0f9ff', 'tertiaryColor': '#ffffff'}}}%%
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : part_of
    
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int id
        date created_at
    }
    ORDER_ITEM {
        int quantity
        float price
    }
    PRODUCT {
        int id
        string name
        float price
    }
\`\`\`

Respond ONLY with the Mermaid diagram code and nothing else. Do not include any explanations, additional text, backticks, language markers, or the 'mermaid' keyword.
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
            content: 'You are a diagram generator specialized in creating Mermaid diagrams from natural language descriptions. Create valid Mermaid diagram code based on the user prompt. Use ONLY classDef and class syntax for styling. Never use direct style definitions with colons. For ER diagrams, use ONLY the exact classDef syntax shown in the example, including the exact format for colors (6-digit hex) and stroke-width property. IMPORTANT: Place all classDef and class statements at the top of ER diagrams, before any entity definitions. Return ONLY the diagram code without any markdown formatting, backticks, language markers, or the "mermaid" keyword.'
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

    // Validate and clean the code
    const cleanedMermaidCode = validateMermaidSyntax(mermaidCode);

    // Return success response with remaining requests
    return NextResponse.json({
      success: true,
      mermaidCode: cleanedMermaidCode,
      remainingRequests: rateLimiter.getRemainingRequests(userId),
      resetTime: rateLimiter.getResetTime(userId),
    });
  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json(
      { error: 'Failed to generate diagram' },
      { status: 500 }
    );
  }
}