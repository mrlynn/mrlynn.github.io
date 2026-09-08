'use client';

import { Box, Container, useTheme } from '@mui/material';

/**
 * The site's vertical rhythm, in one place.
 *
 * Section padding used to be improvised per page — the homepage alone shipped
 * py:12, py:8, py:{xs:10,md:14} and py:{xs:8,md:10} — which is why the gaps
 * between sections ranged from tight to 600px of nothing. These three steps are
 * the only ones any page should need. Values are MUI spacing units (8px base),
 * matching the scale in src/theme/designSystem.js.
 */
export const SECTION_RHYTHM = {
  compact: { xs: 5, md: 7 },   //  40 / 56px — strips and bands
  normal: { xs: 8, md: 11 },   //  64 / 88px — the default
  loose: { xs: 10, md: 14 },   //  80 / 112px — openers and closers
};

/**
 * @param {'compact'|'normal'|'loose'} size    vertical rhythm step
 * @param {'default'|'paper'} tone             background surface
 * @param {boolean} bleed                      paint the tone edge to edge,
 *                                             keeping the content in a Container
 * @param {boolean} divider                    hairline rule on the top edge
 */
export default function Section({
  children,
  size = 'normal',
  tone = 'default',
  bleed = false,
  divider = false,
  maxWidth = 'lg',
  component = 'section',
  id,
  sx,
}) {
  const theme = useTheme();

  const background =
    tone === 'paper' ? theme.palette.background.paper : 'transparent';

  const outer = {
    py: SECTION_RHYTHM[size] ?? SECTION_RHYTHM.normal,
    ...(bleed || tone === 'paper' ? { background } : {}),
    ...(divider ? { borderTop: `1px solid ${theme.palette.border.subtle}` } : {}),
    ...sx,
  };

  return (
    <Box component={component} id={id} sx={outer}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
