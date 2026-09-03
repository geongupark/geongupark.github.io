---
title: "Rebuilding this blog"
description: "A black-and-white, typography-first blog on Astro. Here's how it's put together and how to write for it."
date: 2026-09-02
category: meta
tags: [astro, pagefind]
draft: false
---

I rebuilt this blog with a single goal: **nothing to do but write.**

## Principles

1. One markdown file is one post. There is no registration step.
2. Two colors. Emphasis comes from weight and whitespace, not hue.
3. Search runs without a server.

## Writing a post

Drop a markdown file into `src/content/blog/` and commit it.

```bash title="Start a new post"
npm run new "Chasing Kafka consumer lag"
# → creates src/content/blog/chasing-kafka-consumer-lag.md
```

The frontmatter looks like this:

```yaml title="src/content/blog/example.md"
---
title: "Post title"
description: "One line, used in the list, search results and the OG card"
date: 2026-09-02
category: backend          # a new name here creates the category page
tags: [kafka, monitoring]  # tag pages are created the same way
draft: false               # true keeps it out of the deployed site
---
```

Put a `category` you have never used before and `/categories/backend` appears on
its own. No config file to touch. Tags behave the same way.

The frontmatter is validated against a schema, so a typo fails the build instead of
shipping a broken post.

## Adding a page

A markdown file under `src/pages/` becomes a page:

```markdown title="src/pages/cv.md"
---
layout: ../layouts/PageLayout.astro
title: CV
---

## Experience
...
```

To put it in the menu, add one line to `NAV` in `src/config.ts`.

## Search

Press `⌘K` (or `/`). It searches titles, body text and categories.
[Pagefind](https://pagefind.app) builds a static index at build time, so there is no
server and no third-party service in the loop.

> The index is produced during `npm run build`. Search being empty in `npm run dev`
> is expected.

## What's left

Comments are wired up through giscus, so each post gets a GitHub Discussions thread.
Everything else is just writing.
