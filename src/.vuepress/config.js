module.exports = {
  title: 'cutting-mat: Vue项目脚手架',
  description: '面向大中型项目的开发脚手架，助你的Vue项目一臂之力',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    ['meta', { name: 'keywords', content: 'CuttingMat,Vue框架,Vue模板,前端模板,Vue项目模板' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ],
    ["script",
      {
        src: "/assets/js/baidu.js"
      }
    ]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: '首页',
        link: '/'
      }, {
        text: '文档（更新中）',
        link: '/doc/intro-about/'
      }, {
        text: '示例',
        link: 'http://cutting-mat.refined-x.com/template-element-ui/#/library'
      }, {
        text: '了解更多',
        items: [{
          text: '图标库',
          link: 'https://www.iconfont.cn/',
          target: '_blank'
        }, {
          text: '更新日志',
          link: 'https://github.com/cutting-mat/template-element-ui/tags',
          target: '_blank'
        }, {
          text: '报告BUG',
          link: 'https://github.com/cutting-mat/template-element-ui/issues',
          target: '_blank'
        }, {
          text: '话题讨论',
          link: 'https://github.com/cutting-mat/template-element-ui/discussions',
          target: '_blank'
        }]
      }
    ],
    repo: 'cutting-mat',
    editLinks: false,
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/doc/': [
        {
          title: '介绍',
          collapsable: false,
          children: [
            '/doc/intro-about',                    // cutting mat
            '/doc/intro-getting-started',     // 快速上手
            '/doc/intro-catalogue',          // 目录结构
            '/doc/intro-routes'       // 路由结构
          ]
        },
        {
          title: '指南',
          collapsable: false,
          children: [
            '/doc/guide-core',           // 框架能力
            '/doc/guide-ui',             // 权限设计
            '/doc/guide-solution',       // 业务封装
            '/doc/guide-config',         // 默认配置
          ]
        },
        {
          title: '约定',
          collapsable: false,
          children: [
            '/doc/appointment-dev',          // 开发约定
            '/doc/appointment-thinking',     // 封装思路
            '/doc/appointment-code',         // 代码管理
            '/doc/appointment-department',   // 部门协作

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
    ],
    ['sitemap', {
      hostname: "https://cutting-mat.refined-x.com",
      // 排除无实际内容的页面
      exclude: ["/404.html"]
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
