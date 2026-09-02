# geongupark.github.io

흑백 타이포그래피 중심의 개인 기술 블로그. 마크다운 파일을 커밋하면 그대로 배포됩니다.

```
Astro 7 · Pagefind(검색) · giscus(댓글) · Expressive Code(코드 블록) · GitHub Pages
```

## 빠르게 시작하기

```bash
npm install
npm run dev        # http://localhost:4321
```

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (검색은 동작하지 않음 — 아래 참고) |
| `npm run build` | 정적 빌드 + Pagefind 검색 인덱스 생성 |
| `npm run preview` | 빌드 결과 확인 (**검색은 여기서 확인**) |
| `npm run new "제목"` | 새 글 뼈대 생성 |
| `npm run clean` | 빌드 산출물과 캐시 삭제 |

## 글 쓰기

`src/content/blog/` 에 마크다운(`.md` / `.mdx`) 파일을 만들면 글이 됩니다.

```yaml
---
title: "카프카 컨슈머 랙 잡기"
description: "목록·검색 결과·OG 카드에 쓰이는 한 줄 요약"
date: 2026-09-02
category: backend          # 하나만. 새 이름을 쓰면 카테고리가 자동 생성됩니다
tags: [kafka, 모니터링]     # 여러 개. 태그 페이지도 자동 생성됩니다
draft: false               # true 면 배포에서 제외 (dev 에서는 보임)
updated: 2026-09-10        # 선택
series: "카프카 운영기"      # 선택. 같은 값을 가진 글끼리 묶입니다
---
```

프론트매터는 `src/content.config.ts` 의 스키마로 검증됩니다. 오타가 있으면 **빌드가 실패**하므로
잘못된 글이 배포되지 않습니다.

### 카테고리 / 태그

별도 등록 절차가 없습니다. `category` 나 `tags` 에 새 이름을 쓰면
`/categories/<이름>`, `/tags/<이름>` 페이지가 빌드 때 자동으로 만들어집니다.

### 코드 블록

````markdown
```ts title="src/utils/posts.ts" {3-5}
// 파일명 표시 + 3~5줄 강조 + 복사 버튼
```
````

## 페이지 추가 (CV 등)

`src/pages/` 에 마크다운을 두면 그대로 페이지가 됩니다.

```markdown
---
layout: ../layouts/PageLayout.astro
title: CV
eyebrow: Page
description: 이력
---

## 경력
...
```

메뉴에 노출하려면 `src/config.ts` 의 `NAV` 배열에 한 줄 추가하면 됩니다.

## 검색

[Pagefind](https://pagefind.app)가 빌드 시점에 정적 인덱스를 만듭니다. 서버도 외부 서비스도 필요 없습니다.
`⌘K` 또는 `/` 로 검색창이 열립니다.

> 인덱스는 `npm run build` 단계에서 생성되므로 **`npm run dev` 에서는 검색 결과가 비어 있는 것이 정상**입니다.
> `npm run build && npm run preview` 로 확인하세요.

한글은 형태소 분석(stemming)이 지원되지 않아 조사가 붙은 형태는 완전히 일치하지 않을 수 있습니다.
일반적인 단어 검색에는 문제가 없습니다.

## 댓글 (giscus)

1. 저장소 **Settings → General → Features → Discussions** 체크
2. Discussions 에 `Comments` 카테고리 생성 (Announcement 형식 권장)
3. [giscus.app](https://giscus.app) 에서 저장소를 입력해 `repoId` / `categoryId` 발급
4. `src/config.ts` 의 `GISCUS` 에 값 입력

값이 비어 있으면 댓글 영역 대신 안내 문구가 보입니다.

## 배포

`master` 에 push 하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드 후 GitHub Pages 로 배포합니다.

최초 1회만 **Settings → Pages → Build and deployment → Source 를 `GitHub Actions` 로 변경**해야 합니다.

## 커스터마이징

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 사이트 제목·소개·메뉴·소셜 링크 | `src/config.ts` |
| 색·폰트·간격 (디자인 토큰) | `src/styles/tokens.css` |
| 본문(마크다운) 타이포그래피 | `src/styles/global.css` 의 `.prose` |
| 코드 블록 테마 | `astro.config.mjs` 의 `expressiveCode` |
| OG 카드 디자인 | `src/pages/og/[...slug].png.ts` |

## 구조

```
src/
├─ config.ts            사이트 설정 (제목, 메뉴, giscus)
├─ content.config.ts    글 프론트매터 스키마
├─ content/blog/        ← 글은 전부 여기
├─ pages/
│  ├─ index.astro       홈
│  ├─ posts/            목록 · 페이지네이션 · 본문
│  ├─ categories/       카테고리 인덱스 · 아카이브
│  ├─ tags/             태그 인덱스 · 아카이브
│  ├─ og/               글마다 OG 이미지 자동 생성
│  ├─ about.md          ← 페이지는 이런 식으로 추가
│  ├─ rss.xml.js        RSS
│  └─ 404.astro
├─ layouts/             Base · Page
├─ components/          Header · Footer · Search · TOC · Comments …
├─ styles/              tokens.css · global.css
└─ utils/posts.ts       정렬 · 그룹핑 · 읽는 시간 · 관련 글
```

## 포함된 기능

검색(⌘K) · 댓글 · 카테고리 · 태그 · 시리즈 · 관련 글 · 이전/다음 글 · 목차(스크롤 스파이) ·
다크모드 · RSS · sitemap · robots.txt · OG 이미지 자동 생성 · JSON-LD · 읽는 시간 · 초안(draft) ·
코드 복사 버튼 · 404 · 키보드 내비게이션 · 건너뛰기 링크

## 라이선스

글 콘텐츠(`src/content/`)의 저작권은 작성자에게 있습니다.
