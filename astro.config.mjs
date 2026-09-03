// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

import { SITE } from './src/config.ts';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      // Follow our own `data-theme` attribute rather than the OS media query.
      themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
      useDarkModeMediaQuery: false,
      // Make code blocks use the same black-and-white palette as the page.
      styleOverrides: {
        borderRadius: '0',
        borderWidth: '1px',
        borderColor: 'var(--line)',
        codeBackground: 'var(--bg-subtle)',
        codeFontFamily: 'var(--font-mono)',
        codeFontSize: '0.85em',
        codeLineHeight: '1.7',
        codePaddingBlock: '1rem',
        uiFontFamily: 'var(--font-sans)',
        focusBorder: 'var(--line-strong)',
        frames: {
          shadowColor: 'transparent',
          frameBoxShadowCssValue: 'none',
          editorBackground: 'var(--bg-subtle)',
          editorTabBarBackground: 'var(--bg)',
          editorTabBarBorderBottomColor: 'var(--line)',
          editorActiveTabBackground: 'var(--bg-subtle)',
          editorActiveTabBorderColor: 'var(--line)',
          editorActiveTabForeground: 'var(--fg)',
          editorActiveTabIndicatorTopColor: 'var(--line-strong)',
          editorActiveTabIndicatorBottomColor: 'transparent',
          terminalBackground: 'var(--bg-subtle)',
          terminalTitlebarBackground: 'var(--bg)',
          terminalTitlebarForeground: 'var(--fg-muted)',
          terminalTitlebarBorderBottomColor: 'var(--line)',
          terminalTitlebarDotsForeground: 'transparent',
          terminalTitlebarDotsOpacity: '0',
          inlineButtonBackground: 'var(--fg)',
          inlineButtonForeground: 'var(--fg-muted)',
          inlineButtonBorder: 'var(--line)',
          tooltipSuccessBackground: 'var(--fg)',
          tooltipSuccessForeground: 'var(--bg)',
        },
      },
    }),
    mdx(),
    sitemap({ filter: (page) => !page.includes('/og/') }),
  ],
});
