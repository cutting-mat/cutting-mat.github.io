module.exports = {
  title: 'CuttingMat',
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
    navbar: [
      {
        text: '首页',
        link: '/'
      }, {
        text: '指南',
        link: '/guide/',
      }, {
        text: '功能',
        link: '/function/',
      }, {
        text: '演示',
        link: 'http://cutting-mat.refined-x.com/template-element-ui/'
      }, {
        text: '插件',
        children: [{
          text: '@cutting-mat/axios',
          link: 'http://cutting-mat.refined-x.com/axios/',
          target: '_blank'
        }, {
          text: '@cutting-mat/vue-store',
          link: 'http://cutting-mat.refined-x.com/vue-store/',
          target: '_blank'
        }, {
          text: '@cutting-mat/uploader',
          link: 'http://cutting-mat.refined-x.com/el-upload/',
          target: '_blank'
        }, {
          text: '@cutting-mat/animater',
          link: 'http://cutting-mat.refined-x.com/animater/',
          target: '_blank'
        }]
      }],
    sidebar: [
      {
        text: '指南',
        children: [
          {
            text: '介绍',
            children: [
              '/guide/',                    // 介绍
              '/guide/getting-started',         // 快速开始
              '/guide/community',              // 社区
            ]
          },
          {
            text: '指南',
            children: [
              '/guide/intro-catalogue',         // 目录结构
              '/guide/intro-routes',            // 路由结构
              '/guide/intro-code',               // 代码组织
              '/guide/icon',   // 字体图标
              '/guide/guide-config',             // vue-cli 配置、babel 兼容性配置、eslint 代码检查配置、vue 全局功能配置、多环境配置
              '/guide/appointment-dev',          // 开发约定
            ]
          },
        ]
      }, {
        text: '功能',
        children: [
          '/function/core',
          '/function/plugin',
          '/function/component',
          '/function/solution'

        ]
      }
    ],
    repo: 'cutting-mat',
    editLinks: false,

  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/active-header-links',
    [
      '@vuepress/container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ],

  ],
  dest: 'docs'
}
