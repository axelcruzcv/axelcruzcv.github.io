# Demo asset package — Axel Professional 2026

## Important count note
The approved visual architecture was **15 ART + 7 TECHNOLOGY = 22 transparent PNGs**.
Your latest message said “21 PNGs”; I kept the approved 15+7 structure so no visual slot is lost.

The HTML already uses all 22 demo files.

## ART
Folder: `assets/art/`

- ART 01–03: XL hero layers — 1450–1500px long side
- ART 04–08: L supporting layers — 1000–1150px
- ART 09–12: M secondary layers — 760–850px
- ART 13–15: S accents — 500–620px

Replace demo assets **one-for-one without changing filenames**:
`art-01.png` … `art-15.png`

Recommended final PNGs:
- transparent background
- sRGB
- clean cut-out edges
- preserve some transparent breathing room
- do not crop objects flush to the canvas
- keep subject centered enough that CSS repositioning remains possible

ART is intentionally invasive: the HTML places imagery from the left and right edges around a central text-safe area.

## TECHNOLOGY
Folder: `assets/tech/`

- TECH 01–02: XL
- TECH 03–04: L
- TECH 05–06: M
- TECH 07: S accent

Replace:
`tech-01.png` … `tech-07.png`

TECH is deliberately more structured and geometric than ART.

## BUSINESS STRATEGY
`assets/strategy/mountains.png`

This is a demo transparent light mountain illustration used over deep navy.
Replace it with the final mountain artwork using the same filename.

## Position editing
All placements are in:
`css/main.css`

Search for:
`.art-01` … `.art-15`
`.tech-01` … `.tech-07`

Each line controls width, side, top/bottom.

Parallax strength is controlled in `index.html` using:
`data-depth="0.08"` etc.

Keep depth conservative.

## User links to replace
Search the project for:
- `axelcruzmachado@gmail.com`
- `https://www.linkedin.com/in/axeldanielcruzmachado`

## PDF
Put the final PDF at:
`downloads/Axel_Cruz_Professional_CV.pdf`


## V2 updates
- Top-right accumulated phrase area now uses the three section subtitles.
- Professional CV top-left brand block now has a protected background card.
- Buttons now use the real email and LinkedIn profile.
- Mountains artwork replaced with a more realistic monochrome illustration.
