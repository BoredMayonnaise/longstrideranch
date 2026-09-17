# Long Stride Ranch

A modern rebuild of [longstrideranch.com](https://longstrideranch.com) — the marketing
site for Long Stride Ranch, a hunter/jumper boarding, training and sales operation
split between Jackson Hole, Wyoming and Wellington, Florida.

Next.js App Router, TypeScript, plain CSS driven by design tokens. Every route is
statically prerendered.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 18.18 or newer.

## Layout

```
app/
  layout.tsx            shell: fonts, theme bootstrap, header, footer
  page.tsx              home
  about|boarding|training|renewables|horses-for-sale|our-horses|contact/page.tsx
  not-found.tsx         404
  robots.ts             /robots.txt
  sitemap.ts            /sitemap.xml
  tokens.css            design tokens — color, type, spacing, radius, motion
  main.css              everything else
components/
  Header.tsx            nav, dropdowns, mobile drawer  (client)
  ThemeToggle.tsx       light/dark switch              (client)
  ContactForm.tsx       enquiry form                   (client)
  SiteEffects.tsx       scroll reveals, stat counters  (client)
  Footer.tsx, Crumbs.tsx, Mark.tsx
lib/site.ts             addresses, people, nav structure — one source of truth
public/img/*.svg        logo, illustrations, placeholders
```

Only four components are client components; everything else renders on the server.

### Adding a page

Create `app/<route>/page.tsx`, export a `metadata` object, and add the route to
`allRoutes` in `lib/site.ts` — the drawer, the footer and the sitemap all read from
there, so nothing else needs editing.

### Design tokens

Colors, type scale, spacing, radii and motion live as custom properties in
`app/tokens.css`, mirroring the project's design system. Change a value there rather
than hard-coding a color anywhere else.

The dark theme follows the operating system unless a visitor picks one with the header
toggle, which is stored in `localStorage` under `lsr-theme`. An inline script in the
layout applies the saved choice before first paint, so there is no flash.

Fonts are Fraunces (display) and Inter (text), loaded through `next/font/google` and
exposed to the tokens as `--font-fraunces` and `--font-inter`.

## Content status

Most copy is carried over from the current site. A few areas are marked **Coming soon**
on the live site and are marked the same way here rather than invented:

| Page | Status |
| --- | --- |
| Boarding | Facility facts are real; packages and rates are pending |
| Training & Lessons | Approach is real; schedule and rates are pending |
| Our Horses | Awaiting individual horse profiles |

Every photograph is an SVG placeholder (`public/img/placeholder-*.svg`). Drop real
images in and swap the `src` — the layouts already reserve the right aspect ratios.

## Accessibility

- Semantic landmarks, a skip link, visible focus rings, labelled controls.
- Text meets WCAG AA contrast in both themes; `border-control` exists so that every
  border carrying meaning clears 3:1.
- All motion is suppressed under `prefers-reduced-motion`.
- Content is readable if the JavaScript bundle fails: scroll reveals are opt-in via a
  class the bootstrap script removes again if the app never mounts.

## Deploying

Vercel detects Next.js with no configuration — import the repository and it builds.

Note that Vercel's GitHub App must have access to this repository before it can be
linked; if the repo lives under a personal account, grant it at
<https://github.com/apps/vercel/installations/select_target>.

## License

All rights reserved. Content and branding belong to Long Stride Ranch.
