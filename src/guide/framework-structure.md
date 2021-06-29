# 目录结构

CuttingMat 的目录结构是以实现**业务模块拆分**为目标而设计的。

## 设计思路

经典Vue项目的`src/`目录结构在大型项目中缺点明显，随着持续开发很容易产生大量的路由、`vue`文件、接口定义和静态资源，让`components/`、`views/`、`assets/`这些文件夹规模剧增，给团队协作和代码组织带来极大挑战，因此大项目首先需要从显示的文件管理角度实现业务模块拆分。

业务模块拆分的思路是，项目以“业务”为颗粒度拆分为N个模块文件夹，每个文件夹包含模块自己的接口、静态资源、组件、页面、路由文件。当开发业务模块时，开发者的注意力可以集中在当前模块文件夹内，只有涉及外部依赖，或者对外提供依赖时，才会接触到模块外部。

模块间相互独立，但所有业务模块最终要融合到项目整体中去，这就需要模块有一个明确、规则的对外表达，告诉别人我做了什么。路由可以完美充当这个角色，一个模块的路由就是一个模块的所有功能体现，模块的合并就是路由的合并。

以`system/`模块为例，这个模块的路由文件（`system/index.js`）是这样的：

``` javascript
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

就是输出了一段普通的路由，那怎样将他们合并到项目整体中呢，在主模块路由里（`main/index.js`）

``` javascript
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

可以看到主模块路由掌握着首页(`/`)路由，只要将其他模块路由作为子路由合并进来，模块就会被加载。这样一来，主模块路由就相当于项目的模块注册表，可以按需的某个模块注册到项目中来。

基于以上思路，很容易实现按业务模块拆分的文件组织方式，在多人协同项目中可以更好的开发解耦，避免代码冲突，配合git分支策略也很容易实现业务模块分批提测、分批上线。

## 整体目录结构

框架的目录结构如下所示，可以看到`src/`里除了`main.js`之外就是一个个的文件夹：

``` bash
cutting-mat-project/
    |--public/ 
    |--src/
    |   |--__template/                  // 模块模板
    |   |--core/                        // 框架文件
    |   |--main/                        // 主模块
    |   |--system/                      // 系统管理模块（内置业务模块）
    |   |--user/                        // 个人中心模块（内置业务模块）
    |   `--main.js                      // 入口文件
    |--.browserslistrc              // 兼容性配置
    |--.eslintrc                    // 代码检查配置
    |--.gitignore                   // git忽略文件配置
    |--babel.config.js              // babel配置
    |--package.json                 // 项目描述文件
    `--vue.config.js                // vue-cli配置
```

## 模块目录结构

每个模块的内部目录结构实际上可以开发者随意发挥，只要保留模块路由文件`index.js`就可以了，但实际上为了便于模块间的资源引用，模块间最好统一目录结构，我们约定的模块结构如下：

``` bash
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

## 框架文件

项目里还有一个`core/`文件夹，顾名思义这里是框架的核心功能实现，它目录结构：

``` bash
cutting-mat-project/
    |--src/
        |--core/
            |--element-theme/                   // Element主题
            |   |--fonts/
            |   |--img/
            |   |--config.json
            |   |--custom.css                   // 针对ElementUI的自定义样式
            |   `--index.css
            |--font/                            // iconfont字体图标（global.css依赖）
            |   |--img/ 
            |   |--style.css 
            |   `--util.js 
            |--api.js                           // 全局请求配置
            |--App.vue                          // vue根组件
            |--global.css                       // 全局样式（App.vue依赖）
            |--index.js                         // 框架工具类
            |--register.js                      // vue全局资源注册器
            |--router.js                        // 全局路由守卫
            |--store.js                         // 简单store模式的状态管理
            `--widget-amount-report.js          // 组件上报（组件库依赖）
```
