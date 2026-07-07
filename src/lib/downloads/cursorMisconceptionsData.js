export const CURSOR_MISCONCEPTIONS_PDF = {
  title: '5 Things People Get Wrong About Cursor',
  subtitle: 'Myth vs. Reality - a skeptic\'s cheat sheet',
  author: 'Michael Lynn',
  siteUrl: 'https://mlynn.org',
  articleUrl: 'https://mlynn.org/blog/cursor-misconceptions',
  meetUrl: 'https://mlynn.org/meet',
  linkedInUrl: 'https://linkedin.com/in/mlynn',
  experiment:
    'Give Agent Mode one scoped task. Read the diff. Don\'t merge blind.',
  myths: [
    {
      number: '01',
      myth: 'It\'s just VS Code with Copilot bolted on',
      reality:
        'A fork rebuilt around AI - whole-codebase indexing, unified context, multi-file agents.',
      remember:
        'Familiar UI doesn\'t mean familiar architecture.',
    },
    {
      number: '02',
      myth: 'AI-assisted coding means unreviewed garbage in production',
      reality:
        'Privacy Mode, ask-before-terminal, PR gates - you\'re still the reviewer.',
      remember:
        'Cursor makes you faster. It doesn\'t remove the need to read code.',
    },
    {
      number: '03',
      myth: 'It\'s just autocomplete',
      reality:
        'Agent Mode plans, edits across files, runs commands, and waits for your approval.',
      remember:
        'Tab is where you start. Agent Mode is where the product lives.',
    },
    {
      number: '04',
      myth: 'It\'s just another IDE on my laptop',
      reality:
        'Slack, Linear, Jira, MCP - work can start from tickets and threads, not just the editor.',
      remember:
        'Cursor lives where your work already lives.',
    },
    {
      number: '05',
      myth: 'It\'s locked to one AI vendor',
      reality:
        'Claude, GPT, Gemini, Grok, Composer - route models per task, not per vendor roadmap.',
      remember:
        'You\'re betting on a product that rides whichever model is best.',
    },
  ],
};
