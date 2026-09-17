#!/usr/bin/env node
/**
 * Long Stride Ranch — zero-dependency static site build.
 *
 *   node build.mjs          build to dist/
 *   node build.mjs --serve  build, then serve dist/ on :4173 and rebuild on change
 *
 * Pages live in src/pages/*.html. Each starts with a JSON front-matter comment:
 *   <!--meta { "title": "...", "description": "...", "nav": "about" } -->
 * The rest of the file is dropped into src/layout.html.
 */

import { readFile, writeFile, readdir, mkdir, rm, cp, stat } from 'node:fs/promises';
import { createReadStream, watch } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SRC = join(root, 'src');
const OUT = join(root, 'dist');
const ASSETS = join(root, 'assets');

const META_RE = /^\s*<!--meta([\s\S]*?)-->/;

async function readPartial(name) {
  return readFile(join(SRC, 'partials', name), 'utf8');
}

/** Mark the current page in a nav fragment. */
function markCurrent(html, nav) {
  if (!nav) return html;
  return html.replaceAll(`data-nav="${nav}"`, `data-nav="${nav}" aria-current="page"`);
}

function jsonLd(page) {
  if (!page.jsonld) return '';
  return `<script type="application/ld+json">${JSON.stringify(page.jsonld)}</script>`;
}

let building = null;

async function build() {
  // Never let two builds run at once — they share dist/, and a watcher-triggered
  // build starting while another is clearing it fails with ENOTEMPTY.
  const run = Promise.resolve(building).catch(() => {}).then(doBuild);
  building = run.catch(() => {});
  return run;
}

async function doBuild() {
  const started = Date.now();
  const [layout, headerRaw, footerRaw, mark] = await Promise.all([
    readFile(join(SRC, 'layout.html'), 'utf8'),
    readPartial('header.html'),
    readPartial('footer.html'),
    readFile(join(ASSETS, 'img', 'mark.svg'), 'utf8'),
  ]);

  // The mark is inlined so it can inherit currentColor from the brand link.
  const inlineMark = mark.replace(/<\?xml[\s\S]*?\?>/, '').trim();
  const header = headerRaw.replaceAll('{{MARK}}', inlineMark);
  const footer = footerRaw
    .replaceAll('{{MARK}}', inlineMark)
    .replaceAll('{{YEAR}}', String(new Date().getFullYear()));

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(join(SRC, 'pages'))).filter((f) => f.endsWith('.html')).sort();
  const built = [];

  for (const file of files) {
    const raw = await readFile(join(SRC, 'pages', file), 'utf8');
    const match = raw.match(META_RE);
    if (!match) throw new Error(`${file}: missing <!--meta { … } --> block`);

    let meta;
    try {
      meta = JSON.parse(match[1]);
    } catch (err) {
      throw new Error(`${file}: front matter is not valid JSON — ${err.message}`);
    }
    if (!meta.title) throw new Error(`${file}: front matter needs a "title"`);
    if (!meta.description) throw new Error(`${file}: front matter needs a "description"`);

    const content = raw.slice(match[0].length).trim();
    const slugPath = file === 'index.html' ? '' : file;

    const html = layout
      .replace('{{TITLE}}', meta.title)
      .replace(/\{\{DESCRIPTION\}\}/g, meta.description)
      .replace(/\{\{TITLE\}\}/g, meta.title)
      .replaceAll('{{SLUG_PATH}}', slugPath)
      .replace('{{JSONLD}}', jsonLd(meta))
      .replace('{{HEADER}}', markCurrent(header, meta.nav))
      .replace('{{CONTENT}}', content)
      .replace('{{FOOTER}}', footer);

    await writeFile(join(OUT, file), html);
    built.push(file);
  }

  await cp(ASSETS, join(OUT, 'assets'), { recursive: true });
  for (const extra of ['robots.txt', 'sitemap.xml', 'CNAME']) {
    try {
      await cp(join(root, 'public', extra), join(OUT, extra));
    } catch {
      /* optional */
    }
  }

  console.log(`built ${built.length} pages in ${Date.now() - started}ms → dist/`);
  return built;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
};

async function serve(port = 4173) {
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent((req.url || '/').split('?')[0]);
    if (path.endsWith('/')) path += 'index.html';
    let file = join(OUT, path);

    // Allow extensionless URLs (/about → /about.html), as Netlify and Vercel do.
    if (!extname(file)) {
      try {
        await stat(`${file}.html`);
        file = `${file}.html`;
      } catch {
        /* fall through to 404 */
      }
    }
    if (!file.startsWith(OUT)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    try {
      await stat(file);
    } catch {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      createReadStream(join(OUT, '404.html')).pipe(res);
      return;
    }
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    createReadStream(file).pipe(res);
  });

  server.listen(port, () => console.log(`serving dist/ → http://localhost:${port}`));

  let queued = null;
  for (const dir of [SRC, ASSETS]) {
    watch(dir, { recursive: true }, () => {
      clearTimeout(queued);
      queued = setTimeout(() => build().catch((e) => console.error(e.message)), 80);
    });
  }
}

await build();
if (process.argv.includes('--serve')) await serve();
