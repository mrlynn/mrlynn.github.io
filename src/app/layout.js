import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '../theme/ThemeContext';
import Layout from '../components/Layout';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  adjustFontFallback: false,
});

export const metadata = {
  title: 'Michael Lynn - Creative Developer',
  description: 'Pushing the boundaries of web development with innovative solutions and creative coding',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
