// Must match the host Vercel actually serves, or every canonical, sitemap entry
// and OG URL points at a redirect.
//
// The apex is the primary host: it is what robots.txt, the CNAME file and the OG
// card all say, and what gets written on slides. This previously defaulted to www
// because Vercel was 308-ing mlynn.org -> www.mlynn.org; the primary domain is
// the apex now, so the default follows it.
//
// NEXT_PUBLIC_SITE_URL still wins if set. Setting it to a host Vercel does not
// serve as primary is what broke this before, so change the primary domain and
// this default together.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mlynn.org';

// Keep generated URLs crawlable even when a deployment is missing its public
// environment variable. Local development can still opt into localhost by
// setting NEXT_PUBLIC_SITE_URL explicitly in .env.local.
export const SITE_URL = configuredUrl.replace(/\/+$/, '');
