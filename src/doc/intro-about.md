# CuttingMat

## Why

在相当多面向定制的前端团队中，基于 Vue-Cli模板+Element 开始一个项目仍然是惯常做法，随着项目迭代以及开发人员增加，很快就会出现一些普遍性问题，比如：

- 文件目录庞大，找代码越来越费劲
- 引用关系混乱，不知道一段代码被多少地方引用
- 多人协作一不小心就代码冲突了
- 项目内反复造轮子
- 代码冗余又不敢删
- 不同人的开发风格自成一套，质量参差不齐
- ……

**CuttingMat（切割垫板）是基于 Vue 的前端开发脚手架，可以帮助前端团队轻松应对大中型项目挑战。**

## How

CuttingMat 从以下几个方面着手，力求通过架构设计提高前端项目的工程质量：

- **目录结构设计**：按业务模块组织文件，各模块独立管理自己的所有文件，再也不用从漫山遍野的目录中找文件了（[目录结构设计](./catalogue)）

- **路由结构设计**：各模块的路由自由组合成主路由，还可以配置不设防的旁路路由（[路由结构设计](./routes)）

- **核心能力封装**：账号鉴权、权限控制、请求管理、状态管理……，开发者只需要关注业务代码

- **内置高频组件**：上传增强、增删改查、字典控件、数字输入、密码输入……，开发者只需要关注业务代码 Again

- **配套组件库**：进出场动画、大屏效果、echarts图表、baidu地图……，开发者只需要关注业务代码 Again & Again

## What

- [x] 多环境自动适配
- [x] 支持同域子项目间共享登录凭据
- [x] 主路由多套模板（Layout）自由切换
- [x] 天然支持旁路（白名单）的路由结构
- [x] 支持路由、视图、请求任意颗粒度的权限控制（Power By [vue-access-control](https://github.com/tower1229/Vue-Access-Control/blob/master/README_CN.md)）
- [x] 账号鉴权模块，整合登录凭据自动续期功能
- [x] 完整的异步请求管理方案
- [x] 超薄丝滑的请求缓存设计（Power By [@cutting-mat/axios](https://github.com/cutting-mat/axios/blob/main/README_CN.md)）
- [x] 更简单的状态管理（Power By [@cutting-mat/vue-store](https://github.com/cutting-mat/vue-store/blob/main/README_CN.md)）
- [x] 更强大的上传组件（Power By [@cutting-mat/el-upload](https://github.com/cutting-mat/el-upload)）
- [x] 核心功能模块化设计，一键开启/关闭
- [x] 常用组件封装
- [x] 常用 JS 方法封装
- [x] CSS-Reset、IconFont字体图标、常用 CSS 模块
- [x] Vue 全局资源统一注册
- [x] 兼容IE
- [x] Eslint 代码风格校验
- [x] SplitChunks 打包配置
- [ ] 数据大屏场景解决方案（开发中）
- [ ] 配套组件库（开发中）

附一个完整的架构图（右键在新标签中打开，查看高清大图）：

![架构图](/assets/img/CuttingMat.png)
