# 目录结构

CuttingMat 的目录结构是以**业务模块拆分**为目标设计的。

## 设计构思

经典Vue项目的`src/`的目录结构在大型项目中缺点明显，随着持续开发很容易产生大量的路由、`vue`文件、接口定义和静态资源，让`components/`、`views/`、`assets/`这些文件夹规模剧增，给团队协作和代码组织带来极大挑战，因此大项目需要从目录结构上实现业务模块拆分。

业务模块拆分的思路是，整个项目拆分为N个业务模块文件夹，每个文件夹包含模块自己的接口、静态资源、组件、页面、路由文件。当开发业务模块时，开发者的注意力可以集中在当前模块文件夹内，只有涉及外部依赖，或者对外提供依赖时，才会接触到模块外部。

模块之间相互独立，但所有业务模块最终要融合到项目整体中去，这就需要模块有一个明确、规则的对外表达，告诉别人我做了什么，路由可以完美充当这个角色，一个模块的路由就是一个模块的所有功能体现，模块的合并就是路由的合并。

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

就是输出了一段普通的路由，怎样将他们合并到项目整体路由中呢，在主模块路由里（`main/index.js`）

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

可以看到主模块路由掌握着首页(`/`)路由，只要将其他模块路由作为子路由合并进来，模块就会被加载。主模块路由相当于模块注册表，合并一个模块的路由，就相当于把这个模块注册到项目中来。

基于以上思路，可以实现按业务模块拆分的文件组织能力，在多人协同项目中可以更好的开发解耦，避免代码冲突，配合git分支策略也很容易实现业务模块分批提测、分批上线。

## 整体目录结构

框架的目录结构如下：

``` bash
cutting-mat-project/
    |--public/ 
    |--src/
    |   |--__template/                  // 模块模板
    |   |--core/                        // 框架文件
    |   |--main/                        // 主模块
    |   |--system/                      // 系统管理模块
    |   |--user/                        // 个人中心模块
    |   `--main.js                      // 入口文件
    |--.browserslistrc              // 兼容性配置
    |--.eslintrc                    // 代码检查配置
    |--.gitignore                   // git忽略文件配置
    |--babel.config.js              // babel配置
    |--package.json                 // 项目描述文件
    `--vue.config.js                // vue-cli配置
```

## 模块目录结构

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

## 框架文件目录结构

项目里还有一个`core/`文件夹，顾名思义这里是框架的核心功能实现，是框架工具能力的实体化。

`core/`的目录结构：

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
