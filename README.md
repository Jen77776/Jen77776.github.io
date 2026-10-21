# Jen Kang — Portfolio

A mostly static Next.js App Router site with TypeScript and Tailwind CSS. The approved V2 HTML prototype supplies the visual design. All sections render on the server; there are no application client components, tracking scripts, or backend services.

## Run locally

Requires Node.js 20.9+.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

```sh
npm run lint
npm run typecheck
npm run build
```

## Edit content

Update `src/data/portfolio.ts`: roles, dates, outcomes, tags, project descriptions, schools, and links are centralized. Reusable sections live in `src/components/portfolio.tsx`; the page composition is in `src/app/page.tsx`. `src/app/globals.css` preserves the V2 design and adds mobile navigation, contrast, and focus refinements; Tailwind utilities handle small component-level styling.

## Before publication

- Supply a résumé PDF. Put it in `public/resume.pdf` and set `links.resume` to `/resume.pdf` (or a verified HTTPS destination).
- Set `links.email` to a confirmed plain email address and `links.linkedin` to a confirmed profile URL.
- Supply a real repository/demo/case-study URL for Multi-Agent Study Assistant. Null destinations render explicit, noninteractive pending text.
- Supply approved authentic screenshots for the projects. Store them in `public/projects/` and set each project's `screenshot` to `{ src: '/projects/name.webp', alt: 'Description of the actual interface' }`. Fixed preview regions prevent layout shift; Static hosting uses unoptimized Next Image; supply appropriately compressed WebP/AVIF files. Current neutral placeholders are explicitly labeled.
- Set `siteUrl` to the final verified HTTPS origin. This enables canonical metadata, sitemap entries, and indexing. Until configured, robots disallows crawling and page metadata uses noindex; no domain is fabricated.
- Recheck external destinations and approve content before deploying. GitHub profile and AI Art Museum URLs were provided in the reference; see `docs/verification.md`.

System fonts avoid external font requests. Motion respects reduced-motion preferences. All navigation remains visible on mobile. External links announce their new-tab behavior. No company screenshots or extra achievements have been added.

## GitHub Pages

Source repository: https://github.com/Jen77776/Jen77776.github.io

Site: https://jen77776.github.io/

The `main` branch contains source. GitHub Pages serves the exported output from the `gh-pages` branch. `next.config.ts` enables static export to `out/`; no Node server is needed in production. The final GitHub Pages origin is configured in the content file, enabling canonical metadata and indexing.

To publish updates, run the checks and `npm run build`, then publish only the contents of `out/` with a `.nojekyll` file to `gh-pages`. Never publish environment files or dependency directories. Updating `main` alone does not publish a new build.
