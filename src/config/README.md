# 配置参考

## 预安装文件

预安装文件`@/pre-install.js`会在框架核心插件安装前执行，可以在这里安装前置依赖。

### 三方UI库

为减少打包体积，模板默认以按需引入方式安装三方UI库，默认引入的组件可以在`@/pre-install.js`中修改。

按需引入方式参考各UI官方文档：

- [Element-UI](https://element.eleme.cn/#/zh-CN/component/quickstart)
- [Element-Plus](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)
- [Vant 4](https://vant-contrib.gitee.io/vant/v4/#/zh-CN/quickstart)

### 全局样式

框架内置全局样式文件`@/core/assets/global.css`，默认包含浏览器样式重置、CSS组件、自定义UI库样式，详见[全局样式]()

```js
// 加载全局样式
import '@/core/assets/global.css';

```

## 请求配置

请求相关配置，可以通过请求配置文件`@/request.config.js`设置。该文件必须默认输出用于创建 Axios 请求实例的配置对象。

### 各环境BaseURL配置

维护一个`ENVIRONMENT`对象，key为环境名称，value为对应环境的请求 BaseURL。

```js
const ENVIRONMENT = {
    mock: 'http://yapi.sogdata.com/mock/125',
    dev: 'http://dev.kaifa',
    test: 'http://test.kaifa',
    master: '//master.com'
};

```

### 域名与环境映射关系

维护一个`HASH`对象，key为域名，value为域名对应的`ENVIRONMENT`建。

```js
const HASH = {
    "dev.com": ENVIRONMENT.dev,
    "test.com": ENVIRONMENT.test,
    "master.com": ENVIRONMENT.master
}
```

### Axios 请求实例配置

输出 Axios 请求实例的配置对象。

默认`baseURL`: 根据当前域名自动匹配，如果找不到匹配项默认请求`ENVIRONMENT.mock`。

默认`timeout`: 10000ms。

默认`headers["Content-Type"]`: 'application/json'

```js
export default {
    baseURL: HASH[window.location.host] || ENVIRONMENT.mock,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
}
```

## 路由配置

路由配置文件`@/route.config.js`负责将各模块路由数据汇总，并自由组织成最终的路由结构用于创建应用。详见[路由结构](/guide/intro-routes)。

### 主路由

必须输出名为`MainRoute`的路由数组作为主路由，权限模块的路由控制相关功能将以主路由作为作用范围。

```js
// 主模块
import main from '@/main/index'

// 业务模块
import user from '@/user'
import system from '@/system'

// 主路由
export const MainRoute = [Object.assign({}, main[0], {
    children: [
        ...user,
        ...system,
    ]
})];
```

### 旁路路由

必须输出名为`BypassRoute`的路由数组作为旁路路由，旁路路由不受权限模块控制，任何时候都可以自由访问。

```js
// 旁路路由
export const BypassRoute = [
    ...main.slice(1),
]
```

## 字典控件配置

`@/plugin.dict-control.config.js`

## 全局功能配置

`@/plugin.global-function.config.js`

## 权限功能配置

`@/plugin.permission.config.js`

## 状态管理配置

`@/plugin.store.config.js`

## 上传组件配置

`@/plugin.upload.config.js`
