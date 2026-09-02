/**
 * 사이트 전역 설정. 대부분의 "고치고 싶은 값"은 이 파일 하나에 모여 있습니다.
 */

export const SITE = {
  url: 'https://geongupark.github.io',
  title: 'Geongu Park',
  /** 헤더 워드마크 (짧게 유지) */
  wordmark: 'geongu.park',
  description: '개발하면서 배운 것들을 기록합니다.',
  /** 홈 상단 한 줄 소개 */
  intro: '백엔드와 인프라를 다룹니다. 읽고, 만들고, 남깁니다.',
  author: 'Geongu Park',
  locale: 'ko-KR',
  lang: 'ko',
  /** 목록 페이지당 글 수 */
  postsPerPage: 10,
} as const;

/** 헤더 내비게이션. 페이지를 추가하면 여기에 한 줄만 더하면 됩니다. */
export const NAV: { label: string; href: string }[] = [
  { label: 'Posts', href: '/posts' },
  { label: 'Categories', href: '/categories' },
  { label: 'Tags', href: '/tags' },
  { label: 'About', href: '/about' },
];

/** 푸터 외부 링크. 값이 비어 있으면 렌더링하지 않습니다. */
export const SOCIAL: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/geongupark' },
  { label: 'RSS', href: '/rss.xml' },
];

/**
 * giscus 댓글 설정.
 * https://giscus.app 에서 저장소를 입력하면 repoId / categoryId 를 받을 수 있습니다.
 * repoId 가 비어 있으면 댓글 영역 자체가 렌더링되지 않습니다.
 */
export const GISCUS = {
  repo: 'geongupark/geongupark.github.io',
  repoId: '',
  category: 'Comments',
  categoryId: '',
  mapping: 'pathname',
  reactionsEnabled: '1',
  inputPosition: 'top',
  lang: 'ko',
} as const;
