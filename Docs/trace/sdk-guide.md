# ByteTop 监控 SDK 指南

## 简介
本前端监控 SDK 可帮助开发者收集和监控前端应用中的各类信息，包括代码错误、性能指标、用户行为等。通过插件化的设计，开发者可以灵活启用或禁用不同的监控功能。

---

## 功能特性
- **错误监控**：监控 JS 代码错误、Promise 错误、资源加载错误和 API 请求错误
- **性能监控**：收集页面加载时间、首次绘制时间、最大内容绘制时间等性能指标
- **用户行为监控**：跟踪用户的点击、页面跳转和元素曝光行为
- **灵活的上报策略**：支持实时上报和批量上报

---

### 初始化监控
```typescript
import { initMonitor } from './index';

initMonitor({
  plugins: ['jsError', 'xhr', 'longTask', 'paint', 'timing', 'userBehavior'],
  sendStrategy: {
    realtime: true,
    batch: {
      delay: 10000, // 10秒批量发送
      maxItems: 20  // 最多20条批量发送
    }
  },
  userBehavior: {
    eventWhitelist: ['click', 'submit', 'dblclick'],
    exposureThreshold: 0.5,
  }
});
```