# 目录结构

目录结构是框架重要的显性特征，是项目组织思路的体现。是否解决开发过程中的组织问题，是框架目录结构设计成功与否的判断标准。

CuttingMat的目录结构是为多人、多模块协同开发场景而设计的，用于实现前端项目**按业务模块拆分**。

## 设计思路

经典Vue项目的`src/`目录简单的按资源类型拆分成`components/`、`views/`、`assets/`这些文件夹，这种结构在多模块并行的项目中缺点明显，随着持续开发很容易产生文件数量巨大的文件夹，开发期间经常要在这些大文件夹之间切换，并在其中找到自己需要的文件，非常浪费时间而且容易犯错，因此多模块项目首先需要实现顶层目录按模块拆分。

具体思路是，`src/`目录按“业务模块”拆分为多个模块文件夹，模块文件夹包含各自独立的路由、页面、组件、静态资源等，业务模块之间原则上互相隔离。开发一个业务模块时，开发者的注意力可以始终集中在模块文件夹内，只有涉及外部依赖时，才会接触到模块外的文件。

模块独立能很大程度上减少文件管理压力，解决开发关注度不集中问题，但模块最终要合并到项目整体中去才能运行，这就需要业务模块有一个明确的、规则的对外表达，告诉别人我做了什么。路由可以完美充当这个角色，一个模块的路由就是一个模块所有功能的体现，路由的合并就是模块的合并。

因此很容易想到`主模块 + 业务模块 * N`这样一个项目结构，各个模块的路由在项目启动时都合并到主模块的路由文件中。这个结构除了实现多模块合并，还可以将主模块做为项目入口，实现一些项目级的公共逻辑或顶层页面框架。

以`system/`模块为例，这个模块主要实现系统设置相关功能，它的路由文件是`system/index.js`：

``` javascript
/**
 * 系统设置模块路由
*/
export default [{
    path: '/system',
    name: '系统设置',
    meta: {
        icon: "&#xe606;"
    },
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/system/account',
    children: [{
        path: 'account',
        name: '账号管理',
        component: (resolve) => require(['./views/AccountList.vue'], resolve)
    }, {
        path: 'role',
        name: '角色管理',
        component: (resolve) => require(['./views/RoleList.vue'], resolve)
    }, {
        path: 'resource',
        name: '资源管理',
        component: (resolve) => require(['./views/ResourceList.vue'], resolve)
    }, {
        path: 'dict',
        name: '字典管理',
        meta: {
            icon: '&#xe601;'
        },
        component: (resolve) => require(['./views/Dict.vue'], resolve)
    }]
}]
```

要将这个模块合并到主模块中，只要在主模块路由文件（`@/main/index.js`）引入并做为子路由数据合并就可以了：

``` javascript
/**
 * main模块路由
*/
import index from './views/index'

import system from '../system'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...system
    ], 
    ...
}]

```

可以看到主模块掌握着首页(`/`)路由，只要将业务模块作为子路由合并进来，业务模块就会被加载。这样一来，主模块路由就相当于项目的模块注册表，可以按需将某个模块注册到项目中来。

基于以上思路，很容易实现按业务模块拆分的文件组织方式，在多人协同项目中可以更好的开发解耦，避免代码冲突，配合git分支策略也很容易实现业务模块分批提测、分批上线。

## 具体实现

**框架整体目录结构**如下所示，`src/`里全部是一个个独立的模块文件夹（除了`/core`），每个模块的代码、资源全部集中在一个文件夹内，各模块的开发关注点完全分离了：

``` js
/**
 * 框架整体目录结构
 * */ 
cutting-mat-project/
    |--public/ 
    |--src/
    |   |--__template/                  // 业务模块模板
    |   |--core/                        // 框架文件(非业务模块)
    |   |--main/                        // 主模块
    |   |--system/                      // 业务模块（内置系统管理模块）
    |   `--user/                        // 业务模块（内置个人中心模块）
    |--.browserslistrc              // 兼容性配置
    |--.eslintrc                    // 代码检查配置
    |--.gitignore                   // git忽略文件配置
    |--babel.config.js              // babel配置
    |--package.json                 // 项目描述文件
    `--vue.config.js                // 项目配置文件
```

**业务模块内部目录结构**实际上可以开发者随意发挥，只要保留模块路由文件`index.js`就可以了。但实际上为了便于模块间的资源复用，模块内部最好也统一目录结构，我们约定的模块目录结构如下：

``` js
/**
 * 业务模块目录结构
 * */ 
cutting-mat-project/
    |--src/
        |--[Moudle Folder]/
            |--api/                             // 接口
            |   `--user.js 
            |--assets/                          // 静态资源
            |   |--img/                             // 图片
            |   |--style.css                        // 模块样式
            |   `--util.js                          // 模块类库
            |--components/                      // 组件
            |   |--myHeader.vue
            |   `--subMenu.vue
            |--views/                           // 页面
            |   |--401.vue
            |   |--404.vue
            |   `--login.vue
            `--index.js                         // 模块路由
```

与模块文件夹并列的`core/`文件夹，顾名思义这里是框架的核心功能实现，主要对应[框架设计](./framework)中的**核心层**及**UI层**。它目录结构：

``` js
/**
 * 框架文件目录结构
 * */ 
cutting-mat-project/
    |--src/
        |--core/
            |--element-theme/                   // Element主题定制相关
            |   |--fonts/
            |   |--img/                         // 叠加自定义样式的依赖图片
            |   |--config.json
            |   |--custom.css                   // 叠加自定义样式
            |   `--index.css
            |--font/                            // iconfont字体图标（global.css依赖）
            |--widget-support/                  // 组件库依赖文件
            |--App.vue                          // 项目根组件
            |--global.css                       // 全局样式（App.vue依赖）
            |--http.js                          // 全局请求配置
            |--index.js                         // 核心功能（默认输出util.js）
            |--main.js                          // 构建入口文件
            |--register.js                      // 全局资源注册器
            |--router.js                        // 全局路由守卫
            |--store.js                         // 内置状态管理模块
            `--util.js                          // 内置工具类
```
