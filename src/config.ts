/**
 * Site-wide settings. Almost everything you'd want to tweak lives in this one file.
 */

export const SITE = {
  url: 'https://geongupark.github.io',
  title: 'Geongu Park',
  /** Header wordmark — keep it short. */
  wordmark: 'geongu.park',
  description: 'Notes on the things I build and the things that break.',
  /** One-line introduction on the home page. */
  intro: 'Backend and infrastructure. I read, I build, I write it down.',
  author: 'Geongu Park',
  locale: 'en-US',
  lang: 'en',
  /** Posts per page in the archive. */
  postsPerPage: 10,
} as const;

/** Header navigation. Adding a page means adding one line here. */
export const NAV: { label: string; href: string }[] = [
  { label: 'Posts', href: '/posts' },
  { label: 'Categories', href: '/categories' },
  { label: 'Tags', href: '/tags' },
  { label: 'About', href: '/about' },
];

/** Footer links. Anything left out simply isn't rendered. */
export const SOCIAL: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/geongupark' },
  { label: 'RSS', href: '/rss.xml' },
];

/**
 * giscus comments.
 * Enter this repository at https://giscus.app to get `repoId` and `categoryId`.
 * While `repoId` is empty the comment section is not rendered at all.
 */
export const GISCUS = {
  repo: 'geongupark/geongupark.github.io',
  repoId: '',
  category: 'Comments',
  categoryId: '',
  mapping: 'pathname',
  reactionsEnabled: '1',
  inputPosition: 'top',
  lang: 'en',
} as const;
