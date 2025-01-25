# 全链路前端监控

## 1. 项目简介

```
前端监控SDK，可用来收集并上报：代码报错、性能数据、页面录屏、用户行为、白屏检测等个性化指标数据。
搭配 Platform数据平台 和 Server数据服务，可实现前端监控的全链路追踪。
```

## 2. 项目结构

```
ByteTop/
  ├── Docs/     官方文档
  ├── Platform/ 数据平台
  ├── Server/   数据服务
  ├── Tracing/  埋点SDK
  ├── test/     各种测试服务
  ├── package.json
  ├── pnpm-workspace.yaml
  └── .changeset/
```

## 3. 运行命令


在根目录下：
```sh
pnpm run dev:docs  # 启动文档
pnpm run dev:platform  # 启动数据平台
```

在各自文件夹下，直接按照各自的package.json中的scripts运行；