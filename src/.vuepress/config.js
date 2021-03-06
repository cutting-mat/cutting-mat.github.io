const { defaultTheme } = require("@vuepress/theme-default");

module.exports = {
  title: "CuttingMat",
  description: "面向大中型项目的开发脚手架，助你的Vue项目一臂之力",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  head: [
    [
      "meta",
      {
        name: "keywords",
        content: "CuttingMat,Vue框架,Vue模板,前端模板,Vue项目模板",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    [
      "link",
      {
        rel: "icon",
        href: "/logo.png",
      },
    ],
    [
      "script",
      {
        src: "/assets/js/baidu.js",
      },
    ],
  ],
  theme: defaultTheme({
    logo: "/logo.png",
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "功能",
        link: "/function/core/global-set/",
      },
      {
        text: "配置",
        link: "/config/",
      },
      {
        text: "演示",
        children: [
          {
            text: "cutting-mat-template",
            link: "http://cutting-mat.github.io/template-element-ui/",
            target: "_blank",
          },
          {
            text: "cutting-mat-admin",
            link: "http://cutting-mat.github.io/cutting-mat-admin/",
            target: "_blank",
          },
        ],
      },
      {
        text: "生态",
        children: [
          {
            text: "@cutting-mat/widgets",
            link: "https://cutting-mat.github.io/cutting-mat-widgets",
            target: "_blank",
          },
          {
            text: "@cutting-mat/axios",
            link: "http://cutting-mat.github.io/axios/",
            target: "_blank",
          },
          {
            text: "@cutting-mat/vue-store",
            link: "http://cutting-mat.github.io/vue-store/",
            target: "_blank",
          },
          {
            text: "@cutting-mat/uploader",
            link: "http://cutting-mat.github.io/uploader/",
            target: "_blank",
          },
          {
            text: "@cutting-mat/animater",
            link: "http://cutting-mat.github.io/animater/",
            target: "_blank",
          },
          {
            text: "@cutting-mat/director",
            link: "https://cutting-mat.github.io/director/",
            target: "_blank",
          },
        ], //
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "介绍",
          children: [
            "/guide/", // 介绍
            "/guide/getting-started", // 快速开始
            "/guide/work-flow", // 工作流
            "/guide/community", // 社区
          ],
        },
        {
          text: "指南",
          children: [
            "/guide/intro-catalogue", // 目录结构
            "/guide/intro-routes", // 路由结构
            "/guide/intro-code", // 代码组织
            "/guide/architecture", // 核心流程
            "/guide/appointment", // 开发约定
          ],
        },
      ],
      "/config/": ["/config/"],
      "/function/": [
        {
          text: "核心功能",
          children: [
            "/function/core/global-set/",
            "/function/core/iconfont/",
            "/function/core/request/",
            "/function/core/util/",
            "/function/core/event/",
            "/function/core/component/",
          ],
        },
        {
          text: "核心插件",
          children: [
            "/function/plugin/auth/",
            "/function/plugin/curd/",
            "/function/plugin/dict-control/",
            "/function/plugin/global-function/",
            "/function/plugin/permission/",
            "/function/plugin/store/",
            "/function/plugin/upload/",
          ],
        },
      ],
    },
    repo: "cutting-mat",
    editLink: false,
  }),
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/active-header-links",
    [
      "@vuepress/container",
      {
        type: "info",
        before: (info) =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: "</div>",
      },
    ],
    [
      "@vuepress/plugin-search",
      {
        // 排除首页
        isSearchable: (page) => page.path !== "/",
      },
    ],
  ],
  dest: "dist",
};
