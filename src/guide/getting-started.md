# 快速上手

## 初始化项目

### npm

使用npm初始化CuttingMat项目。

``` bash
npm init @cutting-mat
```

交互式CLI界面，支持三种模板选择：

- `vue-element-ui`：CuttingMat，基于element-ui的PC端项目模板
- `vue-vant`：基于vant-ui的移动端的项目模板（完善中...）
- `electron`：基于electron的客户端项目模板（完善中...）

### git

从 git repository 拉取项目模板。

``` bash
git clone https://github.com/cutting-mat/template-element-ui.git
```

## 开发服务

安装npm依赖，并运行开发服务。

``` bash
npm i               // 安装依赖
npm run serve       // 启动开发服务
npm run build       // 构建生产环境代码
```

## 字体图标

CuttingMat 使用 [iconfont](https://www.iconfont.cn/) 字体图标库。

图标字体目录：`@/core/font/`

## UI组件库

CuttingMat 使用 [Element-UI](https://element.eleme.cn/#/zh-CN/component/changelog) 组件库。

Element-UI自定义主题文件目录：`@/core/element-theme/`

## 框架配置

全局开发配置和构建配置都在`/vue.config.js`中。

::: tip 框架设计
前往[【指南】](/guide/)近一步了解**CuttingMat**
:::
