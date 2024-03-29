# 前后端开发约定

## JWT 鉴权

1. 登录接口返回 `token` 字符串
2. 前端业务请求通过在 `header` 中的 `Authorization` 字段携带 `token` 实现鉴权
3. 前端可选择将 `token` 本地存储，实现记住登录状态
4. 后端控制 `token` 的过期和续期

## 接口规则

1. 基于 Restful 架构 的 URL 请求规范

```bash
列表：GET /item/s
详情：GET /item
新增：POST /item
删除：DELETE /item
修改：PUT /item

```

2. 接口尽可能返回无格式的纯数据，如时间数据统一为 `timestamp`，前端自行处理展示格式
3. `get/delete` 请求传递 list 类型数据使用`,`(英文逗号)隔开的字符串，如`"1,2,3"`
4. 状态码约定：

```bash
200 请求成功
400 参数不合法
401 未登录或已过期
403 权限受限
500 操作异常

```

5. 参数

`GET\DELETE`方法使用`param`传参，`POST\PUT`使用`body`传参。

翻页列表参数统一为：

```js
p(Number)：页码，从1开始
pageSize(Number)：每页条数

```

6. 返回格式

推荐直接返回数据体。

但如果是翻页数据，需要统一返回格式：

```js
{
    list: [...],
    totalPage(Number)：翻页总页数，仅翻页数据需要返回
    totalCount(Number)：翻页总条数，仅翻页数据需要返回
}

```

7. 文件/附件相关

提交文件相关时默认使用 `files` 字段，id 字符串类型，例如： "1,2,3"；

查询时后端原样返回，同时额外返回一个 `filesExt` 字段，类型为对象数组。

```json
// 返回
{
  "files": "1",
  "filesExt": [
    {
      "id": 1,
      "name": "示例文件名称",
      "url": "http://xxx.jpg",
      "mime": "img/png"
    }
  ]
}
```

## 权限管理

常见的三种角色管理场景：

1. 集权场景：系统通用一套角色，角色无上下级
2. 组织自治场景：各级组织独立管理自身及下级角色，上级和平级组织的角色数据不可见
3. 角色自治场景：系统通用一套角色，角色有上下级关系，上级和平级角色数据不可见

前端权限控制的核心是实现前端资源根据资源表按需释放，具体实现原理和功能使用参考[【权限模块】](/function/plugin/permission.html)。

## 请求加密

请求加密可以一定程度上防止重放攻击，特别是没做请求权限控制的系统，个别敏感接口暴露出来很容易被越权使用，实现全局请求加密可以有效提升此类攻击难度。

整体思路是前后端约定一个强加密算法，前端将每个请求的 URl、参数、动词等信息加密后统一发给一个专门处理加密请求的接口，接口返回数据也经过同样的算法加密，前端需要先解密再使用。

具体实现参考[【网络请求-请求加密】](/function/core/request.html#请求加密)。
