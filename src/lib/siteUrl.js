const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mlynn.org';

// Keep generated URLs crawlable even when a deployment is missing its public
// environment variable. Local development can still opt into localhost by
// setting NEXT_PUBLIC_SITE_URL explicitly in .env.local.
export const SITE_URL = configuredUrl.replace(/\/+$/, '');
