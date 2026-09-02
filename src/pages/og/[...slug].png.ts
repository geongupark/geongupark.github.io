import path from 'node:path';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';

import { SITE } from '../../config';
import { formatDate, getPosts } from '../../utils/posts';

const require = createRequire(import.meta.url);

function pretendardDir(): string {
  try {
    return path.join(path.dirname(require.resolve('pretendard/package.json')), 'dist/public/static');
  } catch {
    return path.join(process.cwd(), 'node_modules/pretendard/dist/public/static');
  }
}

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: 'normal' }[]> | null = null;

function loadFonts() {
  fontsPromise ??= (async () => {
    const dir = pretendardDir();
    const [regular, bold] = await Promise.all([
      fs.readFile(path.join(dir, 'Pretendard-Regular.otf')),
      fs.readFile(path.join(dir, 'Pretendard-Bold.otf')),
    ]);
    return [
      { name: 'Pretendard', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Pretendard', data: bold, weight: 700 as const, style: 'normal' as const },
    ];
  })();
  return fontsPromise;
}

const truncate = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;

/** satori 는 JSX 대신 순수 객체 트리도 받습니다. */
const el = (type: string, style: Record<string, unknown>, children: unknown = undefined) => ({
  type,
  props: { style, children },
});

export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    {
      params: { slug: 'default' },
      props: { eyebrow: SITE.url.replace(/^https?:\/\//, ''), title: SITE.title, subtitle: SITE.description },
    },
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: {
        eyebrow: `${post.data.category} · ${formatDate(post.data.date)}`,
        title: post.data.title,
        subtitle: post.data.description,
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const { eyebrow, title, subtitle } = props as { eyebrow: string; title: string; subtitle: string };

  const markup = el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '1200px',
      height: '630px',
      padding: '72px',
      backgroundColor: '#ffffff',
      color: '#101010',
      fontFamily: 'Pretendard',
      border: '10px solid #101010',
    },
    [
      el(
        'div',
        { display: 'flex', fontSize: '24px', letterSpacing: '0.12em', color: '#8f8f8f', textTransform: 'uppercase' },
        truncate(eyebrow, 48),
      ),
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el(
          'div',
          { display: 'flex', fontSize: '68px', fontWeight: 700, lineHeight: 1.22, letterSpacing: '-0.02em' },
          truncate(title, 58),
        ),
        el(
          'div',
          { display: 'flex', marginTop: '24px', fontSize: '28px', lineHeight: 1.5, color: '#666666' },
          truncate(subtitle ?? '', 76),
        ),
      ]),
      el('div', { display: 'flex', justifyContent: 'space-between', fontSize: '24px', color: '#101010' }, [
        el('div', { display: 'flex', fontWeight: 700 }, SITE.wordmark),
        el('div', { display: 'flex', color: '#8f8f8f' }, SITE.author),
      ]),
    ],
  );

  const svg = await satori(markup as never, {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
