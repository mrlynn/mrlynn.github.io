# OG card fonts

Used by the three social-card routes, which render through satori:

- `src/app/opengraph-image.js` — the site-wide card
- `src/app/blog/[slug]/opengraph-image.js` — per-post cards
- `src/app/projects/[slug]/opengraph-image.js` — per-project cards

Satori needs real font binaries at render time; it can't reach the `next/font`
faces the site itself uses.

These are committed rather than fetched during the build so the build stays
hermetic: a Google Fonts hiccup shouldn't be able to fail a deploy or silently
swap the card to a fallback face.

| File | Face | Upstream |
| --- | --- | --- |
| `FamiljenGrotesk-Regular.ttf` | Familjen Grotesk 400 (body, matches the site) | [Google Fonts](https://fonts.google.com/specimen/Familjen+Grotesk) |
| `FamiljenGrotesk-SemiBold.ttf` | Familjen Grotesk 600 (titles) | [Google Fonts](https://fonts.google.com/specimen/Familjen+Grotesk) |
| `FragmentMono-Regular.ttf` | Fragment Mono 400 (labels and tech chips) | [Google Fonts](https://fonts.google.com/specimen/Fragment+Mono) |

Both families are licensed under the SIL Open Font License 1.1.

Satori doesn't handle variable fonts, so these are the static single-weight
instances Google Fonts serves as `.ttf` (request the `css2` API without a
browser user agent and it links TTFs rather than WOFF2).

## These files are not the upstream downloads — do not replace them with one

Every glyph here has been decomposed to simple outlines. **Satori mis-places the
components of composite glyphs**, so a composite renders as its pieces scattered
across the line: the plus in "Voyage 4 + Claude" came out as a floating bar with
a stray vertical stem beside the next letter.

It is not a rare corner. Before decomposition 403 of each Familjen Grotesk
weight's glyphs were composite, and 198 of Fragment Mono's — including the
accented letters. A title with `é` in it would have rendered visibly broken.

Dropping a fresh download from Google Fonts in here reintroduces that silently,
because nothing fails: the card still builds, still returns 200, still measures
1200x630. Only the glyphs are wrong, and only for the characters a given title
happens to use.

If a face ever needs updating, re-run the decomposition on the new file:

```python
# pip install fonttools
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.pens.ttGlyphPen import TTGlyphPen

path = 'src/app/_og-fonts/FamiljenGrotesk-SemiBold.ttf'
font = TTFont(path)
glyf, glyphs = font['glyf'], font.getGlyphSet()
for name in font.getGlyphOrder():
    if glyf[name].isComposite():
        pen = DecomposingRecordingPen(glyphs)
        glyphs[name].draw(pen)
        out = TTGlyphPen(None)
        pen.replay(out)
        glyf[name] = out.glyph()
font.save(path)
```

Then confirm none are left:

```python
sum(TTFont(path)['glyf'][g].isComposite() for g in TTFont(path).getGlyphOrder())  # -> 0
```

And render a card whose title contains `+`, `é` or `…` and actually look at it.
The failure is visual only; no check will catch it for you.

## Directory name

The leading underscore keeps this out of Next's route tree — without it, App
Router would try to treat it as a segment.
