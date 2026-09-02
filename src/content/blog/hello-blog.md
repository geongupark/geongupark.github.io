---
title: "블로그를 새로 지었습니다"
description: "Astro로 흑백 타이포그래피 블로그를 만들었습니다. 글 쓰는 법과 구조를 정리해 둡니다."
date: 2026-09-02
category: blog
tags: [astro, 회고]
draft: false
---

기술 블로그를 다시 만들었습니다. 목표는 하나였습니다. **글 쓰는 것 말고는 아무것도 하지 않아도 되는 블로그.**

## 원칙

1. 마크다운 파일 하나가 글 하나다. 그 외의 등록 절차는 없다.
2. 색은 흑과 백뿐이다. 강조는 굵기와 여백으로 한다.
3. 검색은 서버 없이 동작한다.

## 글 쓰는 법

`src/content/blog/` 에 마크다운 파일을 하나 만들고 커밋하면 끝입니다.

```bash title="새 글 만들기"
npm run new "카프카 컨슈머 랙 잡기"
# → src/content/blog/kafka-consumer-lag.md 생성
```

프론트매터는 이렇게 생겼습니다.

```yaml title="src/content/blog/example.md"
---
title: "제목"
description: "목록과 검색 결과, OG 카드에 쓰이는 한 줄 요약"
date: 2026-09-02
category: backend      # 새 이름을 적으면 카테고리가 자동 생성됩니다
tags: [kafka, 모니터링] # 태그 페이지도 자동 생성됩니다
draft: false           # true 면 배포에서 제외됩니다
---
```

`category` 에 지금까지 없던 이름을 적으면 `/categories/backend` 페이지가 **알아서** 생깁니다.
설정 파일을 고칠 일은 없습니다. 태그도 같습니다.

## 페이지 추가

`src/pages/` 에 마크다운을 두면 그대로 페이지가 됩니다.

```markdown title="src/pages/cv.md"
---
layout: ../layouts/PageLayout.astro
title: CV
---

## 경력
...
```

메뉴에 띄우려면 `src/config.ts` 의 `NAV` 배열에 한 줄만 더합니다.

## 검색

`⌘K`(또는 `/`)를 누르면 검색창이 열립니다. 제목·본문·카테고리를 모두 훑습니다.
[Pagefind](https://pagefind.app)가 빌드할 때 정적 인덱스를 만들어 두기 때문에
서버도, 외부 서비스도 필요 없습니다.

> 인덱스는 `npm run build` 이후에 생성됩니다. `npm run dev` 에서는 검색이 비어 있는 게 정상입니다.

## 남은 것

댓글은 giscus로 붙여 두었습니다. GitHub Discussions에 스레드가 하나씩 쌓입니다.
이제 정말 글만 쓰면 됩니다.
