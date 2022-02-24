# 业务封装



## 权限控制方案

[Vue-Access-Control](https://github.com/tower1229/Vue-Access-Control)提供了可能是目前最灵活、细致的前端权限控制能力，完全兼容RESTful，教科书级的权限关系，清晰易懂，`菜单 + 请求 => 角色 => 账号`。

脚手架基于Vue-Access-Control实现了动态菜单和请求拦截，在此基础上将菜单权限和请求权限关联起来，使它们通过上下级关系组成一棵树，让权限配置界面更容易理解。

Vue-Access-Control为了支持RESTful，导致定义api时要一起加上权限定义：

```javascript
// 获取用户列表
export const list = {
  p: ['get,/user'],
  r: params => {
    return instance.get(`/user`, {params})
  }
}
```

为了省掉手动定义permission这一步，约定舍弃RESTFul的URL参数，全部改用常规方式传参：

```javascript
// RESTFul

put /member

// URL参数改成常规参数

get /member?id=1

```

这样就可以跟平常一样的定义API，axios拦截器可以通过请求配置拼出permission，`v-has`指令可以通过正则匹配从请求方法的字符串中拿到permission，完成权限验证。

```javascript
// 获取用户列表
export const list = params => {
    return instance.get(`/user`, {params})
}
```

去掉URL参数后，我们额外约定请求数据集合时给url加上`/s`，比如这样：

```javascript
// 请求数据集合

get /member/s
```

## 权限控制工具

- `Vue.$_has`方法，用于脚本中判断当前用户是否具有某个资源权限，参数就是api请求方法，支持数组格式，数组用于多个权限联合判断
- `v-has`指令，用于模板中控制元素是否显示，基于`Vue.$_has`方法实现，参数同上

## 可能遇到的问题

- 后端需要一个root用户不受权限限制，拥有平台所有资源，第一批资源创建、角色创建都要由这个root用户来完成
- 项目初始没有任何权限，开启权限控制后应该看不到任何页面，需要先关闭权限控制(`main.js里AccessControl:false`)，用root账号访问权限管理模块，创建第一批权限、角色、账号
- 拥有创建角色的账号可以创建新角色，但给新角色的赋权不能超过自身权限的范围，这是一个容易忽略的bug
