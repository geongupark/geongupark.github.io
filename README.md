# geongupark.github.io

A black-and-white, typography-first personal tech blog. Commit a markdown file and it ships.

```
Astro 7 · Pagefind (search) · giscus (comments) · Expressive Code · GitHub Pages
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (search is inert here — see below) |
| `npm run build` | Static build plus the Pagefind search index |
| `npm run preview` | Serve the build — **this is where search works** |
| `npm run new "Title"` | Scaffold a new post |
| `npm run clean` | Remove build output and caches |

## Writing a post

Any markdown (`.md` / `.mdx`) file under `src/content/blog/` is a post.

```yaml
---
title: "Chasing Kafka consumer lag"
description: "One line, used in the list, search results and the OG card"
date: 2026-09-02
category: backend            # exactly one; a new name creates the category
tags: [kafka, monitoring]    # any number; each creates a tag page
draft: false                 # true keeps it out of the deployed site
updated: 2026-09-10          # optional
series: "Running Kafka"      # optional; groups posts with the same value
---
```

Frontmatter is validated by the schema in `src/content.config.ts`. A typo **fails the
build**, so a malformed post never reaches the site.

### Categories and tags

There is nothing to register. Write a new name in `category` or `tags` and
`/categories/<name>` and `/tags/<name>` are generated at build time.

### Code blocks

````markdown
```ts title="src/utils/posts.ts" {3-5}
// file name, lines 3-5 highlighted, copy button included
```
````

## Adding a page (CV and friends)

A markdown file under `src/pages/` becomes a page.

```markdown
---
layout: ../layouts/PageLayout.astro
title: CV
eyebrow: Page
description: Experience and background
---

## Experience
...
```

To show it in the menu, add one line to `NAV` in `src/config.ts`.

## Search

[Pagefind](https://pagefind.app) builds a static index at build time — no server, no
third-party service. `⌘K` or `/` opens the dialog.

> The index is created during `npm run build`, so **search returns nothing under
> `npm run dev`**. Use `npm run build && npm run preview` to try it.

## Comments (giscus)

1. Repository **Settings → General → Features → Discussions**
2. Create a `Comments` category in Discussions (the Announcement format works well)
3. Enter this repository at [giscus.app](https://giscus.app) to get `repoId` and `categoryId`
4. Fill them into `GISCUS` in `src/config.ts`

Until then the post footer shows a short setup note instead of the widget.

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source** must be set to
**GitHub Actions**.

## Customizing

| To change | Edit |
|---|---|
| Title, intro, menu, social links | `src/config.ts` |
| Color, type, spacing (design tokens) | `src/styles/tokens.css` |
| Rendered markdown typography | `.prose` in `src/styles/global.css` |
| Code block theme | `expressiveCode` in `astro.config.mjs` |
| OG card design | `src/pages/og/[...slug].png.ts` |

## Layout

```
src/
├─ config.ts            site settings (title, menu, giscus)
├─ content.config.ts    post frontmatter schema
├─ content/blog/        ← every post lives here
├─ pages/
│  ├─ index.astro       home
│  ├─ posts/            archive, pagination, post body
│  ├─ categories/       index and per-category archives
│  ├─ tags/             index and per-tag archives
│  ├─ og/               per-post OG images, generated at build
│  ├─ about.md          ← this is how a page is added
│  ├─ rss.xml.js        feed
│  └─ 404.astro
├─ layouts/             Base and Page
├─ components/          Header, Footer, Search, TOC, Comments, …
├─ styles/              tokens.css, global.css
└─ utils/posts.ts       sorting, grouping, reading time, related posts
```

## What's included

Search (`⌘K`) · comments · categories · tags · series · related posts · prev/next ·
table of contents with scroll spy · dark mode · RSS · sitemap · robots.txt ·
generated OG images · JSON-LD · reading time · drafts · copy button on code blocks ·
404 · keyboard navigation · skip link

## License

Content under `src/content/` is © the author. The site code is free to reuse.
