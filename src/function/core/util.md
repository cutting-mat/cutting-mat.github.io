# 工具类库

::: warning
文档未完成
:::

工具类库（`@/core/util.js`）是预置的实用工具，在`@/core/index.js`中默认导出，便于引用。

``` js
/**
 * 引用内置工具
 * */ 

// 全部引入
import * as util from "@/core";

// 按需引入
import {storage} from "@/core";
```

## storage(key, [value])

本地存储，基于`window.localStorage`实现，支持JSON格式存取前自动转换

- @param key[String] 要存/取的键；自动将`process.env.BASE_URL`做为命名空间，也可以在`vue.config.js`里设置`process.env.VUE_APP_STORAGE_SPACE`更改命名空间。
- @param value[any] 要存的值，若缺省则返回key的值
- @return 只传key会返回该key的值

## deepcopy(source)

对象/数组深拷贝

- @param source[Object|Array] 要拷贝的对象
- @return 深拷贝后的对象/数组

## buildTree(array, [parentKey], [sortFunction])

一维对象数组转树形结构

- @param array[对象数组] 对象数组中的对象必须包含id和[parentKey]键，如{id: 1, pid: 0}。pid值为假或等于自身id，则判定为一级节点
- @param parentKey[String] 指向上级id的key，默认"pid"
- @param sortFunction[Function] 用于arrayObject.sort(sortFunction)的排序方法，默认不排序
- @return 由children键建立层级的对象数组

## formatDate(value, [fmt])

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

## on(eventName, eventHandle)

全局事件监听。重复注册同一个事件，只保留最后一次，使单页面应用反复进入页面不会重复注册事件；可以通过别名方式将一个事件多次注册。

- @param eventName[String] 自定义事件名称，支持用双下划线添加别名，如 eventName__ANYSTRING
- @param eventHandle[Function] 事件回调方法，参数接收触发事件方法发送的参数；缺省将关闭该事件监听

## emit(eventName, [msg])

全局事件触发

- @param eventName[String] 要触发的事件名称，不需要包含别名部分，如 "myEvent__alias1"，只需要传 "myEvent"
- @param msg[any] 触发事件时携带的参数

## getSuffix(filename)

提取文件名中的扩展名

- @param filename[String] 要提取扩展名的字符串
- @return 转小写后的扩展名

## throttle(method, [delay, duration])

函数节流

- @param method[Function] 要节流的函数方法
- @param delay[Number] 过滤执行的间隔毫秒数，默认128
- @param duration 至少执行一次的间隔毫秒数，默认1000
- @return 具有节流特性的新函数

## getUrlParam(keyName, [url])

获取url中的query值

- @param keyName[String] 要获取的参数名
- @param url[String] 目标url，缺省则取当前窗口url
- @return keyName参数的值，如果获取失败返回`null`

# Vue全局功能

将高频使用的Vue功能全局注册可以显著提高开发效率，在多人协作的项目中，Vue全局功能必须有一个明确、集中的管理方式，否则很容易导致全局功能得不到充分利用，项目内各自造轮子的情况。

## 注册器

全局功能注册器（`@/core/register.js`）是一个专门注册Vue全局功能的Vue插件，在项目入口文件（`@/main.js`）中调用。原则上项目中的所有Vue全局功能都应该在这里注册，包括：方法、组件、过滤器、指令等。

注册全局功能应遵循**谨慎且必要**原则，通常我们会将通用UI组件、高频功能组件全局注册，避免客户端频繁加载同一个组件。
## 开发须知

- 由于通用增删改查组件（`@/main/components/BaseCURD.vue`）的实现机制，数据模型中指定的展示控件也必须注册为全局组件。

- 全局组件命名应遵守**组件命名规范**，做到表意清晰、准确。

- 全局组件有三种组件注册方式：同步加载、合并打包异步加载、常规异步加载。同步加载可以确保界面能第一时间渲染组件，常用于UI组件；合并打包异步加载适用于渲染优先级不像UI组件那么高，但使用率较高的组件，将他们打成一个包可以避免界面由于频繁异步请求组件导致的卡顿感；其余使用率不是那么高的组件，就使用常规异步加载方式，按需加载，避免不必要的客户端请求。

```js
/**
 * @/core/register.js
 * 
 * */ 

// 全局组件
import BaseHeader from '@/main/components/BaseHeader.vue'

const globalComponents = {
    BaseHeader,
    BaseBreadcrumb: () => import(/* webpackChunkName: "global-components" */ "@/main/components/BaseBreadcrumb.vue"),
    BaseSubNav: () => import(/* webpackChunkName: "global-components" */ "@/main/components/BaseSubNav.vue"),
    BasePagination: () => import(/* webpackChunkName: "global-components" */ "@/main/components/BasePagination.vue"),
    BaseCURD:  () => import(/* webpackChunkName: "global-components" */ "@/main/components/BaseCURD.vue"),
    DictRadio:  () => import(/* webpackChunkName: "global-components" */ "@/main/components/DictRadio.vue"),
    DictCheckbox:  () => import(/* webpackChunkName: "global-components" */ "@/main/components/DictCheckbox.vue"),
    DictSelect:  () => import(/* webpackChunkName: "global-components" */ "@/main/components/DictSelect.vue"),
    DictCascader:  () => import(/* webpackChunkName: "global-components" */ "@/main/components/DictCascader.vue"),
    OrgPicker:  (resolve) => require(["@/system/components/OrgPicker.vue"], resolve),
    TheResourcePicker:  (resolve) => require(["@/system/components/TheResourcePicker.vue"], resolve),
    
}

export default {
    install: function (Vue) {
        // 注册组件
        Object.keys(globalComponents).forEach(key => {
            Vue.component(key, globalComponents[key])
        })

        ...
```