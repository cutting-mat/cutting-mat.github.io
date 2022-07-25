# 前端工作流

## 包管理器

NPM / [PNPM](https://www.pnpm.cn/)

> pnpm 通过将依赖安装在电脑上统一的位置，并硬链接到当前项目，意味着多个项目间相同的依赖不需要重复下载安装，从而减少大量硬盘占用和下载时间。

## 构建工具

[Vite](https://cn.vitejs.dev/guide/)

> Vite 极快的开发服务启动时间可以极大提高开发效率

## 代码检查

eslint

> 为前端项目配置[eslint 代码检查规则](https://eslint.bootcss.com/docs/rules/)，可以几乎零成本的在开发中纠正不良的代码书写习惯

## 编辑器

Vscode

Vue 语言特性插件：Vue Language Features (Volar)

代码格式化插件：Prettier - Code formatter

> 为防止 git 提交记录充斥大量格式相关的改动，多人协作牢记一个原则：**不是自己的代码不要格式化**

## 版本控制

Git

开发分支：dev
测试分支：test
生产分支：master

> 代码永远只能从 dev `merge` 到 test，再从 test `merge` 到 master
> 基础数据只能从 dev 环境导入 test 环境，经验证后再导入 master 分支
> 多人协作可以设置一个版本管理员负责 dev 分支，其他开发者自建分支，例如：dev_zhangsan\dev_lisi

## 持续集成

Gitlab + Jenkins

开发环境：对应 dev 分支代码
测试环境：对应 test 分支代码
生产环境：对应 master 分支代码

> 开发测试环境均在内网，外网访问需要登录 VPN

## 产品协作平台

[蓝湖](https://lanhuapp.com/web/#/item)

> 设计原型

## 接口文档

[apifox](https://www.apifox.cn/)

> API 文档、API 调试、API Mock、API 自动化测试
