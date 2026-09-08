import { renderMermaidSync } from 'beautiful-mermaid';

/**
 * Diagrams are rendered to SVG at build time, so a page with a diagram still
 * ships no JavaScript for it.
 *
 * Every color is handed in as a CSS custom property rather than a literal, so a
 * single SVG serves both themes: the page's own tokens resolve inside the
 * diagram, and switching the theme repaints it with no re-render.
 */
const RENDER_OPTIONS = {
  bg: 'var(--diagram-bg)',
  fg: 'var(--diagram-fg)',
  line: 'var(--diagram-line)',
  accent: 'var(--diagram-accent)',
  muted: 'var(--diagram-muted)',
  surface: 'var(--diagram-surface)',
  border: 'var(--diagram-border)',
  // A sentinel, swapped out below. Left alone, the library writes a Google Fonts
  // @import into every diagram, which this site does not want.
  font: '__DIAGRAM_FONT__',
  transparent: true,
};

const FONT_IMPORT = /\s*@import\s+url\([^)]*\);?/g;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** ```mermaid title="Deploy pipeline" → the caption and the accessible name. */
function readTitle(meta: string | undefined): string | undefined {
  return meta ? /title="([^"]*)"/.exec(meta)?.[1] : undefined;
}

/**
 * Returns the `<figure>` markup for a diagram, or `null` when the source is not
 * something we can draw — the caller then leaves it as an ordinary code block.
 */
export function diagramFigure(source: string, meta?: string): string | null {
  let svg: string;

  try {
    svg = renderMermaidSync(source, RENDER_OPTIONS);
  } catch {
    return null;
  }

  svg = svg.replace(FONT_IMPORT, '').replace(/'__DIAGRAM_FONT__'/g, 'var(--font-sans)');

  const title = readTitle(meta);

  if (title) {
    svg = svg.replace('<svg ', `<svg role="img" aria-label="${escapeHtml(title)}" `);
  }

  return [
    '<figure class="diagram">',
    svg,
    title ? `<figcaption>${escapeHtml(title)}</figcaption>` : '',
    '</figure>',
  ].join('');
}
