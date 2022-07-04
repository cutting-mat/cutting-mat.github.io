# CuttingMat

## Why

在前端项目中，基于 Vue-Cli 模板 + ElementUI 初始化一个项目是惯常做法，随着项目迭代以及开发人员增加，很快就会出现一些普遍性问题，比如：

- 单一文件夹文件数巨大，找代码费劲
- 引用关系混乱，不知道一段代码被多少地方引用
- 多人协作代码冲突
- 项目内反复造轮子
- 代码冗余又不敢删
- 多人开发风格自成一套，质量参差不齐
- ……

**CuttingMat（切割垫板）是基于 Vue 的前端开发脚手架，可以帮助前端团队轻松应对大中型项目挑战。**

## How

CuttingMat 从以下几个方面着手，力求通过架构设计提高前端项目的工程质量：

- **目录结构设计**：按业务模块组织文件，各模块独立管理自己的所有文件，再也不用从漫山遍野的目录中找文件了（[目录结构设计](/guide/intro-catalogue)）

- **路由结构设计**：各模块的路由自由组合成主路由，还可以配置不设防的旁路路由（[路由结构设计](/guide/intro-routes)）

- **核心能力封装**：权限、请求、状态……，开发者只需要关注业务代码

- **内置高频组件**：上传、CURD、字典……，开发者只需要关注业务代码 Again

- **配套组件库**：数据大屏、图表、地图……，开发者只需要关注业务代码 Again & Again

## What

- :white_check_mark: 开发、测试、生产，多环境自动适配
- :white_check_mark: 基于角色实现路由、视图、请求任意颗粒度的权限控制（Power By [vue-access-control](https://github.com/tower1229/Vue-Access-Control/blob/master/README_CN.md)）
- :white_check_mark: 用户认证，前端支持同域子项目单点登录，整合 Token 续期方案
- :white_check_mark: 完整的异步请求管理方案，支持请求加密
- :white_check_mark: 丝滑无感的请求缓存设计（Power By [@cutting-mat/axios](https://github.com/cutting-mat/axios/blob/main/README_CN.md)）
- :white_check_mark: 集成 Pinia 状态管理 ~~更简单的状态管理（Power By [@cutting-mat/vue-store](https://github.com/cutting-mat/vue-store/blob/main/README_CN.md)）~~
- :white_check_mark: 更强大的上传组件（Power By [@cutting-mat/uploader](https://github.com/cutting-mat/uploader)）
- :white_check_mark: 插件机制，核心功能可插拔
- :white_check_mark: 内置常用组件
- :white_check_mark: 内置工具类方法
- :white_check_mark: 内置 CSS-Reset、IconFont 字体图标、常用 CSS 模块
- :white_check_mark: 全局资源统一注册
- :white_check_mark: 兼容 IE（仅限 template-element-ui）
- :white_check_mark: Eslint 代码风格校验
- :white_check_mark: 由 Vite 提供的开发构建服务
- :hourglass: 配套组件库（[cutting-mat-widgets](https://github.com/cutting-mat/cutting-mat-widgets)）
- :hourglass: 配套解决方案模板项目（[cutting-mat-admin](https://github.com/cutting-mat/cutting-mat-admin)）

附一个完整的架构图（右键在新标签中打开，查看高清大图）：

![架构图](/assets/img/CuttingMat框架设计.png)
