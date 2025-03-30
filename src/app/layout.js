import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '../theme/ThemeContext';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import './globals.css';
import Script from 'next/script';
import { GA_TRACKING_ID } from '../lib/analytics';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  adjustFontFallback: false,
});

export const metadata = {
  metadataBase: new URL('https://mlynn.org'),
  title: 'Michael Lynn - Creative Developer',
  description: 'Pushing the boundaries of web development with innovative solutions and creative coding',
  authors: [{ name: 'Michael Lynn' }],
  creator: 'Michael Lynn',
  publisher: 'Michael Lynn',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mrlynn.github.io',
    siteName: 'Michael Lynn',
    title: 'Michael Lynn - Creative Developer',
    description: 'Pushing the boundaries of web development with innovative solutions and creative coding',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Michael Lynn - Creative Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Lynn - Creative Developer',
    description: 'Pushing the boundaries of web development with innovative solutions and creative coding',
    images: ['/images/og-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/letter-m.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `}
        </Script>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ErrorBoundary>
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
