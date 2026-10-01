# Fonts for link-preview cards

Used only at build time by `src/app/look/[look]/card.jpg/route.tsx`, which
renders the preview images with `next/og`. That renderer reads TTF, not the
WOFF2 files `next/font` serves to browsers.

- Fraunces 500 (optical size 144), Geist 400 and 500 and Geist Mono 500 for
  the standard cards, and JetBrains Mono 400 and 800 for the Terminal cards:
  static TTFs from Google Fonts.
- Subset with fonttools `pyftsubset` to Latin, Latin Extended (Polish),
  common punctuation and the symbols the cards use (● → ⌘):

  ```bash
  pyftsubset <font>.ttf --unicodes="U+0020-007E,U+00A0-024F,U+2010-2027,U+2030-203A,U+20AC,U+2190-2193,U+2197,U+25CF,U+2318" --layout-features='kern,liga,calt'
  ```

All four families are licensed under the SIL Open Font License 1.1; see the
`OFL-*.txt` files.
