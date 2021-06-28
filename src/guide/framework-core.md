# 核心能力

工具能力和组织能力共同构成框架的的核心能力，组织能力已经在上一章做了介绍，这里主要介绍 CuttingMat 的工具能力。

## 预置CSS

## 工具类库

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
