import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** 발행된 글을 최신순으로. dev 에서는 draft 도 함께 보여줍니다. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** 카테고리별 글 묶음 (글 수 내림차순) */
export function groupByCategory(posts: Post[]) {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    const key = post.data.category;
    map.set(key, [...(map.get(key) ?? []), post]);
  }
  return [...map.entries()]
    .map(([name, items]) => ({ name, slug: slugify(name), posts: items }))
    .sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
}

/** 태그별 글 묶음 (글 수 내림차순) */
export function groupByTag(posts: Post[]) {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, [...(map.get(tag) ?? []), post]);
    }
  }
  return [...map.entries()]
    .map(([name, items]) => ({ name, slug: slugify(name), posts: items }))
    .sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
}

/** 한글/영문을 함께 고려한 대략적인 읽는 시간(분) */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_~\-|]/g, ' ');
  const cjk = (text.match(/[ㄱ-힝一-鿿぀-ヿ]/g) ?? []).length;
  const words = (text.replace(/[ㄱ-힝一-鿿぀-ヿ]/g, ' ').match(/\S+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 500 + words / 220));
}

/** 같은 카테고리 > 겹치는 태그 순으로 관련 글 추천 */
export function relatedPosts(current: Post, all: Post[], limit = 3): Post[] {
  return all
    .filter((post) => post.id !== current.id)
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
      const sameCategory = post.data.category === current.data.category ? 2 : 0;
      return { post, score: sharedTags + sameCategory };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf())
    .slice(0, limit)
    .map(({ post }) => post);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  })
    .format(date)
    .replace(/\.$/, '');
}

export function isoDate(date: Date): string {
  return date.toISOString();
}
