import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Coding On Way",
  description: "Coding, the thing i like!",
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
  lastUpdated: true
})
