# 目录结构

CuttingMat目录结构的设计目标是实现**多模块隔离**

## 整体目录结构

``` bash
src
    |--public/ 
    |--src/
    |   |--__template/                  // 空模块模板
    |   |--main/                        // 主模块
    |   |--system/                      // 系统管理模块
    |   |--user/                        // 个人中心模块
    |   |--api.js                           // axios实例配置
    |   |--App.vue                          // 根组件
    |   |--main.js                          // 入口文件
    |   |--register.js                      // 全局资源注册器
    |   |--router.js                        // 全局路由守卫
    |   `--store.js                         // 实现简单store模式的状态管理
    |--.browserslistrc
    |--
    |--
    |--
    |--
    |--
    `--
```

## 模块目录结构

``` bash
[Moudle Folder]
    |--api/                             // 接口
    |   `--user.js 
    |--assets/                          // 静态资源/样式/脚本
    |   |--img/ 
    |   |--style.css 
    |   `--util.js 
    |--components/                      // 组件
    |   |--myHeader.vue
    |   `--subMenu.vue
    |--views/                           // 页面
    |   |--401.vue
    |   |--404.vue
    |   `--login.vue
    `--index.js                         // 模块路由
```

### 代码拆分的思路和实现

上面的【模块文件结构】基本上就是一个经典的Vue项目`src/`目录结构，这个结构在大型项目中缺点明显，随着持续开发很容易产生巨大的`components/`和`views/`文件夹，以及庞杂的接口和静态资源，给团队协作和代码拆分复用带来极大挑战，大项目中我们需要一种更具扩展性的代码组织。

代码组织的思路是，将整个项目以功能模块为单位进行拆分，每个模块管理自己的接口、静态资源、组件、页面、路由，理论上每个模块都具备了独立运行的所有代码（当然肯定会有外部依赖），类似于微服务。当开发每个模块时，开发者的注意力可以只集中在当前模块相关的文件上，只有涉及外部依赖，或者对外共享时，才会接触到外部模块。

模块之间是相互独立的，这使得模块内部如何实现变得不重要，但所有的模块最终要融合到项目中去，这就需要模块有一个明确、规则的对外表达，告诉别人我做了什么，路由可以完美充当这个角色，模块的合并就是路由的合并。

以【权限管理模块】为例，看一下这个模块的路由文件里是什么样的：

``` javascript
export default [{
    path: '/permission',
    name: '权限设置',
    meta: {
        icon: "&#xe606;"
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    redirect: '/permission/account',
    children: [{
        path: 'account',
        name: '账号管理',
        component: (resolve) => require(['./views/account.vue'], resolve)
    }, {
        path: 'role',
        name: '角色管理',
        component: (resolve) => require(['./views/role.vue'], resolve)
    }, {
        path: 'resource',
        name: '权限管理',
        component: (resolve) => require(['./views/resource.vue'], resolve)
    }, {
        path: 'password',
        name: '修改密码',
        component: (resolve) => require(['./views/password.vue'], resolve)
    }]
}]
```

就是输出了一段普通的路由，这段路由就是这个模块的所有功能体现。怎样将他们添加到项目路由中呢，在主模块路由里（`main/index.js`）

``` javascript
import index from './views/index'

import permission from '../permission'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...permission
    ]
}]

```

可以看到主模块路由掌握着主页(`'/'`)这个路径，只要将其他模块路由作为子路由合并进来，模块就可以被成功加载了。主模块的路由其实相当于服务注册表，将所有可用模块注册进来；同时，主模块还掌握着根节点，所以整个项目的框架布局只能在主模块里实现，这是主模块与其他模块不同的地方。

另外一个稍微有点特殊的模块是【公共资源模块】(`common/`)，用来实现基础功能和提供全局资源，比如登录注册页面，还有全局样式或脚本，都在这里实现。这些功能将作为初始路由，在项目初始化时载入，需要注意的是，这些路由都是跟`'/'`平级的。
