#!/usr/bin/env node
/**
 * npm run new "Post title"  →  creates src/content/blog/<slug>.md
 */
import fs from 'node:fs';
import path from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new "Post title"');
  process.exit(1);
}

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const today = new Date().toLocaleDateString('en-CA');
const dir = path.join(process.cwd(), 'src/content/blog');
const file = path.join(dir, `${slugify(title)}.md`);

if (fs.existsSync(file)) {
  console.error(`File already exists: ${path.relative(process.cwd(), file)}`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
  file,
  `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
date: ${today}
category: etc
tags: []
draft: true
---

`,
  'utf8',
);

console.log(`Created ${path.relative(process.cwd(), file)}`);
