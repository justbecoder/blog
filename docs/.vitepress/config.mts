import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Coding On Way",
  description: "Coding, the thing i like!",
  base: "/blog/",
  markdown: {
    math: true,
    lineNumbers: true
  },

  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-0FX37RZWTG' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-0FX37RZWTG');`
    ]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/justbecoder/blog/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples/markdown-examples' },
      { text: 'LeetCode', link: '/leetcode' },
      { text: '前端面试集锦', link: '/fe/index' }
    ],

    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        scanStartPath: 'examples',
        resolvePath: '/examples/',
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'leetcode',
        resolvePath: '/leetcode/',
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'fe',
        resolvePath: '/fe/',
        useTitleFromFileHeading: true
      }
    ]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
})
