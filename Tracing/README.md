## Tracing



去根目录下发包：
```sh
pnpm changeset  # 创建新的变更集
pnpm version    # 更新版本
pnpm publish    # 发布
```

## 测试规范

测试文件命名规则：
- 单元测试：`*.test.ts`
- 集成测试：`*.spec.ts`
- 端到端测试：`*.e2e.ts`

测试目录结构：
```
__tests__/
  ├── unit/          # 单元测试
  ├── integration/   # 集成测试
  └── e2e/          # 端到端测试
```
