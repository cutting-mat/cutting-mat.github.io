# 路由结构

## 路由配置

从访问控制的角度，框架将路由分成**主路由与旁路路由**两类。

以模板默认路由为例，主模块和两个内置业务模块的路由结构如下：

```js
// 主模块路由（@/main/index.js）
[
    {
        path: '/',
        name: '首页',
        component: index
    }, {
        path: '/login',
        name: '登录',
        component: (resolve) => require(['./views/Login.vue'], resolve)
    }, {
        path: '/500',
        name: '服务异常',
        component: (resolve) => require(['./views/500.vue'], resolve)
    }, {
        path: '/404',
        name: '找不到页面',
        component: (resolve) => require(['./views/404.vue'], resolve)
    }
]
// 业务模块路由（@/system/index.js）
[{
    path: '/system',
    name: '系统设置',
    children: [{
        path: 'Profile',
        name: '个人信息',
    }, {
        path: 'Password',
        name: '修改密码',
    }, {
        path: 'Dict',
        name: '字典管理',
    }]
}]
// 业务模块路由（@/user/index.js）
[{
    path: '/user',
    name: '用户管理',
    children: [{
        path: 'Account',
        name: '账号管理',
    }, {
        path: 'Organization',
        name: '组织管理',
    }, {
        path: 'Role',
        name: '角色管理',
    }, {
        path: 'Resource',
        name: '资源管理',
    }]
}]

```

主路由与旁路路由都是在路由配置文件（`@/route.config.js`）中定义的，所有的模块路由都将在此引入，并自由组合，只要最终对外输出`MainRoute`（主路由）和`BypassRoute`（旁路路由）两个路由数组即可。

以模板默认路由配置为例，将主模块里的首页和两个业务模块组成主路由，主模块除首页外的其他页面被划归为旁路路由，配置如下：

```js

// 主模块
import main from '@/main/index'

// 业务模块
import system from '@/system'
import user from '@/user'


// 主路由
export const MainRoute = [Object.assign({}, main[0], {
    children: [
        ...system,
        ...user,
    ]
})];

// 旁路路由
export const BypassRoute = [
    ...main.slice(1),
]

```

框架会自动将主路由和旁路路由组成最终完整的路由数据：

![路由结构设计](/assets/img/路由结构设计.png)

对于主路由和旁路路由的数据结构没有任何限制，可以根据需要任意组织。除了像模板默认路由这样将业务模块挂载为首页子路由外，还可以让业务模块与首页路由平级成为**顶级业务模块**（如图中 Module3），或者直接将整个模块定义为**旁路业务模块**（如图中 Module4）。

## 访问控制

主路由与旁路路由是从访问控制的角度延申出的概念，所谓旁路是指不受访问限制的区域，而主路自然就是被访问控制系统所覆盖的区域。

框架内置权限模块(`permissioon`)可以实现基于用户登录状态的**用户鉴权**，和可选的基于用户角色实现的访问**权限控制**。

开启权限模块后只有已登录用户可以访问主路由，未登录用户只能访问旁路路由。如果同时开启权限控制，路由控制也只对主路由生效，旁路路由无需权限即可访问。

路由实例初始只会加载旁路路由，框架会根据是否开启权限控制决定是全量加载主路由，还是根据权限数据筛选主路由后再动态添加路由。

![路由加载流程](/assets/img/路由加载流程.png)

对于企业官网这类完全公开访问的站点，整个权限模块(`permissioon`)都不会启动，那就需要将所有路由都定义为旁路路由，使其随路由实例初始化一起加载。

详见[权限管理]()

## 动态菜单

路由数据通常也用来实现导航菜单，如果不开启权限控制（`access-control`），路由配置中的`MainRoute`（主路由）和`BypassRoute`（旁路路由）也可以作为数据源，通过调整模块顺序和路由`meta`信息，基本可以实现任意导航效果。

```js
// 路由数据用于实现导航菜单
import { MainRoute } from "@/route.config";

```

开启权限控制（`access-control`）的情况下，导航菜单应该随当前用户的权限而动态变化，因此不能直接拿静态的路由数据实现导航菜单，此时在权限功能配置（`@/plugin.permission.config.js`）中定义`AfterGetDynamicRoute()`方法，在回调中获取动态路由，再用于实现动态菜单或其他业务场景。

例如模板默认`@/plugin.permission.config.js`文件中定义的`AfterGetDynamicRoute`方法，会将动态路由存入$store：

```js
// @/plugin.permission.config.js
...
// 获取路由权限后回调
export const AfterGetDynamicRoute = routes => Vue.$store.set("DynamicRoute", routes);


```

## 动态模板

通常一个站点的所有页面都会采用相同的页面基础布局，比如相同的头部、底部样式，只要将所有页面都挂载为首页子路由，利用[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)可以很容易实现整站框架模板复用，但如果个别业务模块希望脱离主模板实现独立的界面风格，可以通过以下两种方法实现。

一、将模块定义为顶级业务模块，即可脱离嵌套路由限制。

``` js
// 主路由
export const MainRoute = [
    Object.assign({}, main[0], {
        children: [
            ...system,
            ...user,
        ]
    }),
    ...TopLevelModule   // 顶级业务模块
];
```

二、在首页（`/`）中定义多套模板，并根据访问路由动态切换模板。

``` js
<template>
  <!-- data-v 模板 -->
  <LayoutBlank v-if="$route.path.indexOf('/data-v') === 0" />
  <!-- 默认模板 -->
  <LayoutMain v-else />
</template>

```

实际应用中可以自由选择两种方法实现动态模板。
