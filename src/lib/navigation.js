/**
 * Single source of truth for site navigation.
 *
 * The header carries six primary destinations plus a persistent "Book a call"
 * action. Everything else — art, social, tools, feeds — is reachable from the
 * footer rather than an overflow menu, so nothing important hides behind a kebab.
 */

export const NAV_ITEMS = [
  { label: 'Projects', path: '/projects' },
  { label: 'Writing', path: '/blog' },
  { label: 'Speaking', path: '/speaking' },
  { label: 'Podcasts', path: '/podcasts' },
  { label: 'Consulting', path: '/consulting' },
  { label: 'About', path: '/about' },
];

/**
 * A nav item is active on its own page and on anything nested under it, so
 * /projects/lancescope still highlights "Projects".
 */
export function isNavItemActive(pathname, item) {
  if (!pathname) return false;
  if (pathname === item.path) return true;
  return pathname.startsWith(`${item.path}/`);
}

export const SOCIAL_LINKS = {
  github: 'https://github.com/mrlynn',
  linkedin: 'https://linkedin.com/in/mlynn',
  instagram: 'https://instagram.com/mlynn',
};

// Set this to the address you want published, e.g. 'michael@mlynn.org'.
// Left null deliberately: the footer and /contact omit the email row until
// you choose which address should be public.
export const CONTACT_EMAIL = null;

export const FOOTER_COLUMNS = [
  {
    title: 'Projects',
    links: [
      { label: 'All projects', href: '/projects' },
      { label: 'Diagram generator', href: '/tools/generate-diagram' },
      { label: 'MongoDB introspector', href: '/tools/introspect' },
      { label: 'Open source', href: SOCIAL_LINKS.github, external: true },
    ],
  },
  {
    title: 'Writing',
    links: [
      { label: 'All posts', href: '/blog' },
      { label: 'RSS feed', href: '/feed.xml' },
      { label: 'Ask my AI', href: '/ask-ai' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Michael', href: '/about' },
      { label: 'Résumé', href: '/resume' },
      { label: 'Speaking', href: '/speaking' },
      { label: 'Podcasts', href: '/podcasts' },
      { label: 'Art', href: '/art' },
      { label: 'Social', href: '/social' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Book a call', href: '/contact' },
      ...(CONTACT_EMAIL
        ? [{ label: 'Email', href: `mailto:${CONTACT_EMAIL}` }]
        : []),
      { label: 'GitHub', href: SOCIAL_LINKS.github, external: true },
      { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, external: true },
    ],
  },
];
