#!/usr/bin/env node
/**
 * npm run new "글 제목"  →  src/content/blog/<slug>.md 생성
 */
import fs from 'node:fs';
import path from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('사용법: npm run new "글 제목"');
  process.exit(1);
}

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
const dir = path.join(process.cwd(), 'src/content/blog');
const file = path.join(dir, `${slugify(title)}.md`);

if (fs.existsSync(file)) {
  console.error(`이미 있는 파일입니다: ${path.relative(process.cwd(), file)}`);
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

console.log(`생성됨: ${path.relative(process.cwd(), file)}`);
