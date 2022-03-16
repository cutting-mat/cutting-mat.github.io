# 路由结构

这里的路由结构是指从访问控制的角度，框架将路由分成**主路由与旁路路由**两大类。

以模板默认路由为例，主模块里的首页与其他业务模块组成主路由，主模块除首页外的其他页面被划归为旁路路由，如下图所示：

![路由结构设计](/assets/img/路由结构设计.png)

## 主路由与旁路路由

主路由与旁路路由是从访问控制的角度延申出的概念，所谓旁路是指不受访问限制的区域，而主路自然就是被访问控制系统所覆盖的区域。

框架内置两个访问控制模块：用户鉴权(`account-auth`)和权限控制（`access-control`），分别基于用户登录状态和用户角色实现访问权限控制。

其中，用户鉴权模块只允许已登录用户访问主路由，未登录用户只能访问旁路路由；权限控制模块的路由权限只对主路由生效，旁路路由无需权限即可访问（除了路由权限，权限控制模块还将接管请求权限，并能实现任意界面元素根据权限的显示隐藏，详见[访问控制]()）。

## 配置路由

主路由与旁路路由都是在路由配置文件（`@/route.config.js`）中定义的，所有的模块路由都将在此引入，并自由组合，只要最终对外输出`MainRoute`（主路由）和`BypassRoute`（旁路路由）两个路由数组即可。


以模板默认路由配置为例：

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

主路由和旁路路由的数据结构没有任何限制，可以根据需要任意组织。除了像模板默认路由这样将业务模块挂载为首页子路由外，还可以让业务模块与首页路由平级成为顶级业务模块，或者直接将整个模块定义为旁路业务模块（如本节顶部路由结构示意图所示）。

路由实例初始只会加载旁路路由，用户鉴权(`account-auth`)模块启动后，会根据是否开启权限控制（`access-control`）功能决定是否动态加载主路由，如果未开启权限控制就全量添加主路由，反之则会由权限控制模块根据用户权限，从主路由中筛选出可用路由后再动态添加到路由实例中。

对于企业官网这类完全公开访问的站点，连用户鉴权(`account-auth`)模块也不会启用，那就需要将所有路由都定义为旁路路由，随路由实例初始化一起加载。

## 动态菜单

实际项目中经常把路由数据用来实现网站的导航菜单，在不开启权限控制（`access-control`）的情况下，路由配置中的`MainRoute`（主路由）和`BypassRoute`（旁路路由）也可以作为站点导航菜单的数据源，通过调整模块顺序和路由`meta`信息，基本可以实现任意导航效果。

```js
// 路由数据用于实现导航菜单
import { MainRoute } from "@/route.config";

```

开启权限控制（`access-control`）的情况下，用户的可访问菜单应该随权限动态变化，因此不能直接拿静态的路由数据实现导航菜单，而要在权限功能配置（`@/permission.config.js`）中定义`AfterGetDynamicRoute()`方法，在获取动态路由后将动态路由存储，从而用于实现动态菜单或其他业务场景。

例如模板默认`@/permission.config.js`文件中定义的`AfterGetDynamicRoute`方法为：将动态路由存入`$store.state.DynamicRoute`。

```js
// 默认的@/permission.config.js
...
// 获取路由权限后回调
export const AfterGetDynamicRoute = routes => Vue.$store.set("DynamicRoute", routes);


```

## 动态模板

通常一个站点的所有页面都会采用相同的页面基础布局，比如相同的头部、底部样式，只要将所有页面都挂载为首页子路由，利用[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)可以很容易实现整站框架模板复用，但如果个别业务模块希望脱离主模板实现独立的界面风格，可以通过以下两种方法实现。

一、将模块定义为顶级路由（与首页平级）即可脱离嵌套路由限制。

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

二、在首页（`/`）中定义多套模板，并根据当前访问路由切换模板。

``` js
<template>
  <!-- data-v 模板 -->
  <LayoutBlank v-if="$route.path.indexOf('/data-v') === 0" />
  <!-- 默认模板 -->
  <LayoutMain v-else />
</template>

```
