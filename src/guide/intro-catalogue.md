# 目录结构

框架默认采用模块化目录结构，按业务拆分成若干独立模块，实现模块间开发解耦，非常适合多业务模块、多人协同开发的场景。

整体目录结构如下：

``` js
|--public/                      // 静态文件
|--src/
|   |--__template/                      // 模块模板文件
|   |--core/                            // 核心文件（框架）
|   |--main/                            // 主模块
|   |--system/                          // 业务模块（内置系统管理）
|   |--user/                            // 业务模块（内置用户管理）
|   |--App.vue                          // Vue 根组件
|   |--main.js                          // 构建入口
|   |--plugin.dict-control.config.js    // 字典控件配置（框架）
|   |--plugin.global-function.config.js // 全局功能配置（框架）
|   |--plugin.permission.config.js      // 权限功能配置（框架）
|   |--plugin.store.config.js           // 状态管理配置（框架）
|   |--plugin.upload.config.js          // 上传组件配置（框架）
|   |--pre-install.js                   // 预安装文件（框架）
|   |--request.config.js                // 请求配置（框架）
|   ·--route.config.js                  // 路由配置（框架）
|--.browserslistrc              // 兼容性配置
|--.eslintrc                    // 代码检查配置
|--.gitignore                   // git 忽略配置
|--babel.config.js              // babel 配置
|--package.json                 // 项目描述
·--vue.config.js                // Vue-CLI 配置
```

除了眼熟的Vue-CLI标准模板文件，标注（框架）的文件是脚手架自身的功能实现和必要的配置文件，忽略掉这些之后`src/`目录里只剩下一个主模块和两个业务模块：

```js
src/
  |--main (主模块)
  |--system (业务模块)
  |--user (业务模块)
  |--……

```

这是框架的最主要特征：**以模块做为项目文件的基本组织单位**，根据业务模型，整个项目被拆分成物理意义上的若干模块文件夹。

## 模块化设计

每个模块文件夹包含该模块业务开发需要的所有文件，包括：接口定义、静态文件（图片、样式、脚本）、组件、路由配置，除了核心功能和跨模块复用的功能外，一个模块完全可以自给自足。因此，开发者在开发过程中可以始终将关注点聚焦在当前模块内，从而将大型前端项目的代码管理压力降到最低。

模块的内部结构在技术上并没有限制，但为了统一风格便于协作，我们约定模块的目录结构如下：

``` js
    |--api/                             // 请求接口
    |   ·--user.js 
    |--assets/                          // 依赖
    |   |--img/
    |   |--style.css
    |   ·--util.js
    |--components/                      // 组件
    |   ·--myComponents.vue
    |--views/                           // 页面
    |   |--Index.vue
    |   ·--List.vue
    ·--index.js                         // 模块路由
```

每个模块可以根据自己的业务范围输出一个路由数组，最终所有模块的路由都将在路由配置文件（`@/route.config.js`）中汇合。比如系统设置模块的路由可能是这样的：

``` js
export default [{
    path: '/system',
    name: '系统设置',
    meta: {
        icon: ''
    },
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/system/Profile',
    children: [{
        path: 'Profile',
        name: '个人信息',
        component: (resolve) => require(['./views/Profile.vue'], resolve)
    }, {
        path: 'Password',
        name: '修改密码',
        meta: {
            hide: true
        },
        component: (resolve) => require(['./views/Password.vue'], resolve)
    }, {
        path: 'Dict',
        name: '字典管理',
        meta: {
            icon: ''
        },
        component: (resolve) => require(['./views/Dict.vue'], resolve)
    }]
}]
```

以模块为单位的路由注册，天然实现了各业务模块的开发解耦，开发过程中各个模块通常只修改自己的文件，只要路由没有最终注册到项目中，就基本不会发生代码冲突。

## 主模块与业务模块

严格来说所有模块都是平等的，并无主次之分，所谓的主模块和业务模块，实际上是基于一种约定成俗的网站结构：一个站点的所有页面都会采用相同的页面基础布局，比如相同的头部、底部样式，[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)正是为这种场景而设计的，与之对应的路由结构是首页作为根路由（`'/'`），其他所有路由均为做首页的子路由（或后代路由），从而共享首页的页面布局。主模块就是实现了网站首页的模块，业务模块则主要实现其他页面。

除了路由中至少要包含根路由（`'/'`），主模块通常也作为公共资源模块。比如框架内置的主模块还实现了登录页、错误页这种公共路由；像上传这种不专属任何业务模块的公共接口也可以定义在主模块里。

模块的路由结构没有限制，但建议将从属于同一功能模块的页面由一个共同的主页组成[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)，便于实现模块级通用样式。

```js
/#/MoudleName
+------------------------+ 
| ./views/Index.vue      |
| +--------------------+ |
| | ./views/List.vue   | |
| |                    | |
| |                    | |
| +--------------------+ |
+------------------------+
```

更多路由相关内容，请参考[路由结构](/guide/intro-routes)。
