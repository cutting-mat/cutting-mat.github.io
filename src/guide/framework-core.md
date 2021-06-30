# 核心能力

## 预置CSS

全局样式文件（`@/core/global.css`）默认被根组件（`@/core/App.vue`）引用，作用于项目全局。

### CSS Reset

重置绝大部分常用标签默认样式。

[参考源码](https://github.com/cutting-mat/template-element-ui/blob/master/src/core/global.css#L1)

### 字体图标

配置[icon font](https://www.iconfont.cn/)字体图标，unicode 方式引用，图标类名`.ion`。

``` html
<i class="ion">&#xe6a9;</i>
<i class="ion">&#xe74f;</i>
```

[参考源码](https://github.com/cutting-mat/template-element-ui/blob/master/src/core/global.css#L150)

### 基础版式设置

版式设置应根据实际项目布局特点而定。

默认设置根元素(`div#app`)宽高100%铺满视窗，适用于整体flex布局的页面版式。

另外还包括内容包裹类`.wrap`，和全局字体、字号、行号、文字颜色等。

[参考源码](https://github.com/cutting-mat/template-element-ui/blob/master/src/core/global.css#L168)

### CSS组件

内置常用的CSS组件，比如flex栅格。

为防止后期组件调整与文档不一致，这里就不一一列举了。

[参考源码](https://github.com/cutting-mat/template-element-ui/blob/master/src/core/global.css#L198)

## 工具类库

工具类库（`@/core/index.js`）是预置的实用工具，命名为index是为了便于引用：

``` js
// 全部引入
import * as util from "@/core";

// 或者按需引入
import {storage} from "@/core";
```

### storage(key, [value])

本地存储，基于`window.localStorage`实现，支持JSON格式自动转换

- @param key[String] 要存/取的键；自动将`process.env.BASE_URL`做为命名空间，也可以在`vue.config.js`里设置`process.env.VUE_APP_STORAGE_SPACE`更改命名空间。
- @param value[any] 要存的值，若缺省则返回key的值
- @return 只传key会返回该key的值

### deepcopy(source)

对象/数组深拷贝

- @param source[Object|Array] 要拷贝的对象
- @return 深拷贝后的对象/数组

### buildTree(array, [parentKey])

一维对象数组转树形结构

- @param array[对象数组] 对象数组中的对象必须包含id和[parentKey]键，如{id: 1, pid: 0}。pid值为假或等于自身id，则判定为一级节点
- @param parentKey[String] 指向上级id的key，默认"pid"
- @return 由children键建立层级的对象数组

### formatDate(value, [fmt])

日期格式化

- @param value[milliseconds/dateString] 可以通过new Date()方法创建日期对象的毫秒数或日期字符串
- @param fmt[String/undefined] 日期格式化模板字符串，例如`"yyyy/MM/dd hh:mm:ss"`
- @return 格式化后的日期字符串
- 内置四种fmt快捷方式：

|  快捷方式   | 模板  |
|  ----  | ----  |
| year  | yyyy |
| month  | yyyy/MM |
| day  | yyyy/MM/dd |
| day-time  | yyyy/MM/dd hh:mm |

### on(eventName, eventHandle)

全局事件监听。重复注册同一个事件，只保留最后一次，使单页面应用反复进入页面不会重复注册事件；可以通过别名方式将一个事件多次注册。

- @param eventName[String] 自定义事件名称，支持用双下划线添加别名，如 eventName__ANYSTRING
- @param eventHandle[Function] 事件回调方法，参数接收触发事件方法发送的参数；缺省将关闭该事件监听

### emit(eventName, [msg])

全局事件触发

- @param eventName[String] 要触发的事件名称，不需要包含别名部分，如 "myEvent__alias1"，只需要传 "myEvent"
- @param msg[any] 触发事件时携带的参数

### getSuffix(filename)

提取文件名中的扩展名

- @param filename[String] 要提取扩展名的字符串
- @return 转小写后的扩展名

### throttle(method, [delay, duration])

函数节流

- @param method[Function] 要节流的函数方法
- @param delay[Number] 过滤执行的间隔毫秒数，默认128
- @param duration 至少执行一次的间隔毫秒数，默认1000
- @return 具有节流特性的新函数

### getUrlParam(keyName, [url])

获取url中的query值

- @param keyName[String] 要获取的参数名
- @param url[String] 目标url，缺省则取当前窗口url
- @return keyName参数的值，如果获取失败返回`null`

## 全局资源管理

## 全局请求配置

## 状态管理

大多数项目其实不需要vuex，根目录下`store.js`维护了一个[简单store模式](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)，支持同步、异步数据存取，用于共享或缓存数据，`common/components/nav.vue`和`common/components/header.vue`里都有用例。

```javascript
// API示例：
import { store } from "@/store";
// 同步存
store.set('a', 1);
// 同步取
store.get('a'); // 1
// 异步取
store.action('someKey').then(res => {
    // res
})
// 刷新缓存数据
store.action('someKey', true).then(res => {
    // res
})
```

其中异步数据（action）具有并发请求队列机制，同一时间同一key的多次请求，实际只发起一次ajax，其余请求将进入队列，等候ajax返回后集中resolve。

异步数据获取逻辑需要在store.js内部定义，这里就不贴代码了。

其他没了。

:::tip 提示
注意那些 prop 会在一个组件实例创建**之前**进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。
:::

## 权限控制
