# 全链路前端监控

## 1. 项目简介

```
前端监控SDK，可用来收集并上报：代码报错、性能数据、用户行为、白屏检测等个性化指标数据。通过插件化的设计，开发者可以灵活启用或禁用不同的监控功能。
搭配 Platform数据平台 和 Server数据服务，可实现前端监控的全链路追踪。
```

## 2. 项目结构

```
ByteTop/
  ├── Docs/      官方文档
  ├── Platform/  数据平台
  ├── Server/    数据服务
  ├── Trace/   埋点SDK
  ├── package.json
  ├── pnpm-workspace.yaml
  ├── biome.json   // 代码格式化工具， eslint和prettier的上位替代
  └── .changeset/
```

## 3. 运行命令

统一使用node版本：lts/hydrogen （node版本：18.20.5）

在根目录下：
```sh
pnpm run dev:docs  # 启动文档
pnpm run dev:platform  # 启动数据平台
```

在各自文件夹下，直接按照各自的package.json中的scripts运行；
## 4. 现成的Plugin
---

## 功能特性
- **错误监控**：监控 JS 代码错误、Promise 错误、资源加载错误和 API 请求错误
- **性能监控**：收集页面加载时间、首次绘制时间、最大内容绘制时间等性能指标
- **用户行为监控**：跟踪用户的点击、页面跳转和元素曝光行为
- **灵活的上报策略**：支持实时上报和批量上报

---