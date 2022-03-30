# 快速开始

## 使用npm初始化

``` bash
npm init @cutting-mat
```

交互式CLI界面，支持三种模板选择：

- `template-element-ui`：基于 Element-UI 的PC端项目模板
- `template-element-plus`：基于 Element-Plus 的移动端的项目模板（完善中...）
- `template-vant`：基于 Vant4 的移动端的项目模板（完善中...）
- `template-electron`：基于 Electron 的客户端项目模板（完善中...）

## 拉取初始化模板

或者从 git repository 拉取项目初始模板。

<CodeGroup>
    <CodeGroupItem title="Element-UI" active>

``` bash
git clone https://github.com/cutting-mat/template-element-ui.git
```

  </CodeGroupItem>
  <CodeGroupItem title="Element-Plus">

``` bash
git clone https://github.com/cutting-mat/template-element-plus.git
```

  </CodeGroupItem>
  <CodeGroupItem title="Vant">

``` bash
git clone https://github.com/cutting-mat/template-vant.git
```

  </CodeGroupItem>
</CodeGroup>


## 开发服务

安装npm依赖，并运行开发服务。

``` bash
npm i               // 安装依赖
npm run serve       // 启动开发服务
npm run build       // 构建生产环境代码
```

## 字体图标

CuttingMat 使用 [iconfont](https://www.iconfont.cn/) 字体图标库。

内置字体文件目录：`@/core/assets/font/`。

图标列表详见[字体图标](/function/core/iconfont.html)。

## 三方UI库

[template-element-ui](https://github.com/cutting-mat/template-element-ui) 使用 Element-UI 组件库，[官方文档](https://element.eleme.cn/#/zh-CN/component/changelog)。

[template-element-plus](https://github.com/cutting-mat/template-element-plus) 使用 Element-Plus 组件库，[官方文档](https://element-plus.org/zh-CN/guide/quickstart.html)。

[template-vant](https://github.com/cutting-mat/template-vant) 使用 Vant4 组件库，[官方文档](https://vant-contrib.gitee.io/vant/v4/#/zh-CN/changelog)。

## 新增一个模块

CuttingMat 是模块化的组织思路，API、页面、组件、静态资源、路由都包含在模块中，所有开发的第一步要从新增模块开始。为应用新增一个模块分三步：

1. 创建模块文件

为便于快速创建新模块，项目内置了模块模板（`@/__template/`），只需复制并重命名就完成了新模块的文件初始化，比如我们复制出一个`@/myFirstMoudle/`文件夹。

2. 配置模块路由

`@/myFirstMoudle/index.js`就是新模块的路由，初始状态已经注册了模块主页（`Index.vue`）和一个空白页面（`List.vue`），只需要根据实际业务修改名称：

```js
export default [{
    // path: '/template',
+   path: '/myFirstMoudle',
    // name: '模块模板',
+   name: '新模块',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    // redirect: '/template/list',
+   redirect: '/myFirstMoudle/list',
    children: [{
        path: 'list',
        // name: '列表',
+       name: '新模块列表',
        component: (resolve) => require(['./views/List.vue'], resolve)
    }]
}]
```

3. 注册模块路由

然后打开项目的路由配置文件（`@/route.config.js`），将新模块注册到主路由中：

```js
...
// 主模块
import main from '@/main/index'

// 业务模块
import system from '@/system'
import user from '@/user'
+ import myFirstMoudle from '@/myFirstMoudle'

// 主路由
export const MainRoute = [Object.assign({}, main[0], {
    children: [
+       ...myFirstMoudle,
        ...system,
        ...user,
    ]
})];

```

这样新模块就创建完成了，启动开发服务，新路由（ http://localhost:8080/#/myFirstMoudle ）已经可以访问。

模块包含自己的 API、静态资源、组件、页面和路由，如果你熟悉Vue开发，接下来该如何继续就很简单了。
