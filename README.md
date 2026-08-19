# Axel Professional 2026 — Working HTML Demo

Two connected pages:

- `/index.html` — **Who I Am** immersive experience
- `/cv/index.html` — **Professional Digital CV**

## Local preview

Because page navigation and asset paths behave most reliably through a local server:

```bash
cd axel_professional_2026
python -m http.server 8080
```

Then open:

`http://localhost:8080/`

## GitHub Pages

1. Create a repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub: **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Choose `main` and `/ (root)`.
6. Save.
7. GitHub will publish the site.

## Replace before production

Search for:

- `axelcruzmachado@gmail.com`
- `https://www.linkedin.com/in/axeldanielcruzmachado`

Add the PDF:

`downloads/Axel_Cruz_Professional_CV.pdf`

Replace demo ART / TECH PNGs one-for-one with final cut-outs.

## Visual assets

See `DEMO_ASSETS_GUIDE.md`.

## Performance

The demo uses vanilla HTML/CSS/JS, IntersectionObserver, transform-based parallax and reduced-motion support. For final production, convert large master PNGs to responsive WebP/AVIF derivatives where alpha quality is acceptable, keeping PNG as a fallback if required.


## Current contact links
- Email: axelcruzmachado@gmail.com
- LinkedIn: https://www.linkedin.com/in/axeldanielcruzmachado

## V3 phrase behavior
- No large phrase rectangle.
- Desktop: accumulated subtitles sit in one small horizontal line at the top-right, separated by •.
- Each subtitle appears only near the end of its own chapter (~72% scroll progress).
- The message remains accumulated into the next chapter.
- Entering “Let’s build that outcome” fades the accumulated line out during the first third of the final screen.
- The Professional CV pill sits immediately below the accumulated line.


## Latest build
This package includes the V03 phrase-anchoring refinement, updated Business Strategy mountain treatment, and an elevated Professional CV visual system.


## V05 fixes
- Restored all 15 ART and 7 TECHNOLOGY demo PNG assets plus transitions.js.
- Rebuilt phrase system using DOM reparenting: the exact subtitle element moves from each section into the fixed rail and returns on reverse scroll.
- No background rectangle behind the accumulated phrases.
- Business Strategy uses a full-bleed, color-graded mountain panorama blended into the dark palette.
- Professional CV Selected Impact, Core Expertise and Tools now use restrained palette rotation, staggered reveals and hover microinteractions.
- Professional CV contact is now an inverted dark conclusion block.


## V06 download assets
The package now includes:
- `downloads/Axel_Cruz_Professional_CV.pdf`
- `downloads/Axel_Cruz_Professional_CV.docx`

Both download buttons are wired to real files.

Email links use `mailto:` and also attempt to copy the email address to the clipboard as a browser-friendly fallback.
