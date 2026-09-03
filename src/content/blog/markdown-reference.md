---
title: "Markdown reference"
description: "Headings, lists, tables, code blocks and quotes, all on one page, to check how the type behaves."
date: 2026-09-01
category: meta
tags: [markdown, design]
draft: false
---

This page exists to check the typography before writing anything real.

## Paragraphs and emphasis

Body text is capped at 42rem so lines stay comfortable to read. Here is
**bold**, *italic*, `inline code`, ~~strikethrough~~, and a [link](https://astro.build).

### Lists

- First item
- Second item
  - A nested item
- Third item

1. An ordered list
2. Second
3. Third

## Code blocks

A file name and highlighted lines can be attached to any block.

```ts title="src/utils/posts.ts" {3-4}
export function readingTime(body: string): number {
  const text = body.replace(/```[\s\S]*?```/g, ' ');
  const words = (text.match(/\S+/g) ?? []).length;
  return Math.max(1, Math.round(words / 220));
}
```

Terminal output sits in the same frame.

```bash
$ npm run build
$ npx pagefind --site dist
Indexed 2 pages
```

## Quotes and tables

> Good design is as little design as possible.
> — Dieter Rams

| Property | Value | Note |
|---|---|---|
| Article width | 42rem | roughly 68 characters |
| Line height | 1.78 | body text |
| Colors | 2 | black and white |

## Rules and footers

Content continues below the horizontal rule.

---

That is the end of the reference.
