# 全局样式预设

::: warning
文档未完成
:::

全局样式文件（`@/core/global.css`）默认被根组件（`@/core/App.vue`）引用，作用于项目全局，包含最最常用的样式预设。

## CSS Reset

重置浏览器默认样式，并统一滚动条样式与Mac Safari风格一致。

[参考源码](https://github.com/cutting-mat/template-element-ui/blob/master/src/core/global.css#L1)

## 字体图标

在[icon font](https://www.iconfont.cn/)配置自己的字体图标项目，unicode 方式引用，图标类名`.ion`。下载字体文件到`src/core/fonts/`文件夹，替换已有文件即可。

``` html
<!-- 使用示例 -->

<i class="ion">&#xe6a9;</i>
<i class="ion">&#xe74f;</i>
```

[参考源码](https://github.com/cutting-mat/template-element-ui/blob/master/src/core/global.css#L150)

## CSS组件

内置常用的CSS组件，如flex栅格、固定宽高比矩形、单行文字等。

为防止后期组件调整与文档不一致，这里就不一一列举了。

[参考源码](https://github.com/cutting-mat/template-element-ui/blob/master/src/core/global.css#L198)
