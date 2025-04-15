# 🚀 ByteTop 前端监控 SDK

## 简介
本前端监控 SDK 可帮助开发者收集和监控前端应用中的各类信息，包括代码错误、性能指标、用户行为等。通过插件化的设计，开发者可以灵活启用或禁用不同的监控功能。

---

## 功能特性
- **智能调度策略**：
  - 🚨 实时队列（最高优先级）：立即发送关键错误
  - ⏳ 批量队列（中优先级）：保证数据在5秒内发送
  - 🌙 空闲队列（低优先级）：浏览器空闲时处理，最大化性能体验

---

## 安装与构建

### 依赖安装
```bash
npm install
```

### 项目构建
```bash
npm run build
```

---

## 使用方法

### 引入 SDK
```html
<script src="dist/myMonitor.js"></script>
```

### 初始化监控
```typescript
import { initMonitor } from './index';

initMonitor({
  plugins: ['jsError', 'xhr', 'longTask', 'paint', 'timing', 'userBehavior'],
  sendStrategy: {
    realtime: true, // 关键错误实时发送
    batch: {
      delay: 5000   // 普通数据5秒内发送
    },
    idle: {         // 性能数据空闲处理
      timeout: 2000,
      maxTasksPerIdle: 10
    }
  },
  userBehavior: {
    eventWhitelist: ['click', 'submit', 'dblclick'],
    exposureThreshold: 0.5,
  }
});
```
---

## 功能模块说明

### 🚨 错误监控
```diff
! 实时捕获并分类处理
+ JavaScript 运行时错误
+ Promise 未捕获异常
+ 静态资源加载失败
+ API 请求异常
```
### ⏱ 性能监控
| 指标        | 监控内容                     |
|-------------|------------------------------|
| FP          | 首次像素绘制                 |
| FCP         | 首次内容绘制                 |
| LCP         | 最大内容绘制                 |
| DOMContentLoaded  | DOM加载完成时间              |
| LongTask    | 执行时长 >200ms 的任务       |

### 👤 用户行为监控
用户行为监控模块可帮助您追踪用户在页面上的多种交互行为，通过智能配置和事件代理技术，高效收集用户操作数据。以下是该模块的详细介绍：

#### 功能特点
- **事件白名单机制**：您可以通过配置白名单，精确指定需要监控的用户事件。默认包含 `click`、`dblclick`、`submit` 等常见交互事件，同时支持自定义扩展。
- **高效事件代理**：采用事件代理技术，在文档根节点监听事件，减少重复事件监听器的创建，相比传统监听方式，可减少 40% 的重复监听，有效提升系统性能。
- **智能曝光检测**：使用 `Intersection Observer` API 自动监听带有 `data-exposure` 属性的元素，当元素曝光面积达到设定阈值时，自动上报曝光数据。
- **页面跳转追踪**：通过定时轮询页面 URL，实时捕获单页面应用（SPA）和传统页面的跳转事件，自动记录页面访问信息。

#### 配置方法
在初始化监控时，您可以通过 `userBehavior` 配置项对用户行为监控进行个性化设置：

### 使用示例
- 元素曝光监听：给需要监控曝光的元素添加 `data-exposure` 属性：
```html
<!-- 元素曝光监听示例 -->
<div data-exposure="banner">广告位</div>
```
- 自定义事件白名单：在初始化配置中指定需要监听的事件：
```typescript
initMonitor({
  // ...
  userBehavior: {
    eventWhitelist: ['click', 'keydown'],
    exposureThreshold: 0.5
  }
});
```
该模块会自动收集并上报以下类型的用户行为日志：
- 点击事件：记录用户点击元素的选择器、页面 URL 和点击时间。
- 页面跳转（PV）：记录页面 URL 变化时的时间戳和新页面 URL。
- 元素曝光：记录曝光元素的选择器、页面 URL 和曝光时间。
- 输入事件：记录用户输入内容的元素选择器、页面 URL 和输入内容。
- 自定义事件：根据配置的白名单，记录用户自定义事件的名称、页面 URL 和时间戳。

---

## 配置参数
| 参数名          | 类型     | 默认值    | 说明                     |
|-----------------|----------|-----------|--------------------------|
| `plugins`       | string[] | 必填      | 需启用的插件列表         |
| `sendStrategy`  | object   | `{}`      | 上报策略配置             |
| `realtime`      | boolean  | false     | 是否实时上报             |
| `batch.delay`   | number   | 5000      | 批量上报延迟(毫秒)       |
| `batch.maxItems`| number   | 10        | 批量上报最大数量         |
| `userBehavior`  | object   | `{}`      | 用户行为监控配置         |
| `exposureThreshold` | number | 0.5      | 曝光面积占比阈值(0-1)    |

---

## 部分示例文件
```text
/examples
  ├── demo.html              # 综合演示
  ├── jsError.html           # JS错误监控演示
  └── loadResourceError.html # 资源加载错误演示
