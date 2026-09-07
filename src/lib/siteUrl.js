// Must match the host Vercel actually serves. mlynn.org 308-redirects to
// www.mlynn.org, so canonicals, the sitemap and OG URLs all use www — otherwise
// every URL we publish points at a redirect. If the primary domain in Vercel is
// ever flipped to the apex, change this (or NEXT_PUBLIC_SITE_URL) to match.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mlynn.org';

// Keep generated URLs crawlable even when a deployment is missing its public
// environment variable. Local development can still opt into localhost by
// setting NEXT_PUBLIC_SITE_URL explicitly in .env.local.
export const SITE_URL = configuredUrl.replace(/\/+$/, '');
