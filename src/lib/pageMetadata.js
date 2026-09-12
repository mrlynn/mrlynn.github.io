/**
 * One builder for ordinary page metadata.
 *
 * Two inheritance traps motivated this, both of which shipped:
 *
 *   1. A `canonical` on the root layout propagates to every page that doesn't
 *      set its own, so /blog, /projects and /social all told crawlers they were
 *      duplicates of the homepage.
 *   2. A page that declares ANY `openGraph` object replaces the parent's rather
 *      than merging into it — which also drops the image that
 *      app/opengraph-image.js contributes. Pages with richer metadata silently
 *      ended up with no social card at all.
 *
 * Both traps are "you get it wrong by omission", so the fix is a helper that
 * can't omit them. Use it for any page whose card is the default site card;
 * posts and projects pass their own covers and build metadata inline.
 */

const SITE_NAME = 'Michael Lynn';
const TWITTER = '@mlynn';

// Served by app/opengraph-image.js. Generated at build time, so unlike the
// hardcoded /images/og-image.jpg it replaced, it cannot go missing.
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Michael Lynn — AI Adoption Engineer, Developer Advocate & Advisor',
};

/**
 * @param {object}  opts
 * @param {string}  opts.title          Document title.
 * @param {string}  opts.description    Meta description.
 * @param {string}  opts.path           Site-relative canonical path, e.g. '/blog'.
 * @param {string} [opts.socialTitle]       Shorter title for cards. Defaults to title.
 * @param {string} [opts.socialDescription] Shorter blurb for cards. Defaults to description.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
}) {
  const cardTitle = socialTitle || title;
  const cardDescription = socialDescription || description;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: cardTitle,
      description: cardDescription,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER,
      title: cardTitle,
      description: cardDescription,
      images: [OG_IMAGE.url],
    },
  };
}
