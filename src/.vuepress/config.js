module.exports = {
  title: 'CuttingMat',
  description: 'CuttingMat - 基于Vue的中台开发框架',
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
        text: '文档',
        link: '/guide/'
      },
      {
        text: '生态系统',
        items: [
          {
            text: '社区',
            link: '/community/'
          },
        ]
      },
    ],
    repo: 'tower1229/CuttingMat-Doc',
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
