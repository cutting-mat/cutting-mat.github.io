# 快速上手

## 初始化项目

使用npm初始化CuttingMat项目。

``` bash
npm init @cutting-mat
```

交互式CLI界面，支持三种模板选择：

- `vue-element-ui`：CuttingMat，基于element-ui的PC端项目模板
- `vue-vant`：基于vant-ui的移动端的项目模板（完善中...）
- `electron`：基于electron的客户端项目模板（完善中...）

或者从 git repository 拉取项目模板。

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

图标字体文件目录：`@/core/assets/font/`

## 三方UI组件

CuttingMat 使用Element-UI组件库，[官方文档](https://element.eleme.cn/#/zh-CN/component/changelog)。

Element[自定义主题](https://element.eleme.cn/#/zh-CN/theme)文件位置：`@/core/element-theme/`

如需使用Element自定义主题，只需将主题文件保存到主题文件位置，并在`@/main.js`中开启应用主题样式的注释：

```js
//import 'element-ui/lib/theme-chalk/index.css';
import '@/core/element-theme/index.css';
```

## 新增一个模块

CuttingMat 是模块化的组织思路，API、页面、组件、静态资源、路由都包含在模块中，所有第一步要从新建模块开始。

为便于快速创建新模块，项目内置了模块模板（`@/__template/`），只需复制模板文件夹并重命名为你的模块名称，比如`myFirstMoudle`，就完成了新模块的文件初始化。

下一步是注册模块的路由，`@/myFirstMoudle/index.js`文件就是模块的路由，初始状态应该是这样的：

```js
export default [{
    path: '/template',
    name: '模块模板',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/template/list',
    children: [{
        path: 'list',
        name: '列表',
        component: (resolve) => require(['./views/List.vue'], resolve),
        meta: {
            icon: '',                   // 字体图标
            title: '',                  // 展示名
            hide: true,                 // 在导航中隐藏
            belong: 'ROUTE NAME'        // 导航当前状态归属
        }
    }]
}]
```

我们需要根据模块内容修改路由，比如这样：

```js
export default [{
    path: '/myFirstMoudle',
    name: '新模块',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/myFirstMoudle/list',
    children: [{
        path: 'list',
        name: '新模块列表',
        component: (resolve) => require(['./views/List.vue'], resolve)
    }]
}]
```

然后打开项目的模块配置文件（`@/module.config.js`），在这里将新模块注册为一个子模块：

```js
...
// 子模块
import system from '@/system'
import user from '@/user'
+ import myFirstMoudle from '@/myFirstMoudle'

export const subModules =  [
+    ...myFirstMoudle,
    ...system,
    ...user,
]

```

一个新模块就创建完成了，其包含自己的API、静态资源、组件、页面和路由，如果你熟悉Vue开发，应该很清楚该如何继续开发。

## 社区

- [Github Discussions](https://github.com/cutting-mat/template-element-ui/discussions)
- QQ群：361917044
- 微信群（扫码备注加群）

![加群](/assets/img/refined-x.jpg)
