# 组件注册

> 222222该页面假设你已经阅读过了[组件基础](component-basics.md)。如果你还对组件不太了解，推荐你先阅读它。

### 项目文件结构

```javascript
CuttingMat
    |--public/ 
    |--src/
    |   |--__template/                  // 空模块模板
    |   |   |--...
    |   |
    |   |--common/                      // 公共资源模块
    |   |   |--...
    |   |
    |   |--main/                        // 主模块
    |   |   |--...
    |   |
    |   |--permission/                  // 权限管理模块
    |   |   |--...
    |   |
    |--api.js                           // axios实例配置
    |--App.vue                          // 根组件
    |--main.js                          // 入口文件
    |--register.js                      // 全局资源注册
    |--router.js                        // 路由实例（仅包含基础路由）
    |--store.js                         // 维护一个简单store模式
```

## 组件名

在注册一个组件的时候，我们始终需要给它一个名字。比如在全局注册的时候我们已经看到了：

```js
const app = Vue.createApp({...})

app.component('my-component-name', {
  /* ... */
})
```

该组件名就是 `app.component` 的第一个参数，在上面的例子中，组件的名称是“my-component-name”。

你定义的组件名字可能依赖于你打算拿它来做什么。当直接在 DOM 中使用一个组件 (而不是在字符串模板或[单文件组件](../guide/single-file-component.html)) 的时候，我们强烈推荐遵循 [W3C 规范](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。

1. 全部小写
2. 包含连字符 (及：即有多个单词与连字符符号连接)

这样会帮助我们避免与当前以及未来的 HTML 元素发生冲突。

你可以在[风格指南](../style-guide/#基础组件名称强烈推荐)中查阅到关于组件名的其它建议。

### 组件名大小写

在字符串模板或单个文件组件中定义组件时，定义组件名的方式有两种：

#### 使用 kebab-case

```js
app.component('my-component-name', {
  /* ... */
})
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。
