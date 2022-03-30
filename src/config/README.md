# 配置参考

## 预安装文件

预安装文件`@/pre-install.js`会在框架核心插件安装前执行，可以在这里安装前置依赖或其他插件。

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

[网络请求](/function/core/request/)相关配置可以通过请求配置文件`@/request.config.js`设置。该文件必须默认输出用于创建 Axios 请求实例的配置对象。

### baseURL

- 类型：`String`
- 详情：请求baseURL
- 默认：根据应用域名自动切换

```js
// 各环境BaseURL配置，key为环境名称，value为对应环境的请求 BaseURL。
const ENVIRONMENT = {
    mock: 'http://yapi.sogdata.com/mock/125',
    dev: 'http://dev.kaifa',
    test: 'http://test.kaifa',
    master: '//master.com'
};

// 域名与环境映射关系，key为域名，value为域名对应的`ENVIRONMENT`建。
const HASH = {
    "dev.com": ENVIRONMENT.dev,
    "test.com": ENVIRONMENT.test,
    "master.com": ENVIRONMENT.master
}

export default {
    baseURL: HASH[window.location.host] || ENVIRONMENT.mock,
    ...
}
```

### timeout

- 类型：`Number`
- 详情：请求超时时间，单位ms
- 默认：`10000`

### headers

- 类型：`Object`
- 详情：请求 Headers
- 默认：

```json
    {
        "Content-Type": "application/json"
    }
```

## 路由配置

路由配置文件`@/route.config.js`负责将各模块路由数据汇总，并自由组织成最终的路由结构用于创建应用。详见[路由结构](/guide/intro-routes)。

必须输出`MainRoute`和`BypassRoute`数组。

### [export] MainRoute

- 类型：`Array`，路由数组
- 详情：主路由，权限模块的路由控制相关功能将以主路由作为作用范围。
- 示例：

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

### [export] BypassRoute

- 类型：`Array`，路由数组
- 详情：旁路路由，旁路路由不受权限模块控制，任何时候都可以自由访问。
- 示例：

```js
// 旁路路由
export const BypassRoute = [
    ...main.slice(1),
]
```

## 数据字典控件配置

通过数据字典控件配置文件`@/plugin.dict-control.config.js`，对[数据字典控件](/function/plugin/dict-control/)进行设置。

### valueKey

- 类型：`String`
- 默认值：`value`
- 详情：数据中代表选项值的字段名

### labelKey

- 类型：`String`
- 默认值：`label`
- 详情：数据中用于选项展示的字段名

### nullAble

- 类型：`Boolean`
- 默认值：`true`
- 详情：是否需要增加值为`null`的默认选项

### request

- 类型：`Function`
- 默认值：`-`
- 详情：请求数据的方法，需返回 `Promise`对象

### param

- 类型：`Any`
- 默认值：`-`
- 详情：请求参数，将原样传给`request`请求方法

### responseTransfer

- 类型：`Function`
- 默认值：`-`
- 详情：将请求方法返回的数据转换成数据字典格式的方法
- 示例：

```js

export default {
    responseTransfer(res) {
        /**
         * 数据字典格式:
         * [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
         * */ 
        return res.data.list
    }
}
```

## Vue全局功能注册

可以通过全局功能配置文件`@/plugin.global-function.config.js`，配置[Vue全局功能注册插件](/function/plugin/global-function/)。

### [export] components

- 类型：`Object`
- 详情：全局组件
- 示例：

```js
export const components = {
    Header,
    Breadcrumb: () => import("@/main/components/Breadcrumb.vue"),
    SubNav: () => import("@/main/components/SubNav.vue"),
    Pagination: () => import("@/main/components/Pagination.vue"),
    ToolBar: () => import("@/main/components/ToolBar.vue"),
}
```

### [export] filters

- 类型：`Object`
- 详情：全局过滤器
- 示例：

```js
 export const filters = {
    "test"() {
        return "test filters"
    }
}
```

### [export] directives

- 类型：`Object`
- 详情：全局指令
- 示例：

```js
 export const directives = {
    'test': {
        inserted(el) {
            setTimeout(() => {
                el.innerText += ' test directive inject!'
            }, 0)
        }
    }
}
```

### [export] $methods

- 类型：`Object`
- 详情：实例方法
- 示例：

```js
 export const $methods = {
    $test() {
        // 用于测试可删除
        return ('test instance method output!')
    }
}
```

### [export] methods

- 类型：`Object`
- 详情：全局方法
- 示例：

```js
 export const methods = {
    Test() {
        return ('test globalMethod output!')
    }
}

```

## 权限插件配置

通过权限插件配置文件`@/plugin.permission.config.js`，设置[权限模块](/function/plugin/permission/)相关配置或功能。

### routeInstance

- 类型：`routeInstance`
- 详情：路由实例，必传
- 默认值：当前应用路由实例

### AccessControl

- 类型：`Boolean`
- 详情：是否开启权限控制
- 默认值：`false`

### interceptorsRequest

- 类型：`Boolean`
- 详情：是否开启请求拦截（需开启权限控制）
- 默认值：`true`

### [export] GetAccountToken

- 类型：`Function`
- 详情：获取用户登录凭据方法，需返回 `Token[String]`
- 参数：`-`
- 默认：

```js
export const GetAccountToken = () => {
    const storageFun = $store.state.rememberLogin ? localStorage : sessionStorage;
    return storage("auth", undefined, storageFun)
}
```

### [export] SetAccountToken

- 类型：`Function`
- 详情：设置用户登录凭据方法
- 参数：`Token[String]`
- 默认：

```js
export const SetAccountToken = token => {
    const storageFun = $store.state.rememberLogin ? localStorage : sessionStorage;
    return storage("auth", token, storageFun)
}
```

### [export] GetTokenFromLogin

- 类型：`Function`
- 详情：将登录接口返回数据转成用户凭据的方法，需返回 `Token[String]`
- 参数：`response[Object]`
- 默认：

```js
export const GetTokenFromLogin = res => res.data

```

### [export] GetPermission

- 类型：`Function`
- 详情：请求用户权限数据方法，需返回 `Promise` 对象
- 默认：

```js
export const GetPermission = () => $store.action("permission");

```

### [export] AfterGetDynamicRoute

- 类型：`Function`
- 详情：获取路由权限后的回调方法
- 参数：`routes[Array]`，当前用户权限范围内的路由
- 默认：

```js
export const AfterGetDynamicRoute = routes => $store.set("DynamicRoute", routes);
```

## 状态管理插件配置

通过状态管理配置文件`@/plugin.store.config.js`，对[状态管理插件](/function/plugin/store/)进行设置。

### state

- 类型：`Object | Function`
- 格式：`{ key[String]: value[Any] }`
- 详情：状态对象。如果你传入返回一个对象的函数，其返回的对象会被用作 `state`。
- 示例：

```js
export default {
    state: {
        testValue: 0
    },
    ...
```

### actions

- 类型：`Object`
- 格式：`{ key[String]: value[Function] }`
- 详情：在 store 上注册 action。处理函数总是接受 `context` 作为第一个参数，payload 作为第二个参数（可选）。同时如果有第二个参数 payload 的话也能够接收

- 示例：

```js
export default {
    actions: {
        testAction: function (context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.set('testValue', parseInt(context.get('testValue') + 1))
                    resolve()
                }, 500)
            })
        },
        ...
}
```

## 上传插件配置

`@/plugin.upload.config.js`

### accept

- 类型：`String`
- 详情：允许上传的文件类型, 额外支持自定义文件类型（见下方 `quickType` ）
- 默认值：`"*"`

### v-model / value

- 类型：`Array[Object]`
- 详情：已上传文件数据, Object必须包含`url`字段
- 默认值：`[]`

### beforeUpload

- 类型：`Function`
- 详情：文件上传前的钩子，同el-upload, 将作为默认配置，可以被组件配置覆盖
- 默认值：`-`

### onExceed

- 类型：`Function`
- 详情：文件超出个数限制时的钩子, 同el-upload, 将作为默认配置，可以被组件配置覆盖
- 默认值：`-`

### limitSize

- 类型：`Number`
- 详情：允许上传文件的最大尺寸
- 默认值：`100 * 1024 * 1024` （100M）

### imgCompress

- 类型：`Boolean`
- 详情：开启图片上传前压缩
- 默认值：`true`

### imgCompressOption

- 类型：`Object`
- 详情：图片压缩尺寸配置
- 默认值：

```js
    {
        maxWidth: 1000,            // 最大宽度
        maxHeight: 1000,           // 最大高度
    }
```

### imgCrop

- 类型：`Boolean`
- 详情：开启图片上传前剪裁
- 默认值：`false`

### imgCropOption

- 类型：`Object`
- 详情：图片剪裁配置, 选项同 [cropperjs](https://github.com/fengyuanchen/cropperjs)
- 默认值：

```js
    {
        ratio: 1,               // 剪裁框宽高比
        minWidth: 0,            // 最小输出宽度
        minHeight: 0,           // 最小输出高度
        maxWidth: 1000,         // 最大输出宽度
        maxHeight: 1000,        // 最大输出高度
    }
```

### uploadMethod

- 类型：`Function`
- 详情：上传处理方法, 接收两个参数`(file/blob, fileName)`
- 默认值：`-`

### responseTransfer

- 类型：`Function`
- 详情：将上传接口返回数据转成文件数据格式的方法
- 默认值：`-`

### quickType

- 类型：`Object`
- 详情：自定义文件类型
- 默认值：

```js
    {
        "t-image": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".webp"],
        "t-video": [".mp4", ".rmvb", ".avi", ".mov", "3.gp"],
        "t-word": [".docx", ".doc"],
        "t-excel": [".xlsx", ".xls"],
        "t-ppt": [".ppt", ".pptx"],
        "t-document": [".pdf", "t-word", "t-excel", "t-ppt"],
        "t-zip": [".zip", ".rar"],
    }
```

## 构建配置

默认使用`Vue-CLI`构建，构建配置文件`/vue.config.js`。

### 浏览器兼容性

默认兼容`IE11`。

如果使用的npm包不兼容IE，需要将npm包名添加到构建配置文件的`transpileDependencies`项。

### 常用配置项

|  配置项   | 详情  | 默认值  |
|  ----  | ----  | ----  |
| `css.sourceMap`  | 开启css map, 方便调试 | `true` |
| `productionSourceMap`  | 生产环境关闭map | `false` |
| `integrity`  | 生产环境开启子资源完整性校验（SRI） | `true` |
| `outputDir`  | 构建目录 | `'dist'` |
| `publicPath`  | 生产/开发环境构建路径 | `/` |

### 分包策略

通常依赖中最占体积的是UI组件库，所以默认将三方UI库单独打包，其余的`node_modules`依赖文件打成一个包。

详见`/vue.config.js`的`chainWebpack`配置。
