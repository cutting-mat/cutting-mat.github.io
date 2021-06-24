module.exports = {
  title: 'CuttingMat',
  description: 'CuttingMat - 助你的Vue项目一臂之力',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: '首页',
        link: '/'
      }, {
        text: '文档',
        link: '/guide/'
      }
    ],
    repo: 'cutting-mat/cutting-mat.github.io',
    editLinks: false,
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            '/guide/',
            '/guide/component-props',
          ]
        },
        {
          title: '深入组件',
          collapsable: false,
          children: [
            '/guide/',
            '/guide/component-props',
          ]
        },
      ],
    },
  },
  plugins: [
    [
      'vuepress-plugin-container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  },
  dest: 'docs'
}
