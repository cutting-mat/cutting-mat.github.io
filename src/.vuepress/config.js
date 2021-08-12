module.exports = {
  title: 'CuttingMat',
  description: 'CuttingMat - 为大中型前端项目/团队提供灵活、可靠、统一、规范的研发解决方案，助你的Vue项目一臂之力',
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
        text: '文档（更新中）',
        link: '/guide/'
      }, {
        text: '示例（内网）',
        link: 'http://cutting-mat.refined-x.com/template-element-ui/#/library/Element/button'
      }, {
        text: '了解更多',
        items: [{
          text: '图标库',
          link: 'https://www.iconfont.cn/',
          target:'_blank'
        }, {
          text: '更新日志',
          link: 'https://github.com/cutting-mat/template-element-ui/tags',
          target:'_blank'
        }, {
          text: '报告BUG',
          link: 'https://github.com/cutting-mat/template-element-ui/issues',
          target:'_blank'
        }, {
          text: '话题讨论',
          link: 'https://github.com/cutting-mat/template-element-ui/discussions',
          target:'_blank'
        }]
      }
    ],
    repo: 'cutting-mat/template-element-ui',
    editLinks: false,
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/': [
        {
          title: '介绍',
          collapsable: false,
          children: [
            '/guide/',                    // cutting mat
            '/guide/getting-started',     // 快速上手
            '/guide/framework',           // 框架设计
            '/guide/framework-structure', // 目录结构
            '/guide/framework-code'       // 代码结构
          ]
        },
        {
          title: '指南',
          collapsable: false,
          children: [
            '/guide/framework-core',      // 框架能力
            '/guide/framework-ui',        // 权限设计
            '/guide/framework-solution',  // 业务封装
            '/guide/framework-config',    // 默认配置
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
