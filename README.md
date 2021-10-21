## 政府采购系统注意事项

#### 一、目录结构

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
|-- |-- |-- education.js             教育专题
|-- |-- index.js                     首页入口
|-- store                            vuex, 统一管理
|-- |-- modules                      按照专题划分模块
|-- |-- |-- education
|-- |-- index.js
```







## 一、代码规范

参考前端代码规范文档

## 二、目录规范

### 2.1 目录结构

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
|-- |-- |-- education.js             教育专题
|-- |-- index.js                     首页入口
|-- store                            vuex, 统一管理
|-- |-- modules                      按照专题划分模块
|-- |-- |-- education
|-- |-- index.js
|-- views                            视图目录
|   |-- index                            门户、今日深圳专题
|   |-- |-- monitoring                      运行监控
|   |-- |-- decision                        科学决策
|   |-- |-- scheduling                      调度指挥
|   |-- |-- layout
|   |-- economy                           经济运行专题
|   |-- ecosystem                         生态环境专题
|   |-- education                         教育服务专题
|   |-- housing                           住房发展专题
|   |-- emergency                         风险防控与应急指挥专题
|   |-- grassroots                        基层社会治理专题
|   |-- healthy                           卫生医保专题
|   |-- legal                             法治政府建设专题
|   |-- management                        城市治理专题
|   |-- police                            智慧新警务专题
|   |-- serve                             政务服务专题
|   |-- employment                        就业和社会保障专题
|   |-- soldier                           退役军人事务专题
|   |-- talent                            人才服务专题
|   |-- technology                        科技创新专题
|   |-- transport                         交通运行专题
|   |-- travel                            文体旅游专题              
|   |-- natural                           自然资源和城市规划专题              
|   |-- economy-metting                    经济形势分析会              
|   |-- keyAreas                          二十大重点片区专题              
```

### 2.2 目录要求

- 参考上面`views`目录结构，每个专题一个文件夹，在对应文件夹写相关专题的逻辑
- 上述要求包括`views`，`router`，`store`，`images` ... 

#### 2.2.2 路由规范

- 目前专题的入口路由已经建立好了，如无特殊情况，不用另外开新的入口
- 举个栗子：localhost:3000/emergency  对应的就是风控应急专题页面入口
- 子路由在对应的js文件中添加，不另外新增js，也不能挤在`index.js`中

## 三、样式规范

### 3.1 图片规范

- 如图片只加载一次的话，优先级：背景图 > `img`标签

### 3.2 路径规范

- 路径优先使用绝对路径：如在less中，`~@/assets/`...

## 四、分支规范

- `main`分支为**线上分支，禁止变动**！`dev`分支为开发分支
- 每位同学先拉取dev分支，然后checkout到个人分支进行开发
- 个人分支命名建议以 自己名字 + 专题名称，例如 `lwq/transport`
  <<<<<<< HEAD
- 测试

## 五、接口对接规范

[接口文档：](https://docs.qq.com/sheet/DVGxHWnVxQ1RrcmtD?tab=7yegyh)
目前项目接口主要分旧罗马平台（以guoxin结尾）和新罗马平台（没有guoxin结尾）两个部分，下面都是以旧罗马平台为例。

### 5.1 接口地址

5点AQI接口地址（文档的资源信息那列）：http://10.253.114.78:1080/indicator/rest/ind/execution/query/guoxin

### 5.2 配置代理（已经配置好了，不需要改动）

在`vue.config.js`文件devServer里配置：

```javascript
const config = {
    devServer: {
        proxy: {
            // 新罗马平台
            '/new-roma': {
                target: 'http://10.224.153.74',
                changeOrigin: true,
                pathRewrite: {
                    '^/new-roma': ''
                }
            },
            // 旧罗马平台
            '/old-roma': {
                target: 'http://10.253.114.78:1080',
                changeOrigin: true,
                pathRewrite: {
                    '^/old-roma': ''
                }
            }
        },
    }
}
```

### 5.3 api书写

参照上述api规范，在指定文件夹中书写api接口

```javascript
// 五点的AQI数据，文件位置：src\api\modules\index\fiveClock.js
import axios from '@/hooks/axios'
// 五点数据
export function getAQIData (options) {
  return axios({
    url: '/old-roma/indicator/rest/ind/execution/query/guoxin',
    data: options,
    method: 'post'
  })
}
```

### 5.4 请求api,拿到数据

在对应文件中引入api接口

```javascript
import { getAQIData } from '@/api/modules/index/fiveClock.js'
getAQIData().then((res) => {
  ...
})
```

### 5.5 渲染页面

由于目前只有在ioc现场能请求对应服务器，所以按照接口文档的入参（参数），回参（结果）那列。先模拟写好数据结构和页面渲染，待去现场调试结果。