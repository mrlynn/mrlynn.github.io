import { Space_Grotesk } from 'next/font/google';
import { Providers } from './providers';
import Layout from '../components/Layout';
import './globals.css';

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
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
} 