// src/app/tools/diagram-generator/page.js
'use client';

import { Box, Container, Typography, Divider, Paper, Grid, Tab, Tabs, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import DiagramGenerator from '../../../components/mdx/includes/DiagramGenerator';
import PageHeader from '../../../components/PageHeader';
import { 
  AccountTree as FlowchartIcon,
  SwapHoriz as SequenceIcon,
  ViewModule as ClassIcon,
  Storage as ERDIcon,
  DateRange as GanttIcon,
  ToggleOn as StateIcon,
  PieChart as PieIcon,
  Code as CodeIcon,
  AutoAwesome as AIIcon
} from '@mui/icons-material';
import MermaidDiagram from '../../../components/mdx/includes/MermaidDiagram';

// Add html-to-image to package.json dependencies
// npm install html-to-image

export default function DiagramGeneratorPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Example diagrams for each type
  const diagramExamples = [
    {
      type: 'flowchart',
      title: 'Flowchart',
      icon: <FlowchartIcon />,
      description: 'Flowcharts visualize processes and decision flows.',
      code: `
flowchart TD
    Start([Start]) --> Auth{Authenticated?}
    Auth -->|Yes| Dashboard[Dashboard]
    Auth -->|No| Login[Login Page]
    Login --> Credentials{Valid?}
    Credentials -->|Yes| Dashboard
    Credentials -->|No| Login
    Dashboard --> Logout([End])
      `,
    },
    {
      type: 'sequenceDiagram',
      title: 'Sequence Diagram',
      icon: <SequenceIcon />,
      description: 'Sequence diagrams show interactions between components over time.',
      code: `
sequenceDiagram
    participant User
    participant API
    participant DB
    User->>API: Request Data
    activate API
    API->>DB: Query Data
    activate DB
    DB-->>API: Return Results
    deactivate DB
    API-->>User: Response
    deactivate API
      `,
    },
    {
      type: 'classDiagram',
      title: 'Class Diagram',
      icon: <ClassIcon />,
      description: 'Class diagrams show structure, relationships, and attributes.',
      code: `
classDiagram
    class User {
        +String username
        +String email
        +login()
        +logout()
    }
    class Post {
        +String title
        +String content
        +Date created
        +publish()
    }
    User "1" --> "*" Post: creates
      `,
    },
    {
      type: 'erDiagram',
      title: 'Entity Relationship',
      icon: <ERDIcon />,
      description: 'ER diagrams visualize database entities and relationships.',
      code: `
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int id
        date created_at
    }
      `,
    },
    {
      type: 'gantt',
      title: 'Gantt Chart',
      icon: <GanttIcon />,
      description: 'Gantt charts display project schedules and timelines.',
      code: `
gantt
    title Project Schedule
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :a1, 2023-01-01, 10d
    Design          :a2, after a1, 15d
    section Development
    Implementation  :a3, after a2, 25d
    Testing         :a4, after a3, 10d
      `,
    },
    {
      type: 'stateDiagram',
      title: 'State Diagram',
      icon: <StateIcon />,
      description: 'State diagrams show the different states of a system.',
      code: `
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Start
    Processing --> Success: Complete
    Processing --> Error: Fail
    Success --> Idle: Reset
    Error --> Idle: Reset
    Idle --> [*]: Exit
      `,
    },
    {
      type: 'pie',
      title: 'Pie Chart',
      icon: <PieIcon />,
      description: 'Pie charts visualize proportions and percentages.',
      code: `
pie
    title Market Share
    "Company A" : 45
    "Company B" : 30
    "Company C" : 15
    "Others" : 10
      `,
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <PageHeader
        title="AI Diagram Generator"
        subtitle="Create beautiful Mermaid diagrams from natural language descriptions"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Generate Diagrams with AI
          </Typography>
          <Typography variant="body1" paragraph>
            Describe the diagram you want to create in plain English, and our AI will generate a Mermaid diagram for you.
            You can download your diagram as SVG or PNG, or copy the Mermaid code to use in your own projects.
          </Typography>
          <Divider sx={{ my: 3 }} />
        </Box>
        
        <DiagramGenerator />
        
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Diagram Types & Examples
          </Typography>
          
          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="diagram types tabs"
            >
              {diagramExamples.map((example) => (
                <Tab 
                  key={example.type}
                  label={example.title} 
                  icon={example.icon} 
                  iconPosition="start"
                />
              ))}
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {diagramExamples.map((example, index) => (
                <div key={example.type} style={{ display: tabValue === index ? 'block' : 'none' }}>
                  <Typography variant="h6" gutterBottom>
                    {example.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {example.description}
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Mermaid Code:
                        </Typography>
                        <Box
                          component="pre"
                          sx={{
                            p: 2,
                            bgcolor: 'background.default',
                            borderRadius: 1,
                            overflow: 'auto',
                            fontSize: '0.8rem',
                            height: 'calc(100% - 40px)',
                          }}
                        >
                          <code>{example.code.trim()}</code>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Rendered Diagram:
                        </Typography>
                        <Box sx={{ 
                          bgcolor: 'white', 
                          p: 2, 
                          borderRadius: 1,
                          minHeight: '200px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <MermaidDiagram chart={example.code.trim()} />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Box>
          </Paper>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Tips for Great Diagrams
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Be specific about diagram type" 
                      secondary="Mention if you want a flowchart, sequence diagram, etc." 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Describe key components" 
                      secondary="List the main elements and their relationships" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Provide context" 
                      secondary="Explain what process or system the diagram represents" 
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Specify layout direction" 
                      secondary="Mention if you prefer top-to-bottom or left-to-right" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Keep it focused" 
                      secondary="Target a single concept or process per diagram" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Request styling" 
                      secondary="Ask for colors, shapes, or other visual enhancements" 
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Using Your Diagrams
            </Typography>
            <Typography variant="body1" paragraph>
              Once you've generated a diagram, you can:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Copy the Mermaid code" 
                  secondary="Use it in Markdown files, documentation, or any platform that supports Mermaid" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Download as SVG or PNG" 
                  secondary="Include in presentations, documents, or websites" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Modify the code" 
                  secondary="Customize the generated diagram by editing the Mermaid code to add more details or styling" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Share with your team" 
                  secondary="Use in documentation, presentations, or technical discussions" 
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              About Mermaid
            </Typography>
            <Typography variant="body1" paragraph>
              Mermaid is a JavaScript-based diagramming and charting tool that renders Markdown-inspired text definitions to create diagrams.
              It's widely supported in documentation platforms, Markdown editors, and development environments.
            </Typography>
            <Typography variant="body1" paragraph>
              Mermaid makes it easy to generate diagrams and flowcharts from text, similar to how Markdown makes it easy to generate formatted documents.
              This text-to-diagram approach makes it easy to maintain diagrams as part of documentation or codebase.
            </Typography>
            <Typography variant="body1">
              Some of the key benefits of Mermaid include:
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Version Control Friendly" 
                      secondary="Track diagram changes in Git since they're just text" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Wide Platform Support" 
                      secondary="Works in GitHub, GitLab, Notion, VS Code, and more" 
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Easy to Learn" 
                      secondary="Simple syntax that's quick to pick up" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Multiple Diagram Types" 
                      secondary="Create flowcharts, sequence diagrams, class diagrams, and more" 
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Learn more about Mermaid syntax at the{' '}
              <a 
                href="https://mermaid.js.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'inherit', fontWeight: 'bold', textDecoration: 'underline' }}
              >
                official Mermaid documentation
              </a>.
            </Typography>
          </Paper>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Integrating With Your Projects
            </Typography>
            <Typography variant="body1" paragraph>
              Generated diagrams can be integrated into various project types:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Documentation
                  </Typography>
                  <Typography variant="body2">
                    Include diagrams in technical documentation, user guides, or API docs to visually explain complex concepts.
                    Mermaid is supported by many documentation platforms like Docusaurus, VuePress, and MkDocs.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Markdown Files
                  </Typography>
                  <Typography variant="body2">
                    Add diagrams to README files, wikis, and other markdown documents on GitHub, GitLab, or Bitbucket.
                    Many platforms now natively support Mermaid in markdown.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Presentations
                  </Typography>
                  <Typography variant="body2">
                    Export diagrams as SVG or PNG and include them in slides for presentations.
                    Visuals help make complex topics more accessible to audiences.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Architecture Documentation
                  </Typography>
                  <Typography variant="body2">
                    Maintain system architecture diagrams as code, making them easy to update as your system evolves.
                    This ensures documentation stays in sync with implementation.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Blogs and Articles
                  </Typography>
                  <Typography variant="body2">
                    Enhance your technical blog posts with clear visual diagrams to illustrate processes, architectures, or algorithms.
                    Export as image files to embed anywhere.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Interactive Documentation
                  </Typography>
                  <Typography variant="body2">
                    Embed the Mermaid code directly in your web-based documentation for interactive diagrams that can be styled to match your site's theme.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}