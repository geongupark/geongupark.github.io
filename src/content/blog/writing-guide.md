---
title: "마크다운 표기 점검용 글"
description: "제목, 목록, 표, 코드 블록, 인용이 어떻게 보이는지 한 번에 확인합니다."
date: 2026-09-01
category: blog
tags: [markdown, 디자인]
draft: false
---

이 글은 스타일 확인용입니다. 실제 글을 쓰기 전에 타이포그래피가 어떻게 잡히는지 봅니다.

## 문단과 강조

본문은 최대 42rem 폭으로 제한됩니다. 한글은 `word-break: keep-all` 이라 단어 중간에서 끊기지 않습니다.
**굵게**, *기울임*, `인라인 코드`, ~~취소선~~, 그리고 [링크](https://astro.build)가 있습니다.

### 목록

- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목
- 세 번째 항목

1. 순서가 있는 목록
2. 두 번째
3. 세 번째

## 코드 블록

파일명과 하이라이트 줄을 지정할 수 있습니다.

```ts title="src/utils/posts.ts" {3-5}
export function readingTime(body: string): number {
  const text = body.replace(/```[\s\S]*?```/g, ' ');
  const cjk = (text.match(/[ㄱ-힝]/g) ?? []).length;
  const words = (text.match(/\S+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 500 + words / 220));
}
```

터미널 출력도 자연스럽게 담깁니다.

```bash
$ npm run build
$ npx pagefind --site dist
Indexed 2 pages
```

## 인용과 표

> 좋은 디자인은 최소한의 디자인이다.
> — 디터 람스

| 항목 | 값 | 비고 |
|---|---|---|
| 본문 폭 | 42rem | 약 68자 |
| 행간 | 1.78 | 한글 기준 |
| 색 | 2색 | 흑/백 |

## 각주와 구분선

수평선 아래로 내용이 이어집니다.

---

여기까지가 점검용 내용입니다.
