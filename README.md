## 政府采购系统注意事项

## 一、目录结构

```
public                            公共资源
|-- jsons                            模拟请求接口的数据
|-- index.html                       项目入口
src                               源码目录
|-- api                              所有api接口
|   |-- index.js                     
|-- assets                           静态资源，images, icons, styles等
|   |-- images                       全局公用图片
|   |-- svgs                         全局公用svg
|   |-- styles                       全局公用样式
|-- components                       公用组件
|-- hooks                            公用方法封装
|-- |-- axios                        请求封装
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- plugins                          外部引用的插件存放及修改文件
|-- router                           路由，统一管理
|-- |-- modules                      按照专题划分模块
|-- |-- index.js                     首页入口
|-- store                            vuex, 统一管理
|-- |-- modules                      按照专题划分模块
|-- |-- index.js
|-- views                            视图目录
| |-- index.vue          首页
|	|-- components				 首页组件
|	|-- detail						 详情页
|	|-- |--index.vue				 详情页
```
