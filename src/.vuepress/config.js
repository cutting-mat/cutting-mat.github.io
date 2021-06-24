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
      }, {
        text: '示例',
        link: '/example/'
      }
    ],
    repo: 'cutting-mat/cutting-mat.github.io',
    editLinks: false,
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/': [
        {
          title: '介绍',
          collapsable: false,
          children: [
            '/guide/',  // cutting mat
            '/guide/getting-started', // 快速上手
            '/guide/framework', // 框架设计
            '/guide/framework-structure', // 框架结构：目录结构、代码组织、UI
          ]
        },
        {
          title: '指南',
          collapsable: false,
          children: [
            '/guide/ability', // 框架能力
            '/guide/auth',    // 权限设计
            '/guide/config',  // 默认配置
            '/guide/solution',  // 解决方案
          ]
        },
        {
          title: '约定',
          collapsable: false,
          children: [
            '/guide/appointment-dev',  // 开发约定
            '/guide/appointment-thinking',  // 封装思路
            '/guide/appointment-code',  // 代码管理
            '/guide/appointment-department',  // 部门协作
            
          ]
        }
      ],
      '/example/': [
        {
          title: '示例',
          collapsable: false,
          children: [
            '/example/',
          ]
        },
        {
          title: 'ElementUI组件',
          collapsable: false,
          children: [
            '/example/element', 
          ]
        },
        {
          title: '内置组件',
          collapsable: false,
          children: [
            '/example/encapsulation', 
          ]
        }
      ]
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
