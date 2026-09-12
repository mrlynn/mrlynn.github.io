# OG card fonts

Used only by `src/app/opengraph-image.js`, which renders the default social card
through satori. Satori needs real font binaries at render time — it can't reach
the `next/font` faces the site itself uses.

These are committed rather than fetched during the build so the build stays
hermetic: a Google Fonts hiccup shouldn't be able to fail a deploy or silently
swap the card to a fallback face.

| File | Face | Source |
| --- | --- | --- |
| `Fraunces.ttf` | Fraunces (display serif, matches the site's headings) | [Google Fonts](https://fonts.google.com/specimen/Fraunces) |
| `Inter-Regular.ttf` | Inter 400 | [Google Fonts](https://fonts.google.com/specimen/Inter) |
| `Inter-SemiBold.ttf` | Inter 600 | [Google Fonts](https://fonts.google.com/specimen/Inter) |

Both families are licensed under the SIL Open Font License 1.1.

The leading underscore keeps the directory out of Next's route tree — without it,
App Router would try to treat it as a segment.
