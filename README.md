# Long Stride Ranch

A modern rebuild of [longstrideranch.com](https://longstrideranch.com) — the marketing
site for Long Stride Ranch, a hunter/jumper boarding, training and sales operation
split between Jackson Hole, Wyoming and Wellington, Florida.

No framework, no dependencies, no build toolchain to keep alive. Pages are plain HTML
fragments assembled into a static site by a single Node script.

## Getting started

```bash
npm run dev     # build, serve on http://localhost:4173, rebuild on save
npm run build   # one-off build into dist/
```

Node 18 or newer. There is nothing to `npm install`.

## How it works

```
src/layout.html        the page shell (head, header slot, content slot, footer slot)
src/partials/          header and footer, shared by every page
src/pages/*.html       one file per page — front matter plus the page body
assets/css/tokens.css  design tokens: color, type scale, spacing, radius, motion
assets/css/main.css    everything else
assets/js/main.js      progressive enhancement only
assets/img/*.svg       logo, illustrations, placeholders
public/                robots.txt and sitemap.xml, copied through verbatim
build.mjs              the build
dist/                  output (git-ignored)
```

### Adding a page

Create `src/pages/your-page.html` starting with a JSON front-matter comment:

```html
<!--meta {
  "title": "Your page — Long Stride Ranch",
  "description": "One sentence for search results and link previews.",
  "nav": "your-page"
} -->

<section class="section">…</section>
```

Everything after the comment is dropped into the layout. The optional `nav` value is
matched against `data-nav="…"` in the header and footer to set `aria-current="page"`.
An optional `jsonld` object is emitted as a JSON-LD script tag.

Then add the page to the header, drawer and footer in `src/partials/`, and to
`public/sitemap.xml`.

### Design tokens

Colors, type, spacing, radii and motion all live as custom properties in
`assets/css/tokens.css`, which mirrors the project's design system. The dark theme
follows the operating system unless a visitor picks one with the header toggle, which
is stored in `localStorage` under `lsr-theme`.

`tokens.css` is generated-by-hand but deliberately boring: change a value there rather
than hard-coding a color anywhere else.

## Content status

Most of the copy is carried over from the current site. A few areas are marked
**Coming soon** on the live site and are marked the same way here, rather than being
invented:

| Page | Status |
| --- | --- |
| Boarding | Facility facts are real; packages and rates are pending |
| Training & Lessons | Approach is real; schedule and rates are pending |
| Our Horses | Awaiting individual horse profiles |

Every photograph is an SVG placeholder (`assets/img/placeholder-*.svg`). Drop real
images in and swap the `src` — the layouts already reserve the right aspect ratios.

## Accessibility and performance

- Semantic landmarks, a skip link, visible focus rings, and labelled controls.
- Text meets WCAG AA contrast in both themes.
- All motion is suppressed under `prefers-reduced-motion`.
- The site is fully readable with JavaScript disabled or blocked; scroll animations
  fall back to plain visible content.
- No web fonts beyond two Google families, no tracking, no third-party scripts.

## Deploying

`dist/` is a plain static directory — any host works.

- **GitHub Pages** — the included workflow (`.github/workflows/deploy.yml`) builds and
  publishes on every push to the default branch. Enable Pages with "GitHub Actions" as
  the source.
- **Netlify / Vercel** — build command `npm run build`, publish directory `dist`. Both
  serve `/about` for `about.html` automatically.

## License

All rights reserved. Content and branding belong to Long Stride Ranch.
