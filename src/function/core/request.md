# 网络请求

::: warning
文档未完成
:::

`@/core/request.js`输出全局公用的axios实例，该实例封装了基础请求配置、 request 拦截器、response 拦截器、统一的错误处理、baseURL 设置等。

## 请求配置

默认配置`baseURL`、超时时间、`Content-Type`请求头。

其中`baseURL`的配置我们用匹配域名的方式，使一套前端代码可以匹配多套后端环境，构建发布时不需要额外修改前端请求配置。

```js
import axios from 'axios';
import * as util from '@/core';
// 环境配置
const ENVIRONMENT = {
    mock: 'http://rap2api.taobao.org/app/mock/223572',
    dev: 'http://zjsz.kaifa/japi',
    test: 'http://test.com/api',
    master: '//master.com/api'
};

const HASH = {
    "dev.com": ENVIRONMENT.dev,
    "test.com": ENVIRONMENT.test,
    "master.com": ENVIRONMENT.master
}

export const baseURL = HASH[window.location.host] || ENVIRONMENT.dev;
...

```

## 参数处理

统一预处理请求参数，将get和delete请求中的空字符参数，统一替换为`null`。

## 异常处理

异常分为请求状态异常和业务状态异常，请求状态主要根据`HTTP Status Code`确定，状态码规则参考RESTFul；业务状态主要根据`response.data.code`确定，接口规则详见[接口响应规则约定]()。

## Token续期机制

## 数据缓存机制
